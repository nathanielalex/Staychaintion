"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Search, SlidersHorizontal, Home, Building, Tent, Castle, Mountain, PocketIcon as Pool } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import PropertyCard from "@/components/properties/property-card"
import { SparklesCore } from "@/components/landing/sparkles"
import { Principal } from "@dfinity/principal"
import { Property_backend } from "@/declarations/Property_backend"
import { Property } from "@/declarations/Property_backend/Property_backend.did"
import { UnregisteredProperty } from "@/declarations/Property_backend/Property_backend.did"
import { PropertyStatus } from "@/declarations/Property_backend/Property_backend.did"

// Sample data

// interface Property {
//   id: number;
//   // owner: Principal;
//   name: string;
//   pricePerNight: number;
//   // description: string;
//   location: string;
//   // builtInDate: number;
//   bedroomCount: number;
//   guestCapacity: number;
//   bathroomCount: number;
//   rating: number;
//   image: string;
//   type: string;
// }

// const dummyProperty = [
//   {
//     id: 1,
//     name: "Luxury A-Frame Cabin",
//     location: "Tambon Huai Sat Yai, Thailand",
//     price: 1000000,
//     rating: 4.98,
//     image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gvONpOFIC37Bb7g9SlIBfIfbDwbSlT.png",
//     type: "cabin",
//     guests: 4,
//     bedrooms: 2,
//     bathrooms: 1,
//   },
//   // Add more properties...
// ]

const categories = [
  { id: "all", name: "All", icon: Home },
  { id: "apartment", name: "Apartments", icon: Building },
  { id: "cabin", name: "Cabins", icon: Home },
  { id: "camping", name: "Camping", icon: Tent },
  { id: "castle", name: "Castles", icon: Castle },
  { id: "mountain", name: "Mountain", icon: Mountain },
  { id: "pool", name: "Amazing Pools", icon: Pool },
]

export default function PropertiesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = async () => {
    try {
      // setLoading(true);
      // setError(null);
      // const actor = getChatActor();
      const result = await Property_backend.getAllProperties();
      setProperties(result);
    } catch (err) {
      setError('An error occurred while fetching contacts');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchProperties();
  }, [searchTerm]);

  const initProperties = async (newProperty: UnregisteredProperty) => {
    try {
      // setLoading(true);
      // setError(null);
      // const actor = getChatActor();
      const result = await Property_backend.registerProperty(newProperty);
    } catch (err) {
      setError('An error occurred while fetching contacts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Creating an instance of UnregisteredProperty
    const newProperty: UnregisteredProperty = {
      bedCount: 2n,
      status: { available : null },
      owner: Principal.fromText('aaaaa-aa'),
      pricePerNight: 1000000n,
      name: 'Luxury A-Frame Cabin',
      bedroomCount: 2n,
      bathroomCount: 1n,
      description: 'A beautiful cabin by the beach with a wonderful view.',
      builtInDate: '2020-06-15',
      guestCapacity: 4n,
      pictures: [],
      buildingType: 'cabin',
      location: 'Tambon Huai Sat Yai, Thailand',
      coverPicture: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gvONpOFIC37Bb7g9SlIBfIfbDwbSlT.png'
    };
    initProperties(newProperty);  // Set the property state with the new object
  }, []);

  

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || property.buildingType === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (

    <div className="min-h-screen overflow-x-hidden">
      {/* Ambient background with moving particles */}
      <div className="absolute inset-0">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={30}
          className="w-full h-full"
          particleColor="#4285F4"
        />
      </div>

      <div className="relative container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 h-12 rounded-full border-gray-200"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            <Button
              variant="outline"
              className="h-12 px-6 rounded-full border-gray-200"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              Filters
            </Button>
          </div>

          {/* Categories */}
          <div className="flex overflow-x-auto pb-4 space-x-4 scrollbar-hide">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  className={`flex-none px-6 rounded-full ${
                    selectedCategory === category.id ? "bg-blue-600 text-white" : "text-gray-600 hover:text-blue-600"
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {category.name}
                </Button>
              )
            })}
          </div>
        </motion.div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProperties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <PropertyCard property={property} />
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProperties.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <p className="text-gray-600">No properties found matching your criteria.</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

