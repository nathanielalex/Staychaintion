"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    content:
      "ResearchAI has transformed the way we handle academic papers. The AI-powered analysis saves us countless hours and provides insights we might have missed.",
    author: "Dr. Emily Thompson",
    role: "Research Director",
    company: "Stanford University",
    image: "/images/testimony/img1.png",
    companyLogo: "/images/testimony/img4.png",
  },
  {
    id: 2,
    content:
      "The automated summarization feature is incredible. It helps our team quickly understand complex research papers and make informed decisions faster.",
    author: "Michael Chen",
    role: "Lead Data Scientist",
    company: "TechCorp Research",
    image: "/images/testimony/img2.png",
    companyLogo: "/images/testimony/img5.png",
  },
  {
    id: 3,
    content:
      "As a research institution, we needed a tool that could handle vast amounts of scientific literature. ResearchAI exceeded our expectations in every way.",
    author: "Dr. Sarah Martinez",
    role: "Head of Research",
    company: "BioTech Industries",
    image: "/images/testimony/img3.png",
    companyLogo: "/images/testimony/img6.png",
  },
]

export default function TestimonySection() {

  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  const paginate = useCallback(
    (newDirection: number) => {
      if (isAnimating) return
      setDirection(newDirection)
      setCurrentIndex((prevIndex) => (prevIndex + newDirection + testimonials.length) % testimonials.length)
    },
    [isAnimating],
  )

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating) {
        paginate(1)
      }
    }, 5000)

    return () => clearInterval(timer)
  }, [isAnimating, paginate])

  return (
    <section className="py-20 px-4 relative overflow-hidden bg-gradient-to-b from-white to-blue-50">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover how ResearchAI is transforming research workflows around the world
          </p>
        </motion.div>

        {/* Testimonials Slider */}
        <div className="relative max-w-4xl mx-auto px-4">
          <div className="relative h-[400px] flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x)

                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1)
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1)
                  }
                }}
                onAnimationStart={() => setIsAnimating(true)}
                onAnimationComplete={() => setIsAnimating(false)}
                className="absolute w-full"
              >
                <div className="bg-white rounded-2xl p-8 shadow-xl">
                  <div className="flex items-start mb-8">
                    <Quote className="w-12 h-12 text-blue-500 mr-4 flex-shrink-0" />
                    <p className="text-gray-700 text-lg leading-relaxed">{testimonials[currentIndex].content}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                        <img
                          src={testimonials[currentIndex].image || "/placeholder.svg"}
                          alt={testimonials[currentIndex].author}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{testimonials[currentIndex].author}</h4>
                        <p className="text-gray-600 text-sm">
                          {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                        </p>
                      </div>
                    </div>
                    <div className="w-24 h-8 relative">
                      <img
                        src={testimonials[currentIndex].companyLogo || "/placeholder.svg"}
                        alt={testimonials[currentIndex].company}
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none z-10">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => paginate(-1)}
              className="pointer-events-auto bg-white/80 hover:bg-white shadow-lg text-blue-500 hover:text-blue-600"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => paginate(1)}
              className="pointer-events-auto bg-white/80 hover:bg-white shadow-lg text-blue-500 hover:text-blue-600"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  const newDirection = index > currentIndex ? 1 : -1
                  setDirection(newDirection)
                  setCurrentIndex(index)
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-blue-500 w-6" : "bg-blue-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

