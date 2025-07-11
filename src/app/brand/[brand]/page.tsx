"use client";
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProductCard from '@/components/Home/ProductCard';

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  brand?: string;
  category: string;
  description: string;
}

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

export default function BrandPage() {
  const { brand } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const category = searchParams.get('category');
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters state (reuse from category page if needed)
  const [filters, setFilters] = useState<any>({});

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      try {
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const allProducts: Product[] = await response.json();
        let filtered = allProducts.filter(
          (p) => p.brand && p.brand.toLowerCase() === decodeURIComponent(brand as string).toLowerCase()
        );
        if (category) {
          filtered = filtered.filter((p) => p.category.toLowerCase() === category.toLowerCase());
        }
        setProducts(filtered);
        setFilteredProducts(filtered);
      } catch {
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setIsLoading(false);
      }
    }
    if (brand) fetchProducts();
    else { setProducts([]); setFilteredProducts([]); setIsLoading(false); }
  }, [brand, category]);

  // Sidebar filter logic (optional: implement as in category page)
  // ...

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  // Use category-specific filters if category is present
  const currentFilterOptions = category && filterOptions[category as keyof typeof filterOptions];

  return (
    <div className="min-h-screen bg-[#fafbfc] text-black">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-8">
          {/* Sidebar Filters (if category) */}
          {category && currentFilterOptions && (
            <aside className="w-72 flex-shrink-0">
              <div className="bg-white rounded-2xl shadow p-6 sticky top-6">
                <h2 className="text-xl font-bold mb-6">Filters</h2>
                {/* Render filters as in category page if needed */}
                {/* ... */}
              </div>
            </aside>
          )}
          {/* Product Grid */}
          <main className="flex-1">
            <h1 className="text-3xl font-bold mb-8 capitalize">{decodeURIComponent(brand as string)} {category ? `- ${category.charAt(0).toUpperCase() + category.slice(1)}` : ''} Products</h1>
            {filteredProducts.length === 0 ? (
              <div className="text-gray-600">No products found for this brand{category ? ' and category' : ''}.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    description={product.name}
                    image={product.image}
                    price={product.price}
                    category={product.category}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
} 