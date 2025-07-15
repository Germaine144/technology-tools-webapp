'use client';

import React, { useState } from "react";
import Link from "next/link";
import { FiHeart, FiShoppingCart, FiUser, FiMenu, FiX } from "react-icons/fi";
import {
  IoIosPhonePortrait,
  IoMdWatch
} from "react-icons/io";
import { MdOutlineComputer } from "react-icons/md";
import { FaCamera, FaHeadphones } from "react-icons/fa";
import { IoLogoPlaystation } from "react-icons/io5";
import { useWishlist } from '../../../src/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import axios from "axios";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [showWishlist, setShowWishlist] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const { wishlist } = useWishlist();
  const { cart, removeFromCart } = useCart();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const router = useRouter();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Function to close all popups
  const closeAllPopups = () => {
    setMobileNavOpen(false);
    setShowCart(false);
    setShowWishlist(false);
  }
  
  // Define category links here for easy mapping in both mobile and desktop views
  const categoryLinks = [
    { href: "/products/phones", icon: <IoIosPhonePortrait />, label: "Phones" },
    { href: "/products/computers", icon: <MdOutlineComputer />, label: "Computers" },
    { href: "/products/smartwatches", icon: <IoMdWatch />, label: "Smart Watches" },
    { href: "/products/cameras", icon: <FaCamera />, label: "Cameras" },
    { href: "/products/headphones", icon: <FaHeadphones />, label: "Headphones" },
    { href: "/products/gaming", icon: <IoLogoPlaystation />, label: "Gaming" },
  ];

  const handleLogout = async () => {
    try {
      await axios.post("https://e-tech-store-6d7o.onrender.com/api/auth/logout", {}, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
      });
      router.push("/login");
    } catch (err) {
      // Optionally handle error
    }
  };

  return (
    <>
      {/* Top Header */}
      <header className="w-full bg-white shadow-sm border-b border-gray-200 text-black sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-black rounded-sm flex items-center justify-center">
                  <span className="text-white font-bold text-lg">▽</span>
                </div>
                <span className="font-bold text-xl tracking-tight">cyber</span>
              </Link>
            </div>

            {/* Center Search Bar (hidden on mobile) */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full px-4 py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white text-black"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                </div>
              </div>
            </div>

            {/* Desktop Navigation Links & Icons */}
            <div className="hidden md:flex items-center gap-8">
                <nav className="flex items-center gap-8 text-sm">
                    <Link href="/" className="text-gray-900 hover:text-black font-medium">Home</Link>
                    <Link href="/about" className="text-gray-600 hover:text-black">About</Link>
                    <Link href="/contact" className="text-gray-600 hover:text-black">Contact Us</Link>
                    <Link href="/blog" className="text-gray-600 hover:text-black">Blog</Link>
                </nav>
                
                {/* Desktop Icons */}
                <div className="flex items-center gap-4 ml-4 relative">
                  {/* Wishlist Icon */}
                  <button className="p-2 hover:bg-gray-100 rounded-full relative" onClick={() => setShowWishlist(!showWishlist)} aria-label="Wishlist">
                    <FiHeart className="w-5 h-5" />
                    {wishlist.length > 0 && (<span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{wishlist.length}</span>)}
                  </button>
                  {/* Cart Icon */}
                  <button className="p-2 hover:bg-gray-100 rounded-full relative" onClick={() => setShowCart(!showCart)} aria-label="Cart">
                    <FiShoppingCart className="w-5 h-5" />
                    {totalItems > 0 && (<span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{totalItems}</span>)}
                  </button>
                  {/* User Icon */}
                  <Link href="/login" className="p-2 hover:bg-gray-100" aria-label="Account">
                    <FiUser className="w-5 h-5" />
                  </Link>
                </div>
            </div>

            {/* Hamburger for mobile */}
            <button
              className="md:hidden p-2 rounded hover:bg-gray-100 focus:outline-none"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              aria-label="Open navigation menu"
            >
              {mobileNavOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* --- UNIFIED MOBILE NAVIGATION DROPDOWN --- */}
        {mobileNavOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Search */}
              <div className="relative w-full">
                <input type="text" placeholder="Search" className="w-full px-4 py-2 pl-10 text-sm border border-gray-300 rounded-md bg-white text-black"/>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                </div>
              </div>
              
              {/* Main Navigation Links */}
              <nav className="flex flex-col gap-1">
                <Link href="/" className="block py-2 text-gray-900 hover:bg-gray-100 rounded px-3" onClick={closeAllPopups}>Home</Link>
                <Link href="/about" className="block py-2 text-gray-600 hover:bg-gray-100 rounded px-3" onClick={closeAllPopups}>About</Link>
                <Link href="/contact" className="block py-2 text-gray-600 hover:bg-gray-100 rounded px-3" onClick={closeAllPopups}>Contact Us</Link>
                <Link href="/blog" className="block py-2 text-gray-600 hover:bg-gray-100 rounded px-3" onClick={closeAllPopups}>Blog</Link>
              </nav>

              {/* MODIFICATION: Category Links Added Here */}
              <div className="border-t border-gray-200 pt-4">
                <h3 className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Categories</h3>
                 <nav className="flex flex-col gap-1">
                    {categoryLinks.map(link => (
                       <Link key={link.href} href={link.href} className="flex items-center gap-3 py-2 text-gray-600 hover:bg-gray-100 rounded px-3" onClick={closeAllPopups}>
                         <span className="w-5 h-5 flex items-center justify-center">{link.icon}</span>
                         {link.label}
                       </Link>
                    ))}
                 </nav>
              </div>

              {/* User Account Links */}
              <div className="border-t border-gray-200 pt-4">
                 <nav className="flex flex-col gap-1">
                    <Link href="/wishlist" className="flex items-center gap-3 py-2 text-gray-600 hover:bg-gray-100 rounded px-3" onClick={closeAllPopups}>
                      <FiHeart className="w-5 h-5" /> Wishlist {wishlist.length > 0 && <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{wishlist.length}</span>}
                    </Link>
                    <Link href="/cart" className="flex items-center gap-3 py-2 text-gray-600 hover:bg-gray-100 rounded px-3" onClick={closeAllPopups}>
                      <FiShoppingCart className="w-5 h-5" /> My Cart {totalItems > 0 && <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{totalItems}</span>}
                    </Link>
                    <Link href="/login" className="flex items-center gap-3 py-2 text-gray-600 hover:bg-gray-100 rounded px-3" onClick={closeAllPopups}>
                      <FiUser className="w-5 h-5" /> My Account
                    </Link>
                 </nav>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* --- MODIFICATION: Desktop-Only Category Navigation --- */}
      <nav className="hidden md:block w-full bg-black text-white">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex items-center justify-center h-12">
            <div className="flex items-center gap-8 text-sm whitespace-nowrap">
              {categoryLinks.map((link, index) => (
                <React.Fragment key={link.href}>
                  <Link href={link.href} className="flex items-center gap-2 hover:text-gray-300">
                    {link.icon} {link.label}
                  </Link>
                  {index < categoryLinks.length - 1 && <span className="text-gray-500">|</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Popups for Wishlist and Cart - no changes needed here */}
      {showWishlist && ( <div className="absolute top-16 right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-50 border border-gray-200">{/* ... wishlist content ... */}</div>)}
      {showCart && (<div className="absolute top-16 right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50 border border-gray-200">{/* ... cart content ... */}</div>)}
    </>
  );
}
export default Navbar;