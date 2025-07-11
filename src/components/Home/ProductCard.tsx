'use client';

import { useRouter } from 'next/navigation';
import { FiHeart } from 'react-icons/fi';
import { useWishlist } from '../../context/WishlistContext';

interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  isHighlighted?: boolean;
  fromCategory?: boolean;
}

export default function ProductCard({ 
  id, 
  name,
  description, 
  image, 
  price, 
  category, 
  isHighlighted,
  fromCategory = false
}: ProductCardProps) {
  console.log('ProductCard name prop:', name);
  const router = useRouter();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(id);
    } else {
      addToWishlist(id);
    }
  };

  const handleCardClick = () => {
    router.push(`/product/${id}`);
  };

  const handleBuyNow = () => {
    if (fromCategory) {
      router.push(`/BuyNowDetails/${id}`);
    } else {
      router.push(`/products/${category.toLowerCase()}`);
    }
  };

  return (
    <div
      className={`bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition text-center cursor-pointer relative border border-gray-100 ${isHighlighted ? 'ring-2 ring-blue-400' : ''}`}
      style={{ minHeight: 370 }}
    >
      <button
        onClick={handleWishlistClick}
        className="absolute top-4 right-4 p-2 rounded-full bg-white shadow hover:bg-gray-100 transition-colors border border-gray-200"
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        type="button"
      >
        <FiHeart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
      </button>
      <div className="flex items-center justify-center mb-6" style={{ width: '180px', height: '180px', margin: '0 auto' }}>
        <img
          src={image}
          alt={description}
          className="w-full h-full object-contain"/>
      </div>
    
      <p className="text-base  text-gray-900 mb-2 mt-8 line-clamp-2" style={{ minHeight: 48 }}>{description}</p>
      <p className="text-xl font-bold text-gray-950 mb-4">${price.toFixed(2)}</p>
      <button
        onClick={handleBuyNow}
        className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors text-base"
        type="button"
      >
        Buy Now
      </button>
    </div>
  );
}