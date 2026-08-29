// src/components/effects/LoadingScreen.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const duration = 1000;
    const interval = 16;
    const steps = duration / interval;
    let current = 0;
    
    const timer = setInterval(() => {
      current += 1;
      const t = current / steps;
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      
      if (current >= steps) {
        clearInterval(timer);
        setIsComplete(true);
        onComplete?.();
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          exit={{ 
            opacity: 0,
            clipPath: 'inset(0 0 100% 0)',
            transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[10001] flex flex-col items-center justify-center bg-[#050508] pointer-events-auto"
        >
          {/* Grid Background */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />

          {/* Center Content */}
          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Logo Mark */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent-violet flex items-center justify-center">
                <span className="text-white text-2xl font-black font-display">PK</span>
              </div>
              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -inset-4 bg-primary/20 rounded-3xl blur-xl -z-10"
              />
            </motion.div>

            {/* Progress Bar */}
            <div className="w-48 h-[2px] bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-accent-cyan rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Counter */}
            <div className="flex items-center gap-3">
              <span className="text-white/30 font-mono text-xs tracking-widest uppercase">
                Loading
              </span>
              <span className="text-primary font-mono text-sm font-bold tabular-nums">
                {progress}%
              </span>
            </div>
          </div>

          {/* Bottom Line */}
          <div className="absolute bottom-12 text-white/10 text-[10px] font-mono tracking-[0.3em] uppercase">
            PK.dev — Portfolio 2026
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
