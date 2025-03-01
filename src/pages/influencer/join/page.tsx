"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, Users, TrendingUp, DollarSign } from "lucide-react"

export default function JoinProgramPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const benefits = [
    { icon: Users, title: "Expand Your Reach", description: "Connect with our vast network of travelers" },
    { icon: TrendingUp, title: "Boost Your Income", description: "Earn competitive commissions on bookings" },
    { icon: DollarSign, title: "Exclusive Perks", description: "Get access to special promotions and events" },
  ]

  return (
    <div className="min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-center text-blue-600 mb-8">
          Join Our Influencer & Affiliate Program
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-semibold mb-6">Why Join Us?</h2>
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="bg-blue-100 rounded-full p-2">
                    <benefit.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img
              src="/images/marketing/img8.png"
              alt="Influencer Program"
              width={600}
              height={400}
              className="rounded-lg object-cover"
            />
          </motion.div>
        </div>

        <Card className="max-w-2xl mx-auto p-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">Apply to Join</h2>
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Application Submitted!</h3>
              <p className="text-gray-600">
                Thank you for your interest. We'll review your application and get back to you soon.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <Input id="name" name="name" required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                  Website or Social Media URL
                </label>
                <Input id="website" name="website" type="url" required />
              </div>
              <div>
                <label htmlFor="followers" className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Followers
                </label>
                <Select name="followers" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select follower range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1000-5000">1,000 - 5,000</SelectItem>
                    <SelectItem value="5000-20000">5,000 - 20,000</SelectItem>
                    <SelectItem value="20000-100000">20,000 - 100,000</SelectItem>
                    <SelectItem value="100000+">100,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Why do you want to join our program?
                </label>
                <Textarea id="message" name="message" rows={4} required />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          )}
        </Card>
      </motion.div>
    </div>
  )
}

