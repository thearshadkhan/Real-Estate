import React, { useState } from "react";
import { registerUser } from "../services/userService";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // Default role
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      setMessage(response.message); // "User registered successfully"
    } catch (error) {
      setMessage(error); // Error message from backend
    }
  };

  return (

    <div className="w-fit mx-auto px-10 py-10 bg-blue-200 flex flex-col rounded">
      <h2>Register</h2>
      <form className="flex flex-col w-fit py-2 gap-3" onSubmit={handleSubmit}>
        <input 
          className="px-2 py-1 border-1 rounded border-blue-400 focus:bg-blue-100"
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input type="email"
        className="px-2 py-1 border-1 rounded border-blue-400"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input type="password"
        className="px-2 py-1 border-1 rounded border-blue-400"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button className="text-white bg-blue-500 rounded-md text-left px-6 py-1 w-max hover:bg-blue-400" type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
