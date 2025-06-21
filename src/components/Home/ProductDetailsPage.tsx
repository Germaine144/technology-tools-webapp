'use client';
import React, { useState } from 'react';
import { Heart, Star } from 'lucide-react';

// Move type definitions to the top
type ColorType = 'gold' | 'black' | 'purple' | 'silver' | 'white' | 'red' | 'blue' | 'pink';

interface Product {
  id: number;
  name: string;
  model: string;
  price: number;
  image: string;
  colors: ColorType[];
  isFavorite: boolean;
}

interface ColorDotProps {
  color: ColorType;
  size?: string;
}

interface ProductCardProps {
  product: Product;
}

interface ProductDetailsPageProps {
  productId?: string;
}

const ProductDetailsPage = ({ productId }: ProductDetailsPageProps) => {
  const [selectedPrice, setSelectedPrice] = useState([1200, 1600]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(['Apple']);
  const [selectedMemory, setSelectedMemory] = useState('128GB');

  // Move products array before it's used
  const products: Product[] = [
    {
      id: 1,
      name: 'Apple iPhone 14 Pro 512GB Gold',
      model: '(MQ233)',
      price: 1437,
      image: 'https://via.placeholder.com/200x250?text=iPhone+14+Pro',
      colors: ['gold', 'black', 'purple', 'silver'] as ColorType[],
      isFavorite: false
    },
    {
      id: 2,
      name: 'Apple iPhone 11 128GB White',
      model: '(MQ233)',
      price: 510,
      image: 'https://via.placeholder.com/200x250?text=iPhone+11',
      colors: ['white', 'black', 'red', 'purple'] as ColorType[],
      isFavorite: false
    },
    {
      id: 3,
      name: 'Samsung Galaxy S23 128GB White',
      model: '(SM-S911)',
      price: 550,
      image: 'https://via.placeholder.com/200x250?text=Galaxy+S23',
      colors: ['white', 'black', 'blue'] as ColorType[],
      isFavorite: false
    },
    {
      id: 4,
      name: 'Apple iPhone 14 Pro 1TB Gold',
      model: '(MQ233)',
      price: 1499,
      image: 'https://via.placeholder.com/200x250?text=iPhone+14+Pro+1TB',
      colors: ['gold', 'black', 'purple'] as ColorType[],
      isFavorite: false
    },
    {
      id: 5,
      name: 'Samsung Galaxy S22 256GB Black',
      model: '(SM-S906)',
      price: 1399,
      image: 'https://via.placeholder.com/200x250?text=Galaxy+S22',
      colors: ['gold', 'black'] as ColorType[],
      isFavorite: false
    },
    {
      id: 6,
      name: 'Apple iPhone 14 Pro 128GB Deep Purple',
      model: '(MQ023)',
      price: 1600,
      image: 'https://via.placeholder.com/200x250?text=iPhone+14+Pro+Purple',
      colors: ['purple', 'gold', 'black'] as ColorType[],
      isFavorite: false
    },
    {
      id: 7,
      name: 'Apple iPhone 13 mini 128GB Pink',
      model: '(MLK23)',
      price: 850,
      image: 'https://via.placeholder.com/200x250?text=iPhone+13+mini',
      colors: ['pink', 'blue', 'black'] as ColorType[],
      isFavorite: false
    },
    {
      id: 8,
      name: 'OPPO Find X5 Pro 256GB Black',
      model: '(CPH2305)',
      price: 1399,
      image: 'https://via.placeholder.com/200x250?text=OPPO+Find+X5',
      colors: ['black', 'gold', 'purple'] as ColorType[],
      isFavorite: false
    },
    {
      id: 9,
      name: 'Poco F4 GT 256GB Silver',
      model: '(21121210G)',
      price: 1399,
      image: 'https://via.placeholder.com/200x250?text=Poco+F4+GT',
      colors: ['silver', 'black', 'gold'] as ColorType[],
      isFavorite: false
    }
  ];

  // Handle brand selection
  const handleBrandChange = (brandName: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedBrands(prev => [...prev, brandName]);
    } else {
      setSelectedBrands(prev => prev.filter(brand => brand !== brandName));
    }
  };

  // Handle memory selection
  const handleMemoryChange = (memorySize: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedMemory(memorySize);
    }
  };

  // Filter products based on selected brands
  const filteredProducts = products.filter(product => {
    if (selectedBrands.length === 0) return true;
    return selectedBrands.some(brand => product.name.toLowerCase().includes(brand.toLowerCase()));
  });

  const brands = [
    { name: 'Apple', count: 60, checked: selectedBrands.includes('Apple') },
    { name: 'Samsung', count: 13, checked: selectedBrands.includes('Samsung') },
    { name: 'Poco', count: 1, checked: selectedBrands.includes('Poco') },
    { name: 'OPPO', count: 1, checked: selectedBrands.includes('OPPO') },
    { name: 'Honor', count: 1, checked: selectedBrands.includes('Honor') },
    { name: 'Motorola', count: 2, checked: selectedBrands.includes('Motorola') },
    { name: 'Nokia', count: 1, checked: selectedBrands.includes('Nokia') },
    { name: 'Realme', count: 1, checked: selectedBrands.includes('Realme') }
  ];

  const memoryOptions = [
    { size: '16GB', checked: selectedMemory === '16GB' },
    { size: '32GB', checked: selectedMemory === '32GB' },
    { size: '64GB', checked: selectedMemory === '64GB' },
    { size: '128GB', checked: selectedMemory === '128GB' },
    { size: '256GB', checked: selectedMemory === '256GB' },
    { size: '512GB', checked: selectedMemory === '512GB' }
  ];

  const ColorDot = ({ color, size = 'w-4 h-4' }: ColorDotProps) => {
    const colorMap: Record<ColorType, string> = {
      gold: 'bg-yellow-400',
      black: 'bg-gray-900',
      purple: 'bg-purple-600',
      silver: 'bg-gray-300',
      white: 'bg-white border-2 border-gray-300',
      red: 'bg-red-500',
      blue: 'bg-blue-500',
      pink: 'bg-pink-400'
    };

    return (
      <div className={`${size} ${colorMap[color] || 'bg-gray-400'} rounded-full`} />
    );
  };

  const ProductCard = ({ product }: ProductCardProps) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow duration-200">
      <div className="relative mb-4">
        <button className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded">
          <Heart className="w-5 h-5 text-gray-400" />
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
        <p className="text-xs text-gray-500">{product.model}</p>
        
        <div className="flex items-center space-x-1 mb-2">
          {product.colors.map((color, index) => (
            <ColorDot key={index} color={color} />
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            ${product.price}
          </span>
        </div>
        
        <button className="w-full bg-black text-white py-2 px-4 rounded text-sm font-medium hover:bg-gray-800 transition-colors">
          Buy Now
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <div className="w-64 space-y-6">
            {/* Price Filter */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Price</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">$1200</span>
                  <div className="flex-1 relative">
                    <div className="w-full h-2 bg-gray-200 rounded">
                      <div className="h-2 bg-blue-500 rounded" style={{ width: '60%' }} />
                    </div>
                  </div>
                  <span className="text-sm text-gray-600">$1600</span>
                </div>
              </div>
            </div>

            {/* Brand Filter */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Brand</h3>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {brands.map((brand) => (
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

            {/* Built-in Memory Filter */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Built-in memory</h3>
              <div className="space-y-3">
                {memoryOptions.map((option) => (
                  <label key={option.size} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="memory"
                      checked={option.checked}
                      className="rounded border-gray-300"
                      onChange={(e) => handleMemoryChange(option.size, e.target.checked)}
                    />
                    <span className="text-sm text-gray-700">{option.size}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Additional Filters */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Protection class</h3>
              <select className="w-full p-2 border border-gray-300 rounded text-sm">
                <option>Select protection class</option>
              </select>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Screen diagonal</h3>
              <select className="w-full p-2 border border-gray-300 rounded text-sm">
                <option>Select screen size</option>
              </select>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Screen type</h3>
              <select className="w-full p-2 border border-gray-300 rounded text-sm">
                <option>Select screen type</option>
              </select>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Battery capacity</h3>
              <select className="w-full p-2 border border-gray-300 rounded text-sm">
                <option>Select battery capacity</option>
              </select>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Selected Products: {filteredProducts.length}
                </h1>
                <p className="text-gray-600">
                  {selectedBrands.length > 0 
                    ? `Showing ${selectedBrands.join(', ')} products` 
                    : 'By rating'
                  }
                </p>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 text-lg">No products found for the selected brands.</p>
                  <button 
                    onClick={() => setSelectedBrands([])}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>

            {/* Pagination */}
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
              <span className="text-gray-400">...</span>
              <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded">
                12
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;