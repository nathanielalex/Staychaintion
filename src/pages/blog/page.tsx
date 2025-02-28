"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import BlogPostCard from "@/components/blog/blog-post-card"

const blogPosts = [
  {
    id: 1,
    title: "10 Hidden Gems for Your Wonderful Vacation",
    excerpt: "Discover off-the-beaten-path destinations that will make your next trip unforgettable.",
    image: "/images/blog/img1.png",
    date: "2023-05-15",
    category: "Travel Tips",
  },
  {
    id: 2,
    title: "How to Travel on a Budget: Tips and Tricks",
    excerpt: "Learn how to make the most of your travel budget without sacrificing experiences.",
    image: "/images/blog/img2.png",
    date: "2023-05-10",
    category: "Budget Travel",
  },
  {
    id: 3,
    title: "The Rise of Eco-Friendly Accommodations",
    excerpt: "Explore the growing trend of sustainable lodging options around the world.",
    image: "/images/blog/img3.png",
    date: "2023-05-05",
    category: "Sustainable Travel",
  },
]

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-center text-blue-600 mb-12">Our Blog</h1>

        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search blog posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border-gray-300 rounded-full focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <BlogPostCard post={post} />
            </motion.div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-gray-600 mt-8">
            No blog posts found matching your search.
          </motion.p>
        )}
      </motion.div>
    </div>
  )
}

