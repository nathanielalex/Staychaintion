"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-md w-full text-center">
        {/* 404 Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <span className="text-[200px] font-bold text-blue-600">404</span>
          </div>

          {/* Main Content */}
          <div className="relative z-10 space-y-6">
            {/* Animated Image */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.1,
              }}
              className="relative w-64 h-64 mx-auto"
            >
              <img
                // src="/assets/motoko.png"
                src="/images/Staychaintion_Logo_Final.png"
                alt="Sad character"
                width={256}
                height={256}
                className="w-full h-full object-contain"
              />
            </motion.div>

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4"
            >
              <h1 className="text-4xl font-bold text-gray-900">Page Not Found 😿</h1>
              <p className="text-gray-600 text-lg">
                Oops! The page you are looking for doesn't exist or has been moved.
              </p>
            </motion.div>

            {/* Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <a href="/landing">
                <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 h-auto text-lg group">
                  <Home className="w-5 h-5 mr-2 transition-transform group-hover:-translate-y-1" />
                  Go Back Home
                </Button>
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-64 h-8 bg-blue-500/10 blur-xl rounded-full" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-500/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </div>
  )
}


