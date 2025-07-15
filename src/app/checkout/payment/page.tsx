"use client";
import React, { useState } from 'react';

export default function PaymentPage() {
  const [tab, setTab] = useState('credit');
  const [momoProvider, setMomoProvider] = useState('mtn');
  const [sameAsBilling, setSameAsBilling] = useState(true);

  // Dummy summary data
  const summary = {
    products: [
      { name: 'Apple iPhone 14 Pro Max 128Gb', price: 1399, image: '/image/Iphone 14 pro 1.png' },
      { name: 'AirPods Max Silver', price: 549, image: '/image/image 7.png' },
      { name: 'Apple Watch Series 9 GPS 41mm', price: 399, image: '/image/watch.png' },
    ],
    address: '1131 Dusty Townline, Jacksonville, TX 40322',
    shipping: 'Free',
    subtotal: 2347,
    tax: 50,
    shippingFee: 29,
    total: 2426,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-4 sm:py-8 sm:px-6 lg:py-12 lg:px-8 text-black">
      <div className="w-full max-w-7xl mx-auto">
        {/* Mobile Header */}
        <div className="lg:hidden mb-6">
          <h1 className="text-2xl font-bold text-center">Checkout</h1>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Summary Section */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 lg:p-8 shadow-sm">
              <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Order Summary</h2>
              
              {/* Products */}
              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                {summary.products.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-gray-50 rounded-lg p-3 sm:p-4">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded flex-shrink-0 flex items-center justify-center">
                        <span className="text-xs sm:text-sm text-gray-500">IMG</span>
                      </div>
                      <span className="font-medium text-gray-800 text-sm sm:text-base truncate">{item.name}</span>
                    </div>
                    <span className="font-semibold text-gray-900 text-sm sm:text-base ml-2">${item.price}</span>
                  </div>
                ))}
              </div>
              
              {/* Address */}
              <div className="mb-4">
                <div className="mb-2 text-xs sm:text-sm text-gray-500 font-semibold uppercase tracking-wide">Shipping Address</div>
                <div className="text-sm sm:text-base text-gray-700">{summary.address}</div>
              </div>
              
              {/* Shipping Method */}
              <div className="mb-6">
                <div className="mb-2 text-xs sm:text-sm text-gray-500 font-semibold uppercase tracking-wide">Shipment Method</div>
                <div className="text-sm sm:text-base text-gray-700">{summary.shipping}</div>
              </div>
              
              {/* Order Totals */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-sm sm:text-base mb-2">
                  <span>Subtotal</span>
                  <span>${summary.subtotal}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base text-gray-500 mb-2">
                  <span>Estimated Tax</span>
                  <span>${summary.tax}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base text-gray-500 mb-4">
                  <span>Estimated Shipping & Handling</span>
                  <span>${summary.shippingFee}</span>
                </div>
                <div className="flex justify-between font-bold text-lg sm:text-xl border-t border-gray-200 pt-4">
                  <span>Total</span>
                  <span>${summary.total}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 lg:p-8 shadow-sm">
              <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Payment</h2>
              
              {/* Payment Method Tabs */}
              <div className="flex border-b border-gray-200 mb-6 -mx-1 overflow-x-auto">
                <button
                  className={`flex-shrink-0 px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-colors ${
                    tab === 'credit' 
                      ? 'border-b-2 border-black text-black' 
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                  onClick={() => setTab('credit')}
                >
                  Credit Card
                </button>
                <button
                  className={`flex-shrink-0 px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-colors ${
                    tab === 'momo' 
                      ? 'border-b-2 border-black text-black' 
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                  onClick={() => setTab('momo')}
                >
                  Mobile Money
                </button>
                <button
                  className={`flex-shrink-0 px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-colors ${
                    tab === 'paypal' 
                      ? 'border-b-2 border-black text-black' 
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                  onClick={() => setTab('paypal')}
                >
                  PayPal
                </button>
                <button
                  className={`flex-shrink-0 px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-colors ${
                    tab === 'paypalcredit' 
                      ? 'border-b-2 border-black text-black' 
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                  onClick={() => setTab('paypalcredit')}
                >
                  PayPal Credit
                </button>
              </div>
              
              {/* Credit Card Form */}
              {tab === 'credit' && (
                <div className="mb-6">
                  {/* Mastercard Preview */}
                  <div className="w-full max-w-sm mx-auto sm:mx-0 h-32 sm:h-40 bg-gradient-to-br from-red-600 via-orange-500 to-yellow-400 rounded-2xl flex flex-col justify-between p-4 sm:p-6 text-white shadow-lg mb-6">
                    <div className="flex justify-between items-center">
                      <div className="w-6 h-4 sm:w-8 sm:h-6 bg-yellow-300 rounded-sm"></div>
                      <div className="flex items-center">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-500 rounded-full opacity-90"></div>
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-400 rounded-full -ml-2 sm:-ml-3"></div>
                      </div>
                    </div>
                    <div className="text-lg sm:text-2xl tracking-wider sm:tracking-widest font-mono">5555 4444 3333 2222</div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm">JOHN DOE</span>
                      <span className="text-xs sm:text-sm font-bold">MASTERCARD</span>
                    </div>
                  </div>
                  
                  {/* Card Form */}
                  <div className="space-y-4">
                    <input
                      className="w-full border border-gray-200 rounded-lg p-3 text-sm sm:text-base focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                      placeholder="Cardholder Name"
                      required
                    />
                    <input
                      className="w-full border border-gray-200 rounded-lg p-3 text-sm sm:text-base focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                      placeholder="Card Number"
                      required
                    />
                    <div className="flex gap-4">
                      <input
                        className="w-1/2 border border-gray-200 rounded-lg p-3 text-sm sm:text-base focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                        placeholder="MM/YY"
                        required
                      />
                      <input
                        className="w-1/2 border border-gray-200 rounded-lg p-3 text-sm sm:text-base focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                        placeholder="CVV"
                        required
                      />
                    </div>
                    <div className="flex items-center mt-4">
                      <input
                        type="checkbox"
                        checked={sameAsBilling}
                        onChange={() => setSameAsBilling(!sameAsBilling)}
                        className="mr-3 w-4 h-4 text-black focus:ring-black rounded"
                      />
                      <span className="text-sm sm:text-base text-gray-700">Same as billing address</span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Mobile Money Form */}
              {tab === 'momo' && (
                <div className="mb-6">
                  {/* MoMo Provider Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Select Mobile Money Provider</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        className={`p-4 rounded-lg border-2 transition-all ${
                          momoProvider === 'mtn' 
                            ? 'border-yellow-400 bg-yellow-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setMomoProvider('mtn')}
                      >
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mb-2">
                            <span className="text-white font-bold text-lg">MTN</span>
                          </div>
                          <span className="text-sm font-medium">MTN MoMo</span>
                        </div>
                      </button>
                      <button
                        className={`p-4 rounded-lg border-2 transition-all ${
                          momoProvider === 'airtel' 
                            ? 'border-red-500 bg-red-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setMomoProvider('airtel')}
                      >
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mb-2">
                            <span className="text-white font-bold text-lg">A</span>
                          </div>
                          <span className="text-sm font-medium">Airtel Money</span>
                        </div>
                      </button>
                    </div>
                  </div>
                  
                  {/* MoMo Form */}
                  <div className="space-y-4">
                    <input
                      className="w-full border border-gray-200 rounded-lg p-3 text-sm sm:text-base focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                      placeholder="Phone Number (e.g., 250788123456)"
                      required
                    />
                    <input
                      className="w-full border border-gray-200 rounded-lg p-3 text-sm sm:text-base focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                      placeholder="Full Name"
                      required
                    />
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <span className="text-blue-500 text-lg">ℹ️</span>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-blue-700">
                            You'll receive a payment request on your phone. Please approve it to complete the transaction.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* PayPal/PayPal Credit Placeholder */}
              {(tab === 'paypal' || tab === 'paypalcredit') && (
                <div className="mb-6 p-6 sm:p-8 bg-gray-50 rounded-lg text-center text-gray-400">
                  <div className="text-4xl sm:text-6xl mb-4">
                    {tab === 'paypal' ? '💳' : '🏦'}
                  </div>
                  <div className="text-sm sm:text-base">
                    {tab === 'paypal' ? 'PayPal payment coming soon...' : 'PayPal Credit payment coming soon...'}
                  </div>
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
                <button
                  className="w-full sm:flex-1 py-3 sm:py-4 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors font-medium text-sm sm:text-base"
                  onClick={() => window.location.assign('/checkout/shipping')}
                >
                  Back
                </button>
                <button
                  className="w-full sm:flex-1 py-3 sm:py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm sm:text-base"
                >
                  Pay ${summary.total}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}