import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Ensure this is imported

const MapConponents = ({longitude, latitude}) => {
    return (
      <div className=" my-24 -z-10">
    <MapContainer center={[latitude, longitude]} zoom={1} style={{ height: "600px", width: "100%" }}>
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    <Marker position={[latitude, longitude]}>
      <Popup>H</Popup>
    </Marker>
  </MapContainer>
      </div>
  );
};

export default MapConponents;
