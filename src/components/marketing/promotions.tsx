"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tag, Clock, Percent } from "lucide-react"

const promotions = [
  {
    title: "Summer Special",
    description: "Get 20% off on all bookings made for summer months.",
    code: "SUMMER20",
    expiry: "2023-08-31",
    discount: "20%",
  },
  {
    title: "First-Time User",
    description: "New users get $50 off their first booking.",
    code: "NEWUSER50",
    expiry: "Ongoing",
    discount: "$50",
  },
  {
    title: "Weekend Getaway",
    description: "Book for weekends and get a free night stay.",
    code: "WEEKEND3FOR2",
    expiry: "2023-12-31",
    discount: "1 Night Free",
  },
]

export default function PromotionsSection() {
  return (
    <section className="mb-20">
      <h2 className="text-3xl font-semibold text-blue-800 mb-8">Promotions & Discounts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {promotions.map((promo, index) => (
          <motion.div
            key={promo.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="p-6 h-full flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
              <div>
                <h3 className="text-xl font-semibold mb-2">{promo.title}</h3>
                <p className="text-gray-600 mb-4">{promo.description}</p>
                <div className="flex items-center space-x-2 mb-2">
                  <Tag className="w-4 h-4 text-blue-500" />
                  <span className="font-medium">Code: {promo.code}</span>
                </div>
                <div className="flex items-center space-x-2 mb-4">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span>Expires: {promo.expiry}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  <Percent className="w-4 h-4 mr-1" />
                  {promo.discount}
                </Badge>
                <Button variant="outline">Apply</Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

