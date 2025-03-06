"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Star, Heart, MapPin, Calendar, Users, Bed, Bath } from "lucide-react"

// Sample data
const properties = [
  {
    id: 1,
    name: "Luxury Beach Villa",
    type: "Villa",
    location: "Miami, FL",
    price: 1200,
    bedrooms: 4,
    bathrooms: 3,
    guests: 8,
    status: "booked",
    dates: "Jun 15 - Jun 20, 2024",
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=300",
    isFavorite: true,
  },
  {
    id: 2,
    name: "City Center Apartment",
    type: "Apartment",
    location: "New York, NY",
    price: 800,
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    status: "viewed",
    dates: null,
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300",
    isFavorite: true,
  },
  {
    id: 3,
    name: "Mountain Cabin",
    type: "Cabin",
    location: "Aspen, CO",
    price: 950,
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    status: "booked",
    dates: "Jul 10 - Jul 15, 2024",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300",
    isFavorite: false,
  },
  {
    id: 4,
    name: "Lakefront Cottage",
    type: "Cottage",
    location: "Lake Tahoe, CA",
    price: 1050,
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    status: "viewed",
    dates: null,
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=300",
    isFavorite: false,
  },
  {
    id: 5,
    name: "Modern Downtown Loft",
    type: "Apartment",
    location: "Chicago, IL",
    price: 750,
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    status: "saved",
    dates: null,
    rating: 4.5,
    image: "/placeholder.svg?height=200&width=300",
    isFavorite: true,
  },
]

export default function PropertiesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [favorites, setFavorites] = useState<number[]>(properties.filter((p) => p.isFavorite).map((p) => p.id))

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]))
  }

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "booked" && property.status === "booked") ||
      (activeTab === "saved" && favorites.includes(property.id))
    return matchesSearch && matchesTab
  })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Properties</h1>
          <p className="text-gray-500">Browse your booked and saved properties</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Search className="w-4 h-4 mr-2" />
          Find New Places
        </Button>
      </motion.div>

      <motion.div variants={item} className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search properties..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </motion.div>

      <motion.div variants={item}>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Properties</TabsTrigger>
            <TabsTrigger value="booked">Booked</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
          </TabsList>
        </Tabs>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <motion.div
            key={property.id}
            variants={item}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
            className="group"
          >
            <Card className="overflow-hidden h-full">
              <div className="relative">
                <div className="relative h-48">
                  <img
                    src={property.image || "/placeholder.svg"}
                    alt={property.name}
                    
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white"
                    onClick={() => toggleFavorite(property.id)}
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        favorites.includes(property.id) ? "text-red-500 fill-red-500" : "text-gray-600"
                      }`}
                    />
                  </Button>
                  {property.status === "booked" && (
                    <Badge className="absolute top-2 left-2 bg-green-100 text-green-800 hover:bg-green-100">
                      Booked
                    </Badge>
                  )}
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">{property.name}</h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                    <span>{property.rating}</span>
                  </div>
                </div>

                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{property.location}</span>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="flex items-center text-sm text-gray-500">
                    <Bed className="h-3 w-3 mr-1" />
                    <span>{property.bedrooms} Beds</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Bath className="h-3 w-3 mr-1" />
                    <span>{property.bathrooms} Baths</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-3 w-3 mr-1" />
                    <span>{property.guests} Guests</span>
                  </div>
                </div>

                {property.dates && (
                  <div className="flex items-center text-sm text-blue-600 mb-3">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{property.dates}</span>
                  </div>
                )}

                <div className="flex justify-between items-center mt-4">
                  <p className="font-semibold">
                    ${property.price}
                    <span className="text-sm text-gray-500">/night</span>
                  </p>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    {property.status === "booked" ? "View Booking" : "View Details"}
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {filteredProperties.length === 0 && (
        <motion.div variants={item} className="text-center py-12">
          <p className="text-gray-500">No properties found matching your criteria.</p>
        </motion.div>
      )}
    </motion.div>
  )
}

