"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef, useState } from "react"
import ProductCard from "./product-card"
import { Product } from "@/declarations/Product_backend/Product_backend.did"

// Sample products data (same as in marketplace page)
// const products: Product[] = [
//   {
//     id: "1",
//     name: "Cozy Throw Blanket",
//     productType: "Merchandise",
//     shortDescription: "Super soft and comfortable throw blanket",
//     description:
//       "This luxurious throw blanket is perfect for those cozy nights at home. Made from premium materials, it provides exceptional comfort and warmth. The elegant design complements any home decor style.",
//     price: 39.99,
//     coverPicture: "/placeholder.svg?height=300&width=300",
//     pictures: [
//       "/placeholder.svg?height=600&width=600",
//       "/placeholder.svg?height=600&width=600",
//       "/placeholder.svg?height=600&width=600",
//     ],
//     seller: "HomeComfort",
//     discountType: "Percentage",
//     discount: 10,
//     rating: 4,
//   },
//   {
//     id: "2",
//     name: "Modern Coffee Table",
//     productType: "Furniture",
//     shortDescription: "Elegant coffee table with storage",
//     description:
//       "This modern coffee table combines style and functionality. With its sleek design and hidden storage compartments, it's the perfect centerpiece for your living room. Made from high-quality materials for durability.",
//     price: 199.99,
//     coverPicture: "/placeholder.svg?height=300&width=300",
//     pictures: [
//       "/placeholder.svg?height=600&width=600",
//       "/placeholder.svg?height=600&width=600",
//       "/placeholder.svg?height=600&width=600",
//     ],
//     seller: "ModernLiving",
//     discountType: "Fixed",
//     discount: 20,
//     rating: 5,
//   },
//   {
//     id: "3",
//     name: "Scented Candle Set",
//     productType: "Gifts",
//     shortDescription: "Set of 3 premium scented candles",
//     description:
//       "Transform your home with this set of premium scented candles. Each candle is hand-poured using natural soy wax and features unique fragrances that create a warm and inviting atmosphere.",
//     price: 24.99,
//     coverPicture: "/placeholder.svg?height=300&width=300",
//     pictures: [
//       "/placeholder.svg?height=600&width=600",
//       "/placeholder.svg?height=600&width=600",
//       "/placeholder.svg?height=600&width=600",
//     ],
//     seller: "AromaLux",
//     discountType: "Percentage",
//     discount: 15,
//     rating: 4,
//   },
//   {
//     id: "4",
//     name: "Smart Home Hub",
//     productType: "Electronics",
//     shortDescription: "Control your entire home with one device",
//     description:
//       "This advanced smart home hub allows you to control all your smart devices from one central location. Compatible with most popular smart home products, it features voice control, automation capabilities, and an intuitive mobile app.",
//     price: 129.99,
//     coverPicture: "/placeholder.svg?height=300&width=300",
//     pictures: [
//       "/placeholder.svg?height=600&width=600",
//       "/placeholder.svg?height=600&width=600",
//       "/placeholder.svg?height=600&width=600",
//     ],
//     seller: "TechInnovate",
//     discountType: "Percentage",
//     discount: 5,
//     rating: 5,
//   },
//   {
//     id: "5",
//     name: "Artisan Ceramic Vase",
//     productType: "Home Decor",
//     shortDescription: "Handcrafted ceramic vase with unique design",
//     description:
//       "Each of these artisan ceramic vases is handcrafted by skilled artisans, making every piece unique. The elegant design and premium finish make it a perfect decorative accent for any room in your home.",
//     price: 49.99,
//     coverPicture: "/placeholder.svg?height=300&width=300",
//     pictures: [
//       "/placeholder.svg?height=600&width=600",
//       "/placeholder.svg?height=600&width=600",
//       "/placeholder.svg?height=600&width=600",
//     ],
//     seller: "ArtisanCrafts",
//     discountType: "Fixed",
//     discount: 10,
//     rating: 4,
//   },
// ]

interface RelatedProductsProps {
  currentProductId: string
}

export default function RelatedProducts({ currentProductId }: RelatedProductsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [products, setProducts] = useState<Product[]>([]);

  // Filter out the current product and limit to 4 related products
  const relatedProducts = products.filter((product) => product.id !== currentProductId).slice(0, 4)

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Related Products</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" onClick={scrollLeft} disabled={!canScrollLeft} className="rounded-full">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollRight}
            disabled={!canScrollRight}
            className="rounded-full"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4"
        onScroll={handleScroll}
      >
        {relatedProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="min-w-[280px] max-w-[280px]"
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

