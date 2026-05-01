import React from 'react';
import { NavLink, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import {
  LayoutDashboard,
  TicketCheck,
  Users,
  Bot,
  MessageSquareCode,
  Settings,
  LogOut,
  Zap,
  X,
} from 'lucide-react';
import { logout } from '../../../features/auth/state/authSlice';
import { clearTenant } from '../../../features/tenant/state/tenantSlice';
import axiosInstance from '../../../lib/axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const navItems = [
  { label: 'Dashboard', path: 'dashboard', icon: LayoutDashboard },
  { label: 'Tickets', path: 'tickets', icon: TicketCheck },
  { label: 'Agents', path: 'agents', icon: Users, adminOnly: true },
  { label: 'Widgets', path: 'widgets', icon: MessageSquareCode, adminOnly: true },
  { label: 'AI Context', path: 'ai-context', icon: Bot, adminOnly: true },
  { label: 'Settings', path: 'settings', icon: Settings, adminOnly: false },
];

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { tenantSlug } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { currentTenant } = useSelector((state) => state.tenant);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/api/auth/logout').catch(() => {});
    } finally {
      dispatch(logout());
      dispatch(clearTenant());
      toast.success('Logged out');
      navigate('/auth');
    }
  };

  const isAdmin = user?.role === 'admin';
  const visibleItems = navItems.filter((item) => !item.adminOnly || isAdmin);
  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : '??';

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        style={{ width: 'var(--sidebar-width)' }}
        className={`fixed left-0 top-0 h-screen bg-[#0a0a0a] flex flex-col z-30 border-r border-[#1f2937] transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand */}
        <div className="px-5 py-5 border-b border-[#1f2937]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Zap size={16} className="text-[#111111]" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold leading-tight">SupportDesk</p>
                {currentTenant && (
                  <p className="text-[#9ca3af] text-xs truncate max-w-[140px]">{currentTenant.name}</p>
                )}
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="md:hidden text-[#9ca3af] hover:text-white"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <ul className="space-y-0.5">
          {visibleItems.map(({ label, path, icon: Icon }) => (
            <li key={path}>
              <NavLink
                to={`/${tenantSlug}/${path}`}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  [
                    'flex items-center gap-3 px-3 py-2 rounded-[8px] text-sm font-medium transition-all duration-150',
                    isActive
                      ? 'bg-white text-[#111111]'
                      : 'text-[#9ca3af] hover:bg-[#1a1a1a] hover:text-white',
                  ].join(' ')
                }
              >
                <Icon size={16} strokeWidth={1.8} />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Footer */}
      <div className="px-3 pb-4 border-t border-[#1f2937] pt-3">
        <div className="flex items-center gap-3 px-2 py-2 rounded-[8px] hover:bg-[#1a1a1a] transition-colors">
          <div className="w-8 h-8 rounded-full bg-[#374151] flex items-center justify-center shrink-0">
            <span className="text-xs font-semibold text-white">{initials}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-medium truncate">{user?.name}</p>
            <p className="text-[#6b7280] text-xs truncate">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-[#6b7280] hover:text-white transition-colors p-1"
            title="Logout"
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </aside>
    </>
  );
};

export default Sidebar;
