import React, { useState, useEffect } from "react";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Unauthorized: No token found.");
          return;
        }

        const response = await fetch("http://localhost:5000/api/admin/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("API Response Data:", data);

        if (!Array.isArray(data)) {
          throw new Error("Invalid response format. Expected an array.");
        }

        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err.message);
        setError(err.message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">User Management</h2>

      {error && (
        <p className="text-red-600 bg-red-100 border border-red-400 px-4 py-2 rounded-md mb-4 text-center">
          Error: {error}
        </p>
      )}

      {users.length === 0 ? (
        <p className="text-center text-gray-500">No users found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {users.map((user) => (
            <div
              key={user.id || user._id}
              className="bg-white shadow-xl rounded-lg overflow-hidden hover:shadow-2xl transition duration-300 p-5"
            >
              <h3 className="text-2xl font-semibold text-gray-900">{user.username}</h3>
              <p className="text-gray-600 text-sm mt-2">
                <span className="font-bold">Email:</span> {user.email}
              </p>
              <p className="text-gray-700 font-medium mt-2">
                <span className="font-bold">Role:</span> {user.role}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserManagement;
