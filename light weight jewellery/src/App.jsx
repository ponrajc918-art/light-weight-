import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  Menu,
  X,
  ShoppingBag,
  Search,
  ChevronDown,
  Star,
  Sparkles,
  ArrowRight,
  Settings,
  MessageCircle
} from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp } from "react-icons/fa";

const STORAGE_KEYS = {
  PRODUCTS: 'lightweightProducts',
  CART: 'lightweightCart'
};

const initialProducts = [
  { id: 1, name: 'Pearl Essence Studs', price: 899, category: 'Earrings', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop', description: 'Elegant pearl studs with gold accents, perfect for daily elegance', featured: true, rating: 4.9 },
  { id: 2, name: 'Gold Hoop Elegance', price: 1299, category: 'Earrings', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop', description: 'Classic gold hoops with modern sophistication', featured: true, rating: 4.8 },
  { id: 3, name: 'Moonstone Drops', price: 1499, category: 'Earrings', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop', description: 'Luminous moonstone with lightweight design', featured: false, rating: 4.9 },
  { id: 4, name: 'Bridal Gold Choker', price: 2499, category: 'Necklaces', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop', description: 'Exquisite bridal necklace with delicate craftsmanship', featured: true, rating: 5.0 },
  { id: 5, name: 'Minimalist Gold Chain', price: 1599, category: 'Necklaces', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop', description: 'Simple elegant chain for everyday luxury', featured: false, rating: 4.7 },
  { id: 6, name: 'Pendant Masterpiece', price: 1899, category: 'Necklaces', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop', description: 'Statement pendant with semi-precious stones', featured: true, rating: 4.8 },
  { id: 7, name: 'Bridal Jewelry Set', price: 4999, category: 'Bridal Collection', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&h=500&fit=crop', description: 'Complete bridal set with necklace, earrings, and bracelet', featured: true, rating: 5.0 },
  { id: 8, name: 'Wedding Day Elegance', price: 5999, category: 'Bridal Collection', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&h=500&fit=crop', description: 'Luxurious bridal collection with diamond touches', featured: true, rating: 5.0 },
  { id: 9, name: 'Golden Hour Bracelet', price: 1199, category: 'Daily Wear', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop', description: 'Lightweight bracelet for everyday elegance', featured: false, rating: 4.6 },
  { id: 10, name: 'Stack Ring Set', price: 799, category: 'Daily Wear', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop', description: 'Versatile ring set perfect for layering', featured: false, rating: 4.7 },
  { id: 11, name: 'Temple Jewelry Choker', price: 2199, category: 'Traditional', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop', description: 'Traditional temple-inspired design with modern elegance', featured: true, rating: 4.9 },
  { id: 12, name: 'Antique Gold Necklace', price: 1799, category: 'Traditional', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop', description: 'Classic traditional necklace with timeless appeal', featured: false, rating: 4.8 },
  { id: 13, name: 'Diamond Infinity Necklace', price: 7999, category: 'Premium Collection', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop', description: 'Exquisite diamond necklace, the pinnacle of luxury', featured: true, rating: 5.0 },
  { id: 14, name: 'Crown Jewel Set', price: 8999, category: 'Premium Collection', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop', description: 'Ultimate luxury collection, crafted for royalty', featured: true, rating: 5.0 }
];

export default function App() {
  const [products, setProducts] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return stored ? JSON.parse(stored) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CART);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: 'Earrings', description: '', image: '' });

  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (mountedRef.current) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    }
  }, [products]);

  useEffect(() => {
    if (mountedRef.current) {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    }
  }, [cart]);

  const categories = useMemo(() => ['All', ...new Set(products.map(p => p.category))], [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0), [cart]);

  const addToCart = useCallback((product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    setSelectedProduct(null);
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  }, [removeFromCart]);

  const handleWhatsAppOrder = useCallback(() => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    const cartMessage = cart
      .map(item => `${item.name} × ${item.quantity} — ₹${item.price}`)
      .join('\n');

    const message = encodeURIComponent(
      `Hi, I would like to order these jewellery products:\n\n${cartMessage}\n\nTotal: ₹${cartTotal}\n\nPlease share availability and delivery details.`
    );

    window.open(`https://wa.me/919677690323?text=${message}`, '_blank');
  }, [cart, cartTotal]);

  const handleAdminLogin = useCallback((password) => {
    if (password === 'lightweight2024') {
      setIsAdminMode(true);
      setAdminPassword('');
      setShowAdminLogin(false);
      setCurrentPage('admin');
    } else {
      alert('Invalid password');
      setAdminPassword('');
    }
  }, []);

  const handleAddProduct = useCallback(() => {
    if (!newProduct.name || !newProduct.price) {
      alert('Please fill all required fields');
      return;
    }

    const product = {
      id: Math.max(...products.map(p => p.id), 0) + 1,
      ...newProduct,
      price: parseFloat(newProduct.price),
      featured: false,
      rating: 4.8
    };

    setProducts(prevProducts => [...prevProducts, product]);
    setNewProduct({ name: '', price: '', category: 'Earrings', description: '', image: '' });
    alert('Product added successfully!');
  }, [products, newProduct]);

  const handleDeleteProduct = useCallback((id) => {
    setProducts(prevProducts => prevProducts.filter(p => p.id !== id));
  }, []);

  const handleLogout = useCallback(() => {
    setIsAdminMode(false);
    setCurrentPage('home');
  }, []);

  const handleNavigate = useCallback((page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }, []);

  const handleSettingsClick = useCallback(() => {
    setShowAdminLogin(true);
  }, []);

  return (
    <div className="bg-black overflow-hidden">
      {/* Navigation Bar */}
      <motion.nav
        className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-40 border-b border-yellow-400/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <motion.button
            onClick={() => handleNavigate('home')}
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="w-6 h-6 text-yellow-400" />
            <span className="text-xl font-light text-white tracking-widest" style={{ fontFamily: 'Georgia, serif' }}>
              Light Weight
            </span>
          </motion.button>

          <div className="hidden md:flex items-center gap-8">
            {['home', 'shop', 'about'].map(page => (
              <motion.button
                key={page}
                onClick={() => handleNavigate(page)}
                className={`font-medium transition-colors capitalize ${currentPage === page ? 'text-yellow-400' : 'text-gray-300 hover:text-white'}`}
                whileHover={{ scale: 1.05 }}
              >
                {page}
              </motion.button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* Settings Button */}
            <motion.button
              onClick={handleSettingsClick}
              className="relative p-2 hover:bg-white/10 rounded-lg transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Admin Panel"
            >
              <Settings className="w-6 h-6 text-white" />
            </motion.button>

            {/* Cart Button */}
            <motion.button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative p-2 hover:bg-white/10 rounded-lg transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ShoppingBag className="w-6 h-6 text-white" />
              {cart.length > 0 && (
                <motion.span
                  className="absolute top-1 right-1 w-5 h-5 bg-yellow-400 text-black text-xs font-bold rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={`cart-${cart.length}`}
                >
                  {cart.length}
                </motion.span>
              )}
            </motion.button>

            {/* Menu Toggle - Mobile */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-black/95 border-t border-yellow-400/10 px-4 py-4 space-y-3"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              {['home', 'shop', 'about'].map(page => (
                <motion.button
                  key={page}
                  onClick={() => handleNavigate(page)}
                  className={`block w-full text-left px-4 py-2 rounded-lg transition-all capitalize ${currentPage === page ? 'bg-yellow-400 text-black' : 'text-gray-300 hover:bg-white/10'}`}
                >
                  {page}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Main Content */}
      <div className="pt-16">
        {currentPage === 'home' && <HeroSection onNavigate={handleNavigate} />}
        {currentPage === 'shop' && (
          <ShopSection
            products={filteredProducts}
            categories={categories}
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
            onCategoryChange={setSelectedCategory}
            onSearchChange={setSearchQuery}
            onAddToCart={addToCart}
            onQuickView={setSelectedProduct}
          />
        )}
        {currentPage === 'about' && <AboutSection />}
        {isAdminMode && currentPage === 'admin' && (
          <AdminPanel
            products={products}
            newProduct={newProduct}
            onNewProductChange={setNewProduct}
            onAddProduct={handleAddProduct}
            onDeleteProduct={handleDeleteProduct}
            onLogout={handleLogout}
          />
        )}
      </div>

      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://wa.me/919677690323"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-green-500/50 z-30"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaWhatsapp className="w-7 h-7 text-white" />
      </motion.a>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        cart={cart}
        cartTotal={cartTotal}
        onClose={() => setIsCartOpen(false)}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onWhatsAppOrder={handleWhatsAppOrder}
      />

      {/* Quick View Modal */}
      <QuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={showAdminLogin}
        password={adminPassword}
        onPasswordChange={setAdminPassword}
        onLogin={handleAdminLogin}
        onCancel={() => {
          setShowAdminLogin(false);
          setAdminPassword('');
        }}
      />
    </div>
  );
}

const HeroSection = ({ onNavigate }) => (
  <div className="relative h-screen bg-black overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900 to-black"></div>

    <motion.div
      className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-yellow-400/20 to-transparent rounded-full blur-3xl"
      animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
      transition={{ duration: 8, repeat: Infinity }}
    ></motion.div>

    <div className="relative h-full flex items-center justify-center px-4">
      <motion.div
        className="text-center z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.div className="mb-8 flex justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <Sparkles className="w-12 h-12 text-yellow-400" />
        </motion.div>

        <motion.h1
          className="text-7xl md:text-8xl font-thin text-white mb-6 tracking-tight"
          style={{ fontFamily: 'Georgia, serif' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Light Weight
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-yellow-300 mb-8 tracking-widest uppercase font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Luxury Jewellery Reimagined
        </motion.p>

        <motion.p
          className="text-gray-300 text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Crafted elegance that transcends weight. Discover our curated collection of premium lightweight jewellery designed for the modern woman.
        </motion.p>

        <motion.button
          onClick={() => onNavigate('shop')}
          className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold rounded-full hover:shadow-2xl hover:shadow-yellow-400/50 transition-all duration-300 group flex items-center justify-center mx-auto gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Explore Collection
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-1 h-8 border border-yellow-400 rounded-full mx-auto flex items-center justify-center">
          <div className="w-0.5 h-2 bg-yellow-400 rounded-full"></div>
        </div>
      </motion.div>
    </div>
  </div>
);

const ShopSection = ({ products, categories, selectedCategory, searchQuery, onCategoryChange, onSearchChange, onAddToCart, onQuickView }) => (
  <div className="min-h-screen bg-gradient-to-b from-black to-slate-900 py-20 px-4">
    <motion.div
      className="max-w-7xl mx-auto mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className="text-5xl md:text-6xl font-thin text-white mb-4 tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
        Our Collection
      </h2>
      <div className="w-20 h-1 bg-gradient-to-r from-yellow-400 to-transparent"></div>
    </motion.div>

    <div className="max-w-7xl mx-auto mb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <motion.div
          className="md:col-span-2 relative"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search jewellery..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/10 border border-yellow-400/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50 transition-all"
          />
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-yellow-400/20 rounded-lg text-white focus:outline-none focus:border-yellow-400/50 transition-all appearance-none cursor-pointer"
          >
            {categories.map(cat => (
              <option key={cat} value={cat} className="text-black">{cat}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-4 w-5 h-5 text-gray-400 pointer-events-none" />
        </motion.div>
      </div>

      <div className="flex flex-wrap gap-3 overflow-x-auto pb-4">
        {categories.map((cat, idx) => (
          <motion.button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`px-6 py-2 rounded-full whitespace-nowrap font-medium transition-all ${
              selectedCategory === cat
                ? 'bg-yellow-400 text-black'
                : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-yellow-400/20'
            }`}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
          >
            {cat}
          </motion.button>
        ))}
      </div>
    </div>

    <div className="max-w-7xl mx-auto">
      {products.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
            hidden: {}
          }}
        >
          {products.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
              index={idx}
            />
          ))}
        </motion.div>
      ) : (
        <motion.div
          className="text-center py-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-xl">No products found. Try adjusting your filters.</p>
        </motion.div>
      )}
    </div>
  </div>
);

const ProductCard = ({ product, onAddToCart, onQuickView, index }) => (
  <motion.div
    className="group cursor-pointer"
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    }}
  >
    <motion.div
      className="relative h-80 overflow-hidden rounded-lg bg-gradient-to-br from-yellow-400/10 to-transparent border border-yellow-400/20 backdrop-blur-sm"
      whileHover={{ borderColor: 'rgba(250, 204, 21, 0.4)' }}
    >
      <motion.img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.6 }}
      />

      {product.featured && (
        <motion.div
          className="absolute top-4 right-4 px-3 py-1 bg-yellow-400/90 text-black rounded-full text-xs font-semibold"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Featured
        </motion.div>
      )}

      <motion.div
        className="absolute inset-0 bg-black/40 flex items-end justify-between p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <div className="flex gap-3 w-full">
          <motion.button
            onClick={() => onQuickView(product)}
            className="flex-1 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-lg hover:bg-white/30 transition-all text-sm font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Quick View
          </motion.button>
          <motion.button
            onClick={() => onAddToCart(product)}
            className="flex-1 px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-all text-sm font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add to Cart
          </motion.button>
        </div>
      </motion.div>
    </motion.div>

    <motion.div
      className="pt-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.5 }}
      viewport={{ once: true }}
    >
      <p className="text-xs text-yellow-400 font-semibold uppercase tracking-widest mb-1">
        {product.category}
      </p>
      <h3 className="text-lg font-medium text-white mb-2 group-hover:text-yellow-300 transition-colors">
        {product.name}
      </h3>
      <div className="flex items-center justify-between">
        <p className="text-2xl font-light text-yellow-400">₹{product.price}</p>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="w-3 h-3"
              fill={i < Math.floor(product.rating) ? '#facc15' : '#404040'}
              color={i < Math.floor(product.rating) ? '#facc15' : '#404040'}
            />
          ))}
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const QuickViewModal = ({ product, onClose, onAddToCart }) => (
  <AnimatePresence>
    {product && (
      <motion.div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-gradient-to-br from-slate-900 to-black border border-yellow-400/20 rounded-2xl overflow-hidden max-w-2xl w-full flex flex-col md:flex-row"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden bg-black/40">
            <motion.img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
            />
          </div>

          <div className="md:w-1/2 p-8 flex flex-col justify-between">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-xs text-yellow-400 uppercase tracking-widest font-semibold mb-3">
                {product.category}
              </p>
              <h2 className="text-3xl font-light text-white mb-2">{product.name}</h2>
              <p className="text-gray-400 mb-6 leading-relaxed">{product.description}</p>

              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4"
                      fill={i < Math.floor(product.rating) ? '#facc15' : '#404040'}
                      color={i < Math.floor(product.rating) ? '#facc15' : '#404040'}
                    />
                  ))}
                </div>
                <span className="text-yellow-400 font-medium">{product.rating}</span>
              </div>

              <p className="text-4xl font-light text-yellow-400 mb-8">₹{product.price}</p>
            </motion.div>

            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <button
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-yellow-400/50 transition-all"
              >
                Add to Cart
              </button>
              <button
                onClick={onClose}
                className="w-full px-6 py-3 bg-white/10 border border-yellow-400/30 text-white font-semibold rounded-lg hover:bg-white/20 transition-all"
              >
                Continue Shopping
              </button>
            </motion.div>
          </div>

          <motion.button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-all z-10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-6 h-6 text-white" />
          </motion.button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const CartDrawer = ({ isOpen, cart, cartTotal, onClose, onRemove, onUpdateQuantity, onWhatsAppOrder }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        ></motion.div>

        <motion.div
          className="fixed right-0 top-0 h-screen w-full max-w-md bg-gradient-to-b from-slate-900 to-black border-l border-yellow-400/20 z-50 flex flex-col"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25 }}
        >
          <div className="flex items-center justify-between p-6 border-b border-yellow-400/10">
            <h2 className="text-2xl font-light text-white">Your Cart</h2>
            <motion.button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length > 0 ? (
              <>
                {cart.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    className="pb-6 border-b border-yellow-400/10"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <div className="h-32 overflow-hidden rounded-lg mb-4 bg-black/40">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>

                    <h3 className="text-white font-medium mb-2">{item.name}</h3>
                    <p className="text-yellow-400 text-sm mb-3">₹{item.price}</p>

                    <div className="flex items-center gap-3">
                      <motion.button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        −
                      </motion.button>
                      <span className="text-white font-medium w-8 text-center">{item.quantity}</span>
                      <motion.button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        +
                      </motion.button>
                      <div className="flex-1"></div>
                      <motion.button
                        onClick={() => onRemove(item.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <X className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </>
            ) : (
              <motion.div
                className="flex flex-col items-center justify-center h-full text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <ShoppingBag className="w-16 h-16 text-gray-600 mb-4" />
                <p className="text-gray-400">Your cart is empty</p>
              </motion.div>
            )}
          </div>

          {cart.length > 0 && (
            <motion.div
              className="border-t border-yellow-400/10 p-6 space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-gray-400 text-lg">Subtotal:</span>
                <span className="text-2xl font-light text-yellow-400">₹{cartTotal}</span>
              </div>

              <motion.button
                onClick={onWhatsAppOrder}
                className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-green-500/50 transition-all flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-3.055 2.364-3.905 6.75-1.896 10.217 1.51 2.755 4.392 4.751 7.612 4.751.842 0 1.707-.107 2.708-.32l.261.013c3.426 0 6.311-2.769 6.311-6.195 0-1.232-.279-2.4-.772-3.478A9.234 9.234 0 0012.04 3.5c-3.105 0-5.99 1.806-7.44 4.479" />
                </svg>
                Order via WhatsApp
              </motion.button>

              <motion.button
                onClick={onClose}
                className="w-full px-6 py-3 bg-white/10 border border-yellow-400/30 text-white font-semibold rounded-lg hover:bg-white/20 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Continue Shopping
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const AboutSection = () => (
  <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black py-20 px-4">
    <div className="max-w-5xl mx-auto">
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-5xl md:text-6xl font-thin text-white mb-4 tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
          Our Story
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-yellow-400 to-transparent"></div>
      </motion.div>

      <motion.div
        className="space-y-8 text-gray-300 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <p className="text-xl">
          Light Weight Jewellery was born from a simple vision: to create luxury pieces that celebrate modern elegance without the burden of weight. Each piece is meticulously crafted by artisans who understand the delicate balance between sophistication and comfort.
        </p>

        <p className="text-xl">
          We believe that luxury isn't about opulence alone—it's about the feeling you wear. Our jewelry transcends traditional boundaries, designed for the contemporary woman who values both style and substance.
        </p>

        <p className="text-xl">
          From our curated collections to our personalized service, every detail reflects our commitment to excellence. We don't just create jewelry; we create heirlooms that celebrate your unique story.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.2 } },
          hidden: {}
        }}
      >
        {[
          { title: 'Lightweight Design', desc: 'Premium pieces without the weight, perfect for all-day elegance' },
          { title: 'Artisan Crafted', desc: 'Handpicked by master craftspeople with decades of experience' },
          { title: 'Luxury Quality', desc: 'Premium materials and meticulous attention to every detail' }
        ].map((feature, idx) => (
          <motion.div
            key={idx}
            className="p-8 rounded-xl border border-yellow-400/20 bg-white/5 backdrop-blur-sm hover:border-yellow-400/40 transition-all"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ y: -5 }}
          >
            <h3 className="text-xl font-semibold text-yellow-400 mb-3">{feature.title}</h3>
            <p className="text-gray-400">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </div>
);

const AdminPanel = ({ products, newProduct, onNewProductChange, onAddProduct, onDeleteProduct, onLogout }) => (
  <div className="min-h-screen bg-gradient-to-b from-black to-slate-900 py-20 px-4">
    <div className="max-w-6xl mx-auto">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-light text-white mb-2">Admin Panel</h1>
        <div className="w-20 h-1 bg-gradient-to-r from-yellow-400 to-transparent"></div>
        <p className="text-gray-400 mt-4">Manage your jewelry inventory and add new products</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          className="bg-gradient-to-br from-slate-800 to-black border border-yellow-400/20 rounded-xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-2xl font-light text-white mb-6">Add New Product</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) => onNewProductChange({ ...newProduct, name: e.target.value })}
              className="w-full px-4 py-2 bg-white/10 border border-yellow-400/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50"
            />
            <input
              type="number"
              placeholder="Price (₹)"
              value={newProduct.price}
              onChange={(e) => onNewProductChange({ ...newProduct, price: e.target.value })}
              className="w-full px-4 py-2 bg-white/10 border border-yellow-400/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50"
            />
            <select
              value={newProduct.category}
              onChange={(e) => onNewProductChange({ ...newProduct, category: e.target.value })}
              className="w-full px-4 py-2 bg-white/10 border border-yellow-400/20 rounded-lg text-white focus:outline-none focus:border-yellow-400/50 appearance-none cursor-pointer"
            >
              {['Earrings', 'Necklaces', 'Bridal Collection', 'Daily Wear', 'Traditional', 'Premium Collection'].map(cat => (
                <option key={cat} value={cat} className="text-black">{cat}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) => onNewProductChange({ ...newProduct, description: e.target.value })}
              className="w-full px-4 py-2 bg-white/10 border border-yellow-400/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newProduct.image}
              onChange={(e) => onNewProductChange({ ...newProduct, image: e.target.value })}
              className="w-full px-4 py-2 bg-white/10 border border-yellow-400/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50"
            />
            <motion.button
              onClick={onAddProduct}
              className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-yellow-400/50 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Add Product
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-slate-800 to-black border border-yellow-400/20 rounded-xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-light text-white mb-6">Products ({products.length})</h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {products.map((product, idx) => (
              <motion.div
                key={product.id}
                className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-yellow-400/10 hover:border-yellow-400/30 transition-all"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <div className="flex-1">
                  <p className="text-white font-medium text-sm">{product.name}</p>
                  <p className="text-yellow-400 text-xs">₹{product.price} • {product.category}</p>
                </div>
                <motion.button
                  onClick={() => onDeleteProduct(product.id)}
                  className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all text-xs font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Delete
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        className="mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.button
          onClick={onLogout}
          className="px-6 py-3 bg-white/10 border border-yellow-400/30 text-white font-semibold rounded-lg hover:bg-white/20 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Logout from Admin
        </motion.button>
      </motion.div>
    </div>
  </div>
);

const AdminLoginModal = ({ isOpen, password, onPasswordChange, onLogin, onCancel }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onCancel}
      >
        <motion.div
          className="bg-gradient-to-br from-slate-900 to-black border border-yellow-400/20 rounded-xl p-8 max-w-sm w-full"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-light text-white mb-2">Admin Access</h2>
          <p className="text-gray-400 text-sm mb-6">Enter password to access admin panel</p>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onLogin(password)}
            className="w-full px-4 py-3 bg-white/10 border border-yellow-400/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50 mb-6"
            autoFocus
          />
          <div className="flex gap-3">
            <motion.button
              onClick={onCancel}
              className="flex-1 px-4 py-2 bg-white/10 border border-yellow-400/30 text-white rounded-lg hover:bg-white/20 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Cancel
            </motion.button>
            <motion.button
              onClick={() => onLogin(password)}
              className="flex-1 px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-all font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Access
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);
