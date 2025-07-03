'use client';
import { useRouter } from 'next/navigation';

interface PopularProductProps {
  title: string;
  body: string;
  image: string;
  productId?: number;
  bgColor?: string;
}

const PopularProduct = ({ title, body, image, productId, bgColor = "bg-white text-black" }: PopularProductProps) => {
  const router = useRouter();

  const handleBuyNow = () => {
    // Updated to match your BuyNowDetail component routing
    router.push(`/BuyNowDetails/${productId || 1}`);
  };

  return (
    <div className={`rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${bgColor}`}>
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105" 
        />
      </div>
      <h2 className="font-bold text-xl mb-2 line-clamp-2">{title}</h2>
      <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">{body}</p>
      <button 
        onClick={handleBuyNow}
        className="w-full bg-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200 flex justify-center items-center space-x-2"
      >
        <span>Shop Now</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </button>
    </div>
  );
};

export default PopularProduct;