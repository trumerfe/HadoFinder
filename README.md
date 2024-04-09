# HadoFinder

## Overview

HadoFinder is a react-based web application created to help fighting game players find their local communities and tournaments.

### Problem

Fighting games are a pretty niche interest and hobby, and the biggest appeal for a lot of people that are interested in them is the experience of attending in-person tournaments and interacting with their local community.
Unfortunately, because of the decline of Arcades during the last 15 years, it has become increasingly harder to find groups of people to play with in an offline setting, which turns some players away from the games entirely.
HadoFinder offers a solution to this problem, providing fighting game players with a platform to learn about the local events in their area.

### User Profile

This app will be used by members of the fighting game community, specifically ones interested in finding their local communities and don't know where to start.
Users will be able to provide their location, be it via geolocation technology or manual input, and see tournaments happening in their area during a selected month in an interactive map.

### Features

* Interactive map populated with real-time information of tournament locations.
* Calendar view with every event in your area.
* Data collected from popular tournament organizing website [start.gg](https://www.start.gg/).
* Tournament information will include name, date, URL, and location of the event.
* Ability to set month and distance radius.

## Implementation

### Tech Stack

* HTMl
* CSS
* SCSS
* JavaScript
* React
* Axios
* Leaflet
* React Lite Month Picker
* React Big Calendar
* Geolocation

### APIs

* [start.gg](https://developer.start.gg/docs/intro)

### Sitemap

HadoFinder is a single page application. However, this page will be divided into two distinct sections:

* Map: an interactive map which shows the location of tournaments in the user's vicinity.
* Calendar: a calendar which includes tournaments in the user's vicinity, shown in their specified dates.

### Mockups

<img alt="Initial hand-drawn skecth.](./src/assets/images/sketch.jpg" src="./src/assets/images/sketch.jpg" height="300px">
<img alt="Screenshot of the site during late stages of development." src="./src/assets/images/WIP-screenshot.png" height="300px">
<img alt="Screenshot of early Exalidraw sketch of the page." src="./src/assets/images/excalidraw-sketch.png" height="300px">

### Data

The data utilized in this app consists of the response of a GraphQL API call to the [start.gg](https://developer.start.gg/docs/intro) API.
This response is issued with the following parameters:
* Coordinates: current coordinates of the user.
* Radius: Distance around the user's current coordinates.

The response body contains:
* Name of the event
* City it is held in
* Address of the venue
* Start date and time
* End date and time
* Latitude and Longitude
* URL

### Endpoints

The site will utilize a proxy server to make the API calls to [start.gg](https://developer.start.gg/docs/intro) in order to keep the API key safe and private.

The endpoint to this server will be '/tournaments'. This endpoint will support a GET request with the following parameters:
* Coordinates: current coordinates of the user.
* Radius: Distance around the user's current coordinates.

It will then utilize these parameters to populate the GraphQL request to the start.gg API.
The response will be the response body from the start.gg API call.

Response example:

<img alt="Screenshot of API response example" src="./src/assets/images/response-body-ex.png" height="300px">

### Auth

This site will not include Login or User Profile functionality, as it was not deemed necessary for the purposes and scope of the project.

## Roadmap

Step 1 - Setup:
* Create react app boilerplate and file structure.
* Download necessary packages and dependencies.
* Download necessary assets.
* Set up routes, pages and components.
* Expected duration: 1-2 days.

Step 2 - Map:
* Display an interactive map using the Leaflet library.
* Display the user's current location in the map using Geolocation API.
* Display a radius around the user.
* Expected duration: 3 days.

Step 3 - API:
* Learn GraphQL to be able to make API calls to start.gg.
* Formulate a request body to get the desired response, taking into account the needed parameters.
* Display a coherent response body in the console.
* Expected duration: 1 day.

Step 4 - Show Data in Map:
* Learn how to add more markers in Leaflet.
* Utilize the tournament array in the API response to create markers for each tournament in their exact location.
* Expected duration: 3 days.

Step 5 - Calendar:
* Display a calendar of events using React-Big-Calendar.
* Style the calendar to fit website dimensions and styling.
* Utilize the tournament array in the API response to populate the calendar.
* Create modals that display more information when clicking on a certain event.
* Expected duration: 3 days.

Step 6 - Proxy Server:
* Create server folder structure and files.
* Migrate API call to the server.
* Create endpoints for a GET call to be made in the front end.
* Populate start.gg API call with the parameters obtained from the REST GET request from the front end.
* Send start.gg API call response back to the front end as the response of the GET request made to the proxy server.
* Store API key securely in the server.
* Expected duration: 2-3 days.

Step 7 - Styling:
* Finish website styling.
* Make website responsive for Desktop, Tablet, and Mobile.
* Expected duration: 1-2 days.

## Nice-to-haves

* Aditional server which would allow users to submit their own tournaments in the case of them not being hosted in start.gg.
* Authentication feature so users can save their locations.
* Filtering tournaments by games.
* Filtering tournaments by date range as opposed to month.
* Letting users adjust distance radius of tournaments shown.
* Showing region-locked online tournaments.
* Allowing users to search for tournaments in other areas.
* Selecting a tournament in the calendar highlights said event in the map.