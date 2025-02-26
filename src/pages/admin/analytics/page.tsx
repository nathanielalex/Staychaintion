"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import {
  LineChart,
  Line,
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

const monthlyData = [
  { name: "Jan", bookings: 65, revenue: 4000 },
  { name: "Feb", bookings: 59, revenue: 3000 },
  { name: "Mar", bookings: 80, revenue: 2000 },
  { name: "Apr", bookings: 81, revenue: 2780 },
  { name: "May", bookings: 56, revenue: 1890 },
  { name: "Jun", bookings: 55, revenue: 2390 },
]

const propertyTypes = [
  { name: "Apartment", value: 400 },
  { name: "House", value: 300 },
  { name: "Villa", value: 200 },
  { name: "Condo", value: 100 },
]

const COLORS = ["#2563eb", "#3b82f6", "#60a5fa", "#93c5fd"]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Analytics Overview</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bookings Trend */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Bookings Trend</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="bookings"
                    stroke="#2563eb"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        {/* Revenue Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Revenue Analysis</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke="#2563eb" fill="#93c5fd" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        {/* Property Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
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
                    label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
                      const RADIAN = Math.PI / 180
                      const radius = 25 + innerRadius + (outerRadius - innerRadius)
                      const x = cx + radius * Math.cos(-midAngle * RADIAN)
                      const y = cy + radius * Math.sin(-midAngle * RADIAN)

                      return (
                        <text
                          x={x}
                          y={y}
                          fill="#374151"
                          textAnchor={x > cx ? "start" : "end"}
                          dominantBaseline="central"
                        >
                          {propertyTypes[index].name} ({value})
                        </text>
                      )
                    }}
                  >
                    {propertyTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        {/* Monthly Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Monthly Comparison</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="bookings" fill="#2563eb" />
                  <Bar dataKey="revenue" fill="#93c5fd" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

