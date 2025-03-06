"use client"

import { motion } from "framer-motion"
import { CheckCircle, Clock, Users, Award } from "lucide-react"

export function DisputesStats() {
  const stats = [
    {
      title: "Resolved Cases",
      value: "1,248",
      icon: CheckCircle,
      color: "from-green-500 to-emerald-600",
      textColor: "text-green-600 dark:text-green-400",
      increase: "+12% this month",
    },
    {
      title: "Active Disputes",
      value: "86",
      icon: Clock,
      color: "from-blue-500 to-indigo-600",
      textColor: "text-blue-600 dark:text-blue-400",
      increase: "4 new today",
    },
    {
      title: "Community Judges",
      value: "3,572",
      icon: Users,
      color: "from-purple-500 to-violet-600",
      textColor: "text-purple-600 dark:text-purple-400",
      increase: "+215 this week",
    },
    {
      title: "Governance Tokens",
      value: "8.2M",
      icon: Award,
      color: "from-amber-500 to-orange-600",
      textColor: "text-amber-600 dark:text-amber-400",
      increase: "32% participation rate",
    },
  ]

  return (
    <section className="w-full max-w-6xl mx-auto mb-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="bg-white dark:bg-slate-900 rounded-xl border border-blue-100 dark:border-blue-900 p-6 shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <div
              className="absolute -right-6 -top-6 w-16 h-16 rounded-full bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity duration-300"
              style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}
            ></div>

            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{stat.title}</p>
                <h3 className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">{stat.increase}</p>
              </div>
              <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color} text-white`}>
                <stat.icon size={20} />
              </div>
            </div>

            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r"
              style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
            ></motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

