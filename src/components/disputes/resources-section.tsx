"use client"

import type React from "react"

import { motion } from "framer-motion"
import { BookOpen, FileText, HelpCircle, Scale } from "lucide-react"

interface ResourcesSectionProps {
  className?: string
}

interface Resource {
  id: string
  title: string
  description: string
  icon: React.ElementType
  url: string
}

// Mock resources data
const mockResources: Resource[] = [
  {
    id: "resource-1",
    title: "Dispute Resolution Guide",
    description: "Learn how the community dispute resolution process works.",
    icon: Scale,
    url: "#",
  },
  {
    id: "resource-2",
    title: "Evidence Submission Guidelines",
    description: "Best practices for submitting effective evidence.",
    icon: FileText,
    url: "#",
  },
  {
    id: "resource-3",
    title: "Common Case Precedents",
    description: "Review previous cases and their resolutions.",
    icon: BookOpen,
    url: "#",
  },
  {
    id: "resource-4",
    title: "Governance Token FAQ",
    description: "Everything you need to know about voting tokens.",
    icon: HelpCircle,
    url: "#",
  },
]

export function ResourcesSection({ className = "" }: ResourcesSectionProps) {
  return (
    <div
      className={`bg-white dark:bg-slate-900 rounded-xl border border-blue-100 dark:border-blue-900 shadow-sm overflow-hidden ${className}`}
    >
      <div className="p-4 border-b border-blue-100 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/50">
        <h2 className="text-xl font-bold text-blue-800 dark:text-blue-300 flex items-center">
          <BookOpen size={20} className="mr-2" /> Resources
        </h2>
      </div>

      <div className="divide-y divide-blue-100 dark:divide-blue-900">
        {mockResources.map((resource, index) => (
          <motion.a
            key={resource.id}
            href={resource.url}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="block p-4 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors duration-200"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <resource.icon size={16} />
              </div>

              <div>
                <h3 className="font-medium text-slate-800 dark:text-slate-200">{resource.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">{resource.description}</p>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  )
}

