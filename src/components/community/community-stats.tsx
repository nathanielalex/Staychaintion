"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Users, MessageSquare, FileText, Award } from "lucide-react"

export default function CommunityStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      <StatCard icon={Users} title="Community Members" value="12,456" change="+124 this week" color="blue" />

      <StatCard icon={MessageSquare} title="Total Posts" value="27,156" change="+342 this week" color="purple" />

      <StatCard icon={FileText} title="Active Threads" value="3,842" change="+56 this week" color="green" />

      <StatCard icon={Award} title="Contributions" value="8,721" change="+98 this week" color="amber" />
    </motion.div>
  )
}

interface StatCardProps {
  icon: React.ElementType
  title: string
  value: string
  change: string
  color: "blue" | "purple" | "green" | "amber"
}

function StatCard({ icon: Icon, title, value, change, color }: StatCardProps) {
  const colorClasses = {
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-600",
      iconBg: "bg-blue-100",
    },
    purple: {
      bg: "bg-purple-50",
      text: "text-purple-600",
      iconBg: "bg-purple-100",
    },
    green: {
      bg: "bg-green-50",
      text: "text-green-600",
      iconBg: "bg-green-100",
    },
    amber: {
      bg: "bg-amber-50",
      text: "text-amber-600",
      iconBg: "bg-amber-100",
    },
  }

  const classes = colorClasses[color]

  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      className={`${classes.bg} rounded-xl p-6 border border-border`}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">{value}</h3>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-xs mt-1 text-primary">{change}</p>
        </div>

        <div className={`flex items-center justify-center w-12 h-12 rounded-full ${classes.iconBg} ${classes.text}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  )
}

