"use client"

import { motion } from "framer-motion"
import { Home, Map, Users, Wallet, MessageSquare, Gavel, ShoppingBag, Brain } from "lucide-react"

const popularFeatures = [
  {
    title: "Property Listings",
    description: "Browse and search available properties",
    icon: Home,
    href: "/properties",
    color: "bg-blue-500",
  },
  {
    title: "Interactive Map",
    description: "Find properties on an interactive map",
    icon: Map,
    href: "/map",
    color: "bg-indigo-500",
  },
  {
    title: "Community Forum",
    description: "Connect with other users and share insights",
    icon: Users,
    href: "/community",
    color: "bg-purple-500",
  },
  {
    title: "Wallet Management",
    description: "Manage your digital assets and transactions",
    icon: Wallet,
    href: "/wallet",
    color: "bg-cyan-500",
  },
  {
    title: "Dispute Resolution",
    description: "Resolve property disputes through community governance",
    icon: Gavel,
    href: "/disputes",
    color: "bg-emerald-500",
  },
  {
    title: "AI Features",
    description: "Leverage AI for property insights and recommendations",
    icon: Brain,
    href: "/ai",
    color: "bg-amber-500",
  },
  {
    title: "Marketplace",
    description: "Buy and sell property-related products and services",
    icon: ShoppingBag,
    href: "/marketplace",
    color: "bg-rose-500",
  },
  {
    title: "Chat Support",
    description: "Get help and support through our chat system",
    icon: MessageSquare,
    href: "/chat",
    color: "bg-teal-500",
  },
]

export default function PopularFeatures() {
  return (
    <section id="popular-features" className="py-16">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Popular Features</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Discover the most used features of our platform that help users manage properties, connect with others, and
            make informed decisions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {popularFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group"
            >
              <a href={feature.href} className="block h-full">
                <div className="flex h-full flex-col rounded-xl border border-blue-100 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md">
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full ${feature.color} text-white`}
                  >
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">{feature.title}</h3>
                  <p className="mb-4 text-gray-600">{feature.description}</p>
                  <div className="mt-auto text-sm font-medium text-blue-600 transition-colors group-hover:text-blue-700">
                    Explore feature →
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

