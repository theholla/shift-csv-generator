# Shift2Bikes JSON to CSV/ICS generator

While there is already an [event calendar](https://www.shift2bikes.org/pedalpalooza-calendar/) on Shift2Bikes.org, this script provides a way to see all the bike events alongside your personal cal.

This tool generates an .ics file of events that will stay synced with their respective event on the Shift cal.

## Usage

```
npm run ics
```

The above script will:

* Call the Shift2Bikes API to get all [Pedalpalooza 2019](https://www.shift2bikes.org/pedalpalooza-calendar/) events
* Transform the JSON data so it meets the [iCalendar specification](https://tools.ietf.org/html/rfc5545), which should be compatible with most modern calendar software
* Generate an .ics file from the event data (saved in `output/events.ics`)

## Importing into any modern calendar

Run `npm run ics` to generate an `.ics` file.
Double-click on the file, and your phone or computer will prompt you to import the events into your calendar. It's recommended that you create a new calendar for this so you don't overwhelm your personal one.

The events should stay up to date with the Shift cal (untested but likely).

NOTE: **Events that get added to the Shift cal after you generate the file will not be synced to your calendar**. To get new events, you can run `npm run ics` and import that file to your calendar as often as you like. No duplicate events will get created since each event has a unique id.

## Importing via CSV

Alternatively, you can generate a `.csv` file by running `npm run csv`, while you can use to import the event data manually into Google calendar. This captures the event data at a point in time, so it will become out of date. Not currently recommended.

## About Pedalpalooza

Pedalpalooza is an entire month of bike fun. Each day in June, people all over Portland, Oregon organize bike rides and bike-related events. There are currently 336 events on the calendar for 2019: from history rides, to hill climbs, to donut crawls.

See [Shift2Bikes.org](https://www.shift2bikes.org/pages/pedalpalooza/) for more information about bike fun in Portland.
