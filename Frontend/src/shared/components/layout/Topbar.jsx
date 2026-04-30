import React from 'react';
import { useLocation, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { ChevronRight } from 'lucide-react';

const labelMap = {
  dashboard: 'Dashboard',
  tickets: 'Tickets',
  agents: 'Agents',
  widgets: 'Widgets',
  'ai-context': 'AI Context',
  settings: 'Settings',
};

const Topbar = () => {
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
      style={{ height: 'var(--topbar-height)', marginLeft: 'var(--sidebar-width)' }}
      className="fixed top-0 right-0 left-0 z-20 bg-white border-b border-[#e5e7eb] flex items-center justify-between px-6"
    >
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-[#6b7280]">
        <span className="font-medium text-[#111111]">{tenantSlug}</span>
        {crumbs.map((crumb, idx) => (
          <React.Fragment key={idx}>
            <ChevronRight size={14} className="text-[#d1d5db]" />
            <span className={idx === crumbs.length - 1 ? 'text-[#111111] font-medium' : ''}>
              {crumb}
            </span>
          </React.Fragment>
        ))}
      </nav>

      {/* Right: User */}
      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="text-xs font-medium text-[#111111]">{user?.name}</p>
          <p className="text-xs text-[#6b7280] capitalize">{user?.role}</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-[#111111] flex items-center justify-center">
          <span className="text-xs font-semibold text-white">{initials}</span>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
