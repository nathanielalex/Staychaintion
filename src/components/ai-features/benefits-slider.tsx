"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const benefits = [
  {
    title: "Increased Efficiency",
    description: "Our AI-powered tools streamline your workflow, saving you time and effort.",
    image: "/images/ai/img3.png",
  },
  {
    title: "Enhanced Decision Making",
    description: "Leverage AI-driven insights to make more informed and data-backed decisions.",
    image: "/images/ai/img2.png",
  },
  {
    title: "Personalized Experience",
    description: "Enjoy a tailored user experience that adapts to your preferences and needs.",
    image: "/images/ai/img1.png",
  },
]

export default function BenefitsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % benefits.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + benefits.length) % benefits.length)
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center text-gray-900 mb-12"
        >
          Benefits of Our AI Technology
        </motion.h2>
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <Card className="p-6 md:p-8 flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-6 md:mb-0 md:mr-8">
                  <motion.img
                    src={benefits[currentIndex].image}
                    alt={benefits[currentIndex].title}
                    className="rounded-lg object-cover w-full h-64 md:h-auto"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  />
                </div>
                <div className="md:w-1/2">
                  <motion.h3
                    className="text-2xl font-semibold mb-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    {benefits[currentIndex].title}
                  </motion.h3>
                  <motion.p
                    className="text-gray-600"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    {benefits[currentIndex].description}
                  </motion.p>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
          <Button
            size="icon"
            className="absolute top-1/2 left-4 transform -translate-y-1/2"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            size="icon"
            className="absolute top-1/2 right-4 transform -translate-y-1/2"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  )
}

