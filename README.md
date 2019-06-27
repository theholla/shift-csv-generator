# Shift2Bikes JSON to ICS generator

This tool generates an .ics file that includes all the events that are already on the Shift2Bikes.org [Pedalpalooza calendar](https://www.shift2bikes.org/pedalpalooza-calendar/). Each of the events conforms to the iCalendar format and matches the event's unique id, so the events stay synced even after users update them on Shift2Bikes.org.

NOTE: Events that aren't already on Shift2Bikes.org at the time you run the script will not be included! This simply isn't possible. You can get around this by re-running the script and importing the events as often as you like.

## Usage

```
npm run ics
```

The above script will:

* Call the Shift2Bikes API to get all [Pedalpalooza 2019](https://www.shift2bikes.org/pedalpalooza-calendar/) events
* Transform the JSON data so it meets the [iCalendar specification](https://tools.ietf.org/html/rfc5545), which is the standard for most modern calendar software
* Generate an .ics file from the event data

## Options

### Custom Date Range

By default, `npm run ics` will get all events from the 2019 Pedalpalooza calendar (6-1-2019 til 6-30-2019). You may optionally pass in parameters to generate a calendar for a particular date range.

Details:
* Syntax: `npm run <ics|csv> <start> <end>`
* Dates must be in the form `YYYY-MM-DD`
* If you include a start date, you must include an end date
* The Shift2Bikes API currently limits requests to no more than 45 days at once

Sample usage:
```
npm run ics 2019-07-01 2019-08-15
```

## Importing into your calendar

1. Run `npm run ics` to generate an `.ics` file.
1. Double-click on the file (saved in `output/events.ics`), and your phone or computer will prompt you to import the events into your calendar. Pro-tip: create a new calendar for this so you don't overwhelm your personal one.

NOTE: **Events that aren't already on Shift2Bikes.org at the time you run the script will not be included**! To get new events, you can run the script and import the file to your calendar as often as you like. No duplicate events will get created since each event has a unique id.

## Importing via CSV

Instead of generating an `.ics` file, you can run `npm run csv` to generate a `.csv` file. This will allow you to import the `.csv` file manually into Google calendar. This currently captures the event data at a point in time, and does not sync with event updates from the Shift website. Not currently recommended.

## About Pedalpalooza

Pedalpalooza is an entire month of bike fun. Each day in June, people all over Portland, Oregon organize bike rides and bike-related events. There are currently 336 events on the calendar for 2019: from history rides, to hill climbs, to donut crawls.

See [Shift2Bikes.org](https://www.shift2bikes.org/pages/pedalpalooza/) for more information about bike fun in Portland.
