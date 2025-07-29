// src/app/api/products/route.ts
import { NextResponse } from 'next/server';

const products = [
  // --- Original Products ---
  {
    id: 1,
    name: "Apple iPhone 14 Pro",
    price: 1099.99,
    description: "Latest iPhone with Dynamic Island and 48MP camera.",
    image: "/image/14pro.png",
    category: "phones",
    brand: "Apple",
    rating: 4.8
  },
  {
    id: 2,
    name: "Samsung Galaxy S23",
    price: 899.99,
    description: "High-end Android phone with sleek design and performance.",
    image: "/image/gee.png",
    category: "phones",
    brand: "Samsung",
    rating: 4.7
  },
  {
    id: 3,
    name: "Apple Watch Series 8",
    price: 399.99,
    description: "Smart watch with health tracking and crash detection.",
    image: "/image/watch.png",
    category: "smartwatches",
    brand: "Apple",
  },
  {
    id: 4,
    name: "AirPods Max Silver",
    price: 549.99,
    description: "High-fidelity audio, Active Noise Cancellation, and personalized spatial audio.",
    image: "/image/head.png",
    category: "headphones",
    brand: "Apple",
  },
  {
    id: 5,
    name: "Samsung Galaxy Watch6 Classic 47mm Black",
    price: 399.99,
    description: "Premium smartwatch with advanced health tracking and rotating bezel.",
    image: "/image/samsung.png",
    category: "smartwatches",
    brand: "Samsung",
  },
  {
    id: 6,
    name: "Galaxy Z Fold5 Unlocked | 256GB | Phantom Black",
    price: 1799.99,
    description: "Revolutionary foldable smartphone with immersive display.",
    image: "/image/hy.png",
    category: "phones",
    brand: "Samsung",
  },
  {
    id: 7,
    name: "Galaxy Buds FE Graphite",
    price: 99.99,
    description: "Noise-canceling earbuds with rich sound and comfortable fit.",
    image: "/image/blue.png",
    category: "headphones",
    brand: "Samsung",
  },
  {
    id: 8,
    name: 'Apple iPad 9 10.2" 64GB Wi-Fi Silver (MK2L3) 2021',
    price: 329.99,
    description: "Affordable and powerful tablet for everyday use.",
    image: "/image/tablets.png",
    category: "tablets",
    brand: "Apple",
  },
  {
    id: 9,
    name: "MacBook Pro 16",
    price: 2499.99,
    description: "Powerful laptop with M2 Pro chip and retina display.",
    image: "/image/ui.png",
    category: "computers",
    brand: "Apple",
    processor: "M2",
    ram: "16GB",
    storage: "512GB SSD"
  },
  // --- Expanded Phone List ---
  // Apple
  { id: 10, name: "Apple iPhone 15", price: 799.99, description: "The new iPhone 15 with A16 Bionic chip.", image: "/image/01.png", category: "phones", brand: "Apple", rating: 4.6 },
  { id: 11, name: "Apple iPhone 15 Pro Max", price: 1199.99, description: "The ultimate iPhone experience with a titanium design.", image: "/image/Iphone14 pro.png", category: "phones", brand: "Apple", rating: 4.9 },
  { id: 12, name: "Apple iPhone SE (2022)", price: 429.00, description: "Powerful A15 Bionic chip in a compact design.", image: "/image/kt.png", category: "phones", brand: "Apple", rating: 4.4 },
  { id: 13, name: "Apple iPhone 13", price: 699.00, description: "A total powerhouse with a leap in battery life.", image: "/image/01.png", category: "phones", brand: "Apple", rating: 4.7 },
  { id: 14, name: "Apple iPhone 14 Plus", price: 899.00, description: "Big screen and big battery life.", image: "/image/Iphone 14 pro 1 (4).png", category: "phones", brand: "Apple", rating: 4.6 },
  
  // Samsung
  { id: 15, name: "Samsung Galaxy S23 Ultra", price: 1199.99, description: "Epic camera, epic performance, epic battery life.", image: "/image/@.png", category: "phones", brand: "Samsung", rating: 4.8 },
  { id: 16, name: "Samsung Galaxy A54 5G", price: 449.99, description: "Awesome camera, awesome screen, awesome battery.", image: "/image/Samsung.jpg", category: "phones", brand: "Samsung", rating: 4.5 },
  { id: 17, name: "Samsung Galaxy Z Flip5", price: 999.99, description: "The ultimate pocketable self-expression tool.", image: "/image/gee.png", category: "phones", brand: "Samsung", rating: 4.6 },
  { id: 18, name: "Samsung Galaxy S22", price: 699.99, description: "A pro-grade kit that fits in one hand.", image: "/image/$.png", category: "phones", brand: "Samsung", rating: 4.6 },
  { id: 19, name: "Samsung Galaxy A14", price: 199.99, description: "A great value phone with a large screen and 5G.", image: "/image/@.png", category: "phones", brand: "Samsung", rating: 4.2 },

  // Xiaomi
  { id: 20, name: "Xiaomi 13 Pro", price: 999.00, description: "Co-engineered with Leica, a masterpiece in imaging.", image: "/image/$.png", category: "phones", brand: "Xiaomi", rating: 4.7 },
  { id: 21, name: "Redmi Note 12 Pro", price: 349.00, description: "Vivid visuals and a smooth 120Hz display.", image: "/image/A2.png", category: "phones", brand: "Xiaomi", rating: 4.5 },
  { id: 22, name: "Poco F5 Pro", price: 499.00, description: "Flagship performance for gaming and everyday use.", image: "/image/gee1.png", category: "phones", brand: "Xiaomi", rating: 4.6 },
  { id: 23, name: "Xiaomi 12T", price: 599.00, description: "Mega moments, mega display, and hyper-charging.", image: "/image/@q.png", category: "phones", brand: "Xiaomi", rating: 4.4 },
  { id: 24, name: "Redmi A2", price: 99.00, description: "An affordable entry-level smartphone for basic needs.", image: "/image/Readmi.png", category: "phones", brand: "Xiaomi", rating: 4.0 },
  { id: 25, name: "Poco X5 Pro", price: 299.00, description: "The secret to winning, with a powerful Snapdragon 778G.", image: "/image/pocco.png", category: "phones", brand: "Xiaomi", rating: 4.5 },
  
  // Huawei
  { id: 26, name: "Huawei P60 Pro", price: 1199.00, description: "Ultra-lighting XMAGE camera with beautiful design.", image: "/image/huu5.jpg", category: "phones", brand: "Huawei", rating: 4.6 },
  { id: 27, name: "Huawei Mate 50 Pro", price: 1099.00, description: "Kunlun Glass and an adjustable aperture camera.", image: "/image/huu3.png", category: "phones", brand: "Huawei", rating: 4.5 },
  { id: 28, name: "Huawei Nova 11 Pro", price: 699.00, description: "Stunning design with a focus on portrait selfies.", image: "/image/huu1.png", category: "phones", brand: "Huawei", rating: 4.3 },
  { id: 29, name: "Huawei P50 Pocket", price: 999.00, description: "A foldable phone that's a statement of style.", image: "/image/huu6.png", category: "phones", brand: "Huawei", rating: 4.4 },
  { id: 30, name: "Huawei Mate X3", price: 2199.00, description: "The ultra-light, ultra-slim, large-screen foldable.", image: "/image/huu2.png", category: "phones", brand: "Huawei", rating: 4.7 },
  { id: 31, name: "Huawei Nova Y91", price: 299.00, description: "Huge battery and a massive screen for entertainment.", image: "/image/huu4.png", category: "phones", brand: "Huawei", rating: 4.1 },

  // OnePlus
  { id: 32, name: "OnePlus 11 5G", price: 699.00, description: "The Shape of Power with Snapdragon 8 Gen 2.", image: "/image/one1.png", category: "phones", brand: "OnePlus", rating: 4.7 },
  { id: 33, name: "OnePlus Nord 3 5G", price: 449.00, description: "A pretty much everything-you-could-ask-for phone.", image: "/image/one4.png", category: "phones", brand: "OnePlus", rating: 4.5 },
  { id: 34, name: "OnePlus 10T 5G", price: 549.00, description: "Evolve beyond speed with 150W SUPERVOOC charging.", image: "/image/one6.png", category: "phones", brand: "OnePlus", rating: 4.6 },
  { id: 35, name: "OnePlus Nord CE 3 Lite 5G", price: 299.00, description: "Larger than life with a 108MP camera system.", image: "/image/one5.png", category: "phones", brand: "OnePlus", rating: 4.3 },
  { id: 36, name: "OnePlus Open", price: 1699.00, description: "A flagship foldable that opens up new possibilities.", image: "/image/one7.png", category: "phones", brand: "OnePlus", rating: 4.8 },
  { id: 37, name: "OnePlus 10 Pro", price: 799.00, description: "Hasselblad Camera for Mobile, Snapdragon 8 Gen 1.", image: "/image/one2.png", category: "phones", brand: "OnePlus", rating: 4.7 },
  
  // Google
  { id: 38, name: "Google Pixel 8 Pro", price: 999.00, description: "The best of Google, with an amazing camera and AI.", image: "/image/google-pixel8-pro.png", category: "phones", brand: "Google", rating: 4.8 },
  { id: 39, name: "Google Pixel 7a", price: 499.00, description: "Fast, secure, and full of helpful features.", image: "/image/google-pixel-7a.png", category: "phones", brand: "Google", rating: 4.6 },
  { id: 40, name: "Google Pixel Fold", price: 1799.00, description: "The power of a Pixel. Now in a foldable design.", image: "/image/google-pixel-fold.png", category: "phones", brand: "Google", rating: 4.5 },
  { id: 41, name: "Google Pixel 8", price: 699.00, description: "Powerful, helpful, and built around you.", image: "/image/google-pixel-8.png", category: "phones", brand: "Google", rating: 4.7 },
  { id: 42, name: "Google Pixel 7", price: 599.00, description: "Powered by Google Tensor G2, it's simply smart.", image: "/image/google-pixel-7.png", category: "phones", brand: "Google", rating: 4.7 },
  { id: 43, name: "Google Pixel 6a", price: 349.00, description: "The budget-friendly Pixel with Google's brains.", image: "/image/google-pixel-6a.png", category: "phones", brand: "Google", rating: 4.5 },

  // Motorola
  { id: 44, name: "Motorola Razr+ (2023)", price: 999.99, description: "Flip the script with a huge external display.", image: "/image/half.png", category: "phones", brand: "Motorola", rating: 4.5 },
  { id: 45, name: "Motorola Edge+ (2023)", price: 799.99, description: "A powerhouse with a beautiful borderless display.", image: "/image/motorola-edge-plus.png", category: "phones", brand: "Motorola", rating: 4.4 },
  { id: 46, name: "Moto G Stylus 5G", price: 399.99, description: "Unleash your creativity with a built-in stylus.", image: "/image/moto-g-stylus.png", category: "phones", brand: "Motorola", rating: 4.3 },
  { id: 47, name: "Moto G Power 5G", price: 299.99, description: "Incredible battery life meets 5G speed.", image: "/image/half.png", category: "phones", brand: "Motorola", rating: 4.2 },
  { id: 48, name: "Motorola ThinkPhone", price: 699.99, description: "Business-grade security and seamless PC integration.", image: "/image/motorola-thinkphone.png", category: "phones", brand: "Motorola", rating: 4.6 },
  { id: 49, name: "Moto G Play (2023)", price: 169.99, description: "Up to 3 days of battery for endless fun.", image: "/image/moto-g-play.png", category: "phones", brand: "Motorola", rating: 4.0 },

  // Realme
  { id: 50, name: "Realme GT3", price: 649.00, description: "World's fastest charging with 240W SUPERVOOC.", image: "/image/14pro.png", category: "phones", brand: "Realme", rating: 4.6 },
  { id: 51, name: "Realme 11 Pro+", price: 499.00, description: "200MP OIS SuperZoom camera and premium design.", image: "/image/realme-11-pro.png", category: "phones", brand: "Realme", rating: 4.5 },
  { id: 52, name: "Realme C55", price: 199.00, description: "A champion in the segment with a mini capsule feature.", image: "/image/realme-c55.png", category: "phones", brand: "Realme", rating: 4.2 },
  { id: 53, name: "Realme GT Neo 5", price: 450.00, description: "Flagship performance with a unique transparent design.", image: "/image/14pro.png", category: "phones", brand: "Realme", rating: 4.7 },
  { id: 54, name: "Realme 10 Pro", price: 319.00, description: "Boundless display with a 120Hz refresh rate.", image: "/image/realme-10-pro.png", category: "phones", brand: "Realme", rating: 4.4 },
  { id: 55, name: "Realme GT2 Pro", price: 749.00, description: "A premium flagship that's greater than you see.", image: "/image/realme-gt2-pro.png", category: "phones", brand: "Realme", rating: 4.7 },

  // --- Expanded Computer List ---
  // Apple
  { id: 56, name: "Apple MacBook Air 13 M2", price: 1099.00, description: "Strikingly thin design, M2 chip, and up to 18 hours of battery life.", image: "/image/ui.png", category: "computers", brand: "Apple", processor: "M2", ram: "8GB", storage: "256GB SSD", graphics: "Integrated", rating: 4.8 },
  { id: 57, name: "Apple iMac 24-inch M1", price: 1299.00, description: "Immersive 24-inch 4.5K Retina display in a stunningly thin design.", image: "/image/airr.png", category: "computers", brand: "Apple", processor: "M1", ram: "8GB", storage: "256GB SSD", graphics: "Integrated", rating: 4.7 },
  { id: 58, name: "Apple Mac Studio M2 Max", price: 1999.00, description: "Outrageous performance and extensive connectivity for a creative studio.", image: "/image/air.png", category: "computers", brand: "Apple", processor: "M2", ram: "32GB", storage: "512GB SSD", graphics: "Integrated", rating: 4.9 },

  // Dell
  { id: 59, name: "Dell XPS 13 Plus Laptop", price: 1299.00, description: "Futuristic, minimalist design with powerful Intel Core performance.", image: "/image/dellr.png", category: "computers", brand: "Dell", processor: "Intel i7", ram: "16GB", storage: "512GB SSD", graphics: "Integrated", rating: 4.6 },
  { id: 60, name: "Dell Alienware m18 Gaming Laptop", price: 2499.99, description: "Peak gaming performance with an 18-inch display and RTX graphics.", image: "/image/ani1.jpg", category: "computers", brand: "Dell", processor: "Intel i9", ram: "32GB", storage: "1TB SSD", graphics: "NVIDIA RTX", rating: 4.8 },
  { id: 61, name: "Dell Inspiron 15 Laptop", price: 649.99, description: "A versatile and affordable laptop for everyday use.", image: "/image/ani.jpg", category: "computers", brand: "Dell", processor: "Intel i5", ram: "8GB", storage: "512GB SSD", graphics: "Integrated", rating: 4.3 },
  
  // HP
  { id: 62, name: "HP Spectre x360 14 2-in-1", price: 1449.99, description: "A convertible powerhouse with a stunning OLED display.", image: "/image/ui.png", category: "computers", brand: "HP", processor: "Intel i7", ram: "16GB", storage: "1TB SSD", graphics: "Integrated", rating: 4.7 },
  { id: 63, name: "HP OMEN 16 Gaming Laptop", price: 1599.99, description: "Play at your best with a powerful AMD processor and NVIDIA graphics.", image: "/image/ui.png", category: "computers", brand: "HP", processor: "AMD Ryzen 7", ram: "16GB", storage: "1TB SSD", graphics: "NVIDIA RTX", rating: 4.6 },
  { id: 64, name: "HP Pavilion Aero 13", price: 799.99, description: "Incredibly lightweight with a premium look and feel.", image: "/image/ui.png", category: "computers", brand: "HP", processor: "AMD Ryzen 5", ram: "16GB", storage: "512GB SSD", graphics: "Integrated", rating: 4.5 },

  // Lenovo
  { id: 65, name: "Lenovo ThinkPad X1 Carbon Gen 11", price: 1749.00, description: "The ultimate business ultrabook, refined for modern professionals.", image: "/image/lenovor.png", category: "computers", brand: "Lenovo", processor: "Intel i7", ram: "16GB", storage: "512GB SSD", graphics: "Integrated", rating: 4.8 },
  { id: 66, name: "Lenovo Yoga 7i 16 2-in-1", price: 999.00, description: "Flexibility and performance for creativity and productivity.", image: "/image/leno.jpg", category: "computers", brand: "Lenovo", processor: "Intel i7", ram: "16GB", storage: "512GB SSD", graphics: "Integrated", rating: 4.5 },
  { id: 67, name: "Lenovo Legion Pro 5i Gen 8", price: 1799.00, description: "AI-tuned gaming performance that dominates the competition.", image: "/image/Laptop.jpg", category: "computers", brand: "Lenovo", processor: "Intel i7", ram: "16GB", storage: "1TB SSD", graphics: "NVIDIA RTX", rating: 4.7 },

  // Asus
  { id: 68, name: "Asus ROG Zephyrus G14 (2023)", price: 1599.99, description: "The ultimate portable gaming laptop with an AniMe Matrix display.", image: "/image/asusr1.png", category: "computers", brand: "Asus", processor: "AMD Ryzen 9", ram: "16GB", storage: "1TB SSD", graphics: "NVIDIA RTX", rating: 4.8 },
  { id: 69, name: "Asus Zenbook 14X OLED", price: 1199.99, description: "A powerful and compact laptop with a breathtaking OLED screen.", image: "/image/assusr.png", category: "computers", brand: "Asus", processor: "Intel i7", ram: "16GB", storage: "512GB SSD", graphics: "Integrated", rating: 4.6 },
  { id: 70, name: "Asus TUF Gaming A15", price: 1099.99, description: "Durable, reliable gaming laptop with high-refresh-rate display.", image: "/image/assur2.png", category: "computers", brand: "Asus", processor: "AMD Ryzen 7", ram: "16GB", storage: "512GB SSD", graphics: "NVIDIA RTX", rating: 4.4 },

  // Acer
  { id: 71, name: "Acer Swift Go 14", price: 899.99, description: "Ultralight design with a vibrant OLED display and Intel Evo platform.", image: "/image/accerr2.png", category: "computers", brand: "Acer", processor: "Intel i7", ram: "16GB", storage: "512GB SSD", graphics: "Integrated", rating: 4.5 },
  { id: 72, name: "Acer Predator Helios 16", price: 1649.99, description: "Next-gen gaming with a 13th Gen Intel CPU and RTX 40 series GPU.", image: "/image/accerr1.png", category: "computers", brand: "Acer", processor: "Intel i7", ram: "16GB", storage: "1TB SSD", graphics: "NVIDIA RTX", rating: 4.6 },
  { id: 73, name: "Acer Aspire 3", price: 429.99, description: "Practical and affordable laptop for everyday tasks and browsing.", image: "/image/accerr.png", category: "computers", brand: "Acer", processor: "AMD Ryzen 5", ram: "8GB", storage: "256GB SSD", graphics: "Integrated", rating: 4.1 },

  // MSI
  { id: 74, name: "MSI Titan GT77 HX", price: 4299.00, description: "Desktop-caliber performance in a mobile form factor for hardcore gamers.", image: "/image/public/image/msir.png", category: "computers", brand: "MSI", processor: "Intel i9", ram: "64GB", storage: "2TB SSD", graphics: "NVIDIA RTX", rating: 4.9 },
  { id: 75, name: "MSI Katana 15 (2023)", price: 1199.00, description: "Sharpen your game with a powerful and sleek gaming laptop.", image: "/image/msi1.jpg", category: "computers", brand: "MSI", processor: "Intel i7", ram: "16GB", storage: "1TB SSD", graphics: "NVIDIA RTX", rating: 4.5 },
  { id: 76, name: "MSI Stealth 16 Studio", price: 1999.00, description: "A crossover laptop for gaming and content creation in a thin profile.", image: "/image/ani6.jpg", category: "computers", brand: "MSI", processor: "Intel i7", ram: "32GB", storage: "1TB SSD", graphics: "NVIDIA RTX", rating: 4.7 },

  //Canon
  { id: 77, name: "Canon EOS M50 Mark II", price: 4299.00, description: "Compact mirrorless camera ideal for vlogging and content creation.", image: "/image/public/image/canon1.jpg", category: "cameras", brand: "Canon", processor: "DIGIC 8", ram: "Not Applicable", storage: "SD Card", graphics: "Not Applicable", rating: 4.9 },
  { id: 78, name: "Canon EOS M50 Mark II", price: 1199.00, description: "Compact mirrorless camera ideal for vlogging and content creation.", image: "/image/conon2.jpg", category: "cameras", brand: "Canon", processor: "DIGIC 8", ram: "Not Applicable", storage: "SD Card", graphics: "Not Applicable", rating: 4.5 },
  { id: 79, name: "Canon EOS R50", price: 1999.00, description: "A crossover camera for photography and content creation in a compact profile.", image: "/image/conon2.jpg", category: "cameras", brand: "Canon", processor: "DIGIC X", ram: "Not Applicable", storage: "SD Card", graphics: "Not Applicable", rating: 4.7 },

  //Nikon
  { id: 80, name: "Nikon Z8", price: 4299.00, description: "Flagship mirrorless camera with fast autofocus and 8K internal video recording.", image: "/image/public/image/nikon1.jpg", category: "cameras", brand: "Nikon", processor: "EXPEED 7", ram: "Not Applicable", storage: "Dual CFexpress/SD", graphics: "Not Applicable", rating: 4.9 },
  { id: 81, name: "Nikon D5600", price: 1199.00, description: "User-friendly DSLR with great image quality and wireless sharing.", image: "/image/Nikon.jpg", category: "cameras", brand: "Nikon", processor: "EXPEED 4", ram: "16GB", storage: "SD Card", graphics: "Not Applicable", rating: 4.5 },
  { id: 82, name: "Nikon Z50", price: 1999.00, description: "A crossover camera for photography and content creation in a compact profile.", image: "/image/nikon2.jpg", category: "cameras", brand: "Nikon", processor: "EXPEED 6", ram: "Not Applicable", storage: "SD Card", graphics: "Not Applicable", rating: 4.7 },

  //Sony
  { id: 83, name: "Sony Alpha a7 IV", price: 4299.00, description: "A hybrid mirrorless camera built for creators with 33MP sensor and real-time tracking AF.", image: "/image/public/image/sony1.jpg", category: "cameras", brand: "Sony", processor: "BIONZ XR", ram: "Not Applicable", storage: "Dual Card Slots", graphics: "Not Applicable", rating: 4.9 },
  { id: 84, name: "Sony ZV-E10", price: 1199.00, description: "Interchangeable lens vlogging camera with a flip screen and microphone input.", image: "/image/sonyr.jpg", category: "cameras", brand: "Sony", processor: "BIONZ X", ram: "Not Applicable", storage: "SD Card", graphics: "Not Applicable", rating: 4.5 },
  { id: 85, name: "Sony Alpha a7R V", price: 1999.00, description: "A crossover camera for photography and content creation in a compact profile.", image: "/image/sony1.jpg", category: "cameras", brand: "Sony", processor: "BIONZ XR", ram: "Not Applicable", storage: "SD Card", graphics: "Not Applicable", rating: 4.7 },

  //Fujifilm
  { id: 86, name: "Fujifilm X-T5", price: 4299.00, description: "High-resolution APS-C mirrorless camera with retro styling and advanced controls.", image: "/image/public/image/fuji.jpg", category: "cameras", brand: "Fujifilm", processor: "X-Processor 5", ram: "Not Applicable", storage: "Dual SD Cards", graphics: "Not Applicable", rating: 4.9 },
  { id: 87, name: "Fujifilm X10", price: 1199.00, description: "Premium compact camera with a fixed lens and hybrid viewfinder.", image: "/image/fuji1.jpg", category: "cameras", brand: "Fujifilm", processor: "X-Processor 4", ram: "Not Applicable", storage: " SD Cards", graphics: "Not Applicable", rating: 4.5 },
  { id: 88, name: "Fujifilm X-S20", price: 1999.00, description: "A crossover camera for photography and content creation in a compact profile.", image: "/image/fuji1.jpg", category: "cameras", brand: "Fujifilm", processor: "X-Processor 5", ram: "Not Applicable", storage: "SD Card", graphics: "Not Applicable", rating: 4.7 },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    // Filter by category if provided
    let filteredProducts = products;
    if (category && category !== 'all') {
      filteredProducts = products.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    return NextResponse.json(filteredProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}