"use client"

import { motion } from "framer-motion"
import { Avatar } from "@/components/ui/avatar"

const contributors = [
  {
    id: 1,
    name: "Dominic W.",
    avatar: "/images/placeholder/user.png",
    role: "Core Developer",
    posts: 1253,
    reputation: 9876,
  },
  {
    id: 2,
    name: "Sarah L.",
    avatar: "/images/placeholder/user.png",
    role: "Community Manager",
    posts: 876,
    reputation: 7654,
  },
  {
    id: 3,
    name: "Michael T.",
    avatar: "/images/placeholder/user.png",
    role: "Governance Expert",
    posts: 543,
    reputation: 6543,
  },
  {
    id: 4,
    name: "Jessica K.",
    avatar: "/images/placeholder/user.png",
    role: "Developer Advocate",
    posts: 432,
    reputation: 5432,
  },
  {
    id: 5,
    name: "Robert Z.",
    avatar: "/images/placeholder/user.png",
    role: "Security Researcher",
    posts: 321,
    reputation: 4321,
  },
]

export default function TopContributors() {
  return (
    <div className="space-y-4">
      {contributors.map((contributor, index) => (
        <motion.div
          key={contributor.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.2 },
          }}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
        >
          <div className="relative">
            <Avatar className="w-10 h-10 border border-border">
              <img src={contributor.avatar || "/placeholder.svg"} alt={contributor.name} />
            </Avatar>
            <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 rounded-full bg-primary text-white text-xs font-bold">
              {index + 1}
            </span>
          </div>

          <div className="flex-grow min-w-0">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-sm">{contributor.name}</h4>
                <p className="text-xs text-muted-foreground">{contributor.role}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-primary">{contributor.reputation.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">{contributor.posts} posts</p>
              </div>
            </div>

            {/* Reputation bar */}
            <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(contributor.reputation / 10000) * 100}%` }}
                transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
              />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

