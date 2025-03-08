"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Star, Heart, ArrowRight } from "lucide-react"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/pages/marketplace/page"

interface FeaturedProductProps {
  product: Product & { originalPrice?: number }
}

export default function FeaturedProduct({ product }: FeaturedProductProps) {
  const [isLiked, setIsLiked] = useState(false)

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
              src={product.coverPicture || "/placeholder.svg?height=400&width=600"}
              alt={product.name}
              
              className="object-cover"
            />
            <div className="absolute top-4 left-4 px-3 py-1 bg-blue-600 text-white rounded-full flex items-center">
              <Star className="h-4 w-4 mr-1 fill-current" />
              <span className="text-sm font-medium">Featured</span>
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/80 hover:bg-white"
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
            </Button>
            {product.discount > 0 && (
              <Badge className="absolute bottom-4 left-4 bg-red-500 hover:bg-red-600 text-white">
                {product.discountType === "Percentage" ? `${product.discount}% OFF` : `$${product.discount} OFF`}
              </Badge>
            )}
          </div>
          <div className="p-8 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-blue-600">{product.productType}</p>
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">{product.rating}/5</span>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{product.name}</h2>
              <p className="text-gray-600 mb-6">{product.shortDescription}</p>
              <div className="space-y-4 mb-6">
                <div className="flex items-center text-sm text-gray-500">
                  <span className="font-medium text-gray-700 mr-2">Seller:</span> {product.seller}
                </div>
                <p className="text-gray-600 line-clamp-3">{product.description}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-900">
                  $
                  {(
                    product.price -
                    (product.discountType === "Percentage"
                      ? product.price * (product.discount / 100)
                      : product.discount)
                  ).toFixed(2)}
                </span>
                {product.discount > 0 && product.originalPrice && (
                  <span className="ml-2 text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                )}
              </div>
              <div className="flex space-x-3">
                <Button size="lg" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white transition-colors">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <a href={`/marketplace/${product.id}`} className="flex-1">
                  <Button size="lg" variant="outline" className="w-full">
                    <span>View Details</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

