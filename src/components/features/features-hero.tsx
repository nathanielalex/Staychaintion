"use client"

import { motion } from "framer-motion"
import { ArrowRight, Compass, Map, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FeaturesHero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
          className="absolute -top-[10%] -right-[10%] h-[500px] w-[500px] rounded-full bg-blue-400 blur-[120px]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute -bottom-[10%] -left-[10%] h-[600px] w-[600px] rounded-full bg-indigo-500 blur-[130px]"
        />
      </div>

      {/* Floating icons */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-[15%] right-[20%]"
        >
          <Compass className="h-16 w-16 text-blue-200" />
        </motion.div>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="absolute bottom-[25%] left-[15%]"
        >
          <Map className="h-12 w-12 text-indigo-200" />
        </motion.div>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="absolute top-[40%] left-[10%]"
        >
          <Navigation className="h-10 w-10 text-blue-300" />
        </motion.div>
      </div>

      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
            <h1 className="mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl">
              Explore Our Platform Features
            </h1>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="mb-8 text-lg text-gray-600 md:text-xl">
              Discover all the powerful tools and features our platform offers to enhance your property investment and
              rental experience.
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button asChild size="lg" className="rounded-full bg-blue-600 px-8 hover:bg-white">
              <a href="#popular-features">
                Popular Features <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full border-blue-200 px-8">
              <a href="#all-features">View All Features</a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

