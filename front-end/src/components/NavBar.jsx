import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Import the context
import { fetchAllProperties } from "../services/propertyService";
import logo from "../assets/logo.png";
import { FaSearch } from "react-icons/fa";

const NavBar = () => {
  const { user, logout } = useContext(AuthContext); // Use context
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await fetchAllProperties();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    fetchProperties();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = properties.filter((prop) =>
        prop.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProperties(filtered);
    } else {
      setFilteredProperties([]);
    }
  }, [searchQuery, properties]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Determine the dashboard link based on user role
  const getDashboardLink = () => {
    if (user?.role === "admin") return "/dashboard";
    if (user?.role === "owner") return "/owner-Dashboard";
    if (user?.role === "user") return "/userDashboard";
    return "/";
  };

  return (
    <nav className="fixed top-0 w-9/10 bg-red-700 p-4 text-white flex flex-row justify-between ml-15 mt-2 z-10 rounded-full">
      <Link to="/">
        <h1 className="flex text-2xl font-bold px-4 py-2 rounded-full">
          <img src={logo} alt="Logo" className="w-7 h-7" /> Brick & Beams
        </h1>
      </Link>

      {/* Search Bar */}
      <div className="relative w-64 ml-20 mt-1">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white text-black pl-10 pr-4 py-2 rounded-full outline-none"
        />
        <FaSearch className="absolute cursor-pointer left-3 top-3 text-gray-800 text-lg" />
        {filteredProperties.length > 0 && (
          <div className="absolute bg-white text-black w-full mt-2 rounded shadow-lg z-10">
            {filteredProperties.slice(0, 5).map((prop) => (
              <Link
                key={prop._id}
                to={`/property/${prop._id}`}
                className="block px-4 py-2 hover:bg-gray-200"
                onClick={() => setSearchQuery("")}
              >
                {prop.title}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Right Section */}
      <div className="flex gap-4 items-center">
        <Link to="/propertyPage" className="px-4 py-2 font-bold rounded-full cursor-pointer hover:bg-white hover:text-black transition">
          Properties
        </Link>

        {user ? (
          <>
            <Link to={getDashboardLink()} className="px-4 py-2 font-bold rounded-full cursor-pointer hover:bg-white hover:text-black transition">
              Dashboard
            </Link>
            <button onClick={handleLogout} className="px-4 py-2 font-bold rounded-full cursor-pointer hover:bg-white hover:text-black transition">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="px-4 py-2 font-bold rounded-full cursor-pointer hover:bg-white hover:text-black transition">
              Login →
            </Link>
            <Link to="/register" className="px-4 py-2 font-bold rounded-full cursor-pointer hover:bg-white hover:text-black transition">
              Register →
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
