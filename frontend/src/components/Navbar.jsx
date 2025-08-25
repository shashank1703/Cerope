import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineSearch } from 'react-icons/hi';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left section: Logo and Explore More button */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold">Cerope</span>
            </div>
            <div className="hidden md:ml-6 md:flex">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium">
                Explore More
              </button>
            </div>
          </div>

          {/* Center section: Navigation links (desktop only) */}
          <div className="hidden md:flex items-center justify-center space-x-8">
            <Link to="/" className="text-gray-900 border-b-2 border-blue-500 px-1 pt-1 font-medium">
              Home
            </Link>
            <Link to="/know-my-vibe" className="text-gray-500 hover:text-gray-900 px-1 pt-1 font-medium">
              Know My Vibe
            </Link>
            <Link to="/wardrobe" className="text-gray-500 hover:text-gray-900 px-1 pt-1 font-medium">
              My Wardrobe
            </Link>
            <Link to="/ai-pal" className="text-gray-500 hover:text-gray-900 px-1 pt-1 font-medium">
              Ask AI Pal
            </Link>
            <Link to="/outfit" className="text-gray-500 hover:text-gray-900 px-1 pt-1 font-medium">
              Plan Outfit
            </Link>
          </div>

          {/* Mobile search bar (visible on mobile only) */}
          <div className="md:hidden flex-1 mx-4 flex items-center">
            <div className="w-full relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiOutlineSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Right section: User avatar */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                <img 
                  src="/avatar_nav.png" 
                  alt="User avatar"
                  className="h-full w-full object-cover" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}