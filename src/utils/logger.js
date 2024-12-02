const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '../../completed_events.log');

function logCompletedEvent(event) {
    const logEntry = {
        ...event,
        completedAt: new Date().toISOString(),
    };

    fs.appendFile(logFilePath, JSON.stringify(logEntry) + '\n', (err) => {
        if (err) console.error('Error logging event:', err);
    });
}

module.exports = { logCompletedEvent };
