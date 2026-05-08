import { Search, ShoppingCart, Heart, User, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useState } from 'react';

export const Navbar = () => {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value });
      setIsSearchOpen(false);
      setIsMobileMenuOpen(false);
      navigate('/shop');
    }
  };

  const cartCount = state.cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 glass px-4 md:px-6 py-4 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center gap-4">
          <button 
            className="md:hidden text-gray-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <Link to="/" className="text-xl md:text-2xl font-bold tracking-tighter text-primary">
            NeuroCart
          </Link>
        </div>
        
        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search for 'gaming mouse'..."
            className="w-full bg-white/50 border border-gray-200 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
            onKeyDown={handleSearch}
          />
        </div>

        <div className="flex items-center space-x-3 md:space-x-6">
          <button 
            className="md:hidden text-gray-600"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="w-6 h-6" />
          </button>
          
          <Link to="/shop" className="hidden sm:block text-gray-600 hover:text-primary font-medium transition-colors">Shop</Link>
          
          <button className="text-gray-600 hover:text-primary relative group">
            <Heart className="w-6 h-6 transition-transform group-hover:scale-110" />
            {state.wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {state.wishlist.length}
              </span>
            )}
          </button>
          
          <button 
            className="text-gray-600 hover:text-primary relative group"
            onClick={() => dispatch({ type: 'TOGGLE_CART' })}
          >
            <ShoppingCart className="w-6 h-6 transition-transform group-hover:scale-110" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {state.user ? (
            <div className="flex items-center gap-2 md:gap-3 bg-gray-50 border border-gray-100 py-1 pl-2 md:pl-3 pr-1 rounded-full hover:bg-gray-100 transition-colors cursor-pointer group relative">
               <div className="hidden xs:flex flex-col items-start leading-none">
                 <span className="text-[10px] md:text-[11px] font-bold text-gray-900 truncate max-w-[60px] md:max-w-[80px]">{state.user.name}</span>
                 <button 
                   onClick={() => dispatch({ type: 'LOGOUT' })}
                   className="text-[8px] md:text-[9px] text-accent font-bold hover:text-accent/80 transition-colors"
                 >
                   Logout
                 </button>
               </div>
               <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-accent text-white flex items-center justify-center text-xs md:text-sm font-bold shadow-sm">
                 {state.user.name.charAt(0)}
               </div>
            </div>
          ) : (
            <Link to="/login" className="text-gray-600 hover:text-primary transition-colors flex items-center gap-2 group">
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all">
                <User className="w-5 h-5" />
              </div>
              <span className="font-semibold text-sm hidden sm:block">Login</span>
            </Link>
          )}
        </div>
      </nav>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="fixed top-[73px] left-0 w-full z-40 bg-white border-b border-gray-200 p-4 md:hidden animate-in slide-in-from-top duration-300">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              autoFocus
              placeholder="Search products..."
              className="w-full bg-gray-50 border border-gray-200 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-accent/50"
              onKeyDown={handleSearch}
            />
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="absolute top-0 left-0 w-3/4 max-w-sm h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <span className="text-xl font-bold">Menu</span>
              <button onClick={() => setIsMobileMenuOpen(false)}><X className="w-6 h-6" /></button>
            </div>
            <div className="flex-1 p-6 space-y-6">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-semibold hover:text-accent">Home</Link>
              <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-semibold hover:text-accent">Shop</Link>
              {state.user ? (
                <div className="pt-6 border-t border-gray-100">
                  <p className="text-sm text-gray-500 mb-2">Account</p>
                  <p className="font-bold text-gray-900 mb-4">{state.user.name}</p>
                  <button 
                    onClick={() => {
                      dispatch({ type: 'LOGOUT' });
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-red-500 font-bold"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-semibold hover:text-accent">Login / Register</Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};