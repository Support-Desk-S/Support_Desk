import React from 'react';
import { Link } from 'react-router';
import { AlertTriangle } from 'lucide-react';

const NotFoundPage = () => (
  <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-6">
    <div className="text-center max-w-sm">
      <div className="w-14 h-14 bg-[#f3f4f6] rounded-2xl flex items-center justify-center mx-auto mb-5">
        <AlertTriangle size={24} className="text-[#9ca3af]" />
      </div>
      <h1 className="text-2xl font-semibold text-[#111111] mb-2">Tenant Not Found</h1>
      <p className="text-sm text-[#6b7280] mb-6">
        The workspace you're looking for doesn't exist or has been removed.
      </p>
      <Link
        to="/auth"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#111111] text-white text-sm font-medium rounded-[10px] hover:bg-[#2d2d2d] transition-colors"
      >
        Back to Sign In
      </Link>
    </div>
  </div>
);

export default NotFoundPage;
