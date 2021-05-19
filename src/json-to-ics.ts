import { createEvents, DateArray, EventAttributes } from 'ics';
import { Event, DescMeta } from './get-events';

interface MappedEvent {
  title: string;
  productId: string;
  uid: string;
  start: DateArray;
  end: DateArray;
  description: string;
  location: string;
}

export function getIcsDateArr(date: string, time: string): DateArray {
  const dateArr = date.split('-');
  const timeArr = time.substring(0, 5).split(':');
  return [...dateArr, ...timeArr].map(str => parseInt(str, 10)) as DateArray;
}

export function transformTime(hhmmss: string): string {
  const [hr, minute] = hhmmss.substring(0, 5).split(':');
  const period = parseInt(hr) >= 12 ? 'PM' : 'AM';
  let hour = null;
  if (parseInt(hr) > 12) {
    hour = -(12 - parseInt(hr)); // help the americans
  } else {
    hour = parseInt(hr, 10); // remove trailing 0 from AM times
  }
  return `${hour}:${minute} ${period}`;
}

export function getTimeForDesc(start: string, end?: string): string {
  let time = transformTime(start);
  if (end) {
    time += ` - ${transformTime(end)}`;
  }
  return time;
}

function getEventType(code: string): string {
  switch (code) {
    case 'G':
      return '';
    case 'F':
      return 'Family Friendly';
    case 'A':
      return '21+';
    default:
      return '';
  }
}

function getNewsflash(newsflash?: string): string {
  if (!newsflash) return '';
  return 'NEWSFLASH: ' + newsflash;
}

function getOutsideLink(name: string, url?: string): string {
  if (!url) return '';
  const identifier = name || 'Website';
  return `${identifier}: ${url}`;
}

function getTitle(title: string, cancelled: boolean): string {
  if (cancelled) {
    return `CANCELLED: ${title}`;
  }
  return title;
}

function getUid(id: string, calId: string): string {
  return `event-${id}-${calId}@`;
}

function getDescription(descMeta: DescMeta): string {
  return [
    getNewsflash(descMeta.newsflash),
    getTitle(descMeta.title, descMeta.cancelled),
    getTimeForDesc(descMeta.time, descMeta.endtime),
    descMeta.timedetails,
    '\n',
    getEventType(descMeta.audience),
    descMeta.details,
    '\n',
    descMeta.organizer,
    descMeta.email,
    descMeta.phone,
    descMeta.shareable,
    getOutsideLink(descMeta.webname, descMeta.weburl),
  ]
    .filter(line => line)
    .join('\n');
}

function getLocation(venue: string, address: string, locdetails?: string): string {
  return [venue, address, locdetails].filter(line => line).join(' ');
}

// TODO: get this value by calling the API for a sample Shift ics file
// ie the file returned from https://www.shift2bikes.org/api/ics.php?id=<id>
const productId = '-//shift2bikes.org//NONSGML shiftcal v2.0//EN';

function mapForICal(events: Event[]): EventAttributes[] & MappedEvent[] {
  return events
    .filter(event => event.id) // events with no id also have no other meta
    .map(event => {
      return {
        productId,
        uid: getUid(event.id, event.caldaily_id),
        title: getTitle(event.title, event.cancelled),
        start: getIcsDateArr(event.date, event.time),
        end: getIcsDateArr(event.date, event.endtime || event.time),
        description: getDescription(event),
        location: getLocation(event.venue, event.address, event.locdetails),
      };
    });
}

/**
 * Format events to iCalendar standards https://tools.ietf.org/html/rfc5545
 */
export function jsonToIcs(events: Event[]): string {
  const iCalJson = mapForICal(events);
  const { error, value } = createEvents(iCalJson);
  if (error) {
    throw error;
  }
  return value || '';
}
