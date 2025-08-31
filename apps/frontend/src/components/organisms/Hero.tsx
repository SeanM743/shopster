import React from 'react';
import { ChevronRight, Star, Truck, Shield, CreditCard } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Main Hero Banner */}
      <section className="relative bg-gradient-to-r from-primary-500 to-primary-600 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black opacity-10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center bg-accent-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
                <Star className="w-4 h-4 mr-2" />
                Save more every day
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-heading font-bold mb-6">
                Shop Smart.
                <br />
                <span className="text-accent-200">Shop Shopster.</span>
              </h1>
              
              <p className="text-xl text-primary-100 mb-8 max-w-md mx-auto lg:mx-0">
                Shop thousands of products with free shipping, pickup, and delivery options.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-colors flex items-center justify-center">
                  Shop Now
                  <ChevronRight className="w-5 h-5 ml-2" />
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:text-primary-500 px-8 py-4 rounded-full font-bold text-lg transition-colors">
                  Browse Deals
                </button>
              </div>
            </div>
            
            {/* Right Content - Feature Highlights */}
            <div className="hidden lg:block">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8">
                <h3 className="text-2xl font-heading font-bold mb-6 text-center">Why Shop With Us?</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-accent-500 p-3 rounded-full">
                      <Truck className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Free Shipping</h4>
                      <p className="text-primary-100 text-sm">On orders $35+</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-accent-500 p-3 rounded-full">
                      <Shield className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Money Back Guarantee</h4>
                      <p className="text-primary-100 text-sm">100% satisfaction</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-accent-500 p-3 rounded-full">
                      <CreditCard className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Secure Payment</h4>
                      <p className="text-primary-100 text-sm">Protected transactions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary Promotional Banners */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Promo 1 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4">
                <div className="text-sm font-bold mb-1">ROLLBACK DEALS</div>
                <div className="text-lg font-bold">Up to 50% Off</div>
              </div>
              <div className="p-4">
                <p className="text-gray-700 text-sm mb-3">Electronics, home essentials, and more</p>
                <button className="text-primary-500 font-semibold text-sm hover:underline">
                  Shop Rollbacks →
                </button>
              </div>
            </div>

            {/* Promo 2 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4">
                <div className="text-sm font-bold mb-1">GROCERY PICKUP</div>
                <div className="text-lg font-bold">Free Same Day</div>
              </div>
              <div className="p-4">
                <p className="text-gray-700 text-sm mb-3">Order online, pickup curbside</p>
                <button className="text-primary-500 font-semibold text-sm hover:underline">
                  Order Groceries →
                </button>
              </div>
            </div>

            {/* Promo 3 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-4">
                <div className="text-sm font-bold mb-1">SHOPSTER+</div>
                <div className="text-lg font-bold">Try Free 30 Days</div>
              </div>
              <div className="p-4">
                <p className="text-gray-700 text-sm mb-3">Free shipping, fuel discounts & more</p>
                <button className="text-primary-500 font-semibold text-sm hover:underline">
                  Start Free Trial →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-6 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2 mb-2">
              <Truck className="w-4 h-4" />
              <span>Free shipping on orders $35+</span>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="w-4 h-4" />
              <span>Shop with confidence</span>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <Star className="w-4 h-4" />
              <span>Trusted by millions</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;