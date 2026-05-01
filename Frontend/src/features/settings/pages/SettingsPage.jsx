import React, { useState } from "react";
import DashboardLayout from "../../../shared/components/layout/DashboardLayout";

import SettingsTabs from "../components/SettingsTabs";
import WorkspaceSection from "../components/WorkspaceSection";
import ProfileSection from "../components/ProfileSection";
import SecuritySection from "../components/SecuritySection";
import IntegrationsSection from "../components/IntegrationsSection";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("General");

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-(--color-text-secondary) mt-1">
          Manage your workspace configuration.
        </p>
      </div>

      <SettingsTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "General" && (
        <div className="space-y-6 max-w-4xl">
          <WorkspaceSection />
          <ProfileSection />
        </div>
      )}

      {activeTab === "Security" && <SecuritySection />}

      {activeTab === "Integrations" && (
        <div className="space-y-6 max-w-4xl">
          <IntegrationsSection />
        </div>
      )}
    </DashboardLayout>
  );
};

export default SettingsPage;