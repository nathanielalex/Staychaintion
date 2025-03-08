"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUp, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ClickerPage() {
  const [money, setMoney] = useState(0)
  const [clickPower, setClickPower] = useState(1)
  const [upgrades, setUpgrades] = useState([
    { id: 1, name: "Double Click", cost: 50, power: 1, purchased: false },
    { id: 2, name: "Triple Click", cost: 200, power: 2, purchased: false },
    { id: 3, name: "Super Click", cost: 500, power: 5, purchased: false },
    { id: 4, name: "Mega Click", cost: 1000, power: 10, purchased: false },
  ])
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; color: string }[]>([])
  const [clickEffects, setClickEffects] = useState<{ id: number; x: number; y: number; value: number }[]>([])
  const [nextParticleId, setNextParticleId] = useState(0)
  const [nextEffectId, setNextEffectId] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Background animation elements
  const bubbles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 100 + 50,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }))

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Update money
    setMoney((prev) => prev + clickPower)

    // Get click position relative to the container
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Add click effect
      setClickEffects((prev) => [...prev, { id: nextEffectId, x, y, value: clickPower }])
      setNextEffectId((prev) => prev + 1)

      // Add particles
      const newParticles = Array.from({ length: 5 }, (_, i) => ({
        id: nextParticleId + i,
        x,
        y,
        size: Math.random() * 8 + 4,
        color: getRandomColor(),
      }))

      setParticles((prev) => [...prev, ...newParticles])
      setNextParticleId((prev) => prev + 5)
    }
  }

  const buyUpgrade = (id: number) => {
    const upgrade = upgrades.find((u) => u.id === id)
    if (!upgrade || upgrade.purchased || money < upgrade.cost) return

    setMoney((prev) => prev - upgrade.cost)
    setClickPower((prev) => prev + upgrade.power)

    setUpgrades((prev) => prev.map((u) => (u.id === id ? { ...u, purchased: true } : u)))
  }

  // Clean up old particles and effects
  useEffect(() => {
    const timer = setTimeout(() => {
      setParticles((prev) => prev.slice(Math.max(prev.length - 30, 0)))
      setClickEffects((prev) => prev.slice(Math.max(prev.length - 10, 0)))
    }, 1000)

    return () => clearTimeout(timer)
  }, [particles, clickEffects])

  // Helper function to get random color
  const getRandomColor = () => {
    const colors = ["#3B82F6", "#60A5FA", "#93C5FD", "#2563EB", "#1D4ED8"]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  // Format money with commas
  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat("en-US").format(amount)
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-blue-900 to-blue-950 flex flex-col items-center justify-center">
      {/* Background bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className="absolute rounded-full bg-blue-500/5 backdrop-blur-sm"
            style={{
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              left: `${bubble.x}%`,
              top: `${bubble.y}%`,
              animation: `float ${bubble.duration}s ease-in-out ${bubble.delay}s infinite alternate`,
            }}
          />
        ))}
      </div>

      <div
        ref={containerRef}
        className="relative z-10 w-full max-w-4xl flex flex-col items-center justify-center px-4 py-12"
      >
        {/* Particles */}
        <AnimatePresence>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              initial={{
                x: particle.x,
                y: particle.y,
                opacity: 1,
                scale: 0,
              }}
              animate={{
                x: particle.x + (Math.random() * 100 - 50),
                y: particle.y - 100 - Math.random() * 50,
                opacity: 0,
                scale: 1,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: particle.color,
              }}
            />
          ))}
        </AnimatePresence>

        {/* Click effects */}
        <AnimatePresence>
          {clickEffects.map((effect) => (
            <motion.div
              key={effect.id}
              initial={{
                x: effect.x,
                y: effect.y,
                opacity: 1,
                scale: 0.5,
              }}
              animate={{
                y: effect.y - 80,
                opacity: 0,
                scale: 1,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute pointer-events-none text-blue-300 font-bold flex items-center"
            >
              +{effect.value}
              <ArrowUp className="ml-1 w-4 h-4" />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
          <span className="text-blue-300">ICP</span> Clicker
        </h1>

        {/* Clickable logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
          className="relative w-48 h-48 md:w-64 md:h-64 bg-blue-800 rounded-full flex items-center justify-center cursor-pointer mb-8 shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:shadow-[0_0_40px_rgba(59,130,246,0.7)] transition-shadow duration-300"
        >
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center overflow-hidden">
            <Sparkles className="w-24 h-24 md:w-32 md:h-32 text-blue-200" />
          </div>
          <motion.div
            animate={{
              boxShadow: [
                "0 0 0px rgba(59,130,246,0.3)",
                "0 0 30px rgba(59,130,246,0.7)",
                "0 0 0px rgba(59,130,246,0.3)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            className="absolute inset-0 rounded-full"
          />
        </motion.div>

        {/* Money counter */}
        <motion.div
          className="bg-blue-900/80 backdrop-blur-md rounded-xl p-6 mb-8 w-full max-w-md shadow-lg border border-blue-700/30"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-center">
            <h2 className="text-blue-300 text-lg mb-1">Your Balance</h2>
            <motion.div
              key={money}
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 0.3 }}
              className="text-4xl md:text-5xl font-bold text-white"
            >
              ${formatMoney(money)}
            </motion.div>
            <p className="text-blue-300 mt-2 text-sm">Click Power: {clickPower} per click</p>
          </div>
        </motion.div>

        {/* Upgrades */}
        <motion.div
          className="bg-blue-900/80 backdrop-blur-md rounded-xl p-6 w-full max-w-md shadow-lg border border-blue-700/30"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-xl text-white font-bold mb-4 text-center">Upgrades</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upgrades.map((upgrade) => (
              <motion.button
                key={upgrade.id}
                onClick={() => buyUpgrade(upgrade.id)}
                disabled={upgrade.purchased || money < upgrade.cost}
                className={cn(
                  "relative p-4 rounded-lg transition-all duration-200 text-left",
                  upgrade.purchased
                    ? "bg-blue-700/50 text-blue-300"
                    : money >= upgrade.cost
                      ? "bg-blue-600 hover:bg-blue-500 text-white"
                      : "bg-blue-800/50 text-blue-400/50",
                )}
                whileHover={!upgrade.purchased && money >= upgrade.cost ? { scale: 1.03 } : {}}
                whileTap={!upgrade.purchased && money >= upgrade.cost ? { scale: 0.97 } : {}}
              >
                <div className="font-bold">{upgrade.name}</div>
                <div className="text-sm mt-1">+{upgrade.power} click power</div>
                <div className="text-sm mt-2">
                  {upgrade.purchased ? (
                    <span className="text-blue-300">Purchased</span>
                  ) : (
                    <span>Cost: ${formatMoney(upgrade.cost)}</span>
                  )}
                </div>
                {upgrade.purchased && (
                  <div className="absolute top-2 right-2 text-blue-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* CSS for animations */}
      {/* <style jsx global>{`
        @keyframes float {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(20px, -20px) rotate(10deg); }
        }
      `}</style> */}
      
    </div>
  )
}

