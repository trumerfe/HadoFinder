import {
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapHooks = (props) => {
  if (props.location[0] === undefined) {
  } else {
    const map = useMap();
    map.setView([props.location[0], props.location[1]], map.getZoom());
    return null;
  }
};

export default MapHooks;
