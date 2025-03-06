"use client"

import { motion } from "framer-motion"
import { MessageSquare, Users, TrendingUp, Zap, Award } from "lucide-react"
import { Avatar } from "@/components/ui/avatar"

const featuredDiscussions = [
  {
    id: 1,
    title: "Announcing ICP 3.0: The Next Evolution of Internet Computer",
    excerpt:
      "We're excited to announce the next major update to the Internet Computer Protocol with groundbreaking new features...",
    author: {
      name: "Dominic Williams",
      avatar: "/images/placeholder/user.png",
    },
    replies: 42,
    views: 1253,
    category: "Announcements",
    icon: Zap,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-100",
  },
  {
    id: 2,
    title: "Proposal: Improve governance voting mechanism",
    excerpt:
      "After extensive research and community feedback, I'm proposing significant improvements to our current governance system...",
    author: {
      name: "governance_guru",
      avatar: "/images/placeholder/user.png",
    },
    replies: 56,
    views: 1432,
    category: "Governance",
    icon: Users,
    iconColor: "text-indigo-500",
    iconBg: "bg-indigo-100",
  },
  {
    id: 3,
    title: "Community Spotlight: Top Projects Building on ICP",
    excerpt:
      "Let's celebrate the amazing projects being built on the Internet Computer. This month we're highlighting...",
    author: {
      name: "Sarah L.",
      avatar: "/images/placeholder/user.png",
    },
    replies: 28,
    views: 876,
    category: "Community",
    icon: Award,
    iconColor: "text-purple-500",
    iconBg: "bg-purple-100",
  },
]

export default function FeaturedDiscussions() {
  return (
    <div className="space-y-4">
      {featuredDiscussions.map((discussion, index) => {
        const Icon = discussion.icon

        return (
          <motion.div
            key={discussion.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{
              scale: 1.01,
              transition: { duration: 0.2 },
            }}
            className="p-4 rounded-lg border border-border bg-white hover:border-primary/30 hover:bg-primary/[0.02] transition-colors cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${discussion.iconBg} ${discussion.iconColor} shrink-0`}
              >
                <Icon className="w-5 h-5" />
              </div>

              <div className="flex-grow min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-medium text-base">{discussion.title}</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary whitespace-nowrap">
                    {discussion.category}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{discussion.excerpt}</p>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6 border border-border">
                      <img src={discussion.author.avatar || "/placeholder.svg"} alt={discussion.author.name} />
                    </Avatar>
                    <span className="text-xs text-muted-foreground">{discussion.author.name}</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5" />
                      {discussion.replies}
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {discussion.views}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

