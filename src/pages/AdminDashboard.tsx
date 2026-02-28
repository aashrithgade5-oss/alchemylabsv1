import { useState, useEffect, useMemo, useCallback } from 'react';
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
  Trash2,
  TrendingUp,
  MessageSquare,
  Clock,
  RefreshCw,
  BarChart3,
  Home,
  Inbox,
  Globe,
  ExternalLink,
  Copy,
  CheckCircle2,
  AlertCircle,
  Activity,
  Zap,
  Target,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Bell,
  Settings,
  Eye,
  MousePointer,
  Smartphone,
  Monitor,
  Users
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import alchemyLogo from '@/assets/alchemy-minimal-logo.png';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company: string | null;
  service: string | null;
  message: string;
  created_at: string;
}

type TabType = 'overview' | 'submissions' | 'analytics' | 'quicklinks';

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
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
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
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!session) {
        navigate('/admin/auth');
      } else {
        const isAdmin = await checkAdminStatus(session.user.id);
        if (!isAdmin) {
          toast.error('Access denied. You are not authorized.');
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
          toast.error('Access denied. You are not authorized.');
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

  // Real-time subscription for new submissions
  useEffect(() => {
    const channel = supabase
      .channel('contact_submissions_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'contact_submissions'
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setSubmissions(prev => [payload.new as ContactSubmission, ...prev]);
            toast.success('New inquiry received!', {
              description: `From ${(payload.new as ContactSubmission).name}`
            });
          } else if (payload.eventType === 'DELETE') {
            setSubmissions(prev => prev.filter(s => s.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

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
      setLastRefresh(new Date());
    } catch (error: any) {
      console.error('Error fetching submissions:', error);
      toast.error('Failed to load submissions');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let filtered = [...submissions];

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

    if (serviceFilter !== 'all') {
      filtered = filtered.filter((s) => s.service === serviceFilter);
    }

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

  const copyToClipboard = useCallback((text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(label);
    toast.success(`${label} copied!`);
    setTimeout(() => setCopiedLink(null), 2000);
  }, []);

  // Enhanced Analytics
  const analytics = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    const todaySubmissions = submissions.filter(s => new Date(s.created_at) >= today);
    const thisWeek = submissions.filter(s => new Date(s.created_at) >= weekAgo);
    const lastWeek = submissions.filter(s => {
      const date = new Date(s.created_at);
      return date >= twoWeeksAgo && date < weekAgo;
    });
    const thisMonth = submissions.filter(s => new Date(s.created_at) >= monthAgo);
    
    // Calculate week-over-week change
    const weekChange = lastWeek.length > 0 
      ? Math.round(((thisWeek.length - lastWeek.length) / lastWeek.length) * 100)
      : thisWeek.length > 0 ? 100 : 0;

    // Service breakdown
    const serviceBreakdown = submissions.reduce((acc, s) => {
      const service = s.service || 'Unspecified';
      acc[service] = (acc[service] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Company breakdown (top 5)
    const companyBreakdown = submissions.reduce((acc, s) => {
      const company = s.company || 'Individual';
      acc[company] = (acc[company] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const topCompanies = Object.entries(companyBreakdown)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    // Hourly distribution (for today)
    const hourlyDistribution: Record<string, number> = {};
    for (let i = 0; i < 24; i++) {
      hourlyDistribution[`${i}:00`] = 0;
    }
    todaySubmissions.forEach(s => {
      const hour = new Date(s.created_at).getHours();
      hourlyDistribution[`${hour}:00`]++;
    });

    // Daily activity (last 7 days)
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

    // Monthly trend (last 4 weeks)
    const weeklyTrend: { week: string; count: number }[] = [];
    for (let i = 3; i >= 0; i--) {
      const weekStart = new Date(now.getTime() - (i + 1) * 7 * 24 * 60 * 60 * 1000);
      const weekEnd = new Date(now.getTime() - i * 7 * 24 * 60 * 60 * 1000);
      const count = submissions.filter(s => {
        const date = new Date(s.created_at);
        return date >= weekStart && date < weekEnd;
      }).length;
      weeklyTrend.push({
        week: `W${4 - i}`,
        count
      });
    }

    // Response time estimation (mock - you could track actual response times)
    const avgResponseTime = '< 24h';

    // Conversion funnel (mock - you could track page views)
    const conversionRate = submissions.length > 0 ? '~12%' : '0%';

    return {
      total: submissions.length,
      today: todaySubmissions.length,
      thisWeek: thisWeek.length,
      thisMonth: thisMonth.length,
      weekChange,
      uniqueServices: Object.keys(serviceBreakdown).length,
      serviceBreakdown,
      companyBreakdown: topCompanies,
      dailyActivity,
      weeklyTrend,
      hourlyDistribution,
      avgPerWeek: thisMonth.length > 0 ? Math.round((thisMonth.length / 4) * 10) / 10 : 0,
      avgResponseTime,
      conversionRate,
      peakHour: Object.entries(hourlyDistribution).reduce((a, b) => a[1] > b[1] ? a : b, ['0:00', 0])[0],
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
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return formatDate(dateString);
  };

  // Quick Links for site navigation
  const quickLinks = [
    { label: 'Homepage', path: '/', icon: Home },
    { label: 'Solutions Hub', path: '/solutions', icon: Target },
    { label: 'AI Solutions', path: '/solutions/ai', icon: Zap },
    { label: 'Branding', path: '/solutions/branding', icon: PieChart },
    { label: 'Work/Portfolio', path: '/work', icon: Eye },
    { label: 'About Us', path: '/about', icon: Users },
    { label: 'Journal/Blog', path: '/journal', icon: MessageSquare },
    { label: 'Contact', path: '/contact', icon: Mail },
  ];

  const externalLinks = [
    { label: 'Live Site', url: 'https://alchemylabsv1.lovable.app', icon: Globe },
    { label: 'Instagram', url: 'https://www.instagram.com/brandalchemy._', icon: ExternalLink },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/company/brandalchemylabs/', icon: ExternalLink },
    { label: 'YouTube', url: 'https://www.youtube.com/@brandalchemy-in', icon: ExternalLink },
  ];

  const tabs = [
    { id: 'overview' as TabType, label: 'Overview', icon: Home },
    { id: 'submissions' as TabType, label: 'Submissions', icon: Inbox, badge: analytics.today > 0 ? analytics.today : undefined },
    { id: 'analytics' as TabType, label: 'Analytics', icon: BarChart3 },
    { id: 'quicklinks' as TabType, label: 'Quick Links', icon: Globe },
  ];

  // System status mock data
  const systemStatus = {
    site: { status: 'operational', label: 'Site Status' },
    database: { status: 'operational', label: 'Database' },
    email: { status: 'operational', label: 'Email Service' },
  };

  return (
    <div className="min-h-screen bg-alchemy-black">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 border-r border-porcelain/5 bg-alchemy-black/50 backdrop-blur-xl z-40 hidden lg:flex flex-col">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-3 group">
            <img src={alchemyLogo} alt="Alchemy Labs" className="w-10 h-10 group-hover:scale-105 transition-transform" />
            <div>
              <h1 className="font-display text-lg text-porcelain">
                <span className="italic text-alchemy-red">Admin</span>
              </h1>
              <p className="font-mono text-[9px] text-porcelain/40 uppercase tracking-wider">Dashboard</p>
            </div>
          </Link>
        </div>

        {/* System Status */}
        <div className="px-4 mb-4">
          <div className="glass rounded-xl p-3">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-3 h-3 text-green-400" />
              <span className="font-mono text-[9px] text-porcelain/60 uppercase tracking-wider">System Status</span>
            </div>
            <div className="space-y-1.5">
              {Object.entries(systemStatus).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="font-body text-[10px] text-porcelain/50">{value.label}</span>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="font-mono text-[9px] text-green-400">Live</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <nav className="px-3 flex-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl mb-1 transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-alchemy-red/10 text-alchemy-red border border-alchemy-red/20'
                  : 'text-porcelain/60 hover:text-porcelain hover:bg-porcelain/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <tab.icon className="w-4 h-4" />
                <span className="font-body text-sm">{tab.label}</span>
              </div>
              {tab.badge && (
                <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-alchemy-red text-white">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Last Refresh */}
        <div className="px-4 py-3 border-t border-porcelain/5">
          <div className="flex items-center justify-between text-porcelain/40">
            <span className="font-mono text-[9px]">Last sync</span>
            <span className="font-mono text-[9px]">{lastRefresh.toLocaleTimeString()}</span>
          </div>
        </div>

        <div className="p-4 border-t border-porcelain/5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-alchemy-red/30 to-alchemy-red/10 flex items-center justify-center ring-1 ring-alchemy-red/20">
              <span className="font-body text-sm text-alchemy-red uppercase font-medium">
                {userEmail.charAt(0)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-body text-xs text-porcelain truncate">{userEmail}</p>
              <p className="font-mono text-[9px] text-alchemy-red/60">Administrator</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-porcelain/50 hover:text-porcelain hover:bg-porcelain/5 transition-colors border border-porcelain/10"
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
              Admin <span className="italic text-alchemy-red">Panel</span>
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchSubmissions}
              className="p-2 text-porcelain/50 hover:text-porcelain"
            >
              <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={handleSignOut}
              className="p-2 text-porcelain/50 hover:text-porcelain"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Mobile Tabs */}
        <div className="flex border-t border-porcelain/5 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[80px] flex items-center justify-center gap-1.5 px-3 py-3 ${
                activeTab === tab.id
                  ? 'text-alchemy-red border-b-2 border-alchemy-red'
                  : 'text-porcelain/50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="font-body text-[10px]">{tab.label}</span>
              {tab.badge && (
                <span className="w-4 h-4 rounded-full text-[8px] font-mono bg-alchemy-red text-white flex items-center justify-center">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-8">
          
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl text-porcelain mb-1">
                    Welcome back, <span className="italic text-alchemy-red">Admin</span>
                  </h2>
                  <p className="font-body text-sm text-porcelain/50">
                    Here's your real-time site activity overview
                  </p>
                </div>
                <button
                  onClick={fetchSubmissions}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl glass text-porcelain/70 hover:text-porcelain transition-colors self-start"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                  <span className="font-body text-sm">Refresh Data</span>
                </button>
              </div>

              {/* Hero Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="glass-deep rounded-2xl p-5 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-alchemy-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-alchemy-red/10 flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-alchemy-red" />
                      </div>
                    </div>
                    <p className="font-display text-3xl sm:text-4xl text-porcelain mb-1">{analytics.total}</p>
                    <p className="font-mono text-[10px] text-porcelain/40 uppercase tracking-wider">Total Inquiries</p>
                  </div>
                </div>

                <div className="glass-deep rounded-2xl p-5 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-amber-500" />
                      </div>
                      {analytics.today > 0 && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-amber-500/20 text-amber-400">
                          New!
                        </span>
                      )}
                    </div>
                    <p className="font-display text-3xl sm:text-4xl text-porcelain mb-1">{analytics.today}</p>
                    <p className="font-mono text-[10px] text-porcelain/40 uppercase tracking-wider">Today</p>
                  </div>
                </div>

                <div className="glass-deep rounded-2xl p-5 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-green-500" />
                      </div>
                      {analytics.weekChange !== 0 && (
                        <div className={`flex items-center gap-0.5 ${analytics.weekChange > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {analytics.weekChange > 0 ? (
                            <ArrowUpRight className="w-3 h-3" />
                          ) : (
                            <ArrowDownRight className="w-3 h-3" />
                          )}
                          <span className="font-mono text-[10px]">{Math.abs(analytics.weekChange)}%</span>
                        </div>
                      )}
                    </div>
                    <p className="font-display text-3xl sm:text-4xl text-porcelain mb-1">{analytics.thisWeek}</p>
                    <p className="font-mono text-[10px] text-porcelain/40 uppercase tracking-wider">This Week</p>
                  </div>
                </div>

                <div className="glass-deep rounded-2xl p-5 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-blue-500" />
                      </div>
                    </div>
                    <p className="font-display text-3xl sm:text-4xl text-porcelain mb-1">{analytics.thisMonth}</p>
                    <p className="font-mono text-[10px] text-porcelain/40 uppercase tracking-wider">This Month</p>
                  </div>
                </div>
              </div>

              {/* Secondary Stats Row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="glass rounded-xl p-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <p className="font-display text-lg text-porcelain">{analytics.avgPerWeek}</p>
                    <p className="font-mono text-[9px] text-porcelain/40 uppercase">Avg/Week</p>
                  </div>
                </div>
                <div className="glass rounded-xl p-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <p className="font-display text-lg text-porcelain">{analytics.avgResponseTime}</p>
                    <p className="font-mono text-[9px] text-porcelain/40 uppercase">Avg Response</p>
                  </div>
                </div>
                <div className="glass rounded-xl p-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center">
                    <Target className="w-4 h-4 text-pink-400" />
                  </div>
                  <div>
                    <p className="font-display text-lg text-porcelain">{analytics.uniqueServices}</p>
                    <p className="font-mono text-[9px] text-porcelain/40 uppercase">Services</p>
                  </div>
                </div>
                <div className="glass rounded-xl p-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                    <Activity className="w-4 h-4 text-orange-400" />
                  </div>
                  <div>
                    <p className="font-display text-lg text-porcelain">{analytics.peakHour}</p>
                    <p className="font-mono text-[9px] text-porcelain/40 uppercase">Peak Hour</p>
                  </div>
                </div>
              </div>

              {/* Two Column Layout */}
              <div className="grid lg:grid-cols-2 gap-6">
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
                    <div className="text-center py-12">
                      <Inbox className="w-12 h-12 text-porcelain/20 mx-auto mb-3" />
                      <p className="font-body text-porcelain/50">No submissions yet</p>
                      <p className="font-mono text-[10px] text-porcelain/30 mt-1">
                        They'll appear here in real-time
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {submissions.slice(0, 5).map((s, i) => (
                        <motion.div
                          key={s.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-center gap-4 p-3 rounded-xl bg-porcelain/[0.02] hover:bg-porcelain/[0.04] transition-colors cursor-pointer"
                          onClick={() => {
                            setActiveTab('submissions');
                            setExpandedId(s.id);
                          }}
                        >
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-alchemy-red/20 to-alchemy-red/5 flex items-center justify-center flex-shrink-0">
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
                              <span className="inline-block px-2 py-0.5 rounded-full text-[8px] font-mono bg-alchemy-red/10 text-alchemy-red mb-1">
                                {s.service.split(' ')[0]}
                              </span>
                            )}
                            <p className="font-mono text-[9px] text-porcelain/40">{formatRelativeTime(s.created_at)}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Weekly Activity Chart */}
                <div className="glass-deep rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display text-lg text-porcelain">Weekly Activity</h3>
                    <span className="font-mono text-[10px] text-porcelain/40">Last 7 days</span>
                  </div>
                  <div className="flex items-end justify-between gap-2 h-36">
                    {Object.entries(analytics.dailyActivity).map(([day, count], i) => {
                      const maxCount = Math.max(...Object.values(analytics.dailyActivity), 1);
                      const height = (count / maxCount) * 100;
                      const isToday = i === Object.keys(analytics.dailyActivity).length - 1;
                      return (
                        <div key={day} className="flex-1 flex flex-col items-center gap-2 group">
                          <div className="w-full max-w-[40px] flex items-end justify-center h-24">
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: `${Math.max(height, 8)}%` }}
                              transition={{ duration: 0.6, delay: i * 0.05 }}
                              className={`w-full rounded-t-lg transition-colors ${
                                isToday 
                                  ? 'bg-alchemy-red/40 group-hover:bg-alchemy-red/60' 
                                  : 'bg-porcelain/10 group-hover:bg-porcelain/20'
                              }`}
                            />
                          </div>
                          <span className={`font-mono text-[9px] ${isToday ? 'text-alchemy-red' : 'text-porcelain/40'}`}>
                            {day}
                          </span>
                          <span className="font-mono text-[10px] text-porcelain/60">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Service Breakdown */}
              <div className="glass-deep rounded-2xl p-6">
                <h3 className="font-display text-lg text-porcelain mb-4">Inquiries by Service</h3>
                {Object.keys(analytics.serviceBreakdown).length === 0 ? (
                  <p className="text-center py-8 font-body text-porcelain/50">No data yet</p>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(analytics.serviceBreakdown).map(([service, count], i) => {
                      const percentage = (count / analytics.total) * 100;
                      return (
                        <motion.div
                          key={service}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="glass rounded-xl p-4"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-body text-sm text-porcelain truncate">{service}</span>
                            <span className="font-mono text-xs text-alchemy-red ml-2">{count}</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-porcelain/5 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ duration: 0.8, ease: 'easeOut' }}
                              className="h-full rounded-full bg-gradient-to-r from-alchemy-red/60 to-alchemy-red/30"
                            />
                          </div>
                          <p className="font-mono text-[9px] text-porcelain/40 mt-1">{Math.round(percentage)}% of total</p>
                        </motion.div>
                      );
                    })}
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
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-display text-2xl text-porcelain mb-1">All Submissions</h2>
                  <p className="font-body text-sm text-porcelain/50">
                    {filteredSubmissions.length} of {submissions.length} shown
                  </p>
                </div>
              </div>

              {/* Filters */}
              <div className="glass-deep rounded-2xl p-4 mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
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
                  <Inbox className="w-16 h-16 text-porcelain/20 mx-auto mb-4" />
                  <p className="font-body text-porcelain/50 mb-2">
                    {searchQuery || serviceFilter !== 'all'
                      ? 'No submissions match your filters'
                      : 'No submissions yet'}
                  </p>
                  {(searchQuery || serviceFilter !== 'all') && (
                    <button
                      onClick={() => { setSearchQuery(''); setServiceFilter('all'); }}
                      className="font-body text-xs text-alchemy-red hover:underline"
                    >
                      Clear filters
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredSubmissions.map((submission, i) => (
                    <motion.div
                      key={submission.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.02 }}
                      className="glass-deep rounded-2xl overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedId(expandedId === submission.id ? null : submission.id)}
                        className="w-full p-5 flex items-center gap-4 text-left hover:bg-white/[0.02] transition-colors"
                      >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-alchemy-red/20 to-alchemy-red/5 flex items-center justify-center flex-shrink-0">
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
                                  href={`mailto:${submission.email}?subject=Re: Your inquiry to Alchemy Labs`}
                                  className="inline-flex items-center gap-2 px-4 py-2 glass rounded-lg text-porcelain/70 hover:text-porcelain transition-colors"
                                >
                                  <Mail className="w-4 h-4" />
                                  <span className="font-body text-sm">Reply</span>
                                </a>
                                <button
                                  onClick={() => copyToClipboard(submission.email, 'Email')}
                                  className="inline-flex items-center gap-2 px-4 py-2 glass rounded-lg text-porcelain/70 hover:text-porcelain transition-colors"
                                >
                                  {copiedLink === 'Email' ? (
                                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                                  ) : (
                                    <Copy className="w-4 h-4" />
                                  )}
                                  <span className="font-body text-sm">Copy Email</span>
                                </button>
                                <button
                                  onClick={() => handleDelete(submission.id)}
                                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-colors ml-auto"
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
              className="space-y-6"
            >
              <div>
                <h2 className="font-display text-2xl text-porcelain mb-1">Analytics Overview</h2>
                <p className="font-body text-sm text-porcelain/50">
                  Insights and trends from your inquiry data
                </p>
              </div>

              {/* Trend Cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="glass-deep rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10px] text-porcelain/50 uppercase">Week over Week</span>
                    {analytics.weekChange > 0 ? (
                      <ArrowUpRight className="w-4 h-4 text-green-400" />
                    ) : analytics.weekChange < 0 ? (
                      <ArrowDownRight className="w-4 h-4 text-red-400" />
                    ) : (
                      <Activity className="w-4 h-4 text-porcelain/40" />
                    )}
                  </div>
                  <p className={`font-display text-2xl ${
                    analytics.weekChange > 0 ? 'text-green-400' : analytics.weekChange < 0 ? 'text-red-400' : 'text-porcelain'
                  }`}>
                    {analytics.weekChange > 0 ? '+' : ''}{analytics.weekChange}%
                  </p>
                  <p className="font-mono text-[9px] text-porcelain/40 mt-1">vs last week</p>
                </div>

                <div className="glass-deep rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10px] text-porcelain/50 uppercase">Avg Response</span>
                    <Clock className="w-4 h-4 text-cyan-400" />
                  </div>
                  <p className="font-display text-2xl text-porcelain">{analytics.avgResponseTime}</p>
                  <p className="font-mono text-[9px] text-porcelain/40 mt-1">target: &lt; 24h</p>
                </div>

                <div className="glass-deep rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10px] text-porcelain/50 uppercase">Peak Activity</span>
                    <Zap className="w-4 h-4 text-amber-400" />
                  </div>
                  <p className="font-display text-2xl text-porcelain">{analytics.peakHour}</p>
                  <p className="font-mono text-[9px] text-porcelain/40 mt-1">most active hour</p>
                </div>

                <div className="glass-deep rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10px] text-porcelain/50 uppercase">Services</span>
                    <Target className="w-4 h-4 text-purple-400" />
                  </div>
                  <p className="font-display text-2xl text-porcelain">{analytics.uniqueServices}</p>
                  <p className="font-mono text-[9px] text-porcelain/40 mt-1">active categories</p>
                </div>
              </div>

              {/* Charts Row */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Weekly Activity */}
                <div className="glass-deep rounded-2xl p-6">
                  <h3 className="font-body text-sm text-porcelain/60 mb-4">Last 7 Days Activity</h3>
                  <div className="flex items-end justify-between gap-2 h-40">
                    {Object.entries(analytics.dailyActivity).map(([day, count], i) => {
                      const maxCount = Math.max(...Object.values(analytics.dailyActivity), 1);
                      const height = (count / maxCount) * 100;
                      const isToday = i === Object.keys(analytics.dailyActivity).length - 1;
                      return (
                        <div key={day} className="flex-1 flex flex-col items-center gap-2 group">
                          <span className="font-mono text-[10px] text-porcelain/60 opacity-0 group-hover:opacity-100 transition-opacity">
                            {count}
                          </span>
                          <div className="w-full max-w-[40px] flex items-end justify-center h-24">
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: `${Math.max(height, 4)}%` }}
                              transition={{ duration: 0.6, delay: i * 0.08 }}
                              className={`w-full rounded-t-lg transition-all ${
                                isToday 
                                  ? 'bg-gradient-to-t from-alchemy-red/60 to-alchemy-red/30' 
                                  : 'bg-gradient-to-t from-porcelain/20 to-porcelain/5 group-hover:from-porcelain/30'
                              }`}
                            />
                          </div>
                          <span className={`font-mono text-[9px] ${isToday ? 'text-alchemy-red font-medium' : 'text-porcelain/40'}`}>
                            {day}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Monthly Trend */}
                <div className="glass-deep rounded-2xl p-6">
                  <h3 className="font-body text-sm text-porcelain/60 mb-4">Monthly Trend (Last 4 Weeks)</h3>
                  <div className="flex items-end justify-between gap-4 h-40">
                    {analytics.weeklyTrend.map((week, i) => {
                      const maxCount = Math.max(...analytics.weeklyTrend.map(w => w.count), 1);
                      const height = (week.count / maxCount) * 100;
                      return (
                        <div key={week.week} className="flex-1 flex flex-col items-center gap-2 group">
                          <span className="font-mono text-sm text-porcelain font-medium">
                            {week.count}
                          </span>
                          <div className="w-full flex items-end justify-center h-24">
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: `${Math.max(height, 8)}%` }}
                              transition={{ duration: 0.6, delay: i * 0.1 }}
                              className="w-full rounded-xl bg-gradient-to-t from-alchemy-red/40 to-alchemy-red/10 group-hover:from-alchemy-red/60"
                            />
                          </div>
                          <span className="font-mono text-[10px] text-porcelain/50">{week.week}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Service Breakdown */}
              <div className="glass-deep rounded-2xl p-6">
                <h3 className="font-body text-sm text-porcelain/60 mb-4">Inquiries by Service</h3>
                {Object.keys(analytics.serviceBreakdown).length === 0 ? (
                  <p className="text-center py-8 font-body text-porcelain/50">No data available</p>
                ) : (
                  <div className="space-y-4">
                    {Object.entries(analytics.serviceBreakdown)
                      .sort((a, b) => b[1] - a[1])
                      .map(([service, count], i) => {
                        const percentage = (count / analytics.total) * 100;
                        return (
                          <motion.div
                            key={service}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-body text-sm text-porcelain">{service}</span>
                              <span className="font-mono text-xs text-porcelain/50">
                                {count} ({Math.round(percentage)}%)
                              </span>
                            </div>
                            <div className="h-2 rounded-full bg-porcelain/5 overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ duration: 0.8, ease: 'easeOut', delay: i * 0.05 }}
                                className="h-full rounded-full bg-gradient-to-r from-alchemy-red/70 to-alchemy-red/30"
                              />
                            </div>
                          </motion.div>
                        );
                      })}
                  </div>
                )}
              </div>

              {/* Top Companies */}
              {analytics.companyBreakdown.length > 0 && (
                <div className="glass-deep rounded-2xl p-6">
                  <h3 className="font-body text-sm text-porcelain/60 mb-4">Top Companies</h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
                    {analytics.companyBreakdown.map(([company, count], i) => (
                      <motion.div
                        key={company}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="glass rounded-xl p-4 text-center"
                      >
                        <div className="w-10 h-10 rounded-full bg-porcelain/5 flex items-center justify-center mx-auto mb-2">
                          <Building2 className="w-5 h-5 text-porcelain/40" />
                        </div>
                        <p className="font-body text-sm text-porcelain truncate">{company}</p>
                        <p className="font-mono text-[10px] text-alchemy-red">{count} inquiries</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Quick Links Tab */}
          {activeTab === 'quicklinks' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div>
                <h2 className="font-display text-2xl text-porcelain mb-1">Quick Links</h2>
                <p className="font-body text-sm text-porcelain/50">
                  Fast access to all site pages and external links
                </p>
              </div>

              {/* Site Pages */}
              <div className="glass-deep rounded-2xl p-6">
                <h3 className="font-body text-sm text-porcelain/60 mb-4">Site Pages</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {quickLinks.map((link, i) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                    >
                      <Link
                        to={link.path}
                        target="_blank"
                        className="flex items-center gap-3 p-4 glass rounded-xl hover:bg-porcelain/5 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-alchemy-red/10 flex items-center justify-center group-hover:bg-alchemy-red/20 transition-colors">
                          <link.icon className="w-5 h-5 text-alchemy-red" />
                        </div>
                        <div className="flex-1">
                          <p className="font-body text-sm text-porcelain">{link.label}</p>
                          <p className="font-mono text-[9px] text-porcelain/40">{link.path}</p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-porcelain/30 group-hover:text-porcelain/60" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* External Links */}
              <div className="glass-deep rounded-2xl p-6">
                <h3 className="font-body text-sm text-porcelain/60 mb-4">External Links & Socials</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {externalLinks.map((link, i) => (
                    <motion.div
                      key={link.url}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                    >
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 glass rounded-xl hover:bg-porcelain/5 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-porcelain/5 flex items-center justify-center group-hover:bg-porcelain/10 transition-colors">
                          <link.icon className="w-5 h-5 text-porcelain/60" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-body text-sm text-porcelain">{link.label}</p>
                          <p className="font-mono text-[9px] text-porcelain/40 truncate">{link.url.replace('https://', '')}</p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            copyToClipboard(link.url, link.label);
                          }}
                          className="p-2 hover:bg-porcelain/10 rounded-lg transition-colors"
                        >
                          {copiedLink === link.label ? (
                            <CheckCircle2 className="w-4 h-4 text-green-400" />
                          ) : (
                            <Copy className="w-4 h-4 text-porcelain/40" />
                          )}
                        </button>
                      </a>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="glass-deep rounded-2xl p-6">
                <h3 className="font-body text-sm text-porcelain/60 mb-4">Quick Actions</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <a
                    href="mailto:alchemylabs.work@gmail.com"
                    className="flex items-center gap-4 p-4 glass rounded-xl hover:bg-alchemy-red/5 transition-colors group border border-transparent hover:border-alchemy-red/20"
                  >
                    <div className="w-12 h-12 rounded-xl bg-alchemy-red/10 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-alchemy-red" />
                    </div>
                    <div>
                      <p className="font-body text-sm text-porcelain font-medium">Check Inbox</p>
                      <p className="font-mono text-[10px] text-porcelain/40">brandalchemie@gmail.com</p>
                    </div>
                  </a>

                  <Link
                    to="/contact"
                    target="_blank"
                    className="flex items-center gap-4 p-4 glass rounded-xl hover:bg-porcelain/5 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                      <Eye className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <p className="font-body text-sm text-porcelain font-medium">Preview Contact</p>
                      <p className="font-mono text-[10px] text-porcelain/40">View as visitor</p>
                    </div>
                  </Link>

                  <button
                    onClick={fetchSubmissions}
                    className="flex items-center gap-4 p-4 glass rounded-xl hover:bg-porcelain/5 transition-colors group text-left"
                  >
                    <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                      <RefreshCw className={`w-6 h-6 text-green-400 ${isLoading ? 'animate-spin' : ''}`} />
                    </div>
                    <div>
                      <p className="font-body text-sm text-porcelain font-medium">Sync Data</p>
                      <p className="font-mono text-[10px] text-porcelain/40">Refresh all submissions</p>
                    </div>
                  </button>
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