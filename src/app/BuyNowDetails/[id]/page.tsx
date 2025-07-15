'use client';
import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Heart, Share2, ShoppingCart, Check, Minus, Plus } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import Image from 'next/image'; // Import the Next.js Image component
import Link from 'next/link';   // Import the Next.js Link component

export default function ProductDetailPage() {
  // const router = useRouter(); // FIX: Removed unused 'router' variable
  const params = useParams();
  const productId = Number(params.id); // or params.id if your IDs are strings
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState('Deep Purple');
  const [selectedStorage, setSelectedStorage] = useState('128GB');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const colors = [
    { name: 'Deep Purple', color: '#5A5A8A' },
    { name: 'Gold', color: '#FFD700' },
    { name: 'Silver', color: '#C0C0C0' },
    { name: 'Space Black', color: '#1C1C1C' }
  ];

  const storageOptions = ['128GB', '256GB', '512GB', '1TB'];

  const productImages = [
    '/api/placeholder/400/500',
    '/api/placeholder/400/500',
    '/api/placeholder/400/500',
    '/api/placeholder/400/500'
  ];

  const specifications = [
    { label: 'Display', value: '6.7" Super Retina XDR display' },
    { label: 'Camera', value: '48MP Main, 12MP Ultra Wide' },
    { label: 'Processor', value: 'A16 Bionic chip' },
    { label: 'Battery', value: 'Up to 29 hours video playback' },
    { label: 'Storage', value: '128GB, 256GB, 512GB, 1TB' },
    { label: 'Colors', value: 'Deep Purple, Gold, Silver, Space Black' },
    { label: 'Size', value: '6.33 × 3.05 × 0.31 inches' },
    { label: 'Weight', value: '7.27 ounces (206 grams)' }
  ];

  const reviews = [
    {
      name: 'John Doe',
      rating: 5,
      date: '2 days ago',
      comment: 'Excellent phone! The camera quality is amazing and the battery lasts all day.',
      verified: true
    },
    {
      name: 'Sarah Smith',
      rating: 4,
      date: '1 week ago',
      comment: 'Great performance and display. Only wish it had better low-light camera performance.',
      verified: true
    },
    {
      name: 'Mike Johnson',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Perfect upgrade from my old phone. The design is sleek and modern.',
      verified: false
    }
  ];

  const relatedProducts = [
    { id: 1, name: 'iPhone 13', price: 699, image: '/api/placeholder/200/250' },
    { id: 2, name: 'AirPods Pro', price: 249, image: '/api/placeholder/200/250' },
    { id: 3, name: 'iPhone Case', price: 49, image: '/api/placeholder/200/250' },
    { id: 4, name: 'MagSafe Charger', price: 39, image: '/api/placeholder/200/250' }
  ];

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  const addToCartHandler = () => {
    const cartItem = {
      id: productId, // Use the real product id from the URL
      name: 'Apple iPhone 14 Pro Max',
      image: '/api/placeholder/80/80',
      price: 1099,
      quantity: quantity
    };
    
    addToCart(cartItem);
    
    // Show success message
    alert('Item added to cart!');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6 flex items-center space-x-1">
          {/* FIX: Replaced <a> with <Link> */}
          <Link href="/" className="hover:underline">Home</Link>
          <span className="mx-1"></span>
          {/* FIX: Replaced <a> with <Link> */}
          <Link href="/products/phones" className="hover:underline">Phones</Link>
          <span className="mx-1"></span>
          <span className="text-gray-800 font-semibold">Apple iPhone 14 Pro Max</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative bg-white rounded-2xl shadow-sm overflow-hidden">
              {/* FIX: Replaced <img> with <Image> */}
              <Image 
                src={productImages[activeImageIndex]} 
                alt="iPhone 14 Pro Max"
                width={400}
                height={384}
                className="w-full h-96 object-cover"
              />
              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            
            {/* Thumbnail Images */}
            <div className="flex space-x-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    activeImageIndex === index ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  {/* FIX: Replaced <img> with <Image> */}
                  <Image src={image} alt={`View ${index + 1}`} width={80} height={80} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Apple iPhone 14 Pro Max</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">4.8 (324 reviews)</span>
                </div>
                <span className="text-green-600 font-medium">In Stock</span>
              </div>
              <p className="text-4xl font-bold text-blue-600 mb-4">$1,099</p>
              <p className="text-gray-600 leading-relaxed">
                Experience the ultimate iPhone with the 14 Pro Max. Featuring a stunning 6.7-inch Super Retina XDR display, 
                advanced camera system with 48MP main camera, and the powerful A16 Bionic chip for incredible performance.
              </p>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="font-semibold mb-3">Color: {selectedColor}</h3>
              <div className="flex space-x-3">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-12 h-12 rounded-full border-2 ${
                      selectedColor === color.name ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color.color }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Storage Selection */}
            <div>
              <h3 className="font-semibold mb-3">Storage: {selectedStorage}</h3>
              <div className="grid grid-cols-2 gap-3">
                {storageOptions.map((storage) => (
                  <button
                    key={storage}
                    onClick={() => setSelectedStorage(storage)}
                    className={`p-3 rounded-lg border-2 text-center font-medium ${
                      selectedStorage === storage 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {storage}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-semibold mb-3">Quantity</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={decrementQuantity}
                    className="p-2 hover:bg-gray-100 rounded-l-lg"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 border-x">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    className="p-2 hover:bg-gray-100 rounded-r-lg"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button onClick={addToCartHandler} className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 font-semibold flex items-center justify-center space-x-2">
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>
              <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Heart className="w-5 h-5" />
              </button>
              <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Features */}
            <div className="border-t pt-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>30-day return policy</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>1-year manufacturer warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="border-b mb-6">
            <nav className="flex space-x-8">
              <button className="pb-2 border-b-2 border-blue-600 text-blue-600 font-medium">
                Specifications
              </button>
              <button className="pb-2 text-gray-600 hover:text-gray-800">
                Reviews
              </button>
              <button className="pb-2 text-gray-600 hover:text-gray-800">
                Shipping Info
              </button>
            </nav>
          </div>

          {/* Specifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {specifications.map((spec, index) => (
              <div key={index} className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-medium text-gray-700">{spec.label}</span>
                <span className="text-gray-600">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Customer Reviews</h2>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-lg font-bold">4.8</span>
              <span className="text-gray-600">Based on 324 reviews</span>
            </div>
          </div>

          {/* Rating Breakdown */}
          <div className="mb-8">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center space-x-3 mb-2">
                <span className="text-sm w-8">{rating}★</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-400 h-2 rounded-full" 
                    style={{ width: `${rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 5 : rating === 2 ? 3 : 2}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-10">
                  {rating === 5 ? '70%' : rating === 4 ? '20%' : rating === 3 ? '5%' : rating === 2 ? '3%' : '2%'}
                </span>
              </div>
            ))}
          </div>

          {/* Individual Reviews */}
          <div className="space-y-6">
            {reviews.map((review, index) => (
              <div key={index} className="border-b border-gray-100 pb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium">{review.name.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{review.name}</span>
                        {review.verified && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">{review.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 ml-13">{review.comment}</p>
              </div>
            ))}
          </div>

          <button className="mt-6 text-blue-600 hover:text-blue-800 font-medium">
            Show more reviews
          </button>
        </div>

        {/* Related Products */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <div key={product.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                {/* FIX: Replaced <img> with <Image> */}
                <Image 
                  src={product.image} 
                  alt={product.name}
                  width={200}
                  height={192}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-medium mb-2">{product.name}</h3>
                  <p className="text-lg font-bold text-blue-600">${product.price}</p>
                  <button className="mt-2 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}