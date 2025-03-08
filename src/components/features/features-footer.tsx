"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, HelpCircle, MessageSquare, Mail } from "lucide-react"

export default function FeaturesFooter() {
  return (
    <section className="bg-blue-600 py-20 text-white">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Can't Find What You're Looking For?</h2>
          <p className="mb-8 text-lg text-blue-100">
            Our support team is here to help you navigate our platform and find the features you need.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="w-full rounded-full bg-white px-8 text-blue-600 hover:bg-blue-50 sm:w-auto"
            >
              <a href="/contact">
                Contact Support <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full rounded-full border-blue-300 px-8 text-white bg-blue-700 hover:text-blue-700 hover:bg-white sm:w-auto"
            >
              <a href="/chat">
                <MessageSquare className="mr-2 h-4 w-4" /> Live Chat
              </a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-16 max-w-4xl"
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center rounded-xl bg-blue-700/50 p-6 text-center backdrop-blur-sm">
              <HelpCircle className="mb-4 h-10 w-10" />
              <h3 className="mb-2 text-xl font-semibold">Legal Information</h3>
              <p className="mb-4 text-blue-100">Read our Terms and Condition</p>
              <a href="/legal" className="mt-auto text-sm font-medium text-white underline underline-offset-4 hover:text-black">
                Terms & Policy
              </a>
            </div>

            <div className="flex flex-col items-center rounded-xl bg-blue-700/50 p-6 text-center backdrop-blur-sm">
              <MessageSquare className="mb-4 h-10 w-10" />
              <h3 className="mb-2 text-xl font-semibold">Community Support</h3>
              <p className="mb-4 text-blue-100">Get help from our community members</p>
              <a href="/community" className="mt-auto text-sm font-medium text-white underline underline-offset-4 hover:text-black">
                Join Community
              </a>
            </div>

            <div className="flex flex-col items-center rounded-xl bg-blue-700/50 p-6 text-center backdrop-blur-sm">
              <Mail className="mb-4 h-10 w-10" />
              <h3 className="mb-2 text-xl font-semibold">Email Support</h3>
              <p className="mb-4 text-blue-100">Reach out to our support team via email</p>
              <a
                href="mailto:support@example.com"
                className="mt-auto text-sm font-medium text-white underline underline-offset-4 hover:text-black"
              >
                Send Email
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

