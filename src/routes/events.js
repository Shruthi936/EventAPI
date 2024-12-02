const express = require('express');
const { addEvent, getEvents } = require('../services/eventsService');
const router = express.Router();

// Add a new event
router.post('/', (req, res) => {
    const { title, description, scheduledTime } = req.body;
    try {
        const event = addEvent({ title, description, scheduledTime });
        res.status(201).json({ message: 'Event created successfully', event });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all events
router.get('/', (req, res) => {
    const events = getEvents();
    res.status(200).json(events);
});

module.exports = router;
