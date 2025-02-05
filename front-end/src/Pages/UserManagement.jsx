import React, { useState, useEffect } from "react";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/admin/users", {
          headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError("Failed to load users.");
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  const handleBanUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/users/${id}/ban`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const updatedUsers = users.map((user) =>
          user._id === id ? { ...user, status: "suspended" } : user
        );
        setUsers(updatedUsers);
      } else {
        setError("Failed to ban user.");
      }
    } catch (err) {
      setError("Error banning user.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">User Management</h2>
      {error && <p className="text-red-600">{error}</p>}
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user._id} className="p-4 border border-gray-200 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold">{user.username}</h3>
            <p>{user.email}</p>
            <p>Status: {user.status}</p>
            <button
              onClick={() => handleBanUser(user._id)}
              className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
            >
              Ban User
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;
