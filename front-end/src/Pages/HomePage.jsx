import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaArrowUp } from "react-icons/fa";
import { fetchAllProperties } from "../services/propertyService";
import heroBg from "../assets/hero-section.png";
import errorImage from "../assets/ErrorImage.png";
import { FaShieldAlt, FaStar, FaLightbulb, FaEye, FaUsers } from "react-icons/fa";
import { BiArea } from "react-icons/bi";
import { RiRoadMapLine } from "react-icons/ri";
import { TbListDetails } from "react-icons/tb";


const HomePage = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [filters, setFilters] = useState({ type: "", location: "", size: "", price: 300000 });
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [loading, setLoading] = useState(true);
  const propertiesSectionRef = useRef(null);
  const [size, setSize] = useState(1);

  const values = [
    { title: "Integrity", desc: "Upholding the highest professional and ethical standards.", icon: <FaShieldAlt /> },
    { title: "Excellence", desc: "Delivering top-tier service in every interaction.", icon: <FaStar /> },
    { title: "Innovation", desc: "Utilizing the latest technology for better results.", icon: <FaLightbulb /> },
    { title: "Transparency", desc: "Keeping our clients informed every step of the way.", icon: <FaEye /> },
    { title: "Community", desc: "Actively contributing to the neighborhoods we serve.", icon: <FaUsers /> },
    { title: "Luxury", desc: "random content which needs to be changed later by developers.", icon: <FaStar /> }
  ];

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const data = await fetchAllProperties();
        setTimeout(() => {
          setProperties(data);
          setFilteredProperties(data.slice(0, 6));
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

  const handleSizeChange = (e) => {
    setFilters({ ...filters, size: Number(e.target.value) });
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
            <option value="Jaipur">Jaipur</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Pune">Pune</option>
            <option value="Gurgaon">Gurgaon</option>
          </select>

          {/* <div className="flex flex-col items-center px-4">
            <label className="text-sm font-semibold text-gray-800">Min Size: {filters.size.toLocaleString()} sq ft</label>
            <input
              type="range"
              name="size"
              min="500"
              max="5000"
              step="100"
              value={filters.size}
              onChange={handleSizeChange}
              className="w-full accent-red-700 cursor-pointer"
            />
          </div> */}
          {filters.type === "Apartment" ? (
          <select name="size" className="py-2 px-4 font-semibold text-black rounded outline-none" onChange={handleSizeChange}>
            <option value="">Select BHK</option>
            <option value="1BHK">1 BHK</option>
            <option value="2BHK">2 BHK</option>
            <option value="3BHK">3 BHK</option>
            <option value="4BHK">4 BHK</option>
          </select>
        ) : (
          <div className="flex flex-col items-center px-4">
            <label className="text-sm font-semibold text-gray-800">Min Size: {filters.size.toLocaleString()} sq ft</label>
            <input
              type="range"
              name="size"
              min="0"
              max="5000"
              step="100"
              value={filters.size}
              onChange={handleSizeChange}
              className="w-full accent-red-700 cursor-pointer"
            />
          </div>
        )}


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
              className="w-full accent-red-700 cursor-pointer"
            />
          </div>

          <button onClick={handleSearch} className="flex items-center space-x-2 font-semibold bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-full">
            <FaSearch className="text-lg" />
            <span>Search</span>
          </button>
        </div>
      </div>
      {/*About us*/}
      <div className="text-center mt-10 mb-10">
        <h2 className="text-4xl text-gray-600">Discover Your Perfect Space with Brick & Beams
          <br />Where Dreams Find Their Foundation
        </h2>
      </div>

      {/*Cards*/}
      <div className="max-w-4xl mx-auto mb-12">
        <h2 className="text-5xl font-semibold text-gray-900 mb-6 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <div key={index} className="relative overflow-hidden bg-white p-6 rounded-lg shadow-lg group">
              {/* Sliding Red Background Effect */}
              <div className="absolute inset-0 bg-red-700 transform translate-x-200 group-hover:translate-x-0 transition-transform duration-500"></div>

              {/* Icon inside Circle with 360° Rotation Effect */}
              <div className="relative flex flex-col items-center text-center">
                <div className="w-16 h-16 flex items-center justify-center rounded-full border-4 border-red-700 text-red-700 
                          group-hover:text-white group-hover:border-white transition-all duration-700 
                          transform group-hover:rotate-[360deg]">
                  {value.icon}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900 group-hover:text-white transition-colors duration-500">
                  {value.title}
                </h3>
                <p className="mt-2 text-gray-700 group-hover:text-white transition-colors duration-500">
                  {value.desc}
                </p>
              </div>
            </div>
          ))}
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
                <div className="block" key={property._id}>
                  <div className="relative bg-white shadow-xl rounded-lg overflow-hidden hover:shadow-2xl transition duration-300 group">

                    {/* Property Image */}
                    <img
                    src={
                      property.photos.length > 0
                        ? property.photos[0].startsWith("http")
                          ? property.photos[0] // Use directly if already a full URL
                          : `http://localhost:5000/uploads/${property.photos[0]}` // Add correct prefix
                        : errorImage
                    }
                    alt={property.title}
                    className="w-full h-60 object-cover hover:scale-105 transition-all"
                  />


                    {/* Property Details */}
                    <div className="p-5 relative">
                      
                      <h3 className="text-2xl mt-2 font-semibold text-gray-900 flex justify-between">${property.price.toLocaleString()} <h4 className="text-xl mt-1 text-red-700 flex"><BiArea className="w-7 h-7 text-red" /> {property.size}sqft</h4> </h3>
                      
                      <p className="mt-3 text-gray-600 font-semibold text-lg flex "><RiRoadMapLine className="w-7 h-7  mr-1"/>{property.city}</p>


                      {/* View Details Button (Hidden by default, appears on hover at bottom-right) */}
                      <Link to={`/property/${property._id}`} key={property._id} className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-semibold shadow-lg hover:bg-red-700 transition flex gap-2">
                          View Details <TbListDetails className="w-5 h-5"/>
                        </button>
                      </Link>
                    </div>

                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No properties found.</p>
            )}
          </div>
        )}
        <Link to={"/propertyPage"}><button className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-semibold shadow-lg mt-10 ml-130 hover:bg-white hover:scale-105 hover:shadow-2xl transition hover:text-red-700">View All Properties</button></Link>
      </div>

      {/* Back to Top Button */}
      {showScrollButton && (
        <button onClick={scrollToTop} className="animate-bounce fixed bottom-8 right-8 bg-red-700 text-white p-3 rounded-full shadow-lg hover:bg-red-800 transition">
          <FaArrowUp className="text-lg" />
        </button>
      )}
    </div>
  );
};

export default HomePage;
