function getEventType(code) {
  switch (code) {
    case 'G':
      return '';
    case 'F':
      return 'Family Friendly';
    case 'A':
      return '21+';
  }
}

function getIcsDateArr(date, time) {
  const dateArr = date.split('-');
  const timeArr = time.substring(0, 5).split(':');
  return [...dateArr, ...timeArr].map(str => parseInt(str, 10));
}

function getNewsflash(newsflash) {
  if (!newsflash) return '';
  return 'NEWSFLASH: ' + newsflash;
}

function getOutsideLink(name, url) {
  if (!url) return '';
  const identifier = name || 'Website';
  return `${identifier}: ${url}`;
}

function getTimeForDesc(start, end) {
  let time = transformTime(start);
  if (end) {
    time += ` - ${transformTime(end)}`;
  }
  return time;
}

function getTitle(event) {
  if (event.cancelled) {
    return `CANCELLED: ${event.title}`;
  }
  return event.title;
}

function transformTime(hhmmss) {
  let [hour, minute] = hhmmss.substring(0, 5).split(':');
  const period = hour >= 12 ? 'PM' : 'AM';
  if (hour > 12) {
    hour = -(12 - hour); // help the americans
  } else {
    hour = parseInt(hour, 10); // remove trailing 0 from AM times
  }
  return `${hour}:${minute} ${period}`;
}

function getUid(id, calId) {
  return `event-${id}-${calId}@`;
}

function getDescription(event) {
  return [
    getNewsflash(event.newsflash),
    getTitle(event),
    getTimeForDesc(event.time, event.endtime),
    event.timedetails,
    '\n',
    getEventType(event.audience),
    event.details,
    '\n',
    event.organizer,
    event.email,
    event.phone,
    event.shareable,
    getOutsideLink(event.webname, event.weburl),
  ]
    .filter(line => line)
    .join('\n');
}

function getLocation(event) {
  return [event.venue, event.address, event.locdetails].filter(line => line).join(' ');
}

module.exports = {
  getDescription,
  getLocation,
  getUid,
  getIcsDateArr,
  getTitle,
  transformTime,
  getTimeForDesc,
};
