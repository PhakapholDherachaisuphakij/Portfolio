// src/layouts/MainLayout.jsx
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ConstanceCursor from '../components/effects/ConstanceCursor';

const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-paper text-ink selection:bg-cassette-red selection:text-white">
      {/* Constance Arrow Cursor */}
      <ConstanceCursor />

      {/* Main Outlet */}
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default MainLayout;
