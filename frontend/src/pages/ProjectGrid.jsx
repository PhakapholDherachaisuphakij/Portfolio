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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('order_idx', { ascending: true })
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data && data.length > 0) {
          setProjects(
            data.map((p) => {
              let pic = resolveImageUrl(p.image_url);
              if (!pic || p.title?.toLowerCase().includes('brain')) pic = '/projects/pk-brain.png';
              return {
                projectname: p.title,
                description: p.description,
                techStack: p.tech_stack || [],
                picture: pic,
                experience: p.experience_text,
                link: p.link,
              };
            })
          );
        }
      } catch (err) {
        console.error('Projects fetch failed:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

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
              onClick={() => setSelectedProject(project)}
            />
          );
        })}
      </div>

      {/* Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] bg-paper rounded-[28px] overflow-hidden flex flex-col border border-hairline shadow-2xl text-ink"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-ink text-white hover:bg-cassette-red transition-colors"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>

            <div className="h-64 w-full relative overflow-hidden shrink-0 bg-ink">
              <img
                src={selectedProject.picture}
                alt={selectedProject.projectname}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-8 right-8 text-white">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-cassette-red text-white inline-block mb-2">
                  {selectedProject.link ? 'Live Deployment' : 'Case Study'}
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif">
                  {selectedProject.projectname}
                </h2>
              </div>
            </div>

            <div className="p-8 overflow-y-auto space-y-6 flex-1">
              <div>
                <h4 className="text-xs font-mono font-bold text-ink-muted uppercase tracking-widest mb-3">
                  Technologies Deployed
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(selectedProject.techStack || []).map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-paper-dark border-hairline text-xs font-mono font-bold text-ink"
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
                <p className="text-ink text-sm sm:text-base leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              {selectedProject.experience && (
                <div className="p-5 rounded-2xl bg-paper-dark border-hairline space-y-2">
                  <div className="text-xs font-mono font-bold text-cassette-red uppercase tracking-wider">
                    Engineering Insights
                  </div>
                  <p className="text-xs text-ink leading-relaxed">
                    {selectedProject.experience}
                  </p>
                </div>
              )}
            </div>

            <div className="p-5 border-hairline-t bg-paper-dark flex items-center justify-between gap-4">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2.5 rounded-full bg-paper hover:bg-white text-xs font-mono font-bold text-ink transition-all border-hairline"
              >
                Close
              </button>
              {selectedProject.link && (
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-full bg-cassette-red hover:brightness-110 text-white text-xs font-sans font-bold uppercase tracking-wider flex items-center gap-2"
                >
                  <span>Launch Live Site</span>
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
