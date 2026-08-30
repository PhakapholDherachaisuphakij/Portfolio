// src/pages/CharactorStats.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase, STORAGE_BASE_URL } from '../lib/supabase';
import {
  socialLinks as StaticSocial,
  playerInfo as StaticPlayer,
  skills as StaticSkills,
  experience as StaticExp,
} from '../data/Data';

const CLOUD_PROFILE_FALLBACK = '/assets/profil.jpg';

export default function CharacterStats() {
  const [profile, setProfile] = useState(StaticPlayer);
  const [skills, setSkills] = useState(StaticSkills);
  const [experience, setExperience] = useState(StaticExp);
  const [socialLinks, setSocialLinks] = useState(StaticSocial);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2500);

        const { data: pData } = await supabase.from('profiles').select('*').limit(1).abortSignal(controller.signal).maybeSingle();
        clearTimeout(timeoutId);

        if (pData) {
          setProfile({
            nickname: pData.nickname || StaticPlayer.nickname,
            level: pData.level || StaticPlayer.level,
            role: pData.role || StaticPlayer.role,
            quote: pData.quote || StaticPlayer.quote,
            avatar: pData.avatar_url || CLOUD_PROFILE_FALLBACK,
          });
        }
        const { data: sData } = await supabase.from('skills').select('*').order('order_idx');
        if (sData && sData.length > 0) setSkills(sData);

        const { data: eData } = await supabase.from('experience').select('*').order('order_idx');
        if (eData && eData.length > 0) setExperience(eData);
      } catch (err) {
        console.warn('Stats live data fetch unreachable, using static CDN profile');
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-paper text-ink px-6 sm:px-12 py-12 max-w-[1440px] mx-auto font-sans">
      <div className="flex items-center justify-between pb-8 mb-12 border-hairline-b">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-ink hover:text-cassette-red transition-colors"
        >
          <span>← Back to Index</span>
        </Link>
        <span className="text-xs font-mono text-ink-muted">About & Background</span>
      </div>

      {/* Heading */}
      <div className="mb-16 space-y-4">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
          <h1 className="text-editorial-lg font-serif text-ink tracking-tight">
            Ab<i>o</i>ut
          </h1>
          <div className="hidden md:block flex-1 h-px bg-hairline self-center mx-6"></div>
          <h1 className="text-editorial-lg font-serif text-ink tracking-tight md:text-right">
            Pr<i>o</i>f<i>i</i>le
          </h1>
        </div>
      </div>

      {/* Bio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-24">
        <div className="lg:col-span-5 space-y-6">
          <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-3xl overflow-hidden border-hairline bg-paper-dark">
            <img src={profile.avatar || CLOUD_PROFILE_FALLBACK} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <p className="text-2xl sm:text-3xl font-serif leading-snug">
            "{profile.quote}"
          </p>
        </div>

        <div className="lg:col-span-7 space-y-10">
          <div className="space-y-4 text-base sm:text-lg leading-relaxed">
            <p>
              Hi, I'm <strong className="font-bold">{profile.nickname}</strong>. A dedicated Frontend Developer who believes the web should be thoughtful, clean, and meticulously engineered.
            </p>
          </div>

          {/* Experience Ledger */}
          <div className="space-y-4 pt-4 border-hairline-t">
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-ink mb-6">
              Experience Ledger
            </p>
            {experience.map((exp, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 py-3 border-hairline-b text-sm"
              >
                <span className="font-bold sm:w-1/3">{exp.company || exp.title}</span>
                <span className="text-xs font-mono text-ink-muted sm:w-1/3 text-left sm:text-center">
                  {exp.title}
                </span>
                <span className="text-xs font-mono font-bold sm:w-1/3 text-left sm:text-right">
                  {exp.period}
                </span>
              </div>
            ))}
          </div>

          {/* Skill List */}
          <div className="space-y-4 pt-4 border-hairline-t">
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-ink mb-4">
              Skill Constellation
            </p>
            <div className="flex flex-wrap gap-2">
              {skills.map((s, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 rounded-full bg-paper-light border-hairline text-xs font-mono font-bold text-ink"
                >
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}