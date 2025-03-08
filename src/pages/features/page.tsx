import FeaturesHero from "@/components/features/features-hero"
import FeaturesGrid from "@/components/features/features-grid"
import FeaturesCategories from "@/components/features/features-categories"
import PopularFeatures from "@/components/features/popular-features"
import FeaturesFooter from "@/components/features/features-footer"
import FeaturesSearch from "@/components/features/features-search"

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <FeaturesHero />
      <FeaturesSearch />
      <PopularFeatures />
      <FeaturesCategories />
      <FeaturesGrid />
      <FeaturesFooter />
    </main>
  )
}

