"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function FeaturesSearch() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <section className="py-12">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl"
        >
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search for features, tools, or pages..."
              className="h-14 w-full rounded-full border-blue-100 bg-white pl-10 pr-4 shadow-lg focus-visible:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {searchQuery && (
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mt-2 rounded-lg border border-blue-100 bg-white p-4 shadow-lg"
            >
              <p className="text-sm text-gray-500">Quick search results will appear here...</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

