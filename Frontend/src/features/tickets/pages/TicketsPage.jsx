import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../../shared/components/layout/DashboardLayout';
import { useTickets } from '../hooks/useTickets';
import Badge from '../../../shared/components/ui/Badge';
import Table from '../../../shared/components/ui/Table';
import { Search, Ticket } from 'lucide-react';

const FILTERS = ['all', 'open', 'assigned', 'resolved'];

const columns = [
  { key: 'customerEmail', label: 'Customer', width: '200px' },
  {
    key: 'subject',
    label: 'Subject',
    render: (v) => (
      <span className="truncate max-w-[300px] block" title={v}>{v}</span>
    ),
  },
  {
    key: 'status',
    label: 'Status',
    width: '120px',
    render: (v) => (
      <Badge variant={v} dot>{v}</Badge>
    ),
  },
  {
    key: 'assignedTo',
    label: 'Assigned To',
    width: '150px',
    render: (v) => v ? (
      <span className="text-sm text-[#111111]">{v.name || 'Agent'}</span>
    ) : (
      <span className="text-sm text-[#9ca3af]">Unassigned</span>
    ),
  },
  {
    key: 'createdAt',
    label: 'Created',
    width: '120px',
    render: (v) => new Date(v).toLocaleDateString(),
  },
];

const TicketsPage = () => {
  const { tickets, loading, activeFilter, fetchTickets, changeFilter } = useTickets();
  const [search, setSearch] = useState('');

  useEffect(() => {
    const params = {};
    if (activeFilter !== 'all') params.status = activeFilter;
    fetchTickets(params);
  }, [activeFilter]);

  const filtered = tickets.filter((t) =>
    !search ||
    t.customerEmail?.toLowerCase().includes(search.toLowerCase()) ||
    t.subject?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#111111]">Tickets</h1>
          <p className="text-sm text-[#6b7280] mt-1">
            Manage all customer support tickets across your workspace.
          </p>
        </div>
      </div>

      {/* Filters + Search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
        <div className="flex gap-1 bg-[#f3f4f6] rounded-[10px] p-1">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => changeFilter(f)}
              className={[
                'px-3 py-1.5 rounded-[8px] text-sm font-medium capitalize transition-all duration-150',
                activeFilter === f
                  ? 'bg-white text-[#111111] shadow-sm'
                  : 'text-[#6b7280] hover:text-[#111111]',
              ].join(' ')}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="relative max-w-xs w-full">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" />
          <input
            type="text"
            placeholder="Search tickets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 text-sm border border-[#e5e7eb] rounded-[10px] focus:outline-none focus:border-[#111111]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#e5e7eb] rounded-[14px] overflow-hidden">
        <Table
          columns={columns}
          data={filtered}
          loading={loading}
          emptyTitle="No tickets found"
          emptyDescription={activeFilter !== 'all' ? `No ${activeFilter} tickets.` : 'No tickets yet.'}
        />
      </div>
    </DashboardLayout>
  );
};

export default TicketsPage;
