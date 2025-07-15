'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image'; // Import the Next.js Image component

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  images?: string[];
  price: number;
  category: string;
  brand?: string;
  rating?: number;
  discount?: number;
  inStock?: boolean;
  specs?: string[];
  colors?: string[];
  memoryOptions?: string[];
  longDescription?: string;
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);
  // FIX: Destructured only the setter functions as the state variables were unused.
  const [, setSelectedColor] = useState<string>('');
  const [, setSelectedMemory] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');

  useEffect(() => {
    async function fetchProduct() {
      setIsLoading(true);
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const products: Product[] = await response.json();
        const productId = Number(id);
        const found = products.find((p) => p.id === productId);
        setProduct(found || null);
        if (found?.colors?.length) setSelectedColor(found.colors[0]);
        if (found?.memoryOptions?.length) setSelectedMemory(found.memoryOptions[0]);
      } catch { // FIX: Removed the unused error variable from the catch block.
        setProduct(null);
      } finally {
        setIsLoading(false);
      }
    }
    if (id) fetchProduct();
    else { setProduct(null); setIsLoading(false); }
  }, [id]);

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (!product) return <div className="text-center py-10 text-red-500">Product not found</div>;

  return (
    <div className="min-h-screen bg-[#fafbfc] py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Product Image */}
          <div className="flex items-center justify-center">
            <Image
              src={product.image}
              alt={product.name}
              width={320}
              height={320}
              className="w-full max-w-xs h-auto object-contain rounded-xl bg-gray-50 p-6"
            />
          </div>
          {/* Product Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                {product.category}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <div className="text-3xl font-bold text-green-600 mb-2">${product.price.toFixed(2)}</div>
            <p className="text-gray-700 text-lg mb-4">{product.description}</p>
            <div className="flex items-center space-x-2 mb-4">
              <span className={`w-3 h-3 rounded-full ${product.inStock !== false ? 'bg-green-500' : 'bg-red-500'}`}></span>
              <span className={`font-medium ${product.inStock !== false ? 'text-green-600' : 'text-red-600'}`}>{product.inStock !== false ? 'In Stock' : 'Out of Stock'}</span>
            </div>
            <div className="flex gap-4">
              <button
                disabled={product.inStock === false}
                onClick={() => {
                  if (product.inStock !== false) {
                    router.push(`/BuyNowDetails/${product.id}`);
                  }
                }}
                className={`flex-1 bg-black text-white py-3 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors ${product.inStock === false ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Buy Now
              </button>
              <button
                onClick={() => setIsWishlisted((w) => !w)}
                className={`flex-1 py-3 rounded-lg border-2 font-semibold text-lg transition-all ${isWishlisted ? 'border-red-300 bg-red-50 text-red-600' : 'border-gray-300 hover:border-gray-400 text-gray-700'}`}
              >
                {isWishlisted ? '♥ Wishlist' : '♡ Wishlist'}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Tabs for Description, Specs, Reviews */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <div className="border-b border-gray-200 mb-8">
          <div className="flex space-x-8">
            <button onClick={() => setActiveTab('description')} className={`py-4 px-2 border-b-2 font-medium text-lg transition-colors duration-200 ${activeTab === 'description' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Description</button>
            <button onClick={() => setActiveTab('specs')} className={`py-4 px-2 border-b-2 font-medium text-lg transition-colors duration-200 ${activeTab === 'specs' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Specifications</button>
            <button onClick={() => setActiveTab('reviews')} className={`py-4 px-2 border-b-2 font-medium text-lg transition-colors duration-200 ${activeTab === 'reviews' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Reviews</button>
          </div>
        </div>
        <div className="min-h-[200px]">
          {activeTab === 'description' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Product Description</h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">{product.longDescription || product.description}</p>
            </div>
          )}
          {activeTab === 'specs' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Technical Specifications</h3>
              {product.specs && product.specs.length > 0 ? (
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  {product.specs.map((spec, idx) => (
                    <li key={idx}>{spec}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No specifications available for this product.</p>
              )}
            </div>
          )}
          {activeTab === 'reviews' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Customer Reviews</h3>
              <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}