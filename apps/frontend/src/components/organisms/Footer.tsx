import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-walmart-blue-500 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <div className="bg-white text-walmart-blue-500 px-3 py-2 rounded-md font-bold text-xl mr-3">
                S
              </div>
              <span className="text-2xl font-bold">hopster</span>
            </div>
            <p className="text-blue-100 mb-6 max-w-md">
              Shop smart. Shop Shopster. Browse thousands of products with free shipping, 
              pickup, and delivery options to fit your busy lifestyle.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center text-blue-100">
                <Phone className="w-4 h-4 mr-3" />
                <span className="text-sm">1-800-WALMART (1-800-925-6278)</span>
              </div>
              <div className="flex items-center text-blue-100">
                <Mail className="w-4 h-4 mr-3" />
                <span className="text-sm">help@walmart.com</span>
              </div>
              <div className="flex items-center text-blue-100">
                <MapPin className="w-4 h-4 mr-3" />
                <span className="text-sm">702 SW 8th Street, Bentonville, AR 72716</span>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="font-semibold mb-3 text-white">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Shop & Browse */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Shop & Browse</h4>
            <ul className="space-y-3 text-blue-100">
              <li><a href="#" className="hover:text-white transition-colors text-sm">All Departments</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-sm">Grocery</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-sm">Electronics</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-sm">Home & Garden</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-sm">Clothing</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-sm">Health & Wellness</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-sm">Auto & Tires</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-sm">Photo Services</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Services</h4>
            <ul className="space-y-3 text-blue-100">
              <li><a href="#" className="hover:text-white transition-colors text-sm">Store Finder</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-sm">Walmart+</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-sm">Pickup & Delivery</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-sm">Money Services</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-sm">Gift Cards</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-sm">Registry</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-sm">Protection Plans</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-sm">Installation Services</a></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Customer Care</h4>
            <ul className="space-y-3 text-blue-100">
              <li><a href="#" className="hover:text-white transition-colors text-sm">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-sm">Track Your Order</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-sm">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-sm">Shipping Info</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-sm">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-sm">Product Care Plans</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-sm">Accessibility</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-sm">Store Feedback</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-walmart-blue-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Legal Links */}
            <div className="flex flex-wrap justify-center md:justify-start items-center space-x-6 text-sm text-blue-100">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-white transition-colors">California Privacy Rights</a>
              <a href="#" className="hover:text-white transition-colors">Your Privacy Choices</a>
              <a href="#" className="hover:text-white transition-colors">Notice at Collection</a>
            </div>

            {/* Copyright */}
            <div className="text-sm text-blue-100">
              © 2024 Walmart Inc. All Rights Reserved.
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-4 pt-4 border-t border-walmart-blue-400">
            <div className="text-center text-xs text-blue-200">
              <p className="mb-1">
                This is a demonstration website built with React, TypeScript, and TailwindCSS
              </p>
              <p>
                Inspired by Walmart's design system • Not affiliated with Walmart Inc.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;