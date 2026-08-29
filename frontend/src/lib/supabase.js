import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://homelab.tail7d4c51.ts.net';
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

export const STORAGE_BASE_URL = `${supabaseUrl}/storage/v1/object/public/portfolio-assets`;
export const PROJECT_REF = 'homelab';


