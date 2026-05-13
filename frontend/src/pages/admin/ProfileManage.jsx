import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { uploadImage } from '../../lib/storage';
import { useNavigate } from 'react-router-dom';

const ProfileManage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: '',
    nickname: '',
    level: '',
    role: '',
    description: '',
    streak: '',
    total_xp: '',
    quote: '',
    avatar_url: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .single();
    
    if (data) {
      setProfile(data);
      setForm(data);
    }
    setLoading(false);
  };

  const handleImageUpload = async (e) => {
    try {
      setSaving(true);
      const file = e.target.files[0];
      const url = await uploadImage(file, 'portfolio-assets', 'profiles');
      setForm({ ...form, avatar_url: url });
    } catch (err) {
      alert('Upload failed: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({ 
          ...form, 
          id: profile?.id,
          updated_at: new Date() 
        });

      if (error) throw error;
      alert('Profile Mastery synchronized successfully!');
      fetchProfile();
    } catch (err) {
      console.error('Save failed:', err);
      alert('Failed to sync profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background-light">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background-light p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <button 
            onClick={() => navigate('/admin/dashboard')}
            className="text-primary font-bold text-sm mb-4 flex items-center gap-1 hover:underline"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to Console
          </button>
          <h1 className="text-4xl font-black text-neutral-dark tracking-tighter">Profile Mastery</h1>
          <p className="text-neutral-mid font-medium">Update your global identity and system stats.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Avatar Area */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-neutral-light/10 shadow-premium flex flex-col md:flex-row items-center gap-8">
             <div className="relative group">
                <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-neutral-light/5 shadow-premium">
                   <img src={form.avatar_url || 'https://via.placeholder.com/150'} className="w-full h-full object-cover" />
                </div>
                <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-3xl">
                   <span className="material-symbols-outlined text-white text-3xl">photo_camera</span>
                   <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                </label>
             </div>
             <div className="flex-1 space-y-2 text-center md:text-left">
                <h3 className="text-xl font-black text-neutral-dark">Hero Avatar</h3>
                <p className="text-sm text-neutral-mid font-medium">Click image to upload a new profile picture. This is shown in the Hero and Stats sections.</p>
                <input 
                  type="text" 
                  value={form.avatar_url}
                  onChange={(e) => setForm({...form, avatar_url: e.target.value})}
                  placeholder="Or paste image URL directly"
                  className="w-full bg-neutral-light/5 border-2 border-transparent focus:border-primary rounded-xl py-2 px-4 text-xs outline-none mt-2"
                />
             </div>
          </div>

          {/* Identity Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="bg-white p-8 rounded-[2.5rem] border border-neutral-light/10 shadow-premium space-y-6">
                <h3 className="text-lg font-black text-neutral-dark flex items-center gap-2">
                   <span className="material-symbols-outlined text-primary">id_card</span>
                   Real Identity
                </h3>
                <div className="space-y-4">
                   <div className="space-y-1">
                      <label className="text-[10px] font-black text-neutral-mid uppercase tracking-widest ml-2">Full Name</label>
                      <input 
                        type="text" 
                        value={form.name}
                        onChange={(e) => setForm({...form, name: e.target.value})}
                        className="w-full bg-neutral-light/5 border-2 border-transparent focus:border-primary rounded-2xl py-4 px-6 outline-none"
                      />
                   </div>
                   <div className="space-y-1">
                      <label className="text-[10px] font-black text-neutral-mid uppercase tracking-widest ml-2">Nickname</label>
                      <input 
                        type="text" 
                        value={form.nickname}
                        onChange={(e) => setForm({...form, nickname: e.target.value})}
                        className="w-full bg-neutral-light/5 border-2 border-transparent focus:border-primary rounded-2xl py-4 px-6 outline-none"
                      />
                   </div>
                   <div className="space-y-1">
                      <label className="text-[10px] font-black text-neutral-mid uppercase tracking-widest ml-2">Main Role</label>
                      <input 
                        type="text" 
                        value={form.role}
                        onChange={(e) => setForm({...form, role: e.target.value})}
                        className="w-full bg-neutral-light/5 border-2 border-transparent focus:border-primary rounded-2xl py-4 px-6 outline-none"
                      />
                   </div>
                </div>
             </div>

             <div className="bg-white p-8 rounded-[2.5rem] border border-neutral-light/10 shadow-premium space-y-6">
                <h3 className="text-lg font-black text-neutral-dark flex items-center gap-2">
                   <span className="material-symbols-outlined text-accent-orange">bolt</span>
                   System Stats
                </h3>
                <div className="space-y-4">
                   <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                         <label className="text-[10px] font-black text-neutral-mid uppercase tracking-widest ml-2">Current Level</label>
                         <input 
                           type="text" 
                           value={form.level}
                           onChange={(e) => setForm({...form, level: e.target.value})}
                           className="w-full bg-neutral-light/5 border-2 border-transparent focus:border-primary rounded-2xl py-4 px-6 outline-none"
                         />
                      </div>
                      <div className="space-y-1">
                         <label className="text-[10px] font-black text-neutral-mid uppercase tracking-widest ml-2">Streak</label>
                         <input 
                           type="text" 
                           value={form.streak}
                           onChange={(e) => setForm({...form, streak: e.target.value})}
                           className="w-full bg-neutral-light/5 border-2 border-transparent focus:border-primary rounded-2xl py-4 px-6 outline-none"
                         />
                      </div>
                   </div>
                   <div className="space-y-1">
                      <label className="text-[10px] font-black text-neutral-mid uppercase tracking-widest ml-2">Total XP</label>
                      <input 
                        type="text" 
                        value={form.total_xp}
                        onChange={(e) => setForm({...form, total_xp: e.target.value})}
                        className="w-full bg-neutral-light/5 border-2 border-transparent focus:border-primary rounded-2xl py-4 px-6 outline-none"
                      />
                   </div>
                   <div className="space-y-1">
                      <label className="text-[10px] font-black text-neutral-mid uppercase tracking-widest ml-2">Signature Quote</label>
                      <input 
                        type="text" 
                        value={form.quote}
                        onChange={(e) => setForm({...form, quote: e.target.value})}
                        className="w-full bg-neutral-light/5 border-2 border-transparent focus:border-primary rounded-2xl py-4 px-6 outline-none"
                      />
                   </div>
                </div>
             </div>
          </div>

          {/* Description Area */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-neutral-light/10 shadow-premium space-y-6">
             <h3 className="text-lg font-black text-neutral-dark flex items-center gap-2">
                <span className="material-symbols-outlined text-accent-blue">description</span>
                System Description
             </h3>
             <textarea 
               value={form.description}
               onChange={(e) => setForm({...form, description: e.target.value})}
               rows={4}
               className="w-full bg-neutral-light/5 border-2 border-transparent focus:border-primary rounded-2xl py-4 px-6 outline-none resize-none"
               placeholder="Write your hero description here..."
             />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
             <button 
               type="submit"
               disabled={saving}
               className="bg-neutral-dark text-white px-12 py-5 rounded-[2rem] font-black shadow-3d hover:shadow-3d-active transition-all active:translate-y-1 active:shadow-none disabled:opacity-50 flex items-center gap-3"
             >
               <span className="material-symbols-outlined">sync</span>
               {saving ? 'Synchronizing...' : 'Sync Profile Mastery'}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileManage;
