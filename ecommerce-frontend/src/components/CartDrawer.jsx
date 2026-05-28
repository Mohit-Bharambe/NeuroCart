import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, CreditCard, ShoppingCart } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export const CartDrawer = ({ isOpen }) => {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();

  const total = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => dispatch({ type: 'TOGGLE_CART' })}
          />
          
          {/* Drawer */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-2xl font-bold">Your Cart</h2>
              <button 
                onClick={() => dispatch({ type: 'TOGGLE_CART' })}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <AnimatePresence mode="popLayout">
                {state.cart.length === 0 ? (
                  <motion.div 
                    key="empty"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4"
                  >
                    <ShoppingCart className="w-16 h-16 opacity-20 animate-bounce" />
                    <p className="text-lg">Your cart is empty</p>
                  </motion.div>
                ) : (
                  state.cart.map(item => (
                    <motion.div 
                      key={item.id} 
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ type: 'spring', damping: 20, stiffness: 150 }}
                      className="flex gap-4 items-center bg-gray-50 p-4 rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors"
                    >
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl border border-gray-200" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm line-clamp-2">{item.name}</h3>
                        <p className="text-accent font-bold mt-1">₹{item.price.toFixed(2)}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center bg-white rounded-lg border border-gray-200">
                            <button 
                              onClick={() => item.quantity > 1 ? dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity - 1 } }) : dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
                              className="p-1.5 hover:text-accent"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-2 text-sm font-medium">{item.quantity}</span>
                            <button 
                              onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity + 1 } })}
                              className="p-1.5 hover:text-accent"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <button 
                            onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
                            className="text-red-400 hover:text-red-600 ml-auto p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {state.cart.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600 font-medium">Subtotal</span>
                  <span className="text-xl font-bold">₹{total.toFixed(2)}</span>
                </div>
                <button 
                  onClick={() => {
                    dispatch({ type: 'TOGGLE_CART' });
                    navigate('/checkout');
                  }}
                  className="w-full bg-primary hover:bg-gray-800 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-5 h-5" /> Checkout
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

