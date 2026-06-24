import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase, PROJECT_REF } from '../../lib/supabase';
import { PROFILE_DATA } from '../../constants/profile';
const CLOUD_PROFILE_FALLBACK = `https://${PROJECT_REF}.supabase.co/storage/v1/object/public/portfolio-assets/assets/profil.jpg`;

const Hero = () => {
  const [profile, setProfile] = useState(PROFILE_DATA);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .single();
        
        if (error) throw error;
        if (data) {
          setProfile({
            ...PROFILE_DATA,
            name: data.name,
            nickname: data.nickname,
            title: data.role,
            description: data.description,
            available: "Online & Calibrated", // Dynamic status if needed
            avatar: data.avatar_url
          });
        }
      } catch (err) {
        console.error('Supabase fetch failed, using internal constants:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-20 px-6 overflow-hidden">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-8 text-center lg:text-left z-10"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full mx-auto lg:mx-0 w-fit">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] sm:text-xs font-bold text-primary-dark uppercase tracking-widest">
              {profile.available}
            </span>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-neutral-dark leading-[0.95] tracking-tighter">
              Hi, I'm <br />
              <span className="text-primary italic font-serif pr-2">{profile.name}</span>
            </h1>
            <p className="text-lg sm:text-xl text-neutral-mid font-medium max-w-lg mx-auto lg:mx-0 leading-relaxed">
              {profile.description}
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-neutral-dark text-white px-8 py-4 rounded-2xl font-bold shadow-3d hover:shadow-3d-active transition-all flex items-center gap-2 uppercase tracking-wide"
            >
              <span className="material-symbols-outlined text-primary">rocket_launch</span>
              View My Quests
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white text-neutral-dark px-8 py-4 rounded-2xl font-bold border border-neutral-light/20 shadow-sm hover:bg-neutral-light/5 transition-all uppercase tracking-wide"
            >
              Get in touch
            </motion.button>
          </motion.div>

          {/* Tech Stack Mini List */}
          <motion.div variants={itemVariants} className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
             <span className="text-xs font-black text-neutral-mid uppercase tracking-[0.2em] opacity-50">Expertise:</span>
             <div className="flex gap-4">
               {PROFILE_DATA.stack.map((tech) => (
                 <div 
                   key={tech.name} 
                   className="group relative cursor-pointer"
                   title={tech.name}
                 >
                   <span className={`material-symbols-outlined text-2xl ${tech.color} transition-transform group-hover:-translate-y-1`}>
                     {tech.icon}
                   </span>
                 </div>
               ))}
             </div>
          </motion.div>
        </motion.div>

        {/* Right Content: Premium Avatar Visual */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex justify-center items-center h-[400px] sm:h-[500px] lg:h-[600px]"
        >
          {/* Abstract Shapes */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               className="w-full h-full max-w-[500px] max-h-[500px] border border-neutral-light/10 rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%] opacity-50"
             />
             <motion.div 
               animate={{ rotate: -360 }}
               transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
               className="absolute w-[80%] h-[80%] border border-primary/20 rounded-[60%_40%_30%_70%_/_50%_30%_70%_50%] opacity-30"
             />
          </div>

          {/* Image Glass Card */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative w-64 h-80 sm:w-80 sm:h-[450px] bg-white rounded-3xl overflow-hidden shadow-premium p-4 border border-white transform transition-transform group-hover:scale-[1.02] duration-500">
               <img 
                 src={profile.avatar || CLOUD_PROFILE_FALLBACK} 
                 alt={profile.name} 
                 className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-all duration-700 brightness-110 contrast-[1.05]" 
               />
               <div className="absolute bottom-8 left-8 right-8 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-[10px] font-bold text-white/70 uppercase">Role</p>
                        <p className="text-sm font-black text-white uppercase">{profile.title}</p>
                     </div>
                     <span className="material-symbols-outlined text-white opacity-50">verified_user</span>
                  </div>
               </div>
            </div>
          </div>

          {/* Floating Action Badge */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 right-0 sm:right-10 bg-white p-4 rounded-2xl shadow-premium border border-neutral-light/10"
          >
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent-orange rounded-full flex items-center justify-center text-white">
                   <span className="material-symbols-outlined">bolt</span>
                </div>
                <div>
                   <p className="text-[10px] font-bold text-neutral-mid uppercase">System Status</p>
                   <p className="text-xs font-black text-neutral-dark uppercase tracking-wider">Optimized</p>
                </div>
             </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
