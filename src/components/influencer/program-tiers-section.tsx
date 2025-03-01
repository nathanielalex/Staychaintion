"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"

const tiers = [
  {
    name: "Bronze",
    commission: "5%",
    requirements: "500+ followers",
    benefits: ["Basic analytics dashboard", "Monthly newsletter", "Access to affiliate resources"],
  },
  {
    name: "Silver",
    commission: "7%",
    requirements: "5,000+ followers",
    benefits: [
      "Advanced analytics dashboard",
      "Quarterly strategy call",
      "Early access to new features",
      "Customized promo codes",
    ],
  },
  {
    name: "Gold",
    commission: "10%",
    requirements: "20,000+ followers",
    benefits: [
      "Premium analytics dashboard",
      "Monthly strategy call",
      "Priority support",
      "Exclusive event invitations",
      "Co-marketing opportunities",
    ],
  },
]

export default function ProgramTiersSection() {
  return (
    <section className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl font-semibold text-blue-800 mb-12 text-center"
        >
          Program Tiers
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-shadow duration-300">
                <Badge variant="secondary" className="mb-4">
                  {tier.name}
                </Badge>
                <h3 className="text-2xl font-semibold mb-2">{tier.commission} Commission</h3>
                <p className="text-gray-600 mb-4">{tier.requirements}</p>
                <ul className="space-y-2">
                  {tier.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

