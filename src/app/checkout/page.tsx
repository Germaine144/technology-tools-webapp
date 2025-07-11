"use client";
import React, { useState } from "react";
import { Edit, X, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import AddressForm from '@/components/AddressForm';

const initialAddresses = [
  {
    id: "home",
    name: "2118 Thornridge",
    label: "HOME",
    fullAddress: "2118 Thornridge Cir. Syracuse, Connecticut 35624",
    phone: "(209) 555-0104"
  },
  {
    id: "office",
    name: "Headoffice",
    label: "OFFICE",
    fullAddress: "2715 Ash Dr. San Jose, South Dakota 83475",
    phone: "(704) 555-0127"
  }
];

export default function AddressPage() {
  const router = useRouter();
  const [addresses, setAddresses] = useState(initialAddresses);
  const [selectedAddress, setSelectedAddress] = useState(addresses[0]?.id || "");
  const [showForm, setShowForm] = useState(false);

  const handleAddressSelect = (addressId: string) => {
    setSelectedAddress(addressId);
  };

  const handleEditAddress = (addressId: string) => {
    // For demo, just alert. You can add a modal for editing if needed.
    alert("Edit address: " + addressId);
  };

  const handleDeleteAddress = (addressId: string) => {
    setAddresses(addresses.filter(addr => addr.id !== addressId));
    if (selectedAddress === addressId && addresses.length > 1) {
      setSelectedAddress(addresses.find(addr => addr.id !== addressId)?.id || "");
    }
  };

  const handleAddAddress = (newAddress: any) => {
    setAddresses([...addresses, { ...newAddress, id: Date.now(), label: "HOME" }]);
    setShowForm(false);
  };

  const handleBack = () => {
    router.push("/cart"); // Or your cart route
  };

  const handleNext = () => {
    if (!selectedAddress) {
      alert("Please select an address.");
      return;
    }
    router.push("/checkout/shipping");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white text-black">
      {/* Progress Stepper */}
      <div className="w-full flex justify-center mt-12 mb-10">
        <div className="flex items-center w-[700px]">
          {/* Step 1 */}
          <div className="flex flex-col items-center flex-1">
            <div className="w-6 h-6 rounded-full border-2 border-black flex items-center justify-center bg-black">
              <span className="text-white text-lg">●</span>
            </div>
            <span className="text-xs text-black mt-2">Step 1</span>
            <span className="text-sm text-black font-semibold">Address</span>
          </div>
          <div className="flex-1 h-px bg-gray-200 mx-2"></div>
          {/* Step 2 */}
          <div className="flex flex-col items-center flex-1">
            <div className="w-6 h-6 rounded-full border-2 border-gray-200 flex items-center justify-center bg-white">
              <span className="text-gray-200 text-lg">●</span>
            </div>
            <span className="text-xs text-gray-200 mt-2">Step 2</span>
            <span className="text-sm text-gray-200 font-semibold">Shipping</span>
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
      {/* Address Selection */}
      <div className="w-full max-w-3xl border border-dotted border-blue-400 rounded-lg p-6 mb-12">
        <h2 className="text-lg font-bold mb-6">Select Address</h2>
        <div className="space-y-6 mb-6">
          {addresses.map((address) => (
            <div 
              key={address.id}
              className="bg-gray-50 rounded-lg flex items-start justify-between p-6 relative"
            >
              <div className="flex items-start space-x-4">
                {/* Radio Button */}
                <div className="mt-1">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                      selectedAddress === address.id ? 'border-black' : 'border-gray-300'
                    }`}
                    onClick={() => handleAddressSelect(address.id)}
                  >
                    {selectedAddress === address.id && (
                      <div className="w-3 h-3 bg-black rounded-full"></div>
                    )}
                  </div>
                </div>
                {/* Address Info */}
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{address.name}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded ${
                      address.label === 'HOME' ? 'bg-gray-900 text-white' : 'bg-gray-600 text-white'
                    }`}>
                      {address.label}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-1">{address.fullAddress}</p>
                  <p className="text-gray-500 text-sm">{address.phone}</p>
                </div>
              </div>
              {/* Action Buttons */}
              <div className="flex items-center space-x-2 absolute top-4 right-4">
                <button onClick={() => handleEditAddress(address.id)} className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => handleDeleteAddress(address.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Add New Address Button */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setShowForm(true)}
            className="flex flex-col items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center">
              <Plus className="w-4 h-4" />
            </div>
            <span className="mt-1 text-sm font-medium">Add New Address</span>
          </button>
        </div>
      </div>
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
            <AddressForm onSave={handleAddAddress} onCancel={() => setShowForm(false)} />
          </div>
        </div>
      )}
      {/* Navigation Buttons */}
      <div className="w-full max-w-3xl flex justify-end gap-4">
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
  );
} 