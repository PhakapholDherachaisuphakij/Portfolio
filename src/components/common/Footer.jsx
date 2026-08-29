// src/components/common/Footer.jsx
import { PROFILE_DATA } from '../../constants/profile';
import ScrollReveal from '../parallax/ScrollReveal';
import GlitchText from '../effects/GlitchText';
import { soundFx } from '../../utils/soundFx';

const Footer = () => {
  return (
    <footer className="relative border-t border-white/[0.06] bg-background-elevated/30 overflow-hidden">
      {/* Top Holographic Neon Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <ScrollReveal direction="up" distance={20}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            {/* Brand Matrix */}
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary via-accent-violet to-accent-cyan flex items-center justify-center shadow-glow-sm">
                  <span className="text-white text-xs font-black font-display">PK</span>
                </div>
                <span className="text-white text-lg font-bold font-display">
                  pk<span className="text-accent-cyan">.dev</span>
                </span>
                <span className="text-[10px] font-mono text-neutral-light bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.06]">
                  v2026.4
                </span>
              </div>
              <p className="text-neutral-mid text-xs font-mono text-center md:text-left max-w-sm leading-relaxed">
                {PROFILE_DATA.description}
              </p>
            </div>

            {/* Links & Admin Portal */}
            <div className="flex flex-col items-center md:items-end gap-4">
              <div className="flex items-center gap-6">
                <a
                  href="https://www.linkedin.com/in/phakaphol-dhera/"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="text-neutral-mid hover:text-white transition-colors text-xs font-mono font-bold uppercase tracking-wider py-1"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="text-neutral-mid hover:text-white transition-colors text-xs font-mono font-bold uppercase tracking-wider py-1"
                >
                  GitHub
                </a>
                <a
                  href="mailto:godzk25@gmail.com"
                  onClick={() => soundFx.playClick()}
                  className="text-neutral-mid hover:text-white transition-colors text-xs font-mono font-bold uppercase tracking-wider py-1"
                >
                  Email
                </a>
                <a
                  href="/admin/login"
                  onClick={() => soundFx.playClick()}
                  className="px-3 py-1.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-xs font-mono font-bold text-neutral-mid hover:bg-primary/20 hover:text-white hover:border-primary/40 transition-all uppercase tracking-widest flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-xs text-primary">admin_panel_settings</span>
                  Portal
                </a>
              </div>

              <div className="text-neutral-light/60 text-[10px] font-mono tracking-widest uppercase">
                © {new Date().getFullYear()} <GlitchText text="PHAKAPHOL DHERA" triggerOnHover={true} className="text-[10px] text-neutral-light" /> — All rights reserved
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
};

export default Footer;
