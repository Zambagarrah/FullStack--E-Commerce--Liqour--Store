import { useState, useEffect } from 'react';
import { Clock, Shield, Award, Star, Phone, Truck, Gift } from 'lucide-react';

// Define interfaces matching your cart system
interface SizeOption {
  ml: number;
  price: number;
  label: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  sizeOptions?: SizeOption[];
}

interface CartItem {
  productId: string;
  selectedSize: number;
  quantity: number;
}

export default function KiokoEnterpriseLandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cart, setCart] = useState<{[key: string]: CartItem[]}>({});
  const [notification, setNotification] = useState<string | null>(null);

  // Convert your featured products to match the cart system format
  const featuredProducts: Product[] = [
    {
      id: "whisky-premium-001",
      name: "Premium Whisky Collection",
      category: "Whisky",
      price: 10469,
      image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=400&h=400&fit=crop",
      description: "Premium imported whisky with rich flavor and smooth finish",
      sizeOptions: [
        { ml: 250, price: 7500, label: '250ml' },
        { ml: 500, price: 10469, label: '500ml' },
        { ml: 750, price: 14500, label: '750ml' },
        { ml: 1000, price: 18000, label: '1L' }
      ]
    },
    {
      id: "beer-tusker-001",
      name: "Local Tusker Beer",
      category: "Beer",
      price: 4159,
      image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&h=400&fit=crop",
      description: "Kenya's favorite beer, crisp and refreshing",
      sizeOptions: [
        { ml: 330, price: 300, label: '330ml Bottle' },
        { ml: 500, price: 4159, label: '500ml Can' },
        { ml: 1000, price: 7500, label: '1L Bottle' }
      ]
    },
    {
      id: "wine-premium-001",
      name: "Premium Wine Selection",
      category: "Wine",
      price: 2999,
      image: "https://www.thejefferson.co.nz/wp-content/uploads/2024/03/glass-of-red-wine.jpg",
      description: "Carefully selected premium wines from around the world",
      sizeOptions: [
        { ml: 375, price: 2000, label: '375ml' },
        { ml: 750, price: 2999, label: '750ml' },
        { ml: 1500, price: 5500, label: '1.5L' }
      ]
    },
    {
      id: "vodka-premium-001",
      name: "Vodka Premium",
      category: "Vodka",
      price: 2499,
      image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&h=400&fit=crop",
      description: "Premium vodka with pure, clean taste",
      sizeOptions: [
        { ml: 250, price: 1800, label: '250ml' },
        { ml: 500, price: 2499, label: '500ml' },
        { ml: 750, price: 3500, label: '750ml' },
        { ml: 1000, price: 4500, label: '1L' }
      ]
    }
  ];

  // Helper function to get default size options
  // const getDefaultSizeOptions = (basePrice: number): SizeOption[] => [
  //   { ml: 250, price: basePrice * 0.7, label: '250ml' },
  //   { ml: 500, price: basePrice, label: '500ml' },
  //   { ml: 750, price: basePrice * 1.4, label: '750ml' },
  //   { ml: 1000, price: basePrice * 1.8, label: '1L' }
  // ];

  // Add to cart function
  const addToCart = (productId: string, selectedSize: number = 500, quantity: number = 1) => {
    setCart(prevCart => {
      const newCart = { ...prevCart };
      
      if (!newCart[productId]) {
        newCart[productId] = [];
      }
      
      const existingItemIndex = newCart[productId].findIndex(item => item.selectedSize === selectedSize);
      
      if (existingItemIndex >= 0) {
        // Update existing item quantity
        newCart[productId][existingItemIndex].quantity += quantity;
      } else {
        // Add new item
        newCart[productId].push({
          productId,
          selectedSize,
          quantity
        });
      }
      
      return newCart;
    });

    // Show notification
    const product = featuredProducts.find(p => p.id === productId);
    if (product) {
      setNotification(`${product.name} added to cart!`);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  // Update quantity function
  // const updateQuantity = (productId: string, sizeML: number, newQuantity: number) => {
  //   if (newQuantity <= 0) {
  //     removeFromCart(productId, sizeML);
  //     return;
  //   }
    
  //   setCart(prevCart => {
  //     const newCart = { ...prevCart };
  //     if (newCart[productId]) {
  //       const itemIndex = newCart[productId].findIndex(item => item.selectedSize === sizeML);
  //       if (itemIndex >= 0) {
  //         newCart[productId][itemIndex].quantity = newQuantity;
  //       }
  //     }
  //     return newCart;
  //   });
  // };

  // Remove from cart function
  // const removeFromCart = (productId: string, sizeML: number) => {
  //   setCart(prevCart => {
  //     const newCart = { ...prevCart };
  //     if (newCart[productId]) {
  //       newCart[productId] = newCart[productId].filter(item => item.selectedSize !== sizeML);
  //       if (newCart[productId].length === 0) {
  //         delete newCart[productId];
  //       }
  //     }
  //     return newCart;
  //   });
  // };

  // Update size function
  // const updateSize = (productId: string, oldSizeML: number, newSizeML: number) => {
  //   setCart(prevCart => {
  //     const newCart = { ...prevCart };
  //     if (newCart[productId]) {
  //       const itemIndex = newCart[productId].findIndex(item => item.selectedSize === oldSizeML);
  //       if (itemIndex >= 0) {
  //         const quantity = newCart[productId][itemIndex].quantity;
  //         // Remove old size
  //         newCart[productId].splice(itemIndex, 1);
  //         // Add new size
  //         const existingNewSizeIndex = newCart[productId].findIndex(item => item.selectedSize === newSizeML);
  //         if (existingNewSizeIndex >= 0) {
  //           newCart[productId][existingNewSizeIndex].quantity += quantity;
  //         } else {
  //           newCart[productId].push({
  //             productId,
  //             selectedSize: newSizeML,
  //             quantity
  //           });
  //         }
  //       }
  //     }
  //     return newCart;
  //   });
  // };

  // Calculate cart total items
  const getTotalCartItems = () => {
    return Object.values(cart).reduce((total, items) => {
      return total + items.reduce((sum, item) => sum + item.quantity, 0);
    }, 0);
  };

  // Format price for display
  const formatPrice = (price: number) => {
    return price.toLocaleString('en-KE');
  };

  const slides = [
    {
      title: "24/7 Alcohol Delivery in Coastal Kenya",
      subtitle: "Fastest delivery in 10-50 minutes",
      description: "Premium wines, beer, spirits & mixers delivered to your doorstep",
      cta: "Order Now",
      bgGradient: "from-emerald-900 via-emerald-800 to-teal-800"
    },
    {
      title: "Over 600 Drinks in Stock",
      subtitle: "Largest selection in Kenya",
      description: "Local and imported drinks available anytime, anywhere",
      cta: "Browse Collection",
      bgGradient: "from-amber-900 via-orange-800 to-red-800"
    },
    {
      title: "Faster Delivery: Makupa, Kilifi, Watamu",
      subtitle: "Express service in Mtwapa, Hindi, Garsen, Mpeketoni & Lamu",
      description: "Professional service you can trust across the coast",
      cta: "Call 0700 245 245",
      bgGradient: "from-purple-900 via-indigo-800 to-blue-800"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 bg-emerald-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">
          {notification}
        </div>
      )}

      {/* Cart Badge (optional - you can add this to your header) */}
      {getTotalCartItems() > 0 && (
        <div className="fixed top-4 left-4 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm z-50">
          {getTotalCartItems()}
        </div>
      )}

      {/* Hero Section - Full Height */}
      <section className="relative h-screen overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].bgGradient} transition-all duration-1000`}>
          <div className="absolute inset-0 bg-black/30"></div>
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-24 h-24 bg-white rounded-full animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white rounded-full animate-pulse delay-500"></div>
          </div>
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-3xl">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-4">
                🚀 Fastest Alcohol Delivery in Coastal Kenya
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {slides[currentSlide].title}
            </h2>
            <p className="text-2xl mb-4 text-emerald-100 font-medium">
              {slides[currentSlide].subtitle}
            </p>
            <p className="text-lg mb-8 text-gray-200 max-w-2xl">
              {slides[currentSlide].description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl">
                {slides[currentSlide].cta}
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-gray-900 transition-all">
                View Menu
              </button>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/70'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Kioko Enterprise?</h2>
            <p className="text-xl text-gray-600">Experience the best alcohol delivery service across coastal Kenya</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform">
                <Clock className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
              <p className="text-gray-600">Average delivery time: 23 minutes in Makupa, Kilifi, Watamu, Mtwapa, Hindi, Garsen, Mpeketoni & Lamu</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform">
                <Shield className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3">24/7 Available</h3>
              <p className="text-gray-600">Available every day, any time - even past midnight</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform">
                <Award className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3">Huge Selection</h3>
              <p className="text-gray-600">600+ products including local and imported drinks</p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform">
                <Truck className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3">Free Delivery</h3>
              <p className="text-gray-600">Free delivery on orders above KSH 3,000</p>
            </div>
          </div>
        </div>
      </section>

      {/* Drink Categories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">🍷 Shop by Category</h2>
            <p className="text-xl text-gray-600">Explore our complete collection of premium drinks</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[
              { name: "Kioko Wine", count: "200+", image: "https://www.thejefferson.co.nz/wp-content/uploads/2024/03/glass-of-red-wine.jpg" },
              { name: "Whiskey", count: "150+", image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=400&h=300&fit=crop" },
              { name: "Beer", count: "80+", image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&h=300&fit=crop" },
              { name: "Vodka", count: "60+", image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&h=300&fit=crop" },
              { name: "Gin", count: "45+", image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop" },
              { name: "Rum", count: "40+", image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400&h=300&fit=crop" }
            ].map((category, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="relative w-36 h-44 bg-white rounded-2xl mx-auto mb-4 group-hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent rounded-2xl"></div>
                  <div className="absolute bottom-3 left-3 bg-black/80 text-white px-2 py-1 rounded-full text-xs font-bold">
                    {category.count}
                  </div>
                  <div className="absolute top-3 right-3 bg-white/95 text-gray-900 px-2 py-1 rounded-full text-xs font-bold">
                    KIOKO
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 mb-1 text-lg">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.count} items</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Deals */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-red-100 text-red-800 px-4 py-2 rounded-full font-semibold mb-4">
              <span>🔥</span>
              <span>Hot Deals</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trending Deals</h2>
            <p className="text-xl text-gray-600">Limited time offers you don't want to miss</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => {
              const hasDiscount = index < 2; // First two products have discounts
              const originalPrice = hasDiscount ? product.price * 1.2 : product.price;
              const discountPercent = hasDiscount ? Math.round(((originalPrice - product.price) / originalPrice) * 100) : 0;
              
              return (
                <div key={product.id} className="bg-white border-0 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
                  {hasDiscount && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10 shadow-lg">
                      {discountPercent}% OFF
                    </div>
                  )}
                  
                  <div className="aspect-square bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 rounded-t-2xl flex items-center justify-center relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full shadow-lg flex items-center justify-center">
                      <Gift className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${
                              i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2 font-medium">
                        4.67
                      </span>
                    </div>
                    
                    <h3 className="font-bold text-gray-900 mb-3 text-lg">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        {hasDiscount && (
                          <span className="text-gray-500 line-through text-sm mr-2">
                            KSH {formatPrice(originalPrice)}
                          </span>
                        )}
                        <span className="text-emerald-600 font-bold text-xl">
                          KSH {formatPrice(product.price)}
                        </span>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => addToCart(product.id)}
                      className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white rounded-full animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-5xl font-bold mb-6">Ready to Order?</h2>
          <p className="text-2xl mb-8 text-emerald-100">Get your favorite drinks delivered in 23 minutes across coastal Kenya</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="bg-white text-emerald-600 px-10 py-4 rounded-full font-bold hover:bg-gray-100 transition-all text-xl shadow-2xl transform hover:scale-105">
              🛒 Start Shopping
            </button>
            <div className="flex items-center space-x-3 text-xl">
              <Phone className="w-6 h-6" />
              <span className="font-bold">Call: 0700 245 245</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}