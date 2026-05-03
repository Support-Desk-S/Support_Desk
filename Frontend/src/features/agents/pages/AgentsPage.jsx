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
        <span className={`w-2 h-2 rounded-full inline-block ${v ? 'bg-[#10b981]' : 'bg-[#d1d5db]'}`} />
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
                className="cursor-pointer px-3 py-1 text-xs font-medium rounded-[8px] border border-[#e5e7eb] bg-white text-[#111] hover:bg-[#f9fafb] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
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
                className="cursor-pointer px-3 py-1 text-xs font-medium rounded-[8px] border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
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
                className="cursor-pointer px-3 py-1 text-xs font-medium rounded-[8px] border border-yellow-300 bg-yellow-50 text-yellow-700 hover:bg-yellow-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
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
        <h1 className="text-2xl font-semibold text-[#111111]">Agents</h1>
        <p className="text-sm text-[#6b7280] mt-1">
          Manage team members, approve access, and update roles.
        </p>
      </div>

      <div className="bg-white border border-[#e5e7eb] rounded-[14px] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#e5e7eb]">
          <h2 className="text-sm font-semibold text-[#111111]">Team Members</h2>
          <p className="text-xs text-[#6b7280] mt-0.5">{users.length} member{users.length !== 1 ? 's' : ''}</p>
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
