import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/contact';
import Login from './pages/login';
import Cart from './pages/Cart';
import DebugStyles from './components/DebugStyles';
import TailwindTest from './components/TailwindTest';
import { useState } from 'react';

import './styles/App.css';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number; // Changed to number to store raw price
  image: string;
  description: string;
  formattedPrice?: string; // Optional formatted price display
}

function App() {
  const [cart, setCart] = useState<{[key: string]: number}>({});

  // Currency formatting function for Kenyan Shillings
  const formatKES = (amount: number): string => {
    // Format number with commas and 2 decimal places
    const formatted = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true
    }).format(amount);
    
    return `KES ${formatted}`;
  };

  // Expanded products data with Kenya drinks (prices in Kenyan Shillings)
  const products: Product[] = [
    // WHISKY
    {
      id: '1',
      name: 'Johnnie Walker Black Label',
      category: 'whisky',
      price: 4500, // Store as raw number
      image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=300&h=300&fit=crop',
      description: 'Premium Scotch whisky, aged 12 years with rich smoky flavor'
    },
    {
      id: '2',
      name: 'Jack Daniels Old No.7',
      category: 'whisky',
      price: 3800,
      image: 'https://greenspoon.co.ke/wp-content/uploads/2022/06/Greenspoon-Kenya-Jack-Daniels-Whiskey.jpg',
      description: 'Tennessee whiskey with smooth vanilla and caramel notes'
    },
    {
      id: '3',
      name: 'Jameson Irish Whiskey',
      category: 'whisky',
      price: 3200,
      image: 'https://greenspoon.co.ke/wp-content/uploads/2022/09/Greenspoon-Jameson-Irish-Whiskey.jpg',
      description: 'Triple distilled Irish whiskey, smooth and approachable'
    },
    {
      id: '4',
      name: 'Macallan 12 Year Old',
      category: 'whisky',
      price: 8500,
      image: 'https://villagemarketcellar.co.ke/cdn/shop/products/macallan-12-year-old-double-cask-p258-6268_image.jpg?v=1633093049',
      description: 'Single malt Scotch whisky, aged in sherry oak casks'
    },
    {
      id: '5',
      name: 'Chivas Regal 12',
      category: 'whisky',
      price: 4200,
      image: 'https://greenspoon.co.ke/wp-content/uploads/2022/09/Greenspoon-Chivas-Regal-12-Year.jpg',
      description: 'Blended Scotch whisky with honey and vanilla flavors'
    },

    // WINE
    {
      id: '6',
      name: 'Nederburg Cabernet Sauvignon',
      category: 'wine',
      price: 2100,
      image: 'https://res.cloudinary.com/dyc0ieeyu/image/upload/c_fit,f_auto/v1/products/nederburg-cabernet-sauvignon.jpg',
      description: 'South African red wine with bold berry flavors'
    },
    {
      id: '7',
      name: 'Drostdy-Hof Sauvignon Blanc',
      category: 'wine',
      price: 1800,
      image: 'https://www.oaks.delivery/wp-content/uploads/Copy-of-Copy-of-Social-Media-Product-Ad-800-x-800-px-93.png',
      description: 'Crisp white wine with tropical fruit aromas'
    },
    {
      id: '8',
      name: 'Boschendal Brut',
      category: 'wine',
      price: 2800,
      image: 'https://shop.boschendal.com/cdn/shop/files/BEV0000212_2728927d-234c-4d49-b8fc-a9a7a5d05b2f.jpg?v=1685541372',
      description: 'Elegant sparkling wine with fine bubbles'
    },
    {
      id: '9',
      name: 'Amarula Cream Liqueur',
      category: 'wine',
      price: 2200,
      image: 'https://greenspoon.co.ke/wp-content/uploads/2022/07/Greenspoon-Kenya-Amarula.jpg',
      description: 'Creamy liqueur made from African marula fruit'
    },
    {
      id: '10',
      name: 'Stellenbosch Merlot',
      category: 'wine',
      price: 1900,
      image: 'https://farmersbar.com.my/cdn/shop/products/IMG_8256_467x700.jpg?v=1679022076',
      description: 'Medium-bodied red wine with plum and cherry notes'
    },

    // BEER
    {
      id: '11',
      name: 'Tusker Lager',
      category: 'beer',
      price: 180,
      image: 'https://villagemarketcellar.co.ke/cdn/shop/products/TUSKERLAGERBOTTLE500ML.png?v=1627644842',
      description: 'Kenya\'s finest lager beer - "Bia yangu, Nchi yangu"'
    },
    {
      id: '12',
      name: 'White Cap Lager',
      category: 'beer',
      price: 170,
      image: 'https://greenspoon.co.ke/wp-content/uploads/2023/02/Greenspoon-Kenya-White-Cap-Can.jpg',
      description: 'Premium Kenyan lager named after Mount Kenya'
    },
    {
      id: '13',
      name: 'Tusker Malt',
      category: 'beer',
      price: 200,
      image: 'https://greenspoon.co.ke/wp-content/uploads/2023/02/Greenspoon-Kenya-Tusker-Malt-Can.jpg',
      description: 'Premium malt lager with rich, smooth flavor'
    },
    {
      id: '14',
      name: 'Pilsner Lager',
      category: 'beer',
      price: 160,
      image: 'https://www.havenwines.co.ke/wp-content/uploads/2021/08/Pilsner-Lager-Beer-500ml.jpg',
      description: 'Classic Kenyan pilsner with crisp, clean taste'
    },
    {
      id: '15',
      name: 'Heineken',
      category: 'beer',
      price: 220,
      image: 'https://jayswines.com/wp-content/uploads/2022/08/Heineken-Zero-330ml.png',
      description: 'International premium lager beer'
    },
    {
      id: '16',
      name: 'Tusker Ndimu',
      category: 'beer',
      price: 190,
      image: 'https://greenspoon.co.ke/wp-content/uploads/2023/12/greenspoon-Tusker-Ndimu-5425.jpg',
      description: 'Refreshing lemon-flavored beer with citrus burst'
    },

    // VODKA
    {
      id: '17',
      name: 'Smirnoff Red Label',
      category: 'vodka',
      price: 1400,
      image: 'https://jayswines.com/wp-content/uploads/2015/04/smirnoff-350ml.jpg',
      description: 'World\'s most popular vodka, triple distilled'
    },
    {
      id: '18',
      name: 'Absolut Vodka',
      category: 'vodka',
      price: 2100,
      image: 'https://res.cloudinary.com/dyc0ieeyu/image/upload/c_fit,f_auto,h_700,w_700/v1/products/absolut-raspberri.jpg',
      description: 'Premium Swedish vodka with clean, crisp taste'
    },
    {
      id: '19',
      name: 'Ciroc Premium Vodka',
      category: 'vodka',
      price: 4800,
      image: 'https://www.oaks.delivery/wp-content/uploads/ciroc-pineapple.jpg',
      description: 'Ultra-premium vodka made from French grapes'
    },
    {
      id: '20',
      name: 'Grey Goose Vodka',
      category: 'vodka',
      price: 5200,
      image: 'https://soys.co.ke/PImages/PFHPF-0.jpg',
      description: 'French premium vodka with exceptional smoothness'
    },
    {
      id: '21',
      name: 'Belvedere Vodka',
      category: 'vodka',
      price: 4500,
      image: 'https://www.oaks.delivery/wp-content/uploads/Copy-of-Copy-of-Social-Media-Product-Ad-800-x-800-px-62-1.png',
      description: 'Polish luxury vodka with pure, clean character'
    },

    // GIN
    {
      id: '22',
      name: 'Tanqueray London Dry Gin',
      category: 'gin',
      price: 2800,
      image: 'https://res.cloudinary.com/dyc0ieeyu/image/upload/c_fit,f_auto,h_700,w_700/v1/products/mjumzgiueaxkl7wifhnp.png',
      description: 'Classic London Dry Gin with juniper and citrus'
    },
    {
      id: '23',
      name: 'Bombay Sapphire',
      category: 'gin',
      price: 3200,
      image: 'https://jayswines.com/wp-content/uploads/2015/04/Bombay-Sapphire-750ml.jpeg',
      description: 'Premium gin with 10 botanicals for complex flavor'
    },
    {
      id: '24',
      name: 'Hendricks Gin',
      category: 'gin',
      price: 4100,
      image: 'https://greenspoon.co.ke/wp-content/uploads/2022/06/Greenspoon-hendricks-gin-2-of-1.jpg',
      description: 'Unique gin infused with cucumber and rose petals'
    },
    {
      id: '25',
      name: 'Gordon\'s London Dry Gin',
      category: 'gin',
      price: 1800,
      image: 'https://greenspoon.co.ke/wp-content/uploads/2022/07/Greenspoon-Kenya-Gordons-London-Dry-Gin.jpg',
      description: 'Triple-distilled gin with distinctive juniper taste'
    },
    {
      id: '26',
      name: 'Beefeater London Dry Gin',
      category: 'gin',
      price: 2200,
      image: 'https://greenspoon.co.ke/wp-content/uploads/2022/09/Greenspoon-Beefeater-London-Dry-Gin.jpg',
      description: 'Traditional London Dry Gin with bold juniper flavor'
    },

    // RUM
    {
      id: '27',
      name: 'Captain Morgan Spiced Rum',
      category: 'rum',
      price: 2100,
      image: 'https://greenspoon.co.ke/wp-content/uploads/2022/06/GREENSPOON-Captain-morgan-spiced-gold-1-of-1.jpg',
      description: 'Golden spiced rum with vanilla and caramel notes'
    },
    {
      id: '28',
      name: 'Bacardi Superior White Rum',
      category: 'rum',
      price: 1800,
      image: 'https://aem.lcbo.com/content/dam/lcbo/products/0/0/0/5/000596.jpg.thumb.1280.1280.jpg',
      description: 'Light, crisp white rum perfect for cocktails'
    },
    {
      id: '29',
      name: 'Havana Club 3 Year',
      category: 'rum',
      price: 2400,
      image: 'https://shreeramkenya.com/wp-content/uploads/2021/10/IMG_8467-scaled.jpg',
      description: 'Cuban rum aged for 3 years with smooth character'
    },
    {
      id: '30',
      name: 'Malibu Coconut Rum',
      category: 'rum',
      price: 1900,
      image: 'https://www.montyskenya.com/wp-content/uploads/2020/05/Malibu-coconut.jpg',
      description: 'Caribbean rum with natural coconut flavor'
    },
    {
      id: '31',
      name: 'Appleton Estate Signature Blend',
      category: 'rum',
      price: 2600,
      image: 'https://content.thirtyonewhiskey.com/wp-content/uploads/2022/04/03095307/PXL_20220403_134709219.PORTRAIT-880x660.jpg',
      description: 'Premium Jamaican rum with rich, complex flavor'
    },
    {
      id: '32',
      name: 'Lamb\'s Navy Rum',
      category: 'rum',
      price: 2000,
      image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=300&h=300&fit=crop',
      description: 'Dark navy rum with bold, full-bodied taste'
    }
  ];

  // Cart functions
  const addToCart = (productId: string) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      delete newCart[productId];
      return newCart;
    });
  };

  const updateCartQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => ({
      ...prev,
      [productId]: newQuantity
    }));
  };

  const getTotalCartItems = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0);
  };

  // Add formatted prices to products
  const productsWithFormattedPrices = products.map(product => ({
    ...product,
    formattedPrice: formatKES(product.price)
  }));

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar cartItemCount={getTotalCartItems()} />
        <main className="flex-1">
          <Layout>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/shop" element={<Shop products={productsWithFormattedPrices} addToCart={addToCart} />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cart" element={
                 
                <Cart 
                  cart={cart} 
                  products={productsWithFormattedPrices} 
                  updateQuantity={updateCartQuantity} 
                  removeFromCart={removeFromCart} 
                  updateSize={() => {}} 
                />
              } />
              <Route path="/debug-styles" element={<DebugStyles />} />
              <Route path="/tailwind-test" element={<TailwindTest />} />
            </Routes>
          </Layout>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;

