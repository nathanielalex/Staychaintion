"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Award, Check, HelpCircle, Info, Scale, ThumbsDown, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface VotingSectionProps {
  caseId: string
}

interface VotingOption {
  id: string
  label: string
  description: string
  votes: number
  percentage: number
  color: string
}

// Mock voting data
const mockVotingOptions: VotingOption[] = [
  {
    id: "option-1",
    label: "In favor of Tenant",
    description: "The security deposit should be returned in full as the damages fall under normal wear and tear.",
    votes: 782,
    percentage: 65,
    color: "bg-green-500",
  },
  {
    id: "option-2",
    label: "In favor of Property Owner",
    description: "The security deposit was rightfully withheld for damages beyond normal wear and tear.",
    votes: 324,
    percentage: 27,
    color: "bg-red-500",
  },
  {
    id: "option-3",
    label: "Partial Resolution",
    description: "A portion of the deposit should be returned, with some withheld for specific damages.",
    votes: 96,
    percentage: 8,
    color: "bg-amber-500",
  },
]

export function VotingSection({ caseId }: VotingSectionProps) {
  const [votingOptions, setVotingOptions] = useState(mockVotingOptions)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [hasVoted, setHasVoted] = useState(false)
  const [showTokenInfo, setShowTokenInfo] = useState(false)

  const totalVotes = votingOptions.reduce((sum, option) => sum + option.votes, 0)
  const tokensAvailable = 150

  const handleVote = () => {
    if (!selectedOption) return

    const updatedOptions = votingOptions.map((option) => {
      if (option.id === selectedOption) {
        const newVotes = option.votes + 1
        const newPercentage = Math.round((newVotes / (totalVotes + 1)) * 100)
        return { ...option, votes: newVotes, percentage: newPercentage }
      }

      // Recalculate percentages for other options
      const newPercentage = Math.round((option.votes / (totalVotes + 1)) * 100)
      return { ...option, percentage: newPercentage }
    })

    setVotingOptions(updatedOptions)
    setHasVoted(true)
  }

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
            <Scale size={20} className="mr-2" /> Community Voting
          </h2>
          <div className="flex items-center">
            <button
              onClick={() => setShowTokenInfo(!showTokenInfo)}
              className="flex items-center text-sm text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <Award size={16} className="mr-1" />
              <span>{tokensAvailable} Tokens Available</span>
              <HelpCircle size={14} className="ml-1 text-slate-400" />
            </button>
          </div>
        </div>
      </div>

      {showTokenInfo && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-blue-50 dark:bg-blue-950/30 p-4 border-b border-blue-100 dark:border-blue-900"
        >
          <div className="flex items-start gap-3">
            <Info size={20} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-1">About Governance Tokens</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Governance tokens represent your voting power in the community. You earn tokens by participating in the
                platform, verifying your identity, and contributing to case resolutions. The more tokens you use on a
                vote, the more weight your decision carries.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      <div className="p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-slate-800 dark:text-slate-200">Current Results</h3>
            <span className="text-sm text-slate-500 dark:text-slate-400">{totalVotes} total votes</span>
          </div>

          <div className="space-y-4">
            {votingOptions.map((option) => (
              <div key={option.id} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{option.label}</span>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {option.percentage}% ({option.votes} votes)
                  </span>
                </div>
                <Progress value={option.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </div>

        {!hasVoted ? (
          <div>
            <h3 className="font-medium text-slate-800 dark:text-slate-200 mb-4">Cast Your Vote</h3>
            <div className="space-y-3">
              {votingOptions.map((option) => (
                <motion.div
                  key={option.id}
                  whileHover={{ scale: 1.01 }}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors duration-200 ${
                    selectedOption === option.id
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-950/50 dark:border-blue-600"
                      : "border-slate-200 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-800"
                  }`}
                  onClick={() => setSelectedOption(option.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {selectedOption === option.id ? (
                        <div className="w-5 h-5 rounded-full border-2 border-blue-500 dark:border-blue-400 flex items-center justify-center">
                          <div className="w-2.5 h-2.5 rounded-full bg-blue-500 dark:bg-blue-400"></div>
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-700"></div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-800 dark:text-slate-200">{option.label}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{option.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <input type="range" min="1" max={tokensAvailable} defaultValue="10" className="w-32 accent-blue-600" />
                <span className="text-sm text-slate-600 dark:text-slate-400">10 tokens</span>
              </div>

              <Button
                onClick={handleVote}
                disabled={!selectedOption}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Cast Vote
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg border border-green-100 dark:border-green-900 text-center">
            <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400 font-medium">
              <Check size={18} />
              <span>Your vote has been recorded</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              Thank you for participating in this case resolution. The final decision will be made when voting ends.
            </p>
          </div>
        )}

        <div className="mt-6 pt-6 border-t border-blue-100 dark:border-blue-900">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                <ThumbsUp size={16} />
                <span className="text-sm font-medium">782</span>
              </div>
              <div className="flex items-center gap-1 text-red-600 dark:text-red-400">
                <ThumbsDown size={16} />
                <span className="text-sm font-medium">324</span>
              </div>
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400">Voting ends in 10 days</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

