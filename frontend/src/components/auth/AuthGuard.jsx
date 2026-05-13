import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const AuthGuard = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      // Strict check: must be the specific admin email
      if (session && session.user.email === 'godzk@journey.com') {
        setAuthenticated(true);
      } else {
        // If there's a session but it's the wrong email, sign them out immediately
        if (session) await supabase.auth.signOut();
        setAuthenticated(false);
        navigate('/admin/login');
      }
      setLoading(false);
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session && session.user.email === 'godzk@journey.com') {
          setAuthenticated(true);
        } else {
          if (session) await supabase.auth.signOut();
          setAuthenticated(false);
          navigate('/admin/login');
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return authenticated ? children : null;
};

export default AuthGuard;
