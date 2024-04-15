import "./Home.scss";
import MonthPicker from "../../components/MonthPicker/MonthPicker";
import Map from "../../components/Map/Map";
import { useState, useEffect } from "react";
import axios from "axios";
import EventCalendar from "../../components/Calendar/Calendar";
import Search from "../../components/Search/Search";
import Loading from "../../components/Loading/Loading";
import Help from "../../components/Help/Help";
import Favorites from "../../components/Favorites/Favorites";

// .env Handling
const apiKey = import.meta.env.VITE_SGG_KEY;
const headers = {
  Authorization: `Bearer ${apiKey}`,
};
const endpoint = import.meta.env.VITE_SGG_URL;

const Home = () => {
  const [location, setLocation] = useState([
    40.76911405953448, -73.97461862009996,
  ]);
  const [eventList, setEventList] = useState([]);
  const [firstDay, setFirstDay] = useState("");
  const [lastDay, setLastDay] = useState("");
  const [radius, setRadius] = useState(25);
  const [gamesFilter, setGamesFilter] = useState(null);
  const [currentEvent, setCurrentEvent] = useState("");
  const [savedEvents, setSavedEvents] = useState([]);
  const [help, setHelp] = useState(false);
  const [fav, setFav] = useState(false);

  const [isSignedUp, setIsSignedUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  let firstTimestamp = "";
  let lastTimestamp = "";

  if (firstDay) {
    firstTimestamp = firstDay.getTime() / 1000;
    lastTimestamp = lastDay.getTime() / 1000;
  }

  function error() {
    console.log("Unable to retrieve your location");
  }

  function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const locationVar = [lat, lon];
    setLocation(locationVar);
  }

  // Geolocation API call
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  const handleRadiusChange = (event) => {
    setRadius(event.target.value);
  };

  // API Call to Start.gg
  const apiCall = async () => {
    if (firstTimestamp) {
      if (gamesFilter) {
        try {
          const response = await axios({
            url: endpoint,
            method: "post",
            headers: headers,
            data: {
              query: `
              query Tournaments($perPage: Int, $coordinates: String!, $radius: String!, $videogameId: ID!) {
                tournaments(query: {
                  perPage: $perPage
                  filter: {
                    afterDate: ${firstTimestamp},
                    beforeDate: ${lastTimestamp},
                    videogameIds: [
                      $videogameId
                    ],
                    location: {
                      distanceFrom: $coordinates,
                      distance: $radius
                    }
                  }
                }) {
                  nodes {
                    name
                    city
                    venueAddress
                    startAt
                    endAt
                    lat
                    lng
                    slug
                    hasOfflineEvents
                  }
                }
              }
              `,
              variables: {
                perPage: 100,
                coordinates: `${location[0]}, ${location[1]}`,
                radius: `${radius}mi`,
                videogameId: gamesFilter,
              },
            },
          });
          setEventList(response.data.data.tournaments.nodes);
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const response = await axios({
            url: endpoint,
            method: "post",
            headers: headers,
            data: {
              query: `
              query Tournaments($perPage: Int, $coordinates: String!, $radius: String!) {
                tournaments(query: {
                  perPage: $perPage
                  filter: {
                    afterDate: ${firstTimestamp},
                    beforeDate: ${lastTimestamp},
                    location: {
                      distanceFrom: $coordinates,
                      distance: $radius
                    }
                  }
                }) {
                  nodes {
                    id
                    name
                    city
                    venueAddress
                    startAt
                    endAt
                    lat
                    lng
                    slug
                    hasOfflineEvents
                  }
                }
              }
              `,
              variables: {
                perPage: 100,
                coordinates: `${location[0]}, ${location[1]}`,
                radius: `${radius}mi`,
              },
            },
          });
          setEventList(response.data.data.tournaments.nodes);
          setSavedEvents(response.data.data.tournaments.nodes);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  useEffect(() => {
    if (currentEvent) {
      setEventList(eventList.filter((x) => x.id === currentEvent));
    }
    if (!currentEvent) {
      setEventList(eventList);
    }
  }, [currentEvent]);

  useEffect(() => {
    apiCall();
  }, [location, firstTimestamp, radius, gamesFilter]);

  const resetSearch = () => {
    setGamesFilter(null);
    setCurrentEvent("");
    setEventList(savedEvents);
  };

  const handleHelp = () => {
    setHelp(true);
  };

  const handleFav = () => {
    setFav(true);
  };

  return (
    <main>
      <p onClick={handleHelp} className="helpButton">
        ?
      </p>
      <Loading />
      {fav === true ? (
        <Favorites
          setFav={setFav}
          isSignedUp={isSignedUp}
          setIsSignedUp={setIsSignedUp}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
      ) : (
        ""
      )}
      {help === true ? <Help setHelp={setHelp} /> : ""}
      <section className="inputDiv">
        <div className="inputDiv__subdiv">
          <button onClick={handleFav} className="inputDiv__fav">
            ★
          </button>
          <Search setGamesFilter={setGamesFilter} />
          <button onClick={resetSearch} className="inputDiv__reset">
            Reset Search
          </button>
        </div>
        <div className="inputDiv__emptyDiv"></div>
        <div className="inputDiv__subdiv">
          <form className="inputDiv__radiusForm">
            <label className="inputDiv__radiusLabel" htmlFor="searchRadius">
              Select search radius:
            </label>
            <select
              onChange={handleRadiusChange}
              defaultValue={25}
              name="radius"
            >
              <option value={10}>10 Miles</option>
              <option value={25}>25 Miles</option>
              <option value={40}>40 Miles</option>
            </select>
          </form>
          <MonthPicker
            firstDay={firstDay}
            setFirstDay={setFirstDay}
            lastDay={lastDay}
            setLastDay={setLastDay}
          />
        </div>
      </section>
      <section className="contentDiv">
        <Map
          location={location}
          setLocation={setLocation}
          eventList={eventList}
          radius={radius}
        />
        <div style={{ minWidth: "4%" }}></div>
        <EventCalendar
          isLoggedIn={isLoggedIn}
          eventList={eventList}
          currentEvent={currentEvent}
          setCurrentEvent={setCurrentEvent}
        />
      </section>
      <p className="footer">Creative Commons License Placeholder</p>
    </main>
  );
};

export default Home;
