'use client';
import { useRouter } from 'next/navigation';
import Link from "next/link";

type ProductCardProps = {
  title: string;
  body: string;
  image: string;
  price: number;
  rating: number;
  id: number;
};

export default function ProductCard({ title, body, image, price, rating, id }: ProductCardProps) {
  const router = useRouter();

  const handleBuyNow = () => {
    // Use 'id' instead of 'productId'
    router.push(`/products/${id}`);
  };

  return (
    <div className="bg-gray-200 rounded shadow p-4 hover:shadow-lg transition">
      <img src={image} alt={title} className="w h-70 object-cover mb-4" />
      <h2 className="font-semibold text-lg mb-1 text-black">{title}</h2>
      <p className="text-sm text-gray-600 mb-2">{body}</p>
      <div className="flex justify-between items-center text-sm text-gray-700">
        <span>${price.toFixed(2)}</span>
        <span>⭐ {rating}</span>
      </div>
      
      <button 
        onClick={handleBuyNow}
        className="mt-4 bg-black text-white py-2 px-7 rounded-2xl flex justify-center items-center cursor-pointer hover:bg-gray-800 transition-colors">
        Buy Now
      </button>
    </div>
  );
}