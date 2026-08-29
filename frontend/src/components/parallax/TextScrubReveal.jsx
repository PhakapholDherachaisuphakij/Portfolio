// src/components/parallax/TextScrubReveal.jsx
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Word = ({ children, range, progress }) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const y = useTransform(progress, range, [10, 0]);

  return (
    <span className="relative inline-block mr-3">
      <motion.span style={{ opacity, y }} className="inline-block text-white font-display font-bold">
        {children}
      </motion.span>
    </span>
  );
};

const TextScrubReveal = ({ text, className = '' }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.9', 'end 0.3'],
  });

  const words = text.split(' ');

  return (
    <p ref={containerRef} className={`flex flex-wrap leading-tight ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} range={[start, end]} progress={scrollYProgress}>
            {word}
          </Word>
        );
      })}
    </p>
  );
};

export default TextScrubReveal;
