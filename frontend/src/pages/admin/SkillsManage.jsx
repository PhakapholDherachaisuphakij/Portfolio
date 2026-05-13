import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { uploadImage } from '../../lib/storage';
import { useNavigate } from 'react-router-dom';

const SkillsManage = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [form, setForm] = useState({
    name: '',
    progress: 50,
    level: 'Expert',
    image_url: '',
    is_main: false,
    order_idx: 0
  });
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('order_idx', { ascending: true });
    
    if (!error) setSkills(data);
    setLoading(false);
  };

  const handleImageUpload = async (e) => {
    try {
      setUploading(true);
      const file = e.target.files[0];
      const url = await uploadImage(file, 'portfolio-assets', 'skills');
      setForm({ ...form, image_url: url });
    } catch (err) {
      alert('Upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const payload = {
        ...form,
        order_idx: editingSkill ? form.order_idx : skills.length
      };

      let error;
      if (editingSkill) {
        const { error: err } = await supabase
          .from('skills')
          .update(payload)
          .eq('id', editingSkill.id);
        error = err;
      } else {
        const { error: err } = await supabase
          .from('skills')
          .insert([payload]);
        error = err;
      }

      if (error) throw error;

      setIsModalOpen(false);
      setEditingSkill(null);
      setForm({ name: '', progress: 50, level: 'Expert', image_url: '', is_main: false, order_idx: 0 });
      fetchSkills();
      alert('Skill Mastery updated!');
    } catch (err) {
      console.error('Save failed:', err);
      alert('Failed to save skill.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Erase this skill from memory?')) return;
    const { error } = await supabase.from('skills').delete().eq('id', id);
    if (!error) fetchSkills();
  };

  return (
    <div className="min-h-screen bg-background-light p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <button 
              onClick={() => navigate('/admin/dashboard')}
              className="text-primary font-bold text-sm mb-2 flex items-center gap-1 hover:underline"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Back to Console
            </button>
            <h1 className="text-4xl font-black text-neutral-dark tracking-tighter">Skill Tree Console</h1>
            <p className="text-neutral-mid font-medium">Calibrate your mastery levels and tech stack.</p>
          </div>
          <button 
            onClick={() => { setEditingSkill(null); setForm({ name: '', progress: 50, level: 'Expert', image_url: '', is_main: false, order_idx: skills.length }); setIsModalOpen(true); }}
            className="flex items-center gap-2 bg-neutral-dark text-white px-8 py-4 rounded-2xl font-bold shadow-3d hover:shadow-3d-active transition-all active:translate-y-1 active:shadow-none"
          >
            <span className="material-symbols-outlined">add</span>
            New Skill Node
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center p-20">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {skills.map((skill) => (
              <div key={skill.id} className="bg-white rounded-[2rem] border border-neutral-light/10 shadow-premium p-6 group relative">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 flex items-center justify-center">
                    <img src={skill.image_url} alt={skill.name} className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-sm font-black text-neutral-dark">{skill.name}</h3>
                    <p className="text-[10px] font-bold text-primary uppercase">{skill.progress}% • {skill.level}</p>
                  </div>
                </div>

                <div className="absolute inset-0 bg-white/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 rounded-[2rem]">
                  <button 
                    onClick={() => { setEditingSkill(skill); setForm(skill); setIsModalOpen(true); }}
                    className="w-10 h-10 bg-neutral-dark text-white rounded-xl flex items-center justify-center"
                  >
                    <span className="material-symbols-outlined text-sm">edit</span>
                  </button>
                  <button 
                    onClick={() => handleDelete(skill.id)}
                    className="w-10 h-10 bg-red-500 text-white rounded-xl flex items-center justify-center"
                  >
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-6">
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white w-full max-w-xl rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl">
                <div className="p-8 border-b border-neutral-light/10 flex justify-between items-center">
                  <h2 className="text-2xl font-black text-neutral-dark">{editingSkill ? 'Edit Skill Node' : 'New Skill Node'}</h2>
                  <button onClick={() => setIsModalOpen(false)}><span className="material-symbols-outlined text-3xl text-neutral-mid">close</span></button>
                </div>
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                   <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-neutral-mid uppercase tracking-widest ml-1">Skill Name</label>
                        <input type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required className="w-full bg-neutral-light/5 border-2 border-transparent focus:border-primary rounded-xl py-3 px-4 outline-none" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-neutral-mid uppercase tracking-widest ml-1">Level Label</label>
                        <input type="text" value={form.level} onChange={(e) => setForm({...form, level: e.target.value})} placeholder="Expert, Master..." required className="w-full bg-neutral-light/5 border-2 border-transparent focus:border-primary rounded-xl py-3 px-4 outline-none" />
                      </div>
                   </div>

                   <div className="space-y-1">
                      <div className="flex justify-between items-center px-1">
                         <label className="text-[10px] font-black text-neutral-mid uppercase tracking-widest">Mastery Progress ({form.progress}%)</label>
                      </div>
                      <input type="range" min="0" max="100" value={form.progress} onChange={(e) => setForm({...form, progress: parseInt(e.target.value)})} className="w-full accent-primary" />
                   </div>

                   <div className="space-y-1">
                      <label className="text-[10px] font-black text-neutral-mid uppercase tracking-widest ml-1">Icon/Logo URL</label>
                      <div className="flex gap-2">
                        <input type="text" value={form.image_url} onChange={(e) => setForm({...form, image_url: e.target.value})} required className="flex-1 bg-neutral-light/5 border-2 border-transparent focus:border-primary rounded-xl py-3 px-4 outline-none text-xs" />
                        <label className="bg-neutral-light/10 p-3 rounded-xl cursor-pointer hover:bg-neutral-light/20">
                           <span className="material-symbols-outlined">image</span>
                           <input type="file" className="hidden" onChange={handleImageUpload} />
                        </label>
                      </div>
                   </div>

                   <div className="flex items-center gap-3 p-4 bg-neutral-light/5 rounded-2xl">
                      <input type="checkbox" checked={form.is_main} onChange={(e) => setForm({...form, is_main: e.target.checked})} className="w-5 h-5 accent-primary" />
                      <div>
                        <p className="text-xs font-black text-neutral-dark">Main Skill</p>
                        <p className="text-[10px] text-neutral-mid font-medium">Highlight this skill in the main hero visual.</p>
                      </div>
                   </div>

                   <button type="submit" disabled={uploading} className="w-full bg-neutral-dark text-white py-4 rounded-2xl font-black shadow-3d hover:shadow-3d-active transition-all active:translate-y-1 active:shadow-none">
                      {uploading ? 'Processing...' : 'Calibrate Node'}
                   </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SkillsManage;
