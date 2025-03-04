"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { X, Upload } from "lucide-react"
import { Property_backend } from "@/declarations/Property_backend"
import { Property } from "@/declarations/Property_backend/Property_backend.did"
import { UnregisteredProperty } from "@/declarations/Property_backend/Property_backend.did"

interface PropertyFormProps {
  property: Property
  setProperties: React.Dispatch<React.SetStateAction<Property[]>>;
  onClose: () => void
}

export default function PropertyForm({ property, onClose, setProperties }: PropertyFormProps) {
  const [formData, setFormData] = useState({
    name: property.name,
    type: property.buildingType,
    price: property.pricePerNight,
    location: property.location,
    bedrooms: property.bedroomCount,
    bathrooms: property.bathroomCount,
    guests: property.guestCapacity,
    beds: property.bedCount,
    description: property.description,
    builtInDate: property.builtInDate, 
  })
  const [images, setImages] = useState<string[]>([])
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value // Dynamically update the corresponding field in formData
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // Prevent page refresh on form submit

    // Create the property data object from form state
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
      buildingType: formData.type,
      location: formData.location,
      coverPicture: images[0]
    }

    try {
      const result = await Property_backend.updateProperty(propertyData);
      setProperties(prevProperties => 
        prevProperties.map(property => 
          property.id === propertyData.id ? { ...property, ...propertyData } : property
        )
      );
    } catch (err) {
      setError('An error occurred while fetching contacts');
    } finally {
      setLoading(false);
    }

    onClose()
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

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">{property ? "Edit Property" : "Add New Property"}</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Property Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Property Name</Label>
            <Input id="name" placeholder="Enter property name" defaultValue={property.name} />
          </div>

          {/* Property Type */}
          <div className="space-y-2">
            <Label htmlFor="type">Property Type</Label>
            <Select defaultValue={property.buildingType}>
              <SelectTrigger>
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="condo">Condo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label htmlFor="price">Price per night</Label>
            <Input id="price" type="number" placeholder="Enter price" defaultValue={property.pricePerNight.toString()} />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" placeholder="Enter location" defaultValue={property.location} />
          </div>

          {/* Bedrooms */}
          <div className="space-y-2">
            <Label htmlFor="bedrooms">Bedrooms</Label>
            <Input id="bedrooms" type="number" placeholder="Number of bedrooms" defaultValue={property.bedroomCount.toString()} />
          </div>

          {/* Bathrooms */}
          <div className="space-y-2">
            <Label htmlFor="bathrooms">Bathrooms</Label>
            <Input id="bathrooms" type="number" placeholder="Number of bathrooms" defaultValue={property.bathroomCount.toString()} />
          </div>

          {/* Guests */}
          <div className="space-y-2">
            <Label htmlFor="guests">Guest Capacity</Label>
            <Input id="guests" type="number" placeholder="Maximum number of guests" defaultValue={property.guestCapacity.toString()} />
          </div>

          {/* Beds */}
          <div className="space-y-2">
            <Label htmlFor="beds">Beds</Label>
            <Input id="beds" type="number" placeholder="Number of beds" defaultValue={property.bedCount.toString()} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Built-in Date</Label>
            <Input id="date" type="date" placeholder="Built-in Date" defaultValue={property.builtInDate} />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Enter property description"
            defaultValue={property.description}
            className="h-32"
          />
        </div>

        {/* Image Upload */}
        <div className="space-y-4">
          <Label>Property Images</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Property ${index + 1}`}
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
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            {property ? "Update Property" : "Add Property"}
          </Button>
        </div>
      </form>
    </Card>
  )
}

