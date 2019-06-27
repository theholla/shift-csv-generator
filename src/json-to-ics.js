const { createEvents } = require('ics');

const { getDescription, getLocation, getUid, getTitle, getIcsDateArr } = require('./lib');

// TODO: get these values by calling the API for a sample Shift ics file
// ie the file returned from https://www.shift2bikes.org/api/ics.php?id=<id>
const version = '2.0';
const productId = '-//shift2bikes.org//NONSGML shiftcal v2.0//EN';

function mapForICal(events) {
  return events.map(event => ({
      productId,
      uid: getUid(event.id, event.caldaily_id),
      title: getTitle(event),
      start: getIcsDateArr(event.date, event.time, event),
      end: getIcsDateArr(event.date, event.endtime || event.time),
      description: getDescription(event),
      location: getLocation(event),
    }));
}

/*
  Format events to iCalendar standards https://tools.ietf.org/html/rfc5545
*/
function jsonToIcs(events) {
  const iCalJson = mapForICal(events);
  const { error, value } = createEvents(iCalJson);
  if (error) {
    console.log('whaa', error);
    return;
  }
  return value;
}

module.exports = jsonToIcs;
