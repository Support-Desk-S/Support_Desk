import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import DashboardLayout from '../../../shared/components/layout/DashboardLayout';
import { useTickets } from '../hooks/useTickets';
import Badge from '../../../shared/components/ui/Badge';
import Table from '../../../shared/components/ui/Table';
import Button from '../../../shared/components/ui/Button';
import { Search, Plus } from 'lucide-react';

const FILTERS = ['all', 'open', 'assigned', 'resolved'];

const TicketsPage = () => {
  const { tickets, loading, activeFilter, total, fetchTickets, changeFilter, loadMoreTickets } = useTickets();
  const [search, setSearch] = useState('');
  const [selectedAgent, setSelectedAgent] = useState('All Agents');
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const navigate = useNavigate();
  const { tenantSlug } = useParams();

  useEffect(() => {
    const params = { page: 1 };
    if (activeFilter !== 'all') params.status = activeFilter;
    setPage(1);
    fetchTickets(params);
  }, [activeFilter]);

  const handleLoadMore = async () => {
    setLoadingMore(true);
    const nextPage = page + 1;
    setPage(nextPage);
    const params = { page: nextPage };
    if (activeFilter !== 'all') params.status = activeFilter;
    await loadMoreTickets(params);
    setLoadingMore(false);
  };


  const uniqueAgents = Array.from(
    new Set(tickets.map((t) => t.assignedTo?.name).filter(Boolean))
  );

  const filtered = tickets.filter((t) => {
    const matchesSearch =
      !search ||
      t.customerEmail?.toLowerCase().includes(search.toLowerCase()) ||
      t.subject?.toLowerCase().includes(search.toLowerCase());

    const matchesAgent =
      selectedAgent === 'All Agents' || t.assignedTo?.name === selectedAgent;

    return matchesSearch && matchesAgent;
  });

  const columns = [
    {
      key: 'customerEmail',
      label: 'Customer',
      width: '200px',
      render: (v) => (
        <span className="text-sm text-zinc-200 font-medium truncate block max-w-[180px]">{v}</span>
      ),
    },
    {
      key: 'subject',
      label: 'Subject',
      render: (v) => (
        <span className="truncate max-w-[300px] block text-sm text-zinc-400" title={v}>
          {v}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      width: '120px',
      render: (v) => <Badge variant={v} dot>{v}</Badge>,
    },
    {
      key: 'assignedTo',
      label: 'Assigned To',
      width: '150px',
      render: (v) =>
        v ? (
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
              <span className="text-[10px] font-bold text-white">
                {v.name?.[0]?.toUpperCase() || 'A'}
              </span>
            </div>
            <span className="text-sm text-zinc-200 truncate">{v.name || 'Agent'}</span>
          </div>
        ) : (
          <span className="text-sm text-zinc-500 italic">Unassigned</span>
        ),
    },
    {
      key: 'createdAt',
      label: 'Created',
      width: '130px',
      render: (v) => (
        <span className="text-sm text-zinc-400">
          {new Date(v).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </span>
      ),
    },
    {
      key: '_id',
      label: '',
      width: '80px',
      render: (id) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/${tenantSlug}/tickets/${id}`);
          }}
          className="px-3 py-1 text-xs font-semibold rounded-[8px] border border-white/10 bg-[#0a0a0c] hover:bg-white/5 text-white transition-all cursor-pointer"
        >
          Open →
        </button>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">Tickets</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Manage all customer support tickets across your workspace.
          </p>
        </div>
        <div className="text-sm text-zinc-400 font-medium">
          {filtered.length} ticket{filtered.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Filters + Search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
        <div className="flex gap-1 bg-white/5 border border-white/5 rounded-[10px] p-1 shadow-sm">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => changeFilter(f)}
              className={[
                'px-3.5 py-1.5 rounded-[8px] text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer',
                activeFilter === f
                  ? 'bg-white text-black shadow-sm font-extrabold'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5',
              ].join(' ')}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={selectedAgent}
            onChange={(e) => setSelectedAgent(e.target.value)}
            className="text-xs font-semibold uppercase tracking-wider border border-white/5 rounded-[10px] px-3.5 py-2.5 bg-[#09090b] text-zinc-300 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/5 min-w-[140px] cursor-pointer transition-all duration-200"
          >
            <option value="All Agents">All Agents</option>
            {uniqueAgents.map((agent) => (
              <option key={agent} value={agent}>
                {agent}
              </option>
            ))}
          </select>

          <div className="relative max-w-xs w-full">
            <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Search tickets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2.5 text-xs font-semibold uppercase tracking-wider border border-white/5 rounded-[10px] bg-[#09090b] text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/5 transition-all duration-200"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#09090b] border border-white/5 rounded-[12px] overflow-hidden">
        <Table
          columns={columns}
          data={filtered}
          loading={loading && page === 1}
          onRowClick={(row) => navigate(`/${tenantSlug}/tickets/${row._id}`)}
          emptyTitle="No tickets found"
          emptyDescription={
            activeFilter !== 'all' ? `No ${activeFilter} tickets.` : 'No tickets yet.'
          }
        />
        {tickets.length < total && (
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

export default TicketsPage;
