const axios = require('axios');
const { parse } = require('json2csv');
const fsp = require('fs').promises;

const startDate = '2019-06-01';
const endDate = '2019-06-30';
const url = `https://www.shift2bikes.org/api/events.php?startdate=${startDate}&enddate=${endDate}`;

function getEventType(code) {
  switch(code) {
    case 'G': return 'General';
    case 'F': return 'Family';
    case 'A': return 'Adult';
  }
}

function transformTime(hhmmss) {
  let [hour, minute] = hhmmss.substring(0,5).split(':');
  let period = 'AM';
  if (hour > 12) {
    hour = -(12-hour);
    period = 'PM';
  }
  return `${hour}:${minute} ${period}`;
}

function getTitle(event) {
  if (event.cancelled) {
    return `CANCELLED: ${event.title}`;
  }
  return event.title;
}

function getStartAndEnd(event) {
  const startTime = transformTime(event.time);
  if (event.endtime) {
    return `${startTime} - ${transformTime(event.endtime)}`;
  }
  return startTime;
}

function mapForGcal(events) {
  return events.map(event => ({
      'Subject': getTitle(event),
      'Start Date': event.date,
      'Start Time': event.time,
      'End Date': event.date,
      'End Time': event.endtime,
      'Description': [
        event.newsflash ? `NEWSFLASH: ${event.newsflash}` : '',
        getTitle(event),
        getStartAndEnd(event),
        event.timedetails,
        '\n',
        'Event Type: ' + getEventType(event.audience),
        event.details,
        '\n',
        event.shareable,
        '\n',
        event.organizer,
        event.email,
        event.phone,
        event.webUrl ? `Website: ${event.weburl}` : '',
      ].filter(line => line).join('\n'),
      'Location': [
        event.venue,
        event.address,
        event.locdetails,
      ].filter(line => line).join('\n'),
    }));
}

function jsonToCsv(events) {
  const gCalJson = mapForGcal(events);
  return parse(gCalJson, {
    fields: ['Subject', 'Start Date', 'Start Time', 'End Time', 'Description', 'Location'],
  });
}

const outputFile = './output/events.csv';

axios.get(url)
  .then(response => jsonToCsv(response.data.events))
  .then(csv => fsp.writeFile(outputFile, csv, 'utf8'))
  .then(() => console.log(`Events written to ${outputFile}`))
  .catch(err => console.log(err));
