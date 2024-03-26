import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from 'react'

const Map = (props) => {

  const mapRef = useRef(null);
  const latitude = 51.505;
  const longitude = -0.09;

  console.log(props.location)

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
      {/* Sets position of marker (to be populated by coordinates provided by geolocation and API calls) */}
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
