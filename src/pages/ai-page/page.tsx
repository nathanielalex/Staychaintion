"use client"

import { motion } from "framer-motion"
import AIHero from "@/components/ai-features/ai-hero"
import FeaturesGrid from "@/components/ai-features/features-grid"
import AIDemo from "@/components/ai-features/ai-demo"
import BenefitsSlider from "@/components/ai-features/benefits-slider"
import AICTA from "@/components/ai-features/ai-cta"

export default function AIFeaturesPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <AIHero />
      <FeaturesGrid />
      <AIDemo />
      <BenefitsSlider />
      {/* <AICTA /> */}
    </motion.div>
  )
}

