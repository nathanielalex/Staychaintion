import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom icon for markers
const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [30, 45],
  iconAnchor: [15, 45],
  popupAnchor: [0, -40],
});

const center = { lat: -8.409518, lng: 115.188919 };

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
];

interface MapViewProps {
  onSelectLocation: (location: { lat: number; lng: number }) => void;
}

const MapView: React.FC<MapViewProps> = ({ onSelectLocation }) => {
  return (
    <div className="relative w-full h-screen">
      <MapContainer center={center} zoom={13} style={{ width: "100%", height: "100vh" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {listings.map((listing) => (
          <Marker
            key={listing.id}
            position={listing.position}
            icon={customIcon}
            eventHandlers={{
              click: () => onSelectLocation(listing.position),
            }}
          >
            <Popup>
              <div className="text-center">
                <p className="font-semibold">{listing.price}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;