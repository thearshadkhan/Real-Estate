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
    <div>
      <h2>Property Listings</h2>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <ul>
        {properties.map((property) => (
          <li key={property._id}>
            {property.photos.length > 0 && (
              <img
                src={`http://localhost:5000/${property.photos[0]}`} 
                alt={property.title} 
                style={{ width: "340px", height: "340px", borderRadius: "8px" }}
              />
            )}
            <h3>{property.title}</h3>
            <p>{property.description}</p>
            <p>City: {property.city}</p>
            <p>Price: ${property.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PropertyPage;
