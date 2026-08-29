import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';

const ExperienceManage = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState(null);
  const [form, setForm] = useState({
    period: '',
    title: '',
    company: '',
    description: '',
    color: 'primary',
    order_idx: 0
  });
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('experience')
      .select('*')
      .order('order_idx', { ascending: true });
    
    if (!error) setExperiences(data);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        ...form,
        order_idx: editingExp ? form.order_idx : experiences.length
      };

      let error;
      if (editingExp) {
        const { error: err } = await supabase
          .from('experience')
          .update(payload)
          .eq('id', editingExp.id);
        error = err;
      } else {
        const { error: err } = await supabase
          .from('experience')
          .insert([payload]);
        error = err;
      }

      if (error) throw error;

      setIsModalOpen(false);
      setEditingExp(null);
      setForm({ period: '', title: '', company: '', description: '', color: 'primary', order_idx: 0 });
      fetchExperiences();
      alert('Career timeline synchronized!');
    } catch (err) {
      console.error('Save failed:', err);
      alert('Failed to save experience.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this career milestone?')) return;
    const { error } = await supabase.from('experience').delete().eq('id', id);
    if (!error) fetchExperiences();
  };

  const colors = [
    { label: 'Green (Primary)', value: 'primary' },
    { label: 'Purple (SCB/QA)', value: 'purple-400' },
    { label: 'Orange (Blogger)', value: 'orange-500' },
    { label: 'Blue (Frontend)', value: 'blue-500' },
  ];

  return (
    <div className="min-h-screen bg-background-light p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <button 
              onClick={() => navigate('/admin/dashboard')}
              className="text-primary font-bold text-sm mb-2 flex items-center gap-1 hover:underline"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Back to Console
            </button>
            <h1 className="text-4xl font-black text-neutral-dark tracking-tighter">Career Quest Path</h1>
            <p className="text-neutral-mid font-medium">Manage your professional journey and milestones.</p>
          </div>
          <button 
            onClick={() => { setEditingExp(null); setForm({ period: '', title: '', company: '', description: '', color: 'primary', order_idx: experiences.length }); setIsModalOpen(true); }}
            className="flex items-center gap-2 bg-neutral-dark text-white px-8 py-4 rounded-2xl font-bold shadow-3d hover:shadow-3d-active transition-all active:translate-y-1 active:shadow-none"
          >
            <span className="material-symbols-outlined">add</span>
            Add Milestone
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center p-20">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {experiences.map((exp) => (
              <div key={exp.id} className="bg-white rounded-[2rem] border border-neutral-light/10 shadow-premium p-8 flex flex-col md:flex-row items-center gap-8 group">
                <div className="w-full md:w-48 text-center md:text-left">
                  <span className="px-3 py-1 bg-neutral-light/5 border border-neutral-light/10 rounded-full text-[10px] font-black text-neutral-mid uppercase tracking-widest">
                    {exp.period}
                  </span>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-black text-neutral-dark">{exp.title}</h3>
                  <p className="text-sm font-bold text-primary uppercase mt-1">{exp.company}</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => { setEditingExp(exp); setForm(exp); setIsModalOpen(true); }}
                    className="w-12 h-12 bg-neutral-light/5 text-neutral-dark rounded-xl flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm"
                  >
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <button 
                    onClick={() => handleDelete(exp.id)}
                    className="w-12 h-12 bg-neutral-light/5 text-red-500 rounded-xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm"
                  >
                    <span className="material-symbols-outlined">delete</span>
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
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white w-full max-w-2xl rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl">
                <div className="p-8 border-b border-neutral-light/10 flex justify-between items-center bg-neutral-light/5">
                  <h2 className="text-2xl font-black text-neutral-dark">{editingExp ? 'Edit Milestone' : 'New Milestone'}</h2>
                  <button onClick={() => setIsModalOpen(false)}><span className="material-symbols-outlined text-3xl text-neutral-mid">close</span></button>
                </div>
                <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[80vh] overflow-y-auto">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-neutral-mid uppercase tracking-widest ml-1">Period (e.g. 2024 - 2025)</label>
                        <input type="text" value={form.period} onChange={(e) => setForm({...form, period: e.target.value})} required className="w-full bg-neutral-light/5 border-2 border-transparent focus:border-primary rounded-xl py-3 px-4 outline-none" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-neutral-mid uppercase tracking-widest ml-1">Accent Theme</label>
                        <select value={form.color} onChange={(e) => setForm({...form, color: e.target.value})} className="w-full bg-neutral-light/5 border-2 border-transparent focus:border-primary rounded-xl py-3 px-4 outline-none appearance-none">
                           {colors.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                        </select>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-neutral-mid uppercase tracking-widest ml-1">Job Title</label>
                        <input type="text" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} required className="w-full bg-neutral-light/5 border-2 border-transparent focus:border-primary rounded-xl py-3 px-4 outline-none" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-neutral-mid uppercase tracking-widest ml-1">Company / Org</label>
                        <input type="text" value={form.company} onChange={(e) => setForm({...form, company: e.target.value})} required className="w-full bg-neutral-light/5 border-2 border-transparent focus:border-primary rounded-xl py-3 px-4 outline-none" />
                      </div>
                   </div>

                   <div className="space-y-1">
                      <label className="text-[10px] font-black text-neutral-mid uppercase tracking-widest ml-1">Key Contributions & Achievements</label>
                      <textarea 
                        value={form.description} 
                        onChange={(e) => setForm({...form, description: e.target.value})} 
                        rows={4} 
                        required 
                        className="w-full bg-neutral-light/5 border-2 border-transparent focus:border-primary rounded-xl py-3 px-4 outline-none resize-none"
                      />
                   </div>

                   <button type="submit" disabled={saving} className="w-full bg-neutral-dark text-white py-5 rounded-[2rem] font-black shadow-3d hover:shadow-3d-active transition-all active:translate-y-1 active:shadow-none flex items-center justify-center gap-3">
                      <span className="material-symbols-outlined">save</span>
                      {saving ? 'Syncing...' : 'Save Milestone'}
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

export default ExperienceManage;
