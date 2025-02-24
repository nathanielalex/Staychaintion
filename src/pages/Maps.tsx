"use client"

import { useState } from "react"
import MapView from "@/components/maps/map-view"
import ListingCard from "@/components/maps//listing-card"
import CategoryFilter from "@/components/maps//category-filter"

const sampleListings = [
  {
    id: 1,
    image: "/images/mascot.webp?height=300&width=300",
    title: "Beachfront Villa",
    location: "Bali, Indonesia",
    price: "Rp2,510,640",
    rating: 4.92,
    dates: "Mar 1-6",
    isFavorite: false,
  },
  // Add more listings as needed
]

export default function Maps() {
  const [showMap, setShowMap] = useState(true)

  return (
    <div className="h-screen flex flex-col">
      <CategoryFilter />

      <div className="flex-1 flex">
        {/* Listings Grid */}
        <div className={`${showMap ? "w-1/2" : "w-full"} overflow-auto p-4`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sampleListings.map((listing) => (
              <ListingCard key={listing.id} {...listing} />
            ))}
          </div>
        </div>

        {/* Map View */}
        {showMap && (
          <div className="w-1/2 relative">
            <MapView />
          </div>
        )}
      </div>

      {/* Map Toggle Button */}
      <button
        onClick={() => setShowMap(!showMap)}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded-full shadow-lg z-10"
      >
        {showMap ? "Show list" : "Show map"}
      </button>
    </div>
  )
}

