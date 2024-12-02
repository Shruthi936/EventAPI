const { saveEvent, getAllEvents, markEventAsCompleted } = require('../storage/eventStore');
const { logCompletedEvent } = require('../utils/logger');

function addEvent({ title, description, scheduledTime }) {
    const eventTime = new Date(scheduledTime);
    if (isNaN(eventTime.getTime()) || eventTime <= new Date()) {
        throw new Error('Invalid or past scheduledTime');
    }

    const event = {
        id: `event_${Date.now()}`,
        title,
        description,
        scheduledTime: eventTime,
    };

    saveEvent(event);
    return event;
}

function getEvents() {
    return getAllEvents();
}

function notifyUpcomingEvents(broadcast) {
    const now = new Date();
    const events = getAllEvents();
    events.forEach((event) => {
        const timeDiff = new Date(event.scheduledTime) - now;
        if (timeDiff > 0 && timeDiff <= 5 * 60 * 1000) {
            broadcast(event);
        } else if (timeDiff <= 0) {
            markEventAsCompleted(event.id);
            logCompletedEvent(event);
        }
    });
}

module.exports = { addEvent, getEvents, notifyUpcomingEvents };
