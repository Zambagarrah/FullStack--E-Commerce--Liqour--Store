import React, { useState } from 'react';
import { X, Plus, Minus, ChevronDown } from 'lucide-react';

// Define size options interface
interface SizeOption {
  ml: number;
  price: number;
  label: string;
}

// Updated product interface with size options
interface Product {
  id: string;
  name: string;
  category: string;
  price: number; // base price
  image: string;
  description: string;
  sizeOptions?: SizeOption[]; // optional size variants
}

interface CartProps {
  cart: {[key: string]: number}; // Simple structure: productId -> quantity
  products: Product[];
  updateQuantity: (productId: string, newQuantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateSize?: (productId: string, oldSizeML: number, newSizeML: number) => void; // Optional for simple implementation
}

const Cart: React.FC<CartProps> = ({ 
  cart = {}, 
  products = [], 
  updateQuantity = () => {}, 
  removeFromCart = () => {}, 
  updateSize = () => {} 
}) => {
  const [openDropdowns, setOpenDropdowns] = useState<{[key: string]: boolean}>({});



  // Helper function to format KES currency
  const formatKES = (amount: number): string => {
    return `KES ${amount.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Helper function to get default size options if not provided
  const getDefaultSizeOptions = (basePrice: number): SizeOption[] => [
    { ml: 250, price: basePrice * 0.7, label: '250ml' },
    { ml: 500, price: basePrice, label: '500ml' },
    { ml: 750, price: basePrice * 1.4, label: '750ml' },
    { ml: 1000, price: basePrice * 1.8, label: '1L' }
  ];

  // Flatten cart items with product details (simplified for basic cart structure)
  const cartItems = Object.entries(cart || {}).map(([productId, quantity]) => {
    const product = products.find(p => p.id === productId);
    
    if (!product || quantity <= 0) {
      return null;
    }
    
    const sizeOptions = product.sizeOptions || getDefaultSizeOptions(product.price);
    const defaultSize = sizeOptions[1]; // Use 500ml as default
    
    return {
      ...product,
      productId,
      selectedSize: defaultSize.ml,
      quantity,
      selectedSizeOption: defaultSize,
      sizeOptions,
      cartKey: `${productId}-${defaultSize.ml}`
    };
  }).filter((item): item is NonNullable<typeof item> => item !== null);

  console.log('Final cart items:', cartItems);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => {
    return sum + ((item.selectedSizeOption?.price || 0) * (item.quantity || 1));
  }, 0);
  const tax = subtotal * 0.16; // 16% tax rate
  const total = subtotal + tax;

  // Toggle dropdown
  const toggleDropdown = (cartKey: string) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [cartKey]: !prev[cartKey]
    }));
  };

  // Handle size change (disabled for simplified cart)
  const handleSizeChange = (productId: string, oldSizeML: number, newSizeML: number) => {
    if (updateSize) {
      updateSize(productId, oldSizeML, newSizeML);
    }
    setOpenDropdowns(prev => ({
      ...prev,
      [`${productId}-${oldSizeML}`]: false
    }));
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Shopping Cart</h1>
            <div className="p-12 bg-white rounded-lg shadow-md">
              <div className="text-gray-600 mb-6">
                <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <p className="text-xl">Your cart is empty</p>
              </div>
              <button 
                onClick={() => window.history.back()}
                className="bg-amber-600 text-white py-2 px-6 rounded-lg hover:bg-amber-700 transition-colors duration-200"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Shopping Cart</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">Items ({cartItems.length})</h2>
              </div>
              
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li key={item.cartKey} className="p-6 flex flex-col sm:flex-row items-start sm:items-center">
                    <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-md overflow-hidden mr-6 mb-4 sm:mb-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                        <p className="text-lg font-medium text-gray-900">
                          {formatKES(item.selectedSizeOption.price * item.quantity)}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                      <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                      
                      {/* Size Selection */}
                      <div className="mt-3 relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Size & Price
                        </label>
                        <div className="relative">
                          <button
                            onClick={() => toggleDropdown(item.cartKey)}
                            className="w-full sm:w-48 bg-white border border-gray-300 rounded-md px-3 py-2 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 flex justify-between items-center"
                          >
                            <span className="text-sm">
                              {item.selectedSizeOption.label} - {formatKES(item.selectedSizeOption.price)}
                            </span>
                            <ChevronDown className={`h-4 w-4 transition-transform ${openDropdowns[item.cartKey] ? 'rotate-180' : ''}`} />
                          </button>
                          
                          {openDropdowns[item.cartKey] && (
                            <div className="absolute z-10 mt-1 w-full sm:w-48 bg-white border border-gray-300 rounded-md shadow-lg">
                              {item.sizeOptions.map((sizeOption) => (
                                <button
                                  key={sizeOption.ml}
                                  onClick={() => handleSizeChange(item.productId, item.selectedSize, sizeOption.ml)}
                                  className={`w-full text-left px-3 py-2 text-sm hover:bg-amber-50 ${
                                    sizeOption.ml === item.selectedSize 
                                      ? 'bg-amber-100 text-amber-800' 
                                      : 'text-gray-700'
                                  }`}
                                >
                                  {sizeOption.label} - {formatKES(sizeOption.price)}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-4 flex justify-between items-center">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button 
                            onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                            className="p-2 text-gray-600 hover:text-amber-600"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 py-2 text-gray-900">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="p-2 text-gray-600 hover:text-amber-600"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => removeFromCart(item.productId)}
                          className="text-gray-500 hover:text-red-500"
                          title="Remove item"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <p className="text-gray-600">Subtotal</p>
                  <p className="text-gray-900 font-medium">{formatKES(subtotal)}</p>
                </div>
                
                <div className="flex justify-between">
                  <p className="text-gray-600">Tax (16%)</p>
                  <p className="text-gray-900 font-medium">{formatKES(tax)}</p>
                </div>
                
                <div className="flex justify-between pt-4 border-t border-gray-200">
                  <p className="text-lg font-semibold">Total</p>
                  <p className="text-lg font-semibold text-amber-600">{formatKES(total)}</p>
                </div>
              </div>
              
              <button 
                className="w-full mt-6 bg-amber-600 text-white py-3 px-4 rounded-lg hover:bg-amber-700 transition-colors duration-200"
              >
                Proceed to Checkout
              </button>
              
              <button 
                onClick={() => window.history.back()}
                className="w-full mt-4 bg-transparent text-amber-600 border border-amber-600 py-3 px-4 rounded-lg hover:bg-amber-50 transition-colors duration-200"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;