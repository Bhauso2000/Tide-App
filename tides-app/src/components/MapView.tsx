import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import type { NearestCoastData } from "../types/types";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function MapView({ data }: { data: NearestCoastData }) {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`bg-white rounded-2xl shadow-xl p-4 mb-4 transform transition-all duration-500 ${
        fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <h3 className="text-lg font-semibold mb-2">📍 Nearest Coast</h3>
      <div className="h-80 rounded-xl overflow-hidden shadow-inner transform transition-transform duration-300 hover:scale-105">
        <MapContainer center={[data.lat, data.lng]} zoom={10} className="h-full w-full">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[data.lat, data.lng]}>
            <Popup>
              <span className="font-semibold">{data.coastName}</span>
              <br />
              {data.locationLabel}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}
