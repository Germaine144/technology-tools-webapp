'use client';
import Link from 'next/link';
import Image from 'next/image'; // Import the Next.js Image component
import ProductCard from '../Home/ProductCard';
import CategoryCard from './CategoryCard';
// Unused component imports are removed to fix the error.
// import PopularProduct from './PopularProduct';
// import DiscountProduct from './DiscountCard';
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
  const [currentSlide, setCurrentSlide] = useState(0);

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

  const { allProducts, popularProducts } = useMemo(() => {
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
      // Removed unused 'discountedProducts' to fix the error.
    };
  }, [products]);

  // Carousel navigation functions
  const nextSlide = () => {
    if (popularProducts.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % popularProducts.length);
  };

  const prevSlide = () => {
    if (popularProducts.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + popularProducts.length) % popularProducts.length);
  };

  // Reset slide to 0 when products change
  useEffect(() => {
    setCurrentSlide(0);
  }, [popularProducts.length]);

  if (loading) return <main className="p-6">Loading...</main>;
  if (error) return <main className="p-6 text-red-500">Error: {error}</main>;

  return (
    <div className="bg-white text-black w-full">
      {/* Hero Section */}
      <section 
        className="relative w-full bg-[#242428] flex flex-col lg:flex-row items-center justify-center lg:justify-start overflow-hidden
                   h-screen lg:h-[70vh] lg:min-h-[600px]"
      >
        <div className="container mx-auto px-6 lg:px-20 z-10 flex flex-col items-center lg:items-start text-center lg:text-left mt-24 lg:mt-0">
          <div className="max-w-md">
            <p className="font-semibold text-gray-400 text-lg">Pro.Beyond.</p>
            <h1 className="text-5xl lg:text-7xl font-light tracking-tight mt-4 text-white">IPhone 14 <span className="font-bold">Pro</span></h1>
            <p className="text-lg text-gray-400 mt-4">Created to change everything for the better. For everyone</p>
            <button className="px-7 py-2.5 mt-8 rounded-lg w-fit transition border border-gray-500 hover:bg-white hover:text-black text-sm text-white">Shop Now</button>
          </div>
        </div>
        <div className="w-full flex-1 flex items-end justify-center lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <Image src="/image/bg.png" alt="iPhone 14 Pro" width={406} height={632} className="pointer-events-none object-contain max-w-[80%] lg:max-w-none lg:w-[406px] lg:h-[632px] lg:absolute lg:right-0 lg:bottom-[-5%]"/>
        </div>
      </section>

      {/* Desktop Layout: Hidden on mobile */}
      <div className="hidden lg:grid w-full grid-cols-1 lg:grid-cols-2 gap-1 mb-10 h-96">
        <div className="flex flex-col gap-1">
          <div className="bg-gray-50 flex items-center p-6 flex-1 shadow-sm relative overflow-hidden">
            <Image src="/image/PlayStation.png" alt="Playstation 5" fill style={{objectFit: 'contain'}} className="absolute left-0 h-full w-auto !-translate-x-1/4"/>
            <div className="ml-auto w-1/2 text-left">
              <h3 className="text-3xl font-bold mb-2">Playstation 5</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Incredibly powerful CPU vs GPU, and SSD with<br />integrated I/O will redefine your PlayStation experience.</p>
            </div>
          </div>
          <div className="flex gap-1 flex-1">
            <div className="bg-gray-100 flex items-center p-4 flex-1 shadow-sm relative overflow-hidden">
              <Image src="/image/head.png" alt="Apple AirPods Max" fill style={{objectFit: 'contain'}} className="absolute left-0 h-4/5 w-auto !-translate-x-1/2"/>
              <div className="ml-auto w-1/2 text-left">
                <h3 className="text-lg font-bold mb-1">Apple</h3>
                <h4 className="text-lg font-bold mb-2">AirPods Max</h4>
                {/* FIX: Escaped the apostrophe in "it's" */}
               <p className="text-gray-600 text-xs">Computational audio.<br />Listen, it&apos;s powerful</p>

              </div>
            </div>
            <div className="bg-[#353535] flex items-center p-4 flex-1 shadow-sm relative overflow-hidden">
              <Image src="/image/visu.png" alt="Apple Vision Pro" fill style={{objectFit: 'contain'}} className="absolute left-0 h-4/5 w-auto !-translate-x-1/2"/>
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
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">The new 15‑inch MacBook Air makes room for more of what you love with a spacious Liquid Retina display</p>
                <button className="border border-black text-black px-6 py-2 rounded hover:bg-black hover:text-white transition text-sm font-medium">Shop Now</button>
            </div>
            <Image src="/image/ui.png" alt="MacBook Air" fill style={{objectFit: 'contain'}} className="absolute right-0 top-0 h-full w-auto !translate-x-1/4"/>
        </div>
      </div>
      
      {/* Mobile Layout: A simple column stack, only visible on mobile */}
      <div className="lg:hidden flex flex-col mb-10">
        <div className="bg-gray-100 flex flex-col items-center text-center p-8 gap-4">
          <Image src="/image/head.png" alt="Apple AirPods Max" width={160} height={160} className="h-40 w-auto object-contain"/>
          <div>
            <h3 className="text-lg font-bold">Apple</h3>
            <h4 className="text-xl font-bold mb-2">AirPods Max</h4>
            {/* FIX: Escaped the apostrophe in "it's" */}
            <p className="text-gray-600 text-sm">Computational audio. Listen, it&apos;s powerful</p>
          </div>
        </div>
         <div className="bg-[#353535] text-white flex flex-col items-center text-center p-8 gap-4">
          <Image src="/image/visu.png" alt="Apple Vision Pro" width={160} height={160} className="h-40 w-auto object-contain"/>
          <div>
            <h3 className="text-lg font-bold">Apple</h3>
            <h4 className="text-xl font-bold mb-2">Vision Pro</h4>
            <p className="text-gray-300 text-sm">An immersive way to experience entertainment</p>
          </div>
        </div>
        <div className="bg-gray-50 flex flex-col items-center text-center p-8 gap-4">
          <Image src="/image/PlayStation.png" alt="Playstation 5" width={160} height={160} className="h-40 w-auto object-contain"/>
          <div>
            <h3 className="text-3xl font-bold mb-2">Playstation 5</h3>
            <p className="text-gray-600 text-sm max-w-sm">Incredibly powerful CPU vs GPU, and an SSD with integrated I/O will redefine your PlayStation experience.</p>
          </div>
        </div>
        <div className="bg-gray-100 flex flex-col items-center text-center p-8 gap-4">
          <Image src="/image/ui.png" alt="MacBook Air" width={160} height={160} className="h-40 w-auto object-contain"/>
            <div>
              <h3 className="text-3xl font-bold mb-2">Macbook Air</h3>
              <p className="text-gray-600 text-sm max-w-sm">The new 15‑inch MacBook Air makes room for more of what you love with a spacious Liquid Retina display</p>
              <button className="border border-black px-6 py-2 rounded hover:bg-black hover:text-white transition text-sm font-medium mt-4">Shop Now</button>
            </div>
        </div>
      </div>

      <main className="p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 dark:text-white">Browse By Category</h1>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-10">
          {categoryIcons.map((cat) => (
            <CategoryCard key={cat.title} title={cat.title} icon={cat.icon} />
          ))}
        </div>
        <div className="flex gap-10 ">
          <Link href="/products" className="text-xl font-bold mb-4 hover:underline cursor-pointer dark:text-white">New Arrival</Link>
          <Link href="/products" className="text-xl font-bold mb-4 hover:underline cursor-pointer dark:text-white">Bestseller</Link>
          <Link href="/products" className="text-xl font-bold mb-4 hover:underline cursor-pointer dark:text-white">Featured Products</Link>
        </div>
        <h1 className="text-2xl font-bold mb-4 dark:text-white">All Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {allProducts.map((product) => (
            <ProductCard key={product.id} id={product.id} name={product.name} description={product.description} image={product.image} price={product.price} category={product.category}/>
          ))}
        </div>
      </main>

      <section className="w-full">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-2xl font-bold pt-6 pb-4">Popular Products</h1>
        </div>
        <div className="hidden md:flex overflow-x-auto gap-6 py-4 px-6">
          {popularProducts.map((product, index) => {
            const bgColors = ["bg-white", "bg-gray-100", "bg-gray-200", "bg-[#2C2C2C]"];
            const textColors = ["text-black", "text-black", "text-black", "text-white"];
            const isDark = index === 3;
            return (
              <div key={product.id} className={`${bgColors[index]} ${textColors[index]}`} style={{ width: '360px', height: '480px', minWidth: '280px', padding: '240px 32px 32px 32px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
                <div className="absolute top-0 left-0 w-full h-[240px] p-8"><Image src={product.image} alt={product.name} fill style={{objectFit:'contain'}}/></div>
                <div className="flex-grow flex flex-col text-left">
                  <h3 className="text-2xl font-semibold mb-3">{product.name}</h3>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-6`}>{product.description}</p>
                  <div className="mt-auto"><button className={`border rounded px-6 py-2 transition-colors duration-300 ${isDark ? 'border-white hover:bg-white hover:text-black' : 'border-black hover:bg-black hover:text-white'}`}>Shop Now</button></div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="md:hidden relative px-6">
          <div className="relative overflow-hidden">
            <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {popularProducts.map((product, index) => {
                const bgColors = ["bg-white", "bg-gray-100", "bg-gray-200", "bg-[#2C2C2C]"];
                const textColors = ["text-black", "text-black", "text-black", "text-white"];
                const isDark = index === 3;
                return (
                  <div key={product.id} className={`${bgColors[index]} ${textColors[index]} flex-shrink-0`} style={{ height: '480px', padding: '240px 32px 32px 32px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', width: '100%' }}>
                    <div className="absolute top-0 left-0 w-full h-[240px] p-8"><Image src={product.image} alt={product.name} fill style={{objectFit:'contain'}}/></div>
                    <div className="flex-grow flex flex-col text-left">
                      <h3 className="text-2xl font-semibold mb-3">{product.name}</h3>
                      <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-6`}>{product.description}</p>
                      <div className="mt-auto"><button className={`border rounded px-6 py-2 transition-colors duration-300 ${isDark ? 'border-white hover:bg-white hover:text-black' : 'border-black hover:bg-black hover:text-white'}`}>Shop Now</button></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {popularProducts.length > 1 && ( <> <button onClick={prevSlide} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200 z-10"><svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg></button><button onClick={nextSlide} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200 z-10"><svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button> </> )}
          {popularProducts.length > 1 && ( <div className="flex justify-center mt-6 space-x-2"> {popularProducts.map((_, index) => ( <button key={index} onClick={() => setCurrentSlide(index)} className={`w-3 h-3 rounded-full transition-all duration-200 ${ currentSlide === index ? 'bg-black scale-110' : 'bg-gray-300 hover:bg-gray-400' }`} /> ))} </div> )}
        </div>
      </section>
      
      <main className="p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold my-6 dark:text-black">Discounts up to -50%</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} id={product.id} name={product.name} description={product.description} image={product.image} price={product.price} category={product.category}/>
          ))}
        </div>
      </main>

      <section className="w-full bg-zinc-900 flex items-center justify-center relative overflow-hidden py-20 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/30"></div>
        <Image src="/image/17.png" alt="Laptop" width={237} height={237} className="absolute top-0 left-0 z-10 h-auto object-contain w-[120px] [transform:translateX(-35%)_translateY(-35%)] md:w-[237px] md:[transform:translateX(-25%)_translateY(-25%)]"/>
        <Image src="/image/image 18.png" alt="Tablet" width={419} height={419} className="absolute bottom-0 left-0 z-10 h-auto object-contain w-[210px] [transform:translateX(-35%)_translateY(35%)_rotate(-180deg)] md:w-[418.56px] md:[transform:translateX(-25%)_translateY(25%)_rotate(-180deg)]" />
        <div className="z-20 text-center text-white relative px-6">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-thin tracking-wider">Big Summer <span className="font-semibold">Sale</span></h2>
          <p className="text-zinc-400 mt-4 mb-8 text-base md:text-lg">Commodo fames vitae vitae leo mauris in. Eu consequat.</p>
          <button className="border border-zinc-600 rounded-lg px-8 py-2 md:px-9 md:py-3 text-sm font-medium hover:bg-white hover:text-black transition-colors duration-300">Shop Now</button>
        </div>
        <Image src="/image/image 8.png" alt="Phone" width={121} height={121} className="absolute top-0 right-0 z-10 h-auto object-contain w-[70px] [transform:translateX(35%)_translateY(-25%)_rotate(31.47deg)] md:w-[120.36px] md:[transform:translateX(25%)_translateY(-25%)_rotate(31.47deg)]"/>
        <Image src="/image/image 7.png" alt="Watch" width={404} height={404} className="absolute bottom-0 right-0 z-10 h-auto object-contain w-[200px] [transform:translateX(35%)_translateY(35%)] md:w-[404px] md:[transform:translateX(25%)_translateY(25%)]"/>
      </section>
    </div>
  );
}