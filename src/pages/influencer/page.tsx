"use client"

import { motion } from "framer-motion"
import HeroSection from "@/components/influencer/hero-section"
import BenefitsSection from "@/components/influencer/benefits-section"
import ProgramTiersSection from "@/components/influencer/program-tiers-section"
import TestimonialSection from "@/components/influencer/testimonial-section"
import ApplicationForm from "@/components/influencer/application-form"

export default function InfluencerAffiliatePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <HeroSection />
        <BenefitsSection />
        <ProgramTiersSection />
        <TestimonialSection />
        <ApplicationForm />
      </motion.div>
    </div>
  )
}

