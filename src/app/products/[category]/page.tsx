'use client';
import type { Product, FilterState } from '@/types/product';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '@/components/Home/ProductCard';

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
  // Lowercase, remove trailing 's' for plural/singular match
  return cat.trim().toLowerCase().replace(/s$/, '');
}

// Type guard to check if brands exists in filter options
function hasBrands(obj: any): obj is { brands: string[] } {
  return obj && Array.isArray(obj.brands);
}

export default function ProductsPage() {
  const { category } = useParams();
  const categoryNumberToName: Record<string, string> = {
    '1': 'phones',
    '2': 'computers',
    '3': 'smartwatches',
    '4': 'cameras',
    '5': 'headphones',
    '6': 'gaming',
    '7': 'tablets',
  };
  let categoryString = Array.isArray(category) ? category[0] : category || 'phones';
  // Map number to category name if needed
  if (categoryNumberToName[categoryString]) {
    categoryString = categoryNumberToName[categoryString];
  }
  const searchParams = useSearchParams();
  const highlightId = searchParams.get('highlight');
  const modelParam = searchParams.get('model');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);
  
  // Initialize all possible filters
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 2000],
    brands: [],
    colors: [],
    storage: [],
    protectionClass: [],
    screenDiagonal: [],
    screenType: [],
    batteryCapacity: [],
    connectivity: [],
    cameraMP: [],
    resolution: [],
    sensorType: [],
    lensMount: [],
    videoResolution: [],
    strapMaterial: [],
    features: [],
    waterResistance: [],
    type: [],
    noiseCancellation: [],
    batteryLife: [],
    driverSize: [],
    screenSize: [],
    pencilSupport: [],
    processor: [],
    ram: [],
    graphics: [],
    models: [],
    accessories: [],
    bundles: [],
  });

  const productsPerPage = 9;

  const filterOptions = {
    phones: {
      brands: ['Apple', 'Samsung', 'Xiaomi', 'Huawei', 'OnePlus', 'Google', 'Motorola', 'Realme'],
      storage: ['64GB', '128GB', '256GB', '512GB', '1TB'],
    
      protectionClass: ['IP67', 'IP68', 'IP54'],
      screenDiagonal: ['5.4"', '6.1"', '6.7"', '6.8"'],
      screenType: ['OLED', 'LCD', 'AMOLED', 'Super Retina XDR'],
      batteryCapacity: ['3000mAh', '4000mAh', '5000mAh', '6000mAh'],
    },
    cameras: {
      brands: ['Canon', 'Nikon', 'Sony', 'Fujifilm', 'Panasonic', 'Olympus'],
      resolution: ['12MP', '20MP', '24MP', '32MP', '45MP'],
      sensorType: ['Full Frame', 'APS-C', 'Micro Four Thirds'],
      lensMount: ['EF', 'RF', 'F', 'E', 'Z'],
      videoResolution: ['1080p', '4K', '6K', '8K'],
    },
    watches: {
      brands: ['Apple', 'Samsung', 'Garmin', 'Fitbit', 'Huawei'],
      screenType: ['OLED', 'AMOLED', 'LCD'],
      strapMaterial: ['Silicone', 'Leather', 'Stainless Steel'],
      features: ['Heart Rate', 'GPS', 'Sleep Tracking', 'ECG'],
      waterResistance: ['Yes', 'No'],
    },
    headsets: {
      brands: ['Sony', 'Bose', 'JBL', 'Apple', 'Samsung', 'Logitech'],
      type: ['Over-Ear', 'In-Ear', 'On-Ear'],
      connection: ['Wired', 'Wireless', 'Bluetooth'],
      features: ['Noise Cancelling', 'Mic Included', 'Surround Sound'],
    },
    tablets: {
      brands: ['Apple', 'Samsung', 'Lenovo', 'Microsoft', 'Huawei'],
      storage: ['64GB', '128GB', '256GB', '512GB', '1TB'],
      screenSize: ['8"', '10.2"', '11"', '12.9"'],
      operatingSystem: ['iPadOS', 'Android', 'Windows'],
      batteryLife: ['Up to 10h', 'Up to 12h', 'Up to 14h'],
    },
    computers: {
      brands: ['Apple', 'Dell', 'HP', 'Lenovo', 'Asus', 'Acer', 'MSI'],
      processor: ['Intel i5', 'Intel i7', 'Intel i9', 'AMD Ryzen 5', 'Ryzen 7', 'M1', 'M2'],
      ram: ['8GB', '16GB', '32GB', '64GB'],
      storage: ['256GB SSD', '512GB SSD', '1TB SSD', '2TB SSD'],
      graphics: ['Integrated', 'NVIDIA GTX', 'NVIDIA RTX', 'AMD Radeon'],
    },
    playstation: {
      models: ['PS4', 'PS4 Pro', 'PS5 Digital', 'PS5 Standard'],
      storage: ['500GB', '1TB', '2TB'],
      accessories: ['DualSense Controller', 'Headset', 'Charging Station', 'Camera'],
      bundles: ['With Game', 'With Extra Controller', 'With VR'],
    },
  };

  const currentFilterOptions = filterOptions[categoryString as keyof typeof filterOptions] || filterOptions.phones;

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      axios.get("https://e-tech-store-6d7o.onrender.com/api/products"),
      axios.get("https://e-tech-store-6d7o.onrender.com/api/categories")
    ]).then(([productsRes, categoriesRes]) => {
      setProducts(productsRes.data);
      setCategories(categoriesRes.data);
    }).catch(() => {
      setProducts([]);
      setCategories([]);
    }).finally(() => setIsLoading(false));
  }, []);

  // Find the category object by slug
  const currentCategory = categories.find(cat => cat.name.toLowerCase() === String(category).toLowerCase());
  // Filter products by category (assuming product.category matches category name or id)
  const filteredProducts = currentCategory
    ? products.filter(p => p.category === currentCategory.name || p.category === currentCategory.id)
    : products;

  // Reset filters when category changes
  useEffect(() => {
    setFilters({
      priceRange: [0, 2000],
      brands: [],
      colors: [],
      storage: [],
      protectionClass: [],
      screenDiagonal: [],
      screenType: [],
      batteryCapacity: [],
      connectivity: [],
      cameraMP: [],
      resolution: [],
      sensorType: [],
      lensMount: [],
      videoResolution: [],
      strapMaterial: [],
      features: [],
      waterResistance: [],
      type: [],
      noiseCancellation: [],
      batteryLife: [],
      driverSize: [],
      screenSize: [],
      pencilSupport: [],
      processor: [],
      ram: [],
      graphics: [],
      models: [],
      accessories: [],
      bundles: [],
    });
    setCurrentPage(1);
    setSortBy('name');
  }, [categoryString]);

  useEffect(() => {
    let filtered = filteredProducts.filter(product => {
      // Price range filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }
      // Category flexible match
      if (categoryString && product.category) {
        if (normalizeCategory(product.category) !== normalizeCategory(categoryString)) {
          return false;
        }
      }
      // Model filter (case-insensitive, partial match)
      if (modelParam) {
        if (!product.name.trim().toLowerCase().includes(modelParam.trim().toLowerCase())) {
          return false;
        }
      }
      // Dynamic filter checking
      for (const [filterType, filterValues] of Object.entries(filters)) {
        if (filterType === 'priceRange') continue;
        
        if (Array.isArray(filterValues) && filterValues.length > 0) {
          const productValue = product[filterType as keyof Product];
          
          if (productValue) {
            if (Array.isArray(productValue)) {
              if (!productValue.some(val => filterValues.includes(val))) {
                return false;
              }
            } else {
              if (!filterValues.includes(productValue as string)) {
                return false;
              }
            }
          }
        }
      }

      return true;
    });

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return (b.rating ?? 0) - (a.rating ?? 0);
        default:
          return a.name.localeCompare(b.name);
      }
    });

    // setFilteredProducts(filtered); // Removed
    setCurrentPage(1);
  }, [filteredProducts, filters, sortBy, modelParam, categoryString]);

  const handleFilterChange = (filterType: keyof FilterState, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const handleCheckboxChange = (filterType: keyof FilterState, value: string) => {
    setFilters((prev: FilterState) => {
      if (filterType === 'brands') {
        // Only allow one brand at a time
        return { ...prev, brands: [value] };
      }
      return {
        ...prev,
        [filterType]: (prev[filterType] as string[]).includes(value)
          ? (prev[filterType] as string[]).filter(item => item !== value)
          : [...(prev[filterType] as string[]), value],
      };
    });
  };

  const clearFilters = () => {
    setFilters({
      priceRange: [0, 2000],
      brands: [],
      colors: [],
      storage: [],
      protectionClass: [],
      screenDiagonal: [],
      screenType: [],
      batteryCapacity: [],
      connectivity: [],
      cameraMP: [],
      resolution: [],
      sensorType: [],
      lensMount: [],
      videoResolution: [],
      strapMaterial: [],
      features: [],
      waterResistance: [],
      type: [],
      noiseCancellation: [],
      batteryLife: [],
      driverSize: [],
      screenSize: [],
      pencilSupport: [],
      processor: [],
      ram: [],
      graphics: [],
      models: [],
      accessories: [],
      bundles: [],
    });
  };

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  // Dynamically generate brands from products in the current, normalized category
  const normalizedCategory = normalizeCategory(categoryString);
  const productsInCategory = products.filter(p => normalizeCategory(p.category || '') === normalizedCategory);
  const dynamicBrands = Array.from(new Set(productsInCategory.map(p => p.brand).filter(Boolean)));
  console.log(`Category: ${categoryString} | Normalized: ${normalizedCategory} | Matched products: ${productsInCategory.length} | Brands:`, dynamicBrands);
  console.log('Dynamic brands for current category:', dynamicBrands);

  // Always use the static brands array from filterOptions for the current category
  const staticBrands = Array.isArray((currentFilterOptions as any).brands) ? (currentFilterOptions as any).brands : [];
  const dynamicFilterOptions = {
    ...currentFilterOptions,
    brands: staticBrands,
  };

  // Function to render filter sections dynamically
  const renderFilterSection = (filterKey: keyof FilterState, title: string) => {
    if (!dynamicFilterOptions[filterKey as keyof typeof dynamicFilterOptions]) return null;
    
    const options = dynamicFilterOptions[filterKey as keyof typeof dynamicFilterOptions] as string[];
    const counts = getFilterCounts(products, filterKey, options);

    return (
      <div className="mb-6" key={filterKey}>
        <h3 className="font-medium mb-3 flex items-center justify-between">
          {title}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {options.map(option => (
            <label key={option} className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                checked={(filters[filterKey] as string[])?.includes(option) || false}
                onChange={() => handleCheckboxChange(filterKey, option)}
                className="rounded"
              />
              <span>{option}</span>
              <span className="text-gray-400 text-xs">({counts[option] || 0})</span>
            </label>
          ))}
        </div>
      </div>
    );
  };

  // Filter Modal for Mobile
  const FilterModal = () => (
    <div className={`fixed inset-0 z-50 ${showFilters ? 'block' : 'hidden'} lg:hidden`}>
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowFilters(false)} />
      <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Filters</h2>
            <button
              onClick={() => setShowFilters(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="mb-8">
            <h3 className="font-semibold mb-3">Price</h3>
            <div className="flex items-center space-x-2 mb-2">
              <input 
                type="number" 
                value={filters.priceRange[0]} 
                onChange={(e) => handleFilterChange('priceRange', [Number(e.target.value), filters.priceRange[1]])} 
                className="w-20 px-2 py-1 border rounded text-sm" 
                min="0" 
              />
              <span>-</span>
              <input 
                type="number" 
                value={filters.priceRange[1]} 
                onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], Number(e.target.value)])} 
                className="w-20 px-2 py-1 border rounded text-sm" 
                min="0" 
              />
            </div>
            <input 
              type="range" 
              min="0" 
              max="2000" 
              step="50" 
              value={filters.priceRange[1]} 
              onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], Number(e.target.value)])} 
              className="w-full" 
            />
          </div>
          
          {/* Render only relevant filters */}
          {Object.keys(dynamicFilterOptions).map((filterKey) =>
            renderFilterSection(filterKey as keyof FilterState, filterKey.charAt(0).toUpperCase() + filterKey.slice(1))
          )}
          
          <button 
            onClick={clearFilters} 
            className="mt-6 w-full py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium"
          >
            Clear all filters
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fafbfc] text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-4 sm:mb-6 flex items-center space-x-1">
          <a href="/" className="hover:underline">Home</a>
          <span className="mx-1">&gt;</span>
          <span className="capitalize text-gray-800 font-semibold">{categoryString}</span>
        </div>

        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowFilters(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
            </svg>
            <span>Filters</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow p-6 sticky top-6">
              <h2 className="text-xl font-bold mb-6">Filters</h2>
              <div className="mb-8">
                <h3 className="font-semibold mb-3">Price</h3>
                <div className="flex items-center space-x-2 mb-2">
                  <input 
                    type="number" 
                    value={filters.priceRange[0]} 
                    onChange={(e) => handleFilterChange('priceRange', [Number(e.target.value), filters.priceRange[1]])} 
                    className="w-20 px-2 py-1 border rounded text-sm" 
                    min="0" 
                  />
                  <span>-</span>
                  <input 
                    type="number" 
                    value={filters.priceRange[1]} 
                    onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], Number(e.target.value)])} 
                    className="w-20 px-2 py-1 border rounded text-sm" 
                    min="0" 
                  />
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="2000" 
                  step="50" 
                  value={filters.priceRange[1]} 
                  onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], Number(e.target.value)])} 
                  className="w-full" 
                />
              </div>
              {/* Render only relevant filters */}
              {Object.keys(dynamicFilterOptions).map((filterKey) =>
                renderFilterSection(filterKey as keyof FilterState, filterKey.charAt(0).toUpperCase() + filterKey.slice(1))
              )}
              <button 
                onClick={clearFilters} 
                className="mt-6 w-full py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium"
              >
                Clear all filters
              </button>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1 min-w-0">
            {/* Header Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <span className="text-sm sm:text-base text-gray-600">Selected Products:</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm sm:text-base font-semibold">
                  {filteredProducts.length}
                </span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <span className="text-sm sm:text-base text-gray-600 hidden sm:inline">Sort by:</span>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)} 
                  className="border rounded px-2 sm:px-3 py-1 text-sm sm:text-base min-w-0"
                >
                  <option value="name">Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>

            {/* Products Display */}
            {currentProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-10">
                {currentProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    description={product.description}
                    image={product.image}
                    price={product.price}
                    category={product.category}
                    isHighlighted={highlightId !== null && product.id === Number(highlightId)}
                    fromCategory={true}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 sm:py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-gray-600 text-sm sm:text-base">No products found matching your filters</p>
                <button 
                  onClick={clearFilters} 
                  className="mt-4 text-blue-600 hover:text-blue-800 text-sm sm:text-base"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-1 sm:space-x-2 overflow-x-auto pb-2">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} 
                  disabled={currentPage === 1} 
                  className="px-2 sm:px-3 py-1 rounded border disabled:opacity-50 text-sm sm:text-base flex-shrink-0"
                >
                  <span className="hidden sm:inline">Previous</span>
                  <span className="sm:hidden">Prev</span>
                </button>
                
                {/* Show limited page numbers on mobile */}
                {totalPages <= 5 ? (
                  // Show all pages if 5 or fewer
                  [...Array(totalPages)].map((_, i) => (
                    <button 
                      key={i + 1} 
                      onClick={() => setCurrentPage(i + 1)} 
                      className={`px-2 sm:px-3 py-1 rounded text-sm sm:text-base flex-shrink-0 ${
                        currentPage === i + 1 
                          ? 'bg-black text-white' 
                          : 'border hover:bg-gray-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))
                ) : (
                  // Show condensed pagination for more than 5 pages
                  <>
                    {currentPage > 3 && (
                      <>
                        <button 
                          onClick={() => setCurrentPage(1)} 
                          className="px-2 sm:px-3 py-1 rounded border hover:bg-gray-50 text-sm sm:text-base flex-shrink-0"
                        >
                          1
                        </button>
                        {currentPage > 4 && <span className="px-1 text-gray-500">...</span>}
                      </>
                    )}
                    
                    {Array.from({ length: 3 }, (_, i) => {
                      const page = currentPage - 1 + i;
                      if (page >= 1 && page <= totalPages) {
                        return (
                          <button 
                            key={page} 
                            onClick={() => setCurrentPage(page)} 
                            className={`px-2 sm:px-3 py-1 rounded text-sm sm:text-base flex-shrink-0 ${
                              currentPage === page 
                                ? 'bg-black text-white' 
                                : 'border hover:bg-gray-50'
                            }`}
                          >
                            {page}
                          </button>
                        );
                      }
                      return null;
                    })}
                    
                    {currentPage < totalPages - 2 && (
                      <>
                        {currentPage < totalPages - 3 && <span className="px-1 text-gray-500">...</span>}
                        <button 
                          onClick={() => setCurrentPage(totalPages)} 
                          className="px-2 sm:px-3 py-1 rounded border hover:bg-gray-50 text-sm sm:text-base flex-shrink-0"
                        >
                          {totalPages}
                        </button>
                      </>
                    )}
                  </>
                )}
                
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} 
                  disabled={currentPage === totalPages} 
                  className="px-2 sm:px-3 py-1 rounded border disabled:opacity-50 text-sm sm:text-base flex-shrink-0"
                >
                  <span className="hidden sm:inline">Next</span>
                  <span className="sm:hidden">Next</span>
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      <FilterModal />
    </div>
  );
}