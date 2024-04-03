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
* Tournament information will include name, date, and location of the event.

## Implementation

### Tech Stack

* HTMl
* CSS
* JavaScript
* React
* Axios
* Leaflet
* React Lite Month Picker
* React Big Calendar

### APIs

* [start.gg](https://developer.start.gg/docs/intro)

### Sitemap

* Map: page containing an interactive map which shows the location of tournaments in the user's vicinity.
* Calendar: page containing a calendar which includes tournaments in the user's vicinity, shown in their specified dates.

### Mockups

Provide visuals of your app's screens. You can use tools like Figma or pictures of hand-drawn sketches.

### Data

Describe your data and the relationships between them. You can show this visually using diagrams, or write it out. 

### Endpoints

List endpoints that your server will implement, including HTTP methods, parameters, and example responses.

### Auth

Does your project include any login or user profile functionality? If so, describe how authentication/authorization will be implemented.

## Roadmap

Scope your project as a sprint. Break down the tasks that will need to be completed and map out timeframes for implementation. Think about what you can reasonably complete before the due date. The more detail you provide, the easier it will be to build.

## Nice-to-haves

* Aditional server which would allow users to submit their own tournaments in the case of them not being hosted in start.gg.
* Authentication feature so users can save their locations.
* Filtering tournaments by games.
* Filtering tournaments by date range as opposed to month.
* Letting users adjust distance radius of tournaments shown.
* Showing region-locked online tournaments.