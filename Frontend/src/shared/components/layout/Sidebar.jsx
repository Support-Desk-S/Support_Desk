import React from 'react';
import { NavLink, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux'; // FIXED
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
import { useAuth } from '../../../features/auth/hooks/useAuth';
import { useNavigate } from 'react-router';
import { useConfirm } from '../../../app/context/ConfirmContext';

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

  const { handleLogout } = useAuth();

  const isAdmin = user?.role === 'admin';
  const visibleItems = navItems.filter((item) => !item.adminOnly || isAdmin);
  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : '??';

    const { confirm } = useConfirm();

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
        className={`fixed left-0 top-0 h-screen bg-[#050507] flex flex-col z-30 border-r border-white/5 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
      >
        {/* Brand */}
        <div className="px-5 py-5 border-b border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-white/10 border border-white/10 rounded-lg flex items-center justify-center">
                <Zap size={16} className="text-white" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold leading-tight">SupportDesk</p>
                {currentTenant && (
                  <p className="text-zinc-400 text-xs truncate max-w-[140px]">{currentTenant.name}</p>
                )}
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="md:hidden text-zinc-400 hover:text-white cursor-pointer"
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
                      'flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-xs font-semibold uppercase tracking-wider transition-all duration-200 border border-transparent',
                      isActive
                        ? 'bg-white/[0.07] text-white border-white/5 shadow-inner'
                        : 'text-zinc-400 hover:bg-white/[0.03] hover:text-white',
                    ].join(' ')
                  }
                >
                  <Icon size={14} strokeWidth={2} />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Footer */}
        <div className="px-3 pb-4 border-t border-white/5 pt-3">
          <div className="flex items-center gap-3 px-2 py-2 rounded-[8px] hover:bg-white/5 transition-colors">
            <div className="w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
              <span className="text-xs font-semibold text-white">{initials}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-medium truncate">{user?.name}</p>
              <p className="text-zinc-400 text-xs truncate">{user?.email}</p>
            </div>
            <button
              onClick={async () => {
                const ok = await confirm({
                  title: "Logout",
                  message: "Are you sure you want to logout?",
                });
            
                if (!ok) return;
                await handleLogout();
                setIsOpen(false);
              }}
              className="cursor-pointer text-zinc-400 hover:text-white transition-colors p-1"
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
