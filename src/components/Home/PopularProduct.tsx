// src/components/Home/PopularProduct.tsx
import { useRouter } from 'next/navigation';

interface PopularProductProps {
  title: string;
  body: string;
  image: string;
  productId?: number; // Add productId prop
}

export default function PopularProduct({ title, body, image, productId }: PopularProductProps) {
  const router = useRouter();

  const handleBuyNow = () => {
    // Navigate to the product details page
    router.push(`/products/${productId || 'details'}`);
  };

  return (
    <div className="bg-gray-200 rounded shadow p-4 hover:shadow-lg transition">
      <img src={image} alt={title} className="w h-70 object-cover mb-4" />
      <h2 className="font-semibold text-lg mb-1 text-black">{title}</h2>
      <p className="text-sm text-gray-600 mb-2">{body}</p>
      <button 
        onClick={handleBuyNow}
        className="mt-4 bg-black text-white py-2 px-7 rounded-2xl flex justify-center items-center cursor-pointer hover:bg-gray-800 transition-colors"
      >
        Buy Now
      </button>
    </div>
  );
}