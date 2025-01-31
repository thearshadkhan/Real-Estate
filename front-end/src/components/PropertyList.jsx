import React, { useEffect, useState } from "react";
import { fetchAllProperties } from "../services/propertyService";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await fetchAllProperties();
        setProperties(data);
      } catch (err) {
        setError(err);
      }
    };
    fetchProperties();
  }, []);

  return (
    <div>
      <h2>Property Listings</h2>
      {error && <p>Error: {error}</p>}
      <ul>
        {properties.map((property) => (
          <li key={property._id}>
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

export default PropertyList;
