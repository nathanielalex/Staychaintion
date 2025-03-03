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
      <Card className="overflow-hidden bg-white">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="aspect-[4/3] md:aspect-auto relative overflow-hidden">
            <img
              src="/images/marketplace/img2.png"
              alt="Featured Product"
              className="object-cover"
            />
            <div className="absolute top-4 left-4 px-3 py-1 bg-blue-600 text-white rounded-full flex items-center">
              <Star className="h-4 w-4 mr-1 fill-current" />
              <span className="text-sm font-medium">Featured</span>
            </div>
          </div>
          <div className="p-8 flex flex-col justify-between">
            <div>
              <p className="text-sm text-blue-600 mb-2">Furniture</p>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Luxury Sofa Set</h2>
              <p className="text-gray-600 mb-6 line-clamp-3">
                Experience ultimate comfort with our premium luxury sofa set. Perfect for any living room, this set
                combines style and functionality with its elegant design and superior craftsmanship.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-900">$1,299.99</span>
                <span className="ml-2 text-sm text-gray-500 line-through">$1,599.99</span>
              </div>
              <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors">
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

