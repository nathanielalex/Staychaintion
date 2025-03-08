"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { AlertCircle, CheckCircle, Clock, Filter, Lock, Pin, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

type CaseStatus = "new" | "in-progress" | "voting" | "resolved"

interface Case {
  id: string
  title: string
  property: string
  parties: string
  status: CaseStatus
  date: string
  isPinned?: boolean
  isLocked?: boolean
  isFeatured?: boolean
  votes?: number
  comments?: number
}

const mockCases: Case[] = [
  {
    id: "case-001",
    title: "Damage Deposit Dispute",
    property: "Skyline Apartments #304",
    parties: "J. Smith vs. Skyline Properties",
    status: "voting",
    date: "2025-02-28",
    votes: 124,
    comments: 38,
  },
  {
    id: "case-002",
    title: "Unauthorized Renovation",
    property: "Lakeside Villa #12",
    parties: "Lakeside Rentals vs. M. Johnson",
    status: "in-progress",
    date: "2025-03-01",
    comments: 27,
  },
  {
    id: "case-003",
    title: "Early Termination Fee",
    property: "Urban Lofts #506",
    parties: "P. Williams vs. Urban Living Co.",
    status: "new",
    date: "2025-03-04",
    comments: 8,
  },
  {
    id: "case-004",
    title: "Maintenance Responsibility",
    property: "Garden Homes #7",
    parties: "Garden Estates vs. R. Davis",
    status: "resolved",
    date: "2025-02-20",
    votes: 89,
    comments: 42,
  },
  {
    id: "case-005",
    title: "Noise Complaint Eviction",
    property: "Quiet Meadows #203",
    parties: "Quiet Meadows LLC vs. T. Garcia",
    status: "voting",
    date: "2025-02-26",
    isFeatured: true,
    votes: 215,
    comments: 76,
  },
  {
    id: "case-006",
    title: "Pet Policy Violation",
    property: "Parkview Apartments #118",
    parties: "Parkview Management vs. L. Chen",
    status: "in-progress",
    date: "2025-03-02",
    comments: 31,
  },
  {
    id: "case-007",
    title: "Rent Increase Dispute",
    property: "Sunset Towers #1502",
    parties: "K. Brown vs. Sunset Properties",
    status: "new",
    date: "2025-03-05",
    isPinned: true,
    comments: 12,
  },
  {
    id: "case-008",
    title: "Security System Installation",
    property: "Safe Harbor Condos #42",
    parties: "Safe Harbor HOA vs. E. Martinez",
    status: "resolved",
    date: "2025-02-15",
    isLocked: true,
    votes: 67,
    comments: 29,
  },
]

const statusColors = {
  new: "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
  "in-progress": "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300",
  voting: "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300",
  resolved: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
}

const statusIcons = {
  new: AlertCircle,
  "in-progress": Clock,
  voting: Star,
  resolved: CheckCircle,
}

interface ActiveCasesProps {
  onSelectCase: (caseId: string) => void
  selectedCase: string | null
  className?: string
}

export function ActiveCases({ onSelectCase, selectedCase, className = "" }: ActiveCasesProps) {
  const [filter, setFilter] = useState<CaseStatus | "all">("all")

  const filteredCases = filter === "all" ? mockCases : mockCases.filter((c) => c.status === filter)

  return (
    <div
      className={`bg-white dark:bg-slate-900 rounded-xl border border-blue-100 dark:border-blue-900 shadow-sm overflow-hidden ${className}`}
    >
      <div className="p-4 border-b border-blue-100 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-blue-800 dark:text-blue-300">Active Cases</h2>
          <Button variant="ghost" size="sm" className="text-blue-100 dark:text-slate-300">
            <Filter size={16} className="mr-1" /> Filter
          </Button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-blue-200 dark:scrollbar-thumb-blue-800">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
            className={filter === "all" ? "bg-blue-600 hover:bg-blue-700" : ""}
          >
            All
          </Button>
          <Button
            variant={filter === "new" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("new")}
            className={filter === "new" ? "bg-blue-600 hover:bg-blue-700" : ""}
          >
            New
          </Button>
          <Button
            variant={filter === "in-progress" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("in-progress")}
            className={filter === "in-progress" ? "bg-blue-600 hover:bg-blue-700" : ""}
          >
            In Progress
          </Button>
          <Button
            variant={filter === "voting" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("voting")}
            className={filter === "voting" ? "bg-blue-600 hover:bg-blue-700" : ""}
          >
            Voting
          </Button>
          <Button
            variant={filter === "resolved" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("resolved")}
            className={filter === "resolved" ? "bg-blue-600 hover:bg-blue-700" : ""}
          >
            Resolved
          </Button>
        </div>
      </div>

      <div className="divide-y divide-blue-100 dark:divide-blue-900 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200 dark:scrollbar-thumb-blue-800">
        {filteredCases.length === 0 ? (
          <div className="p-8 text-center text-slate-500 dark:text-slate-400">No cases match the selected filter.</div>
        ) : (
          filteredCases.map((caseItem, index) => {
            const StatusIcon = statusIcons[caseItem.status]

            return (
              <motion.div
                key={caseItem.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`p-4 hover:bg-blue-50 dark:hover:bg-blue-950/50 cursor-pointer transition-colors duration-200 relative ${selectedCase === caseItem.id ? "bg-blue-50 dark:bg-blue-950/50" : ""}`}
                onClick={() => onSelectCase(caseItem.id)}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${statusColors[caseItem.status]}`}
                  >
                    <StatusIcon size={18} />
                  </div>

                  <div className="flex-grow min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-slate-800 dark:text-slate-200 truncate">{caseItem.title}</h3>
                      {caseItem.isPinned && <Pin size={14} className="text-amber-500" />}
                      {caseItem.isLocked && <Lock size={14} className="text-slate-500" />}
                      {caseItem.isFeatured && <Star size={14} className="text-purple-500 fill-purple-500" />}
                    </div>

                    <p className="text-sm text-slate-600 dark:text-slate-400 truncate">{caseItem.property}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">{caseItem.parties}</p>

                    <div className="flex items-center gap-4 mt-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[caseItem.status]}`}>
                        {caseItem.status.replace("-", " ")}
                      </span>

                      <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                        {caseItem.votes !== undefined && (
                          <span className="flex items-center gap-1">
                            <Star size={12} /> {caseItem.votes}
                          </span>
                        )}

                        {caseItem.comments !== undefined && (
                          <span className="flex items-center gap-1">
                            <MessageSquare size={12} /> {caseItem.comments}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })
        )}
      </div>
    </div>
  )
}

function MessageSquare(props: { size: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

