"use client"

import { useState, useEffect } from "react"
import { Outlet, Link } from "react-router-dom"
import { Menu, X, ChevronUp } from "lucide-react"
import Navbar from "@/components/navbar"
import { Button } from "react-day-picker"
import { useNavigate } from "react-router-dom"

function MainLayout() {

  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (

    <div className="flex flex-col min-h-screen">

      {/* Ini navbar */}

      <Navbar/>

      {/* Ini isinya */}

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <Outlet />
      </main>

      {/* Ini footer */}

      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Staychaintion</h3>
              <p className="text-gray-400">
              Staychaintion – Redefining travel with Web3 technology. Discover unique stays, enjoy seamless smart contract bookings, and experience a decentralized, trustless vacation rental platform. Your next adventure starts here!
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/landing" className="text-gray-400 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/teams" className="text-gray-400 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/properties" className="text-gray-400 hover:text-white transition-colors">
                    Properties
                  </Link>
                </li>
                <li>
                  <Link to="/ai" className="text-gray-400 hover:text-white transition-colors">
                    AI Features
                  </Link>
                </li>
                <li>
                  <Link to="/features" className="text-gray-400 hover:text-white transition-colors">
                    Main Features
                  </Link>
                </li>
                {/* <li>
                  <Link to="/marketing" className="text-gray-400 hover:text-white transition-colors">
                    Marketing
                  </Link>
                </li>
                <li>
                  <Link to="/marketplace" className="text-gray-400 hover:text-white transition-colors">
                    Marketplace
                  </Link>
                </li> */}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-400">Kota Tangerang, Banten 15143</p>
              <p className="text-gray-400">Email: chainers@gmail.com</p>
              <p className="text-gray-400">Phone: (62) 123-4567-890</p>
              <button className="transition duration-500 hover:bg-blue-200 mt-2 ml:0 px-4 py-1 bg-white text-black" onClick={()=>navigate("/contact")}>Contact Us</button>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <a href="/legal">&copy; 2025 Unchainers. All rights reserved.</a>
          </div>
        </div>
      </footer>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 bg-indigo-600 text-white p-2 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 z-50"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      )}

    </div>

  )

}

export default MainLayout

