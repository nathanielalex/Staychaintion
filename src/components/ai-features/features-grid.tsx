"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Brain, Zap, Search, BarChart, MessageSquare, Shield } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI-Image Classifier",
    description: "Get suggestions based on your house or property images.",
    link: "/room-classifier",
  },
  // {
  //   icon: Zap,
  //   title: "Smart Automation",
  //   description: "Automate repetitive tasks and workflows with AI assistance.",
  // },
  // {
  //   icon: Search,
  //   title: "Intelligent Search",
  //   description: "Find exactly what you're looking for with our advanced AI search capabilities.",
  // },
  {
    icon: BarChart,
    title: "Predictive Analytics",
    description: "Forecast trends and make data-driven decisions with AI-powered insights.",
    link: "/predicts",
  },
  {
    icon: MessageSquare,
    title: "AI Chatbot",
    description: "Get instant support and answers from our intelligent chatbot.",
    link: "/chatbot",
  },
//   {
//     icon: Shield,
//     title: "AI-Enhanced Security",
//     description: "Protect your data with advanced AI-driven security measures.",
//   },
]

export default function FeaturesGrid() {
  return (

    <section className="py-20 px-4">

      <div className="max-w-6xl mx-auto">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center text-gray-900 mb-12"
        >
          Our AI Features
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <a href={feature.link}>
                <Card className="p-6 h-full hover:shadow-lg transition-shadow duration-300">
                  <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </Card>
              </a>
            </motion.div>
          ))}
        </div>

      </div>

    </section>

  )

}

