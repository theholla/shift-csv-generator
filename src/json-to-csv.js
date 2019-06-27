const { parse } = require('json2csv');
const { getDescription, getLocation, getTitle } = require('./lib');

function mapForGcal(events) {
  return events.map(event => ({
    Subject: getTitle(event),
    'Start Date': event.date,
    'Start Time': event.time,
    'End Date': event.date, // sorry Angel
    'End Time': event.endtime,
    Description: getDescription(event),
    Location: getLocation(event),
  }));
}

/**
 * Format events so they can be imported as CSV to Google Calendar
 */
function jsonToCsv(events) {
  const gCalJson = mapForGcal(events);
  return parse(gCalJson, {
    fields: ['Subject', 'Start Date', 'Start Time', 'End Time', 'Description', 'Location'],
  });
}

module.exports = jsonToCsv;
