// src/app/api/products/route.ts
import { NextResponse } from 'next/server';
const products = [
  {
    id: 1,
    name: "Apple iPhone 14 Pro",
    price: 1099.99,
    description: "Latest iPhone with Dynamic Island and 48MP camera.",
    image: "/image/14pro.png",
    category: "phones",
    rating: 4.8
  },
  {
    id: 2,
    name: "Samsung Galaxy S23",
    price: 899.99,
    description: "High-end Android phone with sleek design and performance.",
    image: "/image/samsung.png",
    category: "Telephones",
    rating: 4.7
  },
  {
    id: 3,
    name: "Apple Watch Series 8",
    price: 399.99,
    description: "Smart watch with health tracking and crash detection.",
    image: "/image/watch.png",
    category: "Smart Watch",
  },
  {
    id: 4,
    name: "AirPods Max Silver",
    price: 549.99,
    description: "High-fidelity audio, Active Noise Cancellation, and personalized spatial audio.",
    image: "/image/head.png", 
    category: "Headphones",
  },
  {
    id: 5,
    name: "Samsung Galaxy Watch6 Classic 47mm Black",
    price: 399.99,
    description: "Premium smartwatch with advanced health tracking and rotating bezel.",
    image: "/image/samsung.png",
    category: "Smart Watch",
  },
  {
    id: 6,
    name: "Galaxy Z Fold5 Unlocked | 256GB | Phantom Black",
    price: 1799.99,
    description: "Revolutionary foldable smartphone with immersive display.",
    image: "/image/hy.png",
    category: "Telephones",
  },
  {
    id: 7,
    name: "Galaxy Buds FE Graphite",
    price: 99.99,
    description: "Noise-canceling earbuds with rich sound and comfortable fit.",
    image: "/image/blue.png",
    category: "Headphones",
  },
  {
    id: 8,
    name: 'Apple iPad 9 10.2" 64GB Wi-Fi Silver (MK2L3) 2021',
    price: 329.99,
    description: "Affordable and powerful tablet for everyday use.",
    image: "/image/tablets.png",
    category: "Tablet",
  },
  {
    id: 9,
    name: "MacBook Pro 16",
    price: 2499.99,
    description: "Powerful laptop with M2 Pro chip and retina display.",
    image: "/image/ui.png",
    category: "Computers",
  },

];


export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    // Filter by category if provided
    let filteredProducts = products;
    if (category && category !== 'all') {
      filteredProducts = products.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    return NextResponse.json(filteredProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}