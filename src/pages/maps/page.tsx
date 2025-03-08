'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, Filter, X, Star, List, Layers, Heart } from 'lucide-react';
import React, { lazy, Suspense } from 'react';
import { Property } from '@/declarations/Property_backend/Property_backend.did';
import { Property_backend } from '@/declarations/Property_backend';

// Dynamically import the Map component to avoid SSR issues with Leaflet

// Ini Kalau Pakai Next

// const PropertyMap = dynamic(() => import("@/components/maps/property-map"), {
//   ssr: false,
//   loading: () => (
//     <div className="w-full h-[calc(100vh-64px)] flex items-center justify-center bg-gray-100">
//       <div className="flex flex-col items-center">
//         <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
//         <p className="text-gray-600">Loading map...</p>
//       </div>
//     </div>
//   ),
// })

const PropertyMap = lazy(() => import('@/components/maps/property-map'));

// const PropertyMapWrapper() {
//   return (
//     <Suspense
//       fallback={
//         <div className="w-full h-[calc(100vh-64px)] flex items-center justify-center bg-gray-100">
//           <div className="flex flex-col items-center">
//             <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
//             <p className="text-gray-600">Loading map...</p>
//           </div>
//         </div>
//       }
//     >
//       <PropertyMap />
//     </Suspense>
//   );
// }

// Sample property data
// const properties = [
//   {
//     id: 1,
//     title: "Luxury Beachfront Villa",
//     type: "villa",
//     price: 2500000,
//     pricePerNight: 2500000,
//     rating: 4.9,
//     reviews: 124,
//     bedrooms: 4,
//     bathrooms: 3,
//     guests: 8,
//     amenities: ["pool", "wifi", "parking", "ac", "kitchen", "workspace"],
//     image: "/placeholder.svg?height=300&width=400",
//     location: {
//       address: "Jl. Pantai Indah, Bali",
//       lat: -8.6478,
//       lng: 115.1385,
//     },
//   },
//   {
//     id: 2,
//     title: "Modern City Apartment",
//     type: "apartment",
//     price: 1200000,
//     pricePerNight: 1200000,
//     rating: 4.7,
//     reviews: 89,
//     bedrooms: 2,
//     bathrooms: 2,
//     guests: 4,
//     amenities: ["wifi", "parking", "ac", "kitchen", "gym"],
//     image: "/placeholder.svg?height=300&width=400",
//     location: {
//       address: "Jl. Sudirman, Jakarta",
//       lat: -6.2088,
//       lng: 106.8456,
//     },
//   },
//   {
//     id: 3,
//     title: "Traditional Javanese House",
//     type: "house",
//     price: 850000,
//     pricePerNight: 850000,
//     rating: 4.8,
//     reviews: 56,
//     bedrooms: 3,
//     bathrooms: 2,
//     guests: 6,
//     amenities: ["wifi", "parking", "garden", "kitchen"],
//     image: "/placeholder.svg?height=300&width=400",
//     location: {
//       address: "Jl. Malioboro, Yogyakarta",
//       lat: -7.7956,
//       lng: 110.3695,
//     },
//   },
//   {
//     id: 4,
//     title: "Mountain View Cabin",
//     type: "cabin",
//     price: 1500000,
//     pricePerNight: 1500000,
//     rating: 4.9,
//     reviews: 42,
//     bedrooms: 2,
//     bathrooms: 1,
//     guests: 4,
//     amenities: ["wifi", "fireplace", "kitchen", "hiking"],
//     image: "/placeholder.svg?height=300&width=400",
//     location: {
//       address: "Jl. Raya Puncak, Bogor",
//       lat: -6.7063,
//       lng: 106.9965,
//     },
//   },
//   {
//     id: 5,
//     title: "Riverside Eco Resort",
//     type: "resort",
//     price: 1800000,
//     pricePerNight: 1800000,
//     rating: 4.6,
//     reviews: 78,
//     bedrooms: 1,
//     bathrooms: 1,
//     guests: 2,
//     amenities: ["wifi", "nature", "restaurant", "spa"],
//     image: "/placeholder.svg?height=300&width=400",
//     location: {
//       address: "Jl. Sungai Ayung, Ubud",
//       lat: -8.5069,
//       lng: 115.2624,
//     },
//   },
//   {
//     id: 6,
//     title: "Minimalist Studio Loft",
//     type: "apartment",
//     price: 950000,
//     pricePerNight: 950000,
//     rating: 4.5,
//     reviews: 63,
//     bedrooms: 1,
//     bathrooms: 1,
//     guests: 2,
//     amenities: ["wifi", "ac", "kitchen", "workspace"],
//     image: "/placeholder.svg?height=300&width=400",
//     location: {
//       address: "Jl. Cihampelas, Bandung",
//       lat: -6.8915,
//       lng: 107.6107,
//     },
//   },
//   {
//     id: 7,
//     title: "Oceanfront Luxury Resort",
//     type: "resort",
//     price: 3200000,
//     pricePerNight: 3200000,
//     rating: 5.0,
//     reviews: 112,
//     bedrooms: 3,
//     bathrooms: 3,
//     guests: 6,
//     amenities: ["pool", "wifi", "beach", "restaurant", "spa", "gym"],
//     image: "/placeholder.svg?height=300&width=400",
//     location: {
//       address: "Jl. Raya Uluwatu, Bali",
//       lat: -8.8291,
//       lng: 115.12,
//     },
//   },
//   {
//     id: 8,
//     title: "Historic Colonial Villa",
//     type: "villa",
//     price: 1750000,
//     pricePerNight: 1750000,
//     rating: 4.8,
//     reviews: 94,
//     bedrooms: 4,
//     bathrooms: 3,
//     guests: 8,
//     amenities: ["pool", "wifi", "garden", "kitchen", "parking"],
//     image: "/placeholder.svg?height=300&width=400",
//     location: {
//       address: "Jl. Diponegoro, Semarang",
//       lat: -6.9932,
//       lng: 110.4203,
//     },
//   },
// ]

// Property types for filtering
const propertyTypes = [
  { id: 'all', label: 'All Types' },
  { id: 'apartment', label: 'Apartment' },
  { id: 'house', label: 'House' },
  { id: 'villa', label: 'Villa' },
  { id: 'cabin', label: 'Cabin' },
  { id: 'resort', label: 'Resort' },
];

// Amenities for filtering
const amenitiesOptions = [
  { id: 'pool', label: 'Swimming Pool' },
  { id: 'wifi', label: 'WiFi' },
  { id: 'parking', label: 'Parking' },
  { id: 'ac', label: 'Air Conditioning' },
  { id: 'kitchen', label: 'Kitchen' },
  { id: 'workspace', label: 'Workspace' },
  { id: 'gym', label: 'Gym' },
  { id: 'spa', label: 'Spa' },
  { id: 'beach', label: 'Beach Access' },
  { id: 'restaurant', label: 'Restaurant' },
];

export default function PropertiesMapPage() {
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [priceRange, setPriceRange] = useState([500000, 3500000]);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([
    'all',
  ]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [bedroomsFilter, setBedroomsFilter] = useState<number | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    -8.4095, 115.1889,
  ]); // Bali center
  const [mapZoom, setMapZoom] = useState(9);
  const [isLiked, setIsLiked] = useState<Record<string, boolean>>({});

  const fetchProperties = async () => {
    try {
      // setLoading(true);
      // setError(null);
      const properties = await Property_backend.getAllProperties();
      setProperties(properties);
    } catch (err) {
      console.log(err);
      // setError('An error occured while fetching properties\n' + err);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // Filter properties based on selected filters
  useEffect(() => {
    let filtered = properties;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (property) =>
          property.name.toLowerCase().includes(query) ||
          property.location.toLowerCase().includes(query),
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (property) =>
        property.pricePerNight >= priceRange[0] &&
        property.pricePerNight <= priceRange[1],
    );

    // Filter by property type
    if (!selectedPropertyTypes.includes('all')) {
      filtered = filtered.filter((property) =>
        selectedPropertyTypes.includes(property.propertyType),
      );
    }

    // Filter by amenities
    // if (selectedAmenities.length > 0) {
    //   filtered = filtered.filter((property) =>
    //     selectedAmenities.every((amenity) => property.amenities.includes(amenity)),
    //   )
    // }

    // Filter by bedrooms
    if (bedroomsFilter !== null) {
      filtered = filtered.filter(
        (property) => property.bedroomCount >= bedroomsFilter,
      );
    }

    setFilteredProperties(filtered);
  }, [
    searchQuery,
    priceRange,
    selectedPropertyTypes,
    selectedAmenities,
    bedroomsFilter,
    properties
  ]);

  // Handle property type selection
  const handlePropertyTypeChange = (type: string) => {
    if (type === 'all') {
      setSelectedPropertyTypes(['all']);
    } else {
      const newTypes = selectedPropertyTypes.filter((t) => t !== 'all');
      if (newTypes.includes(type)) {
        const filtered = newTypes.filter((t) => t !== type);
        setSelectedPropertyTypes(filtered.length === 0 ? ['all'] : filtered);
      } else {
        setSelectedPropertyTypes([...newTypes, type]);
      }
    }
  };

  // Handle amenity selection
  const handleAmenityChange = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  // Handle bedrooms filter
  const handleBedroomsFilter = (bedrooms: number | null) => {
    setBedroomsFilter(bedrooms === bedroomsFilter ? null : bedrooms);
  };

  // Reset all filters
  const resetFilters = () => {
    setPriceRange([500000, 3500000]);
    setSelectedPropertyTypes(['all']);
    setSelectedAmenities([]);
    setBedroomsFilter(null);
    setSearchQuery('');
  };

  // Toggle like status for a property
  const toggleLike = (id: string) => {
    setIsLiked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header with search and filters */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">
              Find Your Perfect Property
            </h1>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className={`${viewMode === 'map' ? 'bg-blue-50 text-blue-600' : ''}`}
                onClick={() => setViewMode('map')}
              >
                <Layers className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={`${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <List className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="mt-4 flex items-center space-x-2">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search by location, property name..."
                className="pl-10 pr-4 py-2 w-full border-gray-200 rounded-full focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            <Button
              variant={showFilters ? 'default' : 'outline'}
              className={`${showFilters ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </Button>
          </div>

          {/* Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Filters</h3>
                    <Button size="sm" onClick={resetFilters}>
                      Reset all
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Price Range */}
                    <div>
                      <h4 className="text-sm font-medium mb-2">
                        Price Range (per night)
                      </h4>
                      <div className="px-2">
                        <Slider
                          defaultValue={[500000, 3500000]}
                          min={500000}
                          max={3500000}
                          step={100000}
                          value={priceRange}
                          onValueChange={setPriceRange}
                          className="my-6"
                        />
                        <div className="flex justify-between text-sm">
                          <span>Rp {priceRange[0].toLocaleString()}</span>
                          <span>Rp {priceRange[1].toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Property Type */}
                    <div>
                      <h4 className="text-sm font-medium mb-2">
                        Property Type
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {propertyTypes.map((type) => (
                          <div
                            key={type.id}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`type-${type.id}`}
                              checked={selectedPropertyTypes.includes(type.id)}
                              onCheckedChange={() =>
                                handlePropertyTypeChange(type.id)
                              }
                            />
                            <label
                              htmlFor={`type-${type.id}`}
                              className="text-sm"
                            >
                              {type.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bedrooms */}
                    <div>
                      <h4 className="text-sm font-medium mb-2">Bedrooms</h4>
                      <div className="flex space-x-2">
                        {[1, 2, 3, 4].map((num) => (
                          <Button
                            key={num}
                            variant={
                              bedroomsFilter === num ? 'default' : 'outline'
                            }
                            size="sm"
                            className={`${bedroomsFilter === num ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
                            onClick={() => handleBedroomsFilter(num)}
                          >
                            {num}+
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Amenities */}
                  {/* <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Amenities</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                      {amenitiesOptions.map((amenity) => (
                        <div
                          key={amenity.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`amenity-${amenity.id}`}
                            checked={selectedAmenities.includes(amenity.id)}
                            onCheckedChange={() =>
                              handleAmenityChange(amenity.id)
                            }
                          />
                          <label
                            htmlFor={`amenity-${amenity.id}`}
                            className="text-sm"
                          >
                            {amenity.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div> */}

                  <div className="mt-4 flex justify-end">
                    <Button
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => setShowFilters(false)}
                    >
                      Show {filteredProperties.length} properties
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative">
        {/* Map View */}
        {viewMode === 'map' && (
          <div className="relative h-[calc(100vh-180px)]">
            <PropertyMap
              properties={filteredProperties}
              selectedProperty={selectedProperty}
              setSelectedProperty={setSelectedProperty}
              center={mapCenter}
              zoom={mapZoom}
              setCenter={setMapCenter}
              setZoom={setMapZoom}
            />

            {/* Property Info Popup */}
            <AnimatePresence>
              {selectedProperty && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute bottom-4 left-4 z-10 w-80 bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  {filteredProperties.map(
                    (property) =>
                      property.id === selectedProperty && (
                        <div key={property.id} className="relative">
                          <Button
                            size="icon"
                            className="absolute right-2 top-2 z-10 bg-white/80 backdrop-blur-sm hover:bg-white"
                            onClick={() => setSelectedProperty(null)}
                          >
                            <X className="w-4 h-4" />
                          </Button>

                          <div className="relative h-48">
                            <img
                              src={property.coverPicture || '/placeholder.svg'}
                              alt={property.name}
                              className="object-cover"
                            />
                            <button
                              onClick={() => toggleLike(property.id)}
                              className="absolute top-2 right-10 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm transition-colors hover:bg-white"
                            >
                              <Heart
                                className={`w-4 h-4 ${isLiked[property.id] ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                              />
                            </button>
                          </div>

                          <div className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-semibold text-lg line-clamp-1">
                                {property.name}
                              </h3>
                              <div className="flex items-center space-x-1 text-sm">
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                <span>{property.rating}</span>
                              </div>
                            </div>

                            <p className="text-gray-600 text-sm mb-2">
                              {property.location}
                            </p>

                            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                              <span>
                                {Number(property.guestCapacity)} guests
                              </span>
                              <span>•</span>
                              <span>
                                {Number(property.bedroomCount)} bedrooms
                              </span>
                              <span>•</span>
                              <span>
                                {Number(property.bathroomCount)} bathrooms
                              </span>
                            </div>

                            <div className="flex items-baseline space-x-1 mb-4">
                              <span className="text-lg font-semibold">
                                Rp {property.pricePerNight.toLocaleString()}
                              </span>
                              <span className="text-gray-500">/night</span>
                            </div>

                            <a href={`/properties/${property.id}`}>
                              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                View Details
                              </Button>
                            </a>
                          </div>
                        </div>
                      ),
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Results Count */}
            <div className="absolute top-4 right-4 z-10 bg-white px-4 py-2 rounded-full shadow-md">
              <span className="font-medium">{filteredProperties.length}</span>{' '}
              properties found
            </div>
          </div>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <div className="container mx-auto px-4 py-8">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                {filteredProperties.length} properties found
              </h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-white">Sort by:</span>
                <select className="border rounded-md px-2 py-1 text-sm text-white">
                  <option>Recommended</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Top Rated</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48">
                    <img
                      src={property.coverPicture || '/placeholder.svg'}
                      alt={property.name}
                      className="object-cover"
                    />
                    <button
                      onClick={() => toggleLike(property.id)}
                      className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm transition-colors hover:bg-white"
                    >
                      <Heart
                        className={`w-4 h-4 ${isLiked[property.id] ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                      />
                    </button>
                  </div>

                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg line-clamp-1">
                        {property.name}
                      </h3>
                      <div className="flex items-center space-x-1 text-sm">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span>{property.rating}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-2">
                      {property.location}
                    </p>

                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <span>{Number(property.guestCapacity)} guests</span>
                      <span>•</span>
                      <span>{Number(property.bedroomCount)} bedrooms</span>
                      <span>•</span>
                      <span>{Number(property.bathroomCount)} bathrooms</span>
                    </div>

                    <div className="flex items-baseline space-x-1 mb-4">
                      <span className="text-lg font-semibold">
                        Rp {property.pricePerNight.toLocaleString()}
                      </span>
                      <span className="text-gray-500">/night</span>
                    </div>

                    <a href={`/properties/${property.id}`}>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        View Details
                      </Button>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredProperties.length === 0 && (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                  <Search className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  No properties found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search filters
                </p>
                <Button variant="outline" onClick={resetFilters}>
                  Reset all filters
                </Button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
