// src/constants/profile.js

export const PROFILE_DATA = {
  name: "Phakaphol",
  nickname: "PK",
  title: "Frontend Developer",
  description: "I build playful & interactive web experiences that make the internet feel a little more fun.",
  available: "Available for freelance",
  stack: [
    { name: "React", icon: "science", color: "text-blue-500" },
    { name: "JavaScript", icon: "javascript", color: "text-yellow-400" },
    { name: "CSS", icon: "css", color: "text-blue-600" },
    { name: "HTML", icon: "html", color: "text-orange-500" },
    { name: "GSAP", icon: "animation", color: "text-green-600" },
  ],
  socials: {
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
    email: "contact@pk.dev",
  },
  navigation: [
    { label: "Home", path: "/" },
    { label: "Project", path: "/quests" },
    { label: "Activity", path: "/activities" },
    { label: "About", path: "/character" },
    { label: "Contact", path: "/contact" },
  ]
};
