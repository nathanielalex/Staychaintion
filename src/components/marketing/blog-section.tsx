"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    title: "10 Hidden Gems for Your Wonderful Vacation",
    excerpt: "Discover off-the-beaten-path destinations that will make your next trip unforgettable.",
    image: "/images/blog/img1.png",
    date: "2023-05-15",
  },
  {
    id: 2,
    title: "How to Travel on a Budget: Tips and Tricks",
    excerpt: "Learn how to make the most of your travel budget without sacrificing experiences.",
    image: "/images/blog/img2.png",
    date: "2023-05-10",
  },
  {
    id: 3,
    title: "The Rise of Eco-Friendly Accommodations",
    excerpt: "Explore the growing trend of sustainable lodging options around the world.",
    image: "/images/blog/img3.png",
    date: "2023-05-05",
  },
]

export default function BlogSection() {
  return (
    <section className="py-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-3xl font-semibold text-blue-800 mb-8 text-center"
      >
        Latest from Our Blog
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {blogPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <img
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{post.date}</span>
                  <a href={`/blog/${post.id}`}>
                    <Button variant="ghost" className="text-blue-600 hover:text-blue-800">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="text-center">
        <a href="/marketing/blogs">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
            View All Posts
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </a>
      </div>
    </section>
  )
}

