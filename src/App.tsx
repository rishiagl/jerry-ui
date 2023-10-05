import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
  useNavigate,
} from "react-router-dom";
import Root from "./routes/Root"
import Invoice from "./routes/Invoice";
import { CallbackPage } from "./callback-page";
import { redirect } from "react-router-dom";
import { IndexPage } from "./pages/index-page";
import { useAuth0 } from "@auth0/auth0-react";
import { PageLoader } from "./pages/page-loader";
import { NotFoundPage } from "./pages/pageNotFound";
import { HomePage } from "./pages/home-page";
import { AuthenticationGuard } from "./components/authentication-guard";
import { DashboardPage } from "./pages/dashboard-page";

export const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/home" element={<AuthenticationGuard component={HomePage} />} />
      <Route path="/dashboard" element={<AuthenticationGuard component={DashboardPage} />} />
      <Route path="/callback" element={<CallbackPage />} />
      <Route path="/invoice" element={<Invoice />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};