'use client';
import { useRouter } from 'next/navigation';

type ProductCardProps = {
  name: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  category: string; // Add category prop
  id: number;
};

export default function ProductCard({ name, description, image, price, rating, category, id }: ProductCardProps) {
  const router = useRouter();

  const handleBuyNow = () => {
    // Navigate to category-specific products page with the current product's category
    router.push(`/products?category=${category.toLowerCase()}`);
  };

  return (
    <div className="bg-gray-200 rounded shadow p-4 hover:shadow-lg transition">
      <img src={image} alt={name} className="w-full h-52 object-cover mb-4" />
      <h2 className="font-semibold text-lg mb-1 text-black">{name}</h2>
      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{description}</p>
      <p className="text-xs text-blue-600 font-medium mb-2">{category}</p>
      <div className="flex justify-between items-center text-sm text-gray-700 mb-4">
        <span>${price.toFixed(2)}</span>
        <span>⭐ {rating}</span>
      </div>
      
      <button
        onClick={handleBuyNow}
        className="w-full bg-black text-white py-2 px-7 rounded-2xl flex justify-center items-center cursor-pointer hover:bg-gray-800 transition-colors"
      >
        Buy Now
      </button>
    </div>
  );
}