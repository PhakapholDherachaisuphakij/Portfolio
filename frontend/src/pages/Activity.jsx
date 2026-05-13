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
  const [activityData, setActivityData] = useState([]);
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
          .order('order_idx', { ascending: true });

        if (error) throw error;

        // Group by semester to match legacy structure
        const grouped = (data || []).reduce((acc, curr) => {
          const semester = curr.semester || 'Other';
          if (!acc[semester]) acc[semester] = [];
          acc[semester].push({
            activityTitle: curr.title,
            Semester: curr.period_label,
            image: curr.main_image,
            description: curr.description,
            activitypic: curr.gallery || []
          });
          return acc;
        }, {});

        const formatted = Object.keys(grouped).map(sem => ({
          Semester: sem,
          Activity1: grouped[sem]
        }));
        
        // Merge: Static first, then Dynamic
        setActivityData([...StaticActivityData, ...formatted]);
      } catch (err) {
        console.error('Supabase fetch error, using static fallback:', err);
        setActivityData(StaticActivityData);
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
            <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">Explore my real-world events and side quests.</p>
          </div>
          
          <div className="flex gap-4">
            <div className="flex items-center gap-3 px-4 py-2 rounded-2xl border-2 border-border-color bg-white dark:bg-surface-dark">
              <div className="size-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xs shadow-inner">LVL</div>
              <div>
                <p className="text-xs font-bold text-text-light uppercase">Social Rank</p>
                <p className="text-slate-800 dark:text-white font-black">Veteran</p>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Sections mapped by Semester */}
        <div className="w-full flex flex-col gap-16 pb-12">
          {loading ? (
             <div className="w-full py-20 flex justify-center">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
             </div>
          ) : (
            activityData.map((semesterGroup, groupIndex) => (
              <div key={groupIndex} className="flex flex-col gap-6">
                
                {/* Semester Title Badge */}
                <div className="flex items-center gap-4">
                  <div className="h-2 flex-1 bg-border-color rounded-full"></div>
                  <h2 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-wider px-4 py-2 border-2 border-border-color rounded-xl bg-white dark:bg-surface-dark shadow-sm">
                    {semesterGroup.Semester}
                  </h2>
                  <div className="h-2 flex-1 bg-border-color rounded-full"></div>
                </div>

                {/* Check if there are activities in this semester */}
                {semesterGroup.Activity1.length === 0 ? (
                  <div className="w-full py-12 flex flex-col items-center justify-center border-2 border-dashed border-border-color rounded-3xl bg-slate-50 dark:bg-slate-800/50">
                    <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">hourglass_empty</span>
                    <p className="text-slate-500 font-bold">No quests logged for this period yet.</p>
                  </div>
                ) : (
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {semesterGroup.Activity1.map((activity, index) => {
                      const theme = colorThemes[index % colorThemes.length];
                      const bgGradient = index % 3 === 0 
                        ? `radial-gradient(circle at center, ${theme.accent}15 0%, ${theme.accent}30 100%)`
                        : index % 3 === 1
                        ? "linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%)"
                        : "radial-gradient(circle at top right, #e0f2fe 0%, #bae6fd 100%)";

                      return (
                        <div 
                          key={activity.activityTitle} 
                          className="group relative flex flex-col bg-white dark:bg-surface-dark border-2 border-border-color rounded-3xl overflow-hidden hover:scale-[1.02] hover:border-primary transition-all duration-300 shadow-card"
                        >
                          {/* Timeline Badge */}
                          <div className="absolute top-4 right-4 z-10">
                            <span className={`bg-white/90 backdrop-blur text-neutral-dark border-2 border-${theme.name} px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm`}>
                              {activity.Semester}
                            </span>
                          </div>

                          {/* Image Area */}
                          <div className="h-48 w-full flex items-center justify-center relative overflow-hidden" style={{ background: bgGradient }}>
                            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `radial-gradient(${theme.accent} 1px, transparent 1px)`, backgroundSize: "20px 20px" }}></div>
                            <img
                              src={activity.image}
                              alt={activity.activityTitle}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>

                          {/* Content */}
                          <div className="p-6 flex flex-col flex-1">
                            <h3 className="text-xl font-black text-slate-800 dark:text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                              {activity.activityTitle}
                            </h3>
                            <p className="text-slate-500 dark:text-slate-400 font-medium mb-6 text-sm flex-1">
                              {activity.description}
                            </p>

                            {/* Mini Gallery for Activity Pics */}
                            {activity.activitypic && activity.activitypic.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-4">
                                {/* โชว์ 3 รูปแรก */}
                                {activity.activitypic.slice(0, 3).map((pic, idx) => (
                                  <img 
                                    key={idx} 
                                    src={pic} 
                                    alt="gallery" 
                                    onClick={() => openPreview(activity.activitypic, idx)}
                                    className="w-10 h-10 rounded-lg object-cover border-2 border-border-color cursor-pointer hover:border-primary hover:scale-110 transition-all" 
                                  />
                                ))}
                                {/* ปุ่มกดดูรูปที่เหลือ */}
                                {activity.activitypic.length > 3 && (
                                  <div 
                                    onClick={() => openPreview(activity.activitypic, 3)}
                                    className="w-10 h-10 rounded-lg border-2 border-border-color bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-500 cursor-pointer hover:border-primary hover:text-primary hover:scale-110 transition-all"
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
            ))
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

          {/* Navigation Buttons (แสดงเมื่อมีรูปมากกว่า 1) */}
          {previewData.images.length > 1 && (
            <>
              <button 
                className="absolute left-2 md:left-10 text-white hover:text-primary transition-colors bg-black/50 hover:bg-white/20 rounded-full p-2 z-[110]" 
                onClick={prevImage}
              >
                <span className="material-symbols-outlined text-3xl md:text-4xl">chevron_left</span>
              </button>
              <button 
                className="absolute right-2 md:right-10 text-white hover:text-primary transition-colors bg-black/50 hover:bg-white/20 rounded-full p-2 z-[110]" 
                onClick={nextImage}
              >
                <span className="material-symbols-outlined text-3xl md:text-4xl">chevron_right</span>
              </button>
            </>
          )}

          {/* Main Preview Image */}
          <img 
            src={previewData.images[previewData.currentIndex]} 
            alt="Preview Modal" 
            className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl transition-all"
            onClick={(e) => e.stopPropagation()} // กดที่รูปแล้ว Modal จะไม่ปิด
          />

          {/* Indicator Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white font-bold bg-black/60 px-6 py-2 rounded-full tracking-widest text-sm backdrop-blur-md">
            {previewData.currentIndex + 1} / {previewData.images.length}
          </div>
        </div>
      )}

    </div>
  );
}