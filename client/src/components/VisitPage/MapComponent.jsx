import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// Set default marker icon
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Component to update the map view dynamically
const MapUpdater = ({ latitude, longitude }) => {

  const map = useMap();
  useEffect(() => {
    if (latitude && longitude) {
      map.setView([latitude, longitude], 15); // Set zoom to 15 for a closer view
    }
  }, [latitude, longitude, map]);

  return null;
};

const MapComponent = ({ latitude, longitude}) => {
  return (
    <MapContainer 
      className="z-10" 
      center={[latitude, longitude]} 
      zoom={15} 
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[9.9406,76.2653]}>
        <Popup>Your Location</Popup>
      </Marker>
      <Marker position={[9.9406,76.2653]}>
        <Popup>Your Place</Popup>
      </Marker>
      
      {/* Update map view dynamically when latitude or longitude changes */}
      <MapUpdater latitude={9.9406} longitude={76.2653} />
    </MapContainer>
  );
};

export default MapComponent;
