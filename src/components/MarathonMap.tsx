import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useMarathonCities } from "@/hooks/useMembers";

const orangeIcon = new L.DivIcon({
  className: "",
  html: `<div style="
    width: 14px;
    height: 14px;
    background: #FF6B35;
    border: 2px solid #fff;
    border-radius: 50%;
    box-shadow: 0 0 6px rgba(255,107,53,0.6);
  "></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7],
  popupAnchor: [0, -10],
});

export default function MarathonMap() {
  const { data: cities, isLoading } = useMarathonCities();

  if (isLoading || !cities) {
    return (
      <div className="aspect-[16/9] bg-gris-calzada/20 rounded-lg animate-pulse" />
    );
  }

  return (
    <div className="aspect-[16/9] rounded-lg overflow-hidden relative z-0">
      <MapContainer
        center={[30, -20]}
        zoom={2}
        minZoom={2}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
        />
        {cities.map((city) => (
          <Marker key={city.name} position={[city.lat, city.lng]} icon={orangeIcon}>
            <Popup>
              <div className="font-body text-sm text-center">
                <strong className="block text-base">{city.displayName}</strong>
                {city.memberCount} {city.memberCount === 1 ? "corredor" : "corredores"}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
