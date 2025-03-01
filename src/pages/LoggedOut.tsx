"use client"

import { useAuth } from '../utility/use-auth-client';
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Sparkles , Unlink } from "lucide-react"
import { SparklesCore } from "@/components/landing/sparkles"

export default function ConnectPage() {

  const { login } = useAuth();

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-600 to-purple-600 flex items-center justify-center p-4">
      {/* Ambient background with moving particles */}
      <div className="absolute inset-0">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={40}
          className="w-full h-full"
          particleColor="white"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
        className="w-full max-w-md"
      >
        <Card className="p-8 text-center relative overflow-hidden">
          {/* Decorative background blur */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-80" />

          {/* Content */}
          <div className="relative z-10">
            {/* Animated icon */}
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              className="w-16 h-16 mx-auto mb-6"
            >
              <div className="relative">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 rounded-full bg-blue-200 blur-sm"
                />
                <Unlink className="w-16 h-16 text-blue-600" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-blue-600 mb-2"
            >
              Welcome to StayChaintion
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-blue-500 mb-8"
            >
              Please Login First!
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-6 text-lg relative overflow-hidden group"
                type="button"
                id="loginButton"
                onClick={login}
              >
                <span className="relative z-10">Connect</span>
                <motion.div
                  className="absolute inset-0 bg-blue-600"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-blue-400 text-sm mt-6"
            >
              Secure, transparent, and unforgettable experiences await!
            </motion.p>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-100 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2" />
        </Card>
      </motion.div>

      {/* Additional ambient elements */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 bg-white/5 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        ))}
      </div>
    </main>
  )
}

