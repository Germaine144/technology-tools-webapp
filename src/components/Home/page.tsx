'use client';
import Link from 'next/link';
import ProductCard from '../Home/ProductCard';
import CategoryCard from './CategoryCard';
import PopularProduct from './PopularProduct';
import DiscountProduct from './DiscountCard';
import { IoIosPhonePortrait } from 'react-icons/io';
import { BsSmartwatch } from 'react-icons/bs';
import { FaCamera, FaHeadphones } from 'react-icons/fa';
import { MdOutlineComputer } from 'react-icons/md';
import { IoGameControllerSharp } from 'react-icons/io5';
import { useEffect, useState, useMemo } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating?: number;
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

  const { allProducts, popularProducts, discountedProducts } = useMemo(() => {
    const desiredOrder = [
      "Apple iPhone 14 Pro", "Canon EOS R6 Mark II", "Apple Watch Series 8",
      "AirPods Max Silver", "Samsung Galaxy Watch6 Classic 47mm Black",
      "Galaxy Z Fold5 Unlocked | 256GB | Phantom Black", "Galaxy Buds FE Graphite",
      'Apple iPad 9 10.2" 64GB Wi-Fi Silver (MK2L3) 2021'
    ];
    const productsCopy = [...products];
    const orderedProducts = productsCopy.sort((a, b) => {
      const aIndex = desiredOrder.indexOf(a.name);
      const bIndex = desiredOrder.indexOf(b.name);
      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;
      return 0;
    });

  
    const popularProductIds = [1, 2, 4, 9]; 

    return {
      allProducts: orderedProducts.slice(0, 8),
      popularProducts: products
        .filter(p => popularProductIds.includes(p.id)) 
        .sort((a, b) => popularProductIds.indexOf(a.id) - popularProductIds.indexOf(b.id)), 
      discountedProducts: products
        .filter(p => p.discount && p.discount > 0)
        .slice(0, 2)
    };
    // --- END OF UPDATE ---

  }, [products]);

  if (loading) return <main className="p-6">Loading...</main>;
  if (error) return <main className="p-6 text-red-500">Error: {error}</main>;

  return (
    <div className="bg-white text-black w-full">
      {/* Hero Section */}
      <section className="relative w-full bg-[#242428] flex items-center overflow-hidden h-[70vh] min-h-[600px]">
        <div className="container mx-auto px-6 lg:px-20 flex items-center w-full h-full">
          <div className="z-10 flex flex-col gap-4 text-white max-w-md">
            <p className="font-semibold text-gray-400 text-lg">
              Pro.Beyond.
            </p>
            <h1 className="text-6xl lg:text-7xl font-light tracking-tight">
              IPhone 14 <span className="font-bold">Pro</span>
            </h1>
            <p className="text-lg text-gray-400 mt-2">
              Created to change everything for the better. For everyone
            </p>
            <button className="px-7 py-2.5 mt-6 rounded-lg w-fit transition border border-gray-500 hover:bg-white hover:text-black text-sm">
              Shop Now
            </button>
          </div>
          <div className="absolute -right-16 md:-right-8 lg:right-0 top-10 h-full flex items-center justify-center pointer-events-none">
            <img
              src="/image/bg.png"
              alt="iPhone 14 Pro"
              className="object-contain"
              style={{
                width: '406px',
                height: '632px'
              }}
            />
          </div>
        </div>
      </section>

      {/* Multi-Product Section */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-1 mb-10 h-96">
        <div className="flex flex-col gap-1">
          <div className="bg-gray-50 flex items-center p-6 flex-1 shadow-sm relative overflow-hidden">
            <img src="/image/PlayStation.png" alt="Playstation 5" className="absolute left-0 h-full w-auto object-contain -translate-x-1/4"/>
            <div className="ml-auto w-1/2 text-left">
              <h3 className="text-3xl font-bold mb-2">Playstation 5</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Incredibly powerful CPU vs GPU, and SSD with<br />
                integrated I/O will redefine your PlayStation experience.
              </p>
            </div>
          </div>
          <div className="flex gap-1 flex-1">
            <div className="bg-gray-100 flex items-center p-4 flex-1 shadow-sm relative overflow-hidden">
              <img src="/image/half.png" alt="Apple AirPods Max" className="absolute left-0 h-4/5 w-auto object-contain -translate-x-1/3"/>
              <div className="ml-auto w-1/2 text-left">
                <h3 className="text-lg font-bold mb-1">Apple</h3>
                <h4 className="text-lg font-bold mb-2">AirPods Max</h4>
                <p className="text-gray-600 text-xs">Computational audio.<br />Listen, it's powerful</p>
              </div>
            </div>
            <div className="bg-[#353535] flex items-center p-4 flex-1 shadow-sm relative overflow-hidden">
              <img src="/image/half1.png" alt="Apple Vision Pro" className="absolute left-0 h-4/5 w-auto object-contain -translate-x-1/4"/>
              <div className="ml-auto w-1/2 text-left text-white">
                <h3 className="text-lg font-bold mb-1">Apple</h3>
                <h4 className="text-lg font-bold mb-2">Vision Pro</h4>
                <p className="text-gray-300 text-xs leading-snug">An immersive way to<br />experience entertainment</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 flex items-center p-8 shadow-sm relative overflow-hidden">
            <div className="w-1/2 z-10">
                <h3 className="text-4xl font-bold text-black mb-4">Macbook Air</h3>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                    The new 13-inch MacBook Air makes more of what<br />
                    you love with a spacious Liquid Retina display.
                </p>
                <button className="border border-black text-black px-6 py-2 rounded hover:bg-black hover:text-white transition text-sm font-medium">
                    Shop Now
                </button>
            </div>
            <img src="/image/ui.png" alt="MacBook Air" className="absolute right-0 top-0 h-full w-auto object-contain translate-x-1/4"/>
        </div>
      </div>
      
      <main className="p-6 max-w-7xl mx-auto">
        {/* Categories */}
        <h1 className="text-2xl font-bold mb-4">Browse By Category</h1>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-10">
          {categoryIcons.map((cat) => (
            <CategoryCard key={cat.title} title={cat.title} icon={cat.icon} />
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-10">
          <Link href="/products" className="text-2xl font-bold mb-4 hover:underline cursor-pointer">New Arrival</Link>
          <Link href="/products" className="text-2xl font-bold mb-4 hover:underline cursor-pointer">Bestseller</Link>
          <Link href="/products" className="text-2xl font-bold mb-4 hover:underline cursor-pointer">Featured Products</Link>
        </div>

        {/* All Products */}
        <h1 className="text-2xl font-bold mb-4">All Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {allProducts.map((product) => (
            <ProductCard key={product.id} id={product.id} name={product.name} description={product.description} image={product.image} price={product.price} category={product.category}/>
          ))}
        </div>
      </main>

      {/* --- MINIMIZED POPULAR PRODUCTS SECTION --- */}
      <section className="w-full">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-2xl font-bold pt-6 pb-4">Popular Products</h1>
        </div>
  
        <div className="flex overflow-x-auto gap-6 py-4 px-6">
          {popularProducts.map((product, index) => {
            const bgColors = ["bg-white", "bg-gray-100", "bg-gray-200", "bg-[#2C2C2C]"];
            const textColors = ["text-black", "text-black", "text-black", "text-white"];
            const isDark = index === 3;
            const currentTitle = product.name; 
            const currentDescription = product.description;

            return (
          
              <div 
                key={product.id} 
                className={`${bgColors[index]} ${textColors[index]}`}
                style={{
                  width: '360px',
                  height: '480px', // Reduced height
                  minWidth: '280px',
                  padding: '240px 32px 32px 32px', // Reduced top and bottom padding
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden' 
                }} >
              
               
                <div className="absolute top-0 left-0 w-full h-[240px] p-8">
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain"/>
                </div>
              
                <div className="flex-grow flex flex-col text-left">
                  <h3 className="text-2xl font-semibold mb-3">{currentTitle}</h3>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
                    {currentDescription}
                  </p>
                  <div className="mt-auto">
                    <button className={`border rounded px-6 py-2 transition-colors duration-300 ${isDark ? 'border-white hover:bg-white hover:text-black' : 'border-black hover:bg-black hover:text-white'}`}>
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    
      
      <main className="p-6 max-w-7xl mx-auto">
      
        <h1 className="text-2xl font-bold my-6">Discounts up to -50%</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} id={product.id} name={product.name} description={product.description} image={product.image} price={product.price} category={product.category}/>
          ))}
        </div>
      </main>

      {/* FINAL, PRECISION-STYLED PROMOTIONAL BANNER */}
      <section className="w-full bg-zinc-900 flex items-center justify-center py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/30"></div>
        <img src="/image/17.png" alt="Laptop" className="absolute top-0 left-0 z-10" style={{ width: '237px', height: '192px', objectFit: 'contain', transform: 'translateX(-25%) translateY(-25%) rotate(0deg)', }} />
        <img src="/image/image 18.png" alt="Tablet" className="absolute bottom-0 left-0 z-10" style={{ width: '418.56px', height: '262.08px', objectFit: 'contain', transform: 'translateX(-25%) translateY(25%) rotate(-180deg)', }} />
        <div className="z-20 text-center text-white relative">
          <h2 className="text-5xl md:text-6xl font-thin tracking-wider">
            Big Summer <span className="font-semibold">Sale</span>
          </h2>
          <p className="text-zinc-400 mt-4 mb-8 text-lg">
            Commodo fames vitae vitae leo mauris in. Eu consequat.
          </p>
          <button className="border border-zinc-600 rounded-lg px-9 py-3 text-sm font-medium hover:bg-white hover:text-black transition-colors duration-300">
            Shop Now
          </button>
        </div>
        <img src="/image/image 8.png" alt="Phone" className="absolute top-0 right-0 z-10" style={{ width: '120.36px', height: '365.97px', objectFit: 'contain', transform: 'translateX(25%) translateY(-25%) rotate(31.47deg)' }} />
        <img src="/image/image 7.png" alt="Watch" className="absolute bottom-0 right-0 z-10" style={{ width: '404px', height: '321px', objectFit: 'contain', transform: 'translateX(25%) translateY(25%)' }} />
      </section>
    </div>
  );
}