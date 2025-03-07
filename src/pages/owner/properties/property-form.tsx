"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Loader2, X, Upload } from "lucide-react"

import { Property_backend } from "@/declarations/Property_backend"
import { Property } from "@/declarations/Property_backend/Property_backend.did"
import { UnregisteredProperty } from "@/declarations/Property_backend/Property_backend.did"

interface PropertyFormProps {
  property: Property;
  setProperties: React.Dispatch<React.SetStateAction<Property[]>>;
  onClose: () => void
}


export default function PropertyForm({ property, onClose, setProperties }: PropertyFormProps) {
  const [formData, setFormData] = useState({
      name: property.name,
      type: property.propertyType,
      price: property.pricePerNight,
      location: property.location,
      latitude: property.latitude,
      longitude: property.longitude,
      bedrooms: property.bedroomCount,
      bathrooms: property.bathroomCount,
      guests: property.guestCapacity,
      beds: property.bedCount,
      description: property.description,
      builtInDate: property.builtInDate, 
    })
  
  const [images, setImages] = useState<string[]>(property?.pictures || [])
  const [isLoading, setIsLoading] = useState(false)
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
      setImages((prev) => [...prev, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    const propertyData: Property = {
      id: property.id,
      rating: property.rating,
      status: property.status,
      bedCount: formData.beds,
      owner: property.owner,
      pricePerNight: formData.price,
      name: formData.name,
      bedroomCount: formData.bedrooms,
      bathroomCount: formData.bathrooms,
      description: formData.description,
      builtInDate: formData.builtInDate,
      guestCapacity: formData.guests,
      pictures: images,
      propertyType: formData.type,
      location: formData.location,
      latitude: formData.latitude,
      longitude: formData.longitude,
      coverPicture: images[0],
      reviewCount: property.reviewCount
    }
    
    setIsLoading(false)
    onClose()
  }

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">{property ? "Edit Property" : "Add New Property"}</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Property Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Property Name</Label>
            <Input id="name" placeholder="Enter property name" defaultValue={property?.name} required />
          </div>

          {/* Property Type */}
          <div className="space-y-2">
            <Label htmlFor="type">Property Type</Label>
            <Select defaultValue={property.propertyType}>
              <SelectTrigger>
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="cabin">Cabin</SelectItem>
                <SelectItem value="cottage">Cottage</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label htmlFor="price">Price per night</Label>
            <Input id="price" type="number" placeholder="Enter price" defaultValue={property.pricePerNight} required />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" placeholder="Enter location" defaultValue={property?.location} required />
          </div>

          {/* Bedrooms */}
          <div className="space-y-2">
            <Label htmlFor="bedrooms">Bedrooms</Label>
            <Input
              id="bedrooms"
              type="number"
              placeholder="Number of bedrooms"
              defaultValue={property.bedroomCount.toString()}
              required
            />
          </div>

          {/* Bathrooms */}
          <div className="space-y-2">
            <Label htmlFor="bathrooms">Bathrooms</Label>
            <Input
              id="bathrooms"
              type="number"
              placeholder="Number of bathrooms"
              defaultValue={property.bathroomCount.toString()}
              required
            />
          </div>

          {/* Guests */}
          <div className="space-y-2">
            <Label htmlFor="guests">Guest Capacity</Label>
            <Input
              id="guests"
              type="number"
              placeholder="Maximum number of guests"
              defaultValue={property.guestCapacity.toString()}
              required
            />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select defaultValue={property?.status || "active"}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Enter property description"
            defaultValue={property?.description}
            className="h-32"
            required
          />
        </div>

        {/* Amenities */}
        {/* <div className="space-y-4">
          <Label>Amenities</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {["WiFi", "Air Conditioning", "Kitchen", "TV", "Pool", "Parking"].map((amenity) => (
              <div key={amenity} className="flex items-center space-x-2">
                <Switch id={`amenity-${amenity}`} defaultChecked={property?.amenities?.includes(amenity)} />
                <Label htmlFor={`amenity-${amenity}`}>{amenity}</Label>
              </div>
            ))}
          </div>
        </div> */}

        {/* Image Upload */}
        <div className="space-y-4">
          <Label>Property Images</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Property ${index + 1}`}
                  width={150}
                  height={100}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            <label className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors">
              <Upload className="w-6 h-6 text-gray-400" />
              <span className="mt-2 text-sm text-gray-500">Upload Images</span>
              <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              `${property ? "Update" : "Add"} Property`
            )}
          </Button>
        </div>
      </form>
    </Card>
  )
}

