// src/components/effects/GlitchText.jsx
import { useState, useEffect, useRef } from 'react';

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

const GlitchText = ({ text, className = '', as: Tag = 'span', triggerOnHover = true, triggerOnView = false }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const ref = useRef(null);

  const scramble = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    let iteration = 0;
    const totalIterations = text.length * 2;
    
    const interval = setInterval(() => {
      setDisplayText(
        text.split('').map((char, i) => {
          if (char === ' ') return ' ';
          if (i < iteration / 2) return text[i];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('')
      );

      iteration += 1;
      if (iteration >= totalIterations) {
        clearInterval(interval);
        setDisplayText(text);
        setIsAnimating(false);
      }
    }, 30);
  };

  useEffect(() => {
    if (!triggerOnView) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          scramble();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [triggerOnView]);

  const handlers = triggerOnHover ? { onMouseEnter: scramble } : {};

  return (
    <Tag
      ref={ref}
      className={`${className} font-mono`}
      {...handlers}
    >
      {displayText}
    </Tag>
  );
};

export default GlitchText;
