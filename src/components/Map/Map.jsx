import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from 'react'

const Map = (props) => {

  const mapRef = useRef(null);

  const [latitude, setLatitude] = useState(40.72515026722599)
  const [longitude, setLongitude] = useState(-73.99676899560035)

  console.log(latitude)
  console.log(longitude)
  const setMyCoords = () => {
    setLatitude(props.location[0])
    setLongitude(props.location[1])
  }

  useEffect(() => {
    setMyCoords()
  },[props.location])

  return (
    // Component from the leaflet react library
    <MapContainer
      center={[latitude, longitude]}
      zoom={13}
      ref={mapRef}
      // changes the dimensions of the map component
      style={{ height: "60vh", width: "90vw" }}
    >
      <TileLayer // assigns openstreetmap tileset
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* Sets position of marker (to be populated by coordinates provided by geolocation and API calls)
          Currently, state goes undefined for a moment when fetching geolocation data which breaks the page.
          Must set a placeholder to fix. */}
      <Marker position={[40.72515026722599, -73.99676899560035]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
