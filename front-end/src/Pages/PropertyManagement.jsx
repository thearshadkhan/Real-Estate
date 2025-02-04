import React, { useEffect, useState } from "react";

const PropertyManagement = () => {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/properties");
        const text = await response.text(); // Get response as text for debugging

        console.log("Raw Response:", text); // 🔍 Log full response to see what's wrong

        const data = JSON.parse(text); // Parse it as JSON
        setProperties(data);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to load properties. Please try again.");
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">Property Management</h2>

      {error && (
        <p className="text-red-600 bg-red-100 border border-red-400 px-4 py-2 rounded-md mb-4 text-center">
          Error: {error}
        </p>
      )}

      {properties.length === 0 ? (
        <p className="text-center text-gray-500">No properties found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div
              key={property.id || property._id}
              className="bg-white shadow-xl rounded-lg overflow-hidden hover:shadow-2xl transition duration-300 p-5"
            >
              {property.photos && property.photos.length > 0 && (
                <img
                  src={`http://localhost:5000/${property.photos[0]}`}
                  alt={property.name}
                  className="w-full h-60 object-cover"
                />
              )}
              <div className="p-5">
                <h3 className="text-2xl font-semibold text-gray-900">{property.name}</h3>
                <p className="text-gray-600 text-sm mt-2">{property.description?.slice(0, 80)}...</p>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-gray-700 font-medium">
                    <span className="font-bold">City:</span> {property.city}
                  </p>
                  <p className="text-green-600 font-bold text-lg">${property.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyManagement;
