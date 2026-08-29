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
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("order_idx", { ascending: true })
          .order("created_at", { ascending: false });

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
    <div className="min-h-screen flex flex-col py-24 px-6 max-w-7xl mx-auto text-left">
      {/* Hero Section */}
      <div className="w-full mb-12 flex flex-col md:flex-row items-end md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-slate-800 dark:text-white text-3xl md:text-4xl font-black tracking-tight">
            Projects & Case Studies
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">
            Explore PK's software architecture, web applications, and technical creations.
          </p>
        </div>

        <div className="flex gap-4">
          <div className="flex items-center gap-3 px-4 py-2 rounded-2xl border-2 border-border-color bg-white dark:bg-surface-dark shadow-sm">
            <div className="size-8 rounded-full bg-yellow-400 flex items-center justify-center text-white font-bold text-xs shadow-inner">
              {projects.length}
            </div>
            <div>
              <p className="text-xs font-bold text-text-light uppercase">
                Total Projects
              </p>
              <p className="text-slate-800 dark:text-white font-black">
                {projects.length} Works
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

              const hasLink = Boolean(project.link && project.link.trim() !== "" && project.link !== "#");

              return (
                <div
                  key={project.projectname + index}
                  onClick={() => setSelectedProject(project)}
                  className="group relative flex flex-col bg-white dark:bg-surface-dark border-2 border-border-color rounded-3xl overflow-hidden hover:scale-[1.02] hover:border-primary transition-all duration-300 shadow-card cursor-pointer"
                >
                  {/* Badge Tech (First item in stack) */}
                  <div className="absolute top-4 right-4 z-10 flex gap-1.5">
                    {!hasLink && (
                      <span className="bg-slate-800/90 backdrop-blur text-slate-300 border border-white/10 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider shadow-sm">
                        Case Study
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
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://frpbnexgcxfjpsrlsylt.supabase.co/storage/v1/object/public/portfolio-assets/assets/Project/yaiba.jfif";
                      }}
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="bg-white px-4 py-2 rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform flex items-center gap-1.5 text-xs font-bold text-slate-800">
                        <span>อ่านรายละเอียด</span>
                        <span className="material-symbols-outlined text-sm font-bold">
                          visibility
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-black text-slate-800 dark:text-white mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                      {project.projectname}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 font-medium mb-6 text-sm flex-1 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Stack List */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {(project.techStack || []).slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold border-b-2 border-slate-200 dark:border-slate-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Button */}
                    <div
                      className={`w-full h-11 rounded-2xl text-white font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all ${
                        hasLink
                          ? "bg-neutral-dark border-b-4 border-neutral-light group-hover:brightness-110 active:border-b-0 active:translate-y-1"
                          : "bg-slate-700/80 border-b-2 border-slate-600 text-slate-200"
                      }`}
                    >
                      <span>{hasLink ? "Explore & Case Study" : "View Case Study"}</span>
                      <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                        arrow_forward
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>

      {/* PROJECT CASE STUDY DETAIL MODAL */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] bg-white dark:bg-[#12141e] border-2 border-border-color dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>

            {/* Modal Hero Banner */}
            <div className="h-56 w-full relative overflow-hidden bg-black shrink-0">
              <img
                src={selectedProject.picture}
                alt={selectedProject.projectname}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://frpbnexgcxfjpsrlsylt.supabase.co/storage/v1/object/public/portfolio-assets/assets/Project/yaiba.jfif";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6">
                <div className="space-y-1">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/20 text-primary border border-primary/30">
                    {selectedProject.link ? "Live Project" : "Architecture Case Study"}
                  </span>
                  <h2 className="text-2xl font-black text-white">
                    {selectedProject.projectname}
                  </h2>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 flex-1">
              {/* Tech Stack Chips */}
              <div>
                <h4 className="text-xs font-bold text-text-light uppercase tracking-wider mb-2">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(selectedProject.techStack || []).map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Description */}
              <div>
                <h4 className="text-xs font-bold text-text-light uppercase tracking-wider mb-1.5">
                  Project Overview
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              {/* Experience & Key Learnings */}
              {selectedProject.experience && (
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider">
                    <span className="material-symbols-outlined text-sm">psychology</span>
                    <span>Engineering Insights & Experience</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {selectedProject.experience}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0e1017] flex items-center justify-between gap-3">
              <span className="text-xs text-slate-500 font-medium">
                {selectedProject.link ? "พร้อมเข้าชมตัวอย่างสด" : "โปรเจกต์เชิงสถาปัตยกรรมภายใน"}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-white/5 hover:bg-slate-300 dark:hover:bg-white/10 text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors"
                >
                  ปิดหน้าต่าง
                </button>
                {selectedProject.link && (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all"
                  >
                    <span>เปิดดูเว็บไซต์จริง</span>
                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
