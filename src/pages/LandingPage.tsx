import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FaSearch, FaMapMarkerAlt, FaCalendarAlt, FaUsers } from "react-icons/fa";

const HomePage: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <header className="relative bg-cover bg-center h-[500px] flex items-center justify-center text-white"
              style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}>
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Staychaintion</h1>
          <p className="text-lg mb-6">Experience Decentralized and Trustless Booking with ICP</p>
          <Link to="/listings">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg text-lg">
              Explore Listings
            </Button>
          </Link>
        </div>
      </header>

      {/* Search Bar */}
      <div className="container mx-auto p-4 -mt-12 relative z-10">
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex items-center border p-3 rounded-lg w-full">
            <FaMapMarkerAlt className="text-gray-500 mr-2" />
            <input type="text" placeholder="Where to?" className="w-full outline-none" />
          </div>
          <div className="flex items-center border p-3 rounded-lg w-full">
            <FaCalendarAlt className="text-gray-500 mr-2" />
            <input type="date" className="w-full outline-none" />
          </div>
          <div className="flex items-center border p-3 rounded-lg w-full">
            <FaUsers className="text-gray-500 mr-2" />
            <input type="number" min="1" placeholder="Guests" className="w-full outline-none" />
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg flex items-center">
            <FaSearch className="mr-2" /> Search
          </Button>
        </div>
      </div>

      {/* Featured Listings */}
      <section className="container mx-auto py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Stays</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((listing) => (
            <div key={listing} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={`/images/listing-${listing}.jpg`} alt="Listing" className="w-full h-60 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold">Luxury Stay {listing}</h3>
                <p className="text-gray-500">Location {listing}</p>
                <p className="text-lg font-semibold mt-2">$100/night</p>
                <Link to="/listing/1">
                  <Button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-xl font-bold mb-2">Browse Listings</h3>
              <p className="text-gray-500">Find your perfect stay from a wide selection of verified properties.</p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-xl font-bold mb-2">Book Securely</h3>
              <p className="text-gray-500">Use smart contracts for trustless and transparent transactions.</p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-xl font-bold mb-2">Enjoy Your Stay</h3>
              <p className="text-gray-500">Check-in with confidence knowing everything is secure and fair.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;