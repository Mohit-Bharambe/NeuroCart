import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Compass, AlertCircle } from 'lucide-react';
import './NotFoundPage.css';

export function NotFoundPage() {
  useEffect(() => {
    document.title = '404 - Page Not Found | NeuroCart';
  }, []);

  return (
    <div className="nc-404-container relative flex flex-col items-center justify-center min-h-[70vh] px-6 overflow-hidden">
      {/* Background glowing elements */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-accent/10 blur-3xl animate-orb" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-pink-500/5 blur-3xl animate-orb-reverse" />

      {/* 404 Visual Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-lg">
        {/* Animated Icon */}
        <motion.div
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mb-8 p-6 bg-white/40 backdrop-blur rounded-full border border-white/20 shadow-xl glow"
        >
          <AlertCircle className="w-16 h-16 text-accent" />
        </motion.div>

        {/* Big 404 Heading */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-8xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-accent to-blue-600 mb-6"
        >
          404
        </motion.h1>

        {/* Subtitle */}
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold text-gray-800 mb-4"
        >
          Lost in the Void
        </motion.h2>

        {/* Description */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-gray-500 mb-8 leading-relaxed text-base md:text-lg"
        >
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let's get you back on track!
        </motion.p>

        {/* CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Link 
            to="/" 
            className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-accent text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
          >
            <Home className="w-5 h-5" /> Go Back Home
          </Link>
          <Link 
            to="/shop" 
            className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 px-8 py-4 rounded-full font-bold border border-gray-200 shadow-sm transition-all"
          >
            <Compass className="w-5 h-5" /> Explore Shop
          </Link>
        </motion.div>
      </div>
    </div>
  );
}