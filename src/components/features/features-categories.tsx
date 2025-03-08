"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Home, Users, Briefcase, Shield, Lightbulb, Settings } from "lucide-react"

const categories = [
  { id: "all", name: "All Features", icon: Home },
  { id: "user", name: "User Features", icon: Users },
  { id: "owner", name: "Owner Features", icon: Briefcase },
  { id: "admin", name: "Admin Features", icon: Shield },
  { id: "community", name: "Community Features", icon: Lightbulb },
  { id: "settings", name: "Settings & Tools", icon: Settings },
]

export default function FeaturesCategories() {
  const [activeCategory, setActiveCategory] = useState("all")

  return (
    <section className="py-12 bg-blue-50">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Browse by Category</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Find features organized by user type and functionality
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 flex flex-wrap justify-center gap-3"
        >
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              className={`rounded-full px-6 ${
                activeCategory === category.id
                  ? "bg-blue-600 text-white"
                  : "border-blue-200 bg-white text-gray-700 hover:bg-blue-50"
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              <category.icon className="mr-2 h-4 w-4" />
              {category.name}
            </Button>
          ))}
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-xl bg-white p-8 shadow-sm"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activeCategory === "all" && (
              <div className="rounded-lg border border-blue-100 bg-blue-50 p-6">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">All Platform Features</h3>
                <p className="text-gray-600">
                  Showing all available features across the platform. Use the category filters to narrow down your
                  search.
                </p>
              </div>
            )}

            {activeCategory === "user" && (
              <div className="rounded-lg border border-blue-100 bg-blue-50 p-6">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">User-Specific Features</h3>
                <p className="text-gray-600">
                  Features designed specifically for regular users of the platform, including property browsing,
                  booking, and account management.
                </p>
              </div>
            )}

            {/* Placeholder content for other categories */}
            <div className="rounded-lg border border-dashed border-gray-200 p-6">
              <p className="text-center text-gray-500">Category content will appear here based on your selection</p>
            </div>

            <div className="rounded-lg border border-dashed border-gray-200 p-6">
              <p className="text-center text-gray-500">Additional features will be displayed here</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

