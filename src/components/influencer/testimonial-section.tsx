"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Travel Blogger",
    image: "/images/testimony/img2.png",
    quote:
      "Joining Staychaintion's affiliate program has been a game-changer for my blog. The commissions are great, and my audience loves the exclusive deals!",
  },
  {
    name: "Mike Chen",
    role: "YouTube Travel Vlogger",
    image: "/images/testimony/img1.png",
    quote:
      "The support from the Staychaintion team is unparalleled. They provide all the tools and resources I need to succeed as an affiliate.",
  },
  {
    name: "Emma Rodriguez",
    role: "Instagram Influencer",
    image: "/images/testimony/img3.png",
    quote:
      "I've worked with many travel affiliate programs, but Staychaintion stands out with its user-friendly platform and amazing property selection.",
  },
]

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl font-semibold text-blue-800 mb-12 text-center"
        >
          What Our Partners Say
        </motion.h2>
        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-8 text-center">
                <Quote className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <p className="text-xl text-gray-600 mb-6">"{testimonials[currentIndex].quote}"</p>
                <div className="flex items-center justify-center">
                  <img
                    src={testimonials[currentIndex].image || "/placeholder.svg"}
                    alt={testimonials[currentIndex].name}
                    width={60}
                    height={60}
                    className="rounded-full mr-4"
                  />
                  <div className="text-left">
                    <p className="font-semibold">{testimonials[currentIndex].name}</p>
                    <p className="text-gray-600">{testimonials[currentIndex].role}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
          <Button
            // variant="ghost"
            size="icon"
            className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-full"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </Button>
          <Button
            // variant="ghost"
            size="icon"
            className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-full"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </Button>
        </div>
      </div>
    </section>
  )
}

