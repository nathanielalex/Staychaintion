"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus } from "lucide-react"

const faqs = [
  {
    question: "How does StayChaintion help property owners maximize earnings?",
    answer:
      "StayChaintion utilizes AI-powered dynamic pricing to analyze market trends, occupancy rates, and local demand, ensuring you get the best possible price for your property. Our smart pricing recommendations help you increase bookings while maximizing revenue.",
  },
  {
    question: "What types of properties can be listed on StayChaintion?",
    answer:
      "You can list a variety of properties including apartments, villas, guesthouses, and vacation homes. Whether you're renting out a single room or an entire property, StayChaintion provides the tools you need to manage your listings efficiently.",
  },
  {
    question: "How does StayChaintion ensure secure transactions?",
    answer:
      "We leverage blockchain technology to provide secure, transparent, and tamper-proof transactions. Payments can be made through traditional methods or cryptocurrencies, ensuring fast and safe transactions without intermediaries.",
  },
  {
    question: "Can I manage my property remotely with StayChaintion?",
    answer:
      "Yes! StayChaintion provides an intuitive dashboard where you can update pricing, manage availability, and communicate with guests from anywhere. Our AI-powered automation tools help you streamline operations and reduce manual work.",
  },
  {
    question: "What makes StayChaintion different from other rental platforms?",
    answer:
      "Unlike traditional rental platforms, StayChaintion integrates AI-driven insights, Web3 payments, and blockchain security to offer a seamless, transparent, and efficient rental experience for both property owners and travelers.",
  },
  {
    question: "Is there a fee for listing my property on StayChaintion?",
    answer:
      "StayChaintion offers competitive pricing with low commission rates. We believe in fair and transparent pricing, ensuring that property owners keep more of their earnings while benefiting from our advanced AI tools and Web3 ecosystem.",
  },
];


export default function FAQSection() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 text-lg">
            Got questions? We've got answers. If you can't find what you're looking for, reach out to our support team.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} index={index} />
          ))}
        </motion.div>

        {/* Support Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600">
            Still have questions?{" "}
            <a href="/contact" className="text-blue-600 hover:text-blue-700 font-medium">
              Contact our support team
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="group"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <span className="text-lg font-semibold text-gray-900 text-left">{question}</span>
        <div
          className={`ml-4 p-2 rounded-full bg-blue-50 transition-transform duration-300 ${
            isOpen ? "rotate-180 bg-blue-100" : ""
          }`}
        >
          {isOpen ? <Minus className="w-4 h-4 text-blue-600" /> : <Plus className="w-4 h-4 text-blue-600" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-4 text-gray-600 bg-white/50 rounded-b-2xl">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

