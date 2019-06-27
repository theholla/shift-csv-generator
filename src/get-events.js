const axios = require('axios');

// TODO: add ability to customize dates
const startDate = '2019-06-01';
const endDate = '2019-06-30';

function getEvents(start, end) {
  const baseUrl = 'https://www.shift2bikes.org/api/events.php';
  const url = `${baseUrl}?startdate=${start}&enddate=${end}`;
  return axios.get(url);
}

module.exports = () => getEvents(startDate, endDate);
