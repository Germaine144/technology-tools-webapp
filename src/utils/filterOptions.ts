// utils/filterOptions.ts
export const getFilterOptions = (category: string) => {
  const commonFilters = {
    brands: ['Apple', 'Samsung', 'Xiaomi', 'Huawei', 'OnePlus', 'Google', 'Motorola', 'Realme'],
    colors: ['Gold', 'Silver', 'Space Black', 'Deep Purple', 'Blue', 'Red', 'White', 'Pink'],
  };

  switch (category) {
    case 'phones':
      return {
        ...commonFilters,
        storage: ['64GB', '128GB', '256GB', '512GB', '1TB'],
        protectionClass: ['IP67', 'IP68', 'IP54'],
        screenDiagonal: ['5.4"', '6.1"', '6.7"', '6.8"'],
        screenType: ['OLED', 'LCD', 'AMOLED', 'Super Retina XDR'],
        batteryCapacity: ['3000mAh', '4000mAh', '5000mAh', '6000mAh'],
        connectivity: ['4G', '5G', 'Wi-Fi 6'],
        cameraMP: ['12MP', '48MP', '64MP', '108MP'],
      };
    case 'cameras':
      return {
        ...commonFilters,
        brands: ['Canon', 'Nikon', 'Sony', 'Fujifilm', 'Panasonic', 'Olympus'],
        resolution: ['12MP', '20MP', '24MP', '32MP', '45MP'],
        sensorType: ['Full Frame', 'APS-C', 'Micro Four Thirds'],
        lensMount: ['EF', 'RF', 'F', 'E', 'Z'],
        videoResolution: ['1080p', '4K', '6K', '8K'],
      };
    case 'watches':
      return {
        ...commonFilters,
        brands: ['Apple', 'Samsung', 'Garmin', 'Fitbit', 'Huawei'],
        screenType: ['OLED', 'AMOLED', 'LCD'],
        strapMaterial: ['Silicone', 'Leather', 'Stainless Steel'],
        features: ['Heart Rate', 'GPS', 'Sleep Tracking', 'ECG'],
        waterResistance: ['Yes', 'No'],
      };
    case 'headsets':
      return {
        ...commonFilters,
        brands: ['Apple', 'Sony', 'Bose', 'Sennheiser', 'JBL', 'Audio-Technica', 'Beats'],
        type: ['Over-ear', 'On-ear', 'In-ear', 'Earbuds'],
        connectivity: ['Wired Cơ học', 'Wireless', 'Bluetooth 5.0', 'Bluetooth 5.3'],
        noiseCancellation: ['Active', 'Passive', 'None'],
        batteryLife: ['6 hours', '8 hours', '20 hours', '30 hours', '40 hours'],
        driverSize: ['40mm', '50mm', '6mm', '11mm'],
      };
    case 'tablets':
      return {
        ...commonFilters,
        storage: ['64GB', '128GB', '256GB', '512GB', '1TB', '2TB'],
        screenSize: ['8.3"', '10.2"', '10.9"', '11"', '12.9"'],
        screenType: ['LCD', 'OLED', 'Mini-LED', 'Liquid Retina'],
        batteryLife: ['8 hours', '10 hours', '12 hours', '15 hours'],
        connectivity: ['Wi-Fi', 'Wi-Fi + Cellular', '5G'],
        pencilSupport: ['Apple Pencil', 'S Pen', 'None'],
      };
    case 'computers':
      return {
        ...(commonFilters),
        brands: ['Apple', 'Dell', 'HP', 'Lenovo', 'Microsoft', 'ASUS', 'Acer'],
        type: ['Laptop', 'Desktop', 'All-in-One', 'Mini PC'],
        processor: ['Intel Core i5', 'Intel Core i7', 'Intel Core i9', 'AMD Ryzen 5', 'AMD Ryzen 7', 'Apple M1', 'Apple M2'],
        ram: ['8GB', '16GB', '32GB', '64GB'],
        storage: ['256GB SSD', '512GB SSD', '1TB SSD', '2TB SSD', '1TB HDD'],
        graphics: ['Integrated', 'Dedicated', 'RTX 3060', 'RTX 4070', 'RTX 4080'],
        screenSize: ['13"', '14"', '15"', '16"', '17"', '21"', '24"', '27"'],
      };
    case 'playstation':
      return {
        ...commonFilters,
        models: ['PS4', 'PS4 Pro', 'PS5 Digital', 'PS5 Standard'],
        storage: ['500GB', '1TB', '2TB'],
        accessories: ['DualSense Controller', 'Headset', 'Charging Station', 'Camera'],
        bundles: ['With Game', 'With Extra Controller', 'With VR'],
      };
    default:
      return commonFilters;
  }
};

export const getFilterLabels = (category: string) => {
  const commonLabels = {
    brands: 'Brand',
    colors: 'Color',
    priceRange: 'Price',
  };

  switch (category) {
    case 'phones':
      return {
        ...commonLabels,
        storage: 'Storage',
        protectionClass: 'Protection Class',
        screenDiagonal: 'Screen Size',
        screenType: 'Screen Type',
        batteryCapacity: 'Battery Capacity',
        connectivity: 'Connectivity',
        cameraMP: 'Camera',
      };
    case 'cameras':
      return {
        ...commonLabels,
        resolution: 'Resolution',
        sensorType: 'Sensor Type',
        lensMount: 'Lens Mount',
        videoResolution: 'Video Resolution',
      };
    case 'watches':
      return {
        ...commonLabels,
        screenType: 'Screen Type',
        strapMaterial: 'Strap Material',
        features: 'Features',
        waterResistance: 'Water Resistance',
      };
    case 'headsets':
      return {
        ...commonLabels,
        type: 'Type',
        connectivity: 'Connection',
        noiseCancellation: 'Noise Cancellation',
        batteryLife: 'Battery Life',
        driverSize: 'Driver Size',
      };
    case 'tablets':
      return {
        ...commonLabels,
        storage: 'Storage',
        screenSize: 'Screen Size',
        screenType: 'Display Type',
        batteryLife: 'Battery Life',
        connectivity: 'Connectivity',
        pencilSupport: 'Stylus Support',
      };
    case 'computers':
      return {
        ...commonLabels,
        type: 'Type',
        processor: 'Processor',
        ram: 'RAM',
        storage: 'Storage',
        graphics: 'Graphics',
        screenSize: 'Screen Size',
      };
    case 'playstation':
      return {
        ...commonLabels,
        models: 'Models',
        storage: 'Storage',
        accessories: 'Accessories',
        bundles: 'Bundles',
      };
    default:
      return commonLabels;
  }
};