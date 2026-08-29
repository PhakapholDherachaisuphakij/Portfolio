// src/pages/Home.jsx
import { useState, useEffect } from "react";
import { supabase, PROJECT_REF } from "../lib/supabase";
import {
  portfoliodata as StaticProjects,
  ActivityData as StaticActivities,
  initialFlattenedActivities,
  experience as StaticExp,
  skills as StaticSkills,
  socialLinks as StaticSocial,
  playerInfo as StaticPlayer,
  starterPackImages,
  resolveImageUrl,
} from "../data/Data";
import ConstanceHeader from "../components/common/ConstanceHeader";
import CassetteCard from "../components/cards/CassetteCard";
import ActivityCard from "../components/cards/ActivityCard";

const colorCycle = [
  "red",
  "yellow",
  "cream",
  "dark",
  "blue",
  "yellow",
  "red",
  "cream",
];

export default function Home() {
  const [projects, setProjects] = useState(StaticProjects);
  const [activities, setActivities] = useState(initialFlattenedActivities);
  const [experience, setExperience] = useState(StaticExp);
  const [skills, setSkills] = useState(StaticSkills);
  const [profile, setProfile] = useState(StaticPlayer);
  const [socialLinks, setSocialLinks] = useState(StaticSocial);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(0);

  // Form State
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Projects
        const { data: pData } = await supabase
          .from("projects")
          .select("*")
          .order("order_idx", { ascending: true })
          .order("created_at", { ascending: false });

        if (pData && pData.length > 0) {
          setProjects(
            pData.map((p) => {
              let pic = resolveImageUrl(p.image_url) || "/projects/pk-brain.png";
              return {
                projectname: p.title,
                description: p.description,
                techStack: p.tech_stack || [],
                picture: pic,
                experience: p.experience_text,
                link: p.link,
              };
            }),
          );
        }

        // Fetch Activities
        const { data: aData } = await supabase
          .from("activities")
          .select("*")
          .order("order_idx", { ascending: true })
          .order("created_at", { ascending: false });

        if (aData && aData.length > 0) {
          setActivities(
            aData.map((a) => {
              let rawPics =
                a.gallery && a.gallery.length > 0
                  ? a.gallery
                  : a.main_image
                    ? [a.main_image]
                    : [];

              let pics = rawPics.map(img => resolveImageUrl(img));

              return {
                activityTitle: a.title,
                badge: a.period_label || a.semester || "Activity",
                image: pics[0] || resolveImageUrl(a.main_image),
                description: a.description,
                activitypic: pics,
              };
            }),
          );
        } else {
          const flattened = StaticActivities.flatMap((s) =>
            s.Activity1.map((a) => ({
              activityTitle: a.activityTitle,
              badge: a.Semester || "Activity",
              image: a.image,
              description: a.description,
              activitypic: a.activitypic || [],
            })),
          );
          setActivities(flattened);
        }

        // Fetch Experience
        const { data: eData } = await supabase
          .from("experience")
          .select("*")
          .order("order_idx");
        if (eData && eData.length > 0) setExperience(eData);

        // Fetch Skills
        const { data: sData } = await supabase
          .from("skills")
          .select("*")
          .order("order_idx");
        if (sData && sData.length > 0) {
          setSkills(
            sData.map((s) => ({
              name: s.name,
              progress: s.progress,
              image: s.image_url,
            })),
          );
        }

        // Fetch Profile
        const { data: profData } = await supabase
          .from("profiles")
          .select("*")
          .limit(1)
          .maybeSingle();
        if (profData) {
          setProfile({
            nickname: profData.nickname || StaticPlayer.nickname,
            role: profData.role || StaticPlayer.role,
            quote: profData.quote || StaticPlayer.quote,
          });
        }
      } catch (err) {
        console.error("Data load error:", err);
      }
    };
    fetchData();
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: contactForm.name,
          email: contactForm.email,
          message: contactForm.message,
          subject: `🚀 [PK Portfolio] New Message from ${contactForm.name}`,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setSubmitStatus("success");
        setContactForm({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (err) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-paper text-ink flex flex-col font-sans selection:bg-cassette-red selection:text-white"
      id="top"
    >
      {/* 1. Header (Constance Souville Telemetry & Navigation) */}
      <ConstanceHeader />

      <main className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 flex-1">
        {/* 2. Intro Statement Section (TitleLines) */}
        <section className="py-16 sm:py-24 border-hairline-b">
          <div className="space-y-6 sm:space-y-8">
            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
              <h2 className="text-editorial-lg font-serif text-ink tracking-tight">
                Fr<i>o</i>ntend
              </h2>
              <div className="hidden md:block flex-1 h-px bg-hairline self-center mx-6"></div>
              <h2 className="text-editorial-lg font-serif text-ink tracking-tight md:text-right">
                D<i>e</i>v<i>e</i>loper
              </h2>
            </div>

            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
              <h2 className="text-editorial-lg font-serif text-ink tracking-tight">
                B<i>a</i>sed
              </h2>
              <div className="hidden md:block flex-1 h-px bg-hairline self-center mx-6"></div>
              <h2 className="text-editorial-lg font-serif text-ink tracking-tight md:text-right">
                in B<i>a</i>ngkok
              </h2>
            </div>
          </div>
        </section>

        {/* 3. About Section (#about) */}
        <section className="py-20 sm:py-28 border-hairline-b" id="about">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Big Serif Quote */}
            <div className="lg:col-span-5 space-y-6">
              <p className="text-3xl sm:text-5xl font-serif text-ink leading-tight">
                I craft websites with a{" "}
                <em className="italic text-cassette-red font-serif">
                  great attention
                </em>{" "}
                to details.
              </p>
              <p className="text-xs font-mono text-ink-muted uppercase tracking-widest">
                Philosophy & Architecture
              </p>
            </div>

            {/* Right Bio & Experience Ledger Table */}
            <div className="lg:col-span-7 space-y-12">
              <div className="space-y-4 text-base sm:text-lg text-ink font-normal leading-relaxed">
                <p>
                  I specialize in front-end web development, building
                  high-concurrency systems, interactive 2D/3D visual
                  experiences, and responsive layouts.
                </p>
                <p className="text-sm text-ink-muted font-mono">
                  Technologies commonly deployed: React, Next.js, Three.js,
                  GSAP, Tailwind CSS, TypeScript, Supabase, WebAssembly, Vite.
                </p>
              </div>

              {/* Experience Ledger (Constance Souville Line Table) */}
              <div className="space-y-4 pt-4 border-hairline-t">
                <p className="text-xs font-mono font-bold uppercase tracking-widest text-ink mb-6">
                  Journey & Track Record
                </p>

                {experience.map((exp, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 py-3 border-hairline-b text-sm font-sans"
                  >
                    <span className="font-bold text-ink sm:w-1/3">
                      {exp.company || exp.title}
                    </span>
                    <span className="text-xs font-mono text-ink-muted sm:w-1/3 text-left sm:text-center">
                      {exp.title}
                    </span>
                    <span className="text-xs font-mono font-bold text-ink sm:w-1/3 text-left sm:text-right">
                      {exp.period}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. Selected Projects Section (#projects) */}
        <section className="py-20 sm:py-28 border-hairline-b" id="projects">
          {/* Section Heading TitleLines */}
          <div className="mb-16 space-y-4">
            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
              <h2 className="text-editorial-lg font-serif text-ink tracking-tight">
                S<i>e</i>l<i>e</i>cted
              </h2>
              <div className="hidden md:block flex-1 h-px bg-hairline self-center mx-6"></div>
              <h2 className="text-editorial-lg font-serif text-ink tracking-tight md:text-right">
                Pr<i>o</i>j<i>e</i>cts
              </h2>
            </div>
            <div className="flex justify-between items-center text-xs font-mono text-ink-muted">
              <span>(2020 — Today)</span>
              <span>{projects.length} Works Cataloged</span>
            </div>
          </div>

          {/* Staggered Cassette Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((project, idx) => {
              const theme = colorCycle[idx % colorCycle.length];
              const tag = project.techStack?.[0] || "Web Application";

              return (
                <CassetteCard
                  key={project.projectname + idx}
                  title={project.projectname}
                  tag={tag}
                  year="2025"
                  index={String(idx + 1).padStart(2, "0")}
                  theme={theme}
                  image={project.picture}
                  onClick={() => setSelectedProject(project)}
                />
              );
            })}
          </div>
        </section>

        {/* 5. Activities Section (#activities) */}
        <section className="py-20 sm:py-28 border-hairline-b" id="activities">
          <div className="mb-16 space-y-4">
            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
              <h2 className="text-editorial-lg font-serif text-ink tracking-tight">
                Act<i>i</i>v<i>i</i>ties
              </h2>
              <div className="hidden md:block flex-1 h-px bg-hairline self-center mx-6"></div>
              <h2 className="text-editorial-lg font-serif text-ink tracking-tight md:text-right">
                & S<i>i</i>de Qu<i>e</i>sts
              </h2>
            </div>
            <div className="flex justify-between items-center text-xs font-mono text-ink-muted">
              <span>Hackathons, Developer Talks & Workshops</span>
              <span>{activities.length} Records</span>
            </div>
          </div>

          {/* Activities Grid (Multi-Photo Contact Sheets) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {activities.map((activity, idx) => {
              const theme = idx % 2 === 0 ? "cream" : "yellow";

              return (
                <ActivityCard
                  key={activity.activityTitle + idx}
                  title={activity.activityTitle}
                  badge={activity.badge || "Workshop"}
                  year="2024"
                  index={String(idx + 1).padStart(2, "0")}
                  theme={theme}
                  images={activity.activitypic}
                  description={activity.description}
                  onClick={() => {
                    setSelectedActivity(activity);
                    setActiveLightboxIndex(0);
                  }}
                />
              );
            })}
          </div>
        </section>
      </main>

      {/* 6. Contact & Socials Section (Inverted Dark Section #contact) */}
      <section
        className="w-full bg-darkwrap text-white py-24 px-6 sm:px-12 mt-12 rounded-t-[32px] sm:rounded-t-[48px]"
        id="contact"
      >
        <div className="max-w-[1440px] mx-auto space-y-16">
          <div className="max-w-3xl space-y-6">
            <span className="px-4 py-1.5 rounded-full bg-white/10 text-xs font-mono uppercase tracking-widest text-cassette-yellow border border-white/10">
              Get in touch
            </span>
            <p className="text-2xl sm:text-4xl font-serif leading-snug">
              I'm available for freelance projects and forward-thinking teams.
              Feel free to reach out to collaborate or start a conversation.
            </p>
          </div>

          {/* Contact & Social Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Email Card */}
            <a
              href="mailto:godzk25@gmail.com"
              className="cassette-card bg-darkwrap-card text-white border-hairline-dark p-8 flex flex-col justify-between min-h-[220px] hover:bg-cassette-red hover:border-transparent transition-all group"
            >
              <div className="flex justify-between font-mono text-xs text-neutral-400 group-hover:text-white/80">
                <span>Direct Mail</span>
                <span>EM</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight">
                godzk25@gmail.com
              </h3>
              <div className="flex justify-between font-mono text-xs text-neutral-400 group-hover:text-white/80 underline underline-offset-4">
                <span>Send Email</span>
                <span>↗</span>
              </div>
            </a>

            {/* LinkedIn Card */}
            <a
              href="https://www.linkedin.com/in/phakaphol-dhera/"
              target="_blank"
              rel="noreferrer"
              className="cassette-card bg-darkwrap-card text-white border-hairline-dark p-8 flex flex-col justify-between min-h-[220px] hover:bg-cassette-blue hover:border-transparent transition-all group"
            >
              <div className="flex justify-between font-mono text-xs text-neutral-400 group-hover:text-white/80">
                <span>Network</span>
                <span>LI</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight">
                LinkedIn Profile
              </h3>
              <div className="flex justify-between font-mono text-xs text-neutral-400 group-hover:text-white/80 underline underline-offset-4">
                <span>Connect</span>
                <span>↗</span>
              </div>
            </a>

            {/* GitHub Card */}
            <a
              href="https://github.com/PhakapholDherachaisuphakij"
              target="_blank"
              rel="noreferrer"
              className="cassette-card bg-darkwrap-card text-white border-hairline-dark p-8 flex flex-col justify-between min-h-[220px] hover:bg-cassette-yellow hover:text-ink hover:border-transparent transition-all group"
            >
              <div className="flex justify-between font-mono text-xs text-neutral-400 group-hover:text-ink/75">
                <span>Open Source</span>
                <span>GH</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight">
                GitHub Repository
              </h3>
              <div className="flex justify-between font-mono text-xs text-neutral-400 group-hover:text-ink/75 underline underline-offset-4">
                <span>Follow</span>
                <span>↗</span>
              </div>
            </a>

            {/* Borntodev Card */}
            <a
              href="https://www.borntodev.com/author/godzk25gmail-com/"
              target="_blank"
              rel="noreferrer"
              className="cassette-card bg-darkwrap-card text-white border-hairline-dark p-8 flex flex-col justify-between min-h-[220px] hover:bg-[#ff7700] hover:text-white hover:border-transparent transition-all group"
            >
              <div className="flex justify-between font-mono text-xs text-neutral-400 group-hover:text-white/80">
                <span>Author & Blogger</span>
                <span>BD</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight">
                Borntodev Blog
              </h3>
              <div className="flex justify-between font-mono text-xs text-neutral-400 group-hover:text-white/80 underline underline-offset-4">
                <span>Read Articles</span>
                <span>↗</span>
              </div>
            </a>

            {/* Facebook Card */}
            <a
              href="https://www.facebook.com/phakaphol.dherachaisuphakij/"
              target="_blank"
              rel="noreferrer"
              className="cassette-card bg-darkwrap-card text-white border-hairline-dark p-8 flex flex-col justify-between min-h-[220px] hover:bg-[#1877f2] hover:border-transparent transition-all group"
            >
              <div className="flex justify-between font-mono text-xs text-neutral-400 group-hover:text-white/80">
                <span>Social Network</span>
                <span>FB</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight">
                Facebook Profile
              </h3>
              <div className="flex justify-between font-mono text-xs text-neutral-400 group-hover:text-white/80 underline underline-offset-4">
                <span>Visit Page</span>
                <span>↗</span>
              </div>
            </a>

            {/* Instagram Card */}
            <a
              href="https://www.instagram.com/pk._tcsk/"
              target="_blank"
              rel="noreferrer"
              className="cassette-card bg-darkwrap-card text-white border-hairline-dark p-8 flex flex-col justify-between min-h-[220px] hover:bg-gradient-to-tr hover:from-[#f58529] hover:via-[#dd2a7b] hover:to-[#8134af] hover:border-transparent transition-all group"
            >
              <div className="flex justify-between font-mono text-xs text-neutral-400 group-hover:text-white/80">
                <span>Life & Moments</span>
                <span>IG</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight">
                Instagram @pk._tcsk
              </h3>
              <div className="flex justify-between font-mono text-xs text-neutral-400 group-hover:text-white/80 underline underline-offset-4">
                <span>Follow</span>
                <span>↗</span>
              </div>
            </a>
          </div>

          {/* Direct Transmission Form */}
          <div className="pt-12 border-hairline-t-dark">
            <div className="max-w-2xl mx-auto space-y-8">
              <h3 className="text-2xl font-serif text-center">Quick Message</h3>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                {submitStatus === "success" && (
                  <div className="p-4 rounded-xl bg-emerald-500/20 text-emerald-300 font-mono text-xs text-center border border-emerald-500/30">
                    Message dispatched successfully! I will reply to you soon.
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="p-4 rounded-xl bg-rose-500/20 text-rose-300 font-mono text-xs text-center border border-rose-500/30">
                    Transmission failed. Please email directly to
                    godzk25@gmail.com
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, name: e.target.value })
                    }
                    placeholder="Your Name"
                    className="w-full bg-darkwrap-card border border-hairline-dark rounded-xl px-4 py-3.5 text-xs font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-cassette-yellow"
                  />
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, email: e.target.value })
                    }
                    placeholder="Your Email"
                    className="w-full bg-darkwrap-card border border-hairline-dark rounded-xl px-4 py-3.5 text-xs font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-cassette-yellow"
                  />
                </div>

                <textarea
                  required
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, message: e.target.value })
                  }
                  placeholder="Tell me about your project..."
                  className="w-full bg-darkwrap-card border border-hairline-dark rounded-xl p-4 text-xs font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-cassette-yellow resize-none"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-cassette-red hover:brightness-110 text-white font-sans font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>

          {/* Footer Bar */}
          <footer className="pt-16 pb-8 border-hairline-t-dark flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-400">
            <a
              href="#top"
              className="hover:text-white underline underline-offset-4 decoration-hairline"
            >
              Back to top ↑
            </a>
            <div className="text-center sm:text-right">
              © {new Date().getFullYear()} Phakaphol Dherachaisuphakij —
              Designed with inspiration from Constance Souville
            </div>
          </footer>
        </div>
      </section>

      {/* Case Study Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] bg-paper rounded-[28px] overflow-hidden flex flex-col border border-hairline shadow-2xl text-ink"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-ink text-white hover:bg-cassette-red transition-colors"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>

            {/* Media Banner */}
            <div className="h-64 w-full relative overflow-hidden shrink-0 bg-ink">
              <img
                src={selectedProject.picture}
                alt={selectedProject.projectname}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/projects/pk-brain.png";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-8 right-8 text-white">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-cassette-red text-white inline-block mb-2">
                  {selectedProject.link ? "Live Deployment" : "Case Study"}
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif">
                  {selectedProject.projectname}
                </h2>
              </div>
            </div>

            {/* Content */}
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

            {/* Footer */}
            <div className="p-5 border-hairline-t bg-paper-dark flex items-center justify-between gap-4">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2.5 rounded-full bg-paper hover:bg-white text-xs font-mono font-bold text-ink transition-all border-hairline"
              >
                Close Window
              </button>
              {selectedProject.link && (
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-full bg-cassette-red hover:brightness-110 text-white text-xs font-sans font-bold uppercase tracking-wider flex items-center gap-2"
                >
                  <span>Launch Live Site</span>
                  <span className="material-symbols-outlined text-sm">
                    open_in_new
                  </span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Full Immersive Activity Gallery Lightbox */}
      {selectedActivity && (
        <div
          className="fixed inset-0 z-[1000] flex flex-col items-center justify-between p-4 sm:p-6 bg-black/90 backdrop-blur-lg animate-fade-in text-white select-none"
          onClick={() => setSelectedActivity(null)}
        >
          {/* Top Bar: Title & Close */}
          <div className="w-full max-w-5xl flex items-center justify-between z-20 pt-2 pb-4">
            <div>
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-cassette-yellow text-ink">
                {selectedActivity.badge || "Activity"}
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

          {/* Center Main Photo Frame with Prev / Next Controls */}
          <div
            className="relative w-full max-w-5xl flex-1 flex items-center justify-center min-h-0 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Button */}
            {(selectedActivity.activitypic || []).length > 1 && (
              <button
                onClick={() =>
                  setActiveLightboxIndex((prev) =>
                    prev > 0 ? prev - 1 : (selectedActivity.activitypic || []).length - 1,
                  )
                }
                className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-black/60 hover:bg-cassette-red text-white transition-all backdrop-blur-md"
                title="Previous Image"
              >
                <span className="material-symbols-outlined text-2xl flex">chevron_left</span>
              </button>
            )}

            {/* Main Image */}
            <div className="max-h-[60vh] sm:max-h-[65vh] w-full flex items-center justify-center overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-black/40">
              <img
                src={
                  (selectedActivity.activitypic || [])[activeLightboxIndex] ||
                  selectedActivity.image
                }
                alt={`${selectedActivity.activityTitle} photo ${activeLightboxIndex + 1}`}
                className="max-h-[60vh] sm:max-h-[65vh] max-w-full object-contain"
              />
            </div>

            {/* Next Button */}
            {(selectedActivity.activitypic || []).length > 1 && (
              <button
                onClick={() =>
                  setActiveLightboxIndex((prev) =>
                    prev < (selectedActivity.activitypic || []).length - 1 ? prev + 1 : 0,
                  )
                }
                className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-black/60 hover:bg-cassette-red text-white transition-all backdrop-blur-md"
                title="Next Image"
              >
                <span className="material-symbols-outlined text-2xl flex">chevron_right</span>
              </button>
            )}
          </div>

          {/* Bottom Narrative & Filmstrip Carousel */}
          <div
            className="w-full max-w-5xl pt-4 pb-2 z-20 space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedActivity.description && (
              <p className="text-xs sm:text-sm text-neutral-300 max-w-3xl mx-auto text-center leading-relaxed">
                {selectedActivity.description}
              </p>
            )}

            {/* Filmstrip Carousel */}
            {(selectedActivity.activitypic || []).length > 1 && (
              <div className="flex items-center justify-center gap-2 overflow-x-auto py-2 max-w-full no-scrollbar">
                {selectedActivity.activitypic.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveLightboxIndex(idx)}
                    className={`h-12 w-16 sm:h-14 sm:w-20 rounded-lg overflow-hidden shrink-0 border transition-all ${
                      idx === activeLightboxIndex
                        ? "border-cassette-yellow ring-2 ring-cassette-yellow/40 scale-105"
                        : "border-white/20 opacity-50 hover:opacity-100"
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
