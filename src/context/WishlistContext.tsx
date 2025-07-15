'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from "next/navigation";

interface WishlistContextType {
  wishlist: number[];
  addToWishlist: (productId: number) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const LOCAL_WISHLIST_KEY = 'guest_wishlist';

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [wishlistCount, setWishlistCount] = useState<number>(0);

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const handleLoginSuccess = () => {
    if (redirect) {
      router.push(redirect); // e.g., '/checkout/address'
    } else {
      router.push("/");
    }
  };

  // Helper: Load guest wishlist from localStorage
  const loadGuestWishlist = () => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(LOCAL_WISHLIST_KEY);
    return stored ? JSON.parse(stored) : [];
  };

  // Helper: Save guest wishlist to localStorage
  const saveGuestWishlist = (list: number[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(LOCAL_WISHLIST_KEY, JSON.stringify(list));
  };

  // On mount: load wishlist from API if logged in, else from localStorage
  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    if (token) {
      // Logged in: fetch from API
      const fetchWishlist = async () => {
        try {
          const res = await axios.get('https://e-tech-store-6d7o.onrender.com/api/wishlist', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setWishlist(res.data.map((item: any) => item.id));
        } catch (err) {
          setWishlist([]);
        }
      };
      const fetchWishlistCount = async () => {
        try {
          const res = await axios.get('https://e-tech-store-6d7o.onrender.com/api/wishlist/count', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setWishlistCount(res.data.count);
        } catch (err) {
          setWishlistCount(0);
        }
      };
      fetchWishlist();
      fetchWishlistCount();
    } else {
      // Guest: load from localStorage
      const guestList = loadGuestWishlist();
      setWishlist(guestList);
      setWishlistCount(guestList.length);
    }
  }, []);

  const addToWishlist = async (productId: number) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    if (token) {
      // Logged in: use API
      try {
        await axios.post('https://e-tech-store-6d7o.onrender.com/api/wishlist', { productId }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setWishlist(prev => [...prev, productId]);
        setWishlistCount(prev => prev + 1);
      } catch (err) {
        // Optionally handle error
      }
    } else {
      // Guest: update localStorage
      setWishlist(prev => {
        if (!prev.includes(productId)) {
          const updated = [...prev, productId];
          saveGuestWishlist(updated);
          setWishlistCount(updated.length);
          return updated;
        }
        return prev;
      });
    }
  };

  const removeFromWishlist = async (productId: number) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    if (token) {
      // Logged in: use API
      try {
        await axios.delete(
          'https://e-tech-store-6d7o.onrender.com/api/wishlist/remove-items',
          {
            headers: { Authorization: `Bearer ${token}` },
            data: { productId }
          }
        );
        setWishlist(prev => prev.filter(id => id !== productId));
        setWishlistCount(prev => Math.max(0, prev - 1));
      } catch (err) {
        // Optionally handle error
      }
    } else {
      // Guest: update localStorage
      setWishlist(prev => {
        const updated = prev.filter(id => id !== productId);
        saveGuestWishlist(updated);
        setWishlistCount(updated.length);
        return updated;
      });
    }
  };

  const isInWishlist = (productId: number) => {
    return wishlist.includes(productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, wishlistCount }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};