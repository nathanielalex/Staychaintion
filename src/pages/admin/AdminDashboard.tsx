"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { Card, Title, Text, Tab, TabList, TabGroup, TabPanel, TabPanels, BarChart, DonutChart } from "@tremor/react"
import { FiEdit2, FiTrash2 } from "react-icons/fi"
import toast, { Toaster } from "react-hot-toast"
import { format } from "date-fns"

interface Property {
  id: number
  name: string
  type: string
  price: number
  location: string
  createdAt: string
}

const propertyTypes = ["Apartment", "House", "Condo", "Townhouse", "Land"]

const AdminDashboard: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([])
  const [editingProperty, setEditingProperty] = useState<Property | null>(null)
  const { register, handleSubmit, reset, setValue } = useForm<Property>()

  useEffect(() => {
    // Simulating API call to fetch properties
    const fetchProperties = async () => {
      // Replace this with actual API call
      const mockProperties: Property[] = [
        {
          id: 1,
          name: "Sunset Apartments",
          type: "Apartment",
          price: 250000,
          location: "New York",
          createdAt: "2023-05-01",
        },
        {
          id: 2,
          name: "Greenview House",
          type: "House",
          price: 450000,
          location: "Los Angeles",
          createdAt: "2023-05-05",
        },
        { id: 3, name: "Downtown Condo", type: "Condo", price: 350000, location: "Chicago", createdAt: "2023-05-10" },
      ]
      setProperties(mockProperties)
    }

    fetchProperties()
  }, [])

  const onSubmit: SubmitHandler<Property> = (data) => {

    if (editingProperty) {
      // Update existing property
      const updatedProperties = properties.map((p) =>
        p.id === editingProperty.id ? { ...data, id: p.id, createdAt: p.createdAt } : p,
      )
      setProperties(updatedProperties)
      toast.success("Property updated successfully")
    } else {
      // Add new property
      const newProperty = {
        ...data,
        id: properties.length + 1,
        createdAt: format(new Date(), "yyyy-MM-dd"),
      }
      setProperties([...properties, newProperty])
      toast.success("Property added successfully")
    }
    reset()
    setEditingProperty(null)

  }

  const handleEdit = (property: Property) => {
    setEditingProperty(property)
    Object.entries(property).forEach(([key, value]) => {
      setValue(key as keyof Property, value)
    })
  }

  const handleDelete = (id: number) => {
    setProperties(properties.filter((p) => p.id !== id))
    toast.success("Property deleted successfully")
  }

  const chartData = properties.map((property) => ({
    name: property.name,
    "Property Value": property.price,
  }))

  const donutChartData = propertyTypes.map((type) => ({
    name: type,
    value: properties.filter((p) => p.type === type).length,
  }))

  return (

    <div className="container mx-auto px-4 py-8">

      <Toaster position="top-right" />
      <Title className="text-2xl font-bold">Admin Dashboard</Title>
      <Text>Manage properties and view analytics</Text>

      <TabGroup className="mt-6">

        <TabList className="text-white mb-6">
          <Tab>Properties</Tab>
          <Tab>Analytics</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Card className="mt-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    {...register("name", { required: true })}
                    placeholder="Property Name"
                    className="w-full p-2 border rounded"
                  />
                  <select {...register("type", { required: true })} className="w-full p-2 border rounded">
                    <option value="">Select Type</option>
                    {propertyTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <input
                    {...register("price", { required: true, min: 0 })}
                    type="number"
                    placeholder="Price"
                    className="w-full p-2 border rounded"
                  />
                  <input
                    {...register("location", { required: true })}
                    placeholder="Location"
                    className="w-full p-2 border rounded"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  {editingProperty ? "Update Property" : "Add Property"}
                </button>
              </form>
            </Card>

            <Card className="mt-6">
              <Title>Property List</Title>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created At
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {properties.map((property) => (
                      <tr key={property.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{property.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{property.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap">${property.price.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{property.location}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{property.createdAt}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleEdit(property)}
                            className="text-indigo-600 hover:text-indigo-900 mr-2"
                          >
                            <FiEdit2 />
                          </button>
                          <button onClick={() => handleDelete(property.id)} className="text-red-600 hover:text-red-900">
                            <FiTrash2 />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabPanel>

          <TabPanel>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <Card>
                <Title>Property Values</Title>
                <BarChart
                  data={chartData}
                  index="name"
                  categories={["Property Value"]}
                  colors={["blue"]}
                  valueFormatter={(number) => `$${Intl.NumberFormat("us").format(number).toString()}`}
                  yAxisWidth={48}
                  className="mt-6"
                />
              </Card>
              <Card>
                <Title>Property Types Distribution</Title>
                <DonutChart
                  data={donutChartData}
                  category="value"
                  index="name"
                  valueFormatter={(number) => number.toString()}
                  className="mt-6"
                />
              </Card>
            </div>
          </TabPanel>

        </TabPanels>

      </TabGroup>

    </div>

  )

}

export default AdminDashboard

