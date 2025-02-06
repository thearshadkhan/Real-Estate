import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllProperties } from "../services/propertyService";
import heroBg from "../assets/hero-section.jpg";
import { FaSearch } from "react-icons/fa";

const HomePage = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await fetchAllProperties();
        setProperties(data.slice(0, 3)); // Show only the first 3 properties
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    fetchProperties();
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-black">
      {/* Hero Section */}
      <div
        className="relative flex flex-col justify-center items-center text-center text-white py-32 px-6"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "90vh",
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
        }}
      >
        <h2 className="text-5xl font-bold mb-5">
          Buying & Selling Property<br /> Made Easy With{" "}
          <br />
          <span className="text-red-600 text-7xl">Brick & Beams</span>
        </h2>

        {/* Search Filters */}
        <div className="bg-black bg-opacity-50 rounded-full p-4 mt-6 flex gap-4">
          <select className="py-2 px-4 bg-black text-white rounded">
            <option>Home</option>
          </select>
          <select className="py-2 px-4 bg-black text-white rounded">
            <option>Location</option>
          </select>
          <select className="py-2 px-4 bg-black text-white rounded">
            <option>Size</option>
          </select>
          <select className="py-2 px-4  bg-black text-white rounded">
            <option>Price</option>
          </select>
          <button className="flex items-center space-x-2 bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-full">
            <FaSearch className="text-lg" />
            <span>Search</span>
          </button>
        </div>
      </div>

      {/* Property Listings (Only 3) */}
      <div className="max-w-7xl mx-auto  p-6">
        <h2 className="text-4xl font-bold text-red-700 mb-6 text-center">Featured Properties</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                    <p className="text-green-600 font-bold text-lg">${property.price}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Link to="/propertyPage">
            <button className="bg-red-700 text-white px-6 py-3 text-lg rounded-lg hover:bg-red-800 transition">
              View All Properties
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
