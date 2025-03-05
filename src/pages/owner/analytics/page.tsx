"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { Calendar, Download, Filter } from "lucide-react"

const monthlyData = [
  { name: "Jan", bookings: 65, revenue: 4000, occupancy: 70 },
  { name: "Feb", bookings: 59, revenue: 3000, occupancy: 65 },
  { name: "Mar", bookings: 80, revenue: 5000, occupancy: 85 },
  { name: "Apr", bookings: 81, revenue: 5200, occupancy: 87 },
  { name: "May", bookings: 56, revenue: 3800, occupancy: 62 },
  { name: "Jun", bookings: 55, revenue: 3700, occupancy: 60 },
  { name: "Jul", bookings: 40, revenue: 2800, occupancy: 45 },
  { name: "Aug", bookings: 75, revenue: 4900, occupancy: 80 },
  { name: "Sep", bookings: 65, revenue: 4200, occupancy: 70 },
  { name: "Oct", bookings: 70, revenue: 4500, occupancy: 75 },
  { name: "Nov", bookings: 60, revenue: 4000, occupancy: 65 },
  { name: "Dec", bookings: 90, revenue: 6000, occupancy: 95 },
]

const propertyTypes = [
  { name: "Apartment", value: 4 },
  { name: "House", value: 2 },
  { name: "Villa", value: 1 },
  { name: "Cabin", value: 1 },
]

const COLORS = ["#2563eb", "#3b82f6", "#60a5fa", "#93c5fd"]

const guestData = [
  { name: "New", value: 65 },
  { name: "Returning", value: 35 },
]

const GUEST_COLORS = ["#2563eb", "#e5e7eb"]

export default function AnalyticsPage() {
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
          <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
          <p className="text-gray-500">Track your property performance and insights</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            Last 12 months
          </Button>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </motion.div>

      <motion.div variants={item}>
        <Tabs defaultValue="revenue" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="occupancy">Occupancy</TabsTrigger>
          </TabsList>
        </Tabs>
      </motion.div>

      {/* Revenue Chart */}
      <motion.div variants={item}>
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Revenue Trends</h3>
            <div className="text-2xl font-bold text-blue-600">$46,100</div>
          </div>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#2563eb" fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </motion.div>

      {/* Property Distribution and Guest Type */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={item}>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Property Distribution</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={propertyTypes}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {propertyTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Guest Type</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={guestData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {guestData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={GUEST_COLORS[index % GUEST_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Bookings and Occupancy Comparison */}
      <motion.div variants={item}>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Bookings & Occupancy Comparison</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="bookings" fill="#2563eb" name="Bookings" />
                <Bar yAxisId="right" dataKey="occupancy" fill="#60a5fa" name="Occupancy %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </motion.div>

      {/* Performance Metrics */}
      <motion.div variants={item}>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Key Performance Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <p className="text-gray-500">Average Daily Rate</p>
              <p className="text-3xl font-bold text-blue-600">$125</p>
              <p className="text-sm text-green-600">+12% vs last year</p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-500">Revenue Per Available Room</p>
              <p className="text-3xl font-bold text-blue-600">$94</p>
              <p className="text-sm text-green-600">+8% vs last year</p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-500">Average Length of Stay</p>
              <p className="text-3xl font-bold text-blue-600">4.2 days</p>
              <p className="text-sm text-green-600">+0.5 days vs last year</p>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}

