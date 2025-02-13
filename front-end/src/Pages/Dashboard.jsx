import React, { useEffect, useState } from "react";
import { Navigate, Link, Outlet } from "react-router-dom";

const isAuthenticated = () => {
  return localStorage.getItem("token");
};

const Dashboard = () => {
  const [metrics, setMetrics] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/admin/dashboard/metrics", {
          headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
        });

        if (!response.ok) throw new Error("Failed to fetch metrics.");

        const data = await response.json();
        setMetrics(data);
      } catch (err) {
        setError("Failed to load metrics.");
        console.error(err);
      }
    };

    fetchMetrics();
  }, []);

  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Admin Dashboard</h2>
      {error && <p className="text-red-600">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
          <p className="font-medium">Total Users: {metrics.totalUsers}</p>
        </div>
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
          <p className="font-medium">Active Properties: {metrics.totalActiveProperties}</p>
        </div>
        {/* Make Blocked Users Clickable */}
        <Link 
          to="users?blocked=true" 
          className="p-4 border border-gray-200 rounded-lg shadow-sm block hover:bg-gray-100 transition"
        >
          <p className="font-medium">Blocked Users: {metrics.totalBlockedUsers}</p>
        </Link>
      </div>

      <nav className="w-full flex">
        {/* Sidebar */}
        <nav className="w-1/4 border border-gray-200 rounded-lg shadow-sm p-4">
          <ul className="space-y-4 flex flex-col">
            <li><Link to="properties" className="text-red-700 text-xl font-bold hover:underline">Property Management</Link></li>
            <li><Link to="users" className="text-red-700 hover:underline text-xl font-bold">User Management</Link></li>
          </ul>
        </nav>

        {/* Main Content */}
        <div className="w-3/4 p-4">
          <Outlet />
        </div>
      </nav>
    </div>
  );
};

export default Dashboard;

