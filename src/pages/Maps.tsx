// import { useState } from "react";
// import MapView from "@/components/maps/map-view";
// import ListingCard from "@/components/maps/listing-card";
// import CategoryFilter from "@/components/maps/category-filter";

// const sampleListings = [
//   {
//     id: 1,
//     image: "/images/mascot.webp?height=300&width=300",
//     title: "Beachfront Villa",
//     location: "Bali, Indonesia",
//     price: "Rp2,510,640",
//     rating: 4.92,
//     dates: "Mar 1-6",
//     isFavorite: false,
//     position: { lat: -8.409518, lng: 115.188919 },
//   },
//   {
//     id: 2,
//     image: "/images/mascot2.webp?height=300&width=300",
//     title: "Mountain View Lodge",
//     location: "Ubud, Indonesia",
//     price: "Rp4,352,863",
//     rating: 4.85,
//     dates: "Mar 10-15",
//     isFavorite: true,
//     position: { lat: -8.419518, lng: 115.178919 },
//   },
// ];

// export default function Maps() {
//   const [showMap, setShowMap] = useState(true);
//   const [selectedLocation, setSelectedLocation] = useState(null);

//   const filteredListings = selectedLocation
//     ? sampleListings.filter((listing) => listing.position.lat === selectedLocation.lat && listing.position.lng === selectedLocation.lng)
//     : sampleListings;

//   return (
//     <div className="h-screen flex flex-col">
//       {/* Category Filter on Top */}
//       <div className="p-4 bg-white shadow-md">
//         <CategoryFilter />
//       </div>

//       <div className="flex-1 flex">
//         {/* Listings Section */}
//         <div className={`${showMap ? "w-1/2" : "w-full"} overflow-auto p-4 transition-all duration-300`}>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {filteredListings.map((listing) => (
//               <ListingCard key={listing.id} {...listing} />
//             ))}
//           </div>
//         </div>

//         {/* Map View */}
//         {showMap && (
//           <div className="w-1/2 relative transition-all duration-300">
//             <MapView onSelectLocation={setSelectedLocation} />
//           </div>
//         )}
//       </div>

//       {/* Toggle Map Button */}
//       <button
//         onClick={() => setShowMap(!showMap)}
//         className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded-full shadow-lg z-10 transition-transform hover:scale-105"
//       >
//         {showMap ? "Show list" : "Show map"}
//       </button>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Filter, X } from "lucide-react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom marker icon for Leaflet
const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Sample data - in a real app this would come from an API
const locations = [
  {
    id: 1,
    title: "Modern Research Lab",
    type: "lab",
    rating: 4.9,
    price: 1200,
    image: "/placeholder.svg?height=200&width=300",
    position: { lat: 40.7128, lng: -74.006 },
  },
  {
    id: 2,
    title: "University Research Center",
    type: "university",
    rating: 4.8,
    price: 950,
    image: "/placeholder.svg?height=200&width=300",
    position: { lat: 40.758, lng: -73.9855 },
  },
];

const categories = [
  { id: "lab", label: "Research Labs", icon: "🧪" },
  { id: "university", label: "Universities", icon: "🎓" },
  { id: "library", label: "Libraries", icon: "📚" },
  { id: "innovation", label: "Innovation Centers", icon: "💡" },
  { id: "tech", label: "Tech Hubs", icon: "🖥️" },
];

export default function MapPage() {
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const mapCenter = { lat: 40.7128, lng: -74.006 };

  return (
    <div className="h-screen flex flex-col">
      {/* Navigation Bar */}
      <nav className="border-b border-gray-200 bg-white py-4 px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center flex-1 max-w-xl">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search locations..."
                className="pl-10 pr-4 py-2 w-full border-gray-200 rounded-full focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            <Button variant="ghost" size="icon" className="ml-2" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="w-5 h-5 text-gray-600" />
            </Button>
          </div>
        </div>

        {/* Categories */}
        <div className="mt-4 flex space-x-4 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              className={`whitespace-nowrap ${
                activeCategory === category.id ? "bg-blue-600 text-white" : "text-gray-600"
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              <span className="mr-2">{category.icon}</span>
              {category.label}
            </Button>
          ))}
        </div>
      </nav>

      {/* Map Container */}
      <div className="flex-1 relative">
        <MapContainer center={mapCenter} zoom={13} className="w-full h-full">
          {/* OpenStreetMap Tile Layer */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* Render markers for locations */}
          {locations.map((location) => (
            <Marker
              key={location.id}
              position={location.position}
              icon={customIcon}
              eventHandlers={{ click: () => setSelectedLocation(location.id) }}
            >
              <Popup>
                <div className="text-center">
                  <p className="font-semibold">{location.title}</p>
                  <p>${location.price}/mo</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Location Preview */}
        <AnimatePresence>
          {selectedLocation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-4 left-4 bg-white rounded-xl shadow-lg p-4 max-w-sm"
            >
              {locations.map(
                (location) =>
                  location.id === selectedLocation && (
                    <div key={location.id} className="relative">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 z-10"
                        onClick={() => setSelectedLocation(null)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                      <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                        <img
                          src={location.image || "/placeholder.svg"}
                          alt={location.title}
                          className="object-cover"
                        />
                      </div>
                      <h3 className="text-lg font-semibold mb-1">{location.title}</h3>
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">New York, USA</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-yellow-400 mr-1">⭐</span>
                          <span className="text-sm font-medium">{location.rating}</span>
                        </div>
                        <p className="text-lg font-semibold text-blue-600">${location.price}/mo</p>
                      </div>
                    </div>
                  ),
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
