import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Settings,
  Megaphone,
  LogOut,
  Menu,
  X,
  User
} from 'lucide-react';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    
    // Redirect to login page
    navigate('/admin/login');
  };

  // Get admin user info from localStorage
  const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{"username": "Admin"}');

  // Navigation items for sidebar
  const navItems = [
    { 
      name: 'Dashboard', 
      path: '/admin/dashboard', 
      icon: <LayoutDashboard className="h-5 w-5" /> 
    },
    { 
      name: 'Blogs', 
      path: '/admin/blogs', 
      icon: <FileText className="h-5 w-5" /> 
    },
    { 
      name: 'Services', 
      path: '/admin/services', 
      icon: <Settings className="h-5 w-5" /> 
    },
    { 
      name: 'Marketing', 
      path: '/admin/marketing', 
      icon: <Megaphone className="h-5 w-5" /> 
    }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-indigo-700 transition duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between px-6">
          <div className="text-xl font-bold text-white">MyTea Admin</div>
          <button 
            onClick={toggleSidebar}
            className="text-white focus:outline-none lg:hidden"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="px-4 py-3">
          <div className="flex items-center space-x-3 rounded-md bg-indigo-800 px-3 py-2">
            <User className="h-6 w-6 text-white" />
            <div className="text-sm font-medium text-white">
              {adminUser.username}
            </div>
          </div>
        </div>

        <nav className="mt-5 px-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => 
                `mt-1 flex items-center rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-indigo-800 text-white' 
                    : 'text-indigo-100 hover:bg-indigo-600'
                }`
              }
            >
              {item.icon}
              <span className="ml-3">{item.name}</span>
            </NavLink>
          ))}

          <button
            onClick={handleLogout}
            className="mt-1 flex w-full items-center rounded-md px-4 py-2 text-sm font-medium text-indigo-100 transition-colors hover:bg-indigo-600"
          >
            <LogOut className="h-5 w-5" />
            <span className="ml-3">Logout</span>
          </button>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top header */}
        <header className="flex h-16 items-center justify-between border-b bg-white px-6">
          <button
            onClick={toggleSidebar}
            className="text-gray-500 focus:outline-none lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="text-xl font-bold text-gray-800 lg:hidden">
            MyTea Admin
          </div>
          <div className="flex items-center"></div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-auto p-6">
          {/* Show Outlet or default dashboard content */}
          <Outlet context={{ adminUser }} />
        </main>
      </div>
    </div>
  );
};

// Dashboard default content - displayed when /admin/dashboard is accessed
export const DashboardHome = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // These would typically come from an API
  const stats = [
    { label: 'Total Blogs', value: 24 },
    { label: 'Services', value: 8 },
    { label: 'Marketing Campaigns', value: 3 },
    { label: 'Total Users', value: 156 }
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">{currentDate}</p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg bg-white p-6 shadow"
          >
            <p className="text-sm font-medium text-gray-600">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-lg font-medium text-gray-900">Welcome to Admin Dashboard</h2>
        <p className="text-gray-600">
          Use the sidebar navigation to manage your website's content. You can:
        </p>
        <ul className="mt-2 list-disc pl-5 text-gray-600">
          <li>Create and manage blog posts</li>
          <li>Update service offerings</li>
          <li>Configure marketing campaigns</li>
          <li>Monitor website performance</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;

