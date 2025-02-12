import React, { useEffect, useState } from "react";
import { fetchLikedProperties, fetchSavedProperties,toggleLikeProperty,toggleSaveProperty  } from "../services/propertyService"; // Add functions to fetch liked and saved properties
import PropertyCard from "../components/PropertyCard"; // A component to display property details
import { fetchUserMessages } from "../services/messageService";

const UserDashboard = () => {
  const [likedProperties, setLikedProperties] = useState([]);
  const [savedProperties, setSavedProperties] = useState([]);
  const [messages, setMessages] = useState([]); 
  const [error, setError] = useState("");

  useEffect(() => {
    const getLikedProperties = async () => {
      try {
        const likedData = await fetchLikedProperties();
        setLikedProperties(likedData);
      } catch (err) {
        setError("Failed to fetch liked properties.");
      }
    };
    const getSavedProperties = async () => {
      try {
        const savedData = await fetchSavedProperties();
        setSavedProperties(savedData);
      } catch (err) {
        setError("Failed to fetch saved properties.");
      }
    };
    getLikedProperties();
    getSavedProperties();
  }, []);

  // Handle Unlike
  const handleUnlike = async (id) => {
    try {
      await toggleLikeProperty(id);
      setLikedProperties(likedProperties.filter(property => property._id !== id));
    } catch (err) {
      setError("Failed to unlike the property.");
    }
  };


 // Handle Unsave
 const handleUnsave = async (id) => {
  try {
    await toggleSaveProperty(id);
    setSavedProperties(savedProperties.filter(property => property._id !== id));
  } catch (err) {
    setError("Failed to unsave the property.");
  }
};

// useEffect(() => {
//   const getMessages = async () => {
//     try {
//       const messagesData = await fetchUserMessages();
//       if (Array.isArray(messagesData)) {
//         setMessages(messagesData);
//       } else {
//         setMessages([]); // Ensure messages is always an array
//       }
//     } catch (err) {
//       setError("Failed to fetch messages.");
//     }
//   };
//   getMessages();
// }, []);
useEffect(() => {
  const getMessages = async () => {
    try {
      const messagesData = await fetchUserMessages();
      setMessages(Array.isArray(messagesData) ? messagesData : []);
    } catch (err) {
      setError("Failed to fetch messages.");
    }
  };
  getMessages();
}, []);
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="mt-20 max-w-7xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6">user Dashboard</h1>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Liked Properties</h2>
        {likedProperties.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {likedProperties.map((property) => (
              <PropertyCard key={property._id} property={property}  onUnlike={() => handleUnlike(property._id)}/>
            ))}
          </div>
        ) : (
          <p>No liked properties yet.</p>
        )}
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Saved Properties</h2>
        {savedProperties.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedProperties.map((property) => (
              <PropertyCard key={property._id} property={property} onUnsave={() => handleUnsave(property._id)}/>
            ))}
            
          </div>
        ) : (
          <p>No saved properties yet.</p>
        )}
      </div>
      {/* <div className="mt-20 max-w-7xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6">User Messages</h1>

      {messages.length > 0 ? (
        <ul>
          {messages.map((msg) => (
            <li key={msg._id} className="bg-white p-4 mb-3 shadow rounded">
              <p><strong>Property:</strong> {msg.propertyId?.title || "Unknown"}</p>
              <p><strong>Message:</strong> {msg.message}</p>
              {msg.replies?.length > 0 && (
                <div className="mt-2">
                  <strong>Replies:</strong>
                  <ul className="ml-4 mt-1">
                    {msg.replies.map((reply) => (
                      <li key={reply._id} className="text-gray-700">
                        - {reply.message}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No messages found.</p>
      )}
    </div> */}
    <div className="mt-20 max-w-7xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6">User Messages</h1>

      {messages.length > 0 ? (
        <ul>
          {messages.map((msg) => (
            <li key={msg._id} className="bg-white p-4 mb-3 shadow rounded">
              <p><strong>Property:</strong> {msg.propertyId?.title || "Unknown"}</p>
              <p><strong>Your Message:</strong> {msg.message}</p>

              {msg.replies?.length > 0 && (
                <div className="mt-2 bg-gray-200 p-3 rounded">
                  <strong>Owner Replies:</strong>
                  <ul className="ml-4 mt-1">
                    {msg.replies.map((reply, index) => (
                      <li key={index} className="text-gray-700">
                        - {reply.message} <span className="text-sm text-gray-500">({new Date(reply.createdAt).toLocaleString()})</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No messages found.</p>
      )}
    </div>
    </div>
  );
};

export default UserDashboard;



