"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus } from "lucide-react"

const faqs = [
  {
    question: "How does ResearchAI analyze research papers?",
    answer:
      "ResearchAI uses advanced natural language processing and machine learning algorithms to analyze research papers. Our AI can understand complex academic language, identify key findings, and extract relevant information while maintaining the context and nuance of the original research.",
  },
  {
    question: "What file formats are supported for paper uploads?",
    answer:
      "We support various academic paper formats including PDF, DOC/DOCX, and direct text uploads. Our system can also process papers from popular academic databases and repositories through their URLs.",
  },
  {
    question: "How accurate is the AI-powered analysis?",
    answer:
      "Our AI system maintains a high accuracy rate of over 95% in identifying key information and summarizing research papers. All results are validated against established academic standards, and we continuously improve our models through expert feedback.",
  },
  {
    question: "Can I collaborate with team members on paper analysis?",
    answer:
      "Yes! ResearchAI offers robust collaboration features. You can share analyses, add comments, and work together with team members in real-time. Our platform supports role-based access control and version tracking.",
  },
  {
    question: "Is my research data secure?",
    answer:
      "Absolutely. We employ enterprise-grade encryption for all data storage and transmission. Our platform complies with academic data protection standards, and you retain full control over your research data.",
  },
  {
    question: "What kind of support do you offer?",
    answer:
      "We provide 24/7 technical support, comprehensive documentation, and regular training sessions. Our team of academic experts is also available for specialized assistance with research-specific queries.",
  },
]

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

