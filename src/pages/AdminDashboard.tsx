import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  LogOut, 
  Mail, 
  Building2, 
  Calendar, 
  ChevronDown,
  ChevronUp,
  Loader2,
  ArrowLeft,
  Trash2
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import alchemyLogo from '@/assets/alchemy-logo.png';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company: string | null;
  service: string | null;
  message: string;
  created_at: string;
}

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<ContactSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate('/admin/auth');
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/admin/auth');
      } else {
        fetchSubmissions();
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchSubmissions = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
      setFilteredSubmissions(data || []);
    } catch (error: any) {
      console.error('Error fetching submissions:', error);
      toast.error('Failed to load submissions');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let filtered = [...submissions];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          s.email.toLowerCase().includes(query) ||
          s.company?.toLowerCase().includes(query) ||
          s.message.toLowerCase().includes(query)
      );
    }

    // Apply service filter
    if (serviceFilter !== 'all') {
      filtered = filtered.filter((s) => s.service === serviceFilter);
    }

    // Apply sort
    filtered.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

    setFilteredSubmissions(filtered);
  }, [searchQuery, serviceFilter, sortOrder, submissions]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success('Signed out successfully');
    navigate('/admin/auth');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this submission?')) return;

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setSubmissions((prev) => prev.filter((s) => s.id !== id));
      toast.success('Submission deleted');
    } catch (error: any) {
      console.error('Error deleting submission:', error);
      toast.error('Failed to delete submission');
    }
  };

  const uniqueServices = [...new Set(submissions.map((s) => s.service).filter(Boolean))];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-alchemy-black">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-nav">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-2 text-porcelain/50 hover:text-porcelain transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </a>
            <img src={alchemyLogo} alt="Alchemy Labs" className="w-8 h-8" />
            <h1 className="font-display text-xl text-porcelain">
              Admin <span className="italic text-alchemy-red">Dashboard</span>
            </h1>
          </div>
          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 px-4 py-2 font-body text-sm text-porcelain/50 hover:text-porcelain transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-deep rounded-2xl p-6"
          >
            <span className="font-mono text-xs text-porcelain/50 uppercase tracking-label">
              Total Submissions
            </span>
            <p className="font-display text-4xl italic text-alchemy-red mt-2">
              {submissions.length}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-deep rounded-2xl p-6"
          >
            <span className="font-mono text-xs text-porcelain/50 uppercase tracking-label">
              This Week
            </span>
            <p className="font-display text-4xl italic text-alchemy-red mt-2">
              {submissions.filter((s) => {
                const date = new Date(s.created_at);
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                return date >= weekAgo;
              }).length}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-deep rounded-2xl p-6"
          >
            <span className="font-mono text-xs text-porcelain/50 uppercase tracking-label">
              Unique Services
            </span>
            <p className="font-display text-4xl italic text-alchemy-red mt-2">
              {uniqueServices.length}
            </p>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-deep rounded-2xl p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-porcelain/30" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, email, company..."
                className="glass-input pl-12 w-full"
              />
            </div>

            {/* Service filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-porcelain/30" />
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="glass-input pl-12 pr-10 cursor-pointer appearance-none min-w-[200px]"
              >
                <option value="all">All Services</option>
                {uniqueServices.map((service) => (
                  <option key={service} value={service!}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort toggle */}
            <button
              onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
              className="inline-flex items-center gap-2 px-4 py-3 glass rounded-lg text-porcelain/70 hover:text-porcelain transition-colors"
            >
              <Calendar className="w-4 h-4" />
              <span className="font-body text-sm">
                {sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}
              </span>
              {sortOrder === 'desc' ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronUp className="w-4 h-4" />
              )}
            </button>
          </div>
        </motion.div>

        {/* Submissions list */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-alchemy-red" />
          </div>
        ) : filteredSubmissions.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="font-body text-porcelain/50">
              {searchQuery || serviceFilter !== 'all'
                ? 'No submissions match your filters'
                : 'No submissions yet'}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {filteredSubmissions.map((submission, i) => (
              <motion.div
                key={submission.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-deep rounded-2xl overflow-hidden"
              >
                {/* Header */}
                <button
                  onClick={() => setExpandedId(expandedId === submission.id ? null : submission.id)}
                  className="w-full p-6 flex items-center gap-6 text-left hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-display text-lg text-porcelain truncate">
                        {submission.name}
                      </h3>
                      {submission.service && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-mono bg-alchemy-red/20 text-alchemy-red">
                          {submission.service}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-porcelain/50">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {submission.email}
                      </span>
                      {submission.company && (
                        <span className="flex items-center gap-1">
                          <Building2 className="w-3 h-3" />
                          {submission.company}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="font-mono text-xs text-porcelain/40 whitespace-nowrap">
                    {formatDate(submission.created_at)}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-porcelain/40 transition-transform ${
                      expandedId === submission.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Expanded content */}
                {expandedId === submission.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-porcelain/5"
                  >
                    <div className="p-6">
                      <h4 className="font-mono text-xs text-porcelain/50 uppercase tracking-label mb-3">
                        Message
                      </h4>
                      <p className="font-body text-porcelain/80 leading-relaxed whitespace-pre-wrap">
                        {submission.message}
                      </p>

                      <div className="flex items-center gap-4 mt-6 pt-6 border-t border-porcelain/5">
                        <a
                          href={`mailto:${submission.email}`}
                          className="inline-flex items-center gap-2 px-4 py-2 glass rounded-lg text-porcelain/70 hover:text-porcelain transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                          <span className="font-body text-sm">Reply via Email</span>
                        </a>
                        <button
                          onClick={() => handleDelete(submission.id)}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="font-body text-sm">Delete</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
