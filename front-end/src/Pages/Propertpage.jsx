import React, { useEffect, useState } from "react";
import { fetchAllProperties } from "../services/propertyService";
import { Link } from "react-router-dom";
import errorImage from "../assets/ErrorImage.png";
import LandscapeCard from '../components/LandscapeCard'

const PropertyPage = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 9;

  const [filters, setFilters] = useState({
    type: "",
    location: "",
    size: 0,
    price: 0,
  });

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const data = await fetchAllProperties();
        const approvedProperties = data.filter(
          (property) => property.approvalStatus === "approved"
        );
  
        setTimeout(() => {
          setProperties(approvedProperties);
          setFilteredProperties(approvedProperties);
          setLoading(false);
        }, 300); // 1-second delay
      } catch (err) {
        setTimeout(() => {
          setError(err.message);
          setLoading(false);
        }, 1000);
      }
    };
  
    fetchProperties();
  }, []);
  

  useEffect(() => {
    let filtered = properties;
    if (filters.type) {
      filtered = filtered.filter(
        (prop) => prop.type.toLowerCase() === filters.type.toLowerCase()
      );
    }
    if (filters.location) {
      filtered = filtered.filter(
        (prop) => prop.city.toLowerCase() === filters.location.toLowerCase()
      );
    }
    if (filters.size > 0) {
      filtered = filtered.filter((prop) => prop.size >= filters.size);
    }
    if (filters.price > 0) {
      filtered = filtered.filter((prop) => prop.price <= filters.price);
    }
    setFilteredProperties(filtered);
    setCurrentPage(1);
  }, [filters, properties]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePriceChange = (e) => {
    setFilters({ ...filters, price: Number(e.target.value) });
  };

  const handleSizeChange = (e) => {
    setFilters({ ...filters, size: Number(e.target.value) });
  };

  const handleResetFilters = () => {
    setFilters({
      type: "",
      location: "",
      size: 0,
      price: 0,
    });
    setFilteredProperties(properties);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  return (
    <div className="max-w-7xl mx-auto mt-20 p-6">
      <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        Property Listings
      </h2>

      {error && (
        <p className="text-red-600 bg-red-100 border border-red-400 px-4 py-2 rounded-md mb-4 text-center">
          Error: {error}
        </p>
      )}

      <div className="bg-white shadow-xl p-6 rounded-2xl flex flex-wrap gap-6 justify-center items-center border border-gray-200">
        {/* Property Type */}
        <div className="flex flex-col">
          <select
            name="type"
            className="p-3 rounded-lg bg-white transition cursor-pointer outline-none"
            onChange={handleFilterChange}
            value={filters.type}
          >
            <option value="">All Types</option>
            <option value="Home">Home</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
          </select>
        </div>

        {/* Location Filter */}
        <div className="flex flex-col">
          <select
            name="location"
            className="p-3 rounded-lg bg-white transition cursor-pointer outline-none"
            onChange={handleFilterChange}
            value={filters.location}
          >
            <option value="">All Locations</option>
            <option value="Agra">Agra</option>
            <option value="Delhi">Delhi</option>
            <option value="Mumbai">Mumbai</option>
          </select>
        </div>

        {/* Size Range */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold">Min Size: <span className="font-semibold text-red-700">{filters.size} sq ft</span></label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              name="size"
              min="500"
              max="5000"
              step="100"
              value={filters.size}
              onChange={handleSizeChange}
              className="w-40 accent-red-700"
            />
          </div>
        </div>

        {/* Price Range */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold">Max Price: <span className="font-semibold text-green-700">${filters.price}</span></label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              name="price"
              min="50000"
              max="1000000"
              step="50000"
              value={filters.price}
              onChange={handlePriceChange}
              className="w-40 accent-red-700"
            />
          </div>
        </div>

        {/* Reset Filters Button */}
        <button
          onClick={handleResetFilters}
          className="px-6 py-2 bg-red-700 text-white font-semibold rounded-lg hover:bg-red-800 shadow-md transition transform hover:scale-105"
        >
          Reset values
        </button>
      </div>


      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-red-700"></div>
        </div>
      ) : (
        <div>
          {/* <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProperties.length > 0 ? (
              currentProperties.map((property) => (
                <Link
                  to={`/property/${property._id}`}
                  key={property._id}
                  className="block transform transition hover:scale-105"
                >
                  <div className="bg-white shadow-xl rounded-lg overflow-hidden hover:shadow-2xl transition duration-300">
                    {property.photos.length > 0 ? (
                      <img
                        src={`http://localhost:5000/${property.photos[0]}`}
                        alt={property.title}
                        className="w-full h-60 object-cover"
                      />
                    ) : (
                      <img
                        src={errorImage}
                        alt={property.title}
                        className="w-full h-60 object-cover"
                      />
                    )}
                    <div className="p-5">
                      <h3 className="text-2xl font-semibold text-gray-900">
                        {property.title}
                      </h3>
                      <p className="text-gray-600 text-sm mt-2">
                        {property.description.slice(0, 80)}...
                      </p>
                      <div className="mt-4 space-y-2">
                        <p className="text-gray-700 font-medium">
                          <span className="font-bold">Type:</span> {property.type}
                        </p>
                        <p className="text-gray-700 font-medium">
                          <span className="font-bold">City:</span> {property.city}
                        </p>
                        <p className="text-gray-700 font-medium">
                          <span className="font-bold">Size:</span> {property.size} sq ft
                        </p>
                        <p className="text-green-600 font-bold text-lg">
                          ${property.price}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-center text-gray-500">No properties found.</p>
            )}
          </div> */}
          <div>
          {/* <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6"> */}
            {currentProperties.length > 0 ? (
              currentProperties.map((property) => (
                <Link
                  to={`/property/${property._id}`}
                  key={property._id}
                  className="transform transition"
                >
                <LandscapeCard
                  key={property._id}
                  property={property}
                /></Link>
              ))
            ) : (
              <p className="text-center text-gray-500">No properties found.</p>
            )}
          {/* </div> */}

          {/* Pagination */}
          {/* <div className="flex justify-center mt-6">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`mx-1 px-4 py-2 rounded ${
                  currentPage === i + 1 ? "bg-red-600 text-white" : "bg-gray-200"
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div> */}
        </div>  
          {/* Pagination */}
          <div className="flex justify-center mt-6">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`mx-1 px-4 py-2 rounded ${currentPage === i + 1 ? "bg-red-600 text-white" : "bg-gray-200"
                  }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyPage;



// import React, { useEffect, useState } from "react";
// import { fetchAllProperties } from "../services/propertyService";
// import LandscapeCard from "../components/LandscapeCard";

// const PropertyPage = () => {
//   const [properties, setProperties] = useState([]);
//   const [filteredProperties, setFilteredProperties] = useState([]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const propertiesPerPage = 9;

//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         setLoading(true);
//         const data = await fetchAllProperties();
//         const approvedProperties = data.filter(
//           (property) => property.approvalStatus === "approved"
//         );
//         setProperties(approvedProperties);
//         setFilteredProperties(approvedProperties);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };
//     fetchProperties();
//   }, []);

//   const indexOfLastProperty = currentPage * propertiesPerPage;
//   const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
//   const currentProperties = filteredProperties.slice(
//     indexOfFirstProperty,
//     indexOfLastProperty
//   );

//   const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

//   return (
//     <div className="max-w-7xl mx-auto mt-20 p-6">
//       <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
//         Property Listings
//       </h2>

//       {error && (
//         <p className="text-red-600 bg-red-100 border border-red-400 px-4 py-2 rounded-md mb-4 text-center">
//           Error: {error}
//         </p>
//       )}

//       {loading ? (
//         <div className="flex justify-center items-center h-40">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-red-700"></div>
//         </div>
//       ) : (
//         <div>
//           {/* <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6"> */}
//             {currentProperties.length > 0 ? (
//               currentProperties.map((property) => (
//                 <LandscapeCard
//                   key={property._id}
//                   property={property}
//                 />
//               ))
//             ) : (
//               <p className="text-center text-gray-500">No properties found.</p>
//             )}
//           {/* </div> */}

//           {/* Pagination */}
//           <div className="flex justify-center mt-6">
//             {Array.from({ length: totalPages }, (_, i) => (
//               <button
//                 key={i}
//                 className={`mx-1 px-4 py-2 rounded ${
//                   currentPage === i + 1 ? "bg-red-600 text-white" : "bg-gray-200"
//                 }`}
//                 onClick={() => setCurrentPage(i + 1)}
//               >
//                 {i + 1}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PropertyPage;
