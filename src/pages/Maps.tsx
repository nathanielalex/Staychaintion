import { ChangeEvent, KeyboardEventHandler, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Filter, X } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Property } from '@/declarations/Property_backend/Property_backend.did';
import { Property_backend } from '@/declarations/Property_backend';
import MapLocator from '@/components/maps/map-locator';
import { useSearchParams } from 'react-router-dom';

// Custom marker icon for Leaflet
const customIcon = new L.Icon({
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Sample data - in a real app this would come from an API
// const locations = [
//   {
//     id: 1,
//     title: 'Modern Research Lab',
//     type: 'lab',
//     rating: 4.9,
//     price: 1200,
//     image: '/placeholder.svg?height=200&width=300',
//     position: { lat: 40.7128, lng: -74.006 },
//   },
//   {
//     id: 2,
//     title: 'University Research Center',
//     type: 'university',
//     rating: 4.8,
//     price: 950,
//     image: '/placeholder.svg?height=200&width=300',
//     position: { lat: 40.758, lng: -73.9855 },
//   },
// ];

const categories = [
  { id: 'lab', label: 'Research Labs', icon: '🧪' },
  { id: 'university', label: 'Universities', icon: '🎓' },
  { id: 'library', label: 'Libraries', icon: '📚' },
  { id: 'innovation', label: 'Innovation Centers', icon: '💡' },
  { id: 'tech', label: 'Tech Hubs', icon: '🖥️' },
];

export default function MapPage() {
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null,
  );
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>();

  const mapCenter = { lat: 40.7128, lng: -74.006 };

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      const properties = await Property_backend.getAllProperties();
      setProperties(properties);
    } catch (err) {
      console.log(err);
      setError('An error occured while fetching properties\n' + err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

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
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setSearchParams((params) => {
                      params.set('search', encodeURIComponent(e.currentTarget.value));
                      return params;
                    });
                  }
                }}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="ml-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-5 h-5 text-gray-600" />
            </Button>
          </div>
        </div>

        {/* Categories */}
        <div className="mt-4 flex space-x-4 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? 'default' : 'outline'}
              className={`whitespace-nowrap ${
                activeCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600'
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
        <MapContainer
          center={mapCenter}
          zoom={13}
          className="w-full h-full z-0"
        >
          {/* OpenStreetMap Tile Layer */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          <MapLocator />

          {properties.map((property) => (
            <Marker
              key={property.id}
              position={{
                lat: property.latitude,
                lng: property.longitude,
              }}
              icon={customIcon}
              eventHandlers={{ click: () => setSelectedProperty(property) }}
            >
              <Popup>
                <div className="text-center">
                  <p className="font-semibold">{property.name}</p>
                  <p>${property.pricePerNight}/mo</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Location Preview */}
        <AnimatePresence>
          {selectedProperty && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-4 left-4 bg-white rounded-xl shadow-lg p-4 max-w-sm"
            >
              {properties.map(
                (property) =>
                  property.id === selectedProperty.id && (
                    <div key={property.id} className="relative">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 z-10"
                        onClick={() => setSelectedProperty(null)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                      <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                        <img
                          src={property.coverPicture || '/placeholder.svg'}
                          alt={property.name}
                          className="object-cover"
                        />
                      </div>
                      <h3 className="text-lg font-semibold mb-1">
                        {property.name}
                      </h3>
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">New York, USA</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-yellow-400 mr-1">⭐</span>
                          <span className="text-sm font-medium">
                            {property.rating}
                          </span>
                        </div>
                        <p className="text-lg font-semibold text-blue-600">
                          ${property.pricePerNight}/mo
                        </p>
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
