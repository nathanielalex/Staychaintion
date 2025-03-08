"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Heart, Star, MapPin, ArrowRight, Search, Home, MessageSquare } from "lucide-react"

const upcomingBookings = [
  {
    id: 1,
    property: "Luxury Beach Villa",
    location: "Miami, FL",
    checkIn: "2024-06-15",
    checkOut: "2024-06-20",
    image: "https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg",
    price: 1200,
    status: "confirmed",
  },
  {
    id: 2,
    property: "Mountain Cabin",
    location: "Aspen, CO",
    checkIn: "2024-07-10",
    checkOut: "2024-07-15",
    image: "https://i.ibb.co.com/jPxJFbHt/Staychaintion-Property-Placeholder1.jpg",
    price: 950,
    status: "pending",
  },
]

const recentActivity = [
  {
    id: 1,
    type: "booking",
    title: "Booking Confirmed",
    description: "Your booking for Luxury Beach Villa has been confirmed",
    time: "2 hours ago",
    icon: Calendar,
  },
  {
    id: 2,
    type: "favorite",
    title: "Property Saved",
    description: "You saved City Center Apartment to your favorites",
    time: "Yesterday",
    icon: Heart,
  },
  {
    id: 3,
    type: "review",
    title: "Review Submitted",
    description: "You left a 5-star review for Mountain Cabin",
    time: "3 days ago",
    icon: Star,
  },
  {
    id: 4,
    type: "message",
    title: "New Message",
    description: "You received a message from property owner John",
    time: "1 week ago",
    icon: MessageSquare,
  },
]

const recommendedProperties = [
  {
    id: 1,
    name: "Beachfront Paradise",
    location: "Cancun, Mexico",
    price: 180,
    rating: 4.9,
    reviews: 124,
    image: "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg",
  },
  {
    id: 2,
    name: "Urban Loft",
    location: "New York, NY",
    price: 150,
    rating: 4.7,
    reviews: 89,
    image: "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg",
  },
  {
    id: 3,
    name: "Mountain Retreat",
    location: "Denver, CO",
    price: 120,
    rating: 4.8,
    reviews: 56,
    image: "https://i.ibb.co.com/23VCP6fV/Staychaintion-Property-Placeholder2.jpg",
  },
]

export default function UserDashboard() {
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
          <h1 className="text-2xl font-semibold text-gray-900">Welcome, Renter!</h1>
          <p className="text-gray-500">Here's what's happening with your bookings</p>
        </div>
        <a href="/properties">
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Search className="w-4 h-4 mr-2" />
          Find New Places
        </Button>
        </a>
      </motion.div>

      {/* Stats Overview */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Upcoming Trips</p>
              <h3 className="text-2xl font-semibold">2</h3>
            </div>
          </div>
        </Card>
        <Card className="p-6 border-l-4 border-pink-500">
          <div className="flex items-center">
            <div className="rounded-full bg-pink-100 p-3 mr-4">
              <Heart className="w-6 h-6 text-pink-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Saved Properties</p>
              <h3 className="text-2xl font-semibold">12</h3>
            </div>
          </div>
        </Card>
        <Card className="p-6 border-l-4 border-yellow-500">
          <div className="flex items-center">
            <div className="rounded-full bg-yellow-100 p-3 mr-4">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Reviews Given</p>
              <h3 className="text-2xl font-semibold">8</h3>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Upcoming Bookings */}
      <motion.div variants={item}>
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Upcoming Bookings</h2>
            <Button variant="ghost" size="sm" className="text-blue-600">
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          {upcomingBookings.length > 0 ? (
            <div className="space-y-6">
              {upcomingBookings.map((booking) => (
                <motion.div key={booking.id} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                  <Card className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="relative w-full md:w-48 h-48 md:h-auto">
                        <img
                          src={booking.image || "/placeholder.svg"}
                          alt={booking.property}
                          
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6 flex-grow">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold">{booking.property}</h3>
                            <div className="flex items-center text-gray-500 mt-1">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{booking.location}</span>
                            </div>
                          </div>
                          <Badge
                            className={`mt-2 md:mt-0 ${
                              booking.status === "confirmed"
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                            }`}
                          >
                            {booking.status}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-500">Check-in</p>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 text-blue-600 mr-1" />
                              <p className="font-medium">{new Date(booking.checkIn).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Check-out</p>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 text-blue-600 mr-1" />
                              <p className="font-medium">{new Date(booking.checkOut).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Total</p>
                            <p className="font-semibold text-green-600">${booking.price}</p>
                          </div>
                        </div>

                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            Manage Booking
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Home className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming bookings</h3>
              <p className="text-gray-500 mb-6">Start exploring and book your next stay!</p>
              <Button className="bg-blue-600 hover:bg-blue-700">Find Properties</Button>
            </div>
          )}
        </Card>
      </motion.div>

      {/* Recent Activity and Recommended Properties */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <motion.div variants={item} className="lg:col-span-1">
          <Card className="p-6 h-full">
            <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div
                    className={`rounded-full p-2 ${
                      activity.type === "booking"
                        ? "bg-blue-100 text-blue-600"
                        : activity.type === "favorite"
                          ? "bg-pink-100 text-pink-600"
                          : activity.type === "review"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-green-100 text-green-600"
                    }`}
                  >
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-grow">
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.description}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Recommended Properties */}
        <motion.div variants={item} className="lg:col-span-2">
          <Card className="p-6 h-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Recommended For You</h2>
              <Button variant="ghost" size="sm" className="text-blue-600">
                View All
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendedProperties.map((property) => (
                <motion.div key={property.id} whileHover={{ y: -5 }} transition={{ duration: 0.2 }} className="group">
                  <div className="rounded-lg overflow-hidden border border-gray-200 h-full">
                    <div className="relative h-40">
                      <img
                        src={property.image || "/placeholder.svg"}
                        alt={property.name}
                        
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white"
                      >
                        <Heart className="h-4 w-4 text-gray-600 group-hover:text-red-500" />
                      </Button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 line-clamp-1">{property.name}</h3>
                      <div className="flex items-center text-gray-500 text-sm mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{property.location}</span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm ml-1">{property.rating}</span>
                          <span className="text-xs text-gray-500 ml-1">({property.reviews})</span>
                        </div>
                        <p className="font-semibold">${property.price}/night</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Travel Inspiration */}
      <motion.div variants={item}>
        <Card className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-semibold mb-2">Looking for Travel Inspiration?</h2>
              <p className="text-blue-100">Discover trending destinations and exclusive deals</p>
            </div>
            <Button className="bg-white text-blue-600 hover:bg-blue-50">Explore Destinations</Button>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}

