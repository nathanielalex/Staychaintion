"use client"

import { motion } from "framer-motion"
import { MessageSquare, Heart, Reply, Award, FileText } from "lucide-react"
import { Avatar } from "@/components/ui/avatar"

const activities = [
  {
    id: 1,
    type: "post",
    icon: MessageSquare,
    iconColor: "text-blue-500",
    user: {
      name: "Sarah L.",
      avatar: "/images/placeholder/user.png",
    },
    content: 'posted in "How to optimize canister performance"',
    time: "10 minutes ago",
  },
  {
    id: 2,
    type: "like",
    icon: Heart,
    iconColor: "text-red-500",
    user: {
      name: "Michael T.",
      avatar: "/images/placeholder/user.png",
    },
    content: 'liked "Proposal: Improve governance voting mechanism"',
    time: "25 minutes ago",
  },
  {
    id: 3,
    type: "reply",
    icon: Reply,
    iconColor: "text-green-500",
    user: {
      name: "Jessica K.",
      avatar: "/images/placeholder/user.png",
    },
    content: 'replied to "Beginner\'s Guide: Setting up your first ICP dapp"',
    time: "1 hour ago",
  },
  {
    id: 4,
    type: "award",
    icon: Award,
    iconColor: "text-amber-500",
    user: {
      name: "Dominic W.",
      avatar: "/images/placeholder/user.png",
    },
    content: 'received a helpful award in "Security best practices"',
    time: "2 hours ago",
  },
  {
    id: 5,
    type: "thread",
    icon: FileText,
    iconColor: "text-purple-500",
    user: {
      name: "Robert Z.",
      avatar: "/images/placeholder/user.png",
    },
    content: 'started a new thread "Exploring the future of ICP tokenomics"',
    time: "3 hours ago",
  },
]

export default function RecentActivity() {
  return (
    <div className="space-y-4">
      {activities.map((activity, index) => {
        const Icon = activity.icon

        return (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 shrink-0">
              <Icon className={`w-4 h-4 ${activity.iconColor}`} />
            </div>

            <div className="flex-grow min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Avatar className="w-6 h-6 border border-border">
                  <img src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
                </Avatar>
                <span className="font-medium text-sm">{activity.user.name}</span>
              </div>

              <p className="text-sm text-muted-foreground">{activity.content}</p>
              <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

