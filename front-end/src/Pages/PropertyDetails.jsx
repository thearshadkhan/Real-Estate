import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPropertyById } from "../services/propertyService";
import LikeButton from "./likes";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [error, setError] = useState("");
  const [showMessageBox, setShowMessageBox] = useState(false); // State to toggle message box

  useEffect(() => {
    const getProperty = async () => {
      try {
        const data = await fetchPropertyById(id);
        setProperty(data);
      } catch (err) {
        setError(err.message);
      }
    };
    getProperty();
  }, [id]);

  const handleSendClick = () => {
    setShowMessageBox(!showMessageBox); // Toggle the message box visibility
  };

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <p className="text-red-600 bg-red-100 border border-red-400 px-4 py-2 rounded-md">
          Error: {error}
        </p>
        <button
          onClick={() => navigate(-1)}
          className="text-blue-500 underline mt-4 inline-block"
        >
          ← Back to Listings
        </button>
      </div>
    );
  }

  if (!property) {
    return <p className="text-center text-gray-700 text-lg mt-10">Loading property details...</p>;
  }

  return (
    <div className="mt-20 max-w-5xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-500 underline mb-4 inline-block"
      >
        ← Back to Listings
      </button>

      {property.photos.length > 0 && (
        <img
          src={`http://localhost:5000/${property.photos[0]}`}
          alt={property.title}
          className="w-full h-72 object-cover rounded-md shadow-md"
        />
      )}

      <h2 className="text-4xl font-bold text-gray-800 mt-6">{property.title}</h2>
      <p className="text-gray-600 text-lg mt-2">{property.description}</p>

      <div className="mt-6 grid md:grid-cols-2 gap-4 bg-white p-5 rounded-lg shadow">
        <p className="text-gray-700 text-lg">
          <span className="font-semibold">🏙️ City:</span> {property.city}
        </p>
        <p className="text-gray-700 text-lg">
          <span className="font-semibold">💰 Price:</span> ${property.price}
        </p>
        <p className="text-gray-700 text-lg">
          <span className="font-semibold">📞 Contact:</span> {property.contact}
        </p>
      </div>

      <div className="mt-6">
        <button
          onClick={handleSendClick}
          className="px-5 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>

      {showMessageBox && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Send Message</h3>
          <textarea
            placeholder="Type your message..."
            className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            rows="4"
          />
          <div className="flex justify-end">
            <button className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
              Send Message
            </button>
          </div>
        </div>
      )}

      <LikeButton />
    </div>
  );
};

export default PropertyDetails;
