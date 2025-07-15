'use client';
import Image from 'next/image'; // Import the Next.js Image component
import { useRouter } from 'next/navigation';

interface PopularProductProps {
  title: string;
  body: string;
  image: string;
  productId?: number;
  bgColor?: string;
  fromCategory?: boolean;
}

const PopularProduct = ({ title, body, image, productId, bgColor = "bg-white text-black", fromCategory = false }: PopularProductProps) => {
  const router = useRouter();

  const handleBuyNow = () => {
    if (fromCategory) {
      router.push(`/BuyNowDetails/${productId || 1}`);
    } else {
      router.push(`/products/phones`);
    }
  };

  return (
    <div
      className={`rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${bgColor} text-center`}>
      <div className="relative overflow-hidden rounded-lg mb-4">
        {/* Replaced <img> with the optimized Next.js Image component */}
        <Image
          src={image}
          alt={title}
          width={160}
          height={160}
          className="object-cover transition-transform duration-300 hover:scale-105 mx-auto"/>
      </div>
      <h2 className="font-bold text-xl mb-2 line-clamp-2">{title}</h2>
      <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">{body}</p>
      <button
        onClick={handleBuyNow}
        className="w-full bg-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200 flex justify-center items-center space-x-2"
      >
        <span className="cursor-pointer">Shop Now</span>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </button>
    </div>
  );
};

export default PopularProduct;