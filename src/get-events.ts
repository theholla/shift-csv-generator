import axios, { AxiosResponse } from 'axios';

function validDateFormat(date: string): boolean {
  if (!date.includes('-')) return false;
  const [year, month, day] = date.split('-');
  if (!year || !month || !day) return false;
  return year.length === 4 && month.length <= 2 && day.length <= 2;
}

function validDatePair(start: string, end: string): boolean {
  return new Date(start).getTime() <= new Date(end).getTime();
}

function validateArgs(start: string, end: string): void {
  if (!start || !end) {
    throw new Error(
      `Must include both start and end dates. You submitted: start=${start}; end=${end}`
    );
  }
  if (!validDateFormat(start) || !validDateFormat(end)) {
    throw new Error(
      `Date arguments must be in form YYYY-MM-YY. You submitted: start=${start}; end=${end}`
    );
  }
  if (!validDatePair(start, end)) {
    throw new Error(`Date pair invalid. You submitted: start=${start}; end=${end}`);
  }
}

interface BaseEvent {
  id: string;
  venue: string;
  address: string;
  hideemail: string; // stringified number
  locdetails?: string;
  eventduration: string; // stringified number
  image: string;
  tinytitle: string;
  printdescr: string;
  datestype: string; // enum, stringified number
  area: string; // enum
  featured: boolean;
  printemail: boolean;
  printphone: boolean;
  printweburl: boolean;
  printcontact: boolean;
  contact?: string;
  date: string;
  caldaily_id: string; // stringified number
}

export interface DescMeta {
  audience: string; // enum
  cancelled: boolean;
  details: string;
  email?: string;
  endtime: string;
  newsflash?: string;
  organizer: string;
  phone?: string;
  shareable: string;
  time: string;
  timedetails?: string;
  title: string;
  webname: string;
  weburl: string;
}

export interface Event extends BaseEvent, DescMeta {}

interface ShiftCalResponse {
  events: Event[];
}

/**
 * Call Shift2Bikes.org API to get events
 */
const baseUrl = 'https://www.shift2bikes.org/api/events.php';
export function getEvents(start = '2021-06-01', end = '2021-08-31'): Promise<Event[]> {
  if (start || end) {
    validateArgs(start, end);
  }
  return axios
    .get(`${baseUrl}?startdate=${start}&enddate=${end}`)
    .then(({ data }: AxiosResponse<ShiftCalResponse>) => data.events)
    .catch((err: Error) => {
      console.error(err);
      return [];
    });
}
