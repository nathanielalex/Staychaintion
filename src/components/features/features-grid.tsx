"use client"

import { motion } from "framer-motion"
import {
  ArrowRight,
  Home,
  Map,
  Users,
  Wallet,
  MessageSquare,
  Gavel,
  ShoppingBag,
  Brain,
  Calendar,
  LineChart,
  Settings,
  User,
  Briefcase,
  Shield,
  Heart,
  Lightbulb,
  Award,
  BookOpen,
  Compass,
} from "lucide-react"

// Feature data structure
const allFeatures = [
  {
    id: 1,
    title: "Property Listings",
    description: "Browse and search available properties with advanced filters",
    icon: Home,
    image: "/images/features/property.png",
    href: "/properties",
    category: "user",
    isNew: false,
    isPremium: false,
    isProgress: false,
  },
  {
    id: 2,
    title: "Interactive Map",
    description: "Find properties on an interactive map with location-based search",
    icon: Map,
    image: "/images/features/map.png",
    href: "/map",
    category: "user",
    isNew: true,
    isPremium: false,
    isProgress: false,
  },
  {
    id: 3,
    title: "Community Forum",
    description: "Connect with other users, share insights, and participate in discussions",
    icon: Users,
    image: "/images/features/community.png",
    href: "/community",
    category: "community",
    isNew: false,
    isPremium: false,
    isProgress: true,
  },
  {
    id: 4,
    title: "Wallet Management",
    description: "Manage your digital assets, transactions, and payment methods",
    icon: Wallet,
    image: "/images/features/transaction.png",
    href: "/balance",
    category: "user",
    isNew: false,
    isPremium: false,
    isProgress: false,
  },
  {
    id: 5,
    title: "Dispute Resolution",
    description: "Resolve property disputes through community governance and voting",
    icon: Gavel,
    image: "/images/features/disputes.png",
    href: "/disputes",
    category: "community",
    isNew: true,
    isPremium: false,
    isProgress: true,
  },
  {
    id: 6,
    title: "AI Property Insights",
    description: "Leverage AI for property insights, predictions, and recommendations",
    icon: Brain,
    image: "/images/features/ai.png",
    href: "/ai",
    category: "user",
    isNew: false,
    isPremium: true,
  },
  {
    id: 7,
    title: "Marketplace",
    description: "Buy and sell property-related products and services",
    icon: ShoppingBag,
    image: "/images/features/marketplace.png",
    href: "/marketplace",
    category: "user",
    isNew: false,
    isPremium: false,
    isProgress: true,
  },
  {
    id: 8,
    title: "Chat Support",
    description: "Get help and support through our real-time chat system",
    icon: MessageSquare,
    image: "/images/features/chat-support.png",
    href: "/chat",
    category: "user",
    isNew: false,
    isPremium: false,
    isProgress: false,
  },
  {
    id: 9,
    title: "Blog & Resources",
    description: "Educational content, market insights, and property guides",
    icon: BookOpen,
    image: "/images/features/blog.png",
    href: "/marketing/blogs",
    category: "community",
    isNew: false,
    isPremium: false,
    isProgress: false,
  },
  {
    id: 10,
    title: "Marketing Program",
    description: "Join our affiliate program and earn rewards for referrals",
    icon: Award,
    image: "/images/features/influencer.png",
    href: "/marketing",
    category: "community",
    isNew: true,
    isPremium: false,
    isProgress: true,
  },
  {
    id: 11,
    title: "Property Prediction",
    description: "AI-powered property value prediction and investment insights",
    icon: Lightbulb,
    image: "/images/features/price-prediction.png",
    href: "/predicts",
    category: "user",
    isNew: true,
    isPremium: true,
  },
  {
    id: 19,
    title: "Chatbot",
    description: "Get to know StayAI our personal ChatBot that helps you got new information",
    icon: BookOpen,
    image: "/images/features/chatbot.png",
    href: "/chatbot",
    category: "user",
    isNew: true,
    isPremium: true,
  },
]

export default function FeaturesGrid() {
  return (
    <section id="all-features" className="py-20">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">All Platform Features</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Explore the complete set of features our platform offers to enhance your property experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {allFeatures.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{
                y: -5,
                transition: { duration: 0.2 },
              }}
              className="group relative overflow-hidden rounded-xl border border-blue-100 bg-white shadow-sm transition-all duration-200 hover:shadow-md"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={feature.image || "/placeholder.svg"}
                  alt={feature.title}
                  
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>

                {/* Feature badges */}
                <div className="absolute top-4 right-4 flex gap-2">
                  {feature.isNew && (
                    <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white">New</span>
                  )}
                  {feature.isPremium && (
                    <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-medium text-white">Premium</span>
                  )}
                  {feature.isProgress && (
                    <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-medium text-white">In Progress</span>
                  )}
                </div>

                {/* Category badge */}
                <div className="absolute bottom-4 left-4">
                  <span className="rounded-full bg-black/30 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    {feature.category.charAt(0).toUpperCase() + feature.category.slice(1)}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4 flex items-center">
                  <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                </div>

                <p className="mb-6 text-gray-600">{feature.description}</p>

                <a
                  href={feature.href}
                  className="inline-flex items-center text-sm font-medium text-blue-600 transition-colors group-hover:text-blue-700"
                >
                  Explore feature
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

