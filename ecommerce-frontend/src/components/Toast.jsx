import { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Info, AlertTriangle, X, ShoppingBag, Heart } from 'lucide-react';

const ToastContext = createContext();

const ICONS = {
  success: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
  info: <Info className="w-5 h-5 text-blue-500" />,
  error: <AlertTriangle className="w-5 h-5 text-red-500" />,
  cart: <ShoppingBag className="w-5 h-5 text-accent" />,
  wishlist: <Heart className="w-5 h-5 text-pink-500" />,
};

const BG_COLORS = {
  success: 'border-emerald-200 bg-emerald-50',
  info: 'border-blue-200 bg-blue-50',
  error: 'border-red-200 bg-red-50',
  cart: 'border-blue-200 bg-blue-50',
  wishlist: 'border-pink-200 bg-pink-50',
};

const PROGRESS_COLORS = {
  success: 'bg-emerald-400',
  info: 'bg-blue-400',
  error: 'bg-red-400',
  cart: 'bg-accent',
  wishlist: 'bg-pink-400',
};

let toastId = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = ++toastId;
    setToasts(prev => [...prev, { id, message, type, duration }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      {/* Toast Container */}
      <div className="fixed top-24 right-4 z-[100] flex flex-col gap-3 pointer-events-none max-w-sm w-full">
        <AnimatePresence mode="popLayout">
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, x: 80, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 80, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className={`pointer-events-auto rounded-xl border shadow-lg overflow-hidden ${BG_COLORS[toast.type] || BG_COLORS.info}`}
            >
              <div className="flex items-center gap-3 p-4">
                <div className="shrink-0">
                  {ICONS[toast.type] || ICONS.info}
                </div>
                <p className="text-sm font-medium text-gray-800 flex-1">{toast.message}</p>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              {/* Progress bar */}
              <div className="h-1 w-full bg-black/5">
                <div
                  className={`h-full ${PROGRESS_COLORS[toast.type] || PROGRESS_COLORS.info} toast-progress`}
                  style={{ animationDuration: `${toast.duration}ms` }}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
