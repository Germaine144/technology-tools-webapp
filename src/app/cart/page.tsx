'use client';
import React, { useState } from 'react';
import { Minus, Plus, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image'; // Import the Next.js Image component
import { useCart } from '@/context/CartContext';

export default function ShoppingCartPage() {
  const { cart, removeFromCart, addToCart } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [bonusCard, setBonusCard] = useState('');

  const updateQuantity = (id: number, change: number) => {
    const item = cart.find(item => item.id === id);
    if (item) {
      const newQuantity = Math.max(1, item.quantity + change);
      const updatedItem = { ...item, quantity: newQuantity };
      removeFromCart(id);
      addToCart(updatedItem);
    }
  };

  const removeItem = (id: number) => {
    removeFromCart(id);
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const estimatedTax = 50;
  const estimatedShipping = 29;
  const total = subtotal + estimatedTax + estimatedShipping;

  const applyPromoCode = () => {
    // Handle promo code logic here
    console.log('Applying promo code:', promoCode);
  };

  const applyBonusCard = () => {
    // Handle bonus card logic here
    console.log('Applying bonus card:', bonusCard);
  };

  // Show empty cart message if no items
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-black px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <svg className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
            </svg>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
          {/* FIX: Escaped the apostrophe in "haven't" */}
          <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">Looks like you haven&apos;t added any items to your cart yet.</p>
          <Link 
            href="/" 
            className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm sm:text-base"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          
          {/* Cart Items Section */}
          <div className="lg:col-span-2">
            <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-black">Shopping Cart</h1>
            
            <div className="space-y-3 sm:space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                    
                    {/* Product Image and Info - Mobile Layout */}
                    <div className="flex items-center space-x-3 sm:space-x-4 flex-1">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        {/* FIX: Replaced <img> with the optimized Next.js <Image> component */}
                        <Image 
                          src={item.image} 
                          alt={item.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{item.name}</h3>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    
                    {/* Controls Row - Mobile/Desktop */}
                    <div className="flex items-center justify-between sm:justify-end sm:space-x-3">
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2 sm:space-x-3 text-black">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gray-500 flex items-center justify-center hover:bg-gray-50 text-black">
                          <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                        <span className="w-6 sm:w-8 text-center font-medium text-sm sm:text-base">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gray-500 flex items-center justify-center hover:bg-gray-50 text-black">
                          <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                      
                      {/* Price */}
                      <div className="text-base sm:text-lg font-semibold text-black sm:w-20 text-right">
                        ${item.price.toFixed(2)}
                      </div>
                      
                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 sm:p-2 text-black hover:text-red-500 transition-colors ml-2 sm:ml-0"
                      >
                        <X className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Order Summary Section */}
          <div className="lg:col-span-1 text-black mt-6 lg:mt-0">
            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm lg:sticky lg:top-8">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Order Summary</h2>
              
              {/* Promo Code */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discount code / Promo code
                </label>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Code"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  />
                  <button
                    onClick={applyPromoCode}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm sm:text-base whitespace-nowrap"
                  >
                    Apply
                  </button>
                </div>
              </div>
              
              {/* Bonus Card */}
              <div className="mb-4 sm:mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your bonus card number
                </label>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <input
                    type="text"
                    value={bonusCard}
                    onChange={(e) => setBonusCard(e.target.value)}
                    placeholder="Enter Card Number"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  />
                  <button
                    onClick={applyBonusCard}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm sm:text-base whitespace-nowrap"
                  >
                    Apply
                  </button>
                </div>
              </div>
              
              {/* Order Totals */}
              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                <div className="flex justify-between text-gray-600 text-sm sm:text-base">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 text-sm sm:text-base">
                  <span>Estimated Tax</span>
                  <span>${estimatedTax}</span>
                </div>
                <div className="flex justify-between text-gray-600 text-sm sm:text-base">
                  <span>Estimated shipping & Handling</span>
                  <span>${estimatedShipping}</span>
                </div>
                <div className="border-t pt-2 sm:pt-3">
                  <div className="flex justify-between text-base sm:text-lg font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              {/* Checkout Button */}
              <Link href="/checkout" className="block w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 transition-colors font-medium text-center text-sm sm:text-base">
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}