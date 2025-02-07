import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPropertyById, updateProperty } from "../services/propertyService";

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Retrieve user token

  const [property, setProperty] = useState({
    title: "",
    description: "",
    price: "",
    city: "",
    locality: "",
    contact: "",
    type: "",
    size: "",
    amenities: [],
    photos: []
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true; // Prevent memory leaks

    const getProperty = async () => {
      try {
        const data = await fetchPropertyById(id);
        if (isMounted) {
          setProperty({
            title: data.title || "",
            description: data.description || "",
            price: data.price || "",
            city: data.city || "",
            locality: data.locality || "",
            contact: data.contact || "",
            type: data.type || "",
            size: data.size || "",
            amenities: data.amenities || [],
            photos: data.photos || []
          });
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    getProperty();
    return () => {
      isMounted = false;
    };
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "amenities") {
      setProperty({ ...property, [name]: value.split(",") });
    } else {
      setProperty({ ...property, [name]: value });
    }
  };

  // Handle file input
  const handleFileChange = (e) => {
    setProperty({ ...property, photos: e.target.files });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let key in property) {
      if (key === "photos") {
        for (let i = 0; i < property.photos.length; i++) {
          formData.append("photos", property.photos[i]);
        }
      } else {
        formData.append(key, property[key]);
      }
    }

    try {
      await updateProperty(id, formData, token);
      navigate(`/properties/${id}`);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Edit Property</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label className="block mb-2">Title:</label>
        <input type="text" name="title" value={property.title} onChange={handleChange} className="w-full p-2 border rounded mb-4" />

        <label className="block mb-2">Description:</label>
        <textarea name="description" value={property.description} onChange={handleChange} className="w-full p-2 border rounded mb-4" />

        <label className="block mb-2">Price:</label>
        <input type="number" name="price" value={property.price} onChange={handleChange} className="w-full p-2 border rounded mb-4" />

        <label className="block mb-2">City:</label>
        <input type="text" name="city" value={property.city} onChange={handleChange} className="w-full p-2 border rounded mb-4" />

        <label className="block mb-2">Locality:</label>
        <input type="text" name="locality" value={property.locality} onChange={handleChange} className="w-full p-2 border rounded mb-4" />

        <label className="block mb-2">Contact:</label>
        <input type="text" name="contact" value={property.contact} onChange={handleChange} className="w-full p-2 border rounded mb-4" />

        <label className="block mb-2">Amenities (comma-separated):</label>
        <input type="text" name="amenities" value={property.amenities.join(",")} onChange={handleChange} className="w-full p-2 border rounded mb-4" />

        <label className="block mb-2">Upload Photos:</label>
        <input type="file" multiple name="photos" onChange={handleFileChange} className="w-full p-2 border rounded mb-4" />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update Property</button>
      </form>
    </div>
  );
};

export default EditProperty;
