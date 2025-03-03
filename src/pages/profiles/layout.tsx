"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { LayoutDashboard, Home, BarChart3, Settings, Menu, X, House } from "lucide-react"
import { cn } from "@/lib/utils"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/user",
    },
    {
      title: "Properties",
      icon: Home,
      href: "/user/properties",
    },
    {
      title: "Analytics",
      icon: BarChart3,
      href: "/user/analytics",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/user/settings",
    },
  ]

  return (

    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isSidebarOpen ? 0 : -300 }}
        className={cn(
          "fixed top-0 left-0 z-40 h-screen w-64 bg-white border-r border-gray-200 transition-transform",
          !isSidebarOpen && "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
          <a href="/admin" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white font-semibold"><House/></span>
            </div>
            <span className="text-xl font-semibold">StayChaintion</span>
          </a>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="flex items-center space-x-3 px-4 py-3 text-gray-600 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.title}</span>
            </a>
          ))}
        </nav>
      </motion.aside>

      {/* Main Content */}
      <div className={cn("transition-all duration-300", isSidebarOpen ? "lg:ml-64" : "lg:ml-0")}>
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-lg text-white hover:bg-gray-100 hover:text-black">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-medium">A</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>

    </div>

  )

}

