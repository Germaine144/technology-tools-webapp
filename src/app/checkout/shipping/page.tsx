"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

export default function CheckoutShippingPage() {
  const router = useRouter();
  const [selectedShipping, setSelectedShipping] = useState('free');
  const [showDatePicker, setShowDatePicker] = useState(false);
  // FIX: Explicitly set the type to be Date or null. This is the main fix.
  const [scheduledDate, setScheduledDate] = useState<Date | null>(null);

  const shippingOptions = [
    {
      id: 'free',
      title: 'Free',
      description: 'Regularly shipment',
      date: '17 Oct, 2023',
    },
    {
      id: 'express',
      title: '$8.50',
      description: 'Get your delivery as soon as possible',
      date: '1 Oct, 2023',
    },
    {
      id: 'schedule',
      title: 'Schedule',
      description: 'Pick a date when you want to get your delivery',
      date: scheduledDate ? scheduledDate.toLocaleDateString() : null,
      isScheduled: true,
    },
  ];

  const handleShippingSelect = (shippingId: string) => {
    setSelectedShipping(shippingId);
    if (shippingId === 'schedule') {
      setShowDatePicker(true);
    } else {
      setShowDatePicker(false);
    }
  };

  const handleScheduleDate = () => {
    setShowDatePicker((prev) => !prev);
  };

  const handleBack = () => {
    router.push('/checkout');
  };

  const handleNext = () => {
    if (selectedShipping === 'schedule' && !scheduledDate) {
      alert('Please select a delivery date.');
      return;
    }
    router.push('/checkout/payment');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col text-black">
      {/* Progress Steps */}
      <div className="w-full flex justify-center mt-12 mb-10">
        <div className="flex items-center w-[700px]">
          {/* Step 1 */}
          <div className="flex flex-col items-center flex-1">
            <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center bg-white">
              <span className="text-gray-300 text-lg">●</span>
            </div>
            <span className="text-xs text-gray-300 mt-2">Step 1</span>
            <span className="text-sm text-gray-300 font-semibold">Address</span>
          </div>
          <div className="flex-1 h-px bg-gray-200 mx-2"></div>
          {/* Step 2 */}
          <div className="flex flex-col items-center flex-1">
            <div className="w-6 h-6 rounded-full border-2 border-black flex items-center justify-center bg-black">
              <span className="text-white text-lg">●</span>
            </div>
            <span className="text-xs text-black mt-2">Step 2</span>
            <span className="text-sm text-black font-semibold">Shipping</span>
          </div>
          <div className="flex-1 h-px bg-gray-200 mx-2"></div>
          {/* Step 3 */}
          <div className="flex flex-col items-center flex-1">
            <div className="w-6 h-6 rounded-full border-2 border-gray-200 flex items-center justify-center bg-white">
              <span className="text-gray-200 text-lg">●</span>
            </div>
            <span className="text-xs text-gray-200 mt-2">Step 3</span>
            <span className="text-sm text-gray-200 font-semibold">Payment</span>
          </div>
        </div>
      </div>

      {/* Shipping Method */}
      <div className="flex-1 flex flex-col items-center">
        <div className="w-full max-w-2xl">
          <h2 className="text-lg font-bold mb-8 text-[#232360]">Shipment Method</h2>
          <div className="space-y-4 mb-12">
            {shippingOptions.map((option) => (
              <div
                key={option.id}
                className={`flex items-center justify-between border rounded-xl px-6 py-4 cursor-pointer transition-all ${
                  selectedShipping === option.id
                    ? 'border-black'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleShippingSelect(option.id)}
              >
                {/* Radio Button */}
                <div className="flex items-center">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 ${
                      selectedShipping === option.id
                        ? 'border-black'
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedShipping === option.id && (
                      <div className="w-3 h-3 bg-black rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-[#232360]">{option.title}</div>
                    <div className="text-gray-400 text-sm">{option.description}</div>
                  </div>
                </div>
                {/* Date or Select Date */}
                <div className="text-right min-w-[120px]">
                  {option.isScheduled ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleScheduleDate();
                      }}
                      className="text-gray-400 text-sm border border-gray-200 rounded-md px-3 py-1 flex items-center gap-1"
                    >
                      {scheduledDate ? scheduledDate.toLocaleDateString() : 'Select Date'}
                      <span className="ml-1">▼</span>
                    </button>
                  ) : (
                    <span className="text-gray-400 text-sm">{option.date}</span>
                  )}
                </div>
              </div>
            ))}
            {/* Inline Date Picker */}
            {selectedShipping === 'schedule' && showDatePicker && (
              <div className="mt-2 p-4 bg-gray-50 rounded-lg border border-gray-200 w-full flex justify-center">
                <DatePicker
                  selected={scheduledDate}
                  onChange={(date: Date | null) => { // Added type here
                    setScheduledDate(date);
                    setShowDatePicker(false);
                  }}
                  minDate={new Date()}
                  inline
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="w-full flex justify-center mb-12">
        <div className="max-w-2xl w-full flex justify-end gap-4">
          <button
            onClick={handleBack}
            className="px-10 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors font-medium"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="px-10 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}