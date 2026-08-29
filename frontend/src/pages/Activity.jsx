import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ActivityData as StaticActivityData } from '../data/Data'; 
import { supabase } from '../lib/supabase';

// สีสำหรับ card แต่ละใบ (วนลูป)
const colorThemes = [
  { name: "secondary-purple", dark: "secondary-purple-dark", accent: "#ce82ff" },
  { name: "secondary-orange", dark: "secondary-orange-dark", accent: "#f59e0b" },
  { name: "secondary-blue", dark: "secondary-blue-dark", accent: "#3b82f6" },
];

export default function Activity() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  // State สำหรับ Image Preview Modal
  const [previewData, setPreviewData] = useState({
    images: [],
    currentIndex: 0,
    isOpen: false
  });

  // Modal Controls
  const openPreview = (images, index) => {
    setPreviewData({ images, currentIndex: index, isOpen: true });
    document.body.style.overflow = 'hidden'; // Lock scroll
  };

  const closePreview = () => {
    setPreviewData(prev => ({ ...prev, isOpen: false }));
    document.body.style.overflow = 'unset'; // Unlock scroll
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setPreviewData(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % prev.images.length
    }));
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setPreviewData(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length
    }));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!previewData.isOpen) return;
      if (e.key === 'Escape') closePreview();
      if (e.key === 'ArrowRight') nextImage(e);
      if (e.key === 'ArrowLeft') prevImage(e);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [previewData.isOpen]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const { data, error } = await supabase
          .from('activities')
          .select('*')
          .order('order_idx', { ascending: true })
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          const formatted = data.map((curr) => ({
            activityTitle: curr.title,
            badge: curr.period_label || curr.semester || 'Activity',
            image: curr.main_image,
            description: curr.description,
            activitypic: curr.gallery && curr.gallery.length > 0 ? curr.gallery : (curr.main_image ? [curr.main_image] : [])
          }));
          setActivities(formatted);
        } else {
          // Fallback static flattener
          const flattened = StaticActivityData.flatMap(s => s.Activity1.map(a => ({
            activityTitle: a.activityTitle,
            badge: a.Semester || 'Activity',
            image: a.image,
            description: a.description,
            activitypic: a.activitypic || []
          })));
          setActivities(flattened);
        }
      } catch (err) {
        console.error('Supabase fetch error, using static fallback:', err);
        const flattened = StaticActivityData.flatMap(s => s.Activity1.map(a => ({
          activityTitle: a.activityTitle,
          badge: a.Semester || 'Activity',
          image: a.image,
          description: a.description,
          activitypic: a.activitypic || []
        })));
        setActivities(flattened);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className="min-h-screen py-24 px-6 max-w-7xl mx-auto flex flex-col">
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="w-full mb-12 flex flex-col md:flex-row items-end md:items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-slate-800 dark:text-white text-3xl md:text-4xl font-black tracking-tight">Activity Log</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">Explore my real-world events, workshops, and extracurricular side quests.</p>
          </div>
          
          <div className="flex gap-4">
            <div className="flex items-center gap-3 px-4 py-2 rounded-2xl border-2 border-border-color bg-white dark:bg-surface-dark shadow-sm">
              <div className="size-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xs shadow-inner">
                {activities.length}
              </div>
              <div>
                <p className="text-xs font-bold text-text-light uppercase">Total Activities</p>
                <p className="text-slate-800 dark:text-white font-black">{activities.length} Quests</p>
              </div>
            </div>
          </div>
        </div>

        {/* Unified Activities Grid */}
        <div className="w-full pb-12">
          {loading ? (
            <div className="w-full py-20 flex justify-center">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : activities.length === 0 ? (
            <div className="w-full py-16 flex flex-col items-center justify-center border-2 border-dashed border-border-color rounded-3xl bg-slate-50 dark:bg-slate-800/50">
              <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">hourglass_empty</span>
              <p className="text-slate-500 font-bold">No activities logged yet.</p>
            </div>
          ) : (
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activities.map((activity, index) => {
                const theme = colorThemes[index % colorThemes.length];
                const bgGradient = index % 3 === 0 
                  ? `radial-gradient(circle at center, ${theme.accent}15 0%, ${theme.accent}30 100%)`
                  : index % 3 === 1
                  ? "linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%)"
                  : "radial-gradient(circle at top right, #e0f2fe 0%, #bae6fd 100%)";

                return (
                  <div 
                    key={activity.activityTitle + index} 
                    className="group relative flex flex-col bg-white dark:bg-surface-dark border-2 border-border-color rounded-3xl overflow-hidden hover:scale-[1.02] hover:border-primary transition-all duration-300 shadow-card"
                  >
                    {/* Role / Timeline Badge */}
                    <div className="absolute top-4 right-4 z-10">
                      <span className={`bg-white/95 dark:bg-surface-dark/95 backdrop-blur text-neutral-dark dark:text-white border-2 border-${theme.name} px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm`}>
                        {activity.badge}
                      </span>
                    </div>

                    {/* Image Area */}
                    <div 
                      className="h-48 w-full flex items-center justify-center relative overflow-hidden cursor-pointer" 
                      style={{ background: bgGradient }}
                      onClick={() => openPreview(activity.activitypic && activity.activitypic.length > 0 ? activity.activitypic : [activity.image], 0)}
                    >
                      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `radial-gradient(${theme.accent} 1px, transparent 1px)`, backgroundSize: "20px 20px" }}></div>
                      <img
                        src={activity.image}
                        alt={activity.activityTitle}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://frpbnexgcxfjpsrlsylt.supabase.co/storage/v1/object/public/portfolio-assets/assets/Devinit/devinit.jpg";
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-xl font-black text-slate-800 dark:text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {activity.activityTitle}
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400 font-medium mb-6 text-sm flex-1 leading-relaxed">
                        {activity.description}
                      </p>

                      {/* Mini Gallery for Activity Pics */}
                      {activity.activitypic && activity.activitypic.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-white/5">
                          {activity.activitypic.slice(0, 3).map((pic, idx) => (
                            <img 
                              key={idx} 
                              src={pic} 
                              alt="gallery" 
                              onClick={() => openPreview(activity.activitypic, idx)}
                              className="w-10 h-10 rounded-lg object-cover border-2 border-border-color cursor-pointer hover:border-primary hover:scale-110 transition-all shadow-sm" 
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          ))}
                          {activity.activitypic.length > 3 && (
                            <div 
                              onClick={() => openPreview(activity.activitypic, 3)}
                              className="w-10 h-10 rounded-lg border-2 border-border-color bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-500 cursor-pointer hover:border-primary hover:text-primary hover:scale-110 transition-all shadow-sm"
                            >
                              +{activity.activitypic.length - 3}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Image Preview Modal (Lightbox) */}
      {previewData.isOpen && previewData.images.length > 0 && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in" 
          onClick={closePreview}
        >
          {/* Close Button */}
          <button 
            className="absolute top-4 right-4 md:top-6 md:right-6 text-white hover:text-primary transition-colors bg-black/50 hover:bg-white/20 rounded-full p-2 z-[110]" 
            onClick={closePreview}
          >
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>

          {/* Navigation Buttons */}
          {previewData.images.length > 1 && (
            <>
              <button 
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors bg-black/50 hover:bg-white/20 rounded-full p-3 z-[110]" 
                onClick={prevImage}
              >
                <span className="material-symbols-outlined text-3xl">chevron_left</span>
              </button>
              <button 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors bg-black/50 hover:bg-white/20 rounded-full p-3 z-[110]" 
                onClick={nextImage}
              >
                <span className="material-symbols-outlined text-3xl">chevron_right</span>
              </button>
            </>
          )}

          {/* Main Image */}
          <div className="relative max-w-4xl max-h-[85vh] flex flex-col items-center" onClick={e => e.stopPropagation()}>
            <img 
              src={previewData.images[previewData.currentIndex]} 
              alt={`preview ${previewData.currentIndex + 1}`} 
              className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl border border-white/20"
            />
            {/* Image Counter */}
            <div className="mt-4 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-sm font-bold border border-white/10">
              {previewData.currentIndex + 1} / {previewData.images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}