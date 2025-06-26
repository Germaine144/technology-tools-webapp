'use client';
import React, { useState, useEffect } from 'react';
import { Heart, Star } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: number;
}

interface ProductCardProps {
  product: Product;
  onToggleFavorite: (id: number) => void;
  onBuyNow: (productId: number) => void;
}

const CategoryProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState([0, 3000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || 'all';

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        
        // Filter products by category if specified
        const filtered = category === 'all' 
          ? data 
          : data.filter((product: Product) => 
              product.category.toLowerCase() === category.toLowerCase()
            );
        setFilteredProducts(filtered);
        
        // Set price range based on filtered products
        if (filtered.length > 0) {
          const prices = filtered.map((p: Product) => p.price);
          setSelectedPrice([Math.min(...prices), Math.max(...prices)]);
        }
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  // Apply additional filters (price, brand) to category-filtered products
  useEffect(() => {
    let filtered = category === 'all' 
      ? products 
      : products.filter(product => 
          product.category.toLowerCase() === category.toLowerCase()
        );

    // Apply price filter
    filtered = filtered.filter(product => 
      product.price >= selectedPrice[0] && product.price <= selectedPrice[1]
    );

    // Apply brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product => {
        const brand = extractBrand(product.name);
        return selectedBrands.includes(brand);
      });
    }

    setFilteredProducts(filtered);
  }, [products, category, selectedPrice, selectedBrands]);

  const handleBuyNow = (productId: number) => {
    router.push(`/BuyNowDetails/${productId}`);
  };

  const handleToggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Extract brand from product name
  const extractBrand = (productName: string): string => {
    const brandKeywords = ['Apple', 'Samsung', 'Google', 'MacBook', 'iPad', 'iPhone', 'Sony', 'Canon', 'Nikon'];
    for (const brand of brandKeywords) {
      if (productName.toLowerCase().includes(brand.toLowerCase())) {
        return brand === 'MacBook' || brand === 'iPad' || brand === 'iPhone' ? 'Apple' : brand;
      }
    }
    return 'Other';
  };

  const handleBrandChange = (brandName: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedBrands(prev => [...prev, brandName]);
    } else {
      setSelectedBrands(prev => prev.filter(brand => brand !== brandName));
    }
  };

  // Get available brands for current category
  const availableBrands = () => {
    const categoryProducts = category === 'all' 
      ? products 
      : products.filter(p => p.category.toLowerCase() === category.toLowerCase());
    
    const brandCounts = categoryProducts.reduce((acc, product) => {
      const brand = extractBrand(product.name);
      acc[brand] = (acc[brand] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(brandCounts).map(([name, count]) => ({
      name,
      count,
      checked: selectedBrands.includes(name)
    }));
  };

  // Category mapping for display
  const clean = (str: string) => str.toLowerCase().replace(/\s+/g, ' ').trim();
  const getCategoryDisplayName = (cat: string) => {
    const categoryMap: Record<string, string> = {
      'telephones': 'Phones',
      'electronics': 'Electronics',
      'computers': 'Laptops & Computers',
      'wearables': 'Watches & Wearables',
      'smart watch': 'Smart Watches',
      'home': 'Home & Tablets',
      'cameras': 'Cameras',
      'gaming': 'Gaming & PlayStation',
      'all': 'All Products'
    };
    return categoryMap[cat.toLowerCase()] || cat;
  };

  const ProductCard = ({ product, onToggleFavorite, onBuyNow }: ProductCardProps) => {
    const isFavorite = favorites.includes(product.id);
    
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow duration-200">
        <div className="relative mb-4">
          <button 
            onClick={() => onToggleFavorite(product.id)}
            className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded z-10"
          >
            <Heart 
              className={`w-5 h-5 ${isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} 
            />
          </button>
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-48 object-contain mb-4"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/200x250?text=Product+Image';
            }}
          />
        </div>
        
        <div className="space-y-2">
          <h3 className="font-medium text-sm text-gray-900 leading-tight">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 line-clamp-2">{product.description}</p>
          
          <div className="flex items-center space-x-1 mb-2">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm text-gray-600">{product.rating}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
          </div>
          
          <button
            onClick={() => onBuyNow(product.id)}
            className="w-full bg-black text-white py-2 px-4 rounded-2xl text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Buy Now
          </button>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading {getCategoryDisplayName(category)}...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <button onClick={() => router.push('/')} className="hover:text-gray-900">
              Home
            </button>
            <span>/</span>
            <span className="text-gray-900 font-medium">
              {getCategoryDisplayName(category)}
            </span>
          </nav>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <div className="w-64 space-y-6">
            {/* Price Filter */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Price</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">${selectedPrice[0]}</span>
                  <span className="text-sm text-gray-600">${selectedPrice[1]}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={3000}
                  value={selectedPrice[1]}
                  onChange={(e) => setSelectedPrice([selectedPrice[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            {/* Brand Filter */}
            {availableBrands().length > 0 && (
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Brand</h3>
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {availableBrands().map((brand) => (
                    <label key={brand.name} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={brand.checked}
                        className="rounded border-gray-300"
                        onChange={(e) => handleBrandChange(brand.name, e.target.checked)}
                      />
                      <span className="text-sm text-gray-700">{brand.name}</span>
                      <span className="text-xs text-gray-500">({brand.count})</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Category Quick Links */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {['all', 'telephones', 'computers', 'smart watch', 'electronics', 'home'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => router.push(`/products?category=${cat}`)}
                    className={`block w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                      category === cat 
                        ? 'bg-blue-100 text-blue-700 font-medium' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {getCategoryDisplayName(cat)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {getCategoryDisplayName(category)}
                </h1>
                <p className="text-gray-600">
                  {filteredProducts.length} products found
                </p>
              </div>
              
              {/* Clear Filters Button */}
              {selectedBrands.length > 0 && (
                <button 
                  onClick={() => {
                    setSelectedBrands([]);
                    if (filteredProducts.length > 0) {
                      const prices = filteredProducts.map(p => p.price);
                      setSelectedPrice([Math.min(...prices), Math.max(...prices)]);
                    }
                  }}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 text-sm"
                >
                  Clear Filters
                </button>
              )}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onToggleFavorite={handleToggleFavorite}
                    onBuyNow={handleBuyNow}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 text-lg">
                    No {getCategoryDisplayName(category).toLowerCase()} found for the selected filters.
                  </p>
                  <button 
                    onClick={() => {
                      setSelectedBrands([]);
                      router.push('/products?category=all');
                    }}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    View All Products
                  </button>
                </div>
              )}
            </div>

            {/* Pagination */}
            {filteredProducts.length > 9 && (
              <div className="flex justify-center items-center space-x-2">
                <button className="w-8 h-8 flex items-center justify-center bg-black text-white rounded">
                  1
                </button>
                <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded">
                  2
                </button>
                <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded">
                  3
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProductsPage;