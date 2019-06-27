const axios = require('axios');

function validDateFormat(date) {
  if (!date.includes('-')) return false;
  const [year, month, day] = date.split('-');
  if (!year || !month || !day) return false;
  return year.length === 4 && month.length <= 2 && day.length <= 2;
}

function validDatePair(start, end) {
  return new Date(start).getTime() <= new Date(end).getTime();
}

function validateArgs(start, end) {
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

const startDate = '2019-06-01';
const endDate = '2019-06-30';

/**
 * Call Shift2Bikes.org API to get events
 */
function getEvents(start, end) {
  if (start || end) {
    validateArgs(start, end);
  } else {
    start = startDate;
    end = endDate;
  }

  const baseUrl = 'https://www.shift2bikes.org/api/events.php';
  const url = `${baseUrl}?startdate=${start}&enddate=${end}`;
  return axios.get(url);
}

module.exports = getEvents;
