"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { House, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import type React from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Detect scroll position to add background and shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md backdrop-blur-lg" : "bg-transparent"
      } flex items-center justify-between px-6 py-4 border-b border-white/10`}
    >
      {/* Logo */}
      <a href="/" className="flex items-center space-x-2">
        <House className="w-8 h-8 text-blue-500" />
        <span className="text-gray-900 font-medium text-xl">Staychaintion</span>
      </a>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex items-center space-x-8">
        <NavLink href="/features">Features</NavLink>
        <NavLink href="/how-it-works">How it Works</NavLink>
        <NavLink href="/examples">Examples</NavLink>
        <NavLink href="/pricing">Pricing</NavLink>
      </div>

      {/* Buttons */}
      <div className="hidden md:flex items-center space-x-4">
        <Button variant="ghost" className="text-white hover:text-blue-600">
          Sign In
        </Button>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white">Get Started</Button>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden text-gray-700 focus:outline-none"
      >
        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          className="absolute top-full left-0 right-0 bg-white shadow-md p-4 flex flex-col space-y-2 md:hidden"
        >
          <NavLink href="/features" onClick={() => setIsMenuOpen(false)}>
            Features
          </NavLink>
          <NavLink href="/how-it-works" onClick={() => setIsMenuOpen(false)}>
            How it Works
          </NavLink>
          <NavLink href="/examples" onClick={() => setIsMenuOpen(false)}>
            Examples
          </NavLink>
          <NavLink href="/pricing" onClick={() => setIsMenuOpen(false)}>
            Pricing
          </NavLink>
          <Button variant="ghost" className="text-white hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
            Sign In
          </Button>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={() => setIsMenuOpen(false)}>
            Get Started
          </Button>
        </motion.div>
      )}
    </motion.nav>
  );
}

function NavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="text-gray-600 hover:text-blue-600 transition-colors relative group block px-4 py-2"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full" />
    </a>
  );
}
