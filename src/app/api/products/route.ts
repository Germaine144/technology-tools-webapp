// src/app/api/products/route.ts
import { NextResponse } from 'next/server';

// Mock data - replace with your actual data source
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    description: "High-quality wireless headphones with noise cancellation",
    image: "/image/head13.png",
    category: "Electronics",
    rating: 4.5
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 99.99,
    description: "Smart watch with health tracking and Bluetooth support.",
    image: "/image/Sport.png",
    category: "Wearables",
    rating: 4.2
  },
  {
   id: 3,
    name: "iPhone 14 Pro",
    price: 1099.99,
    description: "Latest iPhone with Dynamic Island and 48MP camera.",
    image: "/image/𝐊𝐚𝐝1.png",
    category: "Telephones",
    rating: 4.8
  },
  {
   id: 4,
    name: "Samsung Galaxy S23",
    price : 899.99,
     description : "High-end Android phone with sleek design and performance.",
     image : "/image/head11.png",
    category : "Telephones",
    rating : 4.7
  },
  {
   id : 5,
     name : "Google Pixel 7",
     price : 649.99,
     description : "Google's latest phone with Tensor chip and clean Android.",
     image : "/image/goo.jpg",
     category : "Telephones",
     rating : 4.6
  },
  {
    id : 6,
     name : "MacBook Pro 16",
     price : 2499.99,
     description : "Powerful laptop with M2 Pro chip and retina display.",
     image : "/image/apple14.png",
     category : "Computers",
     rating : 4.9
  },
  {
    id : 7,
     name : "Apple Watch Series 8",
     price : 399.99,
     description : "Smart watch with health tracking and crash detection.",
     image : "/image/sony2.png",
     category : "Smart Watch",
     rating : 4.7
  },
  {
    id: 8,
    name: "Apple iPad",
    price: 59.99,
    description: "Fast performance, stunning display, perfect for everyday use.",
    image: "/image/iPad.png",
    category: "Home",
    rating: 4.5
  },
  {
    id : 9,
    name : "Samsung Galaxy Watch 5",
     price : 299.99,
     description : "Smart watch with WearOS and body composition sensor.",
     image : "/image/watch1.jpg",
     category : "Smart Watch",
     rating : 4.5
  },
  // {
  //   id: 10,
  //   name: "Bluetooth Speaker",
  //   price: 149.99,
  //   description: "Portable Bluetooth speaker with premium sound quality",
  //   image: "/images/product1.jpg",
  //   category: "Electronics",
  //   rating: 4.8
  // },
  // {
  //   id: 11,
  //   name: "Jeans",
  //   price: 79.99,
  //   description: "Classic denim jeans with comfortable fit",
  //   image: "/images/product2.jpg",
  //   category: "Clothing",
  //   rating: 4.3
  // },
  // {
  //   id: 12,
  //   name: "Water Bottle",
  //   price: 34.99,
  //   description: "Insulated stainless steel water bottle",
  //   image: "/images/product3.jpg",
  //   category: "Sports",
  //   rating: 4.5
  // }
];

export async function GET() {
  try {
    // If you're fetching from a database, do it here
    // const products = await db.products.findMany();
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}