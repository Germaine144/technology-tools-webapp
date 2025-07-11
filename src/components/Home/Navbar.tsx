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

const Navbar = () => {
  const [showWishlist, setShowWishlist] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const { wishlist } = useWishlist();
  const { cart, removeFromCart } = useCart();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Function to close all popups
  const closeAllPopups = () => {
    setMobileNavOpen(false);
    setShowCart(false);
    setShowWishlist(false);
  }

  return (
    <>
      {/* Top Header */}
      <header className="w-full bg-white shadow-sm border-b text-black sticky top-0 z-50">
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
                  className="w-full px-4 py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
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
                  {/* Wishlist Logic remains the same */}
                  <button className="p-2 hover:bg-gray-100 rounded-full relative" onClick={() => setShowWishlist(!showWishlist)} aria-label="Wishlist">
                    <FiHeart className="w-5 h-5" />
                    {wishlist.length > 0 && (<span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{wishlist.length}</span>)}
                  </button>
                  {showWishlist && (
                    <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                      {/* ... wishlist content ... */}
                    </div>
                  )}

                  {/* Cart Logic remains the same */}
                  <button className="p-2 hover:bg-gray-100 rounded-full relative" onClick={() => setShowCart(!showCart)} aria-label="Cart">
                    <FiShoppingCart className="w-5 h-5" />
                    {totalItems > 0 && (<span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{totalItems}</span>)}
                  </button>
                  {showCart && (
                     <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                       {/* ... cart content ... */}
                    </div>
                  )}
                  
                  <Link href="/login" className="p-2 hover:bg-gray-100 rounded-full" aria-label="Account">
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

        {/* Mobile Nav Dropdown */}
        {mobileNavOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Search */}
              <div className="relative w-full">
                <input type="text" placeholder="Search" className="w-full px-4 py-2 pl-10 text-sm border border-gray-300 rounded-md"/>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                </div>
              </div>
              
              {/* Mobile Navigation Links */}
              <nav className="flex flex-col gap-1">
                <Link href="/" className="block py-2 text-gray-900 hover:bg-gray-100 rounded px-3" onClick={closeAllPopups}>Home</Link>
                <Link href="/about" className="block py-2 text-gray-600 hover:bg-gray-100 rounded px-3" onClick={closeAllPopups}>About</Link>
                <Link href="/contact" className="block py-2 text-gray-600 hover:bg-gray-100 rounded px-3" onClick={closeAllPopups}>Contact Us</Link>
                <Link href="/blog" className="block py-2 text-gray-600 hover:bg-gray-100 rounded px-3" onClick={closeAllPopups}>Blog</Link>
              </nav>

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

      {/* Category Navigation */}
      <nav className="w-full bg-black text-white overflow-x-auto">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex items-center justify-start h-12 gap-2 sm:gap-4 overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-4 sm:gap-8 text-xs sm:text-sm whitespace-nowrap">
              <Link href="/products/phones" className="flex items-center gap-2 hover:text-gray-300 px-2 sm:px-0"><IoIosPhonePortrait /> Phones</Link>
              <span className="text-gray-500 hidden sm:inline">|</span>
              <Link href="/products/computers" className="flex items-center gap-2 hover:text-gray-300 px-2 sm:px-0"><MdOutlineComputer /> Computers</Link>
              <span className="text-gray-500 hidden sm:inline">|</span>
              <Link href="/products/smartwatches" className="flex items-center gap-2 hover:text-gray-300 px-2 sm:px-0"><IoMdWatch /> Smart Watches</Link>
              <span className="text-gray-500 hidden sm:inline">|</span>
              <Link href="/products/cameras" className="flex items-center gap-2 hover:text-gray-300 px-2 sm:px-0"><FaCamera /> Cameras</Link>
              <span className="text-gray-500 hidden sm:inline">|</span>
              <Link href="/products/headphones" className="flex items-center gap-2 hover:text-gray-300 px-2 sm:px-0"><FaHeadphones /> Headphones</Link>
              <span className="text-gray-500 hidden sm:inline">|</span>
              <Link href="/products/gaming" className="flex items-center gap-2 hover:text-gray-300 px-2 sm:px-0"><IoLogoPlaystation /> Gaming</Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;