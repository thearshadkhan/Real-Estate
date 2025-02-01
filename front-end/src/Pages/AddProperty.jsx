import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProperty } from "../services/propertyService";

const AddProperty = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [locality, setLocality] = useState("");
  const [type, setType] = useState("home");
  const [size, setSize] = useState(0);
  const [price, setPrice] = useState(0);
  const [photos, setPhotos] = useState([]);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
      setPhotos(e.target.files);
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      const token = localStorage.getItem("token");
      if (!token) {
          alert("Please login first");
          navigate("/login");
          return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("city", city);
      formData.append("locality", locality);
      formData.append("type", type);
      formData.append("size", size);
      formData.append("price", price);
      for (let i = 0; i < photos.length; i++) {
          formData.append("photos", photos[i]);
      }

      try {
          await addProperty(formData, token);
          alert("Property added successfully");
          navigate("/");
      } catch (err) {
          alert("Error adding property");
      }
  };

  return (
      <div>
          <h2>Add Property</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
              <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
              <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
              <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
              <input type="text" placeholder="Locality" value={locality} onChange={(e) => setLocality(e.target.value)} required />
              <select value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="home">Home</option>
                  <option value="apartment">Apartment</option>
                  <option value="office">Office</option>
                  <option value="land">Land</option>
              </select>
              <input type="number" placeholder="Size" value={size} onChange={(e) => setSize(e.target.value)} required />
              <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
              <input type="file" multiple onChange={handleFileChange} />
              <button type="submit">Add Property</button>
          </form>
      </div>
  );
};

export default AddProperty;
