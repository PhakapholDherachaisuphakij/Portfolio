import { useState, useEffect } from 'react';

const badgeColors = {
  red: 'bg-cassette-red text-white shadow-sm',
  yellow: 'bg-cassette-yellow text-ink shadow-sm',
  blue: 'bg-cassette-blue text-white shadow-sm',
  cream: 'bg-white text-ink border border-hairline shadow-sm',
  dark: 'bg-darkwrap text-white shadow-sm',
};

const CassetteCard = ({
  title,
  tag = 'Front-end',
  year = '2025',
  index = '01',
  theme = 'red',
  image,
  onClick,
  className = '',
}) => {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [image]);

  const badgeStyle = badgeColors[theme] || badgeColors.red;
  const isLogo = image && (image.includes('3klogo') || image.includes('logo') || image.includes('devicon'));

  return (
    <div
      onClick={onClick}
      className={`group bg-white rounded-[28px] border border-hairline p-4 sm:p-5 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-cassette-red/30 select-none ${className}`}
    >
      {/* 1. Main High-Contrast Hero Image Showcase Area */}
      <div className="aspect-[16/10] w-full rounded-[20px] overflow-hidden relative bg-neutral-900 border border-black/10 shadow-inner mb-4 flex items-center justify-center">
        {image && !imageError ? (
          <img
            src={image}
            alt={title}
            onError={() => setImageError(true)}
            className={`w-full h-full ${
              isLogo ? 'object-contain p-8' : 'object-cover object-top'
            } group-hover:scale-108 transition-transform duration-700 ease-out`}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-ink-muted p-4 text-center bg-paper-dark">
            <span className="material-symbols-outlined text-3xl mb-1 opacity-40">image</span>
            <span className="text-[11px] font-mono font-bold uppercase">{title}</span>
          </div>
        )}

        {/* Subtle Vignette & Gradient Overlay for Depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/15 pointer-events-none group-hover:opacity-75 transition-opacity" />

        {/* Top Floating Badge Tag */}
        <div className="absolute top-3 left-3 z-10">
          <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${badgeStyle}`}>
            {tag}
          </span>
        </div>

        {/* Top-Right Year Tag */}
        <div className="absolute top-3 right-3 z-10">
          <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white font-mono text-[10px] font-bold tabular-nums border border-white/10">
            {year}
          </span>
        </div>

        {/* Hover Quick Action Indicator */}
        <div className="absolute bottom-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="px-3 py-1 rounded-full bg-white/95 text-ink text-[10px] font-mono font-bold uppercase tracking-wider shadow-md flex items-center gap-1 backdrop-blur-xs">
            <span>Expand</span>
            <span className="material-symbols-outlined text-xs">zoom_in</span>
          </span>
        </div>
      </div>

      {/* 2. Bottom Editorial Content */}
      <div className="flex flex-col justify-between flex-1 pt-1">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-ink group-hover:text-cassette-red transition-colors line-clamp-2 leading-snug">
            {title}
          </h3>
          <span className="font-mono text-xs font-bold text-ink-muted tabular-nums shrink-0 pt-1">
            #{index}
          </span>
        </div>

        {/* Bottom Bar: Action Link & Line */}
        <div className="pt-3 border-t border-hairline flex items-center justify-between text-xs font-mono">
          <span className="text-ink-muted group-hover:text-ink font-bold flex items-center gap-1 transition-colors">
            <span>View Case Study</span>
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform">
              arrow_outward
            </span>
          </span>
          <span className="text-[10px] font-bold text-cassette-red uppercase tracking-wider">
            Explore
          </span>
        </div>
      </div>
    </div>
  );
};

export default CassetteCard;
