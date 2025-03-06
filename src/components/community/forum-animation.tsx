"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { MessageSquare, Users, Heart, Award, Zap } from "lucide-react"

export default function ForumAnimation() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-primary/5 z-0" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Join the Conversation</h2>
          <p className="text-lg text-muted-foreground">
            Be part of the growing Internet Computer community. Share ideas, get help, and connect with developers from
            around the world.
          </p>
        </motion.div>

        <div className="relative h-[300px] md:h-[400px]">
          {/* Central hub */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              type: "spring",
              stiffness: 100,
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 rounded-full bg-primary flex items-center justify-center z-20"
          >
            <MessageSquare className="w-12 h-12 md:w-16 md:h-16 text-white" />
          </motion.div>

          {/* Connecting lines */}
          <svg className="absolute inset-0 w-full h-full z-10" xmlns="http://www.w3.org/2000/svg">
            <motion.line
              x1="50%"
              y1="50%"
              x2="20%"
              y2="30%"
              stroke="rgba(66, 133, 244, 0.5)"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <motion.line
              x1="50%"
              y1="50%"
              x2="80%"
              y2="30%"
              stroke="rgba(66, 133, 244, 0.5)"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
            />
            <motion.line
              x1="50%"
              y1="50%"
              x2="20%"
              y2="70%"
              stroke="rgba(66, 133, 244, 0.5)"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
            />
            <motion.line
              x1="50%"
              y1="50%"
              x2="80%"
              y2="70%"
              stroke="rgba(66, 133, 244, 0.5)"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 1.1 }}
            />
          </svg>

          {/* Orbiting elements */}
          <AnimatedOrbit icon={Users} position={{ top: "30%", left: "20%" }} delay={0.5} color="bg-purple-500" />

          <AnimatedOrbit icon={Heart} position={{ top: "30%", left: "80%" }} delay={0.7} color="bg-red-500" />

          <AnimatedOrbit icon={Award} position={{ top: "70%", left: "20%" }} delay={0.9} color="bg-amber-500" />

          <AnimatedOrbit icon={Zap} position={{ top: "70%", left: "80%" }} delay={1.1} color="bg-green-500" />

          {/* Floating particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-primary/30"
              initial={{
                x: Math.random() * 100 - 50 + 50 + "%",
                y: Math.random() * 100 - 50 + 50 + "%",
                opacity: 0,
              }}
              animate={{
                x: [
                  Math.random() * 60 - 30 + 50 + "%",
                  Math.random() * 60 - 30 + 50 + "%",
                  Math.random() * 60 - 30 + 50 + "%",
                ],
                y: [
                  Math.random() * 60 - 30 + 50 + "%",
                  Math.random() * 60 - 30 + 50 + "%",
                  Math.random() * 60 - 30 + 50 + "%",
                ],
                opacity: [0, 0.7, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

interface AnimatedOrbitProps {
  icon: React.ElementType
  position: {
    top: string
    left: string
  }
  delay: number
  color: string
}

function AnimatedOrbit({ icon: Icon, position, delay, color }: AnimatedOrbitProps) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        y: [0, -10, 0, 10, 0],
        x: [0, 5, 0, -5, 0],
      }}
      transition={{
        scale: { duration: 0.5, delay },
        opacity: { duration: 0.5, delay },
        y: {
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay,
        },
        x: {
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay,
        },
      }}
      className="absolute w-16 h-16 md:w-20 md:h-20 flex items-center justify-center z-20"
      style={{
        top: position.top,
        left: position.left,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className={`w-full h-full rounded-full ${color} flex items-center justify-center`}>
        <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
      </div>
    </motion.div>
  )
}

