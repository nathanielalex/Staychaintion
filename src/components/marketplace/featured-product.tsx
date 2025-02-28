"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Star } from "lucide-react"

export default function FeaturedProduct() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <Card className="overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="relative h-64 md:h-auto md:w-1/2">
            <img src="/placeholder.svg?height=400&width=600" alt="Featured Product" className="object-cover" />
          </div>
          <div className="p-6 md:w-1/2">
            <div className="flex items-center mb-2">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm font-medium">Featured Product</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">Luxury Sofa Set</h2>
            <p className="text-gray-600 mb-4">
              Experience ultimate comfort with our premium luxury sofa set. Perfect for any living room, this set
              combines style and functionality.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold text-blue-600">$1,299.99</span>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

