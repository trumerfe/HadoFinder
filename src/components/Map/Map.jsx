import React, { useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
  useMapEvent,
  Circle,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import MapHooks from "../MapHooks/MapHooks";
import { map } from "leaflet";

const MultipleMarkers = (props) => {
  // console.log(props.data) 
  return props.data.map((item, index) => {
    return <Marker key={index} position={[item.latitude, item.longitude]}>
      <Popup>{item.name}</Popup>
    </Marker>
  })
}


const Map = (props) => {
  const mapRef = useRef(null);

  // props.eventList.forEach((element) => {
  //   console.log(`${element.lat}, ${element.lng}`);
  // });

  const coordsArr = props.eventList.map((x) => ({
    name: x.name,
    latitude: x.lat,
    longitude: x.lng,
    address: x.venueAddress,
    date: x.startAt,
    url: x.slug,
  }));

  // coordsArr[0] ? console.log(coordsArr[0].latitude) : "";

  const [latitude, setLatitude] = useState(40);
  const [longitude, setLongitude] = useState(-73);
  const [latLng, setLatLng] = useState([latitude, longitude]);

  const setMyCoords = () => {
    setLatitude(props.location[0]);
    setLongitude(props.location[1]);
  };

  useEffect(() => {
    setMyCoords();
  }, [props.location]);

  // const center = [40.72515026722599, -73.99676899560035]
  const fillBlueOptions = { fillColor: "blue" };

  return (
    // Component from the leaflet react library
    <MapContainer
      center={[10, -10]}
      zoom={10.5}
      ref={mapRef}
      // changes the dimensions of the map component
      style={{ height: "70vh", minWidth: "48%", maxWidth: '100%', zIndex: "0", borderRadius: '20px' }}
    >
      <MapHooks location={props.location} />
      <TileLayer // assigns openstreetmap tileset
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* Sets position of marker (to be populated by coordinates provided by geolocation and API calls)
          Currently, state goes undefined for a moment when fetching geolocation data which breaks the page.
          Must set a placeholder to fix. */}
      {latitude === undefined ? (
        <Marker opacity={0} position={[40.72515026722599, -73.99676899560035]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      ) : (
        <>
          {/* <Marker opacity={1.0} position={[latitude, longitude]}>
            <Popup>{props.location}</Popup>
          </Marker> */}
          {coordsArr ? (
            <MultipleMarkers data={coordsArr} />
          ) : ''}
          <Circle
            center={[latitude, longitude]}
            pathOptions={fillBlueOptions}
            radius={25000}
          />
        </>
      )}
    </MapContainer>
  );
};

export default Map;
