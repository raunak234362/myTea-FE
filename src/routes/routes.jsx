import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import LandingView from "../views/Landing/LandingView";
import AdminLogin from "../components/auth/AdminLogin";
import AdminDashboard, { DashboardHome } from "../views/admin/AdminDashboard";
import BlogManager from "../components/admin/BlogManager";
import ServiceManager from "../components/admin/ServiceManager";
import MarketingManager from "../components/admin/MarketingManager";

// Protected route component for admin routes
const RequireAdminAuth = () => {
  const isAuthenticated = localStorage.getItem('adminToken') !== null;
  
  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/admin/login" replace />;
  }
  
  // Render child routes if authenticated
  return <Outlet />;
};

const routes = [
    {
        path: "/",
        element: <LandingView />,
    },
    {
        path: "/admin/login",
        element: <AdminLogin />,
    },
    {
        path: "/admin",
        element: <RequireAdminAuth />,
        children: [
            {
                path: "",
                element: <Navigate to="/admin/dashboard" replace />,
            },
            {
                path: "dashboard",
                element: <AdminDashboard />,
                children: [
                    {
                        path: "",
                        element: <DashboardHome />,
                    }
                ]
            },
            {
                path: "blogs",
                element: <AdminDashboard />,
                children: [
                    {
                        path: "",
                        element: <BlogManager />,
                    }
                ]
            },
            {
                path: "services",
                element: <AdminDashboard />,
                children: [
                    {
                        path: "",
                        element: <ServiceManager />,
                    }
                ]
            },
            {
                path: "marketing",
                element: <AdminDashboard />,
                children: [
                    {
                        path: "",
                        element: <MarketingManager />,
                    }
                ]
            }
        ]
    },
    {
        path: "*",
        element: <Navigate to="/" replace />,
    }
];

export default routes;
