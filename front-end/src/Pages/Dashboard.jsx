import React, { useEffect, useState } from "react";
import { Navigate, Link, Outlet } from "react-router-dom";

const isAuthenticated = () => {
  return localStorage.getItem("token"); // Ensure authentication check
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
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
          <p className="font-medium">Blocked Users: {metrics.totalBlockedUsers}</p>
        </div>
      </div>
      <nav className="mb-6">
        <ul className="space-y-4">
          <li><Link to="properties" className="text-blue-600 hover:underline">Property Management</Link></li>
          <li><Link to="users" className="text-blue-600 hover:underline">User Management</Link></li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default Dashboard;
