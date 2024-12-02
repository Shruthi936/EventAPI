const events = [];
const completedEvents = [];

function saveEvent(event) {
    events.push(event);
    events.sort((a, b) => new Date(a.scheduledTime) - new Date(b.scheduledTime));
}

function getAllEvents() {
    return events.filter((event) => !completedEvents.includes(event.id));
}

function markEventAsCompleted(eventId) {
    completedEvents.push(eventId);
}

module.exports = { saveEvent, getAllEvents, markEventAsCompleted };
