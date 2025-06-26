'use client';
import React, { useState, useEffect } from 'react';
import { Heart, Star, ArrowLeft, Plus, Minus } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  images?: string[]; // Array for multiple images
  colors: string[]; // Simplified to string array for color names
  rating?: number;
  reviewCount?: number;
  description?: string;
  specifications?: { [key: string]: string };
}

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  avatar?: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Apple iPhone 14 Pro Max',
    price: 1299,
    image: '/image/iphone14promax.jpg',
    images: [
      '/image/white.png',
      '/image/black.png',
      '/image/gold.png',
      '/image/13.png',
    ],
    colors: ['Space Black', 'Silver', 'Gold', 'Deep Purple'],
    rating: 4.8,
    reviewCount: 1024,
    description: 'The most Pro iPhone ever with A16 Bionic, 48MP camera, and Always-On display.',
    specifications: {
      'Display': '6.7-inch Super Retina XDR',
      'Chip': 'A16 Bionic',
      'Camera': '48MP Main + 12MP Ultra Wide',
      'Storage': '128GB, 256GB, 512GB, 1TB',
      'Battery': 'Up to 29 hours video playback',
      'OS': 'iOS 16',
      'Water Resistance': 'IP68',
    },
  },
  
  // Add other products as needed, matching the `products` array structure
];

const reviews: Review[] = [
  { id: 1, name: 'John D.', rating: 5, comment: 'Amazing phone, great camera!' },
  { id: 2, name: 'Sarah M.', rating: 4, comment: 'Good performance, but pricey.' },
  { id: 3, name: 'Mike R.', rating: 5, comment: 'Best iPhone yet!' },
];

const BuyNowDetail = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const params = useParams();
  const productId = params?.productId;

  useEffect(() => {
    if (!productId) {
      setError('Invalid product ID');
      setLoading(false);
      return;
    }

    const foundProduct = products.find(p => p.id === parseInt(productId as string));
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedColor(foundProduct.colors[0]); // Default to first color
      setLoading(false);
    } else {
      setError('Product not found');
      setLoading(false);
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          <p className="mt-4 text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error || 'Product not found'}</p>
          <button
            onClick={() => router.push('/products?category=all')}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      <div className="max-w-7xl mx-auto p-6">
        {/* Back Button */}
        <button
          onClick={() => router.push('/products?category=all')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Products</span>
        </button>

        {/* Product Header */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl font-bold text-gray-900">${product.price}</span>
            <div className="flex space-x-2">
              {product.colors.map((color, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedColor(color)}
                  className={`w-6 h-6 rounded-full border ${selectedColor === color ? 'ring-2 ring-blue-500' : ''}`}
                  style={{ backgroundColor: color === 'Space Black' ? '#1C2526' : color === 'Silver' ? '#D3D3D3' : color === 'Gold' ? '#FFD700' : '#6A0DAD' }}
                ></button>
              ))}
            </div>
          </div>
          <div className="flex space-x-4 mb-4">
            <img src={product.image} alt={product.name} className="w-1/2 object-contain" />
            <div className="grid grid-cols-4 gap-2 w-1/2">
              {product.images?.map((img, index) => (
                <img key={index} src={img} alt={`${product.name} view ${index + 1}`} className="w-full h-20 object-contain border rounded" />
              ))}
            </div>
          </div>
          <div className="flex space-x-4">
            <button className="flex-1 bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800">
              Add to Cart - ${(product.price * quantity).toFixed(2)}
            </button>
            <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700">
              Buy Now
            </button>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <Heart className="w-5 h-5" />
              <span>Add to Wishlist</span>
            </button>
          </div>
          <div className="mt-4 flex space-x-4">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 border rounded-lg flex items-center justify-center hover:bg-gray-100"
            >
              <Minus className="w-5 h-5" />
            </button>
            <span className="text-lg font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 border rounded-lg flex items-center justify-center hover:bg-gray-100"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Specifications */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Details</h2>
          <div className="grid grid-cols-2 gap-4">
            {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="text-gray-700">
                <span className="font-medium">{key}:</span> {value}
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Reviews</h2>
          <div className="flex items-center mb-4">
            <span className="text-3xl font-bold text-gray-900">{product.rating?.toFixed(1)}</span>
            <div className="ml-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${star <= (product.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="text-gray-600">({product.reviewCount} reviews)</span>
            </div>
          </div>
          {reviews.map((review) => (
            <div key={review.id} className="border-t pt-4 mt-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div>
                  <p className="font-medium text-gray-900">{review.name}</p>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mt-1">{review.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Related Products */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {products
              .filter(p => p.id !== product.id)
              .slice(0, 4)
              .map((relatedProduct) => (
                <div key={relatedProduct.id} className="text-center">
                  <img src={relatedProduct.image} alt={relatedProduct.name} className="w-full h-32 object-contain mb-2" />
                  <h3 className="text-sm font-medium text-gray-900">{relatedProduct.name}</h3>
                  <p className="text-gray-700">${relatedProduct.price}</p>
                  <button
                    onClick={() => router.push(`/BuyNowDetails/${relatedProduct.id}`)}
                    className="mt-2 bg-black text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-800"
                  >
                    View
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyNowDetail;