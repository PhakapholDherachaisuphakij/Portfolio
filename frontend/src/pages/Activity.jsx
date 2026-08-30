// src/pages/Activity.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ActivityData as StaticActivities, initialFlattenedActivities, resolveImageUrl } from '../data/Data';
import { supabase } from '../lib/supabase';
import ActivityCard from '../components/cards/ActivityCard';

export default function Activity() {
  const [activities, setActivities] = useState(initialFlattenedActivities);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(0);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2500);

        const { data: aData, error } = await supabase
          .from('activities')
          .select('*')
          .order('order_idx', { ascending: true })
          .order('created_at', { ascending: false })
          .abortSignal(controller.signal);

        clearTimeout(timeoutId);

        if (error) throw error;
        if (aData && aData.length > 0) {
          setActivities(
            aData.map((a) => {
              const gallery = (a.gallery && a.gallery.length > 0
                ? a.gallery
                : a.main_image
                ? [a.main_image]
                : []).map(img => resolveImageUrl(img));

              return {
                activityTitle: a.title,
                badge: a.period_label || a.semester || 'Activity',
                image: resolveImageUrl(a.main_image || gallery[0]),
                description: a.description,
                activitypic: gallery,
              };
            })
          );
        }
      } catch (err) {
        console.warn('Activity live fetch unreachable, using cached static fallback');
      }
    };
    fetchActivities();
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
        <span className="text-xs font-mono text-ink-muted">
          Events & Workshops ({activities.length})
        </span>
      </div>

      <div className="mb-16 space-y-4">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
          <h1 className="text-editorial-lg font-serif text-ink tracking-tight">
            Act<i>i</i>v<i>i</i>ty
          </h1>
          <div className="hidden md:block flex-1 h-px bg-hairline self-center mx-6"></div>
          <h1 className="text-editorial-lg font-serif text-ink tracking-tight md:text-right">
            L<i>o</i>g
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pb-20">
        {activities.map((act, idx) => {
          const theme = idx % 2 === 0 ? 'cream' : 'yellow';

          return (
            <ActivityCard
              key={act.activityTitle + idx}
              title={act.activityTitle}
              badge={act.badge}
              year="2024"
              index={String(idx + 1).padStart(2, '0')}
              theme={theme}
              images={act.activitypic}
              description={act.description}
              onClick={() => {
                setSelectedActivity(act);
                setActiveLightboxIndex(0);
              }}
            />
          );
        })}
      </div>

      {/* Full Immersive Activity Gallery Lightbox */}
      {selectedActivity && (
        <div
          className="fixed inset-0 z-[1000] flex flex-col items-center justify-between p-4 sm:p-6 bg-black/90 backdrop-blur-lg animate-fade-in text-white select-none"
          onClick={() => setSelectedActivity(null)}
        >
          <div className="w-full max-w-5xl flex items-center justify-between z-20 pt-2 pb-4">
            <div>
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-cassette-yellow text-ink">
                {selectedActivity.badge || 'Activity'}
              </span>
              <h3 className="text-xl sm:text-2xl font-serif text-white mt-1">
                {selectedActivity.activityTitle}
              </h3>
            </div>

            <div className="flex items-center gap-4">
              <span className="font-mono text-xs text-neutral-400">
                {activeLightboxIndex + 1} / {(selectedActivity.activitypic || []).length || 1}
              </span>
              <button
                onClick={() => setSelectedActivity(null)}
                className="p-2.5 rounded-full bg-white/10 hover:bg-cassette-red text-white transition-colors"
                title="Close"
              >
                <span className="material-symbols-outlined text-xl flex">close</span>
              </button>
            </div>
          </div>

          <div
            className="relative w-full max-w-5xl flex-1 flex items-center justify-center min-h-0 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {(selectedActivity.activitypic || []).length > 1 && (
              <button
                onClick={() =>
                  setActiveLightboxIndex((prev) =>
                    prev > 0 ? prev - 1 : (selectedActivity.activitypic || []).length - 1
                  )
                }
                className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-black/60 hover:bg-cassette-red text-white transition-all backdrop-blur-md"
              >
                <span className="material-symbols-outlined text-2xl flex">chevron_left</span>
              </button>
            )}

            <div className="max-h-[60vh] sm:max-h-[65vh] w-full flex items-center justify-center overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-black/40">
              <img
                src={
                  (selectedActivity.activitypic || [])[activeLightboxIndex] ||
                  selectedActivity.image
                }
                alt={`${selectedActivity.activityTitle} photo`}
                className="max-h-[60vh] sm:max-h-[65vh] max-w-full object-contain"
              />
            </div>

            {(selectedActivity.activitypic || []).length > 1 && (
              <button
                onClick={() =>
                  setActiveLightboxIndex((prev) =>
                    prev < (selectedActivity.activitypic || []).length - 1 ? prev + 1 : 0
                  )
                }
                className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-black/60 hover:bg-cassette-red text-white transition-all backdrop-blur-md"
              >
                <span className="material-symbols-outlined text-2xl flex">chevron_right</span>
              </button>
            )}
          </div>

          <div
            className="w-full max-w-5xl pt-4 pb-2 z-20 space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedActivity.description && (
              <p className="text-xs sm:text-sm text-neutral-300 max-w-3xl mx-auto text-center leading-relaxed">
                {selectedActivity.description}
              </p>
            )}

            {(selectedActivity.activitypic || []).length > 1 && (
              <div className="flex items-center justify-center gap-2 overflow-x-auto py-2 max-w-full no-scrollbar">
                {selectedActivity.activitypic.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveLightboxIndex(idx)}
                    className={`h-12 w-16 sm:h-14 sm:w-20 rounded-lg overflow-hidden shrink-0 border transition-all ${
                      idx === activeLightboxIndex
                        ? 'border-cassette-yellow ring-2 ring-cassette-yellow/40 scale-105'
                        : 'border-white/20 opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}