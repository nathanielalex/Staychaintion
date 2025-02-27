"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Share2, Heart, Star, Users, Bed, Bath, MapPin, Award, CheckCircle, AlertCircle } from "lucide-react"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { GuestSelector } from "@/components/ui/guest-selector"

// Sample property data
const property = {
  id: 1,
  title: "Emotional healing accommodation in Icheon City, Seoul",
  location: "Sindun-myeon, Icheon-si, South Korea",
  images: [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hsMpfGk2cZ4bepjI9ieY48eHQrNym8.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hsMpfGk2cZ4bepjI9ieY48eHQrNym8.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hsMpfGk2cZ4bepjI9ieY48eHQrNym8.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hsMpfGk2cZ4bepjI9ieY48eHQrNym8.png",
  ],
  price: 1026383,
  rating: 4.84,
  reviews: 177,
  guests: 2,
  bedrooms: 1,
  beds: 1,
  baths: 1,
  host: {
    name: "Snow Lee",
    image: "/placeholder.svg?height=50&width=50",
    isSuperhost: true,
    hostingSince: "11 years",
  },
  highlights: [
    "50-min drive to Bukhansan National Park",
    "Exceptional check-in experience",
    "Free cancellation before Mar 18",
  ],
}

export default function PropertyDetailPage() {
  const [isLiked, setIsLiked] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [showAllImages, setShowAllImages] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Image Gallery */}
      <div className="relative">
        <div className="grid grid-cols-4 gap-2 h-[60vh]">
          {property.images.slice(0, 4).map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.2 }}
              className={`relative ${index === 0 ? "col-span-2 row-span-2" : ""} overflow-hidden`}
              onClick={() => setSelectedImageIndex(index)}
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`Property image ${index + 1}`}
                className="object-cover hover:scale-110 transition-transform duration-300"
              />
            </motion.div>
          ))}
          <Button
            variant="secondary"
            className="absolute bottom-4 right-4 bg-white"
            onClick={() => setShowAllImages(true)}
          >
            Show all photos
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl font-semibold mb-2">{property.title}</h1>
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{property.location}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon">
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => setIsLiked(!isLiked)}>
                  <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
              </div>
            </div>

            {/* Property Details */}
            <Card className="p-6 mb-8">
              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-gray-500" />
                  <span>{property.guests} guests</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Bed className="w-5 h-5 text-gray-500" />
                  <span>{property.bedrooms} bedroom</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Bed className="w-5 h-5 text-gray-500" />
                  <span>{property.beds} bed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Bath className="w-5 h-5 text-gray-500" />
                  <span>{property.baths} bath</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 mb-6">
                <Award className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium">Guest favorite</p>
                  <p className="text-sm text-gray-600">One of the most loved homes on Airbnb, according to guests</p>
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={property.host.image || "/placeholder.svg"}
                    alt={property.host.name}
                    width={56}
                    height={56}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-medium">Hosted by {property.host.name}</p>
                    <p className="text-sm text-gray-600">Superhost · {property.host.hostingSince} hosting</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Highlights */}
            <Card className="p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Property Highlights</h2>
              <div className="space-y-4">
                {property.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <p>{highlight}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-2xl font-semibold">Rp {property.price.toLocaleString()}</span>
                  <span className="text-gray-600"> / night</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-blue-600 fill-blue-600" />
                  <span className="font-medium">{property.rating}</span>
                  <span className="text-gray-600">({property.reviews} reviews)</span>
                </div>
              </div>

              <div className="space-y-4">
                <DatePickerWithRange />
                <GuestSelector maxGuests={property.guests} />
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-lg">Reserve</Button>
              </div>

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex justify-between">
                  <span>Rp {property.price.toLocaleString()} × 5 nights</span>
                  <span>Rp {(property.price * 5).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cleaning fee</span>
                  <span>Rp 171,064</span>
                </div>
                <div className="flex justify-between">
                  <span>Service fee</span>
                  <span>Rp 279,091</span>
                </div>
                <div className="pt-4 border-t flex justify-between font-semibold">
                  <span>Total before taxes</span>
                  <span>Rp 6,282,070</span>
                </div>
              </div>

              <div className="mt-6 flex items-start space-x-2 p-4 bg-blue-50 rounded-lg">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <p className="text-sm text-blue-600">This is a rare find. Snow Lee's place is usually fully booked.</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

