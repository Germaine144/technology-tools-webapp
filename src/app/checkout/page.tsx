"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

// Define type for shipping options
type ShippingOption = {
  id: string;
  title: string;
  description: string;
  price?: string;
  date?: string | null;
  isScheduled?: boolean;
};

export default function ShippingPage() {
  const router = useRouter();
  const [shippingMethod, setShippingMethod] = useState('free');
  const [scheduledDate, setScheduledDate] = useState<Date | null>(null);

  const shippingOptions: ShippingOption[] = [
    {
      id: 'free',
      title: 'Free Shipping',
      description: 'Get your order in 5-7 business days',
      price: '$0.00',
    },
    {
      id: 'express',
      title: 'Express Shipping',
      description: 'Get your order in 1-2 business days',
      price: '$15.00',
    },
    {
      id: 'schedule',
      title: 'Schedule',
      description: 'Pick a date when you want to get your delivery',
      date: scheduledDate ? scheduledDate.toLocaleDateString() : null,
      isScheduled: true,
    },
  ];

  const handleBack = () => {
    router.push("/checkout");
  };

  const handleNext = () => {
    if (!shippingMethod) {
      alert("Please select a shipping method.");
      return;
    }
    if (shippingMethod === 'schedule' && !scheduledDate) {
      alert("Please select a date for scheduled delivery.");
      return;
    }
    router.push("/checkout/payment");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-4 sm:py-6 lg:py-8 max-w-4xl">
        {/* Mobile Header */}
        <div className="flex items-center justify-between mb-6 sm:hidden">
          <button onClick={handleBack} className="flex items-center text-gray-600 hover:text-gray-800 transition-colors">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back
          </button>
          <h1 className="text-lg font-semibold">Shipping</h1>
          <div className="w-12" />
        </div>

        {/* Progress Stepper */}
        <div className="w-full flex justify-center mb-8 sm:mb-12">
          <div className="flex items-center w-full max-w-2xl">
            {/* Step 1 */}
            <div className="flex flex-col items-center flex-1">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-black flex items-center justify-center bg-black">
                <span className="text-white text-sm sm:text-base">✓</span>
              </div>
              <span className="text-xs text-gray-400 mt-2 hidden sm:block">Step 1</span>
              <Link href="/checkout" className="text-sm sm:text-base text-gray-400 font-semibold mt-1 hover:text-black">Address</Link>
            </div>
            <div className="flex-1 h-px bg-black mx-2 sm:mx-4"></div>

            {/* Step 2 */}
            <div className="flex flex-col items-center flex-1">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-black flex items-center justify-center bg-black">
                <span className="text-white text-sm sm:text-base">●</span>
              </div>
              <span className="text-xs text-gray-600 mt-2 hidden sm:block">Step 2</span>
              <span className="text-sm sm:text-base text-black font-semibold mt-1">Shipping</span>
            </div>
            <div className="flex-1 h-px bg-gray-300 mx-2 sm:mx-4"></div>

            {/* Step 3 */}
            <div className="flex flex-col items-center flex-1">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-gray-300 flex items-center justify-center bg-white">
                <span className="text-gray-300 text-sm sm:text-base">●</span>
              </div>
              <span className="text-xs text-gray-400 mt-2 hidden sm:block">Step 3</span>
              <span className="text-sm sm:text-base text-gray-400 font-semibold mt-1">Payment</span>
            </div>
          </div>
        </div>

        {/* Shipping Method Selection */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6 sm:mb-8">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Select Shipping Method</h2>
          </div>
          <div className="p-4 sm:p-6 space-y-4">
            {shippingOptions.map((option) => (
              <div key={option.id} onClick={() => setShippingMethod(option.id)}
                className={`p-4 sm:p-5 border-2 rounded-lg cursor-pointer transition-all duration-200 ${shippingMethod === option.id ? 'border-black bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                <div className="flex items-start">
                  <div className="mt-1 flex-shrink-0">
                    <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center ${shippingMethod === option.id ? 'border-black bg-black' : 'border-gray-300'}`}>
                      {shippingMethod === option.id && <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full"></div>}
                    </div>
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-gray-900 text-base sm:text-lg">{option.title}</h3>
                      {option.price && (
                        <p className="font-semibold text-gray-800 text-sm sm:text-base">{option.price}</p>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mt-1">{option.description}</p>
                    {option.isScheduled && (
                      <div className="mt-3">
                        <input
                          type="date"
                          onChange={(e) => setScheduledDate(new Date(e.target.value))}
                          className="p-2 border border-gray-300 rounded-md text-sm w-full sm:w-auto"
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-end">
          <button onClick={handleBack} className="w-full sm:w-auto order-2 sm:order-1 px-6 sm:px-10 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors font-medium">
            Back
          </button>
          <button onClick={handleNext} className="w-full sm:w-auto order-1 sm:order-2 px-6 sm:px-10 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
