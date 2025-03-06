"use client"

import { motion } from "framer-motion"
import { Award, Star, User } from "lucide-react"

interface JudgesPanelProps {
  className?: string
}

interface Judge {
  id: string
  name: string
  avatar: string
  reputation: number
  casesJudged: number
  expertise: string[]
  isExpert?: boolean
}

// Mock judges data
const mockJudges: Judge[] = [
  {
    id: "judge-1",
    name: "Alex Morgan",
    avatar: "/images/placeholder/user.png",
    reputation: 98,
    casesJudged: 142,
    expertise: ["Property Law", "Tenant Rights"],
    isExpert: true,
  },
  {
    id: "judge-2",
    name: "Taylor Williams",
    avatar: "/images/placeholder/user.png",
    reputation: 95,
    casesJudged: 118,
    expertise: ["Legal Advisor"],
    isExpert: true,
  },
  {
    id: "judge-3",
    name: "Jamie Chen",
    avatar: "/images/placeholder/user.png",
    reputation: 92,
    casesJudged: 87,
    expertise: ["Property Management"],
  },
  {
    id: "judge-4",
    name: "Sam Rodriguez",
    avatar: "/images/placeholder/user.png",
    reputation: 89,
    casesJudged: 76,
    expertise: ["Community Contributor"],
  },
  {
    id: "judge-5",
    name: "Jordan Lee",
    avatar: "/images/placeholder/user.png",
    reputation: 85,
    casesJudged: 64,
    expertise: ["Dispute Resolution"],
  },
]

export function JudgesPanel({ className = "" }: JudgesPanelProps) {
  return (
    <div
      className={`bg-white dark:bg-slate-900 rounded-xl border border-blue-100 dark:border-blue-900 shadow-sm overflow-hidden ${className}`}
    >
      <div className="p-4 border-b border-blue-100 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/50">
        <h2 className="text-xl font-bold text-blue-800 dark:text-blue-300 flex items-center">
          <Award size={20} className="mr-2" /> Top Judges
        </h2>
      </div>

      <div className="divide-y divide-blue-100 dark:divide-blue-900">
        {mockJudges.map((judge, index) => (
          <motion.div
            key={judge.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="p-4 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="relative flex-shrink-0">
                <img src={judge.avatar || "/placeholder.svg"} alt={judge.name} className="w-10 h-10 rounded-full" />
                {judge.isExpert && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-100 border border-white dark:border-slate-900 flex items-center justify-center">
                    <Star size={12} className="text-amber-600 fill-amber-600" />
                  </div>
                )}
              </div>

              <div className="flex-grow min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-slate-800 dark:text-slate-200 truncate">{judge.name}</h3>
                </div>

                <div className="flex items-center gap-2 mt-0.5">
                  <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                    <User size={12} />
                    <span>{judge.casesJudged} cases</span>
                  </div>
                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {judge.expertise.join(", ")}
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{judge.reputation}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="p-3 bg-blue-50/50 dark:bg-blue-950/50 border-t border-blue-100 dark:border-blue-900 text-center">
        <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
          View All Judges
        </button>
      </div>
    </div>
  )
}

