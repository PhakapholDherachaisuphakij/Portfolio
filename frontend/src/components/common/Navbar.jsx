// src/components/common/Navbar.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { PROFILE_DATA } from '../../constants/profile';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        isScrolled ? 'py-3 bg-background-light/80 backdrop-blur-xl shadow-glass' : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 bg-neutral-dark rounded-xl flex items-center justify-center transition-all group-hover:bg-primary"
          >
            <span className="material-symbols-outlined text-white text-xl font-bold">code</span>
          </motion.div>
          <span className="text-neutral-dark text-xl font-black tracking-tighter">
            {PROFILE_DATA.name.split('')[0]}.dev
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 bg-white/50 p-1.5 rounded-2xl border border-neutral-light/10 shadow-sm">
          <div className="flex items-center">
            {PROFILE_DATA.navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-5 py-2 text-sm font-bold transition-all rounded-xl ${
                  location.pathname === item.path 
                  ? 'text-neutral-dark' 
                  : 'text-neutral-mid hover:text-neutral-dark hover:bg-neutral-light/10'
                }`}
              >
                {item.label}
                {location.pathname === item.path && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white shadow-sm -z-10 rounded-xl"
                  />
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.button 
          whileHover={{ y: -2 }}
          whileTap={{ y: 0 }}
          className="hidden md:block bg-neutral-dark text-white text-sm font-bold px-7 py-3 rounded-xl shadow-3d hover:shadow-3d-active transition-all"
        >
          Work with me
        </motion.button>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-neutral-light/10 text-neutral-dark"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="material-symbols-outlined">
            {isMobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white border-b border-neutral-light/10 shadow-premium p-6 flex flex-col gap-4 md:hidden"
          >
            {PROFILE_DATA.navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-3 text-lg font-bold rounded-xl ${
                  location.pathname === item.path ? 'bg-primary/10 text-primary-dark' : 'text-neutral-dark hover:bg-neutral-light/5'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <button className="w-full bg-neutral-dark text-white font-bold py-4 rounded-xl shadow-lg mt-2">
              Work with me
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
