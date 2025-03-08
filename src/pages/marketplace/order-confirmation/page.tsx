"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle, ShoppingBag, Home } from "lucide-react"

export default function OrderConfirmationPage() {
  // Mock order details
  const orderNumber = "ORD-" + Math.floor(100000 + Math.random() * 900000)
  const orderDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-12"
      >
        <Card className="max-w-2xl mx-auto p-8">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="h-12 w-12 text-green-600" />
            </motion.div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
            <p className="text-gray-600">
              Thank you for your purchase. Your order has been received and is being processed.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Order Number</p>
                <p className="font-medium">{orderNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">{orderDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="font-medium">$64.97</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Payment Method</p>
                <p className="font-medium">Credit Card</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">What's Next?</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="bg-blue-100 rounded-full p-1 mr-3 mt-0.5">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Order Confirmation</p>
                  <p className="text-sm text-gray-600">You'll receive an email confirmation shortly.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-blue-100 rounded-full p-1 mr-3 mt-0.5">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Order Processing</p>
                  <p className="text-sm text-gray-600">We're preparing your items for shipment.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-gray-100 rounded-full p-1 mr-3 mt-0.5">
                  <ShoppingBag className="h-4 w-4 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium">Shipping</p>
                  <p className="text-sm text-gray-600">You'll receive tracking information when your order ships.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <a href="/marketplace" className="flex-1">
              <Button variant="outline" className="w-full">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Continue Shopping
              </Button>
            </a>
            <a href="/landing" className="flex-1">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Home className="mr-2 h-4 w-4" />
                Go to Home
              </Button>
            </a>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

