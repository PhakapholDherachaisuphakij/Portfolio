import { useState, useEffect } from 'react';
import Hero from "../components/home/Hero";
import { portfoliodata as StaticProjects } from "../data/Data";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [featuredProjects, setFeaturedProjects] = useState(StaticProjects.slice(0, 2));

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("order_idx", { ascending: true })
          .limit(2);
        
        if (data && data.length > 0) {
          const formatted = data.map((p) => ({
            projectname: p.title,
            description: p.description,
            techStack: p.tech_stack || [],
            picture: p.image_url,
            link: p.link,
          }));
          setFeaturedProjects(formatted);
        }
      } catch (err) {
        console.error("Featured fetch failed:", err);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="flex flex-col">
      <Hero />
      
      {/* Featured Projects Section */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <span className="w-12 h-[2px] bg-primary rounded-full" />
                 <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px]">Prime Selection</span>
              </div>
              <h2 className="text-4xl md:text-7xl font-black text-neutral-dark tracking-tighter">
                Featured <span className="text-primary-dark/30 italic">Quests</span>
              </h2>
            </div>
            <a href="/quests" className="group flex items-center gap-2 text-neutral-dark font-black uppercase text-xs tracking-widest border-b-2 border-primary/20 hover:border-primary pb-2 transition-all">
              Examine All Quests
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_right_alt</span>
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {featuredProjects.map((project, idx) => (
              <a 
                href={project.link} 
                target="_blank" 
                key={idx} 
                className="group relative block bg-background-light rounded-[3rem] overflow-hidden border border-neutral-light/10 shadow-premium hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2"
              >
                 <div className="aspect-[16/10] overflow-hidden">
                    <img 
                      src={project.picture} 
                      alt={project.projectname} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                    />
                 </div>
                 <div className="p-8 md:p-12">
                    <div className="flex flex-wrap gap-2 mb-6">
                       {project.techStack?.slice(0, 3).map(tech => (
                          <span key={tech} className="px-3 py-1 bg-white border border-neutral-light/10 rounded-full text-[10px] font-black text-neutral-mid uppercase tracking-wider">{tech}</span>
                       ))}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-neutral-dark mb-4 group-hover:text-primary transition-colors">{project.projectname}</h3>
                    <p className="text-neutral-mid font-medium leading-relaxed mb-8 line-clamp-2">{project.description}</p>
                    <div className="flex items-center gap-3 text-primary-dark font-black uppercase text-xs tracking-[0.2em]">
                       Explore Experience
                       <span className="material-symbols-outlined text-sm">north_east</span>
                    </div>
                 </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Decorative Branding Line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-neutral-light/20 to-transparent" />
    </div>
  );
}