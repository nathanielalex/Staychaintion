"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info, Loader2 } from "lucide-react"

// Sample data - replace with your actual data
const neighbourhoodGroups = ["Brooklyn", "Manhattan", "Queens", "Staten Island", "Bronx"]
const roomTypes = ["Private Room", "Entire home/apt", "Shared room"]

interface PredictionFormData {
  neighbourhood_group: string
  neighbourhood: string
  room_type: string
  latitude: number
  longitude: number
  minimum_nights: number
  number_of_reviews: number
  reviews_per_month: number
  calculated_host_listings_count: number
  availability_365: number
}

export default function PredictPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [predictedPrice, setPredictedPrice] = useState<number | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setPredictedPrice(150) // Replace with actual prediction
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-2xl mx-auto p-6 sm:p-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Predict Property Price</h1>
            <p className="mt-2 text-sm text-gray-600">
              Fill in the property details below to get an estimated price prediction.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Location Information */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Location Details</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="neighbourhood_group">Neighbourhood Group</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select area" />
                    </SelectTrigger>
                    <SelectContent>
                      {neighbourhoodGroups.map((group) => (
                        <SelectItem key={group} value={group.toLowerCase()}>
                          {group}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="room_type">Room Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {roomTypes.map((type) => (
                        <SelectItem key={type} value={type.toLowerCase()}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="latitude">Latitude</Label>
                  <Input id="latitude" type="number" step="any" placeholder="40.64749" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="longitude">Longitude</Label>
                  <Input id="longitude" type="number" step="any" placeholder="-73.97237" required />
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Property Details</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="minimum_nights">Minimum Nights</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Minimum number of nights required to book</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input id="minimum_nights" type="number" min="1" placeholder="1" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="availability_365">Availability (days/year)</Label>
                  <Input id="availability_365" type="number" min="0" max="365" placeholder="365" required />
                </div>
              </div>
            </div>

            {/* Review Information */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Review Information</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="number_of_reviews">Number of Reviews</Label>
                  <Input id="number_of_reviews" type="number" min="0" placeholder="0" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reviews_per_month">Reviews per Month</Label>
                  <Input id="reviews_per_month" type="number" step="0.01" min="0" placeholder="0.00" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="calculated_host_listings_count">Host Listings Count</Label>
                <Input id="calculated_host_listings_count" type="number" min="1" placeholder="1" required />
              </div>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Calculating...
                </>
              ) : (
                "Predict Price"
              )}
            </Button>
          </form>

          {predictedPrice !== null && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900">Predicted Price</h3>
              <p className="text-3xl font-bold text-blue-600">${predictedPrice.toFixed(2)}</p>
              <p className="text-sm text-gray-600 mt-1">
                This is an estimated price based on the provided information.
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

