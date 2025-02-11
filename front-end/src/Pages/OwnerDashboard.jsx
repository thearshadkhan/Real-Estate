// import React, { useEffect, useState } from "react";
// import { fetchOwnerProperties } from "../services/propertyService";
// import { useNavigate } from "react-router-dom";

// const OwnerDashboard = () => {
//   const [properties, setProperties] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const getProperties = async () => {
//       try {
//         const data = await fetchOwnerProperties();
//         setProperties(data);
//       } catch (error) {
//         console.error("Error fetching properties:", error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     getProperties();
//   }, []);

//   return (
//     <div className="mt-20 mb-10 max-w-7xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
//       {/* Header Section with Add Property Button */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">Your Listed Properties</h1>
//         <button
//           onClick={() => navigate("/properties")}
//           className="bg-red-700 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-800"
//         >
//           + Add Property
//         </button>
//       </div>

//       {/* Properties Grid */}
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {properties.length > 0 ? (
//           properties.map((property) => (
//             <div key={property._id} className="bg-white p-4 rounded-lg shadow-md">
//               <img
//                 src={`http://localhost:5000/${property.photos[0]}`}
//                 alt={property.title}
//                 className="w-full h-40 object-cover rounded-md mb-4"
//               />
//               <h3 className="text-xl font-semibold">{property.title}</h3>
//               <p className="text-gray-600">{property.city}</p>
//               <p className="text-gray-800 font-semibold">${property.price}</p>
//               <button
//                 onClick={() => navigate(`/details/${property._id}`)}
//                 className="mt-3 w-full bg-red-700 text-white py-2 rounded-lg hover:bg-red-800"
//               >
//                 View Details
//               </button>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500 text-center">You haven't added any properties yet.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OwnerDashboard;


import React, { useEffect, useState } from "react";
import { fetchOwnerProperties } from "../services/propertyService";
import { fetchOwnerMessages } from "../services/messageService"; // Import the function
import { useNavigate } from "react-router-dom";

const OwnerDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [messages, setMessages] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const propertiesData = await fetchOwnerProperties();
        setProperties(propertiesData);

        // Fetch messages for the owner
        const messagesData = await fetchOwnerMessages();
        setMessages(messagesData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    getData();
  }, []);

  return (
    <div className="mt-20 mb-10 max-w-7xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Listed Properties</h1>
        <button
          onClick={() => navigate("/properties")}
          className="bg-red-700 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-800"
        >
          + Add Property
        </button>
      </div>

      {/* Properties Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.length > 0 ? (
          properties.map((property) => (
            <div key={property._id} className="bg-white p-4 rounded-lg shadow-md">
              <img
                src={`http://localhost:5000/${property.photos[0]}`}
                alt={property.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold">{property.title}</h3>
              <p className="text-gray-600">{property.city}</p>
              <p className="text-gray-800 font-semibold">${property.price}</p>
              <button
                onClick={() => navigate(`/details/${property._id}`)}
                className="mt-3 w-full bg-red-700 text-white py-2 rounded-lg hover:bg-red-800"
              >
                View Details
              </button>

              {/* Messages Section */}
              {messages[property._id] && messages[property._id].length > 0 && (
                <div className="mt-4 p-3 bg-gray-200 rounded">
                  <h4 className="text-lg font-semibold">Messages:</h4>
                  {messages[property._id].map((msg) => (
                    <div key={msg._id} className="mt-2 p-2 bg-white rounded shadow">
                      <p className="font-semibold">{msg.sender} ({msg.email})</p>
                      <p>{msg.message}</p>
                      {/* <p className="text-sm text-gray-500">{new Date(msg.timestamp).toLocaleString()}</p> */}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">You haven't added any properties yet.</p>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;
