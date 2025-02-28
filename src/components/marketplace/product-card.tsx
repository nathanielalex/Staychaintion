"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

interface Product {
  id: number
  name: string
  category: string
  price: number
  image: string
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
      <Card className="overflow-hidden">
        <div className="relative h-48">
          <img src={product.image || "/placeholder.svg"} alt={product.name} className="object-cover" />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
          <p className="text-sm text-gray-500 mb-2">{product.category}</p>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-blue-600">${product.price.toFixed(2)}</span>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

