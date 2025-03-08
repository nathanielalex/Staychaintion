"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Heart, Star } from "lucide-react"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { Product } from "@/pages/marketplace/page"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false)

  // Calculate discounted price
  const discountedPrice =
    product.discountType === "Percentage"
      ? product.price * (1 - product.discount / 100)
      : product.price - product.discount

  // Check if product has a discount
  const hasDiscount = product.discount > 0

  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
      <Card className="group overflow-hidden bg-white h-full flex flex-col">
        <div className="relative">
          <a href={`/marketplace/${product.id}`}>
            <div className="aspect-[4/3] relative overflow-hidden">
              <img
                src={product.coverPicture || "/placeholder.svg"}
                alt={product.name}
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </a>

          {hasDiscount && (
            <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">
              {product.discountType === "Percentage" ? `${product.discount}% OFF` : `$${product.discount} OFF`}
            </Badge>
          )}

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 hover:bg-white"
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isLiked ? "Remove from wishlist" : "Add to wishlist"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="p-5 flex-1 flex flex-col">
          <div className="mb-4 flex-1">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm text-blue-600">{product.productType}</p>
              <div className="flex items-center">
                <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400 mr-1" />
                <span className="text-sm text-gray-600">{product.rating}</span>
              </div>
            </div>

            <a href={`/marketplace/${product.id}`}>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1 hover:text-blue-600 transition-colors">
                {product.name}
              </h3>
            </a>

            <p className="text-sm text-gray-500 mb-3 line-clamp-2">{product.shortDescription}</p>

            <div className="flex items-baseline mb-1">
              <p className="text-xl font-bold text-gray-900">${discountedPrice.toFixed(2)}</p>
              {hasDiscount && <p className="ml-2 text-sm text-gray-500 line-through">${product.price.toFixed(2)}</p>}
            </div>

            <p className="text-xs text-gray-500 mb-3">Sold by: {product.seller}</p>
          </div>

          <div className="mt-auto">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

