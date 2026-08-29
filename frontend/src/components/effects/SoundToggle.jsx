// src/components/effects/SoundToggle.jsx
import { useState, useEffect } from 'react';
import { soundFx } from '../../utils/soundFx';

const SoundToggle = () => {
  const [isMuted, setIsMuted] = useState(soundFx.isMuted);

  const toggle = () => {
    const nextMuted = soundFx.toggleMute();
    setIsMuted(nextMuted);
    if (!nextMuted) {
      soundFx.playWarp();
    }
  };

  return (
    <button
      onClick={toggle}
      title={isMuted ? 'Enable sound feedback' : 'Mute audio feedback'}
      className="group relative flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-primary/40 transition-all duration-300 text-xs font-mono text-neutral-mid hover:text-white"
    >
      <div className="flex items-center gap-0.5 h-3">
        {[0.4, 0.9, 0.6, 1, 0.3].map((height, i) => (
          <span
            key={i}
            className={`w-[2px] rounded-full transition-all duration-300 ${
              isMuted
                ? 'bg-neutral-light/40 h-1'
                : 'bg-primary animate-pulse'
            }`}
            style={{
              height: isMuted ? '3px' : `${height * 12}px`,
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:inline">
        {isMuted ? 'Sound Off' : 'Sound On'}
      </span>
    </button>
  );
};

export default SoundToggle;
