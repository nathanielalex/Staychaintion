import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { House, LucideBaby, LucideChevronDown, LucideChevronUp, LucideIdCard, LucideWallet2, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import type React from "react";
import getBalance from "@/utility/wallet-func";
import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";
import ThemeToggleButton from "@/components/ui/toggle";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [balance, setBalance] = useState<number>();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState<boolean>();
  const [isConnected, setIsConnected] = useState<boolean>();

  const _getBalance = async () => {
    const _isConnected = await window.ic?.plug?.isConnected();

    setIsConnected(_isConnected);

    if (_isConnected) {
      const _balance = await getBalance();
      setBalance(_balance);
    }
  };

  // Detect scroll position to add background and shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    _getBalance();

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
        <span className="text-gray-900 font-medium text-xl">StayChaintion</span>
      </a>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex items-center space-x-8">
        <NavLink href="/landing">Home</NavLink>
        <NavLink href="/properties">Properties</NavLink>
        <NavLink href="/ai">AI Features</NavLink>
        <NavLink href="/marketing">Marketing</NavLink>
        <NavLink href="/marketplace">Marketplace</NavLink>
      </div>

      {window.ic?.plug?.isConnected && (


        <div className="relative hidden md:flex">

          {/* <ThemeToggleButton/> */}

          <div
            className="flex flex-row items-center cursor-pointer space-x-2"
            onClick={() => {
              setIsProfileDropdownOpen(lastState => !lastState);
            }}
          >
            <div>Profile</div>
            {!isProfileDropdownOpen && <LucideChevronDown />}
            {isProfileDropdownOpen && <LucideChevronUp />}
          </div>
          {isProfileDropdownOpen && (
            <ul className="absolute top-full bg-white border rounded-md shadow-md right-1/4 w-max">

              <li className="p-2">
                <NavLink
                  href="/profile"
                >
                  <div className="flex flex-row space-x-2">
                    <LucideIdCard />
                    <div>Profile</div>
                  </div>
                </NavLink>
              </li>

              <li className="p-2">
                <NavLink
                  href={isConnected ? "/history" : "/wallet"}
                  className="flex flex-col space-y-4"
                >
                  <div className="flex flex-row space-x-2">
                    <LucideWallet2 />
                    <div>{isConnected ? "Wallet" : "Connect to Wallet"}</div>
                  </div>
                  <div>Balance: {balance?.toFixed(2)} ICP</div>
                </NavLink>
              </li>

              {/* <li className="p-2">
                  <div className="flex flex-row space-x-1">
                    <ThemeToggleButton/>
                  </div>
              </li> */}

            </ul>
            
          )}

          <ThemeToggleButton/>

        </div>

      )}

      {/* <div className="hidden md:flex items-center space-x-4">
        <a href="/register2">
          <Button variant="ghost" className="text-white hover:text-blue-600">
            Sign In
          </Button>
        </a>
        <a href="/home">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white">Connect</Button>
        </a>
      </div> */}

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

          <NavLink href="/landing" onClick={() => setIsMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink href="/properties" onClick={() => setIsMenuOpen(false)}>
            Properties
          </NavLink>
          <NavLink href="/ai" onClick={() => setIsMenuOpen(false)}>
            AI Features
          </NavLink>
          <NavLink href="/marketing" onClick={() => setIsMenuOpen(false)}>
            Marketing
          </NavLink>
          <NavLink href="/marketplace" onClick={() => setIsMenuOpen(false)}>
            Marketplace
          </NavLink>
          
          {window.ic?.plug?.isConnected && (
        <div className="relative">
          <div
            className="flex flex-row items-center cursor-pointer space-x-2"
            onClick={() => {
              setIsProfileDropdownOpen(lastState => !lastState);
            }}
          >
            <div>Profile</div>
            {!isProfileDropdownOpen && <LucideChevronDown />}
            {isProfileDropdownOpen && <LucideChevronUp />}
          </div>
          {isProfileDropdownOpen && (
            <ul className="absolute top-full bg-white border rounded-md shadow-md right-1/4 w-max">
              <li className="p-2">
                <NavLink
                  href="/profile"
                >
                  <div className="flex flex-row space-x-2">
                    <LucideIdCard />
                    <div>Profile</div>
                  </div>
                </NavLink>
              </li>
              <li className="p-2">
                <NavLink
                  href={isConnected ? "/history" : "/wallet"}
                  className="flex flex-col space-y-4"
                >
                  <div className="flex flex-row space-x-2">
                    <LucideWallet2 />
                    <div>{isConnected ? "Wallet" : "Connect to Wallet"}</div>
                  </div>
                  <div>Balance: {balance?.toFixed(2)} ICP</div>
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      )}

        </motion.div>
      )}
    </motion.nav>
  );
}

function NavLink({ href, children, onClick, className }: { href: string; children: React.ReactNode; onClick?: () => void; className?: string; }) {
  const location = useLocation();
  return (
    <Link
      to={href}
      onClick={onClick}
      className={clsx(
        "text-gray-600 hover:text-blue-600 transition-colors relative group block px-4 py-2",
        {"!text-blue-600": location.pathname === href,},
        className
      )}
    >
      {children}
      <span className={clsx(
        "absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full",
        {"w-full": location.pathname === href,},
      )} />
    </Link>
  );
}
