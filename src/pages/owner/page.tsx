"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Home, Users, DollarSign, TrendingUp, ArrowRight, Star, Clock } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const bookingData = [
  { month: "Jan", bookings: 65, revenue: 4000 },
  { month: "Feb", bookings: 59, revenue: 3000 },
  { month: "Mar", bookings: 80, revenue: 2000 },
  { month: "Apr", bookings: 81, revenue: 2780 },
  { month: "May", bookings: 56, revenue: 1890 },
  { month: "Jun", bookings: 55, revenue: 2390 },
]

const occupancyData = [
  { name: "Occupied", value: 75 },
  { name: "Vacant", value: 25 },
]

const COLORS = ["#2563eb", "#e5e7eb"]

const stats = [
  { title: "Total Properties", value: "8", icon: Home, trend: "+2 this month" },
  { title: "Total Guests", value: "124", icon: Users, trend: "+12 this month" },
  { title: "Revenue", value: "$8,245", icon: DollarSign, trend: "+15% vs last month" },
  { title: "Occupancy Rate", value: "75%", icon: TrendingUp, trend: "+5% vs last month" },
]

const recentBookings = [
  {
    id: 1,
    property: "Luxury Beach Villa",
    guest: "Emma Thompson",
    checkIn: "2024-06-15",
    checkOut: "2024-06-20",
    status: "confirmed",
    amount: 1200,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    property: "City Center Apartment",
    guest: "Michael Chen",
    checkIn: "2024-06-22",
    checkOut: "2024-06-25",
    status: "pending",
    amount: 450,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    property: "Mountain Cabin",
    guest: "Sarah Johnson",
    checkIn: "2024-07-01",
    checkOut: "2024-07-07",
    status: "confirmed",
    amount: 850,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const propertyPerformance = [
  {
    name: "Luxury Beach Villa",
    occupancy: 90,
    revenue: 5200,
    rating: 4.9,
    reviews: 24,
  },
  {
    name: "City Center Apartment",
    occupancy: 75,
    revenue: 2100,
    rating: 4.7,
    reviews: 18,
  },
  {
    name: "Mountain Cabin",
    occupancy: 60,
    revenue: 950,
    rating: 4.8,
    reviews: 12,
  },
]

export default function OwnerDashboard() {
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
      <motion.div variants={item}>
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard Overview</h1>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            variants={item}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="relative overflow-hidden"
          >
            <Card className="p-6 h-full border-t-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <h3 className="text-2xl font-semibold mt-1">{stat.value}</h3>
                  <p className="text-sm text-green-600 mt-1">{stat.trend}</p>
                </div>
                <div className="rounded-full bg-blue-50 p-3">
                  <stat.icon className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={item}>
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Booking Trends</h3>
              <Button variant="ghost" size="sm" className="text-blue-600">
                View Details
              </Button>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={bookingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="bookings" stroke="#2563eb" strokeWidth={2} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Revenue Overview</h3>
              <Button variant="ghost" size="sm" className="text-blue-600">
                View Details
              </Button>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bookingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#2563eb" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Occupancy and Recent Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={item} className="lg:col-span-1">
          <Card className="p-6 h-full">
            <h3 className="text-lg font-semibold mb-4">Occupancy Rate</h3>
            <div className="h-[250px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={occupancyData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {occupancyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-600 mr-2"></div>
                  <span className="text-sm">Occupied</span>
                </div>
                <span className="text-sm font-medium">75%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-gray-200 mr-2"></div>
                  <span className="text-sm">Vacant</span>
                </div>
                <span className="text-sm font-medium">25%</span>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={item} className="lg:col-span-2">
          <Card className="p-6 h-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Recent Bookings</h3>
              <Button variant="ghost" size="sm" className="text-blue-600">
                View All
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={booking.avatar} />
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {booking.guest
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{booking.guest}</p>
                      <p className="text-sm text-gray-500">{booking.property}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={booking.status === "confirmed" ? "default" : "secondary"}
                      className={
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                      }
                    >
                      {booking.status}
                    </Badge>
                    <p className="text-sm text-gray-500 mt-1">${booking.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Property Performance */}
      <motion.div variants={item}>
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Property Performance</h3>
            <Button variant="ghost" size="sm" className="text-blue-600">
              View All Properties
            </Button>
          </div>
          <div className="space-y-6">
            {propertyPerformance.map((property) => (
              <div key={property.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">{property.name}</h4>
                  <div className="flex items-center space-x-1 text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span>{property.rating}</span>
                    <span className="text-gray-500">({property.reviews})</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-500">Occupancy</span>
                      <span className="text-sm font-medium">{property.occupancy}%</span>
                    </div>
                    <Progress value={property.occupancy} className="h-2" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-green-500" />
                      <span className="font-medium">${property.revenue}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">30 days</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}

