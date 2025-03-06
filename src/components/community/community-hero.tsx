"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MessageSquare, Users, TrendingUp, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CommunityHero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative bg-gradient-to-b from-primary/10 to-background pt-16 pb-12 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-grid-blue/[0.02] z-0" />

      {/* Floating elements */}
      <motion.div
        className="absolute top-20 left-[10%] w-12 h-12 rounded-full bg-primary/10 z-0"
        animate={{
          y: [0, -15, 0],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-10 right-[15%] w-20 h-20 rounded-full bg-primary/5 z-0"
        animate={{
          y: [0, 20, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 7,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.div
        className="absolute top-40 right-[25%] w-8 h-8 rounded-full bg-primary/10 z-0"
        animate={{
          y: [0, -10, 0],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              ICP Community Forum
            </h1>

            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of Internet Computer enthusiasts to discuss ideas, share knowledge, and build the future of
              Web3 together.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="gap-2">
                <MessageSquare className="w-4 h-4" />
                Join Discussion
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Users className="w-4 h-4" />
                Browse Topics
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-border">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary mb-2 mx-auto">
                <MessageSquare className="w-5 h-5" />
              </div>
              <p className="text-2xl font-bold">3.8K+</p>
              <p className="text-sm text-muted-foreground">Discussions</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-border">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary mb-2 mx-auto">
                <Users className="w-5 h-5" />
              </div>
              <p className="text-2xl font-bold">12K+</p>
              <p className="text-sm text-muted-foreground">Members</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-border">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary mb-2 mx-auto">
                <TrendingUp className="w-5 h-5" />
              </div>
              <p className="text-2xl font-bold">27K+</p>
              <p className="text-sm text-muted-foreground">Posts</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-border">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary mb-2 mx-auto">
                <Zap className="w-5 h-5" />
              </div>
              <p className="text-2xl font-bold">42+</p>
              <p className="text-sm text-muted-foreground">Daily Posts</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

