import React, { useEffect, useState } from "react";
import { fetchOwnerProperties } from "../services/propertyService";
import { useNavigate } from "react-router-dom";

const OwnerDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getProperties = async () => {
      try {
        const data = await fetchOwnerProperties();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error.message);
      } finally {
        setLoading(false);
      }
    };
    getProperties();
  }, []);

  if (loading) return <p className="text-center mt-4">Loading properties...</p>;

  return (
    <div className="container mx-auto p-4 mt-22">
      <h2 className="text-xl font-bold mb-4">Your Listed Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.length > 0 ? (
          properties.map((property) => (
            <div key={property._id} className="border rounded-lg shadow-md p-4 bg-white">
            <img
        src={`http://localhost:5000/${property.photos[0]}`}
        alt={property.title}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h3 className="text-xl font-semibold">{property.title}</h3>
      <p className="text-gray-600">{property.city}</p>
      <p className="text-gray-800 font-semibold">${property.price}</p>
      <button
                onClick={() => navigate(`/details/${property._id}`)}
                className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
              >
                View Details
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">You haven't added any properties yet.</p>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;
