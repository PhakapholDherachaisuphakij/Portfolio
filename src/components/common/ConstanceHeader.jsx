// src/components/common/ConstanceHeader.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ConstanceHeader = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Bangkok",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setTime(timeStr);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="w-full pt-8 pb-6 px-6 sm:px-12 max-w-[1440px] mx-auto border-hairline-b">
      {/* Top Telemetry Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-4 text-xs font-mono text-ink-muted mb-8 pb-4 border-hairline-b">
        <div className="col-span-1">
          <p className="font-bold text-ink tracking-tight uppercase">
            Phakaphol Dherachaisuphakij
          </p>
          <p className="text-[11px] text-ink-muted">Frontend Web Developer</p>
        </div>

        <div className="hidden md:block col-span-1 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-paper-dark border-hairline text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Available for Projects
          </span>
        </div>

        <div className="hidden md:block col-span-1 text-center">
          <a
            href="mailto:godzk25@gmail.com"
            className="hover:text-cassette-red transition-colors underline underline-offset-4 decoration-hairline text-[11px]"
          >
            godzk25@gmail.com
          </a>
        </div>

        <div className="col-span-1 text-right">
          <p className="font-bold text-ink">Bangkok, TH</p>
          <p className="text-[11px] font-mono text-ink-muted tabular-nums">
            {time || "14:09:00"} (UTC+7)
          </p>
        </div>
      </div>

      {/* Signature Split Name Heading */}
      <div className="my-6">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 md:gap-8">
          <h1 className="text-editorial-xl font-serif text-ink tracking-tight">
            Ph<i>a</i>k<i>a</i>ph<i>o</i>l
          </h1>
          <div className="hidden md:block flex-1 h-px bg-hairline self-center mx-4"></div>
          <h1 className="text-editorial-xl font-serif text-ink tracking-tight md:text-right">
            Dh<i>e</i>r<i>a</i>
          </h1>
        </div>
      </div>

      {/* Navigation Anchor Pills (Constance Souville cassette style) */}
      <nav className="pt-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="#about"
            className="px-5 py-2.5 rounded-full bg-paper-light hover:bg-white text-ink border-hairline text-xs font-bold font-sans uppercase tracking-wider transition-all shadow-sm flex items-center gap-2 hover:-translate-y-0.5"
          >
            <span>About</span>
            <span className="text-[10px] font-mono text-ink-muted">01</span>
          </a>

          <a
            href="#projects"
            className="px-5 py-2.5 rounded-full bg-cassette-red text-white text-xs font-bold font-sans uppercase tracking-wider transition-all shadow-sm flex items-center gap-2 hover:brightness-110 hover:-translate-y-0.5"
          >
            <span>Projects</span>
            <span className="text-[10px] font-mono text-white/70">02</span>
          </a>

          <a
            href="#activities"
            className="px-5 py-2.5 rounded-full bg-cassette-yellow text-ink border-hairline text-xs font-bold font-sans uppercase tracking-wider transition-all shadow-sm flex items-center gap-2 hover:brightness-105 hover:-translate-y-0.5"
          >
            <span>Activities</span>
            <span className="text-[10px] font-mono text-ink/70">03</span>
          </a>

          <a
            href="#contact"
            className="px-5 py-2.5 rounded-full bg-darkwrap text-white text-xs font-bold font-sans uppercase tracking-wider transition-all shadow-sm flex items-center gap-2 hover:bg-black hover:-translate-y-0.5"
          >
            <span>Contact</span>
            <span className="text-[10px] font-mono text-white/70">04</span>
          </a>
        </div>

        <div className="text-xs font-mono text-ink-muted hidden lg:block">
          Portfolio 2018 — 2026
        </div>
      </nav>
    </header>
  );
};

export default ConstanceHeader;
