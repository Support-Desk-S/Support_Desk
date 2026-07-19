import React from 'react';
import { useLocation, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { ChevronRight, Menu } from 'lucide-react';

const labelMap = {
  dashboard: 'Dashboard',
  tickets: 'Tickets',
  agents: 'Agents',
  widgets: 'Widgets',
  'ai-context': 'AI Context',
  settings: 'Settings',
};

const Topbar = ({ onMenuClick }) => {
  const { tenantSlug } = useParams();
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  // Build breadcrumb from path
  const segments = location.pathname.split('/').filter(Boolean);
  const crumbs = segments
    .filter((s) => s !== tenantSlug)
    .map((s) => labelMap[s] || s);

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : '??';

  return (
    <header
      className="fixed top-0 right-0 left-0 z-20 bg-black/40 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4 sm:px-6 h-[var(--topbar-height)] md:ml-[var(--sidebar-width)] transition-all duration-300"
    >
      {/* Breadcrumb / Left */}
      <div className="flex items-center gap-3">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-1.5 -ml-1.5 text-zinc-400 hover:text-white rounded-md hover:bg-white/5 transition-colors cursor-pointer"
        >
          <Menu size={20} />
        </button>
        <nav className="flex items-center gap-1.5 text-sm text-zinc-400">
          <span className="font-medium text-white hidden sm:block">{tenantSlug}</span>
          {crumbs.map((crumb, idx) => (
          <React.Fragment key={idx}>
            <ChevronRight size={14} className="text-zinc-700" />
            <span className={idx === crumbs.length - 1 ? 'text-white font-medium' : 'text-zinc-400'}>
              {crumb}
            </span>
          </React.Fragment>
        ))}
      </nav>
      </div>

      {/* Right: User */}
      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="text-xs font-medium text-white">{user?.name}</p>
          <p className="text-xs text-zinc-400 capitalize">{user?.role}</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center">
          <span className="text-xs font-semibold text-white">{initials}</span>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
