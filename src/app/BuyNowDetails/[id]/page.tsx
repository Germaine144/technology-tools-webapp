'use client';
import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Heart, Share2, ShoppingCart, Check, Minus, Plus } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = Number(params.id);
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState('Deep Purple');
  const [selectedStorage, setSelectedStorage] = useState('128GB');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddedToCartMessage, setShowAddedToCartMessage] = useState(false); // State for the pop-up message

  // Product-specific colors and images
  const getProductColors = (product: Product) => {
    const colorMap: Record<string, Array<{ name: string; color: string }>> = {
      'phones': [
        { name: 'Deep Purple', color: '#5A5A8A' },
        { name: 'Gold', color: '#FFD700' },
        { name: 'Silver', color: '#C0C0C0' },
        { name: 'Space Black', color: '#1C1C1C' },
        { name: 'Blue', color: '#007AFF' },
        { name: 'Green', color: '#34C759' }
      ],
      'computers': [
        { name: 'Space Gray', color: '#8E8E93' },
        { name: 'Silver', color: '#C0C0C0' },
        { name: 'Rose Gold', color: '#E8B4B8' },
        { name: 'Black', color: '#1C1C1C' },
        { name: 'Blue', color: '#007AFF' }
      ],
      'cameras': [
        { name: 'Black', color: '#1C1C1C' },
        { name: 'Silver', color: '#C0C0C0' },
        { name: 'White', color: '#FFFFFF' },
        { name: 'Gray', color: '#8E8E93' }
      ],
      'headphones': [
        { name: 'Space Gray', color: '#8E8E93' },
        { name: 'Silver', color: '#C0C0C0' },
        { name: 'Pink', color: '#FF2D92' },
        { name: 'Blue', color: '#007AFF' },
        { name: 'Green', color: '#34C759' }
      ],
      'smartwatches': [
        { name: 'Midnight', color: '#1C1C1C' },
        { name: 'Starlight', color: '#F5F5DC' },
        { name: 'Blue', color: '#007AFF' },
        { name: 'Red', color: '#FF3B30' },
        { name: 'Green', color: '#34C759' }
      ],
      'gaming': [
        { name: 'White', color: '#FFFFFF' },
        { name: 'Black', color: '#1C1C1C' },
        { name: 'Blue', color: '#007AFF' },
        { name: 'Red', color: '#FF3B30' }
      ]
    };
    
    return colorMap[product.category] || [
      { name: 'Black', color: '#1C1C1C' },
      { name: 'Silver', color: '#C0C0C0' },
      { name: 'White', color: '#FFFFFF' }
    ];
  };

  const getProductImages = (product: Product) => {
    const imageMap: Record<number, string[]> = {
      // Apple iPhone 14 Pro
      1: ['/image/14pro.png', '/image/Iphone 14 pro 1.png', '/image/Iphone 14 pro 1 (2).png', '/image/kt.png'],
      // Samsung Galaxy S23
      2: ['/image/gee.png', '/image/samsung.png', '/image/@.png', '/image/$.png'],
      // Apple Watch Series 8
      3: ['/image/watch.png', '/image/watch1.jpg', '/image/watch2.jpg', '/image/watch3.jpg'],
      // AirPods Max
      4: ['/image/head.png', '/image/head@r.png', '/image/head1.jpg', '/image/head2.jpg'],
      // Samsung Galaxy Watch
      5: ['/image/samsung.png', '/image/watch4.jpg', '/image/watch5.jpg', '/image/watch6.jpg'],
      // MacBook Pro 16
      9: ['/image/ui.png', '/image/apple.jpg', '/image/MacBook Pro 16.jpg', '/image/air.png'],
      // Acer Aspire 3
      73: ['/image/accerr.png', '/image/accerr1.png', '/image/accerr2.png', '/image/ani.jpg'],
      // Apple iPhone 15
      10: ['/image/01.png', '/image/Iphone 14 pro 1 (4).png', '/image/Iphone 14 pro 1 (5).png', '/image/Iphone 14 pro 1 (9).png'],
      // Apple iPhone 15 Pro Max
      11: ['/image/Iphone14 pro.png', '/image/Iphone 14 pro 1 (10).png', '/image/Iphone 14 pro 1 (2).png', '/image/Iphone 14 pro 1 (5).png'],
      // Apple iPhone SE
      12: ['/image/kt.png', '/image/01.png', '/image/kt1.png', '/image/14pro.png'],
      // Samsung Galaxy S23 Ultra
      15: ['/image/@.png', '/image/Samsung.jpg', '/image/$.png', '/image/gee.png'],
      // Samsung Galaxy A54
      16: ['/image/Samsung.jpg', '/image/galaxA16.png', '/image/@.png', '/image/$.png'],
      // Xiaomi 13 Pro
      20: ['/image/$.png', '/image/A2.png', '/image/gee1.png', '/image/@q.png'],
      // Huawei P60 Pro
      26: ['/image/huu5.jpg', '/image/huu3.png', '/image/huu1.png', '/image/huu6.png'],
      // OnePlus 11
      32: ['/image/one1.png', '/image/one4.png', '/image/one6.png', '/image/one5.png'],
      // Google Pixel 8 Pro
      38: ['/image/google-pixel8-pro.png', '/image/google-pixel-7a.png', '/image/google-pixel-fold.png', '/image/google-pixel-8.png'],
      // Motorola Razr+
      44: ['/image/half.png', '/image/motorola-edge-plus.png', '/image/moto-g-stylus.png', '/image/moto-g-play.png'],
      // Realme GT3
      50: ['/image/14pro.png', '/image/realme-11-pro.png', '/image/realme-c55.png', '/image/realme-10-pro.png'],
      // Apple MacBook Air
      56: ['/image/ui.png', '/image/airr.png', '/image/air.png', '/image/apple.jpg'],
      // Dell XPS 13
      59: ['/image/dellr.png', '/image/ani1.jpg', '/image/ani.jpg', '/image/dell2.png'],
      // HP Spectre
      62: ['/image/ui.png', '/image/hpr.png', '/image/hpr1.png', '/image/hpr3.jpg'],
      // Lenovo ThinkPad
      65: ['/image/lenovor.png', '/image/leno.jpg', '/image/Laptop.jpg', '/image/yoga.jpg'],
      // Asus ROG
      68: ['/image/asusr1.png', '/image/assusr.png', '/image/assur2.png', '/image/asussr3.png'],
      // Acer Swift
      71: ['/image/accerr2.png', '/image/accerr1.png', '/image/accerr.png', '/image/ani.jpg'],
      // Canon EOS
      77: ['/image/canon1.jpg', '/image/conon2.jpg', '/image/Nikon.jpg', '/image/nikon1.jpg'],
      // Nikon Z8
      80: ['/image/nikon1.jpg', '/image/Nikon.jpg', '/image/nikon2.jpg', '/image/canon1.jpg'],
      // Sony Alpha
      83: ['/image/sony1.jpg', '/image/sonyr.jpg', '/image/sony1.jpg', '/image/canon1.jpg'],
      // Fujifilm X-T5
      86: ['/image/fuji.jpg', '/image/fuji1.jpg', '/image/nikon1.jpg', '/image/canon1.jpg']
    };
    
    if (imageMap[product.id]) return imageMap[product.id];
    
    const categoryImages: Record<string, string[]> = {
      'phones': ['/image/14pro.png', '/image/01.png', '/image/gee.png', '/image/@.png'],
      'computers': ['/image/ui.png', '/image/apple.jpg', '/image/air.png', '/image/ani.jpg'],
      'cameras': ['/image/canon1.jpg', '/image/nikon1.jpg', '/image/sony1.jpg', '/image/fuji.jpg'],
      'headphones': ['/image/head.png', '/image/head@r.png', '/image/head1.jpg', '/image/head2.jpg'],
      'smartwatches': ['/image/watch.png', '/image/watch1.jpg', '/image/watch2.jpg', '/image/watch3.jpg'],
      'gaming': ['/image/play.jpg', '/image/play1.jpg', '/image/PlayStation.png', '/image/PlayStation 5.jpg']
    };
    
    return categoryImages[product.category] || [product.image, product.image, product.image, product.image];
  };

  const colors = product ? getProductColors(product) : [
    { name: 'Deep Purple', color: '#5A5A8A' },
    { name: 'Gold', color: '#FFD700' },
    { name: 'Silver', color: '#C0C0C0' },
    { name: 'Space Black', color: '#1C1C1C' }
  ];

  const storageOptions = ['128GB', '256GB', '512GB', '1TB'];

  useEffect(() => {
    async function fetchProduct() {
      setIsLoading(true);
      try {
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const products: Product[] = await response.json();
        const found = products.find((p) => p.id === productId);
        setProduct(found || null);
      } catch (error) {
        console.error('Error fetching product:', error);
        setProduct(null);
      } finally {
        setIsLoading(false);
      }
    }
    if (productId) fetchProduct();
  }, [productId]);

  // Timer for the "Added to Cart" message
  useEffect(() => {
    if (showAddedToCartMessage) {
      const timer = setTimeout(() => setShowAddedToCartMessage(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showAddedToCartMessage]);

  const productImages = product ? getProductImages(product) : ['/image/Iphone 14 pro 1.png'];

  const getSpecifications = (product: Product) => {
    const baseSpecs = [
      { label: 'Brand', value: product.brand || 'Unknown' },
      { label: 'Category', value: product.category },
      { label: 'Price', value: `$${product.price.toFixed(2)}` },
    ];

    if (product.category === 'phones') return [...baseSpecs, { label: 'Display', value: '6.7" Super Retina XDR' }, { label: 'Camera', value: '48MP Main' }, { label: 'Processor', value: 'A16 Bionic chip' }];
    if (product.category === 'computers') return [...baseSpecs, { label: 'Processor', value: product.processor || 'Intel i7' }, { label: 'RAM', value: product.ram || '16GB' }, { label: 'Storage', value: product.storage || '512GB SSD' }];
    if (product.category === 'smartwatches') return [...baseSpecs, { label: 'Display', value: 'Always-On Retina' }, { label: 'Battery', value: 'Up to 18 hours' }];
    if (product.category === 'cameras') return [...baseSpecs, { label: 'Sensor', value: 'Full-frame CMOS' }, { label: 'Video', value: '4K video' }];
    if (product.category === 'headphones') return [...baseSpecs, { label: 'Noise Cancellation', value: 'Active' }, { label: 'Battery Life', value: 'Up to 30 hours' }];
    if (product.category === 'gaming') return [...baseSpecs, { label: 'Platform', value: 'PlayStation 5' }, { label: 'Storage', value: '825GB SSD' }];
    
    return baseSpecs;
  };

  const specifications = product ? getSpecifications(product) : [];

  const reviews = [
    { name: 'John Doe', rating: 5, date: '2 days ago', comment: 'Excellent phone! The camera quality is amazing and the battery lasts all day.', verified: true },
    { name: 'Sarah Smith', rating: 4, date: '1 week ago', comment: 'Great performance and display. Only wish it had better low-light camera performance.', verified: true },
    { name: 'Mike Johnson', rating: 5, date: '2 weeks ago', comment: 'Perfect upgrade from my old phone. The design is sleek and modern.', verified: false }
  ];
  
  const relatedProducts = [
    { id: 1, name: 'Apple iPhone 14 Pro 512GB Gold', model: '(MQ233)', price: 1437, image: '/image/pi.png' },
    { id: 2, name: 'AirPods Max Silver', model: '', price: 549, image: '/image/head@r.png' },
    { id: 3, name: 'Apple Watch Series 9 GPS 41mm', model: 'Starlight Aluminium Case', price: 399, image: '/image/caser.png' },
    { id: 4, name: 'Apple iPhone 14 Pro 1TB Gold', model: '(MQ2V3)', price: 1499, image: '/image/charger.png' }
  ];

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));
  const nextImage = () => setActiveImageIndex((prev) => (prev + 1) % productImages.length);
  const prevImage = () => setActiveImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);

  const addToCartHandler = () => {
    if (!product) return;
    addToCart({ id: productId, name: product.name, image: product.image, price: product.price, quantity });
    setShowAddedToCartMessage(true); // Trigger the pop-up
  };

  if (isLoading) {
    return <div className="min-h-screen bg-white flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
  }
  if (!product) {
    return <div className="min-h-screen bg-white flex items-center justify-center text-center"><h2 className="text-2xl font-bold">Product Not Found</h2></div>;
  }

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Added to Cart Pop-up Message */}
      <div
        className={`fixed top-24 right-5 bg-white border border-green-300 rounded-lg shadow-xl p-4 flex items-center space-x-4 z-50 transition-all duration-500 ease-in-out transform
        ${showAddedToCartMessage ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}`}
      >
        <div className="flex-shrink-0 bg-green-100 p-2 rounded-full">
          <Check className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <p className="font-semibold text-green-800">Your item has been added!</p>
          <p className="text-sm text-gray-600">{product.name}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="text-sm text-gray-500 mb-6 flex items-center space-x-2">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <Link href={`/products/${product.category}`} className="hover:underline capitalize">{product.category}</Link>
          <span>/</span>
          <span className="text-gray-800 font-semibold">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative bg-gray-50 rounded-2xl shadow-sm overflow-hidden">
              <Image 
                src={productImages[activeImageIndex]} 
                alt={product.name}
                width={500}
                height={400}
                className="object-contain mx-auto aspect-square"
                priority
              />
              <button onClick={prevImage} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={nextImage} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    activeImageIndex === index ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <Image src={image} alt={`View ${index + 1}`} width={80} height={80} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">{[...Array(5)].map((_, i) => (<Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />))}
                  <span className="text-sm text-gray-600 ml-2">{product.rating || 4.5} ({Math.floor(Math.random() * 200) + 50} reviews)</span>
                </div>
                <span className="text-green-600 font-medium">In Stock</span>
              </div>
              <p className="text-4xl font-bold text-blue-600 mb-4">${product.price.toFixed(2)}</p>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Color: <span className="font-normal">{selectedColor}</span></h3>
              <div className="flex space-x-3">{colors.map((color) => (<button key={color.name} onClick={() => setSelectedColor(color.name)} className={`w-12 h-12 rounded-full border-2 transition-all ${selectedColor === color.name ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'}`} style={{ backgroundColor: color.color }} title={color.name} />))}</div>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Storage: <span className="font-normal">{selectedStorage}</span></h3>
              <div className="grid grid-cols-2 gap-3">{storageOptions.map((storage) => (<button key={storage} onClick={() => setSelectedStorage(storage)} className={`p-3 rounded-lg border-2 text-center font-medium transition-colors ${selectedStorage === storage ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-300 hover:border-gray-400'}`}>{storage}</button>))}</div>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Quantity</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-lg"><button onClick={decrementQuantity} className="p-2 hover:bg-gray-100 rounded-l-lg transition-colors"><Minus className="w-4 h-4" /></button><span className="px-4 py-2 border-x w-12 text-center">{quantity}</span><button onClick={incrementQuantity} className="p-2 hover:bg-gray-100 rounded-r-lg transition-colors"><Plus className="w-4 h-4" /></button></div>
              </div>
            </div>
            <div className="flex space-x-4">
              <button onClick={addToCartHandler} className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 font-semibold flex items-center justify-center space-x-2 transition-colors"><ShoppingCart className="w-5 h-5" /><span>Add to Cart</span></button>
              <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"><Heart className="w-5 h-5" /></button>
              <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"><Share2 className="w-5 h-5" /></button>
            </div>
            <div className="border-t pt-6 space-y-3">
              <div className="flex items-center space-x-2"><Check className="w-5 h-5 text-green-600" /><span>Free shipping on orders over $50</span></div>
              <div className="flex items-center space-x-2"><Check className="w-5 h-5 text-green-600" /><span>30-day return policy</span></div>
              <div className="flex items-center space-x-2"><Check className="w-5 h-5 text-green-600" /><span>1-year manufacturer warranty</span></div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl shadow-sm p-6 mb-8">
          <div className="border-b mb-6"><nav className="flex space-x-8"><button className="pb-2 border-b-2 border-blue-600 text-blue-600 font-medium">Specifications</button><button className="pb-2 text-gray-600 hover:text-gray-800">Reviews</button><button className="pb-2 text-gray-600 hover:text-gray-800">Shipping Info</button></nav></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">{specifications.map((spec, index) => (<div key={index} className="flex justify-between py-2 border-b border-gray-100"><span className="font-medium text-gray-700">{spec.label}</span><span className="text-gray-600 text-right">{spec.value}</span></div>))}</div>
        </div>

        <div className="bg-gray-50 rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold">Customer Reviews</h2>
            <div className="flex items-center space-x-2"><div className="flex items-center space-x-1">{[...Array(5)].map((_, i) => (<Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />))}</div><span className="text-lg font-bold">4.8</span><span className="text-gray-600">Based on 324 reviews</span></div>
          </div>
          <div className="mb-8">{[5, 4, 3, 2, 1].map((rating) => (<div key={rating} className="flex items-center space-x-3 mb-2"><span className="text-sm w-8">{rating}★</span><div className="flex-1 bg-gray-200 rounded-full h-2"><div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${rating === 5 ? 70 : rating === 4 ? 20 : 5}%` }}/></div><span className="text-sm text-gray-600 w-12 text-right">{`${rating === 5 ? 70 : rating === 4 ? 20 : 5}%`}</span></div>))}</div>
          <div className="space-y-6">{reviews.map((review, index) => (<div key={index} className="border-b border-gray-100 pb-6 last:border-b-0"><div className="flex items-start justify-between mb-2"><div className="flex items-center space-x-3"><div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0"><span className="text-sm font-medium">{review.name.charAt(0)}</span></div><div><div className="flex items-center space-x-2"><span className="font-medium">{review.name}</span>{review.verified && (<span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Verified Purchase</span>)}</div><div className="flex items-center space-x-2"><div className="flex items-center space-x-0.5">{[...Array(5)].map((_, i) => (<Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />))}</div><span className="text-sm text-gray-600">{review.date}</span></div></div></div></div><p className="text-gray-700 md:ml-13">{review.comment}</p></div>))}</div>
          <button className="mt-6 text-blue-600 hover:text-blue-800 font-medium transition-colors">Show more reviews</button>
        </div>

        <div className="bg-white py-6">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
            {relatedProducts.map((product) => (
              <div key={product.id} className="relative bg-[#F5F5F7] rounded-[9px] w-[268px] min-w-[200px] h-[432px] px-4 pt-6 pb-6 flex flex-col items-center gap-4 text-center">
                <button className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"><Heart className="w-6 h-6" /></button>
                <div className="w-[160px] h-[160px] flex items-center justify-center"><Image src={product.image} alt={product.name} width={160} height={160} className="object-contain" /></div>
                <div className="flex flex-col flex-grow justify-center"><h3 className="font-semibold text-base leading-tight">{product.name}</h3>{product.model && <p className="text-sm text-gray-600">{product.model}</p>}</div>
                <div><p className="text-2xl font-bold text-black mb-4">${product.price}</p><button className="bg-black text-white w-40 py-3 rounded-lg hover:bg-gray-800 transition-colors font-semibold text-base">Buy Now</button></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}