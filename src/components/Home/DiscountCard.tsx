import React, { useState } from 'react';
import { Heart } from 'lucide-react';

// Props interface for individual discount card
interface DiscountCardProps {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  originalPrice: number;
  rating: number;
  category: string;
  discount?: number;
}

// Individual DiscountCard component
const DiscountCard: React.FC<DiscountCardProps> = ({
  id,
  name,
  description,
  image,
  price,
  originalPrice,
  rating,
  category,
  discount
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="bg-gray-100 rounded-3xl p-6 relative group hover:shadow-lg transition-shadow duration-300">
      {/* Favorite Heart Icon */}
      <button
        onClick={toggleFavorite}
        className="absolute top-6 right-6 z-10 p-1 rounded-full hover:bg-white hover:shadow-md transition-all duration-200"
      >
        <Heart 
          size={24} 
          className={`${
            isFavorite 
              ? 'fill-red-500 text-red-500' 
              : 'text-gray-400 hover:text-red-500'
          } transition-colors duration-200`}
        />
      </button>

      {/* Discount Badge */}
      {discount && discount > 0 && (
        <div className="absolute top-6 left-6 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
          -{Math.round(discount * 100)}%
        </div>
      )}

      {/* Product Image Container */}
      <div className="flex justify-center items-center mb-6 h-48">
        <img 
          src={image} 
          alt={name}
          className="max-w-full max-h-full object-contain"
        />
      </div>

      {/* Product Info */}
      <div className="text-center mb-4">
        <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1">
          {name}
        </h3>
        <p className="text-gray-600 text-xs mb-2 line-clamp-2">{description}</p>
      </div>

      {/* Rating */}
      <div className="flex justify-center items-center mb-4">
        <span className="text-yellow-500 text-sm">
          {'★'.repeat(Math.round(rating))}
        </span>
        <span className="ml-1 text-gray-500 text-xs">({rating})</span>
      </div>

      {/* Price */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-1">
          {discount && discount > 0 ? (
            <>
              <span className="text-gray-400 line-through text-sm">
                ${originalPrice.toFixed(2)}
              </span>
              <span className="text-2xl font-bold text-gray-900">
                ${price.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-2xl font-bold text-gray-900">
              ${price.toFixed(2)}
            </span>
          )}
        </div>
      </div>

      {/* Buy Now Button */}
      <button className="w-full bg-black text-white py-3 px-6 rounded-2xl font-semibold hover:bg-gray-800 transition-colors duration-200 text-sm">
        Buy Now
      </button>
    </div>
  );
};

export default DiscountCard;