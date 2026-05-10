import React, { useState, useEffect,useMemo } from 'react';
import { Menu, X, ShoppingBag, Heart, Search, ChevronDown, Star, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa'

// ============================================================================
// PREMIUM DUMMY PRODUCTS DATA
// ============================================================================
const initialProducts = [
  // Earrings
  {
    id: 1,
    name: 'Pearl Essence Studs',
    price: 899,
    category: 'Earrings',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop',
    description: 'Elegant pearl studs with gold accents, perfect for daily elegance',
    featured: true,
    rating: 4.9
  },
  {
    id: 2,
    name: 'Gold Hoop Elegance',
    price: 1299,
    category: 'Earrings',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop',
    description: 'Classic gold hoops with modern sophistication',
    featured: true,
    rating: 4.8
  },
  {
    id: 3,
    name: 'Moonstone Drops',
    price: 1499,
    category: 'Earrings',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop',
    description: 'Luminous moonstone with lightweight design',
    featured: false,
    rating: 4.9
  },
  {
    id: 4,
    name: 'Pearl Essence Studs',
    price: 899,
    category: 'Earrings',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop',
    description: 'Elegant pearl studs with gold accents, perfect for daily elegance',
    featured: true,
    rating: 4.9
  },
  {
    id: 5,
    name: 'Gold Hoop Elegance',
    price: 1299,
    category: 'Earrings',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop',
    description: 'Classic gold hoops with modern sophistication',
    featured: true,
    rating: 4.8
  },
  {
    id: 6,
    name: 'Moonstone Drops',
    price: 1499,
    category: 'Earrings',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop',
    description: 'Luminous moonstone with lightweight design',
    featured: false,
    rating: 4.9
  },
  {
    id: 7,
    name: 'Pearl Essence Studs',
    price: 899,
    category: 'Earrings',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop',
    description: 'Elegant pearl studs with gold accents, perfect for daily elegance',
    featured: true,
    rating: 4.9
  },
  {
    id: 8,
    name: 'Gold Hoop Elegance',
    price: 1299,
    category: 'Earrings',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop',
    description: 'Classic gold hoops with modern sophistication',
    featured: true,
    rating: 4.8
  },
  {
    id: 9,
    name: 'Moonstone Drops',
    price: 1499,
    category: 'Earrings',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop',
    description: 'Luminous moonstone with lightweight design',
    featured: false,
    rating: 4.9
  },
  
  // Necklaces
  {
    id: 10,
    name: 'Bridal Gold Choker',
    price: 2499,
    category: 'Necklaces',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop',
    description: 'Exquisite bridal necklace with delicate craftsmanship',
    featured: true,
    rating: 5.0
  },
  {
    id: 11,
    name: 'Bridal Gold Choker',
    price: 2499,
    category: 'Necklaces',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop',
    description: 'Exquisite bridal necklace with delicate craftsmanship',
    featured: true,
    rating: 5.0
  },
  {
    id: 12,
    name: 'Minimalist Gold Chain',
    price: 1599,
    category: 'Necklaces',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop',
    description: 'Simple elegant chain for everyday luxury',
    featured: false,
    rating: 4.7
  },
  {
    id: 13,
    name: 'Pendant Masterpiece',
    price: 1899,
    category: 'Necklaces',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop',
    description: 'Statement pendant with semi-precious stones',
    featured: true,
    rating: 4.8
  },
  { 
    id:14,
    name: 'Minimalist Gold Chain',
    price: 1599,
    category: 'Necklaces',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop',
    description: 'Simple elegant chain for everyday luxury',
    featured: false,
    rating: 4.7
  },
  {
    id: 15,
    name: 'Pendant Masterpiece',
    price: 1899,
    category: 'Necklaces',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop',
    description: 'Statement pendant with semi-precious stones',
    featured: true,
    rating: 4.8
  },
  {
    id: 16,
    name: 'Bridal Gold Choker',
    price: 2499,
    category: 'Necklaces',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop',
    description: 'Exquisite bridal necklace with delicate craftsmanship',
    featured: true,
    rating: 5.0
  },
  {
    id: 17,
    name: 'Minimalist Gold Chain',
    price: 1599,
    category: 'Necklaces',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop',
    description: 'Simple elegant chain for everyday luxury',
    featured: false,
    rating: 4.7
  },
  {
    id: 18,
    name: 'Pendant Masterpiece',
    price: 1899,
    category: 'Necklaces',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop',
    description: 'Statement pendant with semi-precious stones',
    featured: true,
    rating: 4.8
  },
  {
    id: 19,
    name: 'Bridal Gold Choker',
    price: 2499,
    category: 'Necklaces',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop',
    description: 'Exquisite bridal necklace with delicate craftsmanship',
    featured: true,
    rating: 5.0
  },
  {
    id: 20,
    name: 'Minimalist Gold Chain',
    price: 1599,
    category: 'Necklaces',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop',
    description: 'Simple elegant chain for everyday luxury',
    featured: false,
    rating: 4.7
  },
  {
    id: 21,
    name: 'Pendant Masterpiece',
    price: 1899,
    category: 'Necklaces',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop',
    description: 'Statement pendant with semi-precious stones',
    featured: true,
    rating: 4.8
  },
  
  // Bridal Collection
  {
    id: 22,
    name: 'Bridal Jewelry Set',
    price: 4999,
    category: 'Bridal Collection',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&h=500&fit=crop',
    description: 'Complete bridal set with necklace, earrings, and bracelet',
    featured: true,
    rating: 5.0
  },
  {
    id: 23,
    name: 'Wedding Day Elegance',
    price: 5999,
    category: 'Bridal Collection',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&h=500&fit=crop',
    description: 'Luxurious bridal collection with diamond touches',
    featured: true,
    rating: 5.0
  },
  
  // Daily Wear
  {
    id: 24,
    name: 'Golden Hour Bracelet',
    price: 1199,
    category: 'Daily Wear',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop',
    description: 'Lightweight bracelet for everyday elegance',
    featured: false,
    rating: 4.6
  },
  {
    id: 25,
    name: 'Stack Ring Set',
    price: 799,
    category: 'Daily Wear',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop',
    description: 'Versatile ring set perfect for layering',
    featured: false,
    rating: 4.7
  },
  
  // Traditional
  {
    id: 26,
    name: 'Temple Jewelry Choker',
    price: 2199,
    category: 'Traditional',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop',
    description: 'Traditional temple-inspired design with modern elegance',
    featured: true,
    rating: 4.9
  },
  {
    id: 27,
    name: 'Antique Gold Necklace',
    price: 1799,
    category: 'Traditional',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop',
    description: 'Classic traditional necklace with timeless appeal',
    featured: false,
    rating: 4.8
  },
  
  // Premium Collection
  {
    id: 28,
    name: 'Diamond Infinity Necklace',
    price: 7999,
    category: 'Premium Collection',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop',
    description: 'Exquisite diamond necklace, the pinnacle of luxury',
    featured: true,
    rating: 5.0
  },
  {
    id: 29,
    name: 'Crown Jewel Set',
    price: 8999,
    category: 'Premium Collection',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop',
    description: 'Ultimate luxury collection, crafted for royalty',
    featured: true,
    rating: 5.0
  },
  {
    id: 30,
    name: 'Stack Ring Set',
    price: 799,
    category: 'professional look',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop',
    description: 'Versatile ring set perfect for layering',
    featured: false,
    rating: 4.7
  },{
    id: 31,
    name: 'Stack Ring Set',
    price: 799,
    category: 'professional look',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop',
    description: 'Versatile ring set perfect for layering',
    featured: false,
    rating: 4.7
  },
];

// ============================================================================
// MAIN APP COMPONENT
// ============================================================================
export default function App() {
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('lightweightCart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: 'Earrings',
    description: '',
    image: ''
  });

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('lightweightCart', JSON.stringify(cart));
  }, [cart]);

  // Get unique categories
  const categories = useMemo(
    () => ['All', ...new Set(products.map(p => p.category))],
    [products]
  );

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Add to cart
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    setSelectedProduct(null);
  };

  // Remove from cart
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  // Update quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  // Calculate total
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // WhatsApp integration
  const handleWhatsAppOrder = () => {
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
  };

  // Admin functions
  const handleAdminLogin = (password) => {
    if (password === 'lightweight2024') {
      setIsAdminMode(true);
      setAdminPassword('');
      setCurrentPage('admin');
    } else {
      alert('Invalid password');
    }
  };

  const handleAddProduct = () => {
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
    setProducts([...products, product]);
    setNewProduct({ name: '', price: '', category: 'Earrings', description: '', image: '' });
    alert('Product added successfully!');
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  // ============================================================================
  // RENDER SECTIONS
  // ============================================================================

  // Hero Section
  const HeroSection = React.memo(({ setCurrentPage }) => {
  return (
    <div className="relative h-screen bg-black overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900 to-black"></div>

      {/* Animated Glow */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-yellow-400/20 to-transparent rounded-full blur-3xl"
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Content */}
      <div className="relative h-full flex items-center justify-center px-4">
        <motion.div
          className="text-center z-10"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo */}
          <motion.div
            className="mb-8 flex justify-center"
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="w-12 h-12 text-yellow-400" />
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="text-7xl md:text-8xl font-thin text-white mb-6 tracking-tight"
            style={{ fontFamily: 'Georgia, serif' }}
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Light Weight
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-yellow-300 mb-8 tracking-widest uppercase font-light"
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Luxury Jewellery Reimagined
          </motion.p>

          {/* Description */}
          <motion.p
            className="text-gray-300 text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Crafted elegance that transcends weight.
            Discover our curated collection of premium lightweight jewellery designed for the modern woman.
          </motion.p>

          {/* Button */}
          <motion.button
            onClick={() => {
              setCurrentPage('shop');
              window.scrollTo({
                top: 0,
                behavior: 'smooth'
              });
            }}
            className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold rounded-full hover:shadow-2xl hover:shadow-yellow-400/50 transition-all duration-300 group flex items-center justify-center mx-auto gap-3"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Collection

            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-1 h-8 border border-yellow-400 rounded-full mx-auto flex items-center justify-center">
            <div className="w-0.5 h-2 bg-yellow-400 rounded-full"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
});

  // Shop Section
  const ShopSection = () => (
    <div className="min-h-screen bg-gradient-to-b from-black to-slate-900 py-20 px-4">
      {/* Header */}
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

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Search */}
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
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-yellow-400/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50 transition-all"
            />
          </motion.div>

          {/* Category Filter */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-yellow-400/20 rounded-lg text-white focus:outline-none focus:border-yellow-400/50 transition-all appearance-none cursor-pointer"
            >
              {categories.map(cat => (
                <option key={cat} value={cat} className="text-black">{cat}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-4 w-5 h-5 text-gray-400 pointer-events-none" />
          </motion.div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-3 overflow-x-auto pb-4">
          {categories.map((cat, idx) => (
            <motion.button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
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

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto">
        {filteredProducts.length > 0 ? (
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
            {filteredProducts.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                onQuickView={setSelectedProduct}
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

  // Product Card Component
  const ProductCard = React.memo(
  ({ product, onAddToCart, onQuickView }) => {
    return (
      <motion.div
        className="group cursor-pointer"
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Card */}
        <motion.div
          className="relative h-80 overflow-hidden rounded-lg bg-gradient-to-br from-yellow-400/10 to-transparent border border-yellow-400/20 backdrop-blur-sm"
          whileHover={{
            borderColor: 'rgba(250, 204, 21, 0.4)',
          }}
        >
          {/* Product Image */}
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.4 }}
            onError={(e) => {
              e.target.src =
                'https://via.placeholder.com/500x500?text=Jewellery';
            }}
          />

          {/* Featured Badge */}
          {product.featured && (
            <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-400/90 text-black rounded-full text-xs font-semibold">
              Featured
            </div>
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 flex items-end justify-between p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex gap-3 w-full">
              
              {/* Quick View */}
              <motion.button
                onClick={() => onQuickView(product)}
                className="flex-1 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-lg hover:bg-white/30 transition-all text-sm font-medium"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Quick View
              </motion.button>

              {/* Add To Cart */}
              <motion.button
                onClick={() => onAddToCart(product)}
                className="flex-1 px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-all text-sm font-semibold"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Add to Cart
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Product Info */}
        <div className="pt-4">
          {/* Category */}
          <p className="text-xs text-yellow-400 font-semibold uppercase tracking-widest mb-1">
            {product.category}
          </p>

          {/* Name */}
          <h3 className="text-lg font-medium text-white mb-2 group-hover:text-yellow-300 transition-colors duration-300">
            {product.name}
          </h3>

          {/* Price + Rating */}
          <div className="flex items-center justify-between">
            <p className="text-2xl font-light text-yellow-400">
              ₹{product.price}
            </p>

            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-3 h-3"
                  fill={
                    i < Math.floor(product.rating)
                      ? '#facc15'
                      : '#404040'
                  }
                  color={
                    i < Math.floor(product.rating)
                      ? '#facc15'
                      : '#404040'
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
);
  // Quick View Modal
  const QuickViewModal = React.memo(({ product, onClose, onAddToCart }) => {
  if (!product) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-gradient-to-br from-slate-900 to-black border border-yellow-400/20 rounded-2xl overflow-hidden max-w-2xl w-full flex flex-col md:flex-row"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image */}
          <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden bg-black/40">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Content */}
          <div className="md:w-1/2 p-8 flex flex-col justify-between">
            <div>
              <p className="text-xs text-yellow-400 uppercase tracking-widest font-semibold mb-3">
                {product.category}
              </p>

              <h2 className="text-3xl font-light text-white mb-2">
                {product.name}
              </h2>

              <p className="text-gray-400 mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4"
                      fill={
                        i < Math.floor(product.rating)
                          ? "#facc15"
                          : "#404040"
                      }
                      color={
                        i < Math.floor(product.rating)
                          ? "#facc15"
                          : "#404040"
                      }
                    />
                  ))}
                </div>

                <span className="text-yellow-400 font-medium">
                  {product.rating}
                </span>
              </div>

              {/* Price */}
              <p className="text-4xl font-light text-yellow-400 mb-8">
                ₹{product.price}
              </p>
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-yellow-400/50 transition-all duration-300"
              >
                Add to Cart
              </button>

              <button
                onClick={onClose}
                className="w-full px-6 py-3 bg-white/10 border border-yellow-400/30 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300"
              >
                Continue Shopping
              </button>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-all z-10"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
});
  // Cart Drawer
  const CartDrawer = React.memo(({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="fixed right-0 top-0 h-screen w-full max-w-md bg-gradient-to-b from-slate-900 to-black border-l border-yellow-400/20 z-50 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-yellow-400/10">
              <h2 className="text-2xl font-light text-white">
                Your Cart
              </h2>

              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-all duration-300"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length > 0 ? (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="pb-6 border-b border-yellow-400/10"
                  >
                    {/* Image */}
                    <div className="h-32 overflow-hidden rounded-lg mb-4 bg-black/40">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    {/* Details */}
                    <h3 className="text-white font-medium mb-2">
                      {item.name}
                    </h3>

                    <p className="text-yellow-400 text-sm mb-3">
                      ₹{item.price}
                    </p>

                    {/* Quantity */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="px-3 py-1 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-all duration-300"
                      >
                        −
                      </button>

                      <span className="text-white font-medium w-8 text-center">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-3 py-1 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-all duration-300"
                      >
                        +
                      </button>

                      <div className="flex-1" />

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-400 hover:text-red-300 transition-colors duration-300"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-gray-600 mb-4" />

                  <p className="text-gray-400">
                    Your cart is empty
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-yellow-400/10 p-6 space-y-4">
                {/* Total */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-gray-400 text-lg">
                    Subtotal:
                  </span>

                  <span className="text-2xl font-light text-yellow-400">
                    ₹{cartTotal}
                  </span>
                </div>

                {/* WhatsApp */}
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487" />
                  </svg>

                  Order via WhatsApp
                </button>

                {/* Continue */}
                <button
                  onClick={onClose}
                  className="w-full px-6 py-3 bg-white/10 border border-yellow-400/30 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});
  // About Section
  const AboutSection = () => (
  <section className="relative overflow-hidden bg-black py-20 md:py-28 px-4">
    
    {/* Background Effects */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.08),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.03),transparent_30%)]"></div>

    <motion.div
      className="absolute top-20 right-0 w-80 h-80 bg-yellow-400/10 blur-3xl rounded-full"
      animate={{
        x: [0, 40, 0],
        y: [0, -20, 0],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
      }}
    />

    <div className="relative max-w-6xl mx-auto z-10">

      {/* Heading */}
      <motion.div
        className="mb-16 text-center md:text-left"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <p className="text-yellow-400 uppercase tracking-[0.4em] text-sm mb-4 font-medium">
          About Us
        </p>

        <h2
          className="text-5xl md:text-7xl font-thin text-white tracking-tight leading-tight"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Our Story
        </h2>

        <div className="mt-6 w-28 h-[2px] bg-gradient-to-r from-yellow-400 via-yellow-300 to-transparent"></div>
      </motion.div>

      {/* Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left Text */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
        >
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            Light Weight Jewellery was born from a vision to redefine luxury with comfort.
            Every piece is carefully crafted to deliver timeless elegance without the burden
            of heavy traditional jewelry.
          </p>

          <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
            We blend artisan craftsmanship with modern sophistication, creating jewelry that
            feels effortless yet luxurious — designed for women who embrace confidence,
            beauty, and individuality.
          </p>

          <p className="text-lg md:text-xl text-gray-500 leading-relaxed">
            More than accessories, our collections are expressions of personality and grace.
            Each creation tells a story meant to be cherished for generations.
          </p>
        </motion.div>

        {/* Right Visual Card */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="relative overflow-hidden rounded-3xl border border-yellow-400/20 bg-white/5 backdrop-blur-xl p-10">

            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-transparent"></div>

            <div className="relative z-10">

              <h3 className="text-3xl font-light text-white mb-6">
                Crafted for Modern Elegance
              </h3>

              <div className="space-y-5">

                {[
                  "Ultra-light premium designs",
                  "Handcrafted artisan quality",
                  "Elegant everyday luxury",
                  "Comfort-focused jewelry experience",
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.15 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.8)]"></div>

                    <p className="text-gray-300 text-lg">
                      {item}
                    </p>
                  </motion.div>
                ))}

              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 mt-10">

                <motion.div
                  className="rounded-2xl border border-yellow-400/10 bg-black/30 p-6 text-center"
                  whileHover={{ y: -4 }}
                >
                  <h4 className="text-4xl font-thin text-yellow-400 mb-2">5K+</h4>
                  <p className="text-gray-400 text-sm tracking-wide uppercase">
                    Happy Customers
                  </p>
                </motion.div>

                <motion.div
                  className="rounded-2xl border border-yellow-400/10 bg-black/30 p-6 text-center"
                  whileHover={{ y: -4 }}
                >
                  <h4 className="text-4xl font-thin text-yellow-400 mb-2">100%</h4>
                  <p className="text-gray-400 text-sm tracking-wide uppercase">
                    Premium Finish
                  </p>
                </motion.div>

              </div>

            </div>
          </div>
        </motion.div>

      </div>

      {/* Features */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {[
          {
            title: "Lightweight Luxury",
            desc: "Elegant premium jewelry designed for effortless all-day comfort.",
          },
          {
            title: "Artisan Crafted",
            desc: "Every detail perfected by experienced jewelry artisans.",
          },
          {
            title: "Timeless Quality",
            desc: "Modern sophistication with enduring craftsmanship.",
          },
        ].map((feature, idx) => (
          <motion.div
            key={idx}
            className="group relative overflow-hidden rounded-3xl border border-yellow-400/10 bg-white/[0.03] p-8 backdrop-blur-md hover:border-yellow-400/30 transition-all duration-500"
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{
              y: -8,
            }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-yellow-400/10 to-transparent"></div>

            <div className="relative z-10">
              <h3 className="text-2xl font-light text-yellow-400 mb-4">
                {feature.title}
              </h3>

              <p className="text-gray-400 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

    </div>
  </section>
);

  // Admin Panel
  const AdminPanel = React.memo(() => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-slate-900 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-light text-white mb-2">
            Admin Panel
          </h1>

          <div className="w-20 h-1 bg-gradient-to-r from-yellow-400 to-transparent"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Add Product */}
          <div className="bg-gradient-to-br from-slate-800 to-black border border-yellow-400/20 rounded-xl p-8">
            
            <h2 className="text-2xl font-light text-white mb-6">
              Add New Product
            </h2>

            <div className="space-y-4">

              <input
                type="text"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 bg-white/10 border border-yellow-400/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50"
              />

              <input
                type="number"
                placeholder="Price (₹)"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct((prev) => ({
                    ...prev,
                    price: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 bg-white/10 border border-yellow-400/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50"
              />

              <select
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 bg-white/10 border border-yellow-400/20 rounded-lg text-white focus:outline-none focus:border-yellow-400/50 appearance-none cursor-pointer"
              >
                {categories
                  .filter((c) => c !== "All")
                  .map((cat) => (
                    <option
                      key={cat}
                      value={cat}
                      className="text-black"
                    >
                      {cat}
                    </option>
                  ))}
              </select>

              <input
                type="text"
                placeholder="Description"
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 bg-white/10 border border-yellow-400/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50"
              />

              <input
                type="text"
                placeholder="Image URL"
                value={newProduct.image}
                onChange={(e) =>
                  setNewProduct((prev) => ({
                    ...prev,
                    image: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 bg-white/10 border border-yellow-400/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50"
              />

              <button
                onClick={handleAddProduct}
                className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-yellow-400/50 transition-all duration-300"
              >
                Add Product
              </button>
            </div>
          </div>

          {/* Product List */}
          <div className="bg-gradient-to-br from-slate-800 to-black border border-yellow-400/20 rounded-xl p-8">
            
            <h2 className="text-2xl font-light text-white mb-6">
              Products ({products.length})
            </h2>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              
              {products
                .slice()
                .reverse()
                .map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-yellow-400/10 hover:border-yellow-400/30 transition-all duration-300"
                  >
                    <div className="flex-1">
                      <p className="text-white font-medium text-sm">
                        {product.name}
                      </p>

                      <p className="text-yellow-400 text-xs">
                        ₹{product.price} • {product.category}
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        handleDeleteProduct(product.id)
                      }
                      className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all duration-300 text-xs font-medium"
                    >
                      Delete
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Logout */}
        <div className="mt-8">
          <button
            onClick={() => {
              setIsAdminMode(false);
              setCurrentPage("home");
            }}
            className="px-6 py-3 bg-white/10 border border-yellow-400/30 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300"
          >
            Logout from Admin
          </button>
        </div>
      </div>
    </div>
  );
});
  // Admin Login Modal
  const AdminLoginModal = () => (
  <AnimatePresence>
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={() => {
          setAdminPassword("");
          setCurrentPage("home");
        }}
      />

      {/* Animated Glow */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-yellow-400/10 blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
      />

      {/* Modal */}
      <motion.div
        className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-yellow-400/20 bg-gradient-to-br from-[#0f172a]/95 via-black to-[#111827]/95 shadow-[0_0_50px_rgba(250,204,21,0.08)] backdrop-blur-2xl"
        initial={{ scale: 0.85, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{
          type: "spring",
          damping: 18,
          stiffness: 120,
        }}
      >
        {/* Top Glow */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>

        {/* Content */}
        <div className="relative p-8 md:p-10">

          {/* Icon */}
          <motion.div
            className="mb-6 flex justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-yellow-400/20 bg-yellow-400/10 backdrop-blur-xl shadow-[0_0_40px_rgba(250,204,21,0.15)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-yellow-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.7}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 11c1.657 0 3-1.567 3-3.5S13.657 4 12 4s-3 1.567-3 3.5S10.343 11 12 11zm0 2c-2.761 0-5 2.015-5 4.5V19h10v-1.5c0-2.485-2.239-4.5-5-4.5z"
                />
              </svg>
            </div>
          </motion.div>

          {/* Title */}
          <motion.div
            className="mb-8 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <h2
              className="text-3xl md:text-4xl font-thin text-white tracking-tight"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Admin Access
            </h2>

            <p className="mt-3 text-sm text-gray-400 tracking-wide">
              Secure dashboard authentication
            </p>
          </motion.div>

          {/* Input */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="mb-2 block text-sm uppercase tracking-[0.25em] text-yellow-400">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter admin password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && handleAdminLogin(adminPassword)
              }
              className="w-full rounded-2xl border border-yellow-400/20 bg-white/5 px-5 py-4 text-white placeholder-gray-500 outline-none backdrop-blur-xl transition-all duration-300 focus:border-yellow-400/60 focus:bg-white/[0.08] focus:shadow-[0_0_20px_rgba(250,204,21,0.12)]"
              autoFocus
            />
          </motion.div>

          {/* Buttons */}
          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            {/* Cancel */}
            <motion.button
              onClick={() => {
                setAdminPassword("");
                setCurrentPage("home");
              }}
              className="flex-1 rounded-2xl border border-yellow-400/20 bg-white/5 px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-white/10 hover:border-yellow-400/40"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Cancel
            </motion.button>

            {/* Access */}
            <motion.button
              onClick={() => handleAdminLogin(adminPassword)}
              className="flex-1 rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 px-5 py-3 text-sm font-semibold text-black shadow-[0_0_25px_rgba(250,204,21,0.25)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(250,204,21,0.45)]"
              whileHover={{
                scale: 1.03,
                y: -1,
              }}
              whileTap={{ scale: 0.97 }}
            >
              Access
            </motion.button>
          </motion.div>

          {/* Bottom Text */}
          <motion.p
            className="mt-6 text-center text-xs text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
          >
            Authorized personnel only
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  </AnimatePresence>
);
  // ============================================================================
  // MAIN RENDER
  // ============================================================================

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
          {/* Logo */}
          <motion.button
            onClick={() => {
              setCurrentPage('home');
              window.scrollTo(0, 0);
            }}
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="w-6 h-6 text-yellow-400" />
            <span className="text-xl font-light text-white tracking-widest" style={{ fontFamily: 'Georgia, serif' }}>
              Light Weight
            </span>
          </motion.button>

          {/* Menu - Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <motion.button
              onClick={() => setCurrentPage('home')}
              className={`font-medium transition-colors ${
                currentPage === 'home'
                  ? 'text-yellow-400'
                  : 'text-gray-300 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
            >
              Home
            </motion.button>

            <motion.button
              onClick={() => setCurrentPage('shop')}
              className={`font-medium transition-colors ${
                currentPage === 'shop'
                  ? 'text-yellow-400'
                  : 'text-gray-300 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
            >
              Shop
            </motion.button>

            <motion.button
              onClick={() => setCurrentPage('about')}
              className={`font-medium transition-colors ${
                currentPage === 'about'
                  ? 'text-yellow-400'
                  : 'text-gray-300 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
            >
              About
            </motion.button>

            {/* Admin Button */}
            <motion.button
              onClick={() => setCurrentPage('admin')}
              className="font-medium text-gray-300 hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              Admin
            </motion.button>
          </div>
          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Cart */}
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
                  transition={{ type: 'spring', stiffness: 200 }}
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
              <motion.button
                onClick={() => {
                  setCurrentPage('home');
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded-lg transition-all ${currentPage === 'home' ? 'bg-yellow-400 text-black' : 'text-gray-300 hover:bg-white/10'}`}
              >
                Home
              </motion.button>
              <motion.button
                onClick={() => {
                  setCurrentPage('shop');
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded-lg transition-all ${currentPage === 'shop' ? 'bg-yellow-400 text-black' : 'text-gray-300 hover:bg-white/10'}`}
              >
                Shop
              </motion.button>
              <motion.button
                onClick={() => {
                  setCurrentPage('about');
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded-lg transition-all ${currentPage === 'about' ? 'bg-yellow-400 text-black' : 'text-gray-300 hover:bg-white/10'}`}
              >
                About
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Main Content */}
      <div className="pt-16">
        {currentPage === 'home' && <HeroSection />}
        {currentPage === 'shop' && <ShopSection />}
        {currentPage === 'about' && <AboutSection />}
        {isAdminMode && currentPage === 'admin' && <AdminPanel />}
      </div>

      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://wa.me/919677690323"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl z-50 border border-white/20"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
        whileHover={{
          scale: 1.1,
          boxShadow: '0 0 25px rgba(37, 211, 102, 0.7)',
        }}
        whileTap={{ scale: 0.9 }}
      >
        <FaWhatsapp className="text-white text-4xl" />
      </motion.a>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Quick View Modal */}
      <QuickViewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAddToCart={addToCart} />

      {/* Admin Login Modal - Hidden route */}
      {currentPage === 'admin' && !isAdminMode && <AdminLoginModal />}
    </div>
  );
}