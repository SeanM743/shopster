import React from 'react';
import { Search, User, ShoppingCart, MapPin, Menu } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Top Banner - Optional promotional banner */}
      <div className="bg-walmart-blue-500 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm">
            Free shipping, arrives in 3+ days
            <span className="ml-2 underline cursor-pointer">Details</span>
          </p>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section - Logo */}
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <button className="md:hidden p-2 hover:bg-gray-100 rounded-md">
              <Menu className="h-6 w-6 text-gray-700" />
            </button>
            
            {/* Logo */}
            <div className="flex items-center">
              <div className="bg-walmart-blue-500 text-white px-3 py-2 rounded-md font-bold text-xl">
                S
              </div>
              <span className="ml-2 text-2xl font-bold text-walmart-blue-500">
                hopster
              </span>
            </div>
          </div>

          {/* Center Section - Search */}
          <div className="flex-1 max-w-3xl mx-8 hidden md:block">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search everything at Shopster online and in store"
                className="w-full pl-10 pr-4 py-2 border-2 border-walmart-blue-500 rounded-full focus:outline-none focus:border-walmart-blue-600 focus:ring-2 focus:ring-walmart-blue-100"
              />
            </div>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center space-x-6">
            {/* Location */}
            <div className="hidden lg:flex items-center text-sm">
              <MapPin className="h-4 w-4 text-gray-600 mr-1" />
              <div>
                <div className="text-xs text-gray-600">How do you want your items?</div>
                <div className="font-medium text-gray-900">Sacramento, 95829</div>
              </div>
            </div>

            {/* Sign In */}
            <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-md">
              <User className="h-6 w-6 text-gray-700" />
              <div className="hidden sm:block">
                <div className="text-xs text-gray-600">Sign In</div>
                <div className="font-medium text-gray-900">Account</div>
              </div>
            </div>

            {/* Cart */}
            <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-md relative">
              <ShoppingCart className="h-6 w-6 text-gray-700" />
              <div className="hidden sm:block">
                <div className="text-xs text-gray-600">$0.00</div>
              </div>
              {/* Cart badge */}
              <div className="absolute -top-1 -right-1 bg-walmart-yellow-500 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                0
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search everything at Walmart"
              className="w-full pl-10 pr-4 py-2 border-2 border-walmart-blue-500 rounded-full focus:outline-none focus:border-walmart-blue-600"
            />
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-walmart-blue-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center space-x-8">
              <button className="flex items-center space-x-2 hover:bg-walmart-blue-600 px-3 py-2 rounded-md">
                <Menu className="h-4 w-4" />
                <span className="text-sm font-medium">Departments</span>
              </button>
              <a href="#" className="text-sm hover:text-walmart-yellow-200 hidden sm:block">
                Services
              </a>
              <a href="#" className="text-sm hover:text-walmart-yellow-200 hidden md:block">
                Grocery & Essentials
              </a>
              <a href="#" className="text-sm hover:text-walmart-yellow-200 hidden lg:block">
                Fashion
              </a>
              <a href="#" className="text-sm hover:text-walmart-yellow-200 hidden lg:block">
                Home
              </a>
              <a href="#" className="text-sm hover:text-walmart-yellow-200 hidden lg:block">
                Electronics
              </a>
              <a href="#" className="text-sm hover:text-walmart-yellow-200 hidden xl:block">
                Auto & Tires
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-walmart-yellow-200 hidden sm:block">
                Cyber Deals
              </span>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;