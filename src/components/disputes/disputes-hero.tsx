"use client"

import { useState } from "react"
import { Search, Scale, Shield, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function DisputesHero() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <section className="relative w-full max-w-5xl mx-auto text-center py-12 mb-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 dark:from-blue-400 dark:to-indigo-300 text-transparent bg-clip-text mb-4">
          Community Dispute Resolution
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
          A decentralized platform where property disputes between owners and renters are resolved through community
          governance and transparent voting.
        </p>
      </motion.div>

      <motion.div
        className="flex flex-wrap justify-center gap-4 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">Submit New Case</Button>
        <Button
          variant="outline"
          className="border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/30"
        >
          Learn About Process
        </Button>
      </motion.div>

      <motion.div
        className="relative max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="relative">
          <input
            type="text"
            placeholder="Search for cases, properties, or users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-3 px-5 pl-12 rounded-full border border-blue-200 dark:border-blue-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 shadow-sm"
          />
          <Search
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 dark:text-blue-400"
            size={18}
          />
        </div>
      </motion.div>

      <div className="absolute -z-10 inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-400/10 dark:bg-blue-400/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-10 w-60 h-60 bg-indigo-400/10 dark:bg-indigo-400/5 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        className="flex justify-center gap-8 mt-12 flex-wrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        {[
          { icon: Scale, text: "Fair & Transparent" },
          { icon: Users, text: "Community Governed" },
          { icon: Shield, text: "Secure Voting" },
        ].map((item, index) => (
          <div key={index} className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
            <item.icon size={18} className="text-blue-600 dark:text-blue-400" />
            <span>{item.text}</span>
          </div>
        ))}
      </motion.div>
    </section>
  )
}

