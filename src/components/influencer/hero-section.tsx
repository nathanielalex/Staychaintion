"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-blue-800 mb-6">Join Our Influencer & Affiliate Program</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Partner with Staychaintion and unlock exclusive rewards while sharing amazing travel experiences with your
            audience.
          </p>
          <a href="#benefit-section">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              Apply Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

