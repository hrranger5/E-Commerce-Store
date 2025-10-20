import { Product } from '../types';

export const mockProducts: Product[] = [
  {
    id: 1,
    name: 'CloudFlex Running Shoes',
    price: 135.00,
    description: 'Lightweight and responsive running shoes with maximum cushioning. Perfect for daily runs and long distances.',
    imageUrl: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=600&h=600&q=80',
    category: 'Footwear',
    stock: 25,
    details: {
      brand: 'AeroRun',
      weight: '250g',
      dimensions: '30cm x 15cm x 10cm',
      features: [
        'Breathable mesh upper',
        'High-rebound foam midsole',
        'Durable rubber outsole for traction',
        'Padded collar and tongue for comfort'
      ]
    }
  },
  {
    id: 2,
    name: 'Floral Print Summer Dress',
    price: 89.99,
    description: 'A beautiful and breezy floral dress made from lightweight cotton. Ideal for warm summer days and casual outings.',
    imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=600&h=600&q=80',
    category: 'Apparel',
    stock: 15,
    details: {
      brand: 'SummerChic',
      weight: '300g',
      dimensions: 'N/A',
      features: [
        '100% Organic Cotton',
        'A-line silhouette',
        'Adjustable spaghetti straps',
        'Machine washable'
      ]
    }
  },
  {
    id: 3,
    name: 'ProBook X1 Laptop',
    price: 1450.00,
    description: 'Powerful 14-inch laptop with a high-resolution display, 16GB RAM, and a 1TB SSD. Built for professionals and creatives on the go.',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&h=600&q=80',
    category: 'Electronics',
    stock: 8,
    details: {
      brand: 'TechCore',
      weight: '1.2kg',
      dimensions: '32cm x 22cm x 1.5cm',
      features: [
        '14" 4K UHD Display',
        'Intel i7 12th Gen Processor',
        'Backlit Keyboard',
        'Thunderbolt 4 Ports'
      ]
    }
  },
  {
    id: 4,
    name: 'Minimalist Desk Lamp',
    price: 45.99,
    description: 'Sleek and modern LED desk lamp with adjustable brightness and color temperature. Provides flicker-free lighting for your workspace.',
    imageUrl: 'https://images.unsplash.com/photo-1543369792-935932a39213?auto=format&fit=crop&w=600&h=600&q=80',
    category: 'Lighting',
    stock: 40,
    details: {
      brand: 'Lumina',
      weight: '600g',
      dimensions: '40cm (H) x 15cm (Base)',
      features: [
        '3 Color Temperatures (Warm/Neutral/Cool)',
        '5-level Dimmer',
        'USB Charging Port',
        'Aluminum Alloy Construction'
      ]
    }
  },
  {
    id: 5,
    name: 'Noise-Cancelling Headphones',
    price: 250.00,
    description: 'Immerse yourself in sound with these premium noise-cancelling headphones. Over-ear design, plush earcups, and up to 30 hours of battery life.',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80',
    category: 'Electronics',
    stock: 0,
    details: {
      brand: 'SoundScape',
      weight: '280g',
      dimensions: '20cm x 18cm x 8cm',
      features: [
        'Active Noise Cancellation (ANC)',
        'Bluetooth 5.2 Connectivity',
        '30-Hour Battery Life',
        'Built-in Microphone for Calls'
      ]
    }
  },
  {
    id: 6,
    name: 'Titan Smartwatch V2',
    price: 199.00,
    description: 'Track your fitness, receive notifications, and stay connected with this sleek smartwatch. Features a vibrant AMOLED display and GPS.',
    imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&h=600&q=80',
    category: 'Gadgets',
    stock: 18,
    details: {
      brand: 'Titan',
      weight: '55g',
      dimensions: '44mm case',
      features: [
        'Heart Rate & SpO2 Monitoring',
        'Water Resistant up to 50m',
        '14-Day Battery Life',
        'GPS and GLONASS'
      ]
    }
  },
  {
    id: 7,
    name: 'Classic Denim Jacket',
    price: 95.00,
    description: 'A timeless denim jacket that never goes out of style. Made from durable, high-quality denim for a comfortable fit.',
    imageUrl: 'https://images.unsplash.com/photo-1596755094501-2b812b1d7d3c?auto=format&fit=crop&w=600&h=600&q=80',
    category: 'Apparel',
    stock: 30,
    details: {
      brand: 'Urban Threads',
      weight: '800g',
      dimensions: 'N/A',
      features: [
        '98% Cotton, 2% Elastane',
        'Button-front closure',
        'Chest flap pockets',
        'Vintage wash finish'
      ]
    }
  },
  {
    id: 8,
    name: 'Leather Backpack',
    price: 185.00,
    description: 'A stylish and functional backpack crafted from genuine leather. Perfect for work, travel, or everyday use, with a dedicated laptop sleeve.',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb6e0e935?auto=format&fit=crop&w=600&h=600&q=80',
    category: 'Accessories',
    stock: 12,
    details: {
      brand: 'Nomad',
      weight: '1.1kg',
      dimensions: '45cm x 30cm x 15cm',
      features: [
        '100% Full-Grain Leather',
        'Padded sleeve fits 15" laptop',
        'Multiple interior pockets',
        'Adjustable shoulder straps'
      ]
    }
  }
];