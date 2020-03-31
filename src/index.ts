import { promises } from 'fs';
import { getEvents } from './get-events';
import { jsonToIcs } from './json-to-ics';
import handleError from './handle-error';

const [, , start, end] = process.argv;

const outputFile = `./output/events.ics`;

getEvents(start, end)
  .then(response => jsonToIcs(response))
  .then(data => promises.writeFile(outputFile, data, 'utf8'))
  .then(() => console.log(`Events written to ${outputFile}`))
  .catch(handleError);
