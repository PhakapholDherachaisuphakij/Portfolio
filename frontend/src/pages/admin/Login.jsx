import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../../lib/supabase";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Map username 'GodzK' to full admin email if typed
    const loginEmail =
      email.toLowerCase() === "godzk" ? "godzk@journey.com" : email;

    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[2.5rem] shadow-premium p-10 border border-neutral-light/10"
      >
        <div className="flex flex-col items-center gap-6 mb-10">
          <div className="w-16 h-16 bg-neutral-dark rounded-2xl flex items-center justify-center shadow-3d">
            <span className="material-symbols-outlined text-primary text-4xl">
              lock
            </span>
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-black text-neutral-dark tracking-tighter uppercase">
              Admin Portal
            </h1>
            <p className="text-primary font-black text-[10px] uppercase tracking-[0.3em] mt-1 mb-2">
              Exclusive For PK Only
            </p>
            <p className="text-neutral-mid font-medium text-sm px-4">
              Masterpiece control console for Phakaphol Dhera.
            </p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold border border-red-100">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-black text-neutral-mid uppercase tracking-[0.2em] ml-2">
              Username or Email
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-neutral-light/5 border-2 border-transparent focus:border-primary focus:bg-white rounded-2xl py-4 px-6 outline-none transition-all font-medium"
              placeholder="email"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-neutral-mid uppercase tracking-[0.2em] ml-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-neutral-light/5 border-2 border-transparent focus:border-primary focus:bg-white rounded-2xl py-4 px-6 outline-none transition-all font-medium"
              placeholder="••••••••"
            />
          </div>

          <button
            disabled={loading}
            className="w-full py-4 bg-neutral-dark text-white rounded-2xl font-bold shadow-3d hover:shadow-3d-active transition-all active:translate-y-1 active:shadow-none disabled:opacity-50 uppercase tracking-widest text-sm"
          >
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </form>

        <div className="mt-10 text-center">
          <a
            href="/"
            className="text-sm font-bold text-neutral-mid hover:text-primary transition-colors"
          >
            ← Return to Public Site
          </a>
        </div>
      </motion.div>

      {/* Decorative */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-blue/10 blur-[100px] rounded-full" />
      </div>
    </div>
  );
};

export default AdminLogin;
