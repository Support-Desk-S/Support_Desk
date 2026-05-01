import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import DashboardLayout from '../../../shared/components/layout/DashboardLayout';
import { useTickets } from '../hooks/useTickets';
import Badge from '../../../shared/components/ui/Badge';
import Table from '../../../shared/components/ui/Table';
import { Search, Plus } from 'lucide-react';

const FILTERS = ['all', 'open', 'assigned', 'resolved'];

const TicketsPage = () => {
  const { tickets, loading, activeFilter, fetchTickets, changeFilter } = useTickets();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const { tenantSlug } = useParams();

  useEffect(() => {
    const params = {};
    if (activeFilter !== 'all') params.status = activeFilter;
    fetchTickets(params);
  }, [activeFilter]);

  const filtered = tickets.filter(
    (t) =>
      !search ||
      t.customerEmail?.toLowerCase().includes(search.toLowerCase()) ||
      t.subject?.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      key: 'customerEmail',
      label: 'Customer',
      width: '200px',
      render: (v) => (
        <span className="text-sm text-[#111111] font-medium truncate block max-w-[180px]">{v}</span>
      ),
    },
    {
      key: 'subject',
      label: 'Subject',
      render: (v) => (
        <span className="truncate max-w-[300px] block text-sm text-[#374151]" title={v}>
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
            <div className="w-6 h-6 rounded-full bg-[#e5e7eb] flex items-center justify-center shrink-0">
              <span className="text-[10px] font-bold text-[#374151]">
                {v.name?.[0]?.toUpperCase() || 'A'}
              </span>
            </div>
            <span className="text-sm text-[#111111] truncate">{v.name || 'Agent'}</span>
          </div>
        ) : (
          <span className="text-sm text-[#9ca3af] italic">Unassigned</span>
        ),
    },
    {
      key: 'createdAt',
      label: 'Created',
      width: '130px',
      render: (v) => (
        <span className="text-sm text-[#6b7280]">
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
          className="px-3 py-1 text-xs font-medium rounded-[8px] border border-[#e5e7eb] bg-white hover:bg-[#f9fafb] text-[#111111] transition-colors"
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
          <h1 className="text-2xl font-semibold text-[#111111]">Tickets</h1>
          <p className="text-sm text-[#6b7280] mt-1">
            Manage all customer support tickets across your workspace.
          </p>
        </div>
        <div className="text-sm text-[#6b7280] font-medium">
          {filtered.length} ticket{filtered.length !== 1 ? 's' : ''}
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
          onRowClick={(row) => navigate(`/${tenantSlug}/tickets/${row._id}`)}
          emptyTitle="No tickets found"
          emptyDescription={
            activeFilter !== 'all' ? `No ${activeFilter} tickets.` : 'No tickets yet.'
          }
        />
      </div>
    </DashboardLayout>
  );
};

export default TicketsPage;
