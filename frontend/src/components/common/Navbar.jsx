// src/components/common/Navbar.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { PROFILE_DATA } from '../../constants/profile';
import MagneticButton from '../effects/MagneticButton';
import SoundToggle from '../effects/SoundToggle';
import { soundFx } from '../../utils/soundFx';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        isScrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Brand Holographic Logo */}
        <Link
          to="/"
          onClick={() => soundFx.playClick()}
          className="flex items-center gap-3 group"
        >
          <MagneticButton strength={0.2}>
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary via-accent-violet to-accent-cyan flex items-center justify-center transition-all group-hover:scale-105 shadow-glow-sm">
                <span className="text-white text-sm font-black font-display tracking-tight">PK</span>
              </div>
            </div>
          </MagneticButton>
          <div className="flex flex-col text-left">
            <span className="text-white text-base font-bold font-display tracking-tight leading-none">
              pk<span className="text-accent-cyan">.dev</span>
            </span>
            <span className="text-[9px] font-mono text-neutral-light tracking-widest uppercase">
              Architect
            </span>
          </div>
        </Link>

        {/* Floating Capsule Nav (Desktop) */}
        <div className="hidden md:flex items-center gap-1 p-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-2xl shadow-glass">
          {PROFILE_DATA.navigation.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => soundFx.playClick()}
              onMouseEnter={() => soundFx.playHover()}
              className={`relative px-5 py-2 text-xs font-mono font-bold transition-all rounded-xl ${
                location.pathname === item.path
                  ? 'text-white'
                  : 'text-neutral-mid hover:text-neutral-dark'
              }`}
            >
              {item.label}
              {location.pathname === item.path && (
                <motion.div
                  layoutId="activeCapsuleTab"
                  className="absolute inset-0 bg-white/[0.08] border border-white/[0.12] -z-10 rounded-xl shadow-glow-sm"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Right Action Stack: Sound Controller + CTA */}
        <div className="hidden md:flex items-center gap-3">
          <SoundToggle />
          
          <MagneticButton strength={0.15}>
            <Link
              to="/contact"
              onClick={() => soundFx.playClick()}
              className="btn-magnetic text-xs px-5 py-2.5 flex items-center gap-2"
            >
              <span>Transmit</span>
              <span className="material-symbols-outlined text-sm">north_east</span>
            </Link>
          </MagneticButton>
        </div>

        {/* Mobile Burger */}
        <div className="flex items-center gap-2 md:hidden">
          <SoundToggle />
          
          <button
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.05] border border-white/[0.08] text-white"
            onClick={() => {
              soundFx.playClick();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
          >
            <span className="material-symbols-outlined text-xl">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative md:hidden overflow-hidden"
          >
            <div className="px-6 py-6 bg-background/95 backdrop-blur-2xl border-b border-white/[0.06] flex flex-col gap-2">
              {PROFILE_DATA.navigation.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => {
                      soundFx.playClick();
                      setIsMobileMenuOpen(false);
                    }}
                    className={`block px-4 py-3 text-base font-mono font-bold rounded-xl transition-all ${
                      location.pathname === item.path
                        ? 'bg-primary/20 text-white border border-primary/30'
                        : 'text-neutral-mid hover:text-white hover:bg-white/[0.03]'
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                to="/contact"
                onClick={() => {
                  soundFx.playClick();
                  setIsMobileMenuOpen(false);
                }}
                className="btn-magnetic text-center mt-3 text-xs py-3.5"
              >
                Transmit Message
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
