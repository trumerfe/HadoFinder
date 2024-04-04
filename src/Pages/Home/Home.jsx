import "./Home.scss";
import MonthPicker from "../../components/MonthPicker/MonthPicker";
import Map from "../../components/Map/Map";
import { useState, useEffect } from "react";
import axios from "axios";

const apiKey = import.meta.env.VITE_SGG_KEY;
const headers = {
  "Authorization": `Bearer ${apiKey}`,
};
const endpoint = import.meta.env.VITE_SGG_URL;

const Home = () => {

  const [location, setLocation] = useState([]);
  const [eventList, setEventList] = useState([])

  function error() {
    console.log("Unable to retrieve your location");
  }

  function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const location = [lat, lon];
    setLocation(location);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);


  const graphqlTest = async () => {
    try {
      const response = await axios({
        url: endpoint,
        method: "post",
        headers: headers,
        data: {
          query: `
          query SocalTournaments($perPage: Int, $coordinates: String!, $radius: String!) {
            tournaments(query: {
              perPage: $perPage
              filter: {
                afterDate: 1711944000,
                beforeDate: 1714536000,
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
                lat
                lng
                slug
              }
            }
          }
          `,
          variables: {
            "perPage": 100,
            "coordinates": `${location[0]}, ${location[1]}`,
            "radius": "25km"
          }
        },
      });
      // console.log(response.data.data.tournaments.nodes);
      setEventList(response.data.data.tournaments.nodes)
      // console.log(eventList)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    graphqlTest();
    // setEventList(response.data.tournaments.nodes)
  }, [location])

  // console.log(eventList[0])

  return (
    <main>
      <MonthPicker />
      <Map location={location} eventList={eventList} />
    </main>
  );
};

export default Home;
