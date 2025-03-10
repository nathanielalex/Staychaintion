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
import { useAuth } from "@/utility/use-auth-client"

interface PropertyFormProps {
  property: Property
  setProperties: React.Dispatch<React.SetStateAction<Property[]>>;
  onClose: () => void
  isUpdating: boolean;
}

export default function PropertyForm({ property, onClose, setProperties, isUpdating }: PropertyFormProps) {
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
  const [images, setImages] = useState<string[]>(property.pictures || [])
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const { principal } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value // Dynamically update the corresponding field in formData
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // Prevent page refresh on form submit
    console.log('submit form')

    if(isUpdating) {
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
      try {
        setLoading(true);
        const result = await Property_backend.updateProperty(propertyData);
  
        // If the update is successful, update the state with the new property
        setProperties(prevProperties => 
          prevProperties.map(property => 
            property.id === propertyData.id ? { ...property, ...propertyData } : property
          )
        );
        console.log(property);
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false);
      }
      onClose()
    } else if(!isUpdating) {
      const unregisteredProperty: UnregisteredProperty = {
        status: "available",
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
        coverPicture: images[0]
      }
      try {
        setLoading(true);
        const result = await Property_backend.registerProperty(unregisteredProperty);
        if(principal != null) {
          const newProperty: Property = {
            id: result,
            rating: 0,
            status: "available",
            bedCount: formData.beds,
            owner: principal,
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
            reviewCount: 0n
          }
          setProperties(prevProperties => 
            [...prevProperties, newProperty]
          );
        }
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false);
      }
      onClose()
    }

    // Create the property data object from form state
    // const propertyData: Property = {
    //   id: property.id,
    //   rating: property.rating,
    //   status: property.status,
    //   bedCount: formData.beds,
    //   owner: property.owner,
    //   pricePerNight: formData.price,
    //   name: formData.name,
    //   bedroomCount: formData.bedrooms,
    //   bathroomCount: formData.bathrooms,
    //   description: formData.description,
    //   builtInDate: formData.builtInDate,
    //   guestCapacity: formData.guests,
    //   pictures: images,
    //   propertyType: formData.type,
    //   location: formData.location,
    //   coverPicture: images[0] || "/placeholder.jpg",
    //   reviewCount: property.reviewCount
    // }

    // try {
    //   setLoading(true);
    //   const result = await Property_backend.updateProperty(propertyData);

    //   // If the update is successful, update the state with the new property
    //   setProperties(prevProperties => 
    //     prevProperties.map(property => 
    //       property.id === propertyData.id ? { ...property, ...propertyData } : property
    //     )
    //   );
    //   console.log(property);
    // } catch (err) {
    //   console.log(err)
    //   setError('An error occurred while updating the property');
    // } finally {
    //   setLoading(false);
    // }

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
        <h2 className="text-2xl font-semibold">{isUpdating ? "Edit Property" : "Add New Property"}</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Property Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Property Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter property name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* Property Type */}
          <div className="space-y-2">
            <Label htmlFor="type">Property Type</Label>
            <Select name="type" value={formData.type} onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}>
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
            <Input
              id="price"
              name="price"
              type="number"
              placeholder="Enter price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              placeholder="Enter location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          {/* Bedrooms */}
          <div className="space-y-2">
            <Label htmlFor="bedrooms">Bedrooms</Label>
            <Input
              id="bedrooms"
              name="bedrooms"
              type="number"
              placeholder="Number of bedrooms"
              value={formData.bedrooms.toString()}
              onChange={handleChange}
            />
          </div>

          {/* Bathrooms */}
          <div className="space-y-2">
            <Label htmlFor="bathrooms">Bathrooms</Label>
            <Input
              id="bathrooms"
              name="bathrooms"
              type="number"
              placeholder="Number of bathrooms"
              value={formData.bathrooms.toString()}
              onChange={handleChange}
            />
          </div>

          {/* Guests */}
          <div className="space-y-2">
            <Label htmlFor="guests">Guest Capacity</Label>
            <Input
              id="guests"
              name="guests"
              type="number"
              placeholder="Maximum number of guests"
              value={formData.guests.toString()}
              onChange={handleChange}
            />
          </div>

          {/* Beds */}
          <div className="space-y-2">
            <Label htmlFor="beds">Beds</Label>
            <Input
              id="beds"
              name="beds"
              type="number"
              placeholder="Number of beds"
              value={formData.beds.toString()}
              onChange={handleChange}
            />
          </div>

          {/* Built-in Date */}
          <div className="space-y-2">
            <Label htmlFor="date">Built-in Date</Label>
            <Input
              id="date"
              name="builtInDate"
              type="date"
              value={formData.builtInDate}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Enter property description"
            value={formData.description}
            onChange={handleChange}
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
            {isUpdating ? "Update Property" : "Add Property"}
          </Button>
        </div>
      </form>
    </Card>
  )
}
