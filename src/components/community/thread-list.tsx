"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MessageSquare, Heart, Eye, Clock, Pin, Award, Lock } from "lucide-react"
import { Avatar } from "@/components/ui/avatar"

// Sample thread data
const threads = [
  {
    id: 1,
    title: "Announcing ICP 3.0: The Next Evolution of Internet Computer",
    author: {
      name: "Dominic Williams",
      avatar: "/images/placeholder/any.png",
    },
    category: "Announcements",
    replies: 42,
    views: 1253,
    likes: 89,
    isPinned: true,
    isLocked: false,
    isFeatured: true,
    lastActivity: "10 minutes ago",
  },
  {
    id: 2,
    title: "How to optimize canister performance for high-load applications?",
    author: {
      name: "dev_enthusiast",
      avatar: "/images/placeholder/any.png",
    },
    category: "Development",
    replies: 28,
    views: 876,
    likes: 32,
    isPinned: false,
    isLocked: false,
    isFeatured: false,
    lastActivity: "2 hours ago",
  },
  {
    id: 3,
    title: "Proposal: Improve governance voting mechanism",
    author: {
      name: "governance_guru",
      avatar: "/images/placeholder/any.png",
    },
    category: "Governance",
    replies: 56,
    views: 1432,
    likes: 78,
    isPinned: false,
    isLocked: false,
    isFeatured: true,
    lastActivity: "5 hours ago",
  },
  {
    id: 4,
    title: "Beginner's Guide: Setting up your first ICP dapp",
    author: {
      name: "icp_teacher",
      avatar: "/images/placeholder/any.png",
    },
    category: "Learning Resources",
    replies: 19,
    views: 2341,
    likes: 103,
    isPinned: false,
    isLocked: false,
    isFeatured: false,
    lastActivity: "1 day ago",
  },
  {
    id: 5,
    title: "Security best practices for canister development",
    author: {
      name: "security_expert",
      avatar: "/images/placeholder/any.png",
    },
    category: "Development",
    replies: 34,
    views: 987,
    likes: 67,
    isPinned: false,
    isLocked: false,
    isFeatured: false,
    lastActivity: "2 days ago",
  },
  {
    id: 6,
    title: "[RESOLVED] Network upgrade scheduled for next week",
    author: {
      name: "icp_admin",
      avatar: "/images/placeholder/any.png",
    },
    category: "Announcements",
    replies: 12,
    views: 3456,
    likes: 45,
    isPinned: false,
    isLocked: true,
    isFeatured: false,
    lastActivity: "3 days ago",
  },
]

export default function ThreadList() {
  const [hoveredThread, setHoveredThread] = useState<number | null>(null)

  return (
    <div className="space-y-4">
      {threads.map((thread, index) => (
        <motion.div
          key={thread.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          whileHover={{
            scale: 1.01,
            transition: { duration: 0.2 },
          }}
          onHoverStart={() => setHoveredThread(thread.id)}
          onHoverEnd={() => setHoveredThread(null)}
          className={`relative p-4 rounded-lg border ${hoveredThread === thread.id ? "border-primary/30 bg-primary/[0.02]" : "border-border bg-white"} transition-colors`}
        >
          {/* Thread status indicators */}
          <div className="absolute top-4 right-4 flex gap-1.5">
            {thread.isPinned && <Pin className="w-4 h-4 text-amber-500" />}
            {thread.isLocked && <Lock className="w-4 h-4 text-red-500" />}
            {thread.isFeatured && <Award className="w-4 h-4 text-primary" />}
          </div>

          <div className="flex items-start gap-3">
            <Avatar className="w-10 h-10 border border-border">
              <img src={thread.author.avatar || "/placeholder.svg"} alt={thread.author.name} />
            </Avatar>

            <div className="flex-grow min-w-0">
              <h3 className="font-medium text-base mb-1 pr-12">{thread.title}</h3>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                <span>
                  by <span className="text-primary">{thread.author.name}</span>
                </span>

                <span className="flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5" />
                  {thread.replies} replies
                </span>

                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  {thread.views} views
                </span>

                <span className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5" />
                  {thread.likes} likes
                </span>

                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {thread.lastActivity}
                </span>
              </div>

              <div className="mt-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  {thread.category}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

