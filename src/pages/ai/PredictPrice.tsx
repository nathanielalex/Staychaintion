"use client"

import { ChangeEvent, useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { motion } from "framer-motion"

// Room types used in the model
const roomTypes = ["Private Room", "Entire home/apt", "Shared room"]

export default function PredictPage() {
  const [formData, setFormData] = useState({
    latitude: "",
    longitude: "",
    minimum_nights: "",
    room_type: ""
  })
  
  const [isLoading, setIsLoading] = useState(false)
  const [predictedPrice, setPredictedPrice] = useState<number | null>(null)

  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Handle select change
  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  // Handle form submit
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setPredictedPrice(null)

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          latitude: parseFloat(formData.latitude),
          longitude: parseFloat(formData.longitude),
          minimum_nights: parseInt(formData.minimum_nights),
          room_type: formData.room_type
        })
      })

      const data = await response.json()

      if (response.ok) {
        setPredictedPrice(data.predicted_price)
      } else {
        console.error("Prediction failed:", data.detail)
        setPredictedPrice(null)
      }
    } catch (error) {
      console.error("Error calling API:", error)
    }

    setIsLoading(false)
  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">

      <Card className="max-w-2xl mx-auto p-6 sm:p-8 z-20">
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
                  <Label htmlFor="latitude">Latitude</Label>
                  <Input 
                    id="latitude" 
                    name="latitude" 
                    type="number" 
                    step="any" 
                    placeholder="40.64749" 
                    value={formData.latitude}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="longitude">Longitude</Label>
                  <Input 
                    id="longitude" 
                    name="longitude" 
                    type="number" 
                    step="any" 
                    placeholder="-73.97237" 
                    value={formData.longitude}
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Property Details</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="room_type">Room Type</Label>
                  <Select 
                    value={formData.room_type} 
                    onValueChange={(value) => handleSelectChange("room_type", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {roomTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="minimum_nights">Minimum Nights</Label>
                  <Input 
                    id="minimum_nights" 
                    name="minimum_nights" 
                    type="number" 
                    min="1" 
                    placeholder="1" 
                    value={formData.minimum_nights}
                    onChange={handleChange}
                    required 
                  />
                </div>
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

          {/* {predictedPrice === null && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-semibold text-red-400">Predicted Price Error</h3>
              <p className="text-sm text-gray-600 mt-1">
                The Backend API is not started
              </p>
            </div>
          )} */}

        </div>
      </Card>

      {/* <div className="absolute inset-0 pointer-events-none z-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-500/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </div> */}

    </div>
  )
}
