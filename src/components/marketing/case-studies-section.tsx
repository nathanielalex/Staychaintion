"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const caseStudies = [
  {
    title: "Boutique Hotel Boosts Bookings by 200%",
    description: "Learn how a small hotel in Bali used our platform to dramatically increase their occupancy rate.",
    image: "/images/marketing/img1.png",
  },
  {
    title: "Vacation Rental Owner Increases Revenue by 150%",
    description: "Discover how a property owner in Costa Rica optimized their listing and pricing strategy.",
    image: "/images/marketing/img2.png",
  },
  {
    title: "City Apartment Achieves 95% Occupancy Rate",
    description: "See how a New York City apartment owner maintains near-full occupancy year-round.",
    image: "/images/marketing/img3.png",
  },
]

export default function CaseStudiesSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === caseStudies.length - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? caseStudies.length - 1 : prevIndex - 1))
  }

  return (
    <section className="mb-20">
      <h2 className="text-3xl font-semibold text-blue-800 mb-8">Case Studies & Success Stories</h2>
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-6 md:p-8 flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-6 md:mb-0 md:mr-8">
                <img
                  src={caseStudies[currentIndex].image || "/placeholder.svg"}
                  alt={caseStudies[currentIndex].title}
                  width={600}
                  height={400}
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="md:w-1/2">
                <h3 className="text-2xl font-semibold mb-4">{caseStudies[currentIndex].title}</h3>
                <p className="text-gray-600 mb-6">{caseStudies[currentIndex].description}</p>
                <Button variant="outline">Read Full Case Study</Button>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 hover:text-black"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-6 w-6 text-white hover:text-black" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-1/2 right-4 transform -translate-y-1/2 hover:text-black"
          onClick={nextSlide}
        >
          <ChevronRight className="h-6 w-6 text-white hover:text-black" />
        </Button>
      </div>
    </section>
  )
}

