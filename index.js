const fsp = require('fs').promises;
const handleError = require('./src/handle-error');
const getEvents = require('./src/get-events');

const isCSV = process.env.FILE_TYPE === 'csv';
const [, , start, end] = process.argv;

const outputFormat = isCSV ? 'csv' : 'ics';
const outputFile = `./output/events.${outputFormat}`;

const transformFunc = isCSV ? require('./src/json-to-csv') : require('./src/json-to-ics');

getEvents(start, end)
  .then(response => transformFunc(response.data.events))
  .then(data => fsp.writeFile(outputFile, data, 'utf8'))
  .then(() => console.log(`Events written to ${outputFile}`))
  .catch(handleError);
