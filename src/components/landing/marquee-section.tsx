"use client"

import { motion } from "framer-motion"
import { useEffect, useRef } from "react"

export default function MarqueeSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Large text overlays */}
      <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
        <motion.h2
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-bold text-gray-900/10"
        >
          STAYCHAINTION
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-bold text-gray-900/10"
        >
          STAYCHAINTION
        </motion.h2>
      </div>

      {/* Diagonal background stripe */}
      <div className="absolute inset-0 skew-y-[-8deg] bg-gradient-to-r from-blue-500 to-blue-600 transform -translate-y-1/2" />

      {/* Marquee container */}
      <div className="relative">
        <MarqueeContent direction="left" />
        <MarqueeContent direction="right" />
      </div>
    </section>
  )
}

function MarqueeContent({ direction = "left" }: { direction?: "left" | "right" }) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const primaryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!scrollerRef.current || !primaryRef.current) return

    const scrollerContent = Array.from(primaryRef.current.children)

    // Clone items
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true)
      if (primaryRef.current) {
        primaryRef.current.appendChild(duplicatedItem)
      }
    })

    // Set animation
    const keyframes = {
      transform: ["translateX(0%)", `translateX(${direction === "left" ? "-50%" : "50%"})`],
    }

    const options: KeyframeAnimationOptions = {
      duration: 20000,
      iterations: Number.POSITIVE_INFINITY,
      easing: "linear",
    }

    const scrollAnimation = scrollerRef.current.animate(keyframes, options)

    // Pause on hover
    const handleMouseEnter = () => {
      scrollAnimation.pause()
    }

    const handleMouseLeave = () => {
      scrollAnimation.play()
    }

    scrollerRef.current.addEventListener("mouseenter", handleMouseEnter)
    scrollerRef.current.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      if (scrollerRef.current) {
        scrollerRef.current.removeEventListener("mouseenter", handleMouseEnter)
        scrollerRef.current.removeEventListener("mouseleave", handleMouseLeave)
      }
      scrollAnimation.cancel()
    }
  }, [direction])

  const items = [
    "Powerful AI",
    "Smart Contract",
    "Quick Results",
    "ICP Integrated",
    "Powerful AI",
    "Smart Contract",
    "Quick Results",
    "ICP Integrated",
  ]

  return (
    <div className="relative flex flex-nowrap overflow-hidden py-12">
      <div ref={scrollerRef} className="flex flex-nowrap whitespace-nowrap">
        <div ref={primaryRef} className="flex flex-nowrap items-center gap-4">
          {items.map((item, idx) => (
            <div
              key={idx}
              className={`inline-flex items-center justify-center px-8 ${
                direction === "right" ? "text-blue-100/60" : "text-white"
              }`}
            >
              <div className="group relative">
                <span className="text-3xl md:text-4xl font-bold transition-transform duration-200 group-hover:scale-110 inline-block">
                  {item}
                </span>
                <span className="mx-4 text-2xl">•</span>
                {/* Hover effect */}
                <div className="absolute -inset-2 rounded-lg bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

