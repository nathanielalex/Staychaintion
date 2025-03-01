"use client"

import { motion } from "framer-motion"
import { Bot, BookOpen, PenTool, Share2, Sparkles, Zap } from "lucide-react"

const features = [
  {
    title: "AI-Powered Pricing",
    description: "Utilizes AI to analyze market trends and suggest the optimal rental price for your property.",
    icon: Bot,
    gradient: "from-blue-400 to-blue-600",
  },
  {
    title: "Smart Property Insights",
    description: "Get data-driven insights about demand, peak seasons, and rental performance in your area.",
    icon: BookOpen,
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    title: "Visual Property Enhancement",
    description: "AI-enhanced image analysis improves property photos, detects missing amenities, and boosts listing appeal.",
    icon: PenTool,
    gradient: "from-indigo-400 to-blue-600",
  },
  {
    title: "Seamless Guest Interaction",
    description: "StayAI-powered chatbot helps answer guest inquiries and automate communication.",
    icon: Share2,
    gradient: "from-blue-400 to-indigo-500",
  },
  {
    title: "Automated Listing Optimization",
    description: "AI suggests listing improvements to attract more bookings and increase revenue.",
    icon: Sparkles,
    gradient: "from-indigo-500 to-blue-500",
  },
  {
    title: "Secure Web3 Transactions",
    description: "Blockchain-based payments ensure fast, secure, and transparent transactions for hosts and guests.",
    icon: Zap,
    gradient: "from-blue-500 to-indigo-400",
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

export default function Features() {
  return (
    <section className="py-20 px-4 md:px-6 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Powerful Features for Your Property Rentals
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            Maximize your rental income with Web3 and AI-powered tools.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={cardVariants} whileHover={{ scale: 1.02 }} className="relative group">
              <div
                className={`h-full p-6 rounded-2xl bg-gradient-to-br ${feature.gradient} 
                transform transition-all duration-300 ease-in-out`}
              >
                <div className="relative z-10">
                  <div className="bg-white/20 rounded-xl p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/90">{feature.description}</p>
                </div>
                {/* Decorative elements */}
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl" />
                <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-white/10 rounded-full blur-2xl transform group-hover:scale-150 transition-transform duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl" />
      </div>
    </section>
  )
}

