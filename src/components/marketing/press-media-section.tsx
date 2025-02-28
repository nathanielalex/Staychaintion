"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

const pressItems = [
  {
    logo: "/images/marketing/img7.png",
    name: "TechCrunch",
    title: "Staychaintion Revolutionizes Vacation Rentals",
    link: "#",
  },
  {
    logo: "/images/marketing/img5.png",
    name: "Forbes",
    title: "The Future of Travel: Staychaintion's Innovative Approach",
    link: "#",
  },
  {
    logo: "/images/marketing/img4.png",
    name: "The New York Times",
    title: "How Staychaintion is Changing the Hospitality Landscape",
    link: "#",
  },
  {
    logo: "/images/marketing/img6.png",
    name: "Wall Street Journal",
    title: "Staychaintion Secures $50M in Series B Funding",
    link: "#",
  },
]

export default function PressMediaSection() {
  return (
    <section className="mb-20">
      <h2 className="text-3xl font-semibold text-blue-800 mb-8">Press & Media</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pressItems.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <a href={item.link} className="flex items-center space-x-4">
                <img
                  src={item.logo || "/placeholder.svg"}
                  alt={item.name}
                  width={120}
                  height={60}
                  className="object-contain"
                />
                <div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.name}</p>
                </div>
              </a>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

