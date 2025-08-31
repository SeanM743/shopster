import React from 'react';
import { Search, User, ShoppingCart, MapPin, Menu, LogOut, Crown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Top Banner - Optional promotional banner */}
      <div className="bg-primary-500 text-white py-2 px-4">
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
              <div className="bg-primary-500 text-white px-3 py-2 rounded-md font-bold text-xl">
                S
              </div>
              <span className="ml-2 text-2xl font-heading font-bold text-primary-500">
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
                className="w-full pl-10 pr-4 py-2 border-2 border-primary-500 rounded-full focus:outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-100"
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

            {/* Sign In / User Account */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                {/* User Menu */}
                <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-md">
                  <User className="h-6 w-6 text-gray-700" />
                  <div className="hidden sm:block">
                    <div className="text-xs text-gray-600">Hello, {user?.name || 'User'}</div>
                    <div className="font-medium text-gray-900">Account</div>
                  </div>
                </div>
                
                {/* Shopster+ Membership Button (only show if not a member) */}
                {!user?.isShopsterPlusMember && (
                  <button
                    onClick={() => navigate('/membership-signup')}
                    className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 shadow-sm"
                    title="Join Shopster+"
                  >
                    <Crown className="h-4 w-4" />
                    <span className="hidden md:block">Try Shopster+</span>
                  </button>
                )}
                
                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 cursor-pointer hover:bg-gray-50 px-2 py-2 rounded-md text-sm text-gray-600"
                  title="Sign Out"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:block">Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                {/* Sign In */}
                <div 
                  className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-md"
                  onClick={handleSignInClick}
                >
                  <User className="h-6 w-6 text-gray-700" />
                  <div className="hidden sm:block">
                    <div className="text-xs text-gray-600">Sign In</div>
                    <div className="font-medium text-gray-900">Account</div>
                  </div>
                </div>
                {/* Sign Up Link */}
                <button
                  onClick={() => navigate('/signup')}
                  className="hidden sm:block text-sm text-primary-500 hover:text-primary-600 font-medium px-2 py-1"
                >
                  Sign Up
                </button>
              </div>
            )}

            {/* Cart */}
            <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-md relative">
              <ShoppingCart className="h-6 w-6 text-gray-700" />
              <div className="hidden sm:block">
                <div className="text-xs text-gray-600">$0.00</div>
              </div>
              {/* Cart badge */}
              <div className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
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
              placeholder="Search everything at Shopster"
              className="w-full pl-10 pr-4 py-2 border-2 border-primary-500 rounded-full focus:outline-none focus:border-primary-600"
            />
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-primary-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center space-x-8">
              <button className="flex items-center space-x-2 hover:bg-primary-600 px-3 py-2 rounded-md">
                <Menu className="h-4 w-4" />
                <span className="text-sm font-medium">Departments</span>
              </button>
              <a href="#" className="text-sm hover:text-accent-200 hidden sm:block">
                Services
              </a>
              <a href="#" className="text-sm hover:text-accent-200 hidden md:block">
                Grocery & Essentials
              </a>
              <a href="#" className="text-sm hover:text-accent-200 hidden lg:block">
                Fashion
              </a>
              <a href="#" className="text-sm hover:text-accent-200 hidden lg:block">
                Home
              </a>
              <a href="#" className="text-sm hover:text-accent-200 hidden lg:block">
                Electronics
              </a>
              <a href="#" className="text-sm hover:text-accent-200 hidden xl:block">
                Auto & Tires
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-accent-200 hidden sm:block">
                Special Deals
              </span>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;