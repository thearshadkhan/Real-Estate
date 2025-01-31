import React, { useState } from "react";
import { addProperty } from "../services/propertyService";

const AddProperty = () => {
  const [formData, setFormData] = useState({
    ownerId: "", // This would typically come from the logged-in user's ID
    title: "",
    description: "",
    city: "",
    locality: "",
    type: "land", // Default to "land", "home", or "office"
    size: "",
    price: "",
    photos: [],
    amenities: [],
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addProperty(formData);
      setMessage(response.message); // "Property added successfully"
    } catch (error) {
      setMessage(error); // Show error message from backend
    }
  };

  return (
    <div>
      <h2>Add Property</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="ownerId"
          placeholder="Owner ID"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="locality"
          placeholder="Locality"
          value={formData.locality}
          onChange={handleChange}
          required
        />
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="land">Land</option>
          <option value="home">Home</option>
          <option value="office">Office</option>
        </select>
        <input
          type="number"
          name="size"
          placeholder="Size (in sq ft)"
          value={formData.size}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Property</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddProperty;
