import React, { useEffect, useState } from "react";
import { fetchAllProperties } from "../services/propertyService";
import { Link } from "react-router-dom";

const PropertyPage = () => {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await fetchAllProperties();
        setProperties(data.filter(property => property.approvalStatus === "approved")); // Extra safety
      } catch (err) {
        setError(err.message);
      }
    };
    fetchProperties();
  }, []);


  return (
    <div className="max-w-7xl mx-auto mt-30 p-6">
      <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">Property Listings</h2>

      {error && (
        <p className="text-red-600 bg-red-100 border border-red-400 px-4 py-2 rounded-md mb-4 text-center">
          Error: {error}
        </p>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <Link to={`/property/${property._id}`} key={property._id} className="block transform transition hover:scale-105">
            <div className="bg-white shadow-xl rounded-lg overflow-hidden hover:shadow-2xl transition duration-300">
              {property.photos.length > 0 && (
                <img
                  src={`http://localhost:5000/${property.photos[0]}`}
                  alt={property.title}
                  className="w-full h-60 object-cover"
                />
              )}
              <div className="p-5">
                <h3 className="text-2xl font-semibold text-gray-900">{property.title}</h3>
                <p className="text-gray-600 text-sm mt-2">{property.description.slice(0, 80)}...</p>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-gray-700 font-medium">
                    <span className="font-bold">City:</span> {property.city}
                  </p>
                  <p className="text-gray-700 font-medium">
                    <span className="font-bold">Locality:</span> {property.locality}
                  </p>
                  <p className="text-green-600 font-bold text-lg">${property.price}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PropertyPage;
