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
import { Icon } from "leaflet";
import L from "leaflet";
import mapIcon from "../../assets/icons/icons8-marker-50.png";

const myIcon = new Icon({
  iconUrl: mapIcon,
  iconSize: [30, 30],
  iconAnchor: [22, 30],
  popupAnchor: [-6, -17], // point from which the popup should open relative to the iconAnchor
});

const MultipleMarkers = (props) => {
  return props.data.map((item, index) => {
    const d = new Date((item.date)*1000)
    const dateArr = d.toString().split('(')
    return (
      <Marker
        icon={myIcon}
        key={index}
        position={[item.latitude, item.longitude]}
      >
        <Popup>
          <p>{item.name}</p>
          <p>{item.address}</p>
          <p>{dateArr[0]}</p>
          <a target="blank" href={`https://start.gg/${item.url}`}>{`https://start.gg/${item.url}`}</a>
        </Popup>
      </Marker>
    );
  });
};

const MapEvents = (props) => {
  useMapEvents({
    click(e) {
      console.log(e.latlng.lat)
      props.setLatitude(e.latlng.lat)
      console.log(e.latlng.lng)
      props.setLongitude(e.latlng.lng)
      props.setLocation([e.latlng.lat, e.latlng.lng])
    }
  })
  return false
}

const Map = (props) => {
  const kmRadius = Number(props.radius * 1.609);
  const mRadius = kmRadius * 1000;

  const mapRef = useRef(null);

  const coordsArr = props.eventList.map((x) => ({
    name: x.name,
    latitude: x.lat,
    longitude: x.lng,
    address: x.venueAddress,
    date: x.startAt,
    url: x.slug,
    icon: mapIcon,
  }));

  const [latitude, setLatitude] = useState(40);
  const [longitude, setLongitude] = useState(-73);

  const setMyCoords = () => {
    setLatitude(props.location[0]);
    setLongitude(props.location[1]);
  };

  useEffect(() => {
    setMyCoords();
  }, [props.location]);

  // const center = [40.72515026722599, -73.99676899560035]
  const fillBlueOptions = { fillColor: "transparent", color: "#b732ff" };

  return (
    // Component from the leaflet react library
    <MapContainer
      center={[latitude, longitude]}
      zoom={9.5}
      ref={mapRef}
      // changes the dimensions of the map component
      style={{
        height: "70vh",
        minWidth: "48%",
        maxWidth: "100%",
        zIndex: "0",
        borderRadius: "20px",
      }}
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
        <Marker
          icon={myIcon}
          color="red"
          opacity={0}
          position={[40.72515026722599, -73.99676899560035]}
        >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      ) : (
        <>
          {/* <Marker opacity={1.0} position={[latitude, longitude]}>
            <Popup>{props.location}</Popup>
          </Marker> */}
          {coordsArr ? <MultipleMarkers data={coordsArr} /> : ""}
          <Circle
            center={[latitude, longitude]}
            pathOptions={fillBlueOptions}
            radius={mRadius}
          />
        </>
      )}
      <MapEvents setLatitude={setLatitude} setLongitude={setLongitude} setLocation={props.setLocation} />
    </MapContainer>
  );
};

export default Map;
