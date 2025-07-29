'use client';
import React from 'react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Trash2, ShoppingCart, ArrowLeft, Star } from 'lucide-react';
import type { Product } from '@/types/product';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: 1
    });
  };

  const handleRemoveFromWishlist = (id: number) => {
    removeFromWishlist(id);
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="bg-white rounded-full w-32 h-32 mx-auto flex items-center justify-center shadow-lg mb-8">
              <Heart className="h-16 w-16 text-gray-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Your Wishlist Awaits</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
              Discover and save your favorite products for later
            </p>
            <Link 
              href="/products/all"
              className="inline-flex items-center px-8 py-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
            >
              <ArrowLeft className="mr-3 h-5 w-5" />
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <div className="flex items-center mb-2">
                <div className="bg-gray-600 rounded-full p-2 mr-4">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-gray-800">My Wishlist</h1>
              </div>
              <p className="text-lg text-gray-600">
                {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved for later
              </p>
            </div>
            <button
              onClick={clearWishlist}
              className="inline-flex items-center px-6 py-3 border-2 border-gray-300 hover:border-red-400 text-gray-700 hover:text-red-600 font-medium rounded-xl bg-white hover:bg-red-50 transition-all duration-200"
            >
              <Trash2 className="mr-2 h-5 w-5" />
              Clear Wishlist
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlist.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <button
                  onClick={() => handleRemoveFromWishlist(product.id)}
                  className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-red-500 text-gray-600 hover:text-white rounded-full shadow-lg backdrop-blur-sm transition-all duration-200 transform hover:scale-110"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-gray-800">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.discount && (
                      <div className="ml-3 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                        {product.discount * 100}% OFF
                      </div>
                    )}
                  </div>
                  {product.rating && (
                    <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium text-gray-700">
                        {product.rating}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </button>
                  <Link
                    href={`/product/${product.id}`}
                    className="inline-flex items-center justify-center px-4 py-3 border-2 border-gray-300 hover:border-gray-600 text-gray-700 hover:text-gray-600 font-semibold rounded-xl bg-white hover:bg-gray-50 transition-all duration-200 transform hover:-translate-y-0.5"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}