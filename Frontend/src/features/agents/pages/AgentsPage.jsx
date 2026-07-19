import React, { useEffect } from 'react';
import DashboardLayout from '../../../shared/components/layout/DashboardLayout';
import { useAgents } from '../hooks/useAgents';
import Badge from '../../../shared/components/ui/Badge';
import Table from '../../../shared/components/ui/Table';
import { Loader2 } from 'lucide-react';
import { useConfirm } from '../../../app/context/ConfirmContext';

const AgentsPage = () => {
  const { confirm } = useConfirm();

  const { users, loading, loadingId, fetchUsers, approveUser, suspendUser, updateRole } = useAgents();

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    {
      key: 'role',
      label: 'Role',
      width: '100px',
      render: (v) => <Badge variant={v}>{v}</Badge>,
    },
    {
      key: 'isApproved',
      label: 'Status',
      width: '120px',
      render: (v) => (
        <Badge variant={v ? 'active' : 'inactive'} dot>
          {v ? 'Approved' : 'Pending'}
        </Badge>
      ),
    },
    {
      key: 'isOnline',
      label: 'Online',
      width: '80px',
      render: (v) => (
        <span className={`w-1.5 h-1.5 rounded-full inline-block ${v ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.4)] animate-pulse' : 'bg-zinc-700'}`} />
      ),
    },
    {
      key: '_id',
      label: 'Actions',
      width: '240px',
      render: (id, row) => {
        const isRowLoading = loadingId === id;

        return (
          <div className="flex items-center gap-2">
            {/* Approve button — only shown when NOT approved */}
            {!row.isApproved && (
              <button
                id={`approve-btn-${id}`}
                disabled={isRowLoading}
                onClick={async () => {
                  const ok = await confirm({
                    title: 'Approve Agent',
                    message: 'Are you sure you want to approve this agent? They will gain access to the dashboard.',
                  });
                  if (!ok) return;
                  await approveUser(id, true);
                }}
                className="cursor-pointer px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-[10px] border border-white/5 bg-[#09090b] text-white hover:bg-white/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-sm"
              >
                {isRowLoading ? <Loader2 size={11} className="animate-spin" /> : null}
                Approve
              </button>
            )}

            {/* Suspend button — only shown when approved */}
            {row.isApproved && (
              <button
                id={`suspend-btn-${id}`}
                disabled={isRowLoading}
                onClick={async () => {
                  const ok = await confirm({
                    title: 'Suspend Agent',
                    message: 'Are you sure you want to suspend this agent? They will lose dashboard access immediately.',
                    confirmLabel: 'Suspend',
                    variant: 'danger',
                  });
                  if (!ok) return;
                  await suspendUser(id);
                }}
                className="cursor-pointer px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-[10px] border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/15 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-sm"
              >
                {isRowLoading ? <Loader2 size={11} className="animate-spin" /> : null}
                Suspend
              </button>
            )}

            {/* Make Admin — only shown for approved agents */}
            {row.role === 'agent' && row.isApproved && (
              <button
                id={`promote-btn-${id}`}
                disabled={isRowLoading}
                onClick={async () => {
                  const ok = await confirm({
                    title: 'Promote to Admin',
                    message: 'Are you sure you want to make this user an admin? This grants full control over the system.',
                  });
                  if (!ok) return;
                  await updateRole(id, 'admin');
                }}
                className="cursor-pointer px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-[10px] border border-yellow-500/20 bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/15 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-sm"
              >
                {isRowLoading ? <Loader2 size={11} className="animate-spin" /> : null}
                Make Admin
              </button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white tracking-tight">Agents</h1>
        <p className="text-sm text-zinc-400 mt-1">
          Manage team members, approve access, and update roles.
        </p>
      </div>

      <div className="bg-[#09090b] border border-white/5 rounded-[12px] overflow-hidden">
        <div className="px-6 py-4 border-b border-white/5">
          <h2 className="text-sm font-semibold text-white">Team Members</h2>
          <p className="text-xs text-zinc-400 mt-0.5">{users.length} member{users.length !== 1 ? 's' : ''}</p>
        </div>
        <Table
          columns={columns}
          data={users}
          loading={loading}
          emptyTitle="No agents found"
          emptyDescription="Agents who register under your workspace will appear here."
        />
      </div>
    </DashboardLayout>
  );
};

export default AgentsPage;
