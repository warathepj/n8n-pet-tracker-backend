import express from 'express';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import mqtt from 'mqtt';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const wsPort = process.env.WS_PORT || 8085;
const mqttBrokerUrl = process.env.MQTT_BROKER_URL || 'mqtt://test.mosquitto.org:1883';

// Express middleware
app.use(cors());
app.use(express.json());

// Express routes
app.post('/publish', async (req, res) => {
  try {
    const { message, location } = req.body;
    console.log('Received alert:', message, location);
    
    // Broadcast to WebSocket clients
    wss.clients.forEach((client) => {
      client.send(JSON.stringify({
        type: 'alert',
        message,
        location
      }));
    });

    // Publish to MQTT topic
    mqttClient.publish('corgidev/pet/alert', JSON.stringify({
      message,
      location,
      timestamp: new Date().toISOString()
    }));

    res.status(200).json({ status: 'Alert received and broadcast' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create WebSocket server
const wss = new WebSocketServer({ port: wsPort });

wss.on('connection', (ws) => {
  console.log('New WebSocket connection');

  ws.on('message', (message) => {
    console.log('Received:', message);
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

// MQTT setup
const mqttClient = mqtt.connect(mqttBrokerUrl);

mqttClient.on('connect', () => {
  console.log('Connected to MQTT broker at', mqttBrokerUrl);
  mqttClient.subscribe('corgidev/pet/+', (err) => {
    if (!err) {
      console.log('Subscribed to corgidev/pet/+ topics');
    }
  });
});

mqttClient.on('error', (error) => {
  console.error('MQTT connection error:', error);
});

mqttClient.on('message', async (topic, message) => {
  console.log(`Received message on ${topic}: ${message}`);
  
  // Forward to webhook
  try {
    const response = await fetch('your-webhook-url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        topic,
        message: message.toString(),
        timestamp: new Date().toISOString()
      })
    });

    if (!response.ok) {
      throw new Error(`Webhook request failed with status ${response.status}`);
    }
  } catch (error) {
    console.error('Error forwarding to webhook:', error);
  }

  // Broadcast to WebSocket clients
  wss.clients.forEach((client) => {
    client.send(JSON.stringify({
      topic,
      message: message.toString()
    }));
  });
});

// Start Express server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`WebSocket server running at ws://localhost:${wsPort}`);
});


