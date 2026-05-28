import { useEffect, useState } from 'react';
import { ArrowRight, Sparkles, Truck, ShieldCheck, HeadphonesIcon, RotateCcw, Monitor, Shirt, Home as HomeIcon, Dumbbell, BookOpen, Gamepad2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ProductCard, ProductSkeleton } from '../components/ProductCard';
import { getDynamicRecommendations } from '../utils/ai';
import { useAppContext } from '../context/AppContext';
import { api } from '../services/api';

const CATEGORIES = [
  { name: 'Electronics', icon: Monitor, color: 'from-blue-500 to-cyan-400' },
  { name: 'Apparel', icon: Shirt, color: 'from-pink-500 to-rose-400' },
  { name: 'Home', icon: HomeIcon, color: 'from-amber-500 to-orange-400' },
  { name: 'Sports', icon: Dumbbell, color: 'from-emerald-500 to-green-400' },
  { name: 'Books', icon: BookOpen, color: 'from-purple-500 to-violet-400' },
  { name: 'Gaming', icon: Gamepad2, color: 'from-red-500 to-pink-400' },
];

const TRUST_BADGES = [
  { icon: Truck, title: 'Free Shipping', desc: 'On orders over ₹499', color: 'text-blue-500', bg: 'bg-blue-50' },
  { icon: HeadphonesIcon, title: '24/7 Support', desc: 'Round the clock help', color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { icon: ShieldCheck, title: 'Secure Payment', desc: '256-bit SSL encryption', color: 'text-purple-500', bg: 'bg-purple-50' },
  { icon: RotateCcw, title: 'Easy Returns', desc: '30-day return policy', color: 'text-amber-500', bg: 'bg-amber-50' },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const stagger = {
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

export const Home = () => {
  const { state } = useAppContext();
  const [recommendations, setRecommendations] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const allProducts = await api.getProducts();
        // Shuffle and take 4
        const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
        setTrending(shuffled.slice(0, 4));
        
        // Dynamic Recommendations based on user actions
        const recs = await getDynamicRecommendations(state.userActions, state.cart);
        setRecommendations(recs);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [state.userActions, state.cart]);

  return (
    <div className="w-full">
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative px-6 py-24 lg:py-36 overflow-hidden bg-white">
        {/* Animated background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-orb" />
          <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-gradient-to-br from-purple-400/15 to-pink-400/15 rounded-full blur-3xl animate-orb-reverse" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-float-slow" />
        </div>

        {/* Dot grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }} />

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 text-accent font-semibold text-sm mb-8 border border-blue-100/80 shadow-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Shopping Experience</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-5xl sm:text-6xl lg:text-8xl font-extrabold tracking-tight text-primary mb-8 leading-[0.95]"
          >
            Future of Commerce
            <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-purple-500 to-pink-500 animated-gradient">
              {' '}is Intelligent.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg lg:text-xl text-gray-500 max-w-2xl mb-12 leading-relaxed"
          >
            Discover products curated specifically for you. Our AI analyzes your preferences to recommend exactly what you need.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/shop"
              className="bg-primary hover:bg-gray-800 text-white px-10 py-5 rounded-full font-bold text-lg transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 group hover:-translate-y-0.5"
            >
              Shop Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#categories"
              className="bg-white hover:bg-gray-50 text-primary px-10 py-5 rounded-full font-bold text-lg transition-all border-2 border-gray-200 hover:border-gray-300 flex items-center justify-center gap-2 hover:-translate-y-0.5"
            >
              Explore Categories
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-8 sm:gap-16 mt-16 pt-8 border-t border-gray-100"
          >
            {[
              { value: '10K+', label: 'Products' },
              { value: '50K+', label: 'Happy Customers' },
              { value: '4.9', label: 'App Rating' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-primary">{stat.value}</div>
                <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== CATEGORIES ==================== */}
      <section id="categories" className="py-20 px-6 bg-white border-t border-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeInUp}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary mb-3">Shop by Category</h2>
            <p className="text-gray-500 max-w-lg mx-auto">Browse our curated collections across all your favorite categories</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5"
          >
            {CATEGORIES.map((cat, i) => (
              <motion.div key={cat.name} variants={fadeInUp} custom={i}>
                <Link
                  to="/shop"
                  className="group flex flex-col items-center gap-4 p-6 bg-gray-50 hover:bg-white rounded-2xl border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <cat.icon className="w-7 h-7" />
                  </div>
                  <span className="font-semibold text-sm text-gray-700 group-hover:text-primary transition-colors">{cat.name}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== AI RECOMMENDATIONS ==================== */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeInUp}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-50 text-purple-600 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" /> AI Powered
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary">
              Curated For You
            </h2>
            <p className="text-gray-500 mt-2">Personalized picks based on your activity</p>
          </div>
          <Link to="/shop" className="text-accent font-semibold hover:underline hidden sm:flex items-center gap-1 group">
            View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
          {loading 
            ? Array(4).fill(0).map((_, i) => <ProductSkeleton key={i} />)
            : recommendations.length > 0 
              ? recommendations.map(product => <ProductCard key={product.id} product={product} />)
              : trending.map(product => <ProductCard key={product.id} product={product} />)
          }
        </div>
      </section>

      {/* ==================== TRUST BADGES ==================== */}
      <section className="py-20 px-6 bg-white border-t border-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {TRUST_BADGES.map((badge, i) => (
              <motion.div
                key={badge.title}
                variants={fadeInUp}
                custom={i}
                className="flex items-center gap-4 p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className={`w-14 h-14 shrink-0 rounded-2xl ${badge.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <badge.icon className={`w-7 h-7 ${badge.color}`} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{badge.title}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">{badge.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== RECENTLY VIEWED ==================== */}
      {state.recentlyViewed.length > 0 && (
        <section className="py-16 px-6 max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-2xl font-bold mb-8 text-primary">Recently Viewed</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 stagger-children">
              {state.recentlyViewed.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* ==================== NEWSLETTER CTA ==================== */}
      <section className="py-20 px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeInUp}
          className="max-w-4xl mx-auto relative overflow-hidden rounded-3xl"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
          <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-purple-500/10 to-pink-500/20 animated-gradient" />

          {/* Decorative orbs */}
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl" />

          <div className="relative z-10 py-16 px-8 sm:px-16 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur text-white/90 text-sm font-medium mb-6 border border-white/10">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              Join 50,000+ smart shoppers
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Stay Ahead of the Curve
            </h2>
            <p className="text-gray-300 max-w-xl mx-auto mb-8 leading-relaxed">
              Get exclusive deals, early access to new arrivals, and AI-powered product recommendations delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white/10 backdrop-blur border border-white/20 rounded-full py-3.5 px-6 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent transition-all"
              />
              <button className="bg-white hover:bg-gray-100 text-primary font-bold px-8 py-3.5 rounded-full transition-all hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2">
                Subscribe <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};