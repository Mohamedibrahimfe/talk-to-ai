import React, { useState } from "react";
import Link from 'react-router-dom'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-blue-600 shadow-lg px-6 md:px-0">
      <div className="max-w-3xl mx-auto ">
        <div className="flex justify-between items-center h-16">
          {/* Logo or Brand Name */}
          <div className="flex-shrink-0">
            <a href="/" className="text-white text-xl font-bold">
              CusTomIzeD AIs
            </a>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-4">
            <link
              href="/"
              className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
            >
              Home
            </link>
           
            
          </div>

          {/* Mobile Menu Button (Hamburger Icon) */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="text-white hover:text-gray-200 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)} // Add state for mobile menu toggle
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isOpen && (
        <div className="md:hidden bg-blue-600">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="/"
              className="text-white block hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </a>
            <a
              href="/about"
              className="text-white block hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium"
            >
              About
            </a>
            <a
              href="/services"
              className="text-white block hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium"
            >
              Services
            </a>
            <a
              href="/contact"
              className="text-white block hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
