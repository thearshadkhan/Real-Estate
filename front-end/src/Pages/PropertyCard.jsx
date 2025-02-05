import React from "react";
import { Link } from "react-router-dom";

const PropertyCard = ({ property }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <img
        src={`http://localhost:5000/${property.photos[0]}`}
        alt={property.title}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h3 className="text-xl font-semibold">{property.title}</h3>
      <p className="text-gray-600">{property.city}</p>
      <p className="text-gray-800 font-semibold">${property.price}</p>
      <Link
        to={`/property/${property._id}`} key={property._id}
        className="text-blue-500 underline mt-4 block"
      >
        View Details
      </Link>
    </div>
  );
};

export default PropertyCard;
