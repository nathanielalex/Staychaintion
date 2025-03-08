"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, ShoppingCart, Filter } from "lucide-react"
import ProductCard from "@/components/marketplace/product-card"
import FeaturedProduct from "@/components/marketplace/featured-product"
import { Slider } from "@/components/ui/slider"

import { useNavigate } from "react-router-dom"

// Extended product type to match the provided attributes
export type Product = {
  id: string
  name: string
  productType: string
  shortDescription: string
  description: string
  price: number
  coverPicture: string
  pictures: string[]
  seller: string
  discountType: string
  discount: number
  rating: number
}

// Sample products data
const products: Product[] = [
  {
    id: "1",
    name: "Cozy Throw Blanket",
    productType: "Merchandise",
    shortDescription: "Super soft and comfortable throw blanket",
    description:
      "This luxurious throw blanket is perfect for those cozy nights at home. Made from premium materials, it provides exceptional comfort and warmth. The elegant design complements any home decor style.",
    price: 39.99,
    coverPicture: "/placeholder.svg?height=300&width=300",
    pictures: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    seller: "HomeComfort",
    discountType: "Percentage",
    discount: 10,
    rating: 4,
  },
  {
    id: "2",
    name: "Modern Coffee Table",
    productType: "Furniture",
    shortDescription: "Elegant coffee table with storage",
    description:
      "This modern coffee table combines style and functionality. With its sleek design and hidden storage compartments, it's the perfect centerpiece for your living room. Made from high-quality materials for durability.",
    price: 199.99,
    coverPicture: "/placeholder.svg?height=300&width=300",
    pictures: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    seller: "ModernLiving",
    discountType: "Fixed",
    discount: 20,
    rating: 5,
  },
  {
    id: "3",
    name: "Scented Candle Set",
    productType: "Gifts",
    shortDescription: "Set of 3 premium scented candles",
    description:
      "Transform your home with this set of premium scented candles. Each candle is hand-poured using natural soy wax and features unique fragrances that create a warm and inviting atmosphere.",
    price: 24.99,
    coverPicture: "/placeholder.svg?height=300&width=300",
    pictures: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    seller: "AromaLux",
    discountType: "Percentage",
    discount: 15,
    rating: 4,
  },
  {
    id: "4",
    name: "Smart Home Hub",
    productType: "Electronics",
    shortDescription: "Control your entire home with one device",
    description:
      "This advanced smart home hub allows you to control all your smart devices from one central location. Compatible with most popular smart home products, it features voice control, automation capabilities, and an intuitive mobile app.",
    price: 129.99,
    coverPicture: "/placeholder.svg?height=300&width=300",
    pictures: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    seller: "TechInnovate",
    discountType: "Percentage",
    discount: 5,
    rating: 5,
  },
  {
    id: "5",
    name: "Artisan Ceramic Vase",
    productType: "Home Decor",
    shortDescription: "Handcrafted ceramic vase with unique design",
    description:
      "Each of these artisan ceramic vases is handcrafted by skilled artisans, making every piece unique. The elegant design and premium finish make it a perfect decorative accent for any room in your home.",
    price: 49.99,
    coverPicture: "/placeholder.svg?height=300&width=300",
    pictures: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    seller: "ArtisanCrafts",
    discountType: "Fixed",
    discount: 10,
    rating: 4,
  },
  {
    id: "6",
    name: "Luxury Bath Towel Set",
    productType: "Home Essentials",
    shortDescription: "Set of 4 premium cotton bath towels",
    description:
      "Indulge in luxury with this set of premium cotton bath towels. Made from 100% Egyptian cotton, these towels are exceptionally soft, absorbent, and durable. The set includes 2 bath towels, 2 hand towels, and 2 washcloths.",
    price: 59.99,
    coverPicture: "/placeholder.svg?height=300&width=300",
    pictures: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    seller: "LuxuryLinens",
    discountType: "Percentage",
    discount: 20,
    rating: 5,
  },
  {
    id: "7",
    name: "Wireless Bluetooth Speaker",
    productType: "Electronics",
    shortDescription: "Portable speaker with premium sound quality",
    description:
      "This wireless Bluetooth speaker delivers exceptional sound quality in a compact, portable design. With 20 hours of battery life, water resistance, and built-in microphone for calls, it's perfect for both indoor and outdoor use.",
    price: 79.99,
    coverPicture: "/placeholder.svg?height=300&width=300",
    pictures: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    seller: "SoundMasters",
    discountType: "Fixed",
    discount: 15,
    rating: 4,
  },
  {
    id: "8",
    name: "Gourmet Coffee Sampler",
    productType: "Food & Beverage",
    shortDescription: "Collection of premium coffee beans",
    description:
      "Explore the world of coffee with this gourmet sampler featuring beans from five different regions. Each variety is freshly roasted and packaged to preserve its unique flavor profile. Perfect for coffee enthusiasts and gift-giving.",
    price: 34.99,
    coverPicture: "/placeholder.svg?height=300&width=300",
    pictures: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    seller: "BeanConnoisseur",
    discountType: "Percentage",
    discount: 0,
    rating: 5,
  },
]

// Featured product (using the first product for demo)
const featuredProduct = {
  ...products[1],
  name: "Luxury Sofa Set",
  shortDescription: "Premium comfort with elegant design",
  price: 1299.99,
  originalPrice: 1599.99,
}

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("featured")
  const [activeTab, setActiveTab] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 1500])
  const [showFilters, setShowFilters] = useState(false)
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const navigate = useNavigate();

  // All unique product types for filtering
  const productTypes = ["All", ...new Set(products.map((p) => p.productType))]

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeTab === "all" || product.productType.toLowerCase() === activeTab.toLowerCase()
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
    const matchesRating = selectedRating === null || product.rating >= selectedRating

    return matchesSearch && matchesCategory && matchesPrice && matchesRating
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "priceLowToHigh") return a.price - b.price
    if (sortBy === "priceHighToLow") return b.price - a.price
    if (sortBy === "rating") return b.rating - a.rating
    return 0 // Default to featured order
  })

  const handleViewCart = () => {
    navigate("/marketplace/cart")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-center text-blue-600 mb-4">Marketplace</h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Discover premium products for your home and lifestyle. From elegant furniture to smart home devices, find
          everything you need to enhance your living space.
        </p>

        <FeaturedProduct product={featuredProduct} />

        <div className="mb-8 flex flex-col md:flex-row justify-between items-start space-y-4 md:space-y-0 md:space-x-4">
          <div className="w-full md:w-64 space-y-4">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border-gray-300 rounded-full focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>

            <Button
              variant="outline"
              className="w-full flex items-center justify-between md:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <span>Filters</span>
              <Filter size={18} />
            </Button>

            <div className={`space-y-6 ${showFilters ? "block" : "hidden md:block"}`}>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Price Range</h3>
                <div className="px-2">
                  <Slider
                    defaultValue={[0, 1500]}
                    max={1500}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="my-6"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-2">Rating</h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center">
                      <button
                        onClick={() => setSelectedRating(selectedRating === rating ? null : rating)}
                        className={`flex items-center space-x-2 py-1 px-2 rounded-md transition-colors ${
                          selectedRating === rating ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
                        }`}
                      >
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm">{rating}+ stars</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setPriceRange([0, 1500])
                    setSelectedRating(null)
                  }}
                  className="w-full text-sm"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>

          <div className="w-full md:flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto overflow-x-auto">
                <TabsList className="w-full sm:w-auto justify-start">
                  <TabsTrigger value="all">All Products</TabsTrigger>
                  {productTypes.slice(1).map((type) => (
                    <TabsTrigger key={type} value={type.toLowerCase()}>
                      {type}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="priceLowToHigh">Price: Low to High</SelectItem>
                  <SelectItem value="priceHighToLow">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-500">
                Showing {sortedProducts.length} of {products.length} products
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {sortedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>

            {sortedProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 bg-white rounded-lg shadow-sm"
              >
                <div className="mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-blue-50 mb-4">
                  <Search className="h-12 w-12 text-blue-300" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 max-w-md mx-auto mb-6">
                  We couldn't find any products matching your criteria. Try adjusting your filters or search term.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setActiveTab("all")
                    setPriceRange([0, 1500])
                    setSelectedRating(null)
                  }}
                >
                  Clear all filters
                </Button>
              </motion.div>
            )}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="fixed bottom-8 right-8 z-10"
        >
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg"
            onClick={handleViewCart}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            View Cart
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}

