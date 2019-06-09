# Shift2Bikes JSON to CSV generator

While there is already an [event calendar](https://www.shift2bikes.org/pedalpalooza-calendar/) on Shift2Bikes.org, this script provides a way to see all the bike events alongside your personal cal. It's formatted for Google Calendar but could be tweaked pretty easily for whatever format you're looking for (as long as it's CSV).

## Usage

```
npm run csv
```

The above script will:

* Call the Shift2Bikes API to get all [Pedalpalooza 2019](https://www.shift2bikes.org/pedalpalooza-calendar/) events
* Transform the JSON data to have the fields that Google Calendar expects
* Generate a CSV file from the event data

NOTE: This captures the event data at a point in time, so it will get out of date.

Each gCal event contains a link to the event on the Shift2Bikes site, so you can click that to get the most recent details. Or you could periodically re-run the script and drop the new CSV into your calendar (it will overwrite the old events).

## Importing into Google Calendar

At this time, you can import a CSV file to your Google Calendar from the settings page (click Calendar > Settings > Import & Export > Import). There are 300+ events so you may want to create a new calendar, rather than importing these events into your personal cal.

## About Pedalpalooza

Pedalpalooza is an entire month of bike fun. Each day in June, people all over Portland, Oregon organize bike rides and bike-related events. There are currently 306 events on the calendar for 2019: from history rides, to hill climbs, to donut crawls.

See [Shift2Bikes.org](https://www.shift2bikes.org/pages/pedalpalooza/) for more information about bike fun in Portland.
