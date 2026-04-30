import React, { useEffect } from 'react';
import DashboardLayout from '../../../shared/components/layout/DashboardLayout';
import { useAgents } from '../hooks/useAgents';
import Badge from '../../../shared/components/ui/Badge';
import Table from '../../../shared/components/ui/Table';
import { Users } from 'lucide-react';

const AgentsPage = () => {
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
            onClick={() => approveUser(id, !row.isApproved)}
            className="px-3 py-1 text-xs font-medium rounded-[8px] border border-[#e5e7eb] bg-white hover:bg-[#f9fafb] transition-colors text-[#111111]"
          >
            {row.isApproved ? 'Suspend' : 'Approve'}
          </button>
          {row.role === 'agent' && (
            <button
              onClick={() => updateRole(id, 'admin')}
              className="px-3 py-1 text-xs font-medium rounded-[8px] border border-[#e5e7eb] bg-white hover:bg-[#f9fafb] transition-colors text-[#111111]"
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
