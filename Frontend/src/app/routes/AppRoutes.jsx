import { lazy, Suspense } from "react";

import { Routes, Route, Navigate, Outlet } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import TenantLoader from "./TenantLoader";
import AdminGuard from "./AdminGuard";
import { PageLoader } from "../../shared/components/ui/Spinner";

const LandingPage = lazy(
  () => import("../../features/landing/pages/LandingPage"),
);
const DocsPage = lazy(() => import("../../features/docs/pages/DocsPage"));
const AuthPage = lazy(() => import("../../features/auth/pages/AuthPage"));
const DashboardPage = lazy(
  () => import("../../features/dashboard/pages/DashboardPage"),
);
const TicketsPage = lazy(
  () => import("../../features/tickets/pages/TicketsPage"),
);
const TicketDetailPage = lazy(
  () => import("../../features/tickets/pages/TicketDetailPage"),
);
const AgentsPage = lazy(() => import("../../features/agents/pages/AgentsPage"));
const ChatWidgetPage = lazy(
  () => import("../../features/widgets/pages/ChatWidgetPage"),
);
const WidgetsPage = lazy(
  () => import("../../features/widgets/pages/WidgetsPage"),
);
const AiContextPage = lazy(
  () => import("../../features/ai-context/pages/AiContextPage"),
);
const SettingsPage = lazy(
  () => import("../../features/settings/pages/SettingsPage"),
);
const NotFoundPage = lazy(
  () => import("../../shared/components/pages/NotFoundPage"),
);

/**
 * Route Protection Layers:
 * 1. TenantLoader  — resolves /:slug → tenant (404 = not found page)
 * 2. ProtectedRoute — checks user auth (no cookie → /auth)
 * 3. AdminGuard    — wraps admin-only routes (agent → 403 page)
 */
const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
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
    </Suspense>
  );
};

export default AppRoutes;
