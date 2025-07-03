// src/app/api/products/route.ts
import { NextResponse } from 'next/server';

const products = [
  // Phones (Telephones)
  {
    id: 1,
    name: "Apple iPhone 14 Pro",
    price: 1099.99,
    description: "Latest iPhone with Dynamic Island and 48MP camera.",
    image: "/image/𝐊𝐚𝐝1.png",
    category: "Telephones",
    rating: 4.8
  },
  {
    id: 2,
    name: "Samsung Galaxy S23",
    price: 899.99,
    description: "High-end Android phone with sleek design and performance.",
    image: "/image/head11.png",
    category: "Telephones",
    rating: 4.7
  },
  {
    id: 3,
    name: "Google Pixel 7",
    price: 649.99,
    description: "Google's latest phone with Tensor chip and clean Android.",
    image: "/image/goo.jpg",
    category: "Telephones",
    rating: 4.6
  },

  // Computers
  {
    id: 4,
    name: "MacBook Pro 16",
    price: 2499.99,
    description: "Powerful laptop with M2 Pro chip and retina display.",
    image: "/image/apple14.png",
    category: "Computers",
    rating: 4.9
  },
  {
    id: 5,
    name: "Dell XPS 13",
    price: 1299.99,
    description: "Premium ultrabook with stunning InfinityEdge display.",
    image: "/image/dell.png",
    category: "Computers",
    rating: 4.6
  },

  // Smart Watches
  {
    id: 6,
    name: "Apple Watch Series 8",
    price: 399.99,
    description: "Smart watch with health tracking and crash detection.",
    image: "/image/watchpp.png",
    category: "Smart Watch",
    rating: 4.7
  },
  {
    id: 7,
    name: "Samsung Galaxy Watch 5",
    price: 299.99,
    description: "Smart watch with WearOS and body composition sensor.",
    image: "/image/watch1.jpg",
    category: "Smart Watch",
    rating: 4.5
  },

  // Electronics (Headphones)
  {
    id: 8,
    name: "Sony WH-1000XM4 Headphones",
    price: 349.99,
    description: "Industry-leading noise canceling wireless headphones.",
    image: "/image/sony.png",
    category: "Electronics",
    rating: 4.8
  },
  {
    id: 9,
    name: "Bose QuietComfort 45",
    price: 329.99,
    description: "Wireless noise cancelling headphones with superior comfort.",
    image: "/image/hot.png",
    category: "Electronics",
    rating: 4.6
  },
  {
    id: 9,
    name: "Bose QuietComfort 45",
    price: 329.90,
    description: "Wireless noise cancelling headphones with superior comfort.",
    image: "/image/boss.png",
    category: "Electronics",
    rating: 4.5
  },

  // Home & Tablets
  {
    id: 10,
    name: "Apple iPad Pro",
    price: 799.99,
    description: "Most advanced iPad with M2 chip and Liquid Retina display.",
    image: "/image/iPad.png",
    category: "Home",
    rating: 4.8
  },

  // Cameras
  {
    id: 11,
    name: "Canon EOS R6 Mark II",
    price: 2499.99,
    description: "Professional mirrorless camera with advanced autofocus.",
    image: "/image/digi.png",
    category: "Cameras",
    rating: 4.9
  },
  {
    id: 12,
    name: "Sony Alpha A7 IV",
    price: 2198.99,
    description: "Full-frame mirrorless camera with 33MP sensor.",
    image: "/image/sony2.png",
    category: "Cameras",
    rating: 4.8
  },

  // Gaming & PlayStation
  {
    id: 13,
    name: "PlayStation 5",
    price: 499.99,
    description: "Next-gen gaming console with 4K gaming and ray tracing.",
    image: "/image/station.png",
    category: "Gaming",
    rating: 4.9
  },
  {
    id: 14,
    name: "Xbox Series X",
    price: 499.99,
    description: "Most powerful Xbox with 4K gaming and Quick Resume.",
    image: "/image/play.png",
    category: "Gaming",
    rating: 4.8
  }
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