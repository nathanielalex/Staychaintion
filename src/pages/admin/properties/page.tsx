"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Pencil, Trash2 } from "lucide-react"
import PropertyForm from "@/components/admin/properties/property-form"

// Sample data
const properties = [
  {
    id: 1,
    name: "Luxury Beach Villa",
    type: "Villa",
    price: 1200,
    location: "Miami, FL",
    bedrooms: 4,
    bathrooms: 3,
    guests: 8,
  },
  {
    id: 2,
    name: "City Center Apartment",
    type: "Apartment",
    price: 800,
    location: "New York, NY",
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
  },
  // Add more sample properties
]

export default function PropertiesPage() {
  const [showForm, setShowForm] = useState(false)
  const [editingProperty, setEditingProperty] = useState<any>(null)

  const handleEdit = (property: any) => {
    setEditingProperty(property)
    setShowForm(true)
  }

  const handleDelete = (id: number) => {
    // Implement delete functionality
    console.log("Delete property:", id)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Properties</h1>
        <Button
          onClick={() => {
            setEditingProperty(null)
            setShowForm(true)
          }}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Property
        </Button>
      </div>

      {showForm ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
          <PropertyForm property={editingProperty} onClose={() => setShowForm(false)} />
        </motion.div>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Bedrooms</TableHead>
                <TableHead>Bathrooms</TableHead>
                <TableHead>Guests</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell className="font-medium">{property.name}</TableCell>
                  <TableCell>{property.type}</TableCell>
                  <TableCell>${property.price}</TableCell>
                  <TableCell>{property.location}</TableCell>
                  <TableCell>{property.bedrooms}</TableCell>
                  <TableCell>{property.bathrooms}</TableCell>
                  <TableCell>{property.guests}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(property)}>
                        <Pencil className="w-4 h-4 text-blue-600" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(property.id)}>
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  )
}

