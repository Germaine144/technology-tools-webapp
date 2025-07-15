'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface WishlistContextType {
  wishlist: number[];
  addToWishlist: (productId: number) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  wishlistCount: number;
}

interface WishlistItem {
  id: number;
  // Add other properties as needed
}

interface WishlistCountResponse {
  count: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const LOCAL_WISHLIST_KEY = 'guest_wishlist';

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [wishlistCount, setWishlistCount] = useState<number>(0);

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
          const res = await axios.get<WishlistItem[]>('https://e-tech-store-6d7o.onrender.com/api/wishlist', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setWishlist(res.data.map((item: WishlistItem) => item.id));
        } catch (error) {
          console.error('Failed to fetch wishlist:', error);
          setWishlist([]);
        }
      };
      const fetchWishlistCount = async () => {
        try {
          const res = await axios.get<WishlistCountResponse>('https://e-tech-store-6d7o.onrender.com/api/wishlist/count', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setWishlistCount(res.data.count);
        } catch (error) {
          console.error('Failed to fetch wishlist count:', error);
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
      } catch (error) {
        console.error('Failed to add to wishlist:', error);
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
      } catch (error) {
        console.error('Failed to remove from wishlist:', error);
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