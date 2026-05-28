import { Search, ShoppingCart, Heart, User, Menu, X, Sparkles } from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll for enhanced glass effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value });
      setIsSearchOpen(false);
      setIsMobileMenuOpen(false);
      navigate('/shop');
    }
  };

  const cartCount = state.cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinkClass = ({ isActive }) =>
    `relative font-medium transition-colors py-1 ${
      isActive
        ? 'text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-accent after:rounded-full'
        : 'text-gray-500 hover:text-primary'
    }`;

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 px-4 md:px-6 py-3.5 flex items-center justify-between border-b transition-all duration-300 ${
          isScrolled
            ? 'bg-white/85 backdrop-blur-xl border-gray-200/80 shadow-sm'
            : 'bg-white/60 backdrop-blur-md border-gray-100/60'
        }`}
      >
        <div className="flex items-center gap-4">
          <button 
            className="md:hidden text-gray-600 hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <Link to="/" className="flex items-center gap-2 text-xl md:text-2xl font-bold tracking-tighter text-primary group">
            <Sparkles className="w-5 h-5 text-accent group-hover:rotate-12 transition-transform duration-300" />
            NeuroCart
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          <NavLink to="/" className={navLinkClass} end>Home</NavLink>
          <NavLink to="/shop" className={navLinkClass}>Shop</NavLink>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Desktop Search */}
          <div className="hidden lg:flex max-w-xs relative mr-2">
            <Search className="absolute left-3.5 top-2.5 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search products..."
              className="w-full bg-gray-100/80 hover:bg-gray-100 border border-transparent focus:border-gray-200 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all"
              onKeyDown={handleSearch}
            />
          </div>

          <button 
            className="lg:hidden text-gray-500 hover:text-primary p-2 rounded-full hover:bg-gray-100 transition-all"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="w-5 h-5" />
          </button>
          
          <button 
            className="text-gray-500 hover:text-primary relative group p-2 rounded-full hover:bg-gray-100 transition-all"
            onClick={() => dispatch({ type: 'TOGGLE_WISHLIST_VIEW' })}
          >
            <Heart className="w-5 h-5 transition-transform group-hover:scale-110" />
            <AnimatePresence>
              {state.wishlist.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-0.5 -right-0.5 bg-pink-500 text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-sm"
                >
                  {state.wishlist.length}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          
          <button 
            className="text-gray-500 hover:text-primary relative group p-2 rounded-full hover:bg-gray-100 transition-all"
            onClick={() => dispatch({ type: 'TOGGLE_CART' })}
          >
            <ShoppingCart className="w-5 h-5 transition-transform group-hover:scale-110" />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-0.5 -right-0.5 bg-accent text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-sm"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {state.user ? (
            <div className="flex items-center gap-2 md:gap-3 bg-gray-50 border border-gray-100 py-1.5 pl-2.5 md:pl-3.5 pr-1.5 rounded-full hover:bg-gray-100 transition-colors cursor-pointer group relative">
               <div className="hidden sm:flex flex-col items-start leading-none">
                 <span className="text-[11px] font-bold text-gray-900 truncate max-w-[60px] md:max-w-[80px]">{state.user.name}</span>
                 <button 
                   onClick={() => dispatch({ type: 'LOGOUT' })}
                   className="text-[9px] text-accent font-bold hover:text-accent/80 transition-colors"
                 >
                   Logout
                 </button>
               </div>
               <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-purple-600 text-white flex items-center justify-center text-sm font-bold shadow-sm">
                 {state.user.name.charAt(0)}
               </div>
            </div>
          ) : (
            <Link to="/login" className="text-gray-500 hover:text-primary transition-colors flex items-center gap-2 group">
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-accent group-hover:to-purple-600 group-hover:text-white transition-all duration-300">
                <User className="w-4.5 h-4.5" />
              </div>
              <span className="font-semibold text-sm hidden sm:block">Login</span>
            </Link>
          )}
        </div>
      </nav>

      {/* Mobile Search Bar */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[65px] left-0 w-full z-40 bg-white/95 backdrop-blur-lg border-b border-gray-200 p-4 lg:hidden"
          >
            <div className="relative">
              <Search className="absolute left-3.5 top-2.5 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                autoFocus
                placeholder="Search products..."
                className="w-full bg-gray-50 border border-gray-200 rounded-full py-2.5 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-accent/50"
                onKeyDown={handleSearch}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[60] md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute top-0 left-0 w-3/4 max-w-sm h-full bg-white shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <span className="text-xl font-bold flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-accent" /> Menu
                </span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex-1 p-6 space-y-5">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-semibold hover:text-accent transition-colors">Home</Link>
                <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-semibold hover:text-accent transition-colors">Shop</Link>
                {state.user ? (
                  <div className="pt-6 border-t border-gray-100">
                    <p className="text-sm text-gray-500 mb-2">Account</p>
                    <p className="font-bold text-gray-900 mb-4">{state.user.name}</p>
                    <button 
                      onClick={() => {
                        dispatch({ type: 'LOGOUT' });
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-red-500 font-bold hover:text-red-600 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-semibold hover:text-accent transition-colors">Login / Register</Link>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};