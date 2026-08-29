import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { uploadImage, uploadMultipleImages } from '../../lib/storage';
import { useNavigate } from 'react-router-dom';

const ActivityManage = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);
  const [form, setForm] = useState({
    title: '',
    semester: '',
    period_label: '',
    description: '',
    main_image: '',
    gallery: []
  });
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .order('order_idx', { ascending: true });
    
    if (!error) setActivities(data);
    setLoading(false);
  };

  const handleMainImageUpload = async (e) => {
    try {
      setUploading(true);
      const file = e.target.files[0];
      const url = await uploadImage(file, 'portfolio-assets', 'activities');
      setForm({ ...form, main_image: url });
    } catch (err) {
      alert('Upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleGalleryUpload = async (e) => {
    try {
      setUploading(true);
      const files = e.target.files;
      const urls = await uploadMultipleImages(files, 'portfolio-assets', 'activities');
      setForm({ ...form, gallery: [...form.gallery, ...urls] });
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
        title: form.title,
        semester: form.semester,
        period_label: form.period_label,
        description: form.description,
        main_image: form.main_image,
        gallery: form.gallery,
        order_idx: activities.length
      };

      let error;
      if (editingActivity) {
        const { error: err } = await supabase
          .from('activities')
          .update(payload)
          .eq('id', editingActivity.id);
        error = err;
      } else {
        const { error: err } = await supabase
          .from('activities')
          .insert([payload]);
        error = err;
      }

      if (error) throw error;

      setIsModalOpen(false);
      setEditingActivity(null);
      setForm({ title: '', semester: '', period_label: '', description: '', main_image: '', gallery: [] });
      fetchActivities();
      alert('Activity Mastery updated successfully!');
    } catch (err) {
      console.error('Save failed:', err);
      alert('Failed to save activity.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    const { error } = await supabase.from('activities').delete().eq('id', id);
    if (!error) fetchActivities();
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
            <h1 className="text-4xl font-black text-neutral-dark tracking-tighter">Manage Activity Log</h1>
          </div>
          <button 
            onClick={() => { setEditingActivity(null); setForm({ title: '', semester: '', period_label: '', description: '', main_image: '', gallery: [] }); setIsModalOpen(true); }}
            className="flex items-center gap-2 bg-neutral-dark text-white px-8 py-4 rounded-2xl font-bold shadow-3d hover:shadow-3d-active transition-all active:translate-y-1 active:shadow-none"
          >
            <span className="material-symbols-outlined">add</span>
            New Activity
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center p-20">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity) => (
              <div key={activity.id} className="bg-white rounded-[2rem] border border-neutral-light/10 shadow-premium overflow-hidden group">
                <div className="h-48 overflow-hidden relative">
                  <img src={activity.main_image} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button 
                      onClick={() => { setEditingActivity(activity); setForm(activity); setIsModalOpen(true); }}
                      className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-neutral-dark"
                    >
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button 
                      onClick={() => handleDelete(activity.id)}
                      className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center text-white"
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-[10px] font-black uppercase text-primary mb-1 block tracking-widest">{activity.semester}</span>
                  <h3 className="text-xl font-black text-neutral-dark line-clamp-1">{activity.title}</h3>
                  <p className="text-sm text-neutral-mid line-clamp-2 mt-2">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal Overlay */}
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
                  <h2 className="text-2xl font-black text-neutral-dark">{editingActivity ? 'Edit Activity' : 'Create New Activity'}</h2>
                  <button onClick={() => setIsModalOpen(false)} className="text-neutral-mid hover:text-neutral-dark transition-colors">
                    <span className="material-symbols-outlined text-4xl">close</span>
                  </button>
                </div>

                <div className="flex-grow overflow-y-auto p-8">
                  <form id="activityForm" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-xs font-black text-neutral-mid uppercase tracking-widest ml-2">Activity Title</label>
                        <input 
                          type="text" 
                          value={form.title}
                          onChange={(e) => setForm({...form, title: e.target.value})}
                          required
                          className="w-full bg-neutral-light/5 border-2 border-transparent focus:border-primary rounded-2xl py-4 px-6 outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs font-black text-neutral-mid uppercase tracking-widest ml-2">Semester</label>
                          <input 
                            type="text" 
                            value={form.semester}
                            onChange={(e) => setForm({...form, semester: e.target.value})}
                            required
                            placeholder="e.g. Semester 2"
                            className="w-full bg-neutral-light/5 border-2 border-transparent focus:border-primary rounded-2xl py-4 px-6 outline-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-black text-neutral-mid uppercase tracking-widest ml-2">Period Label</label>
                          <input 
                            type="text" 
                            value={form.period_label}
                            onChange={(e) => setForm({...form, period_label: e.target.value})}
                            required
                            placeholder="e.g. 2024"
                            className="w-full bg-neutral-light/5 border-2 border-transparent focus:border-primary rounded-2xl py-4 px-6 outline-none"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-neutral-mid uppercase tracking-widest ml-2">Description</label>
                        <textarea 
                          value={form.description}
                          onChange={(e) => setForm({...form, description: e.target.value})}
                          required
                          rows={4}
                          className="w-full bg-neutral-light/5 border-2 border-transparent focus:border-primary rounded-2xl py-4 px-6 outline-none resize-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-6">
                      {/* Main Image */}
                      <div className="space-y-2">
                        <label className="text-xs font-black text-neutral-mid uppercase tracking-widest ml-2">Main Cover Image</label>
                        <div className="relative group">
                          {form.main_image ? (
                            <div className="h-40 rounded-2xl overflow-hidden relative">
                              <img src={form.main_image} className="w-full h-full object-cover" />
                              <button 
                                type="button"
                                onClick={() => setForm({...form, main_image: ''})}
                                className="absolute top-2 right-2 w-8 h-8 bg-red-500 rounded-full text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <span className="material-symbols-outlined text-sm">delete</span>
                              </button>
                            </div>
                          ) : (
                            <label className="h-40 border-2 border-dashed border-neutral-light/20 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-neutral-light/5 transition-all">
                              <span className="material-symbols-outlined text-4xl text-neutral-light">image</span>
                              <span className="text-xs font-bold text-neutral-light mt-2">Upload Cover</span>
                              <input type="file" className="hidden" onChange={handleMainImageUpload} accept="image/*" />
                            </label>
                          )}
                        </div>
                      </div>

                      {/* Gallery */}
                      <div className="space-y-2">
                        <label className="text-xs font-black text-neutral-mid uppercase tracking-widest ml-2">Gallery Images (Bulk Upload)</label>
                        <div className="grid grid-cols-4 gap-2 mb-4">
                          {form.gallery.map((url, i) => (
                            <div key={i} className="aspect-square rounded-lg overflow-hidden relative group">
                              <img src={url} className="w-full h-full object-cover" />
                              <button 
                                type="button"
                                onClick={() => setForm({...form, gallery: form.gallery.filter((_, idx) => idx !== i)})}
                                className="absolute inset-0 bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <span className="material-symbols-outlined text-xs">delete</span>
                              </button>
                            </div>
                          ))}
                          <label className="aspect-square border-2 border-dashed border-neutral-light/20 rounded-lg flex items-center justify-center cursor-pointer hover:bg-neutral-light/5 transition-all">
                            <span className="material-symbols-outlined text-neutral-light">add</span>
                            <input type="file" multiple className="hidden" onChange={handleGalleryUpload} accept="image/*" />
                          </label>
                        </div>
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
                    form="activityForm"
                    type="submit"
                    disabled={uploading}
                    className="bg-neutral-dark text-white px-10 py-4 rounded-2xl font-bold shadow-3d hover:shadow-3d-active transition-all active:translate-y-1 active:shadow-none disabled:opacity-50"
                  >
                    {uploading ? 'Processing...' : 'Save Activity'}
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

export default ActivityManage;
