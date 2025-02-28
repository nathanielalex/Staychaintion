"use client"

import { motion } from "framer-motion"

import PromotionsSection from "@/components/marketing/promotions"
import InfluencerSection from "@/components/marketing/influencer-section"
import CaseStudiesSection from "@/components/marketing/case-studies-section"
import PressMediaSection from "@/components/marketing/press-media-section"
import BlogSection from "@/components/marketing/blog-section"

export default function MarketingGrowthPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-center text-blue-600 mb-12">Marketing & Growth</h1>

        <PromotionsSection />
        <InfluencerSection />
        <CaseStudiesSection />
        <PressMediaSection />
        <BlogSection/>
      </motion.div>
    </div>
  )
}

