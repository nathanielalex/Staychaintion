"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MessageSquare, ThumbsDown, ThumbsUp, User } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CommentsProps {
  caseId: string
}

interface Comment {
  id: string
  author: {
    name: string
    avatar: string
    role: string
    isExpert?: boolean
  }
  content: string
  timestamp: string
  likes: number
  dislikes: number
  replies?: Comment[]
}

// Mock comments data
const mockComments: Comment[] = [
  {
    id: "comment-1",
    author: {
      name: "Alex Morgan",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Property Law Expert",
      isExpert: true,
    },
    content:
      "Based on the lease agreement and the evidence provided, the tenant has a strong case. The damages described appear to fall under normal wear and tear, which is the landlord's responsibility according to most state laws.",
    timestamp: "2 days ago",
    likes: 42,
    dislikes: 3,
    replies: [
      {
        id: "reply-1",
        author: {
          name: "Sarah Chen",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Property Manager",
        },
        content:
          "I disagree. The photos clearly show damage beyond normal wear and tear. The tenant should be responsible for the repair costs as outlined in the lease agreement.",
        timestamp: "1 day ago",
        likes: 15,
        dislikes: 8,
      },
      {
        id: "reply-2",
        author: {
          name: "Michael Rodriguez",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Community Member",
        },
        content:
          "I've been in a similar situation. The key question is whether the damage was documented in the move-in inspection. If not, it's difficult to prove it wasn't pre-existing.",
        timestamp: "1 day ago",
        likes: 27,
        dislikes: 2,
      },
    ],
  },
  {
    id: "comment-2",
    author: {
      name: "Jordan Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Tenant (Plaintiff)",
    },
    content:
      "I'd like to clarify that I have photos from when I moved in showing the carpet already had some stains. I've submitted these as evidence. Additionally, the lease specifically states that normal wear and tear is expected after a 12-month tenancy.",
    timestamp: "2 days ago",
    likes: 31,
    dislikes: 5,
  },
  {
    id: "comment-3",
    author: {
      name: "Taylor Williams",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Legal Advisor",
      isExpert: true,
    },
    content:
      "Looking at the evidence, there are a few key legal principles at play here. First, security deposits can only be withheld for damages beyond normal wear and tear. Second, the burden of proof typically falls on the landlord to demonstrate that damages exceed normal wear and tear. The move-in and move-out documentation will be crucial in this case.",
    timestamp: "1 day ago",
    likes: 38,
    dislikes: 1,
  },
]

export function CommentsSection({ caseId }: CommentsProps) {
  const [comments, setComments] = useState(mockComments)
  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState("")

  const handleAddComment = () => {
    if (!newComment.trim()) return

    const comment: Comment = {
      id: `comment-${Date.now()}`,
      author: {
        name: "You",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Community Member",
      },
      content: newComment,
      timestamp: "Just now",
      likes: 0,
      dislikes: 0,
    }

    setComments([comment, ...comments])
    setNewComment("")
  }

  const handleAddReply = (commentId: string) => {
    if (!replyContent.trim()) return

    const reply: Comment = {
      id: `reply-${Date.now()}`,
      author: {
        name: "You",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Community Member",
      },
      content: replyContent,
      timestamp: "Just now",
      likes: 0,
      dislikes: 0,
    }

    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), reply],
        }
      }
      return comment
    })

    setComments(updatedComments)
    setReplyContent("")
    setReplyingTo(null)
  }

  const handleLike = (commentId: string, isReply = false, parentId?: string) => {
    if (isReply && parentId) {
      const updatedComments = comments.map((comment) => {
        if (comment.id === parentId) {
          const updatedReplies = comment.replies?.map((reply) => {
            if (reply.id === commentId) {
              return { ...reply, likes: reply.likes + 1 }
            }
            return reply
          })
          return { ...comment, replies: updatedReplies }
        }
        return comment
      })
      setComments(updatedComments)
    } else {
      const updatedComments = comments.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, likes: comment.likes + 1 }
        }
        return comment
      })
      setComments(updatedComments)
    }
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
            <MessageSquare size={20} className="mr-2" /> Discussion
          </h2>
          <span className="text-sm text-slate-500 dark:text-slate-400">{comments.length} comments</span>
        </div>
      </div>

      <div className="p-6 border-b border-blue-100 dark:border-blue-900">
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
            <User size={20} className="text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-grow">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts or insights on this case..."
              className="w-full p-3 rounded-lg border border-blue-200 dark:border-blue-800 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 min-h-[100px]"
            />
            <div className="mt-3 flex justify-end">
              <Button
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Post Comment
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="divide-y divide-blue-100 dark:divide-blue-900">
        {comments.map((comment, index) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="p-6"
          >
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <img
                  src={comment.author.avatar || "/placeholder.svg"}
                  alt={comment.author.name}
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-slate-800 dark:text-slate-200">{comment.author.name}</h4>
                  {comment.author.isExpert && (
                    <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300">
                      Expert
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {comment.author.role} • {comment.timestamp}
                </p>
                <div className="mt-3 text-slate-700 dark:text-slate-300">{comment.content}</div>
                <div className="mt-3 flex items-center gap-4">
                  <button
                    onClick={() => handleLike(comment.id)}
                    className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <ThumbsUp size={16} /> {comment.likes}
                  </button>
                  <button className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <ThumbsDown size={16} /> {comment.dislikes}
                  </button>
                  <button
                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    Reply
                  </button>
                </div>

                {replyingTo === comment.id && (
                  <div className="mt-4">
                    <textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Write your reply..."
                      className="w-full p-3 rounded-lg border border-blue-200 dark:border-blue-800 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 min-h-[80px]"
                    />
                    <div className="mt-2 flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setReplyingTo(null)}
                        className="border-blue-200 dark:border-blue-800"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => handleAddReply(comment.id)}
                        disabled={!replyContent.trim()}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Post Reply
                      </Button>
                    </div>
                  </div>
                )}

                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-4 space-y-4 pl-4 border-l-2 border-blue-100 dark:border-blue-900">
                    {comment.replies.map((reply, replyIndex) => (
                      <motion.div
                        key={reply.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: replyIndex * 0.1 }}
                        className="flex gap-3"
                      >
                        <div className="flex-shrink-0">
                          <img
                            src={reply.author.avatar || "/placeholder.svg"}
                            alt={reply.author.name}
                            className="w-8 h-8 rounded-full"
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center gap-2">
                            <h5 className="font-medium text-sm text-slate-800 dark:text-slate-200">
                              {reply.author.name}
                            </h5>
                            {reply.author.isExpert && (
                              <span className="px-1.5 py-0.5 text-xs font-medium rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300">
                                Expert
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {reply.author.role} • {reply.timestamp}
                          </p>
                          <div className="mt-2 text-sm text-slate-700 dark:text-slate-300">{reply.content}</div>
                          <div className="mt-2 flex items-center gap-4">
                            <button
                              onClick={() => handleLike(reply.id, true, comment.id)}
                              className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                              <ThumbsUp size={14} /> {reply.likes}
                            </button>
                            <button className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                              <ThumbsDown size={14} /> {reply.dislikes}
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

