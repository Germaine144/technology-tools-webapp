'use client';
import React from 'react';
import { Heart } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { Product } from '@/types/product';

interface WishlistButtonProps {
  product: Product;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function WishlistButton({ 
  product, 
  className = '', 
  size = 'md',
}: WishlistButtonProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const isWishlisted = isInWishlist(product.id);

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const sizeClasses = {
    sm: 'p-2',
    md: 'p-2.5',
    lg: 'p-3.5'
  };

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };

  return (
    <button
      onClick={handleToggleWishlist}
      className={`
        rounded-full transition-all duration-300 ease-out transform relative overflow-hidden group
        bg-white text-gray-600 hover:bg-gray-100 border-2 border-gray-200 hover:border-gray-400 hover:scale-105
        ${sizeClasses[size]}
        focus:outline-none focus:ring-4 focus:ring-red-600/50
        active:scale-95
        ${className}
      `}
      aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      {/* Background pulse effect */}
      <div className={`
        absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300
        bg-white
      `} />
      
      {/* Heart icon with subtle animation */}
      <Heart 
        className={`${iconSizes[size]} text-red-500 ${isWishlisted ? 'fill-current' : ''}`} 
      />
      
      {/* Ripple effect for when adding to wishlist */}
      {isWishlisted && (
        <div className="absolute inset-0 rounded-full bg-gray-600 animate-ping opacity-20" />
      )}
    </button>
  );
}