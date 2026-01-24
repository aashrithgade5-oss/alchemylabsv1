import { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  Trash2,
  Users,
  TrendingUp,
  Eye,
  MessageSquare,
  Clock,
  RefreshCw,
  BarChart3,
  FileText,
  Settings,
  Home,
  Inbox
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

type TabType = 'overview' | 'submissions' | 'analytics';

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<ContactSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [userEmail, setUserEmail] = useState<string>('');
  const navigate = useNavigate();

  // Check if user is admin
  const checkAdminStatus = async (userId: string): Promise<boolean> => {
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

  useEffect(() => {
    // Check auth state and admin role
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!session) {
        navigate('/admin/auth');
      } else {
        const isAdmin = await checkAdminStatus(session.user.id);
        if (!isAdmin) {
          toast.error('Access denied. You are not authorized to access this area.');
          await supabase.auth.signOut();
          navigate('/admin/auth');
        } else {
          setUserEmail(session.user.email || '');
        }
      }
    });

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) {
        navigate('/admin/auth');
      } else {
        const isAdmin = await checkAdminStatus(session.user.id);
        if (!isAdmin) {
          toast.error('Access denied. You are not authorized to access this area.');
          await supabase.auth.signOut();
          navigate('/admin/auth');
        } else {
          setUserEmail(session.user.email || '');
          fetchSubmissions();
        }
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

  // Analytics calculations
  const analytics = useMemo(() => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    const thisWeek = submissions.filter(s => new Date(s.created_at) >= weekAgo);
    const thisMonth = submissions.filter(s => new Date(s.created_at) >= monthAgo);
    
    // Service breakdown
    const serviceBreakdown = submissions.reduce((acc, s) => {
      const service = s.service || 'Unspecified';
      acc[service] = (acc[service] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Recent activity (last 7 days by day)
    const dailyActivity: Record<string, number> = {};
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dateKey = date.toLocaleDateString('en-US', { weekday: 'short' });
      dailyActivity[dateKey] = 0;
    }
    thisWeek.forEach(s => {
      const dateKey = new Date(s.created_at).toLocaleDateString('en-US', { weekday: 'short' });
      if (dailyActivity[dateKey] !== undefined) {
        dailyActivity[dateKey]++;
      }
    });

    return {
      total: submissions.length,
      thisWeek: thisWeek.length,
      thisMonth: thisMonth.length,
      uniqueServices: Object.keys(serviceBreakdown).length,
      serviceBreakdown,
      dailyActivity,
      avgPerWeek: thisMonth.length > 0 ? Math.round((thisMonth.length / 4) * 10) / 10 : 0,
    };
  }, [submissions]);

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

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return formatDate(dateString);
  };

  const tabs = [
    { id: 'overview' as TabType, label: 'Overview', icon: Home },
    { id: 'submissions' as TabType, label: 'Submissions', icon: Inbox },
    { id: 'analytics' as TabType, label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-alchemy-black">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 border-r border-porcelain/5 bg-alchemy-black/50 backdrop-blur-xl z-40 hidden lg:block">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-3">
            <img src={alchemyLogo} alt="Alchemy Labs" className="w-10 h-10" />
            <div>
              <h1 className="font-display text-lg text-porcelain">
                <span className="italic text-alchemy-red">Admin</span>
              </h1>
              <p className="font-mono text-[9px] text-porcelain/40 uppercase tracking-wider">Dashboard</p>
            </div>
          </Link>
        </div>

        <nav className="px-3 mt-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-alchemy-red/10 text-alchemy-red border border-alchemy-red/20'
                  : 'text-porcelain/60 hover:text-porcelain hover:bg-porcelain/5'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="font-body text-sm">{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-porcelain/5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-alchemy-red/20 flex items-center justify-center">
              <span className="font-body text-xs text-alchemy-red uppercase">
                {userEmail.charAt(0)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-body text-xs text-porcelain truncate">{userEmail}</p>
              <p className="font-mono text-[9px] text-porcelain/40">Administrator</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-porcelain/50 hover:text-porcelain hover:bg-porcelain/5 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="font-body text-xs">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-50 glass-nav">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <img src={alchemyLogo} alt="Alchemy Labs" className="w-8 h-8" />
            </Link>
            <h1 className="font-display text-lg text-porcelain">
              Admin <span className="italic text-alchemy-red">Dashboard</span>
            </h1>
          </div>
          <button
            onClick={handleSignOut}
            className="p-2 text-porcelain/50 hover:text-porcelain"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
        
        {/* Mobile Tabs */}
        <div className="flex border-t border-porcelain/5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-3 ${
                activeTab === tab.id
                  ? 'text-alchemy-red border-b-2 border-alchemy-red'
                  : 'text-porcelain/50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="font-body text-xs">{tab.label}</span>
            </button>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 lg:py-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-display text-2xl text-porcelain mb-1">Welcome back</h2>
                  <p className="font-body text-sm text-porcelain/50">Here's what's happening with your site</p>
                </div>
                <button
                  onClick={fetchSubmissions}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg glass text-porcelain/70 hover:text-porcelain transition-colors"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                  <span className="font-body text-sm hidden sm:inline">Refresh</span>
                </button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="glass-deep rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-alchemy-red/10 flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-alchemy-red" />
                    </div>
                  </div>
                  <p className="font-display text-3xl text-porcelain mb-1">{analytics.total}</p>
                  <p className="font-mono text-[10px] text-porcelain/40 uppercase tracking-wider">Total Inquiries</p>
                </div>

                <div className="glass-deep rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                    </div>
                  </div>
                  <p className="font-display text-3xl text-porcelain mb-1">{analytics.thisWeek}</p>
                  <p className="font-mono text-[10px] text-porcelain/40 uppercase tracking-wider">This Week</p>
                </div>

                <div className="glass-deep rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-blue-500" />
                    </div>
                  </div>
                  <p className="font-display text-3xl text-porcelain mb-1">{analytics.thisMonth}</p>
                  <p className="font-mono text-[10px] text-porcelain/40 uppercase tracking-wider">This Month</p>
                </div>

                <div className="glass-deep rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-purple-500" />
                    </div>
                  </div>
                  <p className="font-display text-3xl text-porcelain mb-1">{analytics.avgPerWeek}</p>
                  <p className="font-mono text-[10px] text-porcelain/40 uppercase tracking-wider">Avg/Week</p>
                </div>
              </div>

              {/* Recent Submissions */}
              <div className="glass-deep rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-lg text-porcelain">Recent Inquiries</h3>
                  <button
                    onClick={() => setActiveTab('submissions')}
                    className="font-body text-xs text-alchemy-red hover:underline"
                  >
                    View All →
                  </button>
                </div>

                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-6 h-6 animate-spin text-alchemy-red" />
                  </div>
                ) : submissions.length === 0 ? (
                  <p className="text-center py-12 font-body text-porcelain/50">No submissions yet</p>
                ) : (
                  <div className="space-y-3">
                    {submissions.slice(0, 5).map((s) => (
                      <div
                        key={s.id}
                        className="flex items-center gap-4 p-4 rounded-xl bg-porcelain/[0.02] hover:bg-porcelain/[0.04] transition-colors"
                      >
                        <div className="w-10 h-10 rounded-full bg-alchemy-red/10 flex items-center justify-center flex-shrink-0">
                          <span className="font-body text-sm text-alchemy-red uppercase">
                            {s.name.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-body text-sm text-porcelain truncate">{s.name}</p>
                          <p className="font-mono text-[10px] text-porcelain/40 truncate">{s.email}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          {s.service && (
                            <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-mono bg-alchemy-red/10 text-alchemy-red mb-1">
                              {s.service}
                            </span>
                          )}
                          <p className="font-mono text-[10px] text-porcelain/40">{formatRelativeTime(s.created_at)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Submissions Tab */}
          {activeTab === 'submissions' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Filters */}
              <div className="glass-deep rounded-2xl p-4 mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
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
                      className="glass-input pl-12 pr-10 cursor-pointer appearance-none min-w-[180px]"
                      style={{ backgroundColor: 'rgba(20, 20, 22, 0.95)' }}
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
                    <Clock className="w-4 h-4" />
                    <span className="font-body text-sm">
                      {sortOrder === 'desc' ? 'Newest' : 'Oldest'}
                    </span>
                    {sortOrder === 'desc' ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronUp className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submissions list */}
              {isLoading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="w-8 h-8 animate-spin text-alchemy-red" />
                </div>
              ) : filteredSubmissions.length === 0 ? (
                <div className="text-center py-20">
                  <p className="font-body text-porcelain/50">
                    {searchQuery || serviceFilter !== 'all'
                      ? 'No submissions match your filters'
                      : 'No submissions yet'}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredSubmissions.map((submission, i) => (
                    <motion.div
                      key={submission.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="glass-deep rounded-2xl overflow-hidden"
                    >
                      {/* Header */}
                      <button
                        onClick={() => setExpandedId(expandedId === submission.id ? null : submission.id)}
                        className="w-full p-5 flex items-center gap-4 text-left hover:bg-white/[0.02] transition-colors"
                      >
                        <div className="w-10 h-10 rounded-full bg-alchemy-red/10 flex items-center justify-center flex-shrink-0">
                          <span className="font-body text-sm text-alchemy-red uppercase">
                            {submission.name.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <h3 className="font-body text-base text-porcelain truncate">
                              {submission.name}
                            </h3>
                            {submission.service && (
                              <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-alchemy-red/15 text-alchemy-red flex-shrink-0">
                                {submission.service}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-xs text-porcelain/50">
                            <span className="flex items-center gap-1 truncate">
                              <Mail className="w-3 h-3 flex-shrink-0" />
                              {submission.email}
                            </span>
                            {submission.company && (
                              <span className="flex items-center gap-1 truncate">
                                <Building2 className="w-3 h-3 flex-shrink-0" />
                                {submission.company}
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="font-mono text-[10px] text-porcelain/40 whitespace-nowrap">
                          {formatRelativeTime(submission.created_at)}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-porcelain/40 transition-transform flex-shrink-0 ${
                            expandedId === submission.id ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {/* Expanded content */}
                      <AnimatePresence>
                        {expandedId === submission.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="border-t border-porcelain/5"
                          >
                            <div className="p-5">
                              <p className="font-mono text-[10px] text-porcelain/40 uppercase tracking-wider mb-2">
                                Message
                              </p>
                              <p className="font-body text-sm text-porcelain/80 leading-relaxed whitespace-pre-wrap mb-4">
                                {submission.message}
                              </p>

                              <p className="font-mono text-[10px] text-porcelain/40 mb-4">
                                Submitted: {formatDate(submission.created_at)}
                              </p>

                              <div className="flex items-center gap-3 pt-4 border-t border-porcelain/5">
                                <a
                                  href={`mailto:${submission.email}`}
                                  className="inline-flex items-center gap-2 px-4 py-2 glass rounded-lg text-porcelain/70 hover:text-porcelain transition-colors"
                                >
                                  <Mail className="w-4 h-4" />
                                  <span className="font-body text-sm">Reply</span>
                                </a>
                                <button
                                  onClick={() => handleDelete(submission.id)}
                                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  <span className="font-body text-sm">Delete</span>
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="font-display text-2xl text-porcelain mb-6">Analytics</h2>

              {/* Weekly Activity */}
              <div className="glass-deep rounded-2xl p-6 mb-6">
                <h3 className="font-body text-sm text-porcelain/60 mb-4">Last 7 Days Activity</h3>
                <div className="flex items-end justify-between gap-2 h-32">
                  {Object.entries(analytics.dailyActivity).map(([day, count]) => {
                    const maxCount = Math.max(...Object.values(analytics.dailyActivity), 1);
                    const height = (count / maxCount) * 100;
                    return (
                      <div key={day} className="flex-1 flex flex-col items-center gap-2">
                        <div className="w-full max-w-[40px] flex items-end justify-center" style={{ height: '80px' }}>
                          <div
                            className="w-full rounded-t-lg bg-alchemy-red/20 transition-all duration-500"
                            style={{ height: `${Math.max(height, 4)}%` }}
                          />
                        </div>
                        <span className="font-mono text-[9px] text-porcelain/40">{day}</span>
                        <span className="font-mono text-[10px] text-porcelain/60">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Service Breakdown */}
              <div className="glass-deep rounded-2xl p-6">
                <h3 className="font-body text-sm text-porcelain/60 mb-4">Inquiries by Service</h3>
                <div className="space-y-3">
                  {Object.entries(analytics.serviceBreakdown).map(([service, count]) => {
                    const percentage = (count / analytics.total) * 100;
                    return (
                      <div key={service}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-body text-sm text-porcelain">{service}</span>
                          <span className="font-mono text-xs text-porcelain/50">{count} ({Math.round(percentage)}%)</span>
                        </div>
                        <div className="h-2 rounded-full bg-porcelain/5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            className="h-full rounded-full bg-alchemy-red/40"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;