import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';


interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  formattedPrice?: string; // Add this to match what's passed from App.tsx
}

interface ShopProps {
  products: Product[];
  addToCart: (productId: string) => void;
}

const Shop: React.FC<ShopProps> = ({ products, addToCart }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
// const location = useLocation();
// const searchQuery = searchParams.get('search')



  // Update selectedCategory when URL query parameter changes
  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory('all');
    }
  }, [searchParams]);

  const categories = [
    { name: 'All Drinks', value: 'all' },
    { name: 'Whisky', value: 'whisky' },
    { name: 'Wine', value: 'wine' },
    { name: 'Beer', value: 'beer' },
    { name: 'Vodka', value: 'vodka' },
    { name: 'Gin', value: 'gin' },
    { name: 'Rum', value: 'rum' }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const handleAddToCart = (productId: string) => {
    addToCart(productId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-4">
          Welcome to Kioko Enterprise
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Your premium destination for fine spirits and beverages. Experience the finest collection of drinks from around the world.
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => {
                setSelectedCategory(category.value);
                setSearchParams(category.value === 'all' ? {} : { category: category.value });
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.value
                  ? 'bg-amber-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Premium Drinks Collection</h2>
        <p className="text-gray-600">Discover our curated selection of fine spirits and beverages</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="relative">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                {product.category.toUpperCase()}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-amber-600">
                  {product.formattedPrice || `KES ${product.price.toLocaleString()}`}
                </span>
                <button
                  onClick={() => handleAddToCart(product.id)}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;