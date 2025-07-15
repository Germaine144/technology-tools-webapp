import React, { useState } from 'react';
import { MapPin, Phone, Save, X, Home, Building2 } from 'lucide-react';

interface AddressFormData {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  label: 'HOME' | 'OFFICE';
}

interface AddressFormProps {
  onSave: (data: AddressFormData) => void;
  onCancel: () => void;
}

export default function AddressForm({ onSave, onCancel }: AddressFormProps) {
  const [formData, setFormData] = useState<AddressFormData>({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
    label: 'HOME'
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    console.log('Validating form data:', formData); // Debug log
    
    if (!formData.street || !formData.street.trim()) {
      newErrors.street = 'Street address is required';
    }
    
    if (!formData.city || !formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    
    if (!formData.state || !formData.state.trim()) {
      newErrors.state = 'State is required';
    }
    
    if (!formData.zipCode || !formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Please enter a valid ZIP code (e.g., 12345 or 12345-6789)';
    }
    
    if (!formData.country || !formData.country.trim()) {
      newErrors.country = 'Country is required';
    }
    
    if (!formData.phone || !formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    console.log('Validation errors:', newErrors); // Debug log
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(`Input change - ${name}:`, value); // Debug log
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted!'); // Debug log
    if (!validateForm()) {
      console.log('Form validation failed'); // Debug log
      return;
    }
    console.log('Form validation passed, proceeding with submission'); // Debug log
    setIsSubmitting(true);
    
    try {
      // Call the onSave function with the form data
      console.log('Submitting form data:', formData); // Debug log
      if (onSave) {
        onSave(formData);
      }
      setIsSuccess(true);
      
      // Reset form after a short delay
      setTimeout(() => {
        setFormData({
          street: '',
          city: '',
          state: '',
          zipCode: '',
          country: '',
          phone: '',
          label: 'HOME'
        });
        setIsSuccess(false);
        setIsSubmitting(false);
      }, 1500);
    } catch (error) {
      console.error('Error saving address:', error);
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      phone: '',
      label: 'HOME'
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 text-black">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
            <MapPin className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Address</h1>
          <p className="text-gray-600">Please fill in your address information below</p>
        </div>

        {/* Form Container */}
        <form 
          onSubmit={handleSubmit} 
          className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
          noValidate
        >
          {/* Success Message */}
          {isSuccess && (
            <div className="bg-green-50 border-b border-green-200 p-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-green-800 font-semibold">Address Added Successfully!</h3>
                  <p className="text-green-600 text-sm">Your address has been saved to the system.</p>
                </div>
              </div>
            </div>
          )}

          <div className="p-8 space-y-6">
            {/* Street Address */}
            <div>
              <label htmlFor="street" className="block text-sm font-semibold text-gray-700 mb-2">
                Street Address *
              </label>
              <input
                type="text"
                id="street"
                name="street"
                value={formData.street}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                  errors.street ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                }`}
                placeholder="Enter your street address"
                required
              />
              {errors.street && <p className="mt-1 text-sm text-red-600">{errors.street}</p>}
            </div>

            {/* City and State Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                    errors.city ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                  placeholder="Enter city"
                  required
                />
                {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-semibold text-gray-700 mb-2">
                  State *
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                    errors.state ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                  placeholder="Enter state"
                  required
                />
                {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
              </div>
            </div>

            {/* ZIP Code and Country Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="zipCode" className="block text-sm font-semibold text-gray-700 mb-2">
                  ZIP Code *
                </label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                    errors.zipCode ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                  placeholder="12345"
                  required
                />
                {errors.zipCode && <p className="mt-1 text-sm text-red-600">{errors.zipCode}</p>}
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-semibold text-gray-700 mb-2">
                  Country *
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                    errors.country ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                  placeholder="Enter country"
                  required
                />
                {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country}</p>}
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                    errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>

            {/* Address Label */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Address Label *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="relative">
                  <input
                    type="radio"
                    name="label"
                    value="HOME"
                    checked={formData.label === 'HOME'}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    formData.label === 'HOME' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}>
                    <div className="flex items-center justify-center">
                      <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                        formData.label === 'HOME' 
                          ? 'border-blue-500 bg-blue-500' 
                          : 'border-gray-300'
                      }`}>
                        {formData.label === 'HOME' && (
                          <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                        )}
                      </div>
                      <Home className={`w-5 h-5 mr-2 ${
                        formData.label === 'HOME' ? 'text-blue-600' : 'text-gray-500'
                      }`} />
                      <span className={`font-medium ${
                        formData.label === 'HOME' ? 'text-blue-700' : 'text-gray-700'
                      }`}>
                        Home
                      </span>
                    </div>
                  </div>
                </label>

                <label className="relative">
                  <input
                    type="radio"
                    name="label"
                    value="OFFICE"
                    checked={formData.label === 'OFFICE'}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    formData.label === 'OFFICE' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}>
                    <div className="flex items-center justify-center">
                      <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                        formData.label === 'OFFICE' 
                          ? 'border-blue-500 bg-blue-500' 
                          : 'border-gray-300'
                      }`}>
                        {formData.label === 'OFFICE' && (
                          <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                        )}
                      </div>
                      <Building2 className={`w-5 h-5 mr-2 ${
                        formData.label === 'OFFICE' ? 'text-blue-600' : 'text-gray-500'
                      }`} />
                      <span className={`font-medium ${
                        formData.label === 'OFFICE' ? 'text-blue-700' : 'text-gray-700'
                      }`}>
                        Office
                      </span>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                onClick={(e) => {
                  console.log('Submit button clicked'); // Debug log
                }}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Save className="w-5 h-5 mr-2" />
                    Save Address
                  </div>
                )}
              </button>

              <button
                type="button"
                onClick={onCancel}
                className="flex-1 sm:flex-none bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-105"
              >
                <div className="flex items-center justify-center">
                  <X className="w-5 h-5 mr-2" />
                  Cancel
                </div>
              </button>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>All fields marked with * are required</p>
        </div>
      </div>
    </div>
  );
} 