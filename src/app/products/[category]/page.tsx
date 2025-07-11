'use client';
import type { Product, FilterState } from '@/types/product';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
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
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('name');
  
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
    async function fetchProducts() {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/products?category=${categoryString}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Product[] = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, [categoryString]);

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
    let filtered = products.filter(product => {
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

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [products, filters, sortBy, modelParam, categoryString]);

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

  return (
    <div className="min-h-screen bg-[#fafbfc] text-black">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="text-sm text-gray-500 mb-6 flex items-center space-x-1">
          <a href="/" className="hover:underline">Home</a>
          <span className="mx-1">&gt;</span>
          <span className="capitalize text-gray-800 font-semibold">{categoryString}</span>
        </div>
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className="w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow p-6 sticky top-6">
              <h2 className="text-xl font-bold mb-6">Filters</h2>
              <div className="mb-8">
                <h3 className="font-semibold mb-3">Price</h3>
                <div className="flex items-center space-x-2 mb-2">
                  <input type="number" value={filters.priceRange[0]} onChange={(e) => handleFilterChange('priceRange', [Number(e.target.value), filters.priceRange[1]])} className="w-20 px-2 py-1 border rounded text-sm" min="0" />
                  <span>-</span>
                  <input type="number" value={filters.priceRange[1]} onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], Number(e.target.value)])} className="w-20 px-2 py-1 border rounded text-sm" min="0" />
                </div>
                <input type="range" min="0" max="2000" step="50" value={filters.priceRange[1]} onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], Number(e.target.value)])} className="w-full" />
              </div>
              {/* Render only relevant filters */}
              {Object.keys(dynamicFilterOptions).map((filterKey) =>
                renderFilterSection(filterKey as keyof FilterState, filterKey.charAt(0).toUpperCase() + filterKey.slice(1))
              )}
              <button onClick={clearFilters} className="mt-6 w-full py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium">Clear all filters</button>
            </div>
          </aside>
          {/* Product Grid */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <span className="text-base text-gray-600">Selected Products:</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-base font-semibold">{filteredProducts.length}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-base text-gray-600">Sort by:</span>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border rounded px-3 py-1 text-base">
                  <option value="name">Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>
            {currentProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
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
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-gray-600">No products found matching your filters</p>
                <button onClick={clearFilters} className="mt-4 text-blue-600 hover:text-blue-800">Clear all filters</button>
              </div>
            )}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                <button onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1} className="px-3 py-1 rounded border disabled:opacity-50">Previous</button>
                {[...Array(totalPages)].map((_, i) => (
                  <button key={i + 1} onClick={() => setCurrentPage(i + 1)} className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-black text-white' : 'border hover:bg-gray-50'}`}>{i + 1}</button>
                ))}
                <button onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages} className="px-3 py-1 rounded border disabled:opacity-50">Next</button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}