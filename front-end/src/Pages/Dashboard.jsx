import React from "react";
import { Navigate, Link, Outlet } from "react-router-dom";

const isAuthenticated = () => {
  return localStorage.getItem("token"); // Ensure authentication check
};

const Dashboard = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <nav>
        <ul>
          <li><Link to="properties">Property Management</Link></li>  {/* Relative path */}
          <li><Link to="users">User Management</Link></li>  {/* Relative path */}
        </ul>
      </nav>
      <Outlet /> {/* This renders nested components */}
    </div>
  );
};

export default Dashboard;
