# Shift2Bikes JSON to ICS generator

This tool generates an .ics file that includes all the events that are already on the Shift2Bikes.org [Pedalpalooza calendar](https://www.shift2bikes.org/pedalpalooza-calendar/). Each of the events conforms to the iCalendar format and matches the event's unique id, so you can re-run the script as many times as you want to get the latest updates (and no duplicate events!).

NOTE: Events or details that aren't already on Shift2Bikes.org at the time you run the script will not be included, since they didn't exist when you created the file. You can re-run the script and import the events as often as you like to get the most up-to-date data.

## Usage

```
npm run build
npm run ics
```

The above script will:

- Call the Shift2Bikes API to get all [Pedalpalooza 2021](https://www.shift2bikes.org/pedalpalooza-calendar/) events
- Transform the JSON data so it meets the [iCalendar specification](https://tools.ietf.org/html/rfc5545), which is the standard for most modern calendar software
- Generate an .ics file from the event data

## Options

### Custom Date Range

By default, `npm run ics` will get all events from the 2021 Pedalpalooza calendar (6-1-2021 til 8-31-2021). You may optionally pass in parameters to generate a calendar for a particular date range.

Details:

- Syntax: `npm run ics <start> <end>`
- Dates must be in the form `YYYY-MM-DD`
- If you include a start date, you must include an end date
- The Shift2Bikes API currently limits requests to no more than 45 days at once

Sample usage:

```
npm run ics 2021-07-01 2021-08-15
```

## Importing into your calendar

1. Create a new calendar for these events. Otherwise, the script may add several hundred new events to your personal calendar, and that may make you sad.
1. Run `npm run ics` to generate an `.ics` file.
1. Double-click on the file (saved in `output/events.ics`), and your phone or computer will prompt you to import the events into your calendar.

NOTE: **Events that aren't already on Shift2Bikes.org at the time you run the script will not be included**! To get new events, you can run the script and import the file to your calendar as often as you like. No duplicate events will get created since each event has a unique id.

## About Pedalpalooza

Pedalpalooza is normally an entire month of bike fun. Each day in June, people all over Portland, Oregon organize bike rides and bike-related events. There are usually several hundred events on the calendar: from history rides, to hill climbs, to donut crawls.

This year (2021), it's going for 3 months. Like the original Bike Summer that launched this all.

See [Shift2Bikes.org](https://www.shift2bikes.org/pages/pedalpalooza/) for more information about bike fun in Portland.
