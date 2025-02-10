import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaArrowUp } from "react-icons/fa";
import { fetchAllProperties } from "../services/propertyService";
import heroBg from "../assets/hero-section.png";
import errorImage from "../assets/ErrorImage.png";

const HomePage = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [filters, setFilters] = useState({ type: "", location: "", size: "", price: 300000 });
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [loading, setLoading] = useState(true);
  const propertiesSectionRef = useRef(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const data = await fetchAllProperties();
        setTimeout(() => {
          setProperties(data);
          setFilteredProperties(data.slice(0, 9));
          setLoading(false);
        }, 100);
      } catch (error) {
        console.error("Error fetching properties:", error);
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handlePriceChange = (e) => {
    setFilters({ ...filters, price: Number(e.target.value) });
  };

  const handleSearch = () => {
    let filtered = properties;
    if (filters.type) filtered = filtered.filter((prop) => prop.type.toLowerCase().trim() === filters.type.toLowerCase().trim());
    if (filters.location) filtered = filtered.filter((prop) => prop.city.toLowerCase().trim() === filters.location.toLowerCase().trim());
    if (filters.size) filtered = filtered.filter((prop) => prop.size === filters.size);
    if (filters.price) filtered = filtered.filter((prop) => prop.price <= filters.price);
    setFilteredProperties(filtered.slice(0, 9));
    propertiesSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative w-full min-h-screen bg-white">
      {/* Hero Section */}
      <div
        className="relative flex flex-col justify-center items-center text-center text-white mt-18 py-32 px-6"
        style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center", height: "70vh" }}
      >
        <h2 className="text-4xl mb-5 text-gray-100 drop-shadow-md shadow stroke-1">
          <span className="text-white text-7xl font-bold">Brick & Beams</span>
          <br />
          Made Easy to<br />Buy & Sell Property
        </h2>
        <div className="bg-white bg-opacity-50 rounded-full p-4 mt-6 flex gap-4">
          <select name="type" className="py-2 px-4 font-semibold text-black rounded outline-none" onChange={handleFilterChange}>
            <option value="">Type</option>
            <option value="Home">Home</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
          </select>
          <select name="location" className="py-2 px-4 font-semibold text-black rounded outline-none" onChange={handleFilterChange}>
            <option value="">Location</option>
            <option value="Agra">Agra</option>
            <option value="Delhi">Delhi</option>
            <option value="Mumbai">Mumbai</option>
          </select>
          <select name="size" className="py-2 px-4 font-semibold text-black rounded outline-none" onChange={handleFilterChange}>
            <option value="">Size</option>
            <option value="1BHK">1 BHK</option>
            <option value="2BHK">2 BHK</option>
            <option value="3BHK">3 BHK</option>
          </select>

          {/* Price Range Slider */}
          <div className="flex flex-col items-center px-4">
            <label className="text-sm font-semibold text-gray-800">Max Price: ${filters.price.toLocaleString()}</label>
            <input
              type="range"
              name="price"
              min="100000"
              max="500000"
              step="10000"
              value={filters.price}
              onChange={handlePriceChange}
              className="w-full cursor-pointer"
            />
          </div>

          <button onClick={handleSearch} className="flex items-center space-x-2 font-semibold bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-full">
            <FaSearch className="text-lg" />
            <span>Search</span>
          </button>
        </div>
      </div>

      {/* Property Listings */}
      <div ref={propertiesSectionRef} className="max-w-7xl mx-auto p-6">
        <h2 className="text-4xl font-bold text-red-700 mb-6 text-center">Featured Properties</h2>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-red-700"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <Link to={`/property/${property._id}`} key={property._id} className="block transform transition hover:scale-105">
                  <div className="bg-white shadow-xl rounded-lg overflow-hidden hover:shadow-2xl transition duration-300">
                    <img
                      src={property.photos.length > 0 ? `http://localhost:5000/${property.photos[0]}` : errorImage}
                      alt={property.title}
                      className="w-full h-60 object-cover"
                    />
                    <div className="p-5">
                      <h3 className="text-2xl font-semibold text-gray-900">{property.title}</h3>
                      <p className="text-gray-600 text-sm mt-2">{property.description.slice(0, 80)}...</p>
                      <p className="text-green-600 font-bold text-lg">${property.price.toLocaleString()}</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-center text-gray-500">No properties found.</p>
            )}
          </div>
        )}
      </div>

      {/* Back to Top Button */}
      {showScrollButton && (
        <button onClick={scrollToTop} className="fixed bottom-8 right-8 bg-red-700 text-white p-3 rounded-full shadow-lg hover:bg-red-800 transition">
          <FaArrowUp className="text-lg" />
        </button>
      )}
    </div>
  );
};

export default HomePage;
