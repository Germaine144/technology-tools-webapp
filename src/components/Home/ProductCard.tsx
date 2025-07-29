'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image'; // Import the Next.js Image component
import WishlistButton from '@/components/WishlistButton';

interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  isHighlighted?: boolean;
  fromCategory?: boolean;
  brand?: string;
  rating?: number;
  discount?: number;
}

export default function ProductCard({ 
  id, 
  name,
  description, 
  image, 
  price, 
  category, 
  isHighlighted,
  fromCategory = false,
  brand,
  rating,
  discount
}: ProductCardProps) {
  console.log('ProductCard name prop:', name);
  const router = useRouter();

  const product = {
    id,
    name,
    description,
    image,
    price,
    category,
    brand,
    rating,
    discount
  };

  const handleCardClick = () => {
    // router.push(`/product/${id}`);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the card's click event from firing
    if (fromCategory) {
      router.push(`/BuyNowDetails/${id}`);
    } else {
      router.push(`/products/${category.toLowerCase()}`);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className={`bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition text-center cursor-pointer relative border border-gray-100 ${isHighlighted ? 'ring-2 ring-blue-400' : ''}`}
      style={{ minHeight: 370 }}
    >
      <div className="absolute top-4 right-4">
        <WishlistButton product={product} size="sm" />
      </div>
      <div className="flex items-center justify-center mb-6" style={{ width: '180px', height: '180px', margin: '0 auto' }}>
        {/* Use the Next.js Image component for optimization */}
        <Image
          src={image}
          alt={description}
          width={180}
          height={180}
          className="w-full h-full object-contain"/>
      </div>
    
      <p className="text-base text-gray-900 mb-2 mt-8 line-clamp-2" style={{ minHeight: 48 }}>{description}</p>
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