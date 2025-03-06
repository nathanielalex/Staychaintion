"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, FileText, Home, Info, MapPin, User, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CaseDetailProps {
  caseId: string
}

// Mock data for a specific case
const caseData = {
  id: "case-001",
  title: "Damage Deposit Dispute",
  description:
    "Dispute regarding the withholding of a $1,500 security deposit for alleged damages to the property that the tenant claims were pre-existing or normal wear and tear.",
  status: "voting",
  createdAt: "February 28, 2025",
  votingEndsAt: "March 15, 2025",
  property: {
    name: "Skyline Apartments #304",
    address: "1234 Skyline Drive, Innovation City",
    type: "Residential Apartment",
  },
  parties: {
    plaintiff: {
      name: "Jordan Smith",
      role: "Tenant",
      joinedAt: "June 2023",
    },
    defendant: {
      name: "Skyline Properties LLC",
      role: "Property Owner",
      joinedAt: "March 2020",
    },
  },
  timeline: [
    {
      date: "June 1, 2023",
      event: "Lease agreement signed",
    },
    {
      date: "May 31, 2024",
      event: "Tenant moved out",
    },
    {
      date: "June 15, 2024",
      event: "Security deposit partially withheld",
    },
    {
      date: "June 20, 2024",
      event: "Tenant disputed charges",
    },
    {
      date: "February 28, 2025",
      event: "Case submitted to community resolution",
    },
  ],
  evidence: [
    {
      id: "ev-001",
      title: "Move-in Inspection Report",
      submittedBy: "Jordan Smith",
      date: "June 1, 2023",
      type: "document",
    },
    {
      id: "ev-002",
      title: "Move-out Inspection Photos",
      submittedBy: "Skyline Properties",
      date: "June 2, 2024",
      type: "images",
    },
    {
      id: "ev-003",
      title: "Repair Cost Estimates",
      submittedBy: "Skyline Properties",
      date: "June 10, 2024",
      type: "document",
    },
    {
      id: "ev-004",
      title: "Email Communications",
      submittedBy: "Jordan Smith",
      date: "June 15-20, 2024",
      type: "document",
    },
  ],
}

export function CaseDetail({ caseId }: CaseDetailProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "timeline" | "evidence">("overview")

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-slate-900 rounded-xl border border-blue-100 dark:border-blue-900 shadow-sm overflow-hidden"
    >
      <div className="p-6 border-b border-blue-100 dark:border-blue-900 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50">
        <div className="flex items-start justify-between">
          <div>
            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300 mb-2">
              Voting in Progress
            </div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">{caseData.title}</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Case #{caseData.id}</p>
          </div>

          <Button variant="outline" className="border-blue-200 dark:border-blue-800">
            <FileText size={16} className="mr-2" /> Case Files
          </Button>
        </div>
      </div>

      <div className="border-b border-blue-100 dark:border-blue-900">
        <div className="flex overflow-x-auto scrollbar-thin scrollbar-thumb-blue-200 dark:scrollbar-thumb-blue-800">
          <button
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors duration-200 ${
              activeTab === "overview"
                ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                : "border-transparent text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors duration-200 ${
              activeTab === "timeline"
                ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                : "border-transparent text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
            }`}
            onClick={() => setActiveTab("timeline")}
          >
            Timeline
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors duration-200 ${
              activeTab === "evidence"
                ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                : "border-transparent text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
            }`}
            onClick={() => setActiveTab("evidence")}
          >
            Evidence
          </button>
        </div>
      </div>

      <div className="p-6">
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-3">Case Description</h3>
              <p className="text-slate-600 dark:text-slate-400">{caseData.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50/50 dark:bg-blue-950/30 rounded-lg p-4 border border-blue-100 dark:border-blue-900">
                <h4 className="text-sm font-medium text-slate-800 dark:text-slate-200 mb-3 flex items-center">
                  <Home size={16} className="mr-2 text-blue-600 dark:text-blue-400" /> Property Information
                </h4>
                <div className="space-y-2">
                  <p className="text-sm text-slate-700 dark:text-slate-300">{caseData.property.name}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 flex items-start">
                    <MapPin size={14} className="mr-1 mt-0.5 text-slate-400" /> {caseData.property.address}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 flex items-start">
                    <Info size={14} className="mr-1 mt-0.5 text-slate-400" /> {caseData.property.type}
                  </p>
                </div>
              </div>

              <div className="bg-blue-50/50 dark:bg-blue-950/30 rounded-lg p-4 border border-blue-100 dark:border-blue-900">
                <h4 className="text-sm font-medium text-slate-800 dark:text-slate-200 mb-3 flex items-center">
                  <Calendar size={16} className="mr-2 text-blue-600 dark:text-blue-400" /> Important Dates
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Case Submitted:</span>
                    <span className="text-slate-700 dark:text-slate-300">{caseData.createdAt}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Voting Ends:</span>
                    <span className="text-slate-700 dark:text-slate-300">{caseData.votingEndsAt}</span>
                  </div>
                  <div className="mt-2 pt-2 border-t border-blue-100 dark:border-blue-900">
                    <div className="flex items-center text-sm text-amber-600 dark:text-amber-400">
                      <Clock size={14} className="mr-1" /> 10 days remaining for voting
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50/50 dark:bg-blue-950/30 rounded-lg p-4 border border-blue-100 dark:border-blue-900">
                <h4 className="text-sm font-medium text-slate-800 dark:text-slate-200 mb-3 flex items-center">
                  <User size={16} className="mr-2 text-blue-600 dark:text-blue-400" /> Plaintiff
                </h4>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {caseData.parties.plaintiff.name}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Role: {caseData.parties.plaintiff.role}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Member since: {caseData.parties.plaintiff.joinedAt}
                  </p>
                </div>
              </div>

              <div className="bg-blue-50/50 dark:bg-blue-950/30 rounded-lg p-4 border border-blue-100 dark:border-blue-900">
                <h4 className="text-sm font-medium text-slate-800 dark:text-slate-200 mb-3 flex items-center">
                  <Users size={16} className="mr-2 text-blue-600 dark:text-blue-400" /> Defendant
                </h4>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {caseData.parties.defendant.name}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Role: {caseData.parties.defendant.role}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Member since: {caseData.parties.defendant.joinedAt}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "timeline" && (
          <div>
            <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4">Case Timeline</h3>
            <div className="relative pl-8 space-y-8 before:absolute before:inset-y-0 before:left-3 before:w-0.5 before:bg-blue-200 dark:before:bg-blue-800">
              {caseData.timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="absolute -left-8 mt-1.5 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 border-2 border-blue-500 dark:border-blue-600 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-600"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400">{item.date}</p>
                    <p className="mt-1 text-slate-700 dark:text-slate-300">{item.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "evidence" && (
          <div>
            <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4">Submitted Evidence</h3>
            <div className="space-y-4">
              {caseData.evidence.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-start p-4 rounded-lg border border-blue-100 dark:border-blue-900 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors duration-200"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    {item.type === "document" ? <FileText size={20} /> : <Image size={20} />}
                  </div>
                  <div className="ml-4 flex-grow">
                    <h4 className="text-sm font-medium text-slate-800 dark:text-slate-200">{item.title}</h4>
                    <div className="mt-1 flex items-center text-xs text-slate-500 dark:text-slate-400">
                      <span>Submitted by {item.submittedBy}</span>
                      <span className="mx-2">•</span>
                      <span>{item.date}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400">
                    View
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

function Image(props: { size: number }) {
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
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  )
}

