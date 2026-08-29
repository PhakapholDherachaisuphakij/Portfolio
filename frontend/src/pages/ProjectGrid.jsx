import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { portfoliodata as StaticProjects } from "../data/Data";
import { supabase } from "../lib/supabase";

// สีสำหรับ card แต่ละใบ (วนลูป)
const colorThemes = [
  {
    name: "secondary-purple",
    dark: "secondary-purple-dark",
    accent: "#ce82ff",
  },
  {
    name: "secondary-orange",
    dark: "secondary-orange-dark",
    accent: "#f59e0b",
  },
  { name: "secondary-blue", dark: "secondary-blue-dark", accent: "#3b82f6" },
];

export default function ProjectGrid() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("order_idx", { ascending: true });

        if (error) throw error;

        if (data && data.length > 0) {
          const formatted = data.map((p) => ({
            projectname: p.title,
            description: p.description,
            techStack: p.tech_stack || [],
            picture: p.image_url,
            experience: p.experience_text,
            link: p.link,
          }));
          setProjects(formatted);
        } else {
          setProjects(StaticProjects);
        }
      } catch (err) {
        console.error("Supabase fetch error, using static fallback:", err);
        setProjects(StaticProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen flex flex-col py-24 px-6 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="w-full mb-12 flex flex-col md:flex-row items-end md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-slate-800 dark:text-white text-3xl md:text-4xl font-black tracking-tight">
            Select a Project
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">
            Choose a project to explore PK's skills.
          </p>
        </div>

        <div className="flex gap-4">
          <div className="flex items-center gap-3 px-4 py-2 rounded-2xl border-2 border-border-color bg-white dark:bg-surface-dark">
            <div className="size-8 rounded-full bg-yellow-400 flex items-center justify-center text-white font-bold text-xs shadow-inner">
              XP
            </div>
            <div>
              <p className="text-xs font-bold text-text-light uppercase">
                Total XP
              </p>
              <p className="text-slate-800 dark:text-white font-black">
                15,420
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Project Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
          {loading ? (
            <div className="col-span-full py-20 flex justify-center">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            projects.map((project, index) => {
              const theme = colorThemes[index % colorThemes.length];
              const bgGradient =
                index % 3 === 0
                  ? `radial-gradient(circle at center, ${theme.accent}15 0%, ${theme.accent}30 100%)`
                  : index % 3 === 1
                    ? "linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%)"
                    : "radial-gradient(circle at top right, #e0f2fe 0%, #bae6fd 100%)";

              const hasLink = Boolean(project.link && project.link.trim() !== '' && project.link !== '#');
              const CardWrapper = hasLink ? 'a' : 'div';
              const wrapperProps = hasLink
                ? {
                    href: project.link,
                    target: '_blank',
                    rel: 'noopener noreferrer'
                  }
                : {};

              return (
                <CardWrapper
                  key={project.projectname}
                  {...wrapperProps}
                  className={`group relative flex flex-col bg-white dark:bg-surface-dark border-2 border-border-color rounded-3xl overflow-hidden transition-all duration-300 shadow-card ${
                    hasLink ? 'hover:scale-[1.02] hover:border-primary cursor-pointer' : 'cursor-default'
                  }`}
                >
                  {/* Badge Tech (First item in stack) */}
                  <div className="absolute top-4 right-4 z-10 flex gap-1.5">
                    {!hasLink && (
                      <span className="bg-slate-800/90 backdrop-blur text-slate-300 border border-white/10 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider shadow-sm">
                        Archived / Internal
                      </span>
                    )}
                    {project.techStack && project.techStack[0] && (
                      <span
                        className={`bg-white/90 dark:bg-surface-dark/90 backdrop-blur text-neutral-dark dark:text-white border-2 border-${theme.name} px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm`}
                      >
                        {project.techStack[0]}
                      </span>
                    )}
                  </div>

                  {/* Image Area */}
                  <div
                    className="h-48 w-full flex items-center justify-center relative overflow-hidden"
                    style={{ background: bgGradient }}
                  >
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: `radial-gradient(${theme.accent} 1px, transparent 1px)`,
                        backgroundSize: "20px 20px",
                      }}
                    ></div>
                    <img
                      src={project.picture}
                      alt={project.projectname}
                      className={`w-full h-full object-cover transition-transform duration-500 ${hasLink ? 'group-hover:scale-110' : ''}`}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://frpbnexgcxfjpsrlsylt.supabase.co/storage/v1/object/public/portfolio-assets/assets/Project/yaiba.jfif";
                      }}
                    />
                    {/* Hover Overlay */}
                    {hasLink && (
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="bg-white p-3 rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
                          <span className="material-symbols-outlined text-primary font-bold">
                            open_in_new
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className={`text-xl font-black text-slate-800 dark:text-white mb-2 line-clamp-1 transition-colors ${hasLink ? 'group-hover:text-primary' : ''}`}>
                      {project.projectname}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 font-medium mb-6 text-sm flex-1 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tech Stack List */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {(project.techStack || []).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold border-b-2 border-slate-200 dark:border-slate-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Pseudo Button */}
                    <div
                      className={`w-full h-12 rounded-2xl text-white font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                        hasLink 
                          ? 'bg-neutral-dark border-b-4 border-neutral-light group-hover:brightness-110 active:border-b-0 active:translate-y-1'
                          : 'bg-slate-700/60 border-b-2 border-slate-600/40 text-slate-300 cursor-default text-xs'
                      }`}
                    >
                      <span>{hasLink ? 'Enter Quest' : 'Overview Only'}</span>
                      {hasLink && (
                        <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                          arrow_forward
                        </span>
                      )}
                    </div>
                  </div>
                </CardWrapper>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}
