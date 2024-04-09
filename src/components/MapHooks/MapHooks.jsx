import React, { useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";

const MapHooks = (props) => {
  if (props.location[0] === undefined) {
  } else {
    const map = useMap();
    map.setView([props.location[0], props.location[1]], map.getZoom());
    return null;
  }
};

export default MapHooks;
