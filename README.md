# Pet Location Tracker

A modern web application for real-time pet location tracking using OpenStreetMap.

## Features

- 🗺️ Interactive Map
  - Fullscreen OpenStreetMap display
  - Draggable markers for pet locations
  - Zoom controls and geolocation support
- 🐾 Pet Management
  - Distance tracking from home location
- 🎨 Modern UI

  - Clean, responsive design
  - Navigation bar with purple theme
  - Sidebar for pet list and details
  - Toast notifications for updates

- 🔔 Notifications
  - Real-time alerts via Telegram
  - Location updates through n8n webhooks
  - Automated notification workflow
  - Customizable alert messages

## Tech Stack

- **Frontend**

  - Vite
  - React 18+ with TypeScript
  - Tailwind CSS
  - shadcn/ui components
  - react-leaflet

- **Backend**

  - Node.js
  - Express
  - WebSocket for real-time updates
  - MQTT for message queuing

- **Integration**
  - n8n for workflow automation
  - Telegram Bot API
  - Webhook endpoints for data flow

## Data Flow

1. Backend receives location updates
2. Data is sent to n8n webhook endpoint
3. n8n processes the data and formats the message
4. Formatted alerts are sent to Telegram

## Getting Started

1. Clone the repository

```bash
   # Frontend
   git clone https://github.com/warathepj/n8n-pet-tracker-frontend.git
   # Backend
   git clone https://github.com/warathepj/n8n-pet-tracker-backend.git
```

2. Install dependencies:

````bash
# Install frontend dependenciescd sparkly-site-starter
npm install
# Install backend dependenciescd backend
npm install```
3. Start the development servers:
```bash# Start frontend
cd n8n-pet-tracker-frontend
npm run dev
# Start backend
cd n8n-pet-tracker-backend
npm run dev
````

3. Configure n8n:
   - Set up n8n workflow
   - Configure webhook node
   - Add Telegram bot credentials
   - Deploy workflow
4. Open `http://localhost:5173` in your browser

## License

[MIT](LICENSE)
