# MTB Trail Status

A mountain bike trail status site and notification service for Charlotte, NC - See it in action at http://mtbtrailstat.us

![rogen](https://www.dropbox.com/s/efn9so96ahu40wm/mtb-trail-360x640.png?dl=0)

## How it Works

Every 10 minutes this service scrapes the [Tarheel TrailBlazer website](http://www.tarheeltrailblazers.com/) and the [US National Whitewater Center Twitter Feed](https://twitter.com/usnwctrails) to see if their status has changed (open -> closed, closed -> open). If it has, any user that is subscribed to get text messages for that trail will get an alert.

## Developing

This is a node.js/express app.

Clone the repo and install dependencies.

```bash
git clone https://github.com/JasonSanford/mtb-trail-status.git
cd mtb-trail-status
npm install
```

Copy the `.env.sample` file to `.env` and provide the necessary variables. Twitter credentials are necessary for utilizing the Twitter API for scraping trail statuses. Twilio credentials are necessary for sending text messages to subscribed users when specific trails change status.

```bash
cp .env .env.sample
vim .env
```

Run script to start web server and JavaScript/CSS preprocessors.

```bash
npm run dev
```
