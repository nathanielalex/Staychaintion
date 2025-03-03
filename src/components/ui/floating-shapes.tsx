"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const shapes = [
  { type: "circle", size: 40 },
  { type: "square", size: 40 },
  { type: "triangle", size: 40 },
]

export default function FloatingShapes() {
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    if (typeof window !== "undefined") {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
      window.addEventListener("resize", handleResize)
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize)
      }
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute"
          initial={{
            x: Math.random() * windowSize.width,
            y: Math.random() * windowSize.height,
            opacity: 0,
          }}
          animate={{
            x: [Math.random() * windowSize.width, Math.random() * windowSize.width, Math.random() * windowSize.width],
            y: [
              Math.random() * windowSize.height,
              Math.random() * windowSize.height,
              Math.random() * windowSize.height,
            ],
            opacity: [0.2, 0.5, 0.2],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          {shape.type === "circle" && (
            <div className="rounded-full bg-blue-200" style={{ width: shape.size, height: shape.size }} />
          )}
          {shape.type === "square" && <div className="bg-blue-200" style={{ width: shape.size, height: shape.size }} />}
          {shape.type === "triangle" && (
            <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-b-[40px] border-l-transparent border-r-transparent border-b-blue-200" />
          )}
        </motion.div>
      ))}
    </div>
  )
}

