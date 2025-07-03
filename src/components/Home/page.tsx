'use client';
import Link from 'next/link';
import ProductCard from '../Home/ProductCard';
import CategoryCard from './CategoryCard';
import PopularProduct from './PopularProduct';
import { IoIosPhonePortrait } from 'react-icons/io';
import { BsSmartwatch } from 'react-icons/bs';
import { FaCamera } from 'react-icons/fa';
import { FaHeadphones } from 'react-icons/fa';
import { MdOutlineComputer } from 'react-icons/md';
import { IoGameControllerSharp } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import DiscountCard from './DiscountCard';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: number;
  discount?: number;
}

const categoryIcons = [
  { title: "Telephones", icon: <IoIosPhonePortrait /> },
  { title: "Smart Watch", icon: <BsSmartwatch /> },
  { title: "Camera", icon: <FaCamera /> },
  { title: "Headphones", icon: <FaHeadphones /> },
  { title: "Computers", icon: <MdOutlineComputer /> },
  { title: "Gaming", icon: <IoGameControllerSharp /> },
];

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return <main className="p-6">Loading...</main>;
  }

  if (error) {
    return <main className="p-6 text-red-500">Error: {error}</main>;
  }

return (
  <div className="bg-white text-black w-full">
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Browse By Category</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
        {categoryIcons.map((cat) => (
          <CategoryCard key={cat.title} title={cat.title} icon={cat.icon} />
        ))}
      </div>

      <div className="flex gap-10">
        <Link href="/products">
          <h1 className="text-2xl font-bold mb-4 hover:underline cursor-pointer">New Arrival</h1>
        </Link>
        <Link href="/products">
          <h1 className="text-2xl font-bold mb-4 hover:underline cursor-pointer">Bestseller</h1>
        </Link>
        <Link href="/products">
          <h1 className="text-2xl font-bold mb-4 hover:underline cursor-pointer">Featured Products</h1>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.slice(0, 8).map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}                                 
            name={product.name}
            description={product.description}
            image={product.image}
            price={product.price}
            rating={product.rating}
            category={product.category}
          />
        ))}
      </div>

      <h1 className="text-2xl font-bold my-6 cursor-pointer">Popular Products</h1>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap">
  {products.slice(0, 4).map((product, index) => {
const bgColors = [
  "bg-white text-black",
  "bg-gray-100 text-black",
  "bg-gray-200 text-black",
  "bg-gray-700 text-white"
];
const bgColor = bgColors[index] || "bg-white text-black";
    return (
      <PopularProduct
        key={product.id}
        title={product.name}
        body={product.description}
        image={product.image}
        bgColor={bgColor}
      />
    );
  })}
</div>

<h2 className="text-2xl font-bold mb-8 mt-12">Discounts up to -50%</h2>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {products.filter(p => p.discount && p.discount > 0).map((product) => {
    // Calculate discounted price with null safety
    const discountedPrice = product.discount 
      ? product.price * (1 - product.discount)
      : product.price;

    return (
      <DiscountCard
        key={product.id}
        id={product.id}
        name={product.name}
        description={product.description}
        image={product.image}
        price={discountedPrice}
        originalPrice={product.price}
        rating={product.rating}
        category={product.category}
        discount={product.discount}
      />
    );
  })}
</div>

    </main>
  </div>
);

}
