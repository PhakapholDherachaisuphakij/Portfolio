import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    // Custom lock resolver to completely prevent Navigator LockManager timeouts on Vite HMR / reload
    lock: async (name, acquireTimeout, fn) => {
      return await fn();
    },
  },
});

export const PROJECT_REF =
  import.meta.env.VITE_SUPABASE_PROJECT_REF ||
  (supabaseUrl && supabaseUrl.includes('supabase.co')
    ? supabaseUrl.replace('https://', '').split('.')[0]
    : 'frpbnexgcxfjpsrlsylt');
