import React, { useEffect, useState } from "react";
import { fetchLikedProperties, fetchSavedProperties,toggleSaveProperty  } from "../services/propertyService"; // Add functions to fetch liked and saved properties
import PropertyCard from "../components/PropertyCard"; // A component to display property details

const UserDashboard = () => {
  const [likedProperties, setLikedProperties] = useState([]);
  const [savedProperties, setSavedProperties] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getLikedProperties = async () => {
      try {
        const likedData = await fetchLikedProperties();
        setLikedProperties(likedData);
      } catch (err) {
        setError("Failed to fetch liked properties.");
      }
    };
    const getSavedProperties = async () => {
      try {
        const savedData = await fetchSavedProperties();
        setSavedProperties(savedData);
      } catch (err) {
        setError("Failed to fetch saved properties.");
      }
    };
    getLikedProperties();
    getSavedProperties();
  }, []);

 // Handle Unsave
 const handleUnsave = async (id) => {
  try {
    await toggleSaveProperty(id);
    setSavedProperties(savedProperties.filter(property => property._id !== id));
  } catch (err) {
    setError("Failed to unsave the property.");
  }
};

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="mt-20 max-w-7xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Liked Properties</h2>
        {likedProperties.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {likedProperties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        ) : (
          <p>No liked properties yet.</p>
        )}
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Saved Properties</h2>
        {savedProperties.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedProperties.map((property) => (
              <PropertyCard key={property._id} property={property} onUnsave={() => handleUnsave(property._id)}/>
            ))}
            
          </div>
        ) : (
          <p>No saved properties yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
