import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Loader2, ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { MagneticButton } from '@/components/MagneticButton';
import alchemyLogo from '@/assets/alchemy-logo.png';

const AdminAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if already logged in and is admin
    const checkAdminStatus = async (userId: string) => {
      const { data, error } = await supabase
        .from('admin_users')
        .select('id')
        .eq('user_id', userId)
        .maybeSingle();
      
      if (error) {
        console.error('Error checking admin status:', error);
        return false;
      }
      return !!data;
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        const isAdmin = await checkAdminStatus(session.user.id);
        if (isAdmin) {
          navigate('/admin');
        }
      }
    });

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session) {
        const isAdmin = await checkAdminStatus(session.user.id);
        if (isAdmin) {
          navigate('/admin');
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Check if user is an admin
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('id')
        .eq('user_id', data.user.id)
        .maybeSingle();

      if (adminError) {
        console.error('Error checking admin status:', adminError);
        await supabase.auth.signOut();
        toast.error('Authorization check failed');
        return;
      }

      if (!adminData) {
        // User is not an admin - sign them out
        await supabase.auth.signOut();
        toast.error('Access denied. You are not authorized to access this area.');
        return;
      }

      toast.success('Welcome back!');
      navigate('/admin');
    } catch (error: any) {
      console.error('Auth error:', error);
      if (error.message.includes('Invalid login credentials')) {
        toast.error('Invalid email or password');
      } else {
        toast.error('Authentication failed');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-alchemy-black flex items-center justify-center p-6">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-alchemy-red/10 rounded-full blur-[150px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Back link */}
        <a
          href="/"
          className="inline-flex items-center gap-2 text-porcelain/50 hover:text-porcelain transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-body text-sm">Back to site</span>
        </a>

        {/* Card */}
        <div className="glass-deep rounded-3xl p-8 md:p-12">
          {/* Logo */}
          <div className="text-center mb-8">
            <img
              src={alchemyLogo}
              alt="Alchemy Labs"
              className="w-16 h-16 mx-auto mb-4"
            />
            <h1 className="font-display text-2xl text-porcelain">
              Admin <span className="italic text-alchemy-red">Portal</span>
            </h1>
            <p className="font-body text-sm text-porcelain/50 mt-2">
              Sign in to manage submissions
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="font-mono text-xs text-porcelain/50 tracking-label uppercase">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-porcelain/30" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@company.com"
                  className="glass-input pl-12"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-mono text-xs text-porcelain/50 tracking-label uppercase">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-porcelain/30" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="glass-input pl-12"
                  required
                  minLength={6}
                  disabled={isLoading}
                />
              </div>
            </div>

            <MagneticButton
              type="submit"
              className="glass-cta-primary w-full justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </MagneticButton>
          </form>

          {/* Info notice */}
          <p className="text-center mt-6 font-body text-xs text-porcelain/40">
            Admin access is invite-only. Contact your administrator if you need access.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminAuth;
