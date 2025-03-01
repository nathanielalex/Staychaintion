"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, DollarSign, TrendingUp } from "lucide-react"

export default function InfluencerSection() {
  const benefits = [
    {
      icon: Users,
      title: "Expand Your Reach",
      description: "Connect with our vast network of travelers and property owners.",
    },
    {
      icon: DollarSign,
      title: "Earn Commissions",
      description: "Get rewarded for every successful referral and booking.",
    },
    {
      icon: TrendingUp,
      title: "Grow Together",
      description: "Access exclusive tools and resources to boost your influence.",
    },
  ]

  return (
    <section className="mb-20">
      <h2 className="text-3xl font-semibold text-blue-800 mb-8">Influencer & Affiliate Program</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {benefits.map((benefit, index) => (
          <motion.div
            key={benefit.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="p-6 h-full flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300">
              <benefit.icon className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </Card>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center"
      >
        <a href="/influencer-affiliate/join">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
            Join Our Program
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </a>
      </motion.div>
    </section>
  )
}

