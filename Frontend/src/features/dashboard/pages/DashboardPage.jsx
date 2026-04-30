import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import DashboardLayout from '../../../shared/components/layout/DashboardLayout';
import { useStats } from '../hooks/useStats';
import { useTickets } from '../../tickets/hooks/useTickets';
import Badge from '../../../shared/components/ui/Badge';
import Spinner from '../../../shared/components/ui/Spinner';
import { TicketCheck, Users, CheckCircle2, Clock, TrendingUp, Bot } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, trend, color = 'default' }) => {
  const colorMap = {
    default: 'text-[#111111]',
    amber: 'text-[#f59e0b]',
    blue: 'text-[#3b82f6]',
    green: 'text-[#10b981]',
  };
  return (
    <div className="bg-white border border-[#e5e7eb] rounded-[14px] p-5 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-[10px] bg-[#f3f4f6] flex items-center justify-center ${colorMap[color]}`}>
          <Icon size={18} strokeWidth={1.8} />
        </div>
        {trend !== undefined && (
          <span className="flex items-center gap-1 text-xs text-[#10b981] font-medium">
            <TrendingUp size={12} />
            {trend}%
          </span>
        )}
      </div>
      <p className="text-2xl font-semibold text-[#111111] mb-1">{value ?? '—'}</p>
      <p className="text-sm text-[#6b7280]">{label}</p>
    </div>
  );
};

const statusVariantMap = { open: 'open', assigned: 'assigned', resolved: 'resolved' };

const DashboardPage = () => {
  const { user } = useSelector((state) => state.auth);
  const { stats, loading: statsLoading } = useStats();
  const { tickets, loading: ticketsLoading, fetchTickets } = useTickets();

  useEffect(() => {
    fetchTickets({ limit: 8 });
  }, []);

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#111111]">
          Welcome back, {user?.name?.split(' ')[0]} 👋
        </h1>
        <p className="text-sm text-[#6b7280] mt-1">
          Here's what's happening in your support workspace today.
        </p>
      </div>

      {/* Stats */}
      {statsLoading ? (
        <div className="flex items-center gap-2 py-8 text-[#6b7280]">
          <Spinner size="sm" /> Loading stats...
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={TicketCheck}
            label="Total Tickets"
            value={stats?.totalTickets ?? 0}
          />
          <StatCard
            icon={Clock}
            label="Open Tickets"
            value={stats?.openTickets ?? 0}
            color="amber"
          />
          <StatCard
            icon={Bot}
            label="Assigned"
            value={stats?.assignedTickets ?? 0}
            color="blue"
          />
          <StatCard
            icon={CheckCircle2}
            label="Resolved"
            value={stats?.resolvedTickets ?? 0}
            color="green"
          />
        </div>
      )}

      {/* Recent Tickets */}
      <div className="bg-white border border-[#e5e7eb] rounded-[14px] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#e5e7eb] flex items-center justify-between">
          <h2 className="text-sm font-semibold text-[#111111]">Recent Tickets</h2>
          <span className="text-xs text-[#6b7280]">{tickets.length} shown</span>
        </div>

        {ticketsLoading ? (
          <div className="flex items-center justify-center py-12">
            <Spinner />
          </div>
        ) : tickets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-[#6b7280]">
            <TicketCheck size={32} className="mb-3 opacity-40" />
            <p className="text-sm">No tickets yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[#e5e7eb]">
                  {['Customer', 'Subject', 'Status', 'Created'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#6b7280] uppercase tracking-wide">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket._id} className="border-b border-[#e5e7eb] hover:bg-[#f9fafb] transition-colors">
                    <td className="px-4 py-3 text-sm text-[#111111]">{ticket.customerEmail}</td>
                    <td className="px-4 py-3 text-sm text-[#6b7280] max-w-[250px] truncate">{ticket.subject}</td>
                    <td className="px-4 py-3">
                      <Badge variant={statusVariantMap[ticket.status] || 'default'} dot>
                        {ticket.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-[#6b7280]">
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
