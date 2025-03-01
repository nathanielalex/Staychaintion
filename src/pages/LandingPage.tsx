import Hero from "@/components/landing/hero"
import Navbar from "@/components/navbar"
import { SparklesCore } from "@/components/landing/sparkles"
import Features from "@/components/landing/features"
import MarqueeSection from "@/components/landing/marquee-section"
import TeamSection from "@/components/landing/team-section"
import TestimonySection from "@/components/landing/testimony-section"
import FAQSection from "@/components/landing/faq-section"
import NewsletterSection from "@/components/landing/newsletter-section"


export default function Home() {
  return (
    <main className="min-h-screen bg-white antialiased bg-grid-blue/[0.02] relative overflow-hidden">
      {/* Ambient background with moving particles */}
      <div className="h-full w-full absolute inset-0 z-0">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={50}
          className="w-full h-full"
          particleColor="blue"
        />
      </div>

      <div className="relative z-10">
        {/* <Navbar /> */}
        <Hero />
        <Features />
        <MarqueeSection/>
        <TeamSection/>
        <TestimonySection/>
        <FAQSection/>
        <NewsletterSection/>
      </div>
      
    </main>
  )
}

