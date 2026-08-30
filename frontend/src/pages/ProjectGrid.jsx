// src/pages/ProjectGrid.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { portfoliodata as StaticProjects, resolveImageUrl } from '../data/Data';
import { supabase } from '../lib/supabase';
import CassetteCard from '../components/cards/CassetteCard';

const colorCycle = ['red', 'yellow', 'cream', 'dark', 'blue', 'yellow', 'red', 'cream'];

export default function ProjectGrid() {
  const [projects, setProjects] = useState(StaticProjects);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2500);

        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('order_idx', { ascending: true })
          .order('created_at', { ascending: false })
          .abortSignal(controller.signal);

        clearTimeout(timeoutId);

        if (error) throw error;
        if (data && data.length > 0) {
          setProjects(
            data.map((p) => {
              let pic = resolveImageUrl(p.image_url) || 'https://res.cloudinary.com/jngcqfcu/image/upload/v1788086012/pk-brain-uploads/1787993100216-e11aa45b.png';
              let gal = Array.isArray(p.gallery) && p.gallery.length > 0
                ? p.gallery.map((url) => resolveImageUrl(url))
                : [pic];

              return {
                projectname: p.title,
                description: p.description,
                techStack: p.tech_stack || [],
                picture: pic,
                gallery: gal,
                experience: p.experience_text,
                link: p.link,
              };
            })
          );
        }
      } catch (err) {
        console.warn('Projects live fetch unreachable, using static CDN fallback');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const openProjectModal = (proj) => {
    setSelectedProject(proj);
    setActiveImageIdx(0);
  };

  const getProjectGallery = (proj) => {
    if (!proj) return [];
    if (Array.isArray(proj.gallery) && proj.gallery.length > 0) {
      return proj.gallery;
    }
    return proj.picture ? [proj.picture] : [];
  };

  return (
    <div className="min-h-screen bg-paper text-ink px-6 sm:px-12 py-12 max-w-[1440px] mx-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-8 mb-12 border-hairline-b">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-ink hover:text-cassette-red transition-colors"
        >
          <span>← Back to Index</span>
        </Link>
        <span className="text-xs font-mono text-ink-muted">
          Selected Projects Archive ({projects.length})
        </span>
      </div>

      {/* Heading */}
      <div className="mb-16 space-y-4">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
          <h1 className="text-editorial-lg font-serif text-ink tracking-tight">
            Pr<i>o</i>j<i>e</i>ct
          </h1>
          <div className="hidden md:block flex-1 h-px bg-hairline self-center mx-6"></div>
          <h1 className="text-editorial-lg font-serif text-ink tracking-tight md:text-right">
            Arch<i>i</i>ve
          </h1>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pb-20">
        {projects.map((project, idx) => {
          const theme = colorCycle[idx % colorCycle.length];
          const tag = project.techStack?.[0] || 'Web App';

          return (
            <CassetteCard
              key={project.projectname + idx}
              title={project.projectname}
              tag={tag}
              year="2025"
              index={String(idx + 1).padStart(2, '0')}
              theme={theme}
              image={project.picture}
              onClick={() => openProjectModal(project)}
            />
          );
        })}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[92vh] bg-paper rounded-[28px] overflow-hidden flex flex-col border border-hairline shadow-2xl text-ink"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Action Bar */}
            <div className="px-6 py-4 border-b border-hairline bg-paper-dark flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3 overflow-hidden">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-cassette-red text-white shrink-0">
                  {selectedProject.link ? 'Live Deployment' : 'Case Study'}
                </span>
                <h2 className="text-lg sm:text-xl font-bold font-sans truncate text-ink">
                  {selectedProject.projectname}
                </h2>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 rounded-full bg-ink text-white hover:bg-cassette-red transition-colors shrink-0 ml-3"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            {/* 100% Uncropped Full-Frame Media Stage */}
            {(() => {
              const gallery = getProjectGallery(selectedProject);
              const currentImg = gallery[activeImageIdx] || selectedProject.picture;

              return (
                <div className="relative w-full bg-neutral-950 flex flex-col shrink-0">
                  <div className="relative w-full h-[40vh] sm:h-[50vh] flex items-center justify-center p-3 sm:p-4 group">
                    <img
                      src={currentImg}
                      alt={selectedProject.projectname}
                      onClick={() => setFullscreenImage(currentImg)}
                      className="max-w-full max-h-full object-contain rounded-xl shadow-2xl border border-white/10 cursor-zoom-in transition-all duration-300 group-hover:scale-[1.01]"
                    />

                    {/* Fullscreen Zoom Hint */}
                    <button
                      onClick={() => setFullscreenImage(currentImg)}
                      className="absolute bottom-4 right-4 z-10 px-3 py-1.5 rounded-full bg-black/75 hover:bg-cassette-red text-white text-[11px] font-mono font-bold flex items-center gap-1.5 backdrop-blur-md border border-white/10 transition-all opacity-80 group-hover:opacity-100"
                    >
                      <span className="material-symbols-outlined text-sm">fullscreen</span>
                      <span>Full Image</span>
                    </button>

                    {/* Navigation Arrows if Multiple Images */}
                    {gallery.length > 1 && (
                      <>
                        <button
                          onClick={() => setActiveImageIdx((prev) => (prev - 1 + gallery.length) % gallery.length)}
                          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 text-white hover:bg-cassette-red transition-all backdrop-blur-md border border-white/10 hover:scale-110"
                        >
                          <span className="material-symbols-outlined text-lg">arrow_back</span>
                        </button>
                        <button
                          onClick={() => setActiveImageIdx((prev) => (prev + 1) % gallery.length)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 text-white hover:bg-cassette-red transition-all backdrop-blur-md border border-white/10 hover:scale-110"
                        >
                          <span className="material-symbols-outlined text-lg">arrow_forward</span>
                        </button>
                      </>
                    )}
                  </div>

                  {/* Thumbnail Strip */}
                  {gallery.length > 1 && (
                    <div className="px-6 py-3 bg-neutral-900 border-t border-white/10 flex items-center justify-center gap-3 overflow-x-auto">
                      <span className="text-[11px] font-mono text-neutral-400 font-bold uppercase shrink-0">
                        Gallery ({activeImageIdx + 1}/{gallery.length}):
                      </span>
                      <div className="flex items-center gap-2 overflow-x-auto py-1">
                        {gallery.map((imgUrl, i) => (
                          <button
                            key={i}
                            onClick={() => setActiveImageIdx(i)}
                            className={`relative h-14 w-24 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                              activeImageIdx === i
                                ? 'border-cassette-red scale-105 shadow-lg ring-2 ring-cassette-red/50'
                                : 'border-neutral-700 opacity-50 hover:opacity-100'
                            }`}
                          >
                            <img src={imgUrl} alt={`Thumb ${i + 1}`} className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Scrollable Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
              <div>
                <h4 className="text-xs font-mono font-bold text-ink-muted uppercase tracking-widest mb-3">
                  Technologies Deployed
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(selectedProject.techStack || []).map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-paper-dark border border-hairline text-xs font-mono font-bold text-ink"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono font-bold text-ink-muted uppercase tracking-widest mb-2">
                  Synopsis
                </h4>
                <p className="text-ink text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {selectedProject.description}
                </p>
              </div>

              {selectedProject.experience && (
                <div className="p-5 rounded-2xl bg-paper-dark border border-hairline space-y-2">
                  <div className="text-xs font-mono font-bold text-cassette-red uppercase tracking-wider">
                    Engineering Insights
                  </div>
                  <p className="text-xs sm:text-sm text-ink leading-relaxed whitespace-pre-line">
                    {selectedProject.experience}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-5 border-t border-hairline bg-paper-dark flex items-center justify-between gap-4 shrink-0">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2.5 rounded-full bg-paper hover:bg-white text-xs font-mono font-bold text-ink transition-all border border-hairline"
              >
                Close
              </button>
              {selectedProject.link && (
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-full bg-cassette-red hover:brightness-110 text-white text-xs font-sans font-bold uppercase tracking-wider flex items-center gap-2 shadow-md"
                >
                  <span>Launch Live Site</span>
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Image Lightbox Overlay */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 z-[2000] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 cursor-zoom-out animate-fade-in"
          onClick={() => setFullscreenImage(null)}
        >
          <button
            onClick={() => setFullscreenImage(null)}
            className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white/20 text-white hover:bg-cassette-red transition-all"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
          <img
            src={fullscreenImage}
            alt="Fullscreen view"
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl border border-white/10"
          />
        </div>
      )}
    </div>
  );
}
