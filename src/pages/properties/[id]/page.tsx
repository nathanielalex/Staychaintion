"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Share2, Heart, Star, Users, Bed, Bath, MapPin, Award, CheckCircle, AlertCircle } from "lucide-react"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { GuestSelector } from "@/components/ui/guest-selector"
import { useLocation, useParams } from "react-router-dom"
import { Property } from "@/declarations/Property_backend/Property_backend.did"
import { UserProfile } from "@/declarations/User/User.did"
import { User } from "@/declarations/User"
// Sample property data
// const property = {
//   id: 1,
//   title: "Emotional healing accommodation in Icheon City, Seoul",
//   location: "Sindun-myeon, Icheon-si, South Korea",
//   images: [
//     "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hsMpfGk2cZ4bepjI9ieY48eHQrNym8.png",
//     "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hsMpfGk2cZ4bepjI9ieY48eHQrNym8.png",
//     "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hsMpfGk2cZ4bepjI9ieY48eHQrNym8.png",
//     "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hsMpfGk2cZ4bepjI9ieY48eHQrNym8.png",
//   ],
//   price: 1026383,
//   rating: 4.84,
//   reviews: 177,
//   guests: 2,
//   bedrooms: 1,
//   beds: 1,
//   baths: 1,
//   host: {
//     name: "Snow Lee",
//     image: "/placeholder.svg?height=50&width=50",
//     isSuperhost: true,
//     hostingSince: "11 years",
//   },
//   highlights: [
//     "50-min drive to Bukhansan National Park",
//     "Exceptional check-in experience",
//     "Free cancellation before Mar 18",
//   ],
// }

interface LocationState {
  property: Property; 
}

export default function PropertyDetailPage() {
  const [isLiked, setIsLiked] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [showAllImages, setShowAllImages] = useState(false)
  const [owner, setOwner] = useState<UserProfile | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation();
  const { property } = location.state as LocationState || {};
  const { id } = useParams();

  const fetchUser = async () => {
      try {
        // setLoading(true);
        // setError(null);
        // const actor = getChatActor();
        const result = await User.getUser(property.owner);
        if(result.length > 0) {
          setOwner(result[0]);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    
    useEffect(() => {
      fetchUser();
    }, []);
  

  return (
    <div className="min-h-screen bg-white">
      {/* Image Gallery */}
      <div className="relative">
        <div className="grid grid-cols-4 gap-2 h-[60vh]">
          {property.pictures.slice(0, 4).map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.2 }}
              className={`relative ${index === 0 ? "col-span-2 row-span-2" : ""} overflow-hidden`}
              onClick={() => setSelectedImageIndex(index)}
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`Property image ${index + 1}`}
                className="object-cover hover:scale-110 transition-transform duration-300"
              />
            </motion.div>
          ))}
          <Button
            variant="secondary"
            className="absolute bottom-4 right-4 bg-white"
            onClick={() => setShowAllImages(true)}
          >
            Show all photos
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl font-semibold mb-2">{property.name}</h1>
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{property.location}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon">
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => setIsLiked(!isLiked)}>
                  <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
              </div>
            </div>

            {/* Property Details */}
            <Card className="p-6 mb-8">
              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-gray-500" />
                  <span>{property.guestCapacity.toString()} guests</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Bed className="w-5 h-5 text-gray-500" />
                  <span>{property.bedroomCount.toString()} bedroom</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Bed className="w-5 h-5 text-gray-500" />
                  <span>{property.bedCount.toString()} bed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Bath className="w-5 h-5 text-gray-500" />
                  <span>{property.bathroomCount.toString()} bath</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 mb-6">
                <Award className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium">Guest favorite</p>
                  <p className="text-sm text-gray-600">One of the most loved homes on Airbnb, according to guests</p>
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={owner?.profilePictureUrl || "/placeholder.svg"}
                    alt={owner?.fullName}
                    width={56}
                    height={56}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-medium">Hosted by {owner?.fullName}</p>
                    {/* <p className="text-sm text-gray-600">Superhost · {property.host.hostingSince} hosting</p> */}
                  </div>
                </div>
              </div>
            </Card>

            {/* Highlights */}
            {/* <Card className="p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Property Highlights</h2>
              <div className="space-y-4">
                {property.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <p>{highlight}</p>
                  </div>
                ))}
              </div>
            </Card> */}

          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-2xl font-semibold">Rp {property.pricePerNight.toLocaleString()}</span>
                  <span className="text-gray-600"> / night</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-blue-600 fill-blue-600" />
                  <span className="font-medium">{property.rating.toString()}</span>
                  {/* <span className="text-gray-600">({property.reviews} reviews)</span> */}
                </div>
              </div>

              <div className="space-y-4">
                <DatePickerWithRange />
                <GuestSelector maxGuests={Number(property.guestCapacity)} />
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-lg">Reserve</Button>
              </div>

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex justify-between">
                  <span>Rp {property.pricePerNight.toLocaleString()} × 5 nights</span>
                  <span>Rp {(Number(property.pricePerNight) * 5).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cleaning fee</span>
                  <span>Rp 171,064</span>
                </div>
                <div className="flex justify-between">
                  <span>Service fee</span>
                  <span>Rp 279,091</span>
                </div>
                <div className="pt-4 border-t flex justify-between font-semibold">
                  <span>Total before taxes</span>
                  <span>Rp 6,282,070</span>
                </div>
              </div>

              <div className="mt-6 flex items-start space-x-2 p-4 bg-blue-50 rounded-lg">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <p className="text-sm text-blue-600">This is a rare find. Snow Lee's place is usually fully booked.</p>
              </div>
            </Card>

          </div>

        </div>


        {/* Reviews Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Guest Reviews</h2>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-blue-600 fill-blue-600" />

                {/* UNCOMMENT INI */}

                {/* <span className="text-xl font-semibold">{property.rating}</span>
                <span className="text-gray-600">({property.reviewText} reviews)</span> */}
              </div>
            </div>

            {/* Rating Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-3">
                {["Cleanliness", "Communication", "Check-in", "Accuracy"].map((category) => (
                  <div key={category} className="flex items-center justify-between">
                    <span className="text-gray-600">{category}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <motion.div
                          className="bg-blue-600 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${(4.5 + Math.random() * 0.5) * 20}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </div>
                      <span className="text-sm font-medium">{(4.5 + Math.random() * 0.5).toFixed(1)}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                {["Location", "Value", "Amenities", "Overall"].map((category) => (
                  <div key={category} className="flex items-center justify-between">
                    <span className="text-gray-600">{category}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <motion.div
                          className="bg-blue-600 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${(4.5 + Math.random() * 0.5) * 20}%` }}
                          transition={{ duration: 1, delay: 0.3 }}
                        />
                      </div>
                      <span className="text-sm font-medium">{(4.5 + Math.random() * 0.5).toFixed(1)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Review List */}
            <div className="space-y-6">
              {[
                {
                  name: "Sarah Johnson",
                  avatar: "/placeholder.svg?height=50&width=50",
                  rating: 5,
                  date: "March 2023",
                  text: "This place was absolutely perfect for our family vacation. The location is stunning with breathtaking views. The host was incredibly responsive and helpful throughout our stay. The amenities were top-notch and everything was clean and well-maintained. Would definitely recommend and stay again!",
                },
                {
                  name: "Michael Chen",
                  avatar: "/placeholder.svg?height=50&width=50",
                  rating: 4,
                  date: "February 2023",
                  text: "Great property in a beautiful location. The house was clean and had all the amenities we needed. The host was very responsive and accommodating. The only minor issue was that the WiFi was a bit slow at times, but overall we had a wonderful stay and would come back again.",
                },
                {
                  name: "Emma Rodriguez",
                  avatar: "/placeholder.svg?height=50&width=50",
                  rating: 5,
                  date: "January 2023",
                  text: "We had an amazing time at this property! The location is perfect - close to restaurants and attractions but still peaceful and quiet. The house itself is beautifully designed and very comfortable. The kitchen was well-equipped for cooking meals. The host provided excellent recommendations for local activities. Highly recommend!",
                },
              ].map((review, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="border-b pb-6 last:border-b-0"
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={review.avatar || "/placeholder.svg"}
                      alt={review.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-medium">{review.name}</h4>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span>{review.date}</span>
                          </div>
                        </div>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < review.rating ? "text-blue-600 fill-blue-600" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700">{review.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Load More Button */}
            <div className="mt-8 text-center">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                Load more reviews
              </Button>
            </div>
          </Card>

          {/* Write a Review */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Rating</label>
                <div className="flex space-x-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <button key={i} className="focus:outline-none">
                      <Star className="w-6 h-6 text-gray-300 hover:text-blue-600 hover:fill-blue-600 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Review</label>
                <textarea
                  className="w-full border rounded-md p-3 h-32 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Share your experience with this property..."
                ></textarea>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">Submit Review</Button>
            </div>
          </Card>
        </div>
      </div>

      </div>
    </div>
  )
}

