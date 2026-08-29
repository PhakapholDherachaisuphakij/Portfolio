// src/components/parallax/ScrollReveal.jsx
import { motion } from 'framer-motion';

const ScrollReveal = ({ 
  children, 
  className = '',
  direction = 'up',    // 'up', 'down', 'left', 'right', 'scale', 'none'
  delay = 0,
  duration = 0.6,
  distance = 30,
  stagger = 0,
  once = true,
  threshold = 0.1,
  ...props
}) => {
  const directions = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { y: 0, x: distance },
    right: { y: 0, x: -distance },
    scale: { y: 0, x: 0, scale: 0.95 },
    none: { y: 0, x: 0 },
  };

  const dir = directions[direction] || directions.up;

  const variants = {
    hidden: {
      opacity: 0,
      y: dir.y,
      x: dir.x,
      scale: dir.scale || 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: duration,
        delay: delay,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: stagger,
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: once, amount: threshold, margin: "0px 0px -50px 0px" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
