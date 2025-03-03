"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { DollarSign, Users, TrendingUp, Gift } from "lucide-react"

const benefits = [
  {
    icon: DollarSign,
    title: "Competitive Commissions",
    description: "Earn up to 10% commission on every booking made through your unique referral link.",
  },
  {
    icon: Users,
    title: "Exclusive Network",
    description: "Join a community of like-minded influencers and gain access to networking opportunities.",
  },
  {
    icon: TrendingUp,
    title: "Performance Bonuses",
    description: "Unlock additional rewards as you hit higher booking milestones.",
  },
  {
    icon: Gift,
    title: "Special Perks",
    description: "Enjoy exclusive discounts on Staychaintion bookings for yourself and your audience.",
  },
]

export default function BenefitsSection() {
  return (
    <section className="py-20 bg-white" id="benefit-section">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl font-semibold text-blue-800 mb-12 text-center"
        >
          Program Benefits
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-shadow duration-300">
                <benefit.icon className="w-12 h-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

