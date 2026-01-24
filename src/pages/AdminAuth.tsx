import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Loader2, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { MagneticButton } from '@/components/MagneticButton';
import alchemyLogo from '@/assets/alchemy-logo.png';
import footerBg from '@/assets/footer-bg.png';

const AdminAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
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
      if (isSignUp) {
        // Sign up flow
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        toast.success('Account created! Please check your email or contact admin for access.');
        setIsSignUp(false);
      } else {
        // Sign in flow
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
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      if (error.message.includes('Invalid login credentials')) {
        toast.error('Invalid email or password');
      } else if (error.message.includes('already registered')) {
        toast.error('This email is already registered. Try signing in.');
      } else {
        toast.error(error.message || 'Authentication failed');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-alchemy-black flex items-center justify-center p-6 relative">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <img 
          src={footerBg} 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover opacity-30 blur-md"
        />
        <div className="absolute inset-0 bg-alchemy-black/80" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-porcelain/50 hover:text-porcelain transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-body text-sm">Back to site</span>
        </Link>

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
              {isSignUp ? 'Create an admin account' : 'Sign in to manage your site'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="font-mono text-[10px] text-porcelain/50 tracking-[0.15em] uppercase">
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
              <label className="font-mono text-[10px] text-porcelain/50 tracking-[0.15em] uppercase">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-porcelain/30" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="glass-input pl-12 pr-12"
                  required
                  minLength={6}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-porcelain/30 hover:text-porcelain/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
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
                  <span>{isSignUp ? 'Creating account...' : 'Signing in...'}</span>
                </>
              ) : (
                <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
              )}
            </MagneticButton>
          </form>

          {/* Toggle */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="font-body text-xs text-porcelain/50 hover:text-porcelain transition-colors"
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>

          {/* Info notice */}
          <p className="text-center mt-6 font-body text-[10px] text-porcelain/40">
            Admin access requires approval. After signup, contact the site owner to be granted access.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminAuth;