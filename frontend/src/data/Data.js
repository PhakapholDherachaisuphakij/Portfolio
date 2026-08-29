// Supabase Storage Mapping
import { PROJECT_REF } from '../lib/supabase';
const BASE_URL = `https://${PROJECT_REF}.supabase.co/storage/v1/object/public/portfolio-assets/assets`;
const IOT_BASE_URL = `https://${PROJECT_REF}.supabase.co/storage/v1/object/public/portfolio-assets/IOT`;

// Mapping variables to Cloud URLs (Zero manual imports!)
const pkshop = `${BASE_URL}/pkshop.jfif`;
const crypto = `${BASE_URL}/crypto.jfif`;
const iot = `${BASE_URL}/iot.png`;
const tpr = `${BASE_URL}/TPR/tprport.png`;
const tpr1 = `${BASE_URL}/TPR/tpr1.jpeg`;
const tpr2 = `${BASE_URL}/TPR/tpr2.jpeg`;
const tpr3 = `${BASE_URL}/TPR/tpr3.jpeg`;
const tpr4 = `${BASE_URL}/TPR/tpr4.jpeg`;
const devinitport = `${BASE_URL}/Devinit/devinit.jpg`;
const gsap = `${BASE_URL}/Devinit/gsap.png`;
const css = `${BASE_URL}/Devinit/css.png`;
const blogreact = `${BASE_URL}/Devinit/react.png`;
const iot1 = `${IOT_BASE_URL}/iot.jpg`;
const iotmain = `${IOT_BASE_URL}/iotmain.jpg`;
const iot2 = `${IOT_BASE_URL}/iot2.jpg`;
const iot3 = `${IOT_BASE_URL}/iot3.jpg`;
const iot4 = `${IOT_BASE_URL}/iot4.jpg`;
const iot5 = `${IOT_BASE_URL}/iot5.jpg`;
const it3k = `${BASE_URL}/IT3K/3klogo.png`;
const gta6 = `${BASE_URL}/GTA6/gta6.png`;
const yaiba = `${BASE_URL}/Project/yaiba.jfif`;
const Helloworld = `${BASE_URL}/Helloworld/helloworldhippo.png`;
const pkflix = `${BASE_URL}/pkflix.png`;
const cognisync = `${BASE_URL}/cognisync.png`;
const pheeraphat = `${BASE_URL}/pheeraphat-port.png`;
const iphone = `${BASE_URL}/iphone.png`;
const itfunslide = `${BASE_URL}/it-fun-slide.png`;
const helloworld = `${BASE_URL}/accordion/helloworld.jpg`;
const teacher = `${BASE_URL}/accordion/Teacher.jpg`;
const ecom = `${BASE_URL}/ecom.png`;
const jarvisTrade1 = `https://${PROJECT_REF}.supabase.co/storage/v1/object/public/portfolio-assets/projects/jarvis-trade-1.png`;
const pkbrain = `https://${PROJECT_REF}.supabase.co/storage/v1/object/public/portfolio-assets/projects/pk-brain.png`;


// Starter Pack Images (Manual Array since import.meta.glob doesn't work for cloud URLs)
export const starterPackImages = [
  `${BASE_URL}/starterpack pk/sit_photo (2 of 96).jpg`,
  `${BASE_URL}/starterpack pk/sit_photo (13 of 115).jpg`,
  `${BASE_URL}/starterpack pk/sit_photo (14 of 115).jpg`,
  `${BASE_URL}/starterpack pk/sit_photo (25 of 149).jpg`,
  `${BASE_URL}/starterpack pk/sit_photo (3 of 149).jpg`,
  `${BASE_URL}/starterpack pk/sit_photo (45 of 149).jpg`,
  `${BASE_URL}/starterpack pk/sit_photo (46 of 149).jpg`,
  `${BASE_URL}/starterpack pk/sit_photo (6 of 149).jpg`,
  `${BASE_URL}/starterpack pk/sit_photo (63 of 149).jpg`,
  `${BASE_URL}/starterpack pk/sit_photo (80 of 149).jpg`,
  `${BASE_URL}/starterpack pk/sit_photo (101 of 149).jpg`,
  `${BASE_URL}/starterpack pk/sit_photo (137 of 149).jpg`,
  `${BASE_URL}/starterpack pk/sit_photo (138 of 149).jpg`,
  `${BASE_URL}/starterpack pk/sit_photo (149 of 149).jpg`,
  `${BASE_URL}/starterpack pk/sit_photo (12 of 61).jpg`,
  `${BASE_URL}/starterpack pk/sit_photo (27 of 61).jpg`,
  `${BASE_URL}/starterpack pk/sit_photo (3 of 61).jpg`,
  `${BASE_URL}/starterpack pk/sit_photo (31 of 61).jpg`,
  `${BASE_URL}/starterpack pk/sit_photo (32 of 61).jpg`,
  `${BASE_URL}/starterpack pk/sit_photo (54 of 61).jpg`,
  `${BASE_URL}/starterpack pk/sit_photo (55 of 61).jpg`,
  `${BASE_URL}/starterpack pk/sit_photo (9 of 61).jpg`,
  `${BASE_URL}/starterpack pk/sit_photo (14 of 96).jpg`,
  `${BASE_URL}/starterpack pk/sit_photo (32 of 96).jpg`,
  `${BASE_URL}/starterpack pk/sit_photo (33 of 96).jpg`,
  `${BASE_URL}/starterpack pk/sit_photo (43 of 96).jpg`,
  `${BASE_URL}/starterpack pk/sit_photo (44 of 96).jpg`,
  `${BASE_URL}/starterpack pk/sit_photo (47 of 96).jpg`,
  `${BASE_URL}/starterpack pk/sit_photo (50 of 96).jpg`,
  `${BASE_URL}/starterpack pk/sit_photo (72 of 96).jpg`,
];

// --------------------------------------------------------------------------
// 📚 ข้อมูลเนื้อหา IT Starter Pack
// --------------------------------------------------------------------------
export const itStarterPackData = [
  {
    day: 1,
    title: "โลกของ IT กับชีวิตประจำวัน & หลักสูตร SIT KMUTT",
    description:
      "แนะนำการประยุกต์ใช้ไอทีในชีวิตประจำวัน และเจาะลึก 9 สายการเรียนหลักในหลักสูตรไอทีบางมด",
    topics: [
      "การใช้ IT ในชีวิตประจำวัน (Social Media, Online Meeting, E-commerce, Smart Watch, Security)",
      "คุณลักษณะและจุดเด่นของหลักสูตร SIT KMUTT (Multiple Learning Pathways, Outcome Based Education)",
      "9 เส้นทางการเรียนรู้สู่สายอาชีพ (Frontend, Backend, Full-Stack, AI, Data Scientist, Data Analyst, Data Engineer, DBA, UX/UI)",
      "Hard Skills & Soft Skills ที่นักศึกษา IT ควรมี",
      "Triangle of Success (Attitude + Skills + Knowledge)",
      "21st Century Skills (Communication, Critical Thinking, Collaboration, Creativity)",
      "Learning How to Learn (เทคนิค Pomodoro และโหมดสมอง Focused vs Diffuse)",
      "การพัฒนาซอฟต์แวร์: Scrum, Agile และ Waterfall",
    ],
    images: starterPackImages.slice(0, 10),
  },
  {
    day: 2,
    title: "Mindset + ทักษะเสริมที่จำเป็นในสาย IT",
    description:
      "ปรับทัศนคติให้พร้อมสำหรับการเรียนรู้สายเทคโนโลยี ฝึกคิดเชิงระบบ การแก้ปัญหา และการสื่อสาร",
    topics: [
      "Growth Mindset vs Fixed Mindset (คนเก่งไม่ใช่คนที่เกิดมาเก่ง แต่คือคนที่ไม่หยุดเรียนรู้)",
      "Fail Fast, Learn Faster & Self-Learner Mindset",
      "Problem-Solving Mindset (เข้าใจปัญหาให้ดีก่อนรีบเขียนโค้ด)",
      "Team Mindset & Communication (ฟังอย่างเข้าใจ พูดอย่างสร้างสรรค์ ทีมชนะคือทีมที่รอด)",
      "AI กับ Programmer (ใช้เป็นเครื่องมือ AI เป็นผู้ช่วยไม่ใช่ตัวแทน)",
    ],
    images: starterPackImages.slice(10, 20),
  },
  {
    day: 3,
    title: "IT Fundamentals",
    description:
      "เข้าใจพื้นฐานฮาร์ดแวร์ ซอฟต์แวร์ และการเลือกใช้เครื่องมือให้เหมาะสมกับสายอาชีพ",
    topics: [
      "Hardware เบื้องต้น: เส้นทางการเดินทางของข้อมูล (Input -> Bus -> CPU -> RAM -> Storage -> Output)",
      "Memory Hierarchy (Register, Cache L1/L2/L3, RAM, SSD/HDD)",
      "Software คืออะไร? แบ่งเป็น System Software (OS) และ Application Software",
      "หน้าที่ของ Operating System (จัดการทรัพยากร, Process, Memory, ความปลอดภัย)",
      "เครื่องมือสายไอที: VS Code, Git/GitHub, MySQL Workbench, Browser DevTools",
      "เปรียบเทียบ OS: Windows vs macOS vs Linux เหมาะกับงานแบบไหน?",
    ],
    images: starterPackImages.slice(20, 30),
  },
];

// --------------------------------------------------------------------------
// ข้อมูล Player Info
// --------------------------------------------------------------------------
export const playerInfo = {
  name: "Phakaphol",
  nickname: "PK",
  level: "20",
  role: "Frontend Developer",
  description:
    "I build playful & interactive web experiences that make the internet feel a little more fun.",
  streak: "2 Yrs",
  totalXP: "15.4k",
  quote: "Talent without working hard is nothing",
};

export const skills = [
  {
    name: "HTML",
    progress: 95,
    level: "Expert",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  {
    name: "CSS",
    progress: 92,
    level: "Expert",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  {
    name: "JavaScript",
    progress: 94,
    level: "Expert",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "TypeScript",
    progress: 92,
    level: "Expert",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name: "React",
    progress: 96,
    level: "Master",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    isMain: true,
  },
  {
    name: "Next.js",
    progress: 93,
    level: "Expert",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  {
    name: "TailwindCSS",
    progress: 95,
    level: "Expert",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    name: "Node.js",
    progress: 94,
    level: "Expert",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "Express",
    progress: 92,
    level: "Expert",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  },
  {
    name: "NestJS",
    progress: 88,
    level: "Advanced",
    image: "https://docs.nestjs.com/assets/logo-small-gradient.svg",
  },
  {
    name: "PostgreSQL",
    progress: 90,
    level: "Expert",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "MongoDB",
    progress: 89,
    level: "Advanced",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "MySQL",
    progress: 87,
    level: "Advanced",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  },
  {
    name: "Redis",
    progress: 85,
    level: "Advanced",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
  },
  {
    name: "Docker",
    progress: 88,
    level: "Advanced",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  {
    name: "Git",
    progress: 95,
    level: "Expert",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  {
    name: "GitHub",
    progress: 95,
    level: "Expert",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
  {
    name: "Linux",
    progress: 85,
    level: "Advanced",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  },
  {
    name: "NGINX",
    progress: 82,
    level: "Advanced",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg",
  },
  {
    name: "AWS",
    progress: 80,
    level: "Advanced",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  },
  {
    name: "GraphQL",
    progress: 82,
    level: "Advanced",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
  },
  {
    name: "Vite",
    progress: 90,
    level: "Expert",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg",
  },
  {
    name: "Prisma",
    progress: 88,
    level: "Advanced",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg",
  },
  {
    name: "Firebase",
    progress: 85,
    level: "Advanced",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  },
  {
    name: "Jest",
    progress: 80,
    level: "Advanced",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg",
  },
  {
    name: "Redux",
    progress: 90,
    level: "Expert",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
  },
  {
    name: "Figma",
    progress: 85,
    level: "Advanced",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  },
];

export const experience = [
  {
    period: "2025 - Present",
    title: "Quality Assurance Engineer",
    company: "Siam Commercial Bank (SCB)",
    description:
      "Automated testing and ensuring high-quality software delivery.",
    color: "purple-400",
  },
  {
    period: "2024",
    title: "Frontend Developer (Next.js)",
    company: "IT3K Festival",
    description: "Developed a tournament management system with Next.js.",
    color: "primary",
  },
  {
    period: "2024",
    title: "Blogger & Frontend Developer",
    company: "BorntoDev (Devinit)",
    description:
      "Participated as a content writer and developer, creating blogs about React.js, GSAP, and WordPress animations.",
    color: "orange-500",
  },
];

export const portfoliodata = [
  {
    projectname: "PK Brain – Second Brain System",
    description:
      "ศูนย์รวมความรู้ ทักษะ การงาน และเรื่องราวความก้าวหน้าของ PK บันทึกทุกอย่างไว้ที่นี่เพื่อต่อยอดในอนาคต พัฒนาด้วย Typhoon AI และ Supabase",
    techStack: ["React", "TailwindCSS", "Node.js", "Express", "Typhoon AI", "Supabase", "Tailscale"],
    picture: pkbrain,
    experience:
      "ได้พัฒนาระบบบันทึกความรู้อัจฉริยะที่สามารถจัดการข้อมูลโปรเจกต์ ทักษะ และไอเดียแบบ end-to-end พร้อมใช้ AI ช่วยวิเคราะห์ ตั้งแท็ก และสรุปข้อมูลอัตโนมัติ",
    link: "http://homelab.tail7d4c51.ts.net:5174",
  },
  {
    projectname:
      "Next Js Landing Page of Demon Slayer: Kimetsu no Yaiba – Infinity Castle* arc. ",
    description:
      "A fan-made Next.js web application inspired by the *Demon Slayer: Kimetsu no Yaiba – Infinity Castle* arc.  This project showcases characters, story details, and thematic highlights, with dynamic data rendering from JavaScript objects.",
    techStack: ["NextJs", "Gsap", "Tailwind"],
    picture: yaiba,
    experience:
      "This project deepened my understanding of Build and deploy a scroll-driven experience packed with cinematic animations using GSAP’s ScrollTrigger",
    link: "https://phakaphol-yaiba.vercel.app/",
  },
  {
    projectname: "IT 3KINGS 19TH Web Application",
    description:
      "A web-based system built with Next.js for managing sports tournaments at KMUTT. It allows users to view match brackets, schedules, and real-time results, focusing on sports like badminton and ping pong.",
    techStack: [
      "Next.JS",
      "CSS",
      "AXIOS",
      "TypeScript",
      "react-zoom-pan-pinch",
    ],
    picture: it3k,
    experience:
      "This project helped me understand how to build a scalable and interactive web application using Next.js. I implemented dynamic routing, handled API data fetching, and ensured the UI was responsive for both public users and administrators.",
    link: "https://it3k.sit.kmutt.ac.th/",
  },
  {
    projectname: "GTA 6 Clone",
    description:
      "Recreate the viral GTA VI website with React, Tailwind CSS, and GSAP. Build and deploy a scroll-driven experience packed with cinematic animations using GSAP’s ScrollTrigger. Pin sections in place, sync video playback with scroll, and add smooth parallax and image masking effects. A modern, responsive site that brings high-impact motion design to life on the web.",
    techStack: ["React", "Tailwind", "Gsap", "CSS"],
    picture: gta6,
    experience:
      "This project deepened my understanding of Build and deploy a scroll-driven experience packed with cinematic animations using GSAP’s ScrollTrigger",
    link: "https://phakaphol-gta6-clone.vercel.app/",
  },
  {
    projectname: "IOTSMARTSCAN AI",
    description:
      "An IoT-integrated web application that uses YOLO AI for real-time object detection and scanning. The system processes visual data from connected devices and displays detection results through a web interface.",
    techStack: ["React", "CSS", "YOLO AI", "Node.js"],
    picture: iot,
    experience:
      "I learned how to build a full-stack web application that connects with AI models and IoT hardware. This involved integrating real-time detection data, optimizing performance, and handling asynchronous communication between frontend and backend.",
    link: "https://github.com/IOT4NHOR/Frontend",
  },
  {
    projectname: "COGNISYNC",
    description:
      "CogniSync is an AI-powered platform designed to bridge the gap between the workplace and the inner world of individuals with autism, learning, or behavioral disabilities. Its mission is to empower neurodiverse employees by reducing barriers to communication, balancing cognitive demands, and enabling organizations to support and collaborate effectively.",
    techStack: ["React", "CSS", "LLM", "Node.js"],
    picture: cognisync,
    experience:
      "Through this project, I learned how to implement authentication with role-based UIs, integrate a frontend with backend APIs, and manage state effectively using tokens. I also gained experience in handling API requests and responses dynamically. From a design perspective, I focused on UI/UX principles to reduce cognitive load and ensure accessibility, which is closely tied to the project's goal of supporting autistic users. Additionally, I learned how to structure a frontend and backend as separate layers, which reflects real-world web application architecture.",
    link: "https://cogni-sync.vercel.app/",
  },
  {
    projectname: "PK Movie Hub (PKFLIX)",
    description:
      "An entertainment-themed web app inspired by Netflix, designed to simulate a movie streaming platform. It includes a dynamic UI with featured banners, media content, and filtering functionality. , and now i integrate a data to supabase now this project data is on cloud!☁️",
    techStack: ["React", "CSS", "Node.js", "Supabase"],
    picture: pkflix,
    experience:
      "This project improved my frontend design skills, especially in creating engaging user interfaces. I also practiced backend API handling and managing component-based layouts for media-heavy content.",
    link: "https://pk-movie-hub.vercel.app/",
  },
  {
    projectname: "Pheeraphat Portfolio",
    description:
      "A Static web with a stunning design using only html css and js but i make it for my brother pheeraphat because i saw my brother have only notion page for portfolio ",
    techStack: ["HTML", "CSS", "JS"],
    picture: pheeraphat,
    experience: "Ant design using material ui and good structure of code",
    link: "https://pheeraphat-portfolio-lfpq.vercel.app/",
  },
  {
    projectname: "Iphone 15 clone",
    description:
      "After completing this project, I understand how to build a mobile-style UI using HTML and CSS. I gain skills in using Flexbox, animations, and responsive design. I learn to dynamically update content like time using JavaScript. I also handle user interactions such as tapping icons or unlocking screens. Overall, I improve my ability to recreate real-world interfaces and structure front-end code efficiently.",
    techStack: ["HTML", "CSS", "JS"],
    picture: iphone,
    experience: "Ant design using material ui and good structure of code",
    link: "https://iphone-clone-godzk.vercel.app/",
  },
  {
    projectname: "PK Shop",
    description:
      "🎮 A full-stack e-commerce website for buying video games. Users can browse games, add them to the cart, and complete purchases through an interactive and dynamic interface. 🎮",
    techStack: ["React", "Express.js", "Node.js", "MongoDB"],
    picture: pkshop,
    experience:
      "This project deepened my understanding of full-stack development, especially in handling REST APIs, managing state in React, and structuring a MongoDB database for real-world e-commerce scenarios.",
    link: "",
  },
  {
    projectname: "Phakaphol-Ecommerce-Template",
    description:
      "Roby is a sleek and modern HTML/CSS-based ecommerce landing page template designed for promoting and selling sneakers, especially targeting a fashion-conscious audience. It's fully responsive and visually engaging with a product-focused layout.",
    techStack: ["HTML", "CSS", "JS"],
    picture: ecom,
    link: "https://phakaphol-ecommerce-landing-page.vercel.app/",
  },
  {
    projectname: "PKCrypto",
    description:
      "A lightweight cryptocurrency tracking application that fetches real-time market data via API and displays key price information for popular coins.",
    techStack: ["React", "CSS"],
    picture: crypto,
    experience:
      "I gained hands-on experience with REST API consumption, real-time data visualization, and crafting a clean user interface using CSS for presenting financial metrics.",
    link: "https://p-koin.vercel.app/",
  },
  {
    projectname: "IT-Fundamental slide Show",
    description:
      "A modern, responsive landing page for an Online Learning Platform, designed and built by Pk Phakaphol Tcsk, a frontend developer 👑This project showcases a clean UI with vibrant course sections, testimonials, and a bold hero section to encourage users to explore educational content.",
    techStack: ["Gsap", "CSS", "JS"],
    picture: itfunslide,
    link: "https://starterpack-it-fundamental-slidesho.vercel.app/",
  },
  {
    projectname: "Hello World Booking Application",
    description:
      "A full-stack booking system where users can reserve appointments and manage schedules. Developed in a team, my main role was to build and maintain the backend API and ensure smooth data flow.",
    techStack: ["React", "CSS", "Node.js"],
    picture: Helloworld,
    experience:
      "This was my first collaborative full-stack project. I was responsible for designing the database schema, setting up backend routes, and integrating them with frontend components for seamless booking functionality.",
    link: "",
  },
  {
    projectname: "JarvisTrade AI — Premium Stock Analyzer",
    description:
      "เครื่องมือวิเคราะห์และคัดกรองหุ้นแบบอัจฉริยะในคลิกเดียว (1-Click Stock Screener) ออกแบบมาให้ทำงานโดยอัตโนมัติเพื่อตรวจสอบหุ้นที่น่าสนใจตามกลยุทธ์ Price Pullback พร้อมวิเคราะห์พื้นฐานรายได้ทางบัญชี และประเมินจุดแข็ง จุดอ่อน โอกาส และอุปสรรค (SWOT Analysis) ด้วย Gemini AI",
    techStack: ["React", "CSS", "Node.js", "Express", "Gemini AI", "Yahoo Finance"],
    picture: jarvisTrade1,
    experience:
      "พัฒนาตัวคัดกรองหุ้นแนวคิด Price Pullback อัตโนมัติ ผนวกกับการนำ AI (Gemini) มาช่วยทำ SWOT Analysis วิเคราะห์งบการเงินเรียลไทม์ และทำ UI สไตล์ Glassmorphism ที่สวยงามและลื่นไหล",
    link: "",
  },
];


export const ActivityData = [
  {
    Semester: "Semester 1",
    Activity1: [
      {
        activityTitle: "BorntoDev Devinit (Frontend Developer)",
        Semester: "Before Semester 1",
        image: devinitport,
        description:
          "I participated as a content writer and frontend developer, focusing on blog creation related to React.js and animation using GSAP. This opportunity enhanced my communication skills and deepened my frontend knowledge.",
        activitypic: [gsap, css, blogreact],
      },
      {
        activityTitle: "TuePunRak 18th (English Teacher)",
        Semester: "Semester 1",
        image: tpr,
        description:
          "I volunteered to teach English to children in remote rural areas. This camp emphasized building teamwork, leadership, and compassion, while creating meaningful connections with the local community.",
        activitypic: [tpr1, tpr2, tpr3, tpr4],
      },
      {
        activityTitle: "IOT Hackathon (KMUTT)",
        Semester: "Semester 1",
        image: iot1,
        description:
          "My first hackathon experience at KMUTT, where I worked with a team to develop an AI-powered IoT web application using YOLO. I learned about rapid prototyping, AI integration, and project pitching.",
        activitypic: [iotmain, iot2, iot3, iot4, iot5],
      },
    ],
  },
  {
    Semester: "Semester 2",
    Activity1: [
      {
        activityTitle: "IT Starter Pack (IT Fundamental Program)",
        Semester: "Semester 2",
        image: starterPackImages[1],
        description:
          "Taking on the role of Head of IT Fundamental An intensive IT fundamental program covering mindset, core IT concepts, hardware/software basics, and essential skills for IT students.",
        activitypic: starterPackImages,
      },
    ],
  },
  {
    Semester: "Semester 3",
    Activity1: [],
  },
];

export const accordionItems = [
  {
    id: "cf",
    title: "Quality Assurance",
    description: "Automate Tester",
    cover: helloworld,
  },
  {
    id: "corp",
    title: "Teacher",
    description: "Programming and English",
    cover: teacher,
  },
  {
    id: "lead",
    title: "LEADERSHIP",
    description: "Vice President of Class",
    cover: tpr3,
  },
  {
    id: "warehouse",
    title: "FrontEnd Developer",
    description: "Ux/Ui Designer",
    cover: iot5,
  },
];

export const socialLinks = [
  {
    id: "github",
    name: "Github",
    link: "",
    text: "Github",
    icon: "fa-github",
  },
  {
    id: "ig",
    name: "Instagram",
    link: "https://www.instagram.com/pk._tcsk/",
    text: "Instagram",
    icon: "fa-instagram",
  },
  {
    id: "Borntodev",
    name: "Borntodev",
    link: "https://www.borntodev.com/author/godzk25gmail-com/",
    text: "Borntodev",
    icon: "fa-bold",
  },
  {
    id: "Facebook",
    name: "Facebook",
    link: "https://www.facebook.com/phakaphol.dherachaisuphakij/",
    text: "Facebook",
    icon: "fa-facebook",
  },
];
