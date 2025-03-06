"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { FileText, Sparkles } from "lucide-react"
import { FloatingPaper } from "@/components/landing/floating-paper"
import { RoboAnimation } from "@/components/landing/robo-animation"

export default function Hero() {
  return (
    <div className="relative min-h-[calc(100vh-76px)] flex items-center">
      
      <div className="absolute inset-0 overflow-hidden">
        <FloatingPaper count={6} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
            Unlock Your Property's True Value with
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600">
                {" "}
                StayChaintion
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 text-xl mb-8 max-w-2xl mx-auto"
          >
            List your property with Web3 technology and AI-driven insights to maximize your rental income securely and efficiently
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href="/properties">
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white px-8">
                <FileText className="mr-2 h-5 w-5" />
                  Explore Listings
              </Button>
            </a>
            <a href="#features">
              <Button size="lg" variant="outline" className="text-blue-500 border-blue-500 hover:bg-blue-500/10">
                <Sparkles className="mr-2 h-5 w-5" />
                View More
              </Button>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Animated robot */}
      <div className="absolute bottom-0 right-0 w-96 h-96">
        <RoboAnimation />
      </div>
    </div>
  )
}

