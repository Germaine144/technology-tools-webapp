'use client';
import React, { useState, useEffect } from 'react';
import { Heart, Star, ArrowLeft, Plus, Minus, ShoppingCart, Eye, Shield, Truck, RotateCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  images?: string[];
  colors?: string[];
  category: string;
  rating: number;
  reviewCount?: number;
  description: string;
  longDescription?: string;
  specifications?: { [key: string]: string };
  features?: string[];
  inStock?: boolean;
  brand?: string;
}

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

// Enhanced products data with detailed specifications
const products: Product[] = [
  // Phones (Telephones)
  {
    id: 1,
    name: "Apple iPhone 14 Pro",
    price: 1099.99,
    description: "Latest iPhone with Dynamic Island and 48MP camera.",
    longDescription: "The iPhone 14 Pro introduces Dynamic Island, a new way to interact with your iPhone. With the 48MP Main camera, you can capture stunning photos with incredible detail. The A16 Bionic chip delivers exceptional performance and efficiency.",
    image: "/image/𝐊𝐚𝐝1.png",
    images: ["/image/𝐊𝐚𝐝1.png", "/image/black.png", "/image/gold.png", "/image/13.png"],
    category: "Telephones",
    rating: 4.8,
    reviewCount: 2847,
    colors: ["Deep Purple", "Space Black", "Silver", "Gold"],
    brand: "Apple",
    inStock: true,
    features: [
      "Dynamic Island",
      "48MP Main camera system",
      "A16 Bionic chip",
      "All-day battery life",
      "5G connectivity",
      "Face ID",
      "iOS 16"
    ],
    specifications: {
      'Display': '6.1-inch Super Retina XDR OLED',
      'Chip': 'A16 Bionic',
      'Camera': '48MP Main + 12MP Ultra Wide + 12MP Telephoto',
      'Storage': '128GB, 256GB, 512GB, 1TB',
      'Battery': 'Up to 23 hours video playback',
      'OS': 'iOS 16',
      'Water Resistance': 'IP68',
      'Dimensions': '147.5 × 71.5 × 7.85 mm',
      'Weight': '206g'
    }
  },
  {
    id: 2,
    name: "Samsung Galaxy S23",
    price: 899.99,
    description: "High-end Android phone with sleek design and performance.",
    longDescription: "The Galaxy S23 redefines what a smartphone can be with its premium design, exceptional camera system, and powerful performance. Experience the future of mobile technology with advanced AI features and seamless connectivity.",
    image: "/image/head11.png",
    images: ["/image/head11.png", "/image/sam.png", "/image/s221.png"],
    category: "Telephones",
    rating: 4.7,
    reviewCount: 1923,
    colors: ["Phantom Black", "Cream", "Green", "Lavender"],
    brand: "Samsung",
    inStock: true,
    features: [
      "50MP Triple Camera System",
      "Snapdragon 8 Gen 2",
      "120Hz Dynamic AMOLED 2X",
      "All-day intelligent battery",
      "5G connectivity",
      "One UI 5.1",
      "IP68 water resistance"
    ],
    specifications: {
      'Display': '6.1-inch Dynamic AMOLED 2X',
      'Processor': 'Snapdragon 8 Gen 2',
      'Camera': '50MP Main + 12MP Ultra Wide + 10MP Telephoto',
      'Storage': '128GB, 256GB, 512GB',
      'Battery': '3900mAh with 25W fast charging',
      'OS': 'Android 13 with One UI 5.1',
      'Water Resistance': 'IP68',
      'Dimensions': '146.3 × 70.9 × 7.6 mm',
      'Weight': '168g'
    }
  },
  {
    id: 3,
    name: "Google Pixel 7",
    price: 649.99,
    description: "Google's latest phone with Tensor chip and clean Android.",
    longDescription: "The Pixel 7 brings you the best of Google AI, with advanced camera features and the pure Android experience. Powered by Google Tensor G2, it delivers exceptional performance and computational photography.",
    image: "/image/goo.jpg",
    images: ["/image/goo.jpg"],
    category: "Telephones",
    rating: 4.6,
    reviewCount: 1456,
    colors: ["Obsidian", "Snow", "Lemongrass"],
    brand: "Google",
    inStock: true,
    features: [
      "Google Tensor G2 chip",
      "Advanced computational photography",
      "Magic Eraser",
      "Live Translate",
      "Pure Android experience",
      "5 years of security updates",
      "Wireless charging"
    ],
    specifications: {
      'Display': '6.3-inch OLED 90Hz',
      'Chip': 'Google Tensor G2',
      'Camera': '50MP Main + 12MP Ultra Wide',
      'Storage': '128GB, 256GB',
      'Battery': '4355mAh with 30W fast charging',
      'OS': 'Android 13',
      'Water Resistance': 'IP68',
      'Dimensions': '155.6 × 73.2 × 8.7 mm',
      'Weight': '197g'
    }
  },
  {
    id: 4,
    name: "MacBook Pro 16",
    price: 2499.99,
    description: "Powerful laptop with M2 Pro chip and retina display.",
    longDescription: "The MacBook Pro 16-inch with M2 Pro chip delivers exceptional performance for professionals. With its stunning Liquid Retina XDR display and all-day battery life, it's perfect for creative work and demanding tasks.",
    image: "/image/apple14.png",
    images: ["/image/apple14.png"],
    category: "Computers",
    rating: 4.9,
    reviewCount: 892,
    colors: ["Space Gray", "Silver"],
    brand: "Apple",
    inStock: true,
    features: [
      "M2 Pro chip",
      "16-inch Liquid Retina XDR display",
      "Up to 22 hours battery life",
      "1080p FaceTime HD camera",
      "Six-speaker sound system",
      "Magic Keyboard with Touch ID",
      "Multiple Thunderbolt 4 ports"
    ],
    specifications: {
      'Display': '16.2-inch Liquid Retina XDR',
      'Chip': 'Apple M2 Pro',
      'Memory': '16GB, 32GB unified memory',
      'Storage': '512GB, 1TB, 2TB, 4TB SSD',
      'Battery': 'Up to 22 hours video playback',
      'Camera': '1080p FaceTime HD camera',
      'Audio': 'Six-speaker sound system',
      'Ports': '3x Thunderbolt 4, HDMI, SDXC, MagSafe 3',
      'Weight': '2.15 kg'
    }
  },
  {
    id: 5,
    name: "Sony WH-1000XM4 Headphones",
    price: 349.99,
    description: "Industry-leading noise canceling wireless headphones.",
    longDescription: "Experience exceptional sound quality with industry-leading noise cancellation. The WH-1000XM4 headphones feature 30-hour battery life, touch sensor controls, and speak-to-chat technology for the ultimate listening experience.",
    image: "/image/sony.png",
    images: ["/image/sony.png"],
    category: "Electronics",
    rating: 4.8,
    reviewCount: 3421,
    colors: ["Black", "Silver", "Blue"],
    brand: "Sony",
    inStock: true,
    features: [
      "Industry-leading noise cancellation",
      "30-hour battery life",
      "Touch sensor controls",
      "Speak-to-chat technology",
      "Quick charge (10min = 5hrs)",
      "Multipoint connection",
      "Hi-Res Audio"
    ],
    specifications: {
      'Driver': '40mm dome type',
      'Frequency Response': '4Hz-40kHz',
      'Battery': '30 hours (NC ON), 38 hours (NC OFF)',
      'Charging': 'USB-C, Quick charge',
      'Connectivity': 'Bluetooth 5.0, NFC',
      'Codec': 'SBC, AAC, LDAC',
      'Weight': '254g',
      'Noise Cancellation': 'Dual Noise Sensor technology'
    }
  }
];

// Enhanced reviews with more variety
const reviewsData: { [key: number]: Review[] } = {
  1: [
    { id: 1, name: 'John D.', rating: 5, comment: 'Amazing phone! The Dynamic Island is revolutionary and the camera quality is outstanding.', date: '2024-01-15', verified: true },
    { id: 2, name: 'Sarah M.', rating: 4, comment: 'Great performance and build quality, but the price is quite high for what you get.', date: '2024-01-12', verified: true },
    { id: 3, name: 'Mike R.', rating: 5, comment: 'Best iPhone yet! Love the camera improvements and battery life is excellent.', date: '2024-01-10', verified: true }
  ],
  2: [
    { id: 1, name: 'Alex K.', rating: 5, comment: 'Fantastic Android phone! The camera system is incredible and performance is top-notch.', date: '2024-01-14', verified: true },
    { id: 2, name: 'Emma L.', rating: 4, comment: 'Really good phone with excellent display. Battery life could be better though.', date: '2024-01-11', verified: true }
  ],
  3: [
    { id: 1, name: 'David P.', rating: 5, comment: 'Pure Android experience is amazing! Camera AI features are incredibly smart.', date: '2024-01-13', verified: true },
    { id: 2, name: 'Lisa W.', rating: 4, comment: 'Good value for money. The computational photography is impressive.', date: '2024-01-09', verified: true }
  ]
};

const BuyNowDetail = () => {
    const router = useRouter();
  const [selectedProductId, setSelectedProductId] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  const product = products.find(p => p.id === selectedProductId);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors?.[0] || '');
      setSelectedImage(product.image);
    }
  }, [product]);

  const getColorStyle = (color: string) => {
    const colorMap: { [key: string]: string } = {
      'Deep Purple': '#6A0DAD',
      'Space Black': '#1C2526',
      'Silver': '#D3D3D3',
      'Gold': '#FFD700',
      'Phantom Black': '#1C1C1C',
      'Cream': '#F5F5DC',
      'Green': '#228B22',
      'Lavender': '#E6E6FA',
      'Obsidian': '#0F0F0F',
      'Snow': '#FFFAFA',
      'Lemongrass': '#9ACD32',
      'Space Gray': '#8A8A8A',
      'Blue': '#0000FF',
      'Black': '#000000',
      'Platinum Silver': '#E5E4E2'
    };
    return colorMap[color] || '#000000';
  };

  if (!product) {
    return <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <p className="text-gray-600">Product not found</p>
    </div>;
  }

  const reviews = reviewsData[product.id] || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-black">
      <div className="max-w-7xl mx-auto p-6">
        {/* Product Selector for Demo */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <h3 className="text-lg font-semibold mb-3">Select Product (Demo)</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {products.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedProductId(p.id)}
                className={`p-2 text-sm rounded-lg transition-all duration-200 ${
                  selectedProductId === p.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Product Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-6">
              <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden">
                <img 
                  src={selectedImage} 
                  alt={product.name} 
                  className="w-full h-full object-contain p-6" 
                />
              </div>
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(img)}
                      className={`aspect-square border-2 rounded-lg overflow-hidden hover:border-blue-500 transition-all duration-200 ${
                        selectedImage === img ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
                      }`}
                    >
                      <img 
                        src={img} 
                        alt={`${product.name} view ${index + 1}`} 
                        className="w-full h-full object-contain p-2" 
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                  <span className="text-sm font-medium text-gray-600">{product.brand}</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
                
                {/* Rating */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">${product.price}</span>
                  <span className="text-sm text-gray-500 ml-2">Free shipping</span>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Stock Status */}
                <div className="flex items-center space-x-2 mb-6">
                  <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">
                    Color: <span className="text-gray-900">{selectedColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-10 h-10 rounded-full border-2 hover:scale-110 transition-all duration-200 ${
                          selectedColor === color
                            ? 'border-blue-500 ring-2 ring-blue-200'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        style={{ backgroundColor: getColorStyle(color) }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">Quantity</label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-sm text-gray-600">
                    Total: ${(product.price * quantity).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2 font-medium"
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`px-6 py-3 rounded-lg border-2 transition-all duration-200 flex items-center justify-center space-x-2 ${
                    isWishlisted
                      ? 'border-red-300 bg-red-50 text-red-600'
                      : 'border-gray-300 hover:border-gray-400 text-gray-700'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  <span>{isWishlisted ? 'Wishlisted' : 'Wishlist'}</span>
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-700">2 Year Warranty</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-700">Free Shipping</span>
                </div>
                <div className="flex items-center space-x-2">
                  <RotateCcw className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-700">30-Day Returns</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-700">Quality Assured</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="border-b border-gray-200 mb-8">
            <div className="flex space-x-8">
              {['description', 'specifications', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            {activeTab === 'description' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Product Description</h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {product.longDescription || product.description}
                  </p>
                </div>
                
                {product.features && (
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Key Features</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {product.features.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'specifications' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Technical Specifications</h3>
                {product.specifications ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="border-b border-gray-200 pb-3">
                        <dt className="font-medium text-gray-900 mb-1">{key}</dt>
                        <dd className="text-gray-600">{value}</dd>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No specifications available for this product.</p>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h3>
                {reviews.length > 0 ? (
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-6">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <h4 className="font-semibold text-gray-900">{review.name}</h4>
                            {review.verified && (
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                Verified Purchase
                              </span>
                            )}
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <div className="flex items-center space-x-1 mb-3">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
        {/* Related Products */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products
              .filter(p => p.id !== product.id)
              .slice(0, 4)
              .map((relatedProduct) => (
                <div key={relatedProduct.id} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                  <div className="aspect-square bg-white rounded-lg overflow-hidden mb-4">
                    <img 
                      src={relatedProduct.image} 
                      alt={relatedProduct.name} 
                      className="w-full h-full object-contain p-2" 
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm leading-tight">{relatedProduct.name}</h3>
                  <p className="text-lg font-bold text-gray-900 mb-3">${relatedProduct.price.toLocaleString()}</p>
                  <button
                   onClick={() => router.push(`/BuyNowDetails/${relatedProduct.id}`)}

                    className="w-full bg-black text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Details</span>
                  </button>
                </div>
              ))}
          </div>
        </div>
    
    </div>
  );
};

export default BuyNowDetail;