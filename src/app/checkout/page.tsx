"use client";
import React, { useState } from "react";
import { Edit, X, Plus, ChevronLeft } from "lucide-react";
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
    const addressToEdit = addresses.find(addr => addr.id === addressId);
    if (addressToEdit) {
      // For now, we'll just show an alert with the address details
      // In a real implementation, you would open a modal with the form pre-filled
      alert(`Editing address: ${addressToEdit.name}\n${addressToEdit.fullAddress}\nPhone: ${addressToEdit.phone}\nLabel: ${addressToEdit.label}`);
    }
  };

  const handleToggleLabel = (addressId: string) => {
    setAddresses(addresses.map(addr => 
      addr.id === addressId 
        ? { ...addr, label: addr.label === 'HOME' ? 'OFFICE' : 'HOME' }
        : addr
    ));
  };

  const handleDeleteAddress = (addressId: string) => {
    if (addresses.length === 1) {
      alert("You must have at least one address.");
      return;
    }
    
    setAddresses(addresses.filter(addr => addr.id !== addressId));
    if (selectedAddress === addressId) {
      const remainingAddresses = addresses.filter(addr => addr.id !== addressId);
      setSelectedAddress(remainingAddresses[0]?.id || "");
    }
  };

  const handleAddAddress = (newAddress: any) => {
    console.log('Received address data:', newAddress); // Debug log
    
    const newId = Date.now().toString();
    // Transform form data to match address structure
    const streetWords = newAddress.street.split(' ');
    const addressName = streetWords.length >= 2 
      ? streetWords[0] + ' ' + streetWords[1] 
      : newAddress.street;
      
    const formattedAddress = {
      id: newId,
      name: addressName,
      label: newAddress.label || "HOME",
      fullAddress: `${newAddress.street}, ${newAddress.city}, ${newAddress.state} ${newAddress.zipCode}, ${newAddress.country}`,
      phone: newAddress.phone
    };
    
    console.log('Formatted address:', formattedAddress); // Debug log
    setAddresses([...addresses, formattedAddress]);
    setShowForm(false);
  };

  const handleBack = () => {
    router.push("/cart");
  };

  const handleNext = () => {
    if (!selectedAddress) {
      alert("Please select an address.");
      return;
    }
    router.push("/checkout/shipping");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-4 sm:py-6 lg:py-8 max-w-4xl">
        {/* Mobile Header */}
        <div className="flex items-center justify-between mb-6 sm:hidden">
          <button
            onClick={handleBack}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back
          </button>
          <h1 className="text-lg font-semibold">Select Address</h1>
          <div className="w-12"></div> {/* Spacer */}
        </div>

        {/* Progress Stepper */}
        <div className="w-full flex justify-center mb-8 sm:mb-12">
          <div className="flex items-center w-full max-w-2xl">
            {/* Step 1 */}
            <div className="flex flex-col items-center flex-1">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-black flex items-center justify-center bg-black">
                <span className="text-white text-sm sm:text-base">●</span>
              </div>
              <span className="text-xs text-gray-600 mt-2 hidden sm:block">Step 1</span>
              <span className="text-sm sm:text-base text-black font-semibold mt-1">Address</span>
            </div>
            <div className="flex-1 h-px bg-gray-300 mx-2 sm:mx-4"></div>
            
            {/* Step 2 */}
            <div className="flex flex-col items-center flex-1">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-gray-300 flex items-center justify-center bg-white">
                <span className="text-gray-300 text-sm sm:text-base">●</span>
              </div>
              <span className="text-xs text-gray-400 mt-2 hidden sm:block">Step 2</span>
              <span className="text-sm sm:text-base text-gray-400 font-semibold mt-1">Shipping</span>
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

        {/* Address Selection Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6 sm:mb-8">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Select Address</h2>
          </div>
          
          <div className="p-4 sm:p-6">
            <div className="space-y-4 sm:space-y-6">
              {addresses.map((address) => (
                <div 
                  key={address.id}
                  className={`relative bg-gray-50 rounded-lg border-2 transition-all duration-200 ${
                    selectedAddress === address.id 
                      ? 'border-black bg-blue-50' 
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <div className="p-4 sm:p-6">
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      {/* Radio Button */}
                      <div className="mt-1 flex-shrink-0">
                        <div
                          className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center cursor-pointer transition-colors ${
                            selectedAddress === address.id 
                              ? 'border-black bg-black' 
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                          onClick={() => handleAddressSelect(address.id)}
                        >
                          {selectedAddress === address.id && (
                            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full"></div>
                          )}
                        </div>
                      </div>
                      
                      {/* Address Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-2">
                          <h3 className="font-semibold text-gray-900 text-base sm:text-lg">{address.name}</h3>
                          <button
                            onClick={() => handleToggleLabel(address.id)}
                            className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full mt-1 sm:mt-0 w-fit hover:opacity-80 transition-opacity cursor-pointer ${
                              address.label === 'HOME' 
                                ? 'bg-gray-900 text-white' 
                                : 'bg-blue-600 text-white'
                            }`}
                            title={`Click to change to ${address.label === 'HOME' ? 'OFFICE' : 'HOME'}`}
                          >
                            {address.label === 'HOME' ? '🏠' : '🏢'} {address.label}
                          </button>
                        </div>
                        <p className="text-gray-700 text-sm sm:text-base mb-1 leading-relaxed">{address.fullAddress}</p>
                        <p className="text-gray-500 text-sm">{address.phone}</p>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                        <button 
                          onClick={() => handleEditAddress(address.id)} 
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                          aria-label="Edit address"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteAddress(address.id)} 
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                          aria-label="Delete address"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Add New Address Button */}
            <div className="flex justify-center mt-6 sm:mt-8">
              <button
                onClick={() => setShowForm(true)}
                className="flex flex-col items-center text-gray-600 hover:text-black transition-colors p-4 rounded-lg hover:bg-gray-50"
              >
                <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center mb-2 hover:bg-gray-800 transition-colors">
                  <Plus className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">Add New Address</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal for Add Address Form */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="relative">
                <button
                  onClick={() => setShowForm(false)}
                  className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <AddressForm onSave={handleAddAddress} onCancel={() => setShowForm(false)} />
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-end">
          <button
            onClick={handleBack}
            className="w-full sm:w-auto order-2 sm:order-1 px-6 sm:px-10 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors font-medium"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="w-full sm:w-auto order-1 sm:order-2 px-6 sm:px-10 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!selectedAddress}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}