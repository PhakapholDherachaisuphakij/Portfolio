-- Full Supabase Schema & Seed Data

DROP TABLE IF EXISTS "profiles" CASCADE;
DROP TABLE IF EXISTS "skills" CASCADE;
DROP TABLE IF EXISTS "experience" CASCADE;
DROP TABLE IF EXISTS "projects" CASCADE;
DROP TABLE IF EXISTS "activities" CASCADE;
DROP TABLE IF EXISTS "social_links" CASCADE;


CREATE TABLE "profiles" (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  nickname TEXT,
  level TEXT,
  role TEXT,
  description TEXT,
  streak TEXT,
  total_xp TEXT,
  quote TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE "skills" (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  progress INTEGER,
  level TEXT,
  image_url TEXT,
  is_main BOOLEAN DEFAULT false,
  order_idx INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE "experience" (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  period TEXT,
  title TEXT,
  company TEXT,
  description TEXT,
  color TEXT,
  order_idx INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE "projects" (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT,
  description TEXT,
  tech_stack TEXT[],
  image_url TEXT,
  experience_text TEXT,
  link TEXT,
  order_idx INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE "activities" (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT,
  semester TEXT,
  period_label TEXT,
  description TEXT,
  main_image TEXT,
  gallery TEXT[],
  order_idx INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE "social_links" (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  platform_id TEXT,
  name TEXT,
  link TEXT,
  text TEXT,
  icon TEXT,
  order_idx INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);


ALTER TABLE "profiles" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on profiles" ON "profiles" FOR SELECT USING (true);
CREATE POLICY "Allow authenticated all access on profiles" ON "profiles" USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

ALTER TABLE "skills" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on skills" ON "skills" FOR SELECT USING (true);
CREATE POLICY "Allow authenticated all access on skills" ON "skills" USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

ALTER TABLE "experience" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on experience" ON "experience" FOR SELECT USING (true);
CREATE POLICY "Allow authenticated all access on experience" ON "experience" USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

ALTER TABLE "projects" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on projects" ON "projects" FOR SELECT USING (true);
CREATE POLICY "Allow authenticated all access on projects" ON "projects" USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

ALTER TABLE "activities" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on activities" ON "activities" FOR SELECT USING (true);
CREATE POLICY "Allow authenticated all access on activities" ON "activities" USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

ALTER TABLE "social_links" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on social_links" ON "social_links" FOR SELECT USING (true);
CREATE POLICY "Allow authenticated all access on social_links" ON "social_links" USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- Insert Data

INSERT INTO "profiles" (name, nickname, level, role, description, streak, total_xp, quote, avatar_url) VALUES 
('Phakaphol', 'PK', '20', 'Frontend Developer', 'I build playful & interactive web experiences that make the internet feel a little more fun.', '2 Yrs', '15.4k', 'Talent without working hard is nothing', NULL);

INSERT INTO "skills" (name, progress, level, image_url, is_main, order_idx) VALUES 
('HTML', 95, 'Expert', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', false, 0),
('CSS', 92, 'Expert', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', false, 1),
('JavaScript', 94, 'Expert', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', false, 2),
('TypeScript', 92, 'Expert', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', false, 3),
('React', 96, 'Master', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', true, 4),
('Next.js', 93, 'Expert', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', false, 5),
('TailwindCSS', 95, 'Expert', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', false, 6),
('Node.js', 94, 'Expert', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', false, 7),
('Express', 92, 'Expert', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', false, 8),
('NestJS', 88, 'Advanced', 'https://docs.nestjs.com/assets/logo-small-gradient.svg', false, 9),
('PostgreSQL', 90, 'Expert', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', false, 10),
('MongoDB', 89, 'Advanced', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', false, 11),
('MySQL', 87, 'Advanced', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', false, 12),
('Redis', 85, 'Advanced', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg', false, 13),
('Docker', 88, 'Advanced', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', false, 14),
('Git', 95, 'Expert', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', false, 15),
('GitHub', 95, 'Expert', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', false, 16),
('Linux', 85, 'Advanced', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg', false, 17),
('NGINX', 82, 'Advanced', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg', false, 18),
('AWS', 80, 'Advanced', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', false, 19),
('GraphQL', 82, 'Advanced', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg', false, 20),
('Vite', 90, 'Expert', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg', false, 21),
('Prisma', 88, 'Advanced', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg', false, 22),
('Firebase', 85, 'Advanced', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', false, 23),
('Jest', 80, 'Advanced', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg', false, 24),
('Redux', 90, 'Expert', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg', false, 25),
('Figma', 85, 'Advanced', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', false, 26);

INSERT INTO "experience" (period, title, company, description, color, order_idx) VALUES 
('2025 - Present', 'Quality Assurance Engineer', 'Siam Commercial Bank (SCB)', 'Automated testing and ensuring high-quality software delivery.', 'purple-400', 0),
('2024', 'Frontend Developer (Next.js)', 'IT3K Festival', 'Developed a tournament management system with Next.js.', 'primary', 1),
('2024', 'Blogger & Frontend Developer', 'BorntoDev (Devinit)', 'Participated as a content writer and developer, creating blogs about React.js, GSAP, and WordPress animations.', 'orange-500', 2);

INSERT INTO "projects" (title, description, tech_stack, image_url, experience_text, link, order_idx) VALUES 
('Next Js Landing Page of Demon Slayer: Kimetsu no Yaiba – Infinity Castle* arc. ', 'A fan-made Next.js web application inspired by the *Demon Slayer: Kimetsu no Yaiba – Infinity Castle* arc.  This project showcases characters, story details, and thematic highlights, with dynamic data rendering from JavaScript objects.', ARRAY['NextJs', 'Gsap', 'Tailwind'], 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/Project/yaiba.jfif', 'This project deepened my understanding of Build and deploy a scroll-driven experience packed with cinematic animations using GSAP’s ScrollTrigger', 'https://phakaphol-yaiba.vercel.app/', 0),
('IT 3KINGS 19TH Web Application', 'A web-based system built with Next.js for managing sports tournaments at KMUTT. It allows users to view match brackets, schedules, and real-time results, focusing on sports like badminton and ping pong.', ARRAY['Next.JS', 'CSS', 'AXIOS', 'TypeScript', 'react-zoom-pan-pinch'], 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/IT3K/3klogo.png', 'This project helped me understand how to build a scalable and interactive web application using Next.js. I implemented dynamic routing, handled API data fetching, and ensured the UI was responsive for both public users and administrators.', 'https://it3k.sit.kmutt.ac.th/', 1),
('GTA 6 Clone', 'Recreate the viral GTA VI website with React, Tailwind CSS, and GSAP. Build and deploy a scroll-driven experience packed with cinematic animations using GSAP’s ScrollTrigger. Pin sections in place, sync video playback with scroll, and add smooth parallax and image masking effects. A modern, responsive site that brings high-impact motion design to life on the web.', ARRAY['React', 'Tailwind', 'Gsap', 'CSS'], 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/GTA6/gta6.png', 'This project deepened my understanding of Build and deploy a scroll-driven experience packed with cinematic animations using GSAP’s ScrollTrigger', 'https://phakaphol-gta6-clone.vercel.app/', 2),
('IOTSMARTSCAN AI', 'An IoT-integrated web application that uses YOLO AI for real-time object detection and scanning. The system processes visual data from connected devices and displays detection results through a web interface.', ARRAY['React', 'CSS', 'YOLO AI', 'Node.js'], 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/iot.png', 'I learned how to build a full-stack web application that connects with AI models and IoT hardware. This involved integrating real-time detection data, optimizing performance, and handling asynchronous communication between frontend and backend.', 'https://github.com/IOT4NHOR/Frontend', 3),
('COGNISYNC', 'CogniSync is an AI-powered platform designed to bridge the gap between the workplace and the inner world of individuals with autism, learning, or behavioral disabilities. Its mission is to empower neurodiverse employees by reducing barriers to communication, balancing cognitive demands, and enabling organizations to support and collaborate effectively.', ARRAY['React', 'CSS', 'LLM', 'Node.js'], 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/cognisync.png', 'Through this project, I learned how to implement authentication with role-based UIs, integrate a frontend with backend APIs, and manage state effectively using tokens. I also gained experience in handling API requests and responses dynamically. From a design perspective, I focused on UI/UX principles to reduce cognitive load and ensure accessibility, which is closely tied to the project''s goal of supporting autistic users. Additionally, I learned how to structure a frontend and backend as separate layers, which reflects real-world web application architecture.', 'https://cogni-sync.vercel.app/', 4),
('PKFLIX', 'An entertainment-themed web app inspired by Netflix, designed to simulate a movie streaming platform. It includes a dynamic UI with featured banners, media content, and filtering functionality. , and now i integrate a data to supabase now this project data is on cloud!☁️', ARRAY['React', 'CSS', 'Node.js', 'Supabase'], 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/pkflix.png', 'This project improved my frontend design skills, especially in creating engaging user interfaces. I also practiced backend API handling and managing component-based layouts for media-heavy content.', 'https://pk-flix.vercel.app/', 5),
('Pheeraphat Portfolio', 'A Static web with a stunning design using only html css and js but i make it for my brother pheeraphat because i saw my brother have only notion page for portfolio ', ARRAY['HTML', 'CSS', 'JS'], 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/pheeraphat-port.png', 'Ant design using material ui and good structure of code', 'https://pheeraphat-portfolio-lfpq.vercel.app/', 6),
('Iphone 15 clone', 'After completing this project, I understand how to build a mobile-style UI using HTML and CSS. I gain skills in using Flexbox, animations, and responsive design. I learn to dynamically update content like time using JavaScript. I also handle user interactions such as tapping icons or unlocking screens. Overall, I improve my ability to recreate real-world interfaces and structure front-end code efficiently.', ARRAY['HTML', 'CSS', 'JS'], 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/iphone.png', 'Ant design using material ui and good structure of code', 'https://iphone-clone-godzk.vercel.app/', 7),
('PK Shop', '🎮 A full-stack e-commerce website for buying video games. Users can browse games, add them to the cart, and complete purchases through an interactive and dynamic interface. 🎮', ARRAY['React', 'Express.js', 'Node.js', 'MongoDB'], 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/pkshop.jfif', 'This project deepened my understanding of full-stack development, especially in handling REST APIs, managing state in React, and structuring a MongoDB database for real-world e-commerce scenarios.', 'https://github.com/GodzK/PkShop', 8),
('Phakaphol-Ecommerce-Template', 'Roby is a sleek and modern HTML/CSS-based ecommerce landing page template designed for promoting and selling sneakers, especially targeting a fashion-conscious audience. It''s fully responsive and visually engaging with a product-focused layout.', ARRAY['HTML', 'CSS', 'JS'], 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/ecom.png', NULL, 'https://phakaphol-ecommerce-landing-page.vercel.app/', 9),
('PKCrypto', 'A lightweight cryptocurrency tracking application that fetches real-time market data via API and displays key price information for popular coins.', ARRAY['React', 'CSS'], 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/crypto.jfif', 'I gained hands-on experience with REST API consumption, real-time data visualization, and crafting a clean user interface using CSS for presenting financial metrics.', 'https://p-koin.vercel.app/', 10),
('IT-Fundamental slide Show', 'A modern, responsive landing page for an Online Learning Platform, designed and built by Pk Phakaphol Tcsk, a frontend developer 👑This project showcases a clean UI with vibrant course sections, testimonials, and a bold hero section to encourage users to explore educational content.', ARRAY['Gsap', 'CSS', 'JS'], 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/it-fun-slide.png', NULL, 'https://starterpack-it-fundamental-slidesho.vercel.app/', 11),
('Hello World Booking Application', 'A full-stack booking system where users can reserve appointments and manage schedules. Developed in a team, my main role was to build and maintain the backend API and ensure smooth data flow.', ARRAY['React', 'CSS', 'Node.js'], 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/Helloworld/helloworldhippo.png', 'This was my first collaborative full-stack project. I was responsible for designing the database schema, setting up backend routes, and integrating them with frontend components for seamless booking functionality.', 'https://github.com/GodzK/Fullstack-Booking', 12);

INSERT INTO "activities" (title, semester, description, main_image, gallery, order_idx) VALUES 
('BorntoDev Devinit (Frontend Developer)', 'Semester 1', 'I participated as a content writer and frontend developer, focusing on blog creation related to React.js and animation using GSAP. This opportunity enhanced my communication skills and deepened my frontend knowledge.', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/Devinit/devinit.jpg', ARRAY['https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/Devinit/gsap.png', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/Devinit/css.png', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/Devinit/react.png'], 0),
('TuePunRak 18th (English Teacher)', 'Semester 1', 'I volunteered to teach English to children in remote rural areas. This camp emphasized building teamwork, leadership, and compassion, while creating meaningful connections with the local community.', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/TPR/tprport.png', ARRAY['https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/TPR/tpr1.jpeg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/TPR/tpr2.jpeg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/TPR/tpr3.jpeg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/TPR/tpr4.jpeg'], 1),
('IOT Hackathon (KMUTT)', 'Semester 1', 'My first hackathon experience at KMUTT, where I worked with a team to develop an AI-powered IoT web application using YOLO. I learned about rapid prototyping, AI integration, and project pitching.', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/IOT/iot.jpg', ARRAY['https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/IOT/iotmain.jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/IOT/iot2.jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/IOT/iot3.jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/IOT/iot4.jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/IOT/iot5.jpg'], 2),
('IT Starter Pack (IT Fundamental Program)', 'Semester 2', 'Taking on the role of Head of IT Fundamental An intensive IT fundamental program covering mindset, core IT concepts, hardware/software basics, and essential skills for IT students.', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (13 of 115).jpg', ARRAY['https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (2 of 96).jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (13 of 115).jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (14 of 115).jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (25 of 149).jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (3 of 149).jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (45 of 149).jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (46 of 149).jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (6 of 149).jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (63 of 149).jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (80 of 149).jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (101 of 149).jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (137 of 149).jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (138 of 149).jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (149 of 149).jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (12 of 61).jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (27 of 61).jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (3 of 61).jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (31 of 61).jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (32 of 61).jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (54 of 61).jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (55 of 61).jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (9 of 61).jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (14 of 96).jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (32 of 96).jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (33 of 96).jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (43 of 96).jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (44 of 96).jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (47 of 96).jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (50 of 96).jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (72 of 96).jpg'], 3),
('โลกของ IT กับชีวิตประจำวัน & หลักสูตร SIT KMUTT', 'IT Starter Pack', 'แนะนำการประยุกต์ใช้ไอทีในชีวิตประจำวัน และเจาะลึก 9 สายการเรียนหลักในหลักสูตรไอทีบางมด', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (2 of 96).jpg', ARRAY['https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (2 of 96).jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (13 of 115).jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (14 of 115).jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (25 of 149).jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (3 of 149).jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (45 of 149).jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (46 of 149).jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (6 of 149).jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (63 of 149).jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (80 of 149).jpg'], 4),
('Mindset + ทักษะเสริมที่จำเป็นในสาย IT', 'IT Starter Pack', 'ปรับทัศนคติให้พร้อมสำหรับการเรียนรู้สายเทคโนโลยี ฝึกคิดเชิงระบบ การแก้ปัญหา และการสื่อสาร', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (101 of 149).jpg', ARRAY['https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (101 of 149).jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (137 of 149).jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (138 of 149).jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (149 of 149).jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (12 of 61).jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (27 of 61).jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (3 of 61).jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (31 of 61).jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (32 of 61).jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (54 of 61).jpg'], 5),
('IT Fundamentals', 'IT Starter Pack', 'เข้าใจพื้นฐานฮาร์ดแวร์ ซอฟต์แวร์ และการเลือกใช้เครื่องมือให้เหมาะสมกับสายอาชีพ', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (55 of 61).jpg', ARRAY['https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (55 of 61).jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (9 of 61).jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (14 of 96).jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (32 of 96).jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (33 of 96).jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (43 of 96).jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (44 of 96).jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (47 of 96).jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (50 of 96).jpg', 'https://isewznoytpettlrsdrtc.supabase.co/storage/v1/object/public/portfolio-assets/assets/starterpack pk/sit_photo (72 of 96).jpg'], 6);

INSERT INTO "social_links" (platform_id, name, link, text, icon, order_idx) VALUES 
('github', 'Github', 'https://github.com/GodzK', 'Github', 'fa-github', 0),
('ig', 'Instagram', 'https://www.instagram.com/pk._tcsk/', 'Instagram', 'fa-instagram', 1),
('Borntodev', 'Borntodev', 'https://www.borntodev.com/author/godzk25gmail-com/', 'Borntodev', 'fa-bold', 2),
('Facebook', 'Facebook', 'https://www.facebook.com/phakaphol.dherachaisuphakij/', 'Facebook', 'fa-facebook', 3);

