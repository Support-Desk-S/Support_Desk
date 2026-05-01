import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const DashboardLayout = ({ children, noPad = false }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="h-screen overflow-hidden bg-[#f8f9fa] flex flex-col relative">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <Topbar onMenuClick={() => setIsSidebarOpen(true)} />

      {/* Main Content */}
      <main
        className="flex-1 overflow-hidden flex flex-col pt-[var(--topbar-height)] md:ml-[var(--sidebar-width)] transition-all duration-300"
      >
        <div className={`flex-1 overflow-hidden ${noPad ? '' : 'p-6'} animate-fade-in`}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
