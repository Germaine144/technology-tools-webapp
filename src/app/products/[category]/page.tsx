'use client';
import type { Product, FilterState } from '@/types/product';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProductCard from '@/components/Home/ProductCard';
import Link from 'next/link';

// Utility function to calculate filter option counts
const getFilterCounts = (
  products: Product[],
  filterType: keyof FilterState,
  options: string[]
) => {
  const counts: { [key: string]: number } = {};
  options.forEach(option => {
    counts[option] = products.filter(product => {
      const productValue = product[filterType as keyof Product];
      if (Array.isArray(productValue)) {
        return productValue.includes(option);
      } else {
        return productValue === option;
      }
    }).length;
  });
  return counts;
};

function normalizeCategory(cat: string) {
  // Converts "smartwatches" to "smartwatche", "phones" to "phone" etc.
  // This helps match URL slugs to product categories.
  return cat.trim().toLowerCase().replace(/s$/, '');
}

const MOCK_PRODUCTS: Product[] = [
  // --- Original Products ---
  {
    id: 1,
    name: "Apple iPhone 14 Pro",
    price: 1099.99,
    description: "Latest iPhone with Dynamic Island and 48MP camera.",
    image: "/image/14pro.png",
    category: "phones",
    brand: "Apple",
    rating: 4.8
  },
  {
    id: 2,
    name: "Samsung Galaxy S23",
    price: 899.99,
    description: "High-end Android phone with sleek design and performance.",
    image: "/image/gee.png",
    category: "phones",
    brand: "Samsung",
    rating: 4.7
  },
  {
    id: 3,
    name: "Apple Watch Series 8",
    price: 399.99,
    description: "Smart watch with health tracking and crash detection.",
    image: "/image/watch.png",
    category: "smartwatches",
    brand: "Apple",
  },
  {
    id: 4,
    name: "AirPods Max Silver",
    price: 549.99,
    description: "High-fidelity audio, Active Noise Cancellation, and personalized spatial audio.",
    image: "/image/head.png",
    category: "headphones",
    brand: "Apple",
  },
  {
    id: 5,
    name: "Samsung Galaxy Watch6 Classic 47mm Black",
    price: 399.99,
    description: "Premium smartwatch with advanced health tracking and rotating bezel.",
    image: "/image/samsung.png",
    category: "smartwatches",
    brand: "Samsung",
  },
  {
    id: 6,
    name: "Galaxy Z Fold5 Unlocked | 256GB | Phantom Black",
    price: 1799.99,
    description: "Revolutionary foldable smartphone with immersive display.",
    image: "/image/hy.png",
    category: "phones",
    brand: "Samsung",
  },
  {
    id: 7,
    name: "Galaxy Buds FE Graphite",
    price: 99.99,
    description: "Noise-canceling earbuds with rich sound and comfortable fit.",
    image: "/image/blue.png",
    category: "headphones",
    brand: "Samsung",
  },
  {
    id: 8,
    name: 'Apple iPad 9 10.2" 64GB Wi-Fi Silver (MK2L3) 2021',
    price: 329.99,
    description: "Affordable and powerful tablet for everyday use.",
    image: "/image/tablets.png",
    category: "tablets",
    brand: "Apple",
  },
  {
    id: 9,
    name: "MacBook Pro 16",
    price: 2499.99,
    description: "Powerful laptop with M2 Pro chip and retina display.",
    image: "/image/ui.png",
    category: "computers",
    brand: "Apple",
    processor: "M2",
    ram: "16GB",
    storage: "512GB SSD"
  },
  // --- Expanded Phone List ---
  // Apple
  { id: 10, name: "Apple iPhone 15", price: 799.99, description: "The new iPhone 15 with A16 Bionic chip.", image: "/image/01.png", category: "phones", brand: "Apple", rating: 4.6 },
  { id: 11, name: "Apple iPhone 15 Pro Max", price: 1199.99, description: "The ultimate iPhone experience with a titanium design.", image: "/image/Iphone14 pro.png", category: "phones", brand: "Apple", rating: 4.9 },
  { id: 12, name: "Apple iPhone SE (2022)", price: 429.00, description: "Powerful A15 Bionic chip in a compact design.", image: "/image/kt.png", category: "phones", brand: "Apple", rating: 4.4 },
  { id: 13, name: "Apple iPhone 13", price: 699.00, description: "A total powerhouse with a leap in battery life.", image: "/image/01.png", category: "phones", brand: "Apple", rating: 4.7 },
  { id: 14, name: "Apple iPhone 14 Plus", price: 899.00, description: "Big screen and big battery life.", image: "/image/Iphone 14 pro 1 (4).png", category: "phones", brand: "Apple", rating: 4.6 },
  
  // Samsung
  { id: 15, name: "Samsung Galaxy S23 Ultra", price: 1199.99, description: "Epic camera, epic performance, epic battery life.", image: "/image/@.png", category: "phones", brand: "Samsung", rating: 4.8 },
  { id: 16, name: "Samsung Galaxy A54 5G", price: 449.99, description: "Awesome camera, awesome screen, awesome battery.", image: "/image/Samsung.jpg", category: "phones", brand: "Samsung", rating: 4.5 },
  { id: 17, name: "Samsung Galaxy Z Flip5", price: 999.99, description: "The ultimate pocketable self-expression tool.", image: "/image/gee.png", category: "phones", brand: "Samsung", rating: 4.6 },
  { id: 18, name: "Samsung Galaxy S22", price: 699.99, description: "A pro-grade kit that fits in one hand.", image: "/image/$.png", category: "phones", brand: "Samsung", rating: 4.6 },
  { id: 19, name: "Samsung Galaxy A14", price: 199.99, description: "A great value phone with a large screen and 5G.", image: "/image/@.png", category: "phones", brand: "Samsung", rating: 4.2 },

  // Xiaomi
  { id: 20, name: "Xiaomi 13 Pro", price: 999.00, description: "Co-engineered with Leica, a masterpiece in imaging.", image: "/image/$.png", category: "phones", brand: "Xiaomi", rating: 4.7 },
  { id: 21, name: "Redmi Note 12 Pro", price: 349.00, description: "Vivid visuals and a smooth 120Hz display.", image: "/image/A2.png", category: "phones", brand: "Xiaomi", rating: 4.5 },
  { id: 22, name: "Poco F5 Pro", price: 499.00, description: "Flagship performance for gaming and everyday use.", image: "/image/gee1.png", category: "phones", brand: "Xiaomi", rating: 4.6 },
  { id: 23, name: "Xiaomi 12T", price: 599.00, description: "Mega moments, mega display, and hyper-charging.", image: "/image/@q.png", category: "phones", brand: "Xiaomi", rating: 4.4 },
  { id: 24, name: "Redmi A2", price: 99.00, description: "An affordable entry-level smartphone for basic needs.", image: "/image/Readmi.png", category: "phones", brand: "Xiaomi", rating: 4.0 },
  { id: 25, name: "Poco X5 Pro", price: 299.00, description: "The secret to winning, with a powerful Snapdragon 778G.", image: "/image/pocco.png", category: "phones", brand: "Xiaomi", rating: 4.5 },
  
  // Huawei
  { id: 26, name: "Huawei P60 Pro", price: 1199.00, description: "Ultra-lighting XMAGE camera with beautiful design.", image: "/image/huu5.jpg", category: "phones", brand: "Huawei", rating: 4.6 },
  { id: 27, name: "Huawei Mate 50 Pro", price: 1099.00, description: "Kunlun Glass and an adjustable aperture camera.", image: "/image/huu3.png", category: "phones", brand: "Huawei", rating: 4.5 },
  { id: 28, name: "Huawei Nova 11 Pro", price: 699.00, description: "Stunning design with a focus on portrait selfies.", image: "/image/huu1.png", category: "phones", brand: "Huawei", rating: 4.3 },
  { id: 29, name: "Huawei P50 Pocket", price: 999.00, description: "A foldable phone that's a statement of style.", image: "/image/huu6.png", category: "phones", brand: "Huawei", rating: 4.4 },
  { id: 30, name: "Huawei Mate X3", price: 2199.00, description: "The ultra-light, ultra-slim, large-screen foldable.", image: "/image/huu2.png", category: "phones", brand: "Huawei", rating: 4.7 },
  { id: 31, name: "Huawei Nova Y91", price: 299.00, description: "Huge battery and a massive screen for entertainment.", image: "/image/huu4.png", category: "phones", brand: "Huawei", rating: 4.1 },

  // OnePlus
  { id: 32, name: "OnePlus 11 5G", price: 699.00, description: "The Shape of Power with Snapdragon 8 Gen 2.", image: "/image/one1.png", category: "phones", brand: "OnePlus", rating: 4.7 },
  { id: 33, name: "OnePlus Nord 3 5G", price: 449.00, description: "A pretty much everything-you-could-ask-for phone.", image: "/image/one4.png", category: "phones", brand: "OnePlus", rating: 4.5 },
  { id: 34, name: "OnePlus 10T 5G", price: 549.00, description: "Evolve beyond speed with 150W SUPERVOOC charging.", image: "/image/one6.png", category: "phones", brand: "OnePlus", rating: 4.6 },
  { id: 35, name: "OnePlus Nord CE 3 Lite 5G", price: 299.00, description: "Larger than life with a 108MP camera system.", image: "/image/one5.png", category: "phones", brand: "OnePlus", rating: 4.3 },
  { id: 36, name: "OnePlus Open", price: 1699.00, description: "A flagship foldable that opens up new possibilities.", image: "/image/one7.png", category: "phones", brand: "OnePlus", rating: 4.8 },
  { id: 37, name: "OnePlus 10 Pro", price: 799.00, description: "Hasselblad Camera for Mobile, Snapdragon 8 Gen 1.", image: "/image/one2.png", category: "phones", brand: "OnePlus", rating: 4.7 },
  
  // Google
  { id: 38, name: "Google Pixel 8 Pro", price: 999.00, description: "The best of Google, with an amazing camera and AI.", image: "/image/google-pixel8-pro.png", category: "phones", brand: "Google", rating: 4.8 },
  { id: 39, name: "Google Pixel 7a", price: 499.00, description: "Fast, secure, and full of helpful features.", image: "/image/google-pixel-7a.png", category: "phones", brand: "Google", rating: 4.6 },
  { id: 40, name: "Google Pixel Fold", price: 1799.00, description: "The power of a Pixel. Now in a foldable design.", image: "/image/google-pixel-fold.png", category: "phones", brand: "Google", rating: 4.5 },
  { id: 41, name: "Google Pixel 8", price: 699.00, description: "Powerful, helpful, and built around you.", image: "/image/google-pixel-8.png", category: "phones", brand: "Google", rating: 4.7 },
  { id: 42, name: "Google Pixel 7", price: 599.00, description: "Powered by Google Tensor G2, it's simply smart.", image: "/image/google-pixel-7.png", category: "phones", brand: "Google", rating: 4.7 },
  { id: 43, name: "Google Pixel 6a", price: 349.00, description: "The budget-friendly Pixel with Google's brains.", image: "/image/google-pixel-6a.png", category: "phones", brand: "Google", rating: 4.5 },

  // Motorola
  { id: 44, name: "Motorola Razr+ (2023)", price: 999.99, description: "Flip the script with a huge external display.", image: "/image/half.png", category: "phones", brand: "Motorola", rating: 4.5 },
  { id: 45, name: "Motorola Edge+ (2023)", price: 799.99, description: "A powerhouse with a beautiful borderless display.", image: "/image/motorola-edge-plus.png", category: "phones", brand: "Motorola", rating: 4.4 },
  { id: 46, name: "Moto G Stylus 5G", price: 399.99, description: "Unleash your creativity with a built-in stylus.", image: "/image/moto-g-stylus.png", category: "phones", brand: "Motorola", rating: 4.3 },
  { id: 47, name: "Moto G Power 5G", price: 299.99, description: "Incredible battery life meets 5G speed.", image: "/image/half.png", category: "phones", brand: "Motorola", rating: 4.2 },
  { id: 48, name: "Motorola ThinkPhone", price: 699.99, description: "Business-grade security and seamless PC integration.", image: "/image/motorola-thinkphone.png", category: "phones", brand: "Motorola", rating: 4.6 },
  { id: 49, name: "Moto G Play (2023)", price: 169.99, description: "Up to 3 days of battery for endless fun.", image: "/image/moto-g-play.png", category: "phones", brand: "Motorola", rating: 4.0 },

  // Realme
  { id: 50, name: "Realme GT3", price: 649.00, description: "World's fastest charging with 240W SUPERVOOC.", image: "/image/14pro.png", category: "phones", brand: "Realme", rating: 4.6 },
  { id: 51, name: "Realme 11 Pro+", price: 499.00, description: "200MP OIS SuperZoom camera and premium design.", image: "/image/realme-11-pro.png", category: "phones", brand: "Realme", rating: 4.5 },
  { id: 52, name: "Realme C55", price: 199.00, description: "A champion in the segment with a mini capsule feature.", image: "/image/realme-c55.png", category: "phones", brand: "Realme", rating: 4.2 },
  { id: 53, name: "Realme GT Neo 5", price: 450.00, description: "Flagship performance with a unique transparent design.", image: "/image/14pro.png", category: "phones", brand: "Realme", rating: 4.7 },
  { id: 54, name: "Realme 10 Pro", price: 319.00, description: "Boundless display with a 120Hz refresh rate.", image: "/image/realme-10-pro.png", category: "phones", brand: "Realme", rating: 4.4 },
  { id: 55, name: "Realme GT2 Pro", price: 749.00, description: "A premium flagship that's greater than you see.", image: "/image/realme-gt2-pro.png", category: "phones", brand: "Realme", rating: 4.7 },

  // --- Expanded Computer List ---
  // Apple
  { id: 56, name: "Apple MacBook Air 13 M2", price: 1099.00, description: "Strikingly thin design, M2 chip, and up to 18 hours of battery life.", image: "/image/ui.png", category: "computers", brand: "Apple", processor: "M2", ram: "8GB", storage: "256GB SSD", graphics: "Integrated", rating: 4.8 },
  { id: 57, name: "Apple iMac 24-inch M1", price: 1299.00, description: "Immersive 24-inch 4.5K Retina display in a stunningly thin design.", image: "/image/airr.png", category: "computers", brand: "Apple", processor: "M1", ram: "8GB", storage: "256GB SSD", graphics: "Integrated", rating: 4.7 },
  { id: 58, name: "Apple Mac Studio M2 Max", price: 1999.00, description: "Outrageous performance and extensive connectivity for a creative studio.", image: "/image/air.png", category: "computers", brand: "Apple", processor: "M2", ram: "32GB", storage: "512GB SSD", graphics: "Integrated", rating: 4.9 },

  // Dell
  { id: 59, name: "Dell XPS 13 Plus Laptop", price: 1299.00, description: "Futuristic, minimalist design with powerful Intel Core performance.", image: "/image/dellr.png", category: "computers", brand: "Dell", processor: "Intel i7", ram: "16GB", storage: "512GB SSD", graphics: "Integrated", rating: 4.6 },
  { id: 60, name: "Dell Alienware m18 Gaming Laptop", price: 2499.99, description: "Peak gaming performance with an 18-inch display and RTX graphics.", image: "/image/ani1.jpg", category: "computers", brand: "Dell", processor: "Intel i9", ram: "32GB", storage: "1TB SSD", graphics: "NVIDIA RTX", rating: 4.8 },
  { id: 61, name: "Dell Inspiron 15 Laptop", price: 649.99, description: "A versatile and affordable laptop for everyday use.", image: "/image/ani.jpg", category: "computers", brand: "Dell", processor: "Intel i5", ram: "8GB", storage: "512GB SSD", graphics: "Integrated", rating: 4.3 },
  
  // HP
  { id: 62, name: "HP Spectre x30 14 2-in-1", price: 1449.99, description: "A convertible powerhouse with a stunning OLED display.", image: "/image/ui.png", category: "computers", brand: "HP", processor: "Intel i7", ram: "16GB", storage: "1TB SSD", graphics: "Integrated", rating: 4.7 },
  { id: 63, name: "HP OMEN 16 Gaming Laptop", price: 1599.99, description: "Play at your best with a powerful AMD processor and NVIDIA graphics.", image: "/image/ui.png", category: "computers", brand: "HP", processor: "AMD Ryzen 7", ram: "16GB", storage: "1TB SSD", graphics: "NVIDIA RTX", rating: 4.6 },
  { id: 64, name: "HP Pavilion Aero 13", price: 799.99, description: "Incredibly lightweight with a premium look and feel.", image: "/image/ui.png", category: "computers", brand: "HP", processor: "AMD Ryzen 5", ram: "16GB", storage: "512GB SSD", graphics: "Integrated", rating: 4.5 },

  // Lenovo
  { id: 65, name: "Lenovo ThinkPad X1 Carbon Gen 11", price: 1749.00, description: "The ultimate business ultrabook, refined for modern professionals.", image: "/image/lenovor.png", category: "computers", brand: "Lenovo", processor: "Intel i7", ram: "16GB", storage: "512GB SSD", graphics: "Integrated", rating: 4.8 },
  { id: 66, name: "Lenovo Yoga 7i 16 2-in-1", price: 999.00, description: "Flexibility and performance for creativity and productivity.", image: "/image/leno.jpg", category: "computers", brand: "Lenovo", processor: "Intel i7", ram: "16GB", storage: "512GB SSD", graphics: "Integrated", rating: 4.5 },
  { id: 67, name: "Lenovo Legion Pro 5i Gen 8", price: 1799.00, description: "AI-tuned gaming performance that dominates the competition.", image: "/image/Laptop.jpg", category: "computers", brand: "Lenovo", processor: "Intel i7", ram: "16GB", storage: "1TB SSD", graphics: "NVIDIA RTX", rating: 4.7 },

  // Asus
  { id: 68, name: "Asus ROG Zephyrus G14 (2023)", price: 1599.99, description: "The ultimate portable gaming laptop with an AniMe Matrix display.", image: "/image/asusr1.png", category: "computers", brand: "Asus", processor: "AMD Ryzen 9", ram: "16GB", storage: "1TB SSD", graphics: "NVIDIA RTX", rating: 4.8 },
  { id: 69, name: "Asus Zenbook 14X OLED", price: 1199.99, description: "A powerful and compact laptop with a breathtaking OLED screen.", image: "/image/assusr.png", category: "computers", brand: "Asus", processor: "Intel i7", ram: "16GB", storage: "512GB SSD", graphics: "Integrated", rating: 4.6 },
  { id: 70, name: "Asus TUF Gaming A15", price: 1099.99, description: "Durable, reliable gaming laptop with high-refresh-rate display.", image: "/image/assur2.png", category: "computers", brand: "Asus", processor: "AMD Ryzen 7", ram: "16GB", storage: "512GB SSD", graphics: "NVIDIA RTX", rating: 4.4 },

  // Acer
  { id: 71, name: "Acer Swift Go 14", price: 899.99, description: "Ultralight design with a vibrant OLED display and Intel Evo platform.", image: "/image/accerr2.png", category: "computers", brand: "Acer", processor: "Intel i7", ram: "16GB", storage: "512GB SSD", graphics: "Integrated", rating: 4.5 },
  { id: 72, name: "Acer Predator Helios 16", price: 1649.99, description: "Next-gen gaming with a 13th Gen Intel CPU and RTX 40 series GPU.", image: "/image/accerr1.png", category: "computers", brand: "Acer", processor: "Intel i7", ram: "16GB", storage: "1TB SSD", graphics: "NVIDIA RTX", rating: 4.6 },
  { id: 73, name: "Acer Aspire 3", price: 429.99, description: "Practical and affordable laptop for everyday tasks and browsing.", image: "/image/accerr.png", category: "computers", brand: "Acer", processor: "AMD Ryzen 5", ram: "8GB", storage: "256GB SSD", graphics: "Integrated", rating: 4.1 },

  // MSI
  { id: 74, name: "MSI Titan GT77 HX", price: 4299.00, description: "Desktop-caliber performance in a mobile form factor for hardcore gamers.", image: "/image/msir.png", category: "computers", brand: "MSI", processor: "Intel i9", ram: "64GB", storage: "2TB SSD", graphics: "NVIDIA RTX", rating: 4.9 },
  { id: 75, name: "MSI Katana 15 (2023)", price: 1199.00, description: "Sharpen your game with a powerful and sleek gaming laptop.", image: "/image/msi1.jpg", category: "computers", brand: "MSI", processor: "Intel i7", ram: "16GB", storage: "1TB SSD", graphics: "NVIDIA RTX", rating: 4.5 },
  { id: 76, name: "MSI Stealth 16 Studio", price: 1999.00, description: "A crossover laptop for gaming and content creation in a thin profile.", image: "/image/ani6.jpg", category: "computers", brand: "MSI", processor: "Intel i7", ram: "32GB", storage: "1TB SSD", graphics: "NVIDIA RTX", rating: 4.7 },

  //Canon

 { id: 77, name: "Canon EOS M50 Mark II", price: 4299.00, description: "Compact mirrorless camera ideal for vlogging and content creation.", image: "/image/nikon2.jpg", category: "cameras", brand: "Canon", processor: "DIGIC 8", ram: "Not Applicable", storage: "SD Card", graphics: "Not Applicable", rating: 4.9 },
  { id: 78, name: "Canon EOS M50 Mark II", price: 1199.00, description: "Compact mirrorless camera ideal for vlogging and .", image: "/image/canon2.jpg", category: "cameras", brand: "Canon", processor: "DIGIC 7", ram: "Not Applicable", storage: "SD Card", graphics: "Not Applicable", rating: 4.5 },
  { id: 79, name: "MSI Stealth 16 Studio", price: 1999.00, description: "A crossover laptop for gaming and content creation in a thin profile.", image: "/image/canon2.jpg", category: "cameras", brand: "Canon", processor: "Intel i7", ram: "32GB", storage: "1TB SSD", graphics: "NVIDIA RTX", rating: 4.7 },

//Nikon
  { id: 80, name: "Nikon Z8", price: 4299.00, description: "Flagship mirrorless camera with fast autofocus and 8K internal video recording.", image: "/image/nikon1.jpg", category: "cameras", brand: "Nikon", processor: "EXPEED 7", ram: "Not Applicable", storage: "Dual CFexpress/SD", graphics: "Not Applicable", rating: 4.9 },
  { id: 81, name: "Nikon D5600", price: 1199.00, description: "User-friendly DSLR with great image quality and wireless sharing.", image: "/image/Nikon.jpg", category: "cameras", brand: "Nikon", processor: "EXPEED 4", ram: "16GB", storage: "SD Card", graphics: "Not Applicable", rating: 4.5 },
  { id: 82, name: "MSI Stealth 16 Studio", price: 1999.00, description: "A crossover laptop for gaming and content creation in a thin profile.", image: "/image/nikon2.jpg", category: "cameras", brand: "Nikon", processor: "Intel i7", ram: "Not Applicable", storage: "1TB SSD", graphics: "NVIDIA RTX", rating: 4.7 },

  //Sony

  { id: 83, name: "Sony Alpha a7 IV", price: 4299.00, description: "A hybrid mirrorless camera built for creators with 33MP sensor and real-time tracking AF.", image: "/image/sony1.jpg", category: "cameras", brand: "Sony", processor: "BIONZ XR", ram: "Not Applicable", storage: "Dual Card Slots", graphics: "Not Applicable", rating: 4.9 },
  { id: 84, name: "Sony ZV-E10", price: 1199.00, description: "Interchangeable lens vlogging camera with a flip screen and microphone input.", image: "/image/sonyr.jpg", category: "cameras", brand: "Sony", processor: "BIONZ X", ram: "Not Applicable", storage: "SD Card", graphics: "Not Applicable", rating: 4.5 },
  { id: 85, name: "MSI Stealth 16 Studio", price: 1999.00, description: "A crossover laptop for gaming and content creation in a thin profile.", image: "/image/sony1.jpg", category: "cameras", brand: "Sony", processor: "Intel i7", ram: "32GB", storage: "1TB SSD", graphics: "NVIDIA RTX", rating: 4.7 },

  //Fujifilm

   { id: 86, name: "Fujifilm X-T5", price: 4299.00, description: "High-resolution APS-C mirrorless camera with retro styling and advanced controls.", image: "/image/fuji.jpg", category: "cameras", brand: "Fujifilm", processor: "X-Processor 5", ram: "Not Applicable", storage: "Dual SD Cards", graphics: "Not Applicable", rating: 4.9 },
  { id: 87, name: "Fujifilm X10", price: 1199.00, description: "Premium compact camera with a fixed lens and hybrid viewfinder.", image: "/image/fuji1.jpg", category: "cameras", brand: "Fujifilm", processor: "X-Processor 4", ram: "Not Applicable", storage: " SD Cards", graphics: "Not Applicable", rating: 4.5 },
  { id: 88, name: "MSI Stealth 16 Studio", price: 1999.00, description: "A crossover laptop for gaming and content creation in a thin profile.", image: "/image/fuji1.jpg", category: "cameras", brand: "Fujifilm", processor: "Intel i7", ram: "32GB", storage: "1TB SSD", graphics: "NVIDIA RTX", rating: 4.7 },
];


export default function ProductsPage() {
  const { category } = useParams();
  const categoryNumberToName: Record<string, string> = {
    '1': 'phones', '2': 'computers', '3': 'smartwatches', '4': 'cameras', '5': 'headphones', '6': 'gaming', '7': 'tablets',
  };
  let categoryString = Array.isArray(category) ? category[0] : category || 'phones';
  if (categoryNumberToName[categoryString]) {
    categoryString = categoryNumberToName[categoryString];
  }
  const searchParams = useSearchParams();
  const highlightId = searchParams.get('highlight');
  const modelParam = searchParams.get('model');
  
  // State management
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);
  const [displayProducts, setDisplayProducts] = useState<Product[]>([]);

  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 3000], brands: [], colors: [], storage: [], protectionClass: [], screenDiagonal: [], screenType: [], batteryCapacity: [], connectivity: [], cameraMP: [], resolution: [], sensorType: [], lensMount: [], videoResolution: [], strapMaterial: [], features: [], waterResistance: [], type: [], noiseCancellation: [], batteryLife: [], driverSize: [], screenSize: [], pencilSupport: [], processor: [], ram: [], graphics: [], models: [], accessories: [], bundles: [],
  });

  const productsPerPage = 9;

  // Static filter options
  const filterOptions = {
    phones: { brands: ['Apple', 'Samsung', 'Xiaomi', 'Huawei', 'OnePlus', 'Google', 'Motorola', 'Realme'], storage: ['64GB', '128GB', '256GB', '512GB', '1TB'], protectionClass: ['IP67', 'IP68', 'IP54'], screenDiagonal: ['5.4"', '6.1"', '6.7"', '6.8"'], screenType: ['OLED', 'LCD', 'AMOLED', 'Super Retina XDR'], batteryCapacity: ['3000mAh', '4000mAh', '5000mAh', '6000mAh'], },
    cameras: { brands: ['Canon', 'Nikon', 'Sony', 'Fujifilm', 'Panasonic', 'Olympus'], resolution: ['12MP', '20MP', '24MP', '32MP', '45MP'], sensorType: ['Full Frame', 'APS-C', 'Micro Four Thirds'], lensMount: ['EF', 'RF', 'F', 'E', 'Z'], videoResolution: ['1080p', '4K', '6K', '8K'], },
    smartwatches: { brands: ['Apple', 'Samsung', 'Garmin', 'Fitbit', 'Huawei'], screenType: ['OLED', 'AMOLED', 'LCD'], strapMaterial: ['Silicone', 'Leather', 'Stainless Steel'], features: ['Heart Rate', 'GPS', 'Sleep Tracking', 'ECG'], waterResistance: ['Yes', 'No'], },
    headphones: { brands: ['Sony', 'Bose', 'JBL', 'Apple', 'Samsung', 'Logitech'], type: ['Over-Ear', 'In-Ear', 'On-Ear'], connection: ['Wired', 'Wireless', 'Bluetooth'], features: ['Noise Cancelling', 'Mic Included', 'Surround Sound'], },
    tablets: { brands: ['Apple', 'Samsung', 'Lenovo', 'Microsoft', 'Huawei'], storage: ['64GB', '128GB', '256GB', '512GB', '1TB'], screenSize: ['8"', '10.2"', '11"', '12.9"'], operatingSystem: ['iPadOS', 'Android', 'Windows'], batteryLife: ['Up to 10h', 'Up to 12h', 'Up to 14h'], },
    computers: { brands: ['Apple', 'Dell', 'HP', 'Lenovo', 'Asus', 'Acer', 'MSI'], processor: ['Intel i5', 'Intel i7', 'Intel i9', 'AMD Ryzen 5', 'Ryzen 7', 'M1', 'M2'], ram: ['8GB', '16GB', '32GB', '64GB'], storage: ['256GB SSD', '512GB SSD', '1TB SSD', '2TB SSD'], graphics: ['Integrated', 'NVIDIA GTX', 'NVIDIA RTX', 'AMD Radeon'], },
    playstation: { models: ['PS4', 'PS4 Pro', 'PS5 Digital', 'PS5 Standard'], storage: ['500GB', '1TB', '2TB'], accessories: ['DualSense Controller', 'Headset', 'Charging Station', 'Camera'], bundles: ['With Game', 'With Extra Controller', 'With VR'], },
  };

  const currentFilterOptions = filterOptions[categoryString as keyof typeof filterOptions] || filterOptions.phones;

  // FIX: Simplified to load the new MOCK_PRODUCTS directly.
  useEffect(() => {
    setIsLoading(true);
    // Combine mock products with any from local storage
    let adminProducts: Product[] = [];
    if (typeof window !== "undefined") {
      try { adminProducts = JSON.parse(window.localStorage.getItem("productStorage") || '[]'); } catch {}
    }
    setProducts([...MOCK_PRODUCTS, ...adminProducts]);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setFilters({
      priceRange: [0, 3000], brands: [], colors: [], storage: [], protectionClass: [], screenDiagonal: [], screenType: [], batteryCapacity: [], connectivity: [], cameraMP: [], resolution: [], sensorType: [], lensMount: [], videoResolution: [], strapMaterial: [], features: [], waterResistance: [], type: [], noiseCancellation: [], batteryLife: [], driverSize: [], screenSize: [], pencilSupport: [], processor: [], ram: [], graphics: [], models: [], accessories: [], bundles: [],
    });
    setCurrentPage(1);
    setSortBy('name');
  }, [categoryString]);

  useEffect(() => {
    let processedProducts = [...products];

    // Filter by category string
    processedProducts = processedProducts.filter(
      (product) => product.category && normalizeCategory(product.category) === normalizeCategory(categoryString)
    );

    // Apply other filters
    processedProducts = processedProducts.filter(product => {
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) return false;
      if (modelParam && !product.name.trim().toLowerCase().includes(modelParam.trim().toLowerCase())) return false;
      
      // Check brand filter separately
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand || '')) {
          return false;
      }

      // Check other filters (excluding brands now)
      for (const [filterType, filterValues] of Object.entries(filters)) {
        if (filterType === 'priceRange' || filterType === 'brands' || !Array.isArray(filterValues) || filterValues.length === 0) continue;
        const productValue = product[filterType as keyof Product];
        if (!productValue) return false;
        if (Array.isArray(productValue)) {
          if (!productValue.some(val => filterValues.includes(val))) return false;
        } else {
          if (!filterValues.includes(productValue as string)) return false;
        }
      }
      return true;
    });

    processedProducts.sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return (b.rating ?? 0) - (a.rating ?? 0);
        default: return a.name.localeCompare(b.name);
      }
    });

    setDisplayProducts(processedProducts);
    setCurrentPage(1);
  }, [products, filters, sortBy, modelParam, categoryString]);

  const handleFilterChange = (filterType: keyof FilterState, value: [number, number] | string[]) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const handleCheckboxChange = (filterType: keyof FilterState, value: string) => {
    setFilters((prev: FilterState) => {
      const currentValues = (prev[filterType] as string[]) || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(item => item !== value)
        : [...currentValues, value];
      return { ...prev, [filterType]: newValues };
    });
  };

  const clearFilters = () => {
    setFilters({
      priceRange: [0, 3000], brands: [], colors: [], storage: [], protectionClass: [], screenDiagonal: [], screenType: [], batteryCapacity: [], connectivity: [], cameraMP: [], resolution: [], sensorType: [], lensMount: [], videoResolution: [], strapMaterial: [], features: [], waterResistance: [], type: [], noiseCancellation: [], batteryLife: [], driverSize: [], screenSize: [], pencilSupport: [], processor: [], ram: [], graphics: [], models: [], accessories: [], bundles: [],
    });
  };

  const totalPages = Math.ceil(displayProducts.length / productsPerPage);
  const currentProducts = displayProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }
  
  const normalizedCategory = normalizeCategory(categoryString);
  const productsInCategory = products.filter(p => p.category && normalizeCategory(p.category) === normalizedCategory);
  const dynamicBrands = Array.from(new Set(productsInCategory.map(p => p.brand).filter(Boolean)));
  
  const safeOptions = currentFilterOptions as { brands?: string[] };
  const staticBrands = (safeOptions && Array.isArray(safeOptions.brands)) ? safeOptions.brands : [];
  
  const dynamicFilterOptions = {
    ...currentFilterOptions,
    brands: [...new Set([...staticBrands, ...dynamicBrands])],
  };

  const renderFilterSection = (filterKey: keyof FilterState, title: string) => {
    const options = (dynamicFilterOptions[filterKey as keyof typeof dynamicFilterOptions] || []) as string[];
    if (options.length === 0) return null;
    const counts = getFilterCounts(productsInCategory, filterKey, options);
    return (
      <div className="mb-6" key={filterKey}>
        <h3 className="font-medium mb-3 flex items-center justify-between">{title}<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {options.map(option => (
            filterKey === 'brands' ? (
              <label key={option} className="flex items-center space-x-2 text-sm cursor-pointer">
                <input type="checkbox" checked={(filters[filterKey] as string[])?.includes(option) || false} onChange={() => handleCheckboxChange(filterKey, option)} className="rounded" />
                <span
                  onClick={() => setFilters(prev => ({ ...prev, brands: [option] }))}
                  style={{ textDecoration: 'underline', color: '#2563eb', cursor: 'pointer' }}
                >
                  {option}
                </span>
                <span className="text-gray-400 text-xs">({counts[option] || 0})</span>
              </label>
            ) : (
              <label key={option} className="flex items-center space-x-2 text-sm">
                <input type="checkbox" checked={(filters[filterKey] as string[])?.includes(option) || false} onChange={() => handleCheckboxChange(filterKey, option)} className="rounded" />
                <span>{option}</span>
                <span className="text-gray-400 text-xs">({counts[option] || 0})</span>
              </label>
            )
          ))}
        </div>
      </div>
    );
  };
  const FilterModal = () => (
    <div className={`fixed inset-0 z-50 ${showFilters ? 'block' : 'hidden'} lg:hidden`}>
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowFilters(false)} />
      <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Filters</h2>
            <button onClick={() => setShowFilters(false)} className="p-2 hover:bg-gray-100 rounded-full"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
          </div>
          <div className="mb-8">
            <h3 className="font-semibold mb-3">Price</h3>
            <div className="flex items-center space-x-2 mb-2">
              <input type="number" value={filters.priceRange[0]} onChange={(e) => handleFilterChange('priceRange', [Number(e.target.value), filters.priceRange[1]])} className="w-20 px-2 py-1 border rounded text-sm" min="0" />
              <span>-</span>
              <input type="number" value={filters.priceRange[1]} onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], Number(e.target.value)])} className="w-20 px-2 py-1 border rounded text-sm" min="0" />
            </div>
            <input type="range" min="0" max="3000" step="50" value={filters.priceRange[1]} onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], Number(e.target.value)])} className="w-full" />
          </div>
          {Object.keys(dynamicFilterOptions).map((key) => renderFilterSection(key as keyof FilterState, key.charAt(0).toUpperCase() + key.slice(1)))}
          <button onClick={clearFilters} className="mt-6 w-full py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium">Clear all filters</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fafbfc] text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="text-sm text-gray-500 mb-4 sm:mb-6 flex items-center space-x-1">
          <Link href="/" className="hover:underline">Home</Link>
          <span className="mx-1">/</span>
          <span className="capitalize text-gray-800 font-semibold">{categoryString}</span>
        </div>
        <div className="lg:hidden mb-4">
          <button onClick={() => setShowFilters(true)} className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" /></svg><span>Filters</span></button>
        </div>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow p-6 sticky top-6">
              <h2 className="text-xl font-bold mb-6">Filters</h2>
              <div className="mb-8">
                <h3 className="font-semibold mb-3">Price</h3>
                <div className="flex items-center space-x-2 mb-2">
                  <input type="number" value={filters.priceRange[0]} onChange={(e) => handleFilterChange('priceRange', [Number(e.target.value), filters.priceRange[1]])} className="w-20 px-2 py-1 border rounded text-sm" min="0" />
                  <span>-</span>
                  <input type="number" value={filters.priceRange[1]} onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], Number(e.target.value)])} className="w-20 px-2 py-1 border rounded text-sm" min="0" />
                </div>
                <input type="range" min="0" max="3000" step="50" value={filters.priceRange[1]} onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], Number(e.target.value)])} className="w-full" />
              </div>
              {Object.keys(dynamicFilterOptions).map((key) => renderFilterSection(key as keyof FilterState, key.charAt(0).toUpperCase() + key.slice(1)))}
              <button onClick={clearFilters} className="mt-6 w-full py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium">Clear all filters</button>
            </div>
          </aside>
          <main className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <span className="text-sm sm:text-base text-gray-600">Selected Products:</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm sm:text-base font-semibold">{displayProducts.length}</span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <span className="text-sm sm:text-base text-gray-600 hidden sm:inline">Sort by:</span>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border rounded px-2 sm:px-3 py-1 text-sm sm:text-base min-w-0">
                  <option value="name">Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>
            {currentProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-10">
                {currentProducts.map((product) => (
                  <ProductCard key={product.id} {...product} isHighlighted={highlightId !== null && product.id === Number(highlightId)} fromCategory={true} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 sm:py-12">
                <div className="text-gray-400 mb-4"><svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg></div>
                <p className="text-gray-600 text-sm sm:text-base">No products found matching your filters</p>
                <button onClick={clearFilters} className="mt-4 text-blue-600 hover:text-blue-800 text-sm sm:text-base">Clear all filters</button>
              </div>
            )}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-1 sm:space-x-2 overflow-x-auto pb-2">
                <button onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1} className="px-2 sm:px-3 py-1 rounded border disabled:opacity-50 text-sm sm:text-base flex-shrink-0">Prev</button>
                {[...Array(totalPages)].map((_, i) => (
                  <button key={i + 1} onClick={() => setCurrentPage(i + 1)} className={`px-2 sm:px-3 py-1 rounded text-sm sm:text-base flex-shrink-0 ${currentPage === i + 1 ? 'bg-black text-white' : 'border hover:bg-gray-50'}`}>{i + 1}</button>
                )).slice(Math.max(0, currentPage-3), Math.min(totalPages, currentPage+2))}
                <button onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages} className="px-2 sm:px-3 py-1 rounded border disabled:opacity-50 text-sm sm:text-base flex-shrink-0">Next</button>
              </div>
            )}
          </main>
        </div>
      </div>
      <FilterModal />
    </div>
  );
}