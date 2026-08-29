// src/components/cards/ActivityCard.jsx
import { useState } from 'react';

const ActivityCard = ({
  title,
  badge = 'Activity',
  year = '2024',
  index = '01',
  theme = 'cream',
  images = [],
  description = '',
  onClick,
  className = '',
}) => {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const photoList = Array.isArray(images) && images.length > 0 ? images : [];

  const handlePrev = (e) => {
    e.stopPropagation();
    setActivePhotoIdx((prev) => (prev > 0 ? prev - 1 : photoList.length - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setActivePhotoIdx((prev) => (prev < photoList.length - 1 ? prev + 1 : 0));
  };

  return (
    <div
      onClick={onClick}
      className={`group bg-white rounded-[24px] border border-hairline p-4 sm:p-5 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-cassette-hover select-none ${className}`}
    >
      {/* 1. Main Photo Frame with Interactive Filmstrip / Multi-Photo Preview */}
      <div className="aspect-[16/11] w-full rounded-[18px] overflow-hidden relative bg-paper-dark border border-hairline mb-3.5 group/photo">
        {photoList.length > 0 ? (
          <img
            src={photoList[activePhotoIdx]}
            alt={`${title} - photo ${activePhotoIdx + 1}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-ink-muted">
            <span className="material-symbols-outlined text-3xl opacity-30">photo_library</span>
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-cassette-yellow text-ink shadow-sm border border-hairline">
            {badge}
          </span>
        </div>

        {/* Photo Count Telemetry */}
        <div className="absolute top-3 right-3 z-10">
          <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white font-mono text-[10px] font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-[12px]">photo_camera</span>
            <span>{photoList.length} Photos</span>
          </span>
        </div>

        {/* Photo Navigation Overlay on Hover (if multiple photos) */}
        {photoList.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover/photo:opacity-100 transition-opacity pointer-events-none">
            <button
              onClick={handlePrev}
              className="p-1.5 rounded-full bg-white/90 text-ink hover:bg-cassette-red hover:text-white shadow-md pointer-events-auto transition-all"
              title="Previous Photo"
            >
              <span className="material-symbols-outlined text-sm flex">chevron_left</span>
            </button>
            <button
              onClick={handleNext}
              className="p-1.5 rounded-full bg-white/90 text-ink hover:bg-cassette-red hover:text-white shadow-md pointer-events-auto transition-all"
              title="Next Photo"
            >
              <span className="material-symbols-outlined text-sm flex">chevron_right</span>
            </button>
          </div>
        )}

        {/* Bottom Filmstrip Indicator Dots */}
        {photoList.length > 1 && (
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm z-10">
            {photoList.slice(0, 6).map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === activePhotoIdx ? 'w-4 bg-white' : 'w-1.5 bg-white/40'
                }`}
              />
            ))}
            {photoList.length > 6 && (
              <span className="text-[9px] font-mono text-white/70">+{photoList.length - 6}</span>
            )}
          </div>
        )}
      </div>

      {/* 2. Filmstrip Mini-Thumbnails Strip (Contact Sheet Preview) */}
      {photoList.length > 1 && (
        <div className="grid grid-cols-4 gap-2 mb-3">
          {photoList.slice(0, 4).map((photo, i) => (
            <div
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setActivePhotoIdx(i);
              }}
              className={`aspect-video rounded-lg overflow-hidden border transition-all cursor-pointer ${
                i === activePhotoIdx
                  ? 'border-cassette-red ring-2 ring-cassette-red/30 scale-95'
                  : 'border-hairline opacity-60 hover:opacity-100'
              }`}
            >
              <img src={photo} alt="thumbnail" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      )}

      {/* 3. Editorial Metadata */}
      <div className="flex flex-col justify-between flex-1 pt-1">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h3 className="text-lg sm:text-xl font-bold font-sans tracking-tight text-ink group-hover:text-cassette-red transition-colors line-clamp-2">
            {title}
          </h3>
          <span className="font-mono text-xs font-bold text-ink-muted tabular-nums shrink-0 pt-1">
            #{index}
          </span>
        </div>

        {description && (
          <p className="text-xs text-ink-muted line-clamp-2 leading-relaxed mb-3">
            {description}
          </p>
        )}

        {/* Bottom Bar */}
        <div className="pt-3 border-t border-hairline flex items-center justify-between text-xs font-mono">
          <span className="text-ink-muted group-hover:text-ink font-bold flex items-center gap-1 transition-colors">
            <span>Open Gallery Lightbox</span>
            <span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
              fullscreen
            </span>
          </span>
          <span className="text-[10px] font-bold text-cassette-yellow uppercase tracking-wider bg-ink text-white px-2 py-0.5 rounded-full">
            {year}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
