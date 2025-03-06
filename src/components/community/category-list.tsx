"use client"

import { motion } from "framer-motion"
import { Code, MessageSquare, Lightbulb, HelpCircle, Zap, Settings, BookOpen } from "lucide-react"

const categories = [
  {
    id: 1,
    name: "Development",
    icon: Code,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    threads: 842,
    posts: 5621,
  },
  {
    id: 2,
    name: "General Discussion",
    icon: MessageSquare,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    threads: 1253,
    posts: 9874,
  },
  {
    id: 3,
    name: "Ideas & Suggestions",
    icon: Lightbulb,
    color: "text-amber-600",
    bgColor: "bg-amber-100",
    threads: 567,
    posts: 3245,
  },
  {
    id: 4,
    name: "Help & Support",
    icon: HelpCircle,
    color: "text-green-600",
    bgColor: "bg-green-100",
    threads: 789,
    posts: 4532,
  },
  {
    id: 5,
    name: "Announcements",
    icon: Zap,
    color: "text-red-600",
    bgColor: "bg-red-100",
    threads: 124,
    posts: 1876,
  },
  {
    id: 6,
    name: "Governance",
    icon: Settings,
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
    threads: 267,
    posts: 2008,
  },
  {
    id: 7,
    name: "Learning Resources",
    icon: BookOpen,
    color: "text-teal-600",
    bgColor: "bg-teal-100",
    threads: 156,
    posts: 1243,
  },
]

export default function CategoryList() {
  return (
    <div className="space-y-3">
      {categories.map((category, index) => {
        const Icon = category.icon

        return (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 },
            }}
            className="flex items-center p-3 rounded-lg hover:bg-slate-50 cursor-pointer border border-transparent hover:border-border transition-colors"
          >
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${category.bgColor} ${category.color} mr-3 shrink-0`}
            >
              <Icon className="w-5 h-5" />
            </div>

            <div className="flex-grow min-w-0">
              <h4 className="font-medium text-sm truncate">{category.name}</h4>
              <p className="text-xs text-muted-foreground">
                {category.threads} threads • {category.posts} posts
              </p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

