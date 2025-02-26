"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sparkles, Send, CheckCircle2, XCircle } from "lucide-react"

export default function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    // Simulate API call
    setTimeout(() => {
      if (email.includes("@")) {
        setStatus("success")
        setMessage("Welcome to our community! 🎉")
      } else {
        setStatus("error")
        setMessage("Please enter a valid email address")
      }
    }, 1000)
  }

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-blue-50" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl" />
      </div>

      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-grid-blue/[0.02] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm">
              <span className="text-blue-600 font-medium">Join Our Community</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Stay Updated with <span className="text-blue-600">Research Innovation</span>
            </h2>
            <p className="text-gray-600 text-lg md:text-xl max-w-lg">
              Join our community of researchers and AI enthusiasts. Get exclusive updates, research insights, and early
              access to new features.
            </p>

            {/* Benefits List */}
            <div className="space-y-4 pt-4">
              {[
                "Weekly research digests",
                "Early access to new features",
                "Exclusive webinars and tutorials",
                "Community discussions",
              ].map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-600">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Signup Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="bg-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-50 rounded-full translate-y-1/2 -translate-x-1/2" />

              <form onSubmit={handleSubmit} className="relative space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold text-gray-900">Join the Community</h3>
                  <p className="text-gray-600">Be part of the future of research and AI.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      disabled={status === "loading" || status === "success"}
                    />
                  </div>

                  <Button
                    type="submit"
                    className={`w-full bg-blue-600 hover:bg-blue-700 text-white h-12 transition-all ${
                      status === "loading" ? "opacity-80 cursor-wait" : ""
                    } ${status === "success" ? "bg-green-600 hover:bg-green-700" : ""}`}
                    disabled={status === "loading" || status === "success"}
                  >
                    {status === "loading" ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin" />
                        <span>Joining...</span>
                      </div>
                    ) : status === "success" ? (
                      <div className="flex items-center justify-center space-x-2">
                        <CheckCircle2 className="w-5 h-5" />
                        <span>Joined Successfully</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <Send className="w-5 h-5" />
                        <span>Join Now</span>
                      </div>
                    )}
                  </Button>
                </div>

                {/* Status Message */}
                {message && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-center space-x-2 ${status === "error" ? "text-red-600" : "text-green-600"}`}
                  >
                    {status === "error" ? <XCircle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                    <span>{message}</span>
                  </motion.div>
                )}

                <p className="text-sm text-gray-500 text-center">
                  By joining, you agree to our{" "}
                  <a href="/terms" className="text-blue-600 hover:text-blue-700">
                    Terms
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="text-blue-600 hover:text-blue-700">
                    Privacy Policy
                  </a>
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

