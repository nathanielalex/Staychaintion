import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapPin } from "lucide-react";

// Custom icon for markers
const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const center = {
  lat: -8.409518,
  lng: 115.188919, // Center of Bali
};

// Sample listing data - replace with your actual data
const listings = [
  {
    id: 1,
    position: { lat: -8.409518, lng: 115.188919 },
    price: "Rp2,510,640",
  },
  {
    id: 2,
    position: { lat: -8.419518, lng: 115.178919 },
    price: "Rp4,352,863",
  },
  // Add more listings as needed
];

export default function MapView() {
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);

  return (
    <div className="relative w-full h-screen">
      <MapContainer center={center} zoom={13} style={{ width: "100%", height: "100vh" }}>
        {/* OpenStreetMap Tile Layer */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Render Markers for Listings */}
        {listings.map((listing) => (
          <Marker key={listing.id} position={listing.position} icon={customIcon} eventHandlers={{
            click: () => setSelectedMarker(listing.id),
          }}>
            {selectedMarker === listing.id && (
              <Popup>
                <div className="text-center">
                  <p className="font-semibold">{listing.price}</p>
                </div>
              </Popup>
            )}
          </Marker>
        ))}
      </MapContainer>

      {/* Map Controls */}
      <div className="absolute right-4 top-4 flex flex-col gap-2">
        <button className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100">
          <MapPin className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
