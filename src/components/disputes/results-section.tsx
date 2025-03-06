"use client"

import { motion } from "framer-motion"
import { Award, Check, FileText, Flag, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ResultsSectionProps {
  caseId: string
}

export function ResultsSection({ caseId }: ResultsSectionProps) {
  // For this example, we'll assume the case is still in progress
  const isResolved = false

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-slate-900 rounded-xl border border-blue-100 dark:border-blue-900 shadow-sm overflow-hidden"
    >
      <div className="p-6 border-b border-blue-100 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/50">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-blue-800 dark:text-blue-300 flex items-center">
            <Flag size={20} className="mr-2" /> Resolution
          </h2>
        </div>
      </div>

      <div className="p-6">
        {isResolved ? (
          <div className="space-y-6">
            <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg border border-green-100 dark:border-green-900">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-600 dark:text-green-400">
                  <Check size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-slate-800 dark:text-slate-200">Case Resolved</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    This case has been resolved by community vote on March 15, 2025.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-slate-800 dark:text-slate-200 mb-3">Final Decision</h3>
              <div className="bg-blue-50/50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-100 dark:border-blue-900">
                <p className="text-slate-700 dark:text-slate-300">
                  Based on community voting and evidence review, the security deposit should be returned in full to the
                  tenant as the damages fall under normal wear and tear.
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <ThumbsUp size={14} className="text-green-500" />
                  <span>65% of the community voted in favor of this resolution</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-slate-800 dark:text-slate-200 mb-3">Implementation</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <span className="text-xs font-medium">1</span>
                  </div>
                  <div className="text-slate-700 dark:text-slate-300">
                    Skyline Properties LLC must return the full security deposit of $1,500 to Jordan Smith within 7
                    days.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <span className="text-xs font-medium">2</span>
                  </div>
                  <div className="text-slate-700 dark:text-slate-300">
                    Both parties must acknowledge the resolution in the platform within 3 days.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <span className="text-xs font-medium">3</span>
                  </div>
                  <div className="text-slate-700 dark:text-slate-300">
                    The case will be marked as completed once both conditions are met.
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-blue-100 dark:border-blue-900">
              <Button variant="outline" className="border-blue-200 dark:border-blue-800">
                <FileText size={16} className="mr-2" /> View Full Report
              </Button>
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <Award size={16} />
                <span className="text-sm">Contributors rewarded: 25 tokens</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
              <Clock size={28} />
            </div>
            <h3 className="text-xl font-medium text-slate-800 dark:text-slate-200 mb-2">Resolution Pending</h3>
            <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              This case is still in the voting phase. The final resolution will be available once voting has concluded
              and the results have been processed.
            </p>
            <div className="mt-6 inline-flex items-center text-sm text-blue-600 dark:text-blue-400">
              <Calendar size={16} />
              <span>Expected resolution date: March 15, 2025</span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

function Clock(props: { size: number }) {
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
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function Calendar(props: { size: number }) {
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
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}

