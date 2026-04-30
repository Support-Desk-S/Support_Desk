import React from 'react';
import { useNavigate } from 'react-router';
import { ShieldOff } from 'lucide-react';

const UnauthorizedPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-6">
      <div className="text-center max-w-sm">
        <div className="w-14 h-14 bg-[#fef3c7] rounded-2xl flex items-center justify-center mx-auto mb-5">
          <ShieldOff size={24} className="text-[#f59e0b]" />
        </div>
        <h1 className="text-2xl font-semibold text-[#111111] mb-2">Access Denied</h1>
        <p className="text-sm text-[#6b7280] mb-6">
          You don't have permission to view this page. This area is restricted to admin users only.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#111111] text-white text-sm font-medium rounded-[10px] hover:bg-[#2d2d2d] transition-colors"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
