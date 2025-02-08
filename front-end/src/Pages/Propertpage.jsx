import React, { useEffect, useState } from "react";
import { fetchAllProperties } from "../services/propertyService";
import { Link } from "react-router-dom";
import errorImage from "../assets/ErrorImage.png";

const PropertyPage = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    type: "",
    location: "",
    size: "",
    price: "",
  });

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await fetchAllProperties();
        const approvedProperties = data.filter((property) => property.approvalStatus === "approved");
        setProperties(approvedProperties);
        setFilteredProperties(approvedProperties);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchProperties();
  }, []);

  // Update filtering when filters change
  useEffect(() => {
    let filtered = properties;

    if (filters.type) {
      filtered = filtered.filter((prop) => prop.type.toLowerCase() === filters.type.toLowerCase());
    }
    if (filters.location) {
      filtered = filtered.filter((prop) => prop.city.toLowerCase() === filters.location.toLowerCase());
    }
    if (filters.size) {
      filtered = filtered.filter((prop) => prop.size === filters.size);
    }
    if (filters.price) {
      filtered = filtered.filter((prop) => prop.price <= Number(filters.price));
    }

    setFilteredProperties(filtered);
  }, [filters, properties]);

  // Function to handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-7xl mx-auto mt-20 p-6">
      <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">Property Listings</h2>

      {error && (
        <p className="text-red-600 bg-red-100 border border-red-400 px-4 py-2 rounded-md mb-4 text-center">
          Error: {error}
        </p>
      )}

      {/* Filters Bar */}
      <div className="bg-white shadow-lg p-4 rounded-lg flex flex-wrap gap-4 justify-center">
        <select name="type" className="p-2 border rounded" onChange={handleFilterChange} value={filters.type}>
          <option value="">All Types</option>
          <option value="Home">Home</option>
          <option value="Apartment">Apartment</option>
          <option value="Villa">Villa</option>
        </select>

        <select name="location" className="p-2 border rounded" onChange={handleFilterChange} value={filters.location}>
          <option value="">All Locations</option>
          <option value="Agra">Agra</option>
          <option value="Delhi">Delhi</option>
          <option value="Mumbai">Mumbai</option>
        </select>

        <select name="size" className="p-2 border rounded" onChange={handleFilterChange} value={filters.size}>
          <option value="">All Sizes</option>
          <option value="1BHK">1 BHK</option>
          <option value="2BHK">2 BHK</option>
          <option value="3BHK">3 BHK</option>
        </select>

        <select name="price" className="p-2 border rounded" onChange={handleFilterChange} value={filters.price}>
          <option value="">No Price Limit</option>
          <option value="100000">Up to $100,000</option>
          <option value="200000">Up to $200,000</option>
          <option value="300000">Up to $300,000</option>
        </select>
      </div>

      {/* Property Listings */}
      <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <Link to={`/property/${property._id}`} key={property._id} className="block transform transition hover:scale-105">
              <div className="bg-white shadow-xl rounded-lg overflow-hidden hover:shadow-2xl transition duration-300">
                {property.photos.length > 0 ? (
                  <img
                    src={`http://localhost:5000/${property.photos[0]}`}
                    alt={property.title}
                    className="w-full h-60 object-cover"
                  />
                ) : (
                  <img src={errorImage} alt={property.title} className="w-full h-60 object-cover" />
                )}
                <div className="p-5">
                  <h3 className="text-2xl font-semibold text-gray-900">{property.title}</h3>
                  <p className="text-gray-600 text-sm mt-2">{property.description.slice(0, 80)}...</p>

                  <div className="mt-4 space-y-2">
                    <p className="text-gray-700 font-medium">
                      <span className="font-bold">Type:</span> {property.type}
                    </p>
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
          ))
        ) : (
          <p className="text-center text-gray-500">No properties found.</p>
        )}
      </div>
    </div>
  );
};

export default PropertyPage;
