import React, { useEffect } from 'react';
import DashboardLayout from '../../../shared/components/layout/DashboardLayout';
import { useAgents } from '../hooks/useAgents';
import Badge from '../../../shared/components/ui/Badge';
import Table from '../../../shared/components/ui/Table';
import { Users } from 'lucide-react';
import { useConfirm } from '../../../app/context/ConfirmContext';

const AgentsPage = () => {
  const { confirm } = useConfirm();

  const { users, loading, fetchUsers, approveUser, updateRole } = useAgents();

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
      width: '110px',
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
      width: '220px',
      render: (id, row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={async () => {
              const action = row.isApproved ? "Suspend" : "Approve";

              const ok = await confirm({
                title: `${action} User`,
                message: `Are you sure you want to ${action.toLowerCase()} this user?`,
              });

              if (!ok) return;

              await approveUser(id, !row.isApproved);
            }}
            className={`cursor-pointer px-3 py-1 text-xs font-medium rounded-[8px] border transition-colors ${
              row.isApproved
                ? "bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                : "bg-white text-[#111] border-[#e5e7eb] hover:bg-[#f9fafb]"
            }`}
          >
            {row.isApproved ? "Suspend" : "Approve"}
          </button>
          {row.role === 'agent' && (
           <button
           onClick={async () => {
             const ok = await confirm({
               title: "Promote User",
               message: "Are you sure you want to make this user an admin? This action grants full control over the system.",
             });
         
             if (!ok) return;
         
             await updateRole(id, "admin");
           }}
          className="cursor-pointer px-3 py-1 text-xs font-medium rounded-[8px] border border-yellow-300 bg-yellow-50 text-yellow-700 hover:bg-yellow-100 transition-colors"
         >
           Make Admin
         </button>
          )}
        </div>
      ),
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
