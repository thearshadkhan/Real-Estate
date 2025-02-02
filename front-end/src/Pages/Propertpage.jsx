import React, { useEffect, useState } from "react";
import { fetchAllProperties } from "../services/propertyService";

const PropertyPage = () => {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await fetchAllProperties();
        setProperties(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchProperties();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Property Listings</h2>

      {error && (
        <p className="text-red-700 bg-red-100 border border-red-400 px-4 py-2 rounded-md mb-4">
          Error: {error}
        </p>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div
            key={property._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition duration-300"
          >
            {property.photos.length > 0 && (
              <img
                src={`http://localhost:5000/${property.photos[0]}`}
                alt={property.title}
                className="w-full h-56 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-900">{property.title}</h3>
              <p className="text-gray-600 text-sm mt-1">{property.description}</p>
              <p className="text-gray-700 mt-2">
                <span className="font-semibold">City:</span> {property.city}
              </p>
              <p className="text-green-600 font-bold text-lg mt-2">${property.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyPage;
