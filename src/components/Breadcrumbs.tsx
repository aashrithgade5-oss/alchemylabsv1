import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
}

const routeLabels: Record<string, string> = {
  'solutions': 'Solutions',
  'ai': 'AI Solutions',
  'branding': 'Branding',
  'consultation': 'Consultation',
  'work': 'Portfolio',
  'about': 'About',
  'contact': 'Contact',
  'journal': 'Journal',
  'services': 'Services',
  'book-sprint': 'Book Sprint',
};

export const Breadcrumbs = memo(({ items, className = '' }: BreadcrumbsProps) => {
  const location = useLocation();
  
  // Auto-generate breadcrumbs from path if items not provided
  const breadcrumbs: BreadcrumbItem[] = items || (() => {
    const pathParts = location.pathname.split('/').filter(Boolean);
    const crumbs: BreadcrumbItem[] = [];
    
    pathParts.forEach((part, index) => {
      const href = '/' + pathParts.slice(0, index + 1).join('/');
      const isLast = index === pathParts.length - 1;
      
      crumbs.push({
        label: routeLabels[part] || part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' '),
        href: isLast ? undefined : href,
      });
    });
    
    return crumbs;
  })();

  if (breadcrumbs.length === 0) return null;

  return (
    <nav 
      aria-label="Breadcrumb"
      className={`flex items-center gap-2 font-mono text-xs ${className}`}
    >
      <Link 
        to="/" 
        className="text-porcelain/40 hover:text-alchemy-red transition-colors"
        aria-label="Home"
      >
        <Home className="w-3.5 h-3.5" />
      </Link>
      
      {breadcrumbs.map((crumb, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight className="w-3 h-3 text-porcelain/20" />
          {crumb.href ? (
            <Link 
              to={crumb.href}
              className="text-porcelain/40 hover:text-alchemy-red transition-colors tracking-label uppercase"
            >
              {crumb.label}
            </Link>
          ) : (
            <span className="text-porcelain/70 tracking-label uppercase">
              {crumb.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
});

Breadcrumbs.displayName = 'Breadcrumbs';

export default Breadcrumbs;
