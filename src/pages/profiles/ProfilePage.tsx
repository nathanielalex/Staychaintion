"use client"

import { Card } from "@/components/ui/card"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Home, Users, DollarSign, TrendingUp } from "lucide-react"

const data = [
  { month: "Jan", bookings: 65, revenue: 4000 },
  { month: "Feb", bookings: 59, revenue: 3000 },
  { month: "Mar", bookings: 80, revenue: 2000 },
  { month: "Apr", bookings: 81, revenue: 2780 },
  { month: "May", bookings: 56, revenue: 1890 },
  { month: "Jun", bookings: 55, revenue: 2390 },
]

const stats = [
  { title: "Total Properties", value: "12", icon: Home, trend: "+2 this month" },
  { title: "Total Guests", value: "1,234", icon: Users, trend: "+123 this month" },
  { title: "Revenue", value: "$12,345", icon: DollarSign, trend: "+15% vs last month" },
  { title: "Occupancy Rate", value: "89%", icon: TrendingUp, trend: "+5% vs last month" },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-6">
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
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Booking Trends</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="bookings" stroke="#2563eb" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  )
}

