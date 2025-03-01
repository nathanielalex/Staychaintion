"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    title: "10 Hidden Gems for Your Next Vacation",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/images/blog/img2.png",
    date: "2023-05-15",
    category: "Travel Tips",
    author: "Jane Doe",
  },
]

export default function BlogPostPage() {

  const post = blogPosts[0]

  if (!post) {
    return <div>Blog post not found</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-12"
      >
        <a href="/marketing/blogs">
          <Button className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </a>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <img
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            width={800}
            height={400}
            className="w-full h-64 md:h-96 object-cover rounded-lg mb-8"
          />

          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">{post.title}</h1>

          <div className="flex items-center text-gray-600 mb-8">
            <span>{post.date}</span>
            <span className="mx-2">•</span>
            <span>{post.category}</span>
            <span className="mx-2">•</span>
            <span>By {post.author}</span>
          </div>

          <div className="prose prose-lg max-w-none">
            <p>{post.content}</p>
            {/* Add more content sections as needed */}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

