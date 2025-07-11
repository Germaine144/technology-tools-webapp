"use client";
import React, { useState } from 'react';

export default function PaymentPage() {
  const [tab, setTab] = useState('credit');
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
    <div className="min-h-screen bg-white flex items-center justify-center py-12 text-black">
      <div className="w-full max-w-6xl flex gap-8">
        {/* Summary */}
        <div className="w-1/2 bg-white rounded-xl border border-gray-200 p-8">
          <h2 className="text-xl font-bold mb-6">Summary</h2>
          <div className="space-y-4 mb-6">
            {summary.products.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-contain rounded" />
                  <span className="font-medium text-gray-800">{item.name}</span>
                </div>
                <span className="font-semibold text-gray-900">${item.price}</span>
              </div>
            ))}
          </div>
          <div className="mb-2 text-sm text-gray-500 font-semibold">Address</div>
          <div className="mb-4 text-gray-700">{summary.address}</div>
          <div className="mb-2 text-sm text-gray-500 font-semibold">Shipment method</div>
          <div className="mb-4 text-gray-700">{summary.shipping}</div>
          <div className="flex justify-between font-semibold mb-1">
            <span>Subtotal</span>
            <span>${summary.subtotal}</span>
          </div>
          <div className="flex justify-between text-gray-500 mb-1">
            <span>Estimated Tax</span>
            <span>${summary.tax}</span>
          </div>
          <div className="flex justify-between text-gray-500 mb-1">
            <span>Estimated shipping & Handling</span>
            <span>${summary.shippingFee}</span>
          </div>
          <div className="flex justify-between font-bold text-lg mt-4">
            <span>Total</span>
            <span>${summary.total}</span>
          </div>
        </div>

        {/* Payment */}
        <div className="w-1/2 bg-white rounded-xl p-8">
          <h2 className="text-xl font-bold mb-6">Payment</h2>
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`px-4 py-2 font-medium ${tab === 'credit' ? 'border-b-2 border-black text-black' : 'text-gray-400'}`}
              onClick={() => setTab('credit')}
            >
              Credit Card
            </button>
            <button
              className={`px-4 py-2 font-medium ${tab === 'paypal' ? 'border-b-2 border-black text-black' : 'text-gray-400'}`}
              onClick={() => setTab('paypal')}
            >
              PayPal
            </button>
            <button
              className={`px-4 py-2 font-medium ${tab === 'paypalcredit' ? 'border-b-2 border-black text-black' : 'text-gray-400'}`}
              onClick={() => setTab('paypalcredit')}
            >
              PayPal Credit
            </button>
          </div>
          {/* Card Preview */}
          {tab === 'credit' && (
            <div className="mb-6">
              <div className="w-full max-w-md h-40 bg-black rounded-2xl flex flex-col justify-between p-6 text-white shadow-lg mb-6">
                <div className="flex justify-between items-center">
                  <div className="w-8 h-6 bg-yellow-400 rounded-sm"></div>
                  <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-xl">💳</span>
                  </div>
                </div>
                <div className="text-2xl tracking-widest font-mono">4085 9536 8475 9530</div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Cardholder</span>
                  <span className="text-2xl font-bold text-orange-400">●●</span>
                </div>
              </div>
              {/* Card Form */}
              <form className="space-y-4">
                <input
                  className="w-full border border-gray-200 rounded-lg p-3"
                  placeholder="Cardholder Name"
                  required
                />
                <input
                  className="w-full border border-gray-200 rounded-lg p-3"
                  placeholder="Card Number"
                  required
                />
                <div className="flex gap-4">
                  <input
                    className="w-1/2 border border-gray-200 rounded-lg p-3"
                    placeholder="Exp.Date"
                    required
                  />
                  <input
                    className="w-1/2 border border-gray-200 rounded-lg p-3"
                    placeholder="CVV"
                    required
                  />
                </div>
                <div className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    checked={sameAsBilling}
                    onChange={() => setSameAsBilling(!sameAsBilling)}
                    className="mr-2 w-4 h-4"
                  />
                  <span className="text-sm">Same as billing address</span>
                </div>
              </form>
            </div>
          )}
          {/* PayPal/PayPal Credit Placeholder */}
          {tab !== 'credit' && (
            <div className="mb-6 p-8 bg-gray-50 rounded-lg text-center text-gray-400">
              {tab === 'paypal' ? 'PayPal payment coming soon...' : 'PayPal Credit payment coming soon...'}
            </div>
          )}
          {/* Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              className="flex-1 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors font-medium"
              onClick={() => window.location.assign('/checkout/shipping')}
            >
              Back
            </button>
            <button
              className="flex-1 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 