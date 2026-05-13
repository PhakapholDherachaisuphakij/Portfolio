// src/components/common/Footer.jsx
import { PROFILE_DATA } from '../../constants/profile';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-neutral-light/10 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
            <div className="w-8 h-8 bg-neutral-dark rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-lg">code</span>
            </div>
            <span className="text-neutral-dark text-lg font-black">{PROFILE_DATA.name}.dev</span>
          </div>
          <p className="text-neutral-mid text-sm text-center md:text-left max-w-xs">
            {PROFILE_DATA.description}
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-3">
           <div className="flex items-center gap-6">
              <a href="https://www.linkedin.com/in/phakaphol-dhera/" target="_blank" rel="noreferrer" className="text-neutral-mid hover:text-primary transition-colors text-[10px] font-black uppercase tracking-[0.2em] py-2">LinkedIn</a>
              <a href="mailto:godzk25@gmail.com" className="text-neutral-mid hover:text-primary transition-colors text-[10px] font-black uppercase tracking-[0.2em] py-2">Email</a>
              <a href="/admin/login" className="px-3 py-1.5 bg-neutral-light/5 border border-neutral-light/10 rounded-lg text-[10px] font-black text-neutral-mid hover:bg-neutral-dark hover:text-white transition-all uppercase tracking-widest flex items-center gap-2">
                 <span className="material-symbols-outlined text-xs">admin_panel_settings</span>
                 Portal
              </a>
           </div>
           <div className="text-neutral-light text-[9px] font-bold uppercase tracking-widest mt-2">
             © {new Date().getFullYear()} PK Masterpiece — Phakaphol Dhera
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
