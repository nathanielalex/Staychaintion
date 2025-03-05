"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Pencil, Trash2 } from "lucide-react"
import PropertyForm from "@/components/admin/properties/property-form"
import { Property } from "@/declarations/Property_backend/Property_backend.did"
import { Property_backend } from "@/declarations/Property_backend"

/*
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
*/

export default function PropertiesPage() {
  const [showForm, setShowForm] = useState(false)
  const [editingProperty, setEditingProperty] = useState<any>(null)
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchProperties = async () => {
    try {
      // setLoading(true);
      // setError(null);
      // const actor = getChatActor();
      const result = await Property_backend.getAllProperties();
      setProperties(result);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
    
  useEffect(() => {
    fetchProperties();
  }, []);

  const handleEdit = async(property: Property) => {
    setEditingProperty(property)
    setShowForm(true)
  }

  const handleDelete = async (property: Property) => {
    try {
      const result = await Property_backend.removeProperty(property);
      setProperties(prevProperties => 
        prevProperties.filter(item => item.id !== property.id)
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
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
          <PropertyForm property={editingProperty} onClose={() => setShowForm(false)} setProperties={setProperties}/>
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
                  <TableCell>{property.propertyType}</TableCell>
                  <TableCell>${property.pricePerNight.toString()}</TableCell>
                  <TableCell>{property.location}</TableCell>
                  <TableCell>{property.bedroomCount.toString()}</TableCell>
                  <TableCell>{property.bathroomCount.toString()}</TableCell>
                  <TableCell>{property.guestCapacity.toString()}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(property)}>
                        <Pencil className="w-4 h-4 text-blue-600" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(property)}>
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

