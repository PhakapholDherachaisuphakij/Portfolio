// src/components/home/Hero.jsx
import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { supabase, PROJECT_REF } from '../../lib/supabase';
import { PROFILE_DATA } from '../../constants/profile';
import MagneticButton from '../effects/MagneticButton';
import GlitchText from '../effects/GlitchText';
import { Link } from 'react-router-dom';
import { soundFx } from '../../utils/soundFx';

const QuantumCore = lazy(() => import('../3d/QuantumCore'));

const CLOUD_PROFILE_FALLBACK = `https://${PROJECT_REF}.supabase.co/storage/v1/object/public/portfolio-assets/assets/profil.jpg`;

const Hero = () => {
  const [profile, setProfile] = useState(PROFILE_DATA);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (error) throw error;
        if (data) {
          setProfile({
            ...PROFILE_DATA,
            name: data.name || PROFILE_DATA.name,
            nickname: data.nickname || PROFILE_DATA.nickname,
            title: data.role || PROFILE_DATA.title,
            description: data.description || PROFILE_DATA.description,
            available: "Online & Calibrated",
            avatar: data.avatar_url || CLOUD_PROFILE_FALLBACK,
          });
        }
      } catch (err) {
        console.error('Profile fetch failed:', err);
      }
    };
    fetchProfile();
  }, []);

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden px-6 pt-24 pb-16">
      {/* 3D Quantum Shader Core */}
      <Suspense fallback={null}>
        <QuantumCore className="opacity-75" />
      </Suspense>

      {/* Radial Gradient Masks */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background z-[1] pointer-events-none" />

      {/* Main Narrative Container */}
      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col items-center text-center">
        
        {/* Status HUD Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl shadow-glass">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-cyan"></span>
            </span>
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-neutral-dark">
              {profile.available}
            </span>
            <span className="w-px h-3 bg-white/10" />
            <span className="text-[10px] font-mono text-accent-cyan font-bold">2026.SYS</span>
          </div>
        </motion.div>

        {/* Master Heading */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4 mb-6"
        >
          <h1 className="text-display-xl font-black font-display tracking-tight text-white leading-none">
            <span className="block text-neutral-light/80 text-2xl sm:text-3xl md:text-4xl font-light tracking-widest font-mono uppercase mb-2">
              Creative Technologist &
            </span>
            <span className="gradient-text-flow block">
              Frontend Architect
            </span>
          </h1>
        </motion.div>

        {/* Profile Bio Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg sm:text-xl text-neutral-mid font-medium max-w-2xl leading-relaxed mb-10"
        >
          {profile.description}
        </motion.p>

        {/* Action Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap gap-4 justify-center items-center mb-16"
        >
          <MagneticButton strength={0.15}>
            <Link
              to="/quests"
              onClick={() => soundFx.playClick()}
              className="btn-magnetic flex items-center gap-3 px-8 py-4 text-sm"
            >
              <span>Explore All Quests</span>
              <span className="material-symbols-outlined text-base">rocket_launch</span>
            </Link>
          </MagneticButton>

          <MagneticButton strength={0.15}>
            <Link
              to="/contact"
              onClick={() => soundFx.playClick()}
              className="btn-outline flex items-center gap-3 px-8 py-4 text-sm"
            >
              <span>Initiate Contact</span>
              <span className="material-symbols-outlined text-base">terminal</span>
            </Link>
          </MagneticButton>
        </motion.div>

        {/* Tech Stack Matrix Floating Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-white/[0.04] max-w-3xl w-full"
        >
          <span className="text-[10px] font-mono font-bold text-neutral-light uppercase tracking-[0.2em] mr-2">
            Core Engine:
          </span>
          {PROFILE_DATA.stack.map((tech) => (
            <div
              key={tech.name}
              onMouseEnter={() => soundFx.playHover()}
              className="group relative flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base text-accent-cyan group-hover:scale-110 transition-transform">
                {tech.icon}
              </span>
              <span className="text-xs font-mono font-bold text-neutral-mid group-hover:text-white transition-colors">
                {tech.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Floating Ambient Bottom Wave Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none opacity-60">
        <span className="text-[9px] font-mono text-neutral-light uppercase tracking-[0.3em]">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-4 h-7 rounded-full border border-white/20 flex justify-center pt-1"
        >
          <div className="w-1 h-1.5 rounded-full bg-accent-cyan" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
