import React from 'react';
import DashboardLayout from '../../../shared/components/layout/DashboardLayout';
import { useSelector } from 'react-redux';
import { Settings, Building2, Mail, Globe } from 'lucide-react';

const SettingsPage = () => {
  const { currentTenant } = useSelector((state) => state.tenant);
  const { user } = useSelector((state) => state.auth);

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#111111]">Settings</h1>
        <p className="text-sm text-[#6b7280] mt-1">Manage your workspace configuration.</p>
      </div>

      <div className="max-w-2xl space-y-5">
        {/* Workspace Info */}
        <div className="bg-white border border-[#e5e7eb] rounded-[14px] p-6">
          <div className="flex items-center gap-2 mb-5">
            <Building2 size={16} className="text-[#6b7280]" />
            <h2 className="text-sm font-semibold text-[#111111]">Workspace</h2>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-medium text-[#6b7280] uppercase tracking-wide mb-1">Company Name</p>
              <p className="text-sm text-[#111111] font-medium">{currentTenant?.name}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-[#6b7280] uppercase tracking-wide mb-1">Workspace Slug</p>
              <div className="flex items-center gap-2">
                <code className="text-sm text-[#111111] bg-[#f3f4f6] px-3 py-1.5 rounded-[8px]">
                  /{currentTenant?.slug}
                </code>
                <span className="text-xs text-[#6b7280]">Your unique URL</span>
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-[#6b7280] uppercase tracking-wide mb-1">Support Email</p>
              <p className="text-sm text-[#111111]">{currentTenant?.supportEmail}</p>
            </div>
          </div>
        </div>

        {/* Profile */}
        <div className="bg-white border border-[#e5e7eb] rounded-[14px] p-6">
          <div className="flex items-center gap-2 mb-5">
            <Settings size={16} className="text-[#6b7280]" />
            <h2 className="text-sm font-semibold text-[#111111]">Your Profile</h2>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-medium text-[#6b7280] uppercase tracking-wide mb-1">Name</p>
              <p className="text-sm text-[#111111] font-medium">{user?.name}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-[#6b7280] uppercase tracking-wide mb-1">Email</p>
              <p className="text-sm text-[#111111]">{user?.email}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-[#6b7280] uppercase tracking-wide mb-1">Role</p>
              <span className="inline-flex px-2.5 py-1 rounded-[6px] text-xs font-medium bg-[#f3f4f6] text-[#111111] capitalize">
                {user?.role}
              </span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
