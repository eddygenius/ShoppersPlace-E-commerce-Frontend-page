import React, { useState } from 'react';
import { ShoppingCart, Heart, Star, Search, Menu, User, Package, TrendingUp, Filter, X, ChevronDown, Zap, Shield, Truck, Home, ShoppingBag, User as UserIcon, Settings } from 'lucide-react';

export default function EcommerceStore() {
  const [activeTab, setActiveTab] = useState('home');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  // Render different content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'products':
        return <ProductsPage cart={cart} setCart={setCart} wishlist={wishlist} setWishlist={setWishlist} />;
      case 'account':
        return <AccountPage />;
      case 'orders':
        return <OrdersPage />;
      default:
        return <HomePage cart={cart} setCart={setCart} wishlist={wishlist} setWishlist={setWishlist} />;
    }
  };

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        setShowCart={setShowCart}
      />

      {/* Main Content */}
      <main>
        {renderContent()}
      </main>

      {/* Shopping Cart Sidebar */}
      <CartSidebar 
        showCart={showCart}
        setShowCart={setShowCart}
        cart={cart}
        setCart={setCart}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}

// Header Component
function Header({ activeTab, setActiveTab, cartCount, wishlistCount, setShowCart }) {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All Products', 'Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books'];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex items-center justify-between py-3 border-b border-gray-100">
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <span className="flex items-center gap-2">
              <Truck size={16} />
              Free shipping on orders over $50
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <button className="text-gray-600 hover:text-gray-800">Track Order</button>
            <button className="text-gray-600 hover:text-gray-800">Help</button>
          </div>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ShoppersPlace
            </h1>
            <nav className="hidden md:flex items-center gap-6">
              <button
                onClick={() => setActiveTab('home')}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  activeTab === 'home' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Home size={16} />
                Home
              </button>
              <button
                onClick={() => setActiveTab('products')}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  activeTab === 'products' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <ShoppingBag size={16} />
                Products
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  activeTab === 'orders' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Package size={16} />
                Orders
              </button>
              <button
                onClick={() => setActiveTab('account')}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  activeTab === 'account' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <UserIcon size={16} />
                Account
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>

            <button className="p-2 hover:bg-gray-100 rounded-lg relative">
              <Heart size={22} className="text-gray-700" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <User size={22} className="text-gray-700" />
            </button>

            <button 
              onClick={() => setShowCart(true)}
              className="p-2 hover:bg-gray-100 rounded-lg relative"
            >
              <ShoppingCart size={22} className="text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

// Home Page Component
function HomePage({ cart, setCart, wishlist, setWishlist }) {
  const featuredProducts = [
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      price: 199.99,
      originalPrice: 299.99,
      category: 'Electronics',
      rating: 4.8,
      reviews: 234,
      image: '🎧',
      badge: 'Bestseller',
      description: 'High-quality audio with noise cancellation'
    },
    {
      id: 2,
      name: 'Smart Fitness Watch',
      price: 149.99,
      originalPrice: null,
      category: 'Electronics',
      rating: 4.6,
      reviews: 189,
      image: '⌚',
      badge: 'New',
      description: 'Track your health and fitness goals'
    },
    {
      id: 3,
      name: 'Running Shoes Elite',
      price: 129.99,
      originalPrice: null,
      category: 'Sports',
      rating: 4.8,
      reviews: 267,
      image: '👟',
      badge: 'Bestseller',
      description: 'Maximum comfort and performance'
    },
  ];

  return (
    <>
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-5xl font-bold mb-4">Summer Sale</h2>
              <p className="text-xl mb-6 text-blue-100">Up to 50% off on selected items</p>
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Shop Now
              </button>
            </div>
           <div className="text-center">
  <div className="text-center">
  <img 
    src="/images/shopping-bag.png" 
    alt="Summer Sale" 
    className="w-400 h-400 object-contain mx-auto"
  />
  </div>
</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Truck className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Free Shipping</h3>
                <p className="text-sm text-gray-600">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="text-green-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Secure Payment</h3>
                <p className="text-sm text-gray-600">100% protected</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Zap className="text-purple-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Fast Delivery</h3>
                <p className="text-sm text-gray-600">2-3 business days</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured Products</h2>
            <p className="text-gray-600">Discover our most popular items</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard 
                key={product.id}
                product={product}
                cart={cart}
                setCart={setCart}
                wishlist={wishlist}
                setWishlist={setWishlist}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// Products Page Component
function ProductsPage({ cart, setCart, wishlist, setWishlist }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All Products', 'Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books'];

  const products = [
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      price: 199.99,
      originalPrice: 299.99,
      category: 'Electronics',
      rating: 4.8,
      reviews: 234,
      image: '🎧',
      badge: 'Bestseller',
      description: 'High-quality audio with noise cancellation'
    },
    {
      id: 2,
      name: 'Smart Fitness Watch',
      price: 149.99,
      originalPrice: null,
      category: 'Electronics',
      rating: 4.6,
      reviews: 189,
      image: '⌚',
      badge: 'New',
      description: 'Track your health and fitness goals'
    },
    {
      id: 3,
      name: 'Classic Denim Jacket',
      price: 79.99,
      originalPrice: 120.00,
      category: 'Clothing',
      rating: 4.7,
      reviews: 156,
      image: '🧥',
      badge: 'Sale',
      description: 'Timeless style for any occasion'
    },
    {
      id: 4,
      name: 'Yoga Mat Pro',
      price: 39.99,
      originalPrice: null,
      category: 'Sports',
      rating: 4.9,
      reviews: 312,
      image: '🧘',
      badge: 'Popular',
      description: 'Non-slip, eco-friendly material'
    },
    {
      id: 5,
      name: 'Coffee Maker Deluxe',
      price: 89.99,
      originalPrice: 129.99,
      category: 'Home & Garden',
      rating: 4.5,
      reviews: 98,
      image: '☕',
      badge: 'Sale',
      description: 'Brew perfect coffee every time'
    },
    {
      id: 6,
      name: 'Running Shoes Elite',
      price: 129.99,
      originalPrice: null,
      category: 'Sports',
      rating: 4.8,
      reviews: 267,
      image: '👟',
      badge: 'Bestseller',
      description: 'Maximum comfort and performance'
    },
    {
      id: 7,
      name: 'Wireless Keyboard',
      price: 59.99,
      originalPrice: 79.99,
      category: 'Electronics',
      rating: 4.6,
      reviews: 145,
      image: '⌨️',
      badge: null,
      description: 'Ergonomic design, silent keys'
    },
    {
      id: 8,
      name: 'Design Thinking Book',
      price: 24.99,
      originalPrice: null,
      category: 'Books',
      rating: 4.9,
      reviews: 423,
      image: '📚',
      badge: 'Popular',
      description: 'Master creative problem solving'
    },
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            {selectedCategory === 'all' ? 'All Products' : selectedCategory}
          </h2>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Filter size={18} />
            <span>Filter</span>
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category === 'All Products' ? 'all' : category)}
              className={`whitespace-nowrap px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === (category === 'All Products' ? 'all' : category)
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id}
              product={product}
              cart={cart}
              setCart={setCart}
              wishlist={wishlist}
              setWishlist={setWishlist}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Product Card Component
function ProductCard({ product, cart, setCart, wishlist, setWishlist }) {
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow group">
      <div className="relative p-8 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-7xl text-center mb-4">{product.image}</div>
        {product.badge && (
          <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${
            product.badge === 'Sale' ? 'bg-red-100 text-red-700' :
            product.badge === 'New' ? 'bg-green-100 text-green-700' :
            product.badge === 'Bestseller' ? 'bg-blue-100 text-blue-700' :
            'bg-purple-100 text-purple-700'
          }`}>
            {product.badge}
          </span>
        )}
        <button
          onClick={() => toggleWishlist(product.id)}
          className="absolute top-3 right-3 p-2 bg-white rounded-full hover:bg-gray-50 transition-colors"
        >
          <Heart 
            size={18} 
            className={wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}
          />
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-3">{product.description}</p>
        
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-700">{product.rating}</span>
          </div>
          <span className="text-sm text-gray-500">({product.reviews})</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-gray-800">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through ml-2">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={() => addToCart(product)}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

// Account Page Component
function AccountPage() {
  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">My Account</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <UserIcon className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">John Doe</h3>
                  <p className="text-sm text-gray-600">john.doe@example.com</p>
                </div>
              </div>
              
              <nav className="space-y-2">
                <button className="w-full text-left px-4 py-3 rounded-lg bg-blue-50 text-blue-600 font-medium">
                  Profile Information
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50">
                  Order History
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50">
                  Address Book
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50">
                  Payment Methods
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50">
                  Security
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Profile Information</h3>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input 
                      type="text" 
                      defaultValue="John"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input 
                      type="text" 
                      defaultValue="Doe"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    defaultValue="john.doe@example.com"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    defaultValue="+1 (555) 123-4567"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Orders Page Component
function OrdersPage() {
  const orders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'Delivered',
      total: 199.99,
      items: [
        { name: 'Premium Wireless Headphones', quantity: 1, price: 199.99 }
      ]
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'Processing',
      total: 149.99,
      items: [
        { name: 'Smart Fitness Watch', quantity: 1, price: 149.99 }
      ]
    },
    {
      id: 'ORD-003',
      date: '2024-01-05',
      status: 'Shipped',
      total: 129.99,
      items: [
        { name: 'Running Shoes Elite', quantity: 1, price: 129.99 }
      ]
    }
  ];

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">My Orders</h2>
        
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Order ID</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Date</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Total</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-medium text-gray-800">{order.id}</td>
                    <td className="py-4 px-6 text-gray-700">{order.date}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'Processing' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-semibold text-gray-800">${order.total}</td>
                    <td className="py-4 px-6">
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

// Cart Sidebar Component
function CartSidebar({ showCart, setShowCart, cart, setCart }) {
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, change) => {
    setCart(cart.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  if (!showCart) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowCart(false)} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Shopping Cart</h2>
          <button onClick={() => setShowCart(false)} className="p-2 hover:bg-gray-100 rounded-lg">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-600">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-4xl">{item.image}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">{item.name}</h3>
                    <p className="text-lg font-bold text-blue-600">${item.price}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
                      >
                        -
                      </button>
                      <span className="font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-auto text-red-600 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-gray-200 bg-white">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-gray-800">Total:</span>
              <span className="text-2xl font-bold text-gray-800">${cartTotal.toFixed(2)}</span>
            </div>
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">ShopHub</h3>
            <p className="text-gray-400">Your one-stop shop for everything you need.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">All Products</a></li>
              <li><a href="#" className="hover:text-white">New Arrivals</a></li>
              <li><a href="#" className="hover:text-white">Best Sellers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">Track Order</a></li>
              <li><a href="#" className="hover:text-white">Returns</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 ShopHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}