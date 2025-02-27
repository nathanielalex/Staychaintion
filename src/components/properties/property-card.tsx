"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Star, Heart } from "lucide-react"

interface PropertyCardProps {
  property: {
    id: number
    name: string
    location: string
    price: number
    rating: number
    image: string
    guests: number
    bedrooms: number
    bathrooms: number
  }
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div whileHover={{ y: -5 }} onHoverStart={() => setIsHovered(true)} onHoverEnd={() => setIsHovered(false)}>
      <Card className="overflow-hidden group">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={property.image || "/placeholder.svg"}
            alt={property.name}
            className={`object-cover transition-transform duration-300 ${isHovered ? "scale-110" : "scale-100"}`}
          />
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm transition-colors hover:bg-white"
          >
            <Heart className={`w-5 h-5 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
          </button>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-lg line-clamp-1">{property.name}</h3>
            <div className="flex items-center space-x-1 text-sm">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span>{property.rating}</span>
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-2">{property.location}</p>

          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
            <span>{property.guests} guests</span>
            <span>•</span>
            <span>{property.bedrooms} bedrooms</span>
            <span>•</span>
            <span>{property.bathrooms} bathrooms</span>
          </div>

          <div className="flex items-baseline space-x-1">
            <span className="text-lg font-semibold">Rp {property.price.toLocaleString()}</span>
            <span className="text-gray-500">/night</span>
          </div>
        </div>

        {/* Hover Overlay */}
        <div
          className={`absolute inset-0 bg-black/5 pointer-events-none transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />
      </Card>
    </motion.div>
  )
}

