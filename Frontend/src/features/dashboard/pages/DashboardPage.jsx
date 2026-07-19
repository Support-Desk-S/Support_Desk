import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DashboardLayout from '../../../shared/components/layout/DashboardLayout';
import { useStats } from '../hooks/useStats';
import { useTickets } from '../../tickets/hooks/useTickets';
import Badge from '../../../shared/components/ui/Badge';
import Spinner from '../../../shared/components/ui/Spinner';
import Table from '../../../shared/components/ui/Table';
import Button from '../../../shared/components/ui/Button';
import { TicketCheck, Users, CheckCircle2, Clock, TrendingUp, Bot } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, trend, color = 'default' }) => {
  const colorMap = {
    default: 'text-white bg-white/5 border-white/5',
    amber: 'text-amber-400 bg-amber-400/5 border-amber-400/10 shadow-[0_0_12px_rgba(245,158,11,0.02)]',
    blue: 'text-blue-400 bg-blue-400/5 border-blue-400/10 shadow-[0_0_12px_rgba(59,130,246,0.02)]',
    green: 'text-emerald-400 bg-emerald-400/5 border-emerald-400/10 shadow-[0_0_12px_rgba(16,185,129,0.02)]',
  };
  return (
    <div className="bg-[#09090b] border border-white/5 rounded-[12px] p-5 hover:border-white/10 hover:shadow-md transition-all duration-300 relative group overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className={`w-9 h-9 rounded-[10px] border flex items-center justify-center ${colorMap[color]}`}>
          <Icon size={16} strokeWidth={2} />
        </div>
        {trend !== undefined && (
          <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold tracking-wider">
            <TrendingUp size={11} />
            {trend}%
          </span>
        )}
      </div>
      <p className="text-3xl font-extrabold text-white tracking-tight mb-1 relative z-10 leading-none">{value ?? '—'}</p>
      <p className="text-[9.5px] font-bold text-zinc-400 uppercase tracking-wider relative z-10">{label}</p>
    </div>
  );
};

const statusVariantMap = { open: 'open', assigned: 'assigned', resolved: 'resolved' };

const DashboardPage = () => {
  const { user } = useSelector((state) => state.auth);
  const { stats, loading: statsLoading } = useStats();
  const { tickets, total, loading: ticketsLoading, fetchTickets, loadMoreTickets } = useTickets();
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    fetchTickets({ limit: 8, page: 1 });
  }, []);

  const handleLoadMore = async () => {
    setLoadingMore(true);
    const nextPage = page + 1;
    setPage(nextPage);
    await loadMoreTickets({ limit: 8, page: nextPage });
    setLoadingMore(false);
  };

  const columns = [
    {
      key: 'customerEmail',
      label: 'Customer',
      render: (v) => <span className="text-zinc-200 font-medium">{v}</span>,
    },
    {
      key: 'subject',
      label: 'Subject',
      render: (v) => <span className="text-zinc-400 truncate max-w-[300px] block" title={v}>{v}</span>,
    },
    {
      key: 'status',
      label: 'Status',
      width: '120px',
      render: (v) => <Badge variant={statusVariantMap[v] || 'default'} dot>{v}</Badge>,
    },
    {
      key: 'createdAt',
      label: 'Created',
      width: '130px',
      render: (v) => (
        <span className="text-zinc-400 text-sm">
          {new Date(v).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </span>
      ),
    },
  ];

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white tracking-tight">
          Welcome back, {user?.name?.split(' ')[0]} 👋
        </h1>
        <p className="text-sm text-zinc-400 mt-1">
          Here's what's happening in your support workspace today.
        </p>
      </div>

      {/* Stats */}
      {statsLoading ? (
        <div className="flex items-center gap-2 py-8 text-zinc-400">
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
      <div className="bg-[#09090b] border border-white/5 rounded-[12px] overflow-hidden">
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-[#0b0b0e]/30">
          <h2 className="text-xs font-bold text-white uppercase tracking-wider">Recent Tickets</h2>
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">{tickets.length} shown</span>
        </div>

        <Table
          columns={columns}
          data={tickets}
          loading={ticketsLoading}
          emptyTitle="No tickets found"
          emptyDescription="Tickets created by customers will appear here."
        />

        {!ticketsLoading && tickets.length < total && (
          <div className="p-4 border-t border-white/5 flex justify-center bg-transparent">
            <Button
              onClick={handleLoadMore}
              disabled={loadingMore}
              variant="secondary"
              size="sm"
              className="w-full max-w-[200px]"
            >
              {loadingMore ? 'Loading...' : 'Load More Tickets'}
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
