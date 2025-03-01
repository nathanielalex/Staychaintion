"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, TrendingUp, Users, DollarSign } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const caseStudies = [
  {
    id: 1,
    title: "Boutique Hotel Boosts Bookings by 200%",
    client: "Serenity Suites, Bali",
    challenge:
      "Serenity Suites, a boutique hotel in Bali, was struggling with low occupancy rates and limited online visibility.",
    solution:
      "We implemented a comprehensive digital marketing strategy, including website optimization, targeted social media campaigns, and partnerships with local influencers.",
    results: {
      bookingIncrease: 200,
      revenueGrowth: 180,
      socialMediaFollowers: 50000,
    },
    testimonial: {
      quote:
        "The results we've seen since partnering with Staychaintion have been nothing short of remarkable. Our bookings have skyrocketed, and we're now consistently at full capacity.",
      author: "Maria Chen, General Manager",
    },
    image: "/images/marketing/img1.png",
    chartData: [
      { month: "Jan", bookings: 50 },
      { month: "Feb", bookings: 80 },
      { month: "Mar", bookings: 120 },
      { month: "Apr", bookings: 180 },
      { month: "May", bookings: 220 },
      { month: "Jun", bookings: 280 },
    ],
  },
  // Add more case studies here...
]

export default function CaseStudyPage() {
  
  const caseStudy = caseStudies[0]

  if (!caseStudy) {
    return <div>Case study not found</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-12"
      >
        <a href="/marketing">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Marketing & Growth
          </Button>
        </a>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">{caseStudy.title}</h1>
          <p className="text-xl text-gray-600 mb-8">Client: {caseStudy.client}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <img
              src={caseStudy.image || "/placeholder.svg"}
              alt={caseStudy.title}
              width={600}
              height={400}
              className="rounded-lg object-cover w-full h-64 md:h-auto"
            />
            <Card className="p-6 bg-white shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Key Results</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col items-center">
                  <TrendingUp className="w-8 h-8 text-blue-500 mb-2" />
                  <p className="text-3xl font-bold text-blue-600">{caseStudy.results.bookingIncrease}%</p>
                  <p className="text-sm text-gray-600">Booking Increase</p>
                </div>
                <div className="flex flex-col items-center">
                  <DollarSign className="w-8 h-8 text-green-500 mb-2" />
                  <p className="text-3xl font-bold text-green-600">{caseStudy.results.revenueGrowth}%</p>
                  <p className="text-sm text-gray-600">Revenue Growth</p>
                </div>
                <div className="flex flex-col items-center">
                  <Users className="w-8 h-8 text-purple-500 mb-2" />
                  <p className="text-3xl font-bold text-purple-600">
                    {caseStudy.results.socialMediaFollowers.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">New Followers</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-2xl font-semibold mb-4">The Challenge</h2>
              <p className="text-gray-600">{caseStudy.challenge}</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Our Solution</h2>
              <p className="text-gray-600">{caseStudy.solution}</p>
            </div>
          </div>

          <Card className="p-6 bg-white shadow-lg mb-12">
            <h2 className="text-2xl font-semibold mb-4">Booking Growth Over Time</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={caseStudy.chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="bookings" stroke="#3B82F6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6 bg-blue-50 mb-12">
            <h2 className="text-2xl font-semibold mb-4">Client Testimonial</h2>
            <blockquote className="text-lg text-gray-700 italic mb-4">"{caseStudy.testimonial.quote}"</blockquote>
            <p className="text-right text-gray-600">- {caseStudy.testimonial.author}</p>
          </Card>

          <div className="text-center">
            <a href="/contact">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                Work With Us
              </Button>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

