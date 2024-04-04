import "./Home.scss";
import MonthPicker from "../../components/MonthPicker/MonthPicker";
import Map from "../../components/Map/Map";
import { useState, useEffect } from "react";
import axios from "axios";

const apiKey = "c817c22c23246bc906960a32bf1fc5c8";
const headers = {
  "Authorization": `Bearer ${apiKey}`,
};
const endpoint = "https://api.start.gg/gql/alpha";

const Home = () => {

  const [location, setLocation] = useState([]);

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
              }
            }
          }
          `,
          variables: {
            "perPage": 100,
            "coordinates": `${location[0]}, ${location[1]}`,
            "radius": "10mi"
          }
        },
      });
      console.log(response.data.data.tournaments.nodes);
      console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  };

  graphqlTest();



  return (
    <main>
      <MonthPicker />
      <Map location={location} />
    </main>
  );
};

export default Home;
