import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProperty } from "../services/propertyService";
import addBg from "../assets/addProp.jpg";

const AddProperty = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [locality, setLocality] = useState("");
  const [type, setType] = useState("home");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
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
          navigate("/propertyPage");
      } catch (err) {
          alert("Error adding property");
      }
  };

  return (
    <div
    className="min-h-screen flex items-center justify-center bg-cover bg-center"
    style={{ backgroundImage: `url(${addBg})` , backgroundSize: "cover", backgroundPosition: "center", height:"120vh",
    borderBottomRightRadius:20,
    borderBottomLeftRadius:20,}}
  >
    {/* Glassmorphism Container */}
    <div className=" relative w-full max-w-lg p-8 rounded-2xl bg-gradient-to-r from-white/20 to-white/5 backdrop-blur-sm border border-white/10">
      <h2 className="text-2xl font-bold text-white text-center mb-4">Add Property</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 border border-white/30 rounded bg-transparent text-white placeholder-white focus:ring-2"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full p-2 border border-white/30 rounded bg-transparent text-white placeholder-white focus:ring-2"
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          className="w-full p-2 border border-white/30 rounded bg-transparent text-white placeholder-white focus:ring-2"
        />
        <input
          type="text"
          placeholder="Locality"
          value={locality}
          onChange={(e) => setLocality(e.target.value)}
          required
          className="w-full p-2 border border-white/30 rounded bg-transparent text-white placeholder-white focus:ring-2"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 border border-white/30 rounded bg-transparent text-white placeholder-white focus:ring-2"
        >
          <option value="home">Home</option>
          <option value="apartment">Apartment</option>
          <option value="office">Office</option>
          <option value="land">Land</option>
        </select>
        <input
          type="text"
          placeholder="Size (sqft)"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          required
          className="w-full p-2 border border-white/30 rounded bg-transparent text-white placeholder-white focus:ring-2"
        />
        <input
          type="text"
          placeholder="Price ($)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="w-full p-2 border border-white/30 rounded bg-transparent text-white placeholder-white focus:ring-2"
        />
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="w-full p-2 border border-white/30 rounded bg-transparent text-white placeholder-white focus:ring-2"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-white/60 to-white/10 w-full text-xl font-semibold px-6 py-2 rounded-lg text-white hover:bg-gradient-to-l from-white/60 to-white/10"
        >
          Add Property
        </button>
      </form>
    </div>
  </div>
  );
};

export default AddProperty;
