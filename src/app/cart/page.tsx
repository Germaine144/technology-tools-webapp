'use client';
import React, { useState } from 'react';
import { Minus, Plus, X } from 'lucide-react';
import Link from 'next/link';
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-black">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
          <Link 
            href="/" 
            className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Cart Items Section */}
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-bold mb-6 text-black">Shopping Cart</h1>
            
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center space-x-4">
                    {/* Product Image */}
                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Product Info */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">Quantity: {item.quantity}</p>
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3 text-black">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 rounded-full border border-gray-500 flex items-center justify-center hover:bg-gray-50 text-black">
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 rounded-full border border-gray-500 flex items-center justify-center hover:bg-gray-50 text-black">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {/* Price */}
                    <div className="text-lg font-semibold text-black w-20 text-right">
                      ${item.price.toFixed(2)}
                    </div>
                    
                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-black hover:text-red-500 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Order Summary Section */}
          <div className="lg:col-span-1 text-black">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-8">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              
              {/* Promo Code */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discount code / Promo code
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Code"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    onClick={applyPromoCode}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </div>
              
              {/* Bonus Card */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your bonus card number
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={bonusCard}
                    onChange={(e) => setBonusCard(e.target.value)}
                    placeholder="Enter Card Number"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    onClick={applyBonusCard}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </div>
              
              {/* Order Totals */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Estimated Tax</span>
                  <span>${estimatedTax}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Estimated shipping & Handling</span>
                  <span>${estimatedShipping}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              {/* Checkout Button */}
              <Link href="/checkout" className="block w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 transition-colors font-medium text-center">
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 