'use client';

import { useWishlist } from '@/context/WishlistContext';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image'; // Import the Next.js Image component
import { FaHeart } from 'react-icons/fa';
import productsData from '@/data/product.json';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  // Use real product data
  const wishlistProducts = productsData.filter(product =>
    wishlist.includes(product.id)
  );

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Your Wishlist</h1>
        <p>Your wishlist is empty.</p>
        <Link href="/" className="text-blue-500 hover:underline mt-4 inline-block">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistProducts.map(product => (
          <div key={product.id} className="border rounded-lg p-4 shadow-sm">
            <div className="bg-gray-100 h-48 mb-4 rounded-md flex items-center justify-center">
              {product.image ? (
                // FIX: Replaced <img> with the optimized Next.js <Image> component
                <Image
                  src={product.image}
                  alt={product.name}
                  width={180}
                  height={180}
                  className="h-full w-auto object-contain"
                />
              ) : (
                <span className="text-gray-400">No Image</span>
              )}
            </div>
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
            <button
              onClick={() => removeFromWishlist(product.id)}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors flex items-center gap-2"
            >
              <FaHeart /> Remove from Wishlist
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;