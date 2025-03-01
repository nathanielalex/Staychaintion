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
    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
      <Card className="group overflow-hidden bg-white">
        <div className="aspect-[4/3] relative overflow-hidden">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-5">
          <div className="mb-4">
            <p className="text-sm text-blue-600 mb-1">{product.category}</p>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">{product.name}</h3>
            <p className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
          </div>
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}

