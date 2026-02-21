import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  Box,
  useToast,
} from "@chakra-ui/react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard.jsx";
import AIInsights from "./pages/AIInsights.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import { AuthProvider, useAuth } from "./utils/authContext.jsx";
import { setToastFunction } from "./services/api.js";
import ExpertAdvice from "./pages/ExpertAdvice.jsx";
import DashboardLayout from "./components/DashboardLayout";

import Compare from "./pages/Compare.jsx";

function AppContent() {
  const { user } = useAuth();
  const toast = useToast();

  // Set up toast function for API service
  useEffect(() => {
    setToastFunction(toast);
  }, [toast]);

  return (
    <Router>
      <Box minH="100vh">
        <Routes>
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/dashboard" />}
          />
          
          {/* Protected Dashboard Routes */}
          <Route
            path="/dashboard"
            element={user ? (
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            ) : <Navigate to="/login" />}
          />
          <Route
            path="/insights"
            element={user ? (
              <DashboardLayout>
                <AIInsights />
              </DashboardLayout>
            ) : <Navigate to="/login" />}
          />
          <Route
            path="/advice"
            element={user ? (
              <DashboardLayout>
                <ExpertAdvice />
              </DashboardLayout>
            ) : <Navigate to="/login" />}
          />
          <Route
            path="/compare"
            element={user ? (
              <DashboardLayout>
                <Compare />
              </DashboardLayout>
            ) : <Navigate to="/login" />}
          />
          
          <Route
            path="/"
            element={<LandingPage />}
          />
        </Routes>
      </Box>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
