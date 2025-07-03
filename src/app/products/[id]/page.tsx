'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// This should be your main product page component
// Located at: app/products/[id]/page.tsx

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

// Sample products data - replace with your actual data
const products: Product[] = [
  {
    id: 1,
    name: 'Apple iPhone 14 Pro Max',
    price: 1299,
    image: '/image/black.png',
    description: 'The most Pro iPhone ever with A16 Bionic, 48MP camera, and Always-On display.'
  },
  {
    id: 2,
    name: 'Samsung Galaxy S22 Ultra',
    price: 1199,
    image: '/image/utla.jpg',
    description: 'Powerful performance with Snapdragon 8 Gen 1 and 108MP camera.'
  },
  {
    id: 3,
    name: 'AirPods Max Silver',
    price: 549,
    image: '/image/airpods1.png',
    description: 'High-fidelity audio with active noise cancellation.'
  },
  {
    id: 4,
    name: 'Apple Watch Series 9 GPS 41mm',
    price: 399,
    image: '/image/watchpp.png',
    description: 'Powerful, stylish, and smarter than ever.'
  }
];

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const productId = parseInt(params.id as string);
    const foundProduct = products.find(p => p.id === productId);
    
    if (foundProduct) {
      setProduct(foundProduct);
    }
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/products')}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-96 object-contain rounded-lg"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-gray-600 mb-6">{product.description}</p>
              <div className="text-3xl font-bold text-gray-900 mb-8">
                ${product.price.toLocaleString()}
              </div>
              <div className="space-y-4">
                <button
                  onClick={() => router.push(`/BuyNowDetails/${product.id}`)}
                  className="w-full bg-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                >
                  View Full Details
                </button>
                <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}