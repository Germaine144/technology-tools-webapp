'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; // ✅ Add this line

interface DiscountProductProps {
  id: number;
  title: string;
  image: string;
  price?: number;
  discount?: number;
  bgColor?: string;
}

const DiscountProduct = ({ 
  id,
  title, 
  image, 
  price,
  discount,
  bgColor = "bg-white text-black"
}: DiscountProductProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/products/${id}`);
  };

  return (
    <div 
      onClick={handleClick}
      className={`rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${bgColor} overflow-hidden relative group cursor-pointer h-full flex flex-col`}
    >
      {/* Discount Badge */}
      {discount && (
        <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-bold z-10 shadow-lg">
          {discount}% OFF
        </div>
      )}
      
      {/* Image Section */}
      <div className="relative overflow-hidden flex-grow">
        <Image 
          src={image}
          alt={title}
          fill
          sizes="100%"
          className="object-contain transition-transform duration-300 group-hover:scale-105 p-4"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
      </div>
      
      {/* Info Section */}
      <div className="p-4 flex flex-col">
        <h2 className="font-bold text-lg mb-2 line-clamp-2 text-gray-800">{title}</h2>
        {price && (
          <div className="mt-auto">
            <p className="text-gray-900 font-bold">
              ${price.toFixed(2)}
              {discount && (
                <span className="ml-2 text-sm text-gray-500 line-through">
                  ${(price / (1 - discount / 100)).toFixed(2)}
                </span>
              )}
            </p>
          </div>
        )}
        <button
          className="w-full bg-black text-white py-3 px-6 rounded-2xl font-semibold hover:bg-gray-800 transition-colors duration-200 text-sm"
          onClick={() => window.location.href = `/products/${id}`}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default DiscountProduct;
