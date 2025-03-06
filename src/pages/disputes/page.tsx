"use client"

import { useState } from "react"
import { DisputesHero } from "@/components/disputes/disputes-hero"
import { ActiveCases } from "@/components/disputes/active-cases"
import { CaseDetail } from "@/components/disputes/case-detail"
import { CommentsSection } from "@/components/disputes/comments-section"
import { VotingSection } from "@/components/disputes/voting-section"
import { ResultsSection } from "@/components/disputes/results-section"
import { JudgesPanel } from "@/components/disputes/judges-panel"
import { ResourcesSection } from "@/components/disputes/resources-section"
import { DisputesStats } from "@/components/disputes/disputes-stats"
import  GradientWave  from "@/components/ui/gradient-wave"
import  FloatingShapes  from "@/components/ui/floating-shapes"

export default function DisputesPage() {
  const [selectedCase, setSelectedCase] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950">

      <main className="container mx-auto px-4 py-8">
        <DisputesHero />

        <DisputesStats />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12 relative">
          <div className="absolute inset-0 -z-10 opacity-30">
            <FloatingShapes />
          </div>

          <div className="lg:col-span-1">
            <ActiveCases onSelectCase={setSelectedCase} selectedCase={selectedCase} />
            <JudgesPanel className="mt-8" />
            <ResourcesSection className="mt-8" />
          </div>

          {selectedCase ? (
            <div className="lg:col-span-2 space-y-8">
              <CaseDetail caseId={selectedCase} />
              <CommentsSection caseId={selectedCase} />
              <VotingSection caseId={selectedCase} />
              <ResultsSection caseId={selectedCase} />
            </div>
          ) : (
            <div className="lg:col-span-2 flex items-center justify-center p-12 bg-white/50 dark:bg-slate-900/50 rounded-xl border border-blue-100 dark:border-blue-900 backdrop-blur-sm">
              <div className="text-center max-w-md">
                <h3 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-4">Select a Case</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Choose an active dispute case from the list to view details, participate in discussions, and vote on
                  resolutions.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* <div className="mt-20">
        <GradientWave />
      </div> */}
    </div>
  )
}

