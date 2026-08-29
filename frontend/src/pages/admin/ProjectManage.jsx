import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { uploadImage } from '../../lib/storage';
import { useNavigate } from 'react-router-dom';

const ProjectManage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    tech_stack: '', // Store as comma separated and convert to array on save
    image_url: '',
    experience_text: '',
    link: ''
  });
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('order_idx', { ascending: true });
    
    if (!error) setProjects(data);
    setLoading(false);
  };

  const handleImageUpload = async (e) => {
    try {
      setUploading(true);
      const file = e.target.files[0];
      const url = await uploadImage(file, 'portfolio-assets', 'projects');
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
      // Tech stack handling: split by comma if it's a string, otherwise use as is
      const techArray = typeof form.tech_stack === 'string' 
        ? form.tech_stack.split(',').map(s => s.trim()).filter(s => s)
        : form.tech_stack;

      const payload = {
        title: form.title,
        description: form.description,
        tech_stack: techArray,
        image_url: form.image_url,
        experience_text: form.experience_text,
        link: form.link,
        order_idx: projects.length // Simple ordering
      };

      let error;
      if (editingProject) {
        const { error: err } = await supabase
          .from('projects')
          .update(payload)
          .eq('id', editingProject.id);
        error = err;
      } else {
        const { error: err } = await supabase
          .from('projects')
          .insert([payload]);
        error = err;
      }

      if (error) throw error;

      setIsModalOpen(false);
      setEditingProject(null);
      setForm({ title: '', description: '', tech_stack: '', image_url: '', experience_text: '', link: '' });
      fetchProjects();
      alert('Project Mastery updated successfully!');
    } catch (err) {
      console.error('Save failed:', err);
      alert('Failed to save project. Check console for details.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (!error) fetchProjects();
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
            <h1 className="text-4xl font-black text-neutral-dark tracking-tighter">Manage Project Quest</h1>
          </div>
          <button 
            onClick={() => { setEditingProject(null); setForm({ title: '', description: '', tech_stack: '', image_url: '', experience_text: '', link: '' }); setIsModalOpen(true); }}
            className="flex items-center gap-2 bg-neutral-dark text-white px-8 py-4 rounded-2xl font-bold shadow-3d hover:shadow-3d-active transition-all active:translate-y-1 active:shadow-none"
          >
            <span className="material-symbols-outlined">add</span>
            New Project
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center p-20">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-[2rem] border border-neutral-light/10 shadow-premium overflow-hidden group">
                <div className="h-48 overflow-hidden relative">
                  <img src={project.image_url} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button 
                      onClick={() => { setEditingProject(project); setForm({...project, tech_stack: project.tech_stack.join(', ')}); setIsModalOpen(true); }}
                      className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-neutral-dark"
                    >
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button 
                      onClick={() => handleDelete(project.id)}
                      className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center text-white"
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.tech_stack?.slice(0, 3).map(tech => (
                      <span key={tech} className="text-[8px] font-black uppercase text-neutral-mid px-2 py-1 bg-neutral-light/10 rounded-lg">{tech}</span>
                    ))}
                  </div>
                  <h3 className="text-xl font-black text-neutral-dark line-clamp-1">{project.title}</h3>
                  <p className="text-sm text-neutral-mid line-clamp-2 mt-2">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <AnimatePresence>
          {isModalOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl"
              >
                <div className="p-8 border-b border-neutral-light/10 flex justify-between items-center">
                  <h2 className="text-2xl font-black text-neutral-dark">{editingProject ? 'Edit Project' : 'Create New Project'}</h2>
                  <button onClick={() => setIsModalOpen(false)} className="text-neutral-mid hover:text-neutral-dark transition-colors">
                    <span className="material-symbols-outlined text-4xl">close</span>
                  </button>
                </div>

                <div className="flex-grow overflow-y-auto p-8">
                  <form id="projectForm" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-xs font-black text-neutral-mid uppercase tracking-widest ml-2">Project Title</label>
                        <input 
                          type="text" 
                          value={form.title}
                          onChange={(e) => setForm({...form, title: e.target.value})}
                          required
                          className="w-full bg-neutral-light/5 border-2 border-transparent focus:border-primary rounded-2xl py-4 px-6 outline-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-neutral-mid uppercase tracking-widest ml-2">Tech Stack (comma separated)</label>
                        <input 
                          type="text" 
                          value={form.tech_stack}
                          onChange={(e) => setForm({...form, tech_stack: e.target.value})}
                          required
                          placeholder="React, Tailwind, Supabase"
                          className="w-full bg-neutral-light/5 border-2 border-transparent focus:border-primary rounded-2xl py-4 px-6 outline-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-neutral-mid uppercase tracking-widest ml-2">App/Repo Link</label>
                        <input 
                          type="url" 
                          value={form.link}
                          onChange={(e) => setForm({...form, link: e.target.value})}
                          required
                          className="w-full bg-neutral-light/5 border-2 border-transparent focus:border-primary rounded-2xl py-4 px-6 outline-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-neutral-mid uppercase tracking-widest ml-2">Description</label>
                        <textarea 
                          value={form.description}
                          onChange={(e) => setForm({...form, description: e.target.value})}
                          required
                          rows={3}
                          className="w-full bg-neutral-light/5 border-2 border-transparent focus:border-primary rounded-2xl py-4 px-6 outline-none resize-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-xs font-black text-neutral-mid uppercase tracking-widest ml-2">Cover Image</label>
                        <div className="relative group">
                          {form.image_url ? (
                            <div className="h-40 rounded-2xl overflow-hidden relative border border-neutral-light/10">
                              <img src={form.image_url} className="w-full h-full object-cover" />
                              <button 
                                type="button"
                                onClick={() => setForm({...form, image_url: ''})}
                                className="absolute top-2 right-2 w-8 h-8 bg-red-500 rounded-full text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <span className="material-symbols-outlined text-sm">delete</span>
                              </button>
                            </div>
                          ) : (
                            <label className="h-40 border-2 border-dashed border-neutral-light/20 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-neutral-light/5 transition-all">
                              <span className="material-symbols-outlined text-4xl text-neutral-light">image</span>
                              <span className="text-xs font-bold text-neutral-light mt-2">Upload Hero Image</span>
                              <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                            </label>
                          )}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-neutral-mid uppercase tracking-widest ml-2">Experience / Growth Story</label>
                        <textarea 
                          value={form.experience_text}
                          onChange={(e) => setForm({...form, experience_text: e.target.value})}
                          rows={5}
                          placeholder="What did you learn from this project?"
                          className="w-full bg-neutral-light/5 border-2 border-transparent focus:border-primary rounded-2xl py-4 px-6 outline-none resize-none"
                        />
                      </div>
                    </div>
                  </form>
                </div>

                <div className="p-8 border-t border-neutral-light/10 bg-neutral-light/5 flex justify-end gap-4">
                   <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-8 py-4 font-bold text-neutral-mid hover:text-neutral-dark transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    form="projectForm"
                    type="submit"
                    disabled={uploading}
                    className="bg-neutral-dark text-white px-10 py-4 rounded-2xl font-bold shadow-3d hover:shadow-3d-active transition-all active:translate-y-1 active:shadow-none disabled:opacity-50"
                  >
                    {uploading ? 'Processing...' : 'Save Project'}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProjectManage;
