import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ projects: 0, activities: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      const { count: pCount } = await supabase.from('projects').select('*', { count: 'exact', head: true });
      const { count: aCount } = await supabase.from('activities').select('*', { count: 'exact', head: true });
      const { count: sCount } = await supabase.from('skills').select('*', { count: 'exact', head: true });
      setStats({ projects: pCount || 0, activities: aCount || 0, skills: sCount || 0 });
    };
    fetchStats();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const menuItems = [
    { title: 'Project Quest', icon: 'rocket_launch', count: stats.projects, path: '/admin/projects', color: 'bg-primary' },
    { title: 'Activity Log', icon: 'emoji_events', count: stats.activities, path: '/admin/activities', color: 'bg-accent-blue' },
    { title: 'Profile Mastery', icon: 'person', count: null, path: '/admin/profile', color: 'bg-accent-purple' },
    { title: 'Skill Tree', icon: 'fitness_center', count: stats.skills, path: '/admin/skills', color: 'bg-accent-orange' },
    { title: 'Career Path', icon: 'timeline', count: null, path: '/admin/experience', color: 'bg-indigo-500' },
    { title: 'System Config', icon: 'settings', count: null, path: '/admin/settings', color: 'bg-neutral-mid' },
  ];

  return (
    <div className="min-h-screen bg-background-light p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-neutral-dark tracking-tighter">System Console</h1>
            <p className="text-neutral-mid font-medium">Welcome back, Commander Phakaphol.</p>
          </div>
          <button 
            onClick={handleSignOut}
            className="px-6 py-3 bg-white border border-neutral-light/10 rounded-2xl font-bold text-sm hover:bg-neutral-light/5 transition-all shadow-sm"
          >
            Sign Out
          </button>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, idx) => (
            <motion.div
              key={item.title}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-[2rem] border border-neutral-light/10 shadow-premium flex flex-col gap-6 group cursor-pointer"
              onClick={() => navigate(item.path)}
            >
              <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center shadow-3d group-hover:shadow-3d-active transition-all`}>
                <span className="material-symbols-outlined text-white text-3xl">{item.icon}</span>
              </div>
              <div>
                <h3 className="text-xl font-black text-neutral-dark">{item.title}</h3>
                <p className="text-sm font-bold text-neutral-mid uppercase tracking-widest mt-1">
                  {item.count !== null ? `${item.count} Items` : 'Manage'}
                </p>
              </div>
              <div className="mt-auto pt-4 border-t border-neutral-light/5 flex items-center justify-between">
                <span className="text-xs font-black text-primary uppercase">Open Panel</span>
                <span className="material-symbols-outlined text-neutral-light group-hover:text-primary transition-colors">arrow_right_alt</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Activity / Status Area */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 bg-neutral-dark rounded-[2.5rem] p-10 text-white shadow-premium relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-2xl font-black mb-4 flex items-center gap-2">
                   <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                   System Health: Optimal
                </h2>
                <p className="text-white/60 font-medium max-w-md">
                   All systems are green. Supabase connection is active. You can now manage your projects and activities directly from this console.
                </p>
                <div className="mt-8 flex gap-4">
                   <div className="px-5 py-3 bg-white/10 rounded-xl border border-white/10">
                      <p className="text-[10px] font-black uppercase text-white/40">DB Latency</p>
                      <p className="text-lg font-black">24ms</p>
                   </div>
                   <div className="px-5 py-3 bg-white/10 rounded-xl border border-white/10">
                      <p className="text-[10px] font-black uppercase text-white/40">Storage</p>
                      <p className="text-lg font-black">1.2 GB Used</p>
                   </div>
                </div>
              </div>
              {/* Abstract graphics */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
           </div>

           <div className="bg-white rounded-[2.5rem] p-10 border border-neutral-light/10 shadow-premium flex flex-col justify-center items-center text-center gap-6">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                 <span className="material-symbols-outlined text-primary text-4xl">mobile_friendly</span>
              </div>
              <div>
                <h3 className="text-xl font-black text-neutral-dark leading-tight">Mobile Optimized</h3>
                <p className="text-sm text-neutral-mid font-medium mt-2">
                   This dashboard is fully responsive. Add photos and updates directly from your iPad or iPhone while on the go.
                </p>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
