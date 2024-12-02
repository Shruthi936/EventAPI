const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cron = require('node-cron');
const eventRoutes = require('./routes/events');
const { notifyUpcomingEvents } = require('./services/eventsService');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Middleware
app.use(express.json());

// Routes
app.use('/events', eventRoutes);

// WebSocket Connection
wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.send(JSON.stringify({ message: 'Welcome to the Real-Time Event Notifier API!' }));
});

// Notify clients of upcoming events
function broadcast(event) {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'upcoming-event', event }));
        }
    });
}

// Schedule notifications every minute
cron.schedule('* * * * *', () => {
    notifyUpcomingEvents(broadcast);
});

// Start server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
