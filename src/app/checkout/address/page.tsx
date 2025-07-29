"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios"; // Correctly import your new API instance

// Address type definition
interface Address {
  id: number;
  street: string;
  city: string;
  zipCode: string;
  country: string;
  phone: string;
  label?: string;
}

export default function AddressPage() {
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressForm, setAddressForm] = useState<Partial<Address>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  // Fetch addresses on mount
  useEffect(() => {
    // This initial check prevents an unnecessary API call if the user is clearly not logged in.
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push('/login');
      return;
    }
    
    // Use the 'api' instance. Headers are added automatically by the interceptor.
    api.get("/addresses")
      .then((res) => {
        setAddresses(res.data);
      })
      .catch((_err) => {
        // The interceptor handles 401 errors by redirecting.
        // This log will only show for other network errors (e.g., 500 server error).
        console.error("Failed to fetch addresses. This should not be a 401 error if the interceptor is working correctly.", _err);
      });
  }, [router]); // Added router to dependency array as it's used inside the effect

  // Address form handlers
  const handleAddressFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Use 'api' instance. Headers are added automatically.
      const res = await api.post("/addresses", addressForm);
      setAddresses((prev) => [...prev, res.data]);
      setShowAddressForm(false);
      setAddressForm({});
    } catch {
      alert("Failed to add address. Please try again.");
    }
  };

  const handleEditAddress = (address: Address) => {
    setIsEditing(true);
    setEditId(address.id);
    setAddressForm(address);
    setShowAddressForm(true);
  };

  const handleUpdateAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Use 'api' instance. Headers are added automatically.
      const res = await api.put(`/addresses/${editId}`, addressForm);
      setAddresses((prev) => prev.map((addr) => (addr.id === editId ? res.data : addr)));
      setShowAddressForm(false);
      setIsEditing(false);
      setEditId(null);
      setAddressForm({});
    } catch {
      alert("Failed to update address");
    }
  };

  const handleDeleteAddress = async (id: number) => {
    try {
      // Use 'api' instance. Headers are added automatically.
      await api.delete(`/addresses/${id}`);
      setAddresses((prev) => prev.filter((addr) => addr.id !== id));
      if (selectedAddressId === id) setSelectedAddressId(null);
    } catch {
      alert("Failed to delete address");
    }
  };

  const handleNext = () => {
    if (!selectedAddressId) {
      alert("Please select an address.");
      return;
    }
    // You can navigate to the next step of the checkout flow
    router.push("/checkout/shipping"); 
  };

  // The JSX for rendering the component remains the same.
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-4 sm:py-6 lg:py-8 max-w-4xl">
        {/* Stepper */}
        <div className="w-full flex justify-center mb-8 sm:mb-12">
          <div className="flex items-center w-full max-w-2xl">
            {/* Step 1 - Active */}
            <div className="flex flex-col items-center flex-1">
              <div className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center bg-black">
                <span className="text-white font-bold">1</span>
              </div>
              <span className="text-sm text-black font-semibold mt-1">Address</span>
            </div>
            <div className="flex-1 h-px bg-gray-300 mx-4"></div>
            {/* Step 2 - Inactive */}
            <div className="flex flex-col items-center flex-1">
              <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center bg-white">
                <span className="text-gray-400 font-bold">2</span>
              </div>
              <span className="text-sm text-gray-400 font-semibold mt-1">Shipping</span>
            </div>
            <div className="flex-1 h-px bg-gray-300 mx-4"></div>
            {/* Step 3 - Inactive */}
            <div className="flex flex-col items-center flex-1">
              <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center bg-white">
                <span className="text-gray-400 font-bold">3</span>
              </div>
              <span className="text-sm text-gray-400 font-semibold mt-1">Payment</span>
            </div>
          </div>
        </div>
        
        {/* Address Selection Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6 sm:mb-8 p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Select Address</h2>
          {addresses.length === 0 && !showAddressForm && (
            <p className="mb-4 text-gray-500">No addresses found. Please add one to continue.</p>
          )}
          <div className="space-y-4 mb-6">
            {addresses.map((addr) => (
              <div key={addr.id} className={`flex items-center justify-between border rounded-xl px-6 py-4 cursor-pointer ${selectedAddressId === addr.id ? "border-black bg-blue-50" : "border-gray-200 hover:border-gray-300"}`} onClick={() => setSelectedAddressId(addr.id)}>
                <div className="flex items-center gap-4">
                  <input type="radio" name="selectedAddress" checked={selectedAddressId === addr.id} readOnly className="w-5 h-5 accent-black"/>
                  <div>
                    <div className="font-semibold text-lg text-gray-900 flex items-center gap-2">
                      {addr.street} {addr.label && <span className="ml-2 px-2 py-1 text-xs rounded bg-black text-white">{addr.label}</span>}
                    </div>
                    <div className="text-gray-700">{addr.city}, {addr.country} {addr.zipCode}</div>
                    <div className="text-gray-500 text-sm">{addr.phone}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={(e) => { e.stopPropagation(); handleEditAddress(addr); }} className="p-2 hover:bg-gray-100 rounded" title="Edit"><span role="img" aria-label="edit">✏️</span></button>
                  <button onClick={(e) => { e.stopPropagation(); handleDeleteAddress(addr.id); }} className="p-2 hover:bg-gray-100 rounded" title="Delete"><span role="img" aria-label="delete">❌</span></button>
                </div>
              </div>
            ))}
          </div>
          {showAddressForm ? (
            <form onSubmit={isEditing ? handleUpdateAddress : handleAddAddress} className="mb-4 space-y-4 p-4 border-t">
              <h3 className="text-lg font-semibold">{isEditing ? 'Edit Address' : 'Add New Address'}</h3>
              <input type="text" name="street" placeholder="Street" value={addressForm.street || ''} onChange={handleAddressFormChange} className="w-full border px-3 py-2 rounded" required />
              <input type="text" name="city" placeholder="City" value={addressForm.city || ''} onChange={handleAddressFormChange} className="w-full border px-3 py-2 rounded" required />
              <input type="text" name="zipCode" placeholder="ZIP Code" value={addressForm.zipCode || ''} onChange={handleAddressFormChange} className="w-full border px-3 py-2 rounded" required />
              <input type="text" name="country" placeholder="Country" value={addressForm.country || ''} onChange={handleAddressFormChange} className="w-full border px-3 py-2 rounded" required />
              <input type="text" name="phone" placeholder="Phone" value={addressForm.phone || ''} onChange={handleAddressFormChange} className="w-full border px-3 py-2 rounded" required />
              <div className="flex gap-2">
                <button type="submit" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">{isEditing ? 'Update' : 'Add'} Address</button>
                <button type="button" onClick={() => { setShowAddressForm(false); setIsEditing(false); setEditId(null); setAddressForm({}); }} className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">Cancel</button>
              </div>
            </form>
          ) : (
            <button onClick={() => setShowAddressForm(true)} className="w-full bg-gray-100 text-black py-3 rounded-lg hover:bg-gray-200 font-semibold">+ Add New Address</button>
          )}
        </div>
        <div className="flex justify-end mt-6">
          <button onClick={handleNext} className="w-full sm:w-auto px-10 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium disabled:bg-gray-400" disabled={!selectedAddressId}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}