// src/components/Home/ProductCard.tsx
interface ProductCardProps {
  title: string;
  body: string;
  image: string;
  price: number;
  rating: number;
}

export default function ProductCard({ title, body, image, price, rating }: ProductCardProps) {
  return (
    <div className="bg-gray-200 rounded shadow p-4 hover:shadow-lg transition">
      <img src={image} alt={title} className="w h-70 object-cover mb-4" />
      <h2 className="font-semibold text-lg mb-1 text-black">{title}</h2>
      <p className="text-sm text-gray-600 mb-2">{body}</p>
      <div className="flex justify-between items-center text-sm text-gray-700">
        <span>${price.toFixed(2)}</span>
        <span>⭐ {rating}</span>
      </div>
      <button className=" mt-4  bg-black text-white py-2 px-7 rounded-2xl flex justify-center items-center ">Buy Now </button>
    </div>
  );
}
