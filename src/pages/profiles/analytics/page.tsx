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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { Calendar, Download, Filter, Info } from "lucide-react"
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const bookingData = [
  { month: "Jan", bookings: 1, spending: 1200 },
  { month: "Feb", bookings: 0, spending: 0 },
  { month: "Mar", bookings: 2, spending: 2400 },
  { month: "Apr", bookings: 1, spending: 1500 },
  { month: "May", bookings: 0, spending: 0 },
  { month: "Jun", bookings: 3, spending: 3600 },
  { month: "Jul", bookings: 2, spending: 2800 },
  { month: "Aug", bookings: 1, spending: 1200 },
  { month: "Sep", bookings: 0, spending: 0 },
  { month: "Oct", bookings: 1, spending: 1400 },
  { month: "Nov", bookings: 2, spending: 2200 },
  { month: "Dec", bookings: 3, spending: 4500 },
]

const categoryData = [
  { name: "Beach", value: 45 },
  { name: "Mountain", value: 20 },
  { name: "City", value: 25 },
  { name: "Countryside", value: 10 },
]

const COLORS = ["#2563eb", "#3b82f6", "#60a5fa", "#93c5fd"]

const durationData = [
  { name: "1-3 days", value: 30 },
  { name: "4-7 days", value: 45 },
  { name: "8-14 days", value: 20 },
  { name: "15+ days", value: 5 },
]

const DURATION_COLORS = ["#93c5fd", "#60a5fa", "#3b82f6", "#2563eb"]

const preferenceData = [
  {
    subject: "Price",
    user: 80,
    average: 70,
  },
  {
    subject: "Location",
    user: 90,
    average: 85,
  },
  {
    subject: "Amenities",
    user: 75,
    average: 65,
  },
  {
    subject: "Reviews",
    user: 85,
    average: 75,
  },
  {
    subject: "Cleanliness",
    user: 95,
    average: 80,
  },
]

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
          <h1 className="text-2xl font-semibold text-gray-900">Your Analytics</h1>
          <p className="text-gray-500">Track your booking patterns and preferences</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            Last 12 months
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </motion.div>

      <motion.div variants={item}>
        <Tabs defaultValue="spending" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="spending">Spending</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
          </TabsList>
        </Tabs>
      </motion.div>

      {/* Spending Chart */}
      <motion.div variants={item}>
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <h3 className="text-lg font-semibold">Spending Overview</h3>
              <TooltipProvider>
                <UITooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 ml-2 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Your total spending on bookings over time</p>
                  </TooltipContent>
                </UITooltip>
              </TooltipProvider>
            </div>
            <div className="text-2xl font-bold text-blue-600">$20,800</div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={bookingData}>
                <defs>
                  <linearGradient id="colorSpending" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="spending" stroke="#2563eb" fillOpacity={1} fill="url(#colorSpending)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </motion.div>

      {/* Booking Patterns */}
      <motion.div variants={item}>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Booking Patterns</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bookingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="bookings" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </motion.div>

      {/* Preferences and Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={item}>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Your Preferences</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={preferenceData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar name="Your Preferences" dataKey="user" stroke="#2563eb" fill="#2563eb" fillOpacity={0.6} />
                  <Radar name="Average User" dataKey="average" stroke="#93c5fd" fill="#93c5fd" fillOpacity={0.6} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Property Categories</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Stay Duration */}
      <motion.div variants={item}>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Stay Duration</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={durationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {durationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={DURATION_COLORS[index % DURATION_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </motion.div>

      {/* Insights */}
      <motion.div variants={item}>
        <Card className="p-6 bg-blue-50">
          <h3 className="text-lg font-semibold mb-4">Your Booking Insights</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="rounded-full bg-blue-100 p-2">
                <Calendar className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Peak Booking Season</p>
                <p className="text-sm text-gray-600">
                  You tend to book most frequently during summer months (June-August)
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="rounded-full bg-blue-100 p-2">
                <Info className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Spending Pattern</p>
                <p className="text-sm text-gray-600">
                  Your average booking cost is $1,733, which is 15% higher than the average user
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="rounded-full bg-blue-100 p-2">
                <Filter className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Preferred Properties</p>
                <p className="text-sm text-gray-600">
                  You show a strong preference for beach properties with high ratings
                </p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}

