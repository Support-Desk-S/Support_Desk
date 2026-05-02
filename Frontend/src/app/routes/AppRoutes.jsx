import { Routes, Route, Navigate, Outlet } from "react-router";
import LandingPage from "../../features/landing/pages/LandingPage";
import DocsPage from "../../features/docs/pages/DocsPage";
import AuthPage from "../../features/auth/pages/AuthPage";
import DashboardPage from "../../features/dashboard/pages/DashboardPage";
import TicketsPage from "../../features/tickets/pages/TicketsPage";
import TicketDetailPage from "../../features/tickets/pages/TicketDetailPage";
import AgentsPage from "../../features/agents/pages/AgentsPage";
import ChatWidgetPage from "../../features/widgets/pages/ChatWidgetPage";
import WidgetsPage from "../../features/widgets/pages/WidgetsPage";
import AiContextPage from "../../features/ai-context/pages/AiContextPage";
import SettingsPage from "../../features/settings/pages/SettingsPage";
import ProtectedRoute from "./ProtectedRoute";
import TenantLoader from "./TenantLoader";
import AdminGuard from "./AdminGuard";
import NotFoundPage from "../../shared/components/pages/NotFoundPage";

/**
 * Route Protection Layers:
 * 1. TenantLoader  — resolves /:slug → tenant (404 = not found page)
 * 2. ProtectedRoute — checks user auth (no cookie → /auth)
 * 3. AdminGuard    — wraps admin-only routes (agent → 403 page)
 */
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/docs" element={<DocsPage />} />
      <Route path="/auth" element={<AuthPage />} />

      {/* Public: Embed Widget */}
      <Route path="/embed/chat" element={<ChatWidgetPage />} />

      {/* Tenant-scoped routes */}
      <Route path="/:tenantSlug" element={<TenantLoader />}>
        {/* All tenant routes require auth */}
        <Route
          element={
            <ProtectedRoute>
              <Outlet />
            </ProtectedRoute>
          }
        >
          {/* Default redirect to dashboard */}
          <Route index element={<Navigate to="dashboard" replace />} />

          {/* Agent + Admin */}
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="tickets" element={<TicketsPage />} />
          <Route path="tickets/:ticketId" element={<TicketDetailPage />} />
          <Route path="settings" element={<SettingsPage />} />


          {/* Admin only */}
          <Route
            path="agents"
            element={
              <AdminGuard>
                <AgentsPage />
              </AdminGuard>
            }
          />
          <Route
            path="widgets"
            element={
              <AdminGuard>
                <WidgetsPage />
              </AdminGuard>
            }
          />
          <Route
            path="ai-context"
            element={
              <AdminGuard>
                <AiContextPage />
              </AdminGuard>
            }
          />
        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
