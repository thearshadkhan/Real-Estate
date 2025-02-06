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
      <h2 className="text-3xl font-bold mb-4 mt-25">Admin Dashboard</h2>
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
      <nav className="w-full max-w-auto flex">
        {/* left sidebar with options */}
      <nav className="w-3xs border border-gray-200 rounded-lg shadow-sm border-r-2">


      <nav className="mb-6">
        <ul className="space-y-4 flex flex-col">
          <li><Link to="properties" className="text-blue-500 text-2xl hover:underline">Property Management</Link></li>
  
          <li><Link to="users" className="text-blue-500 hover:underline text-2xl">User Management</Link></li>
        </ul>
      </nav>
      </nav>
      
      <nav className="w-7xl ">
      <Outlet />
      </nav>


      </nav>
      
      
      {/* <Outlet /> */}
    </div>
  );
};

export default Dashboard;
