import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Trash2, Search, Filter, Star } from "lucide-react"
import PropertyForm from "./property-form"
import { Property } from "@/declarations/Property_backend/Property_backend.did"
import { Property_backend } from "@/declarations/Property_backend"
import { useAuth } from "@/utility/use-auth-client"
import { Principal } from "@dfinity/principal"

// Sample data
// const properties = [
//   {
//     id: 1,
//     name: "Luxury Beach Villa",
//     type: "Villa",
//     location: "Miami, FL",
//     price: 1200,
//     bedrooms: 4,
//     bathrooms: 3,
//     guests: 8,
//     status: "active",
//     rating: 4.9,
//     image: "/placeholder.svg?height=100&width=150",
//     bookings: 24,
//     revenue: 28800,
//   },
//   {
//     id: 2,
//     name: "City Center Apartment",
//     type: "Apartment",
//     location: "New York, NY",
//     price: 800,
//     bedrooms: 2,
//     bathrooms: 2,
//     guests: 4,
//     status: "active",
//     rating: 4.7,
//     image: "/placeholder.svg?height=100&width=150",
//     bookings: 18,
//     revenue: 14400,
//   },
//   {
//     id: 3,
//     name: "Mountain Cabin",
//     type: "Cabin",
//     location: "Aspen, CO",
//     price: 950,
//     bedrooms: 3,
//     bathrooms: 2,
//     guests: 6,
//     status: "maintenance",
//     rating: 4.8,
//     image: "/placeholder.svg?height=100&width=150",
//     bookings: 12,
//     revenue: 11400,
//   },
//   {
//     id: 4,
//     name: "Lakefront Cottage",
//     type: "Cottage",
//     location: "Lake Tahoe, CA",
//     price: 1050,
//     bedrooms: 3,
//     bathrooms: 2,
//     guests: 6,
//     status: "active",
//     rating: 4.6,
//     image: "/placeholder.svg?height=100&width=150",
//     bookings: 15,
//     revenue: 15750,
//   },
// ]

const initialProperty: Property = {
  id: '',
  rating: 0,
  status: '',
  bedCount: 0n,
  owner: Principal.fromText('aaaaa-aa'),
  pricePerNight: 0,
  name: '',
  bedroomCount: 0n,
  bathroomCount: 0n,
  description: '',
  builtInDate: '',
  guestCapacity: 0n,
  pictures: [],
  propertyType:'',
  location: '',
  latitude: 0,
  longitude: 0,
  coverPicture: '',
  reviewCount: 0n
};

export default function PropertiesPage() {
  const [showForm, setShowForm] = useState(false)
  const [editingProperty, setEditingProperty] = useState<Property>(initialProperty)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  
  const { principal } = useAuth();

  const fetchProperties = async () => {
    try {
      // setLoading(true);
      // setError(null);
      // const actor = getChatActor();
      if(principal != null) {
        const result = await Property_backend.getOwnerProperties(principal);
        setProperties(result);
      }
    } catch (err) {
      console.log(err);
    } finally { 
      setLoading(false);
    }
  };
    
  useEffect(() => {
    fetchProperties();
  }, []);

  const handleEdit = (property: Property) => {
    setEditingProperty(property)
    setShowForm(true)
  }

  const handleDelete = async (property: Property) => {
    try {
      const result = await Property_backend.removeProperty(property.id);
      setProperties(prevProperties => 
        prevProperties.filter(item => item.id !== property.id)
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab = activeTab === "all" || property.status === activeTab
    return matchesSearch && matchesTab
  })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Properties</h1>
          <p className="text-gray-500">Manage your rental properties</p>
        </div>
        <Button
          onClick={() => {
            // setEditingProperty(null)
            setShowForm(true)
          }}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Property
        </Button>
      </motion.div>

      {showForm ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
          <PropertyForm property={editingProperty} setProperties={setProperties} isUpdating={isUpdating} onClose={() => setShowForm(false)} />
        </motion.div>
      ) : (
        <>
          <motion.div variants={item} className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search properties..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </motion.div>

          <motion.div variants={item}>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">All Properties</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>

          <motion.div variants={item} className="grid grid-cols-1 gap-6">
            {filteredProperties.map((property) => (
              <motion.div key={property.id} variants={item} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
                <Card className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="relative w-full md:w-48 h-48 md:h-auto">
                      <img
                        src={property.coverPicture || "/placeholder.svg"}
                        alt={property.name}
                        className="object-cover"
                      />
                      <Badge
                        className={`absolute top-2 right-2 ${
                          property.status === "active"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                        }`}
                      >
                        {property.status}
                      </Badge>
                    </div>
                    <div className="p-6 flex-grow">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold">{property.name}</h3>
                          <p className="text-gray-500">{property.location}</p>
                        </div>
                        <div className="flex items-center mt-2 md:mt-0">
                          <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                          <span>{property.rating}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Price</p>
                          <p className="font-semibold">${property.pricePerNight.toString()}/night</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Bedrooms</p>
                          <p className="font-semibold">{property.bedroomCount.toString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Bathrooms</p>
                          <p className="font-semibold">{property.bathroomCount.toString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Guests</p>
                          <p className="font-semibold">{property.guestCapacity.toString()}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Total Bookings</p>
                          {/* <p className="font-semibold">{property.bookings}</p> */}
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Total Revenue</p>
                          {/* <p className="font-semibold text-green-600">${property.revenue.toLocaleString()}</p> */}
                        </div>
                      </div>

                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(property)}>
                          <Pencil className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600"
                          onClick={() => handleDelete(property)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {filteredProperties.length === 0 && (
            <motion.div variants={item} className="text-center py-12">
              <p className="text-gray-500">No properties found matching your criteria.</p>
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  )
}

