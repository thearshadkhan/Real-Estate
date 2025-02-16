import axios from "axios";

const API_URL = "http://localhost:5000/api/messages";


// 🔹 Fetch Messages for Property Owner
export const fetchMessages = async (token) => {
  try {
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};


// 🔹 Send a Message to Property Owner
export const sendMessage = async (propertyId, message, token) => {
    try {
      const token = localStorage.getItem("token");
      console.log("Sending Message:", { propertyId, message }); // Debug log
      const response = await axios.post(
        API_URL,
        { propertyId, message },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      console.error("Message Error:", error.response?.data || error.message);
      throw error.response?.data?.message || error.message;
    }
  };
  


// Fetch messages for owner's properties
export const fetchOwnerMessages = async () => {
  try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User not authenticated");

      const response = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
      });

      return response.data; // Returns messages grouped by propertyId
  } catch (error) {
      console.error("Error fetching messages:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Error fetching messages");
  }
};

// Reply to a message
export const replyToMessage = async (messageId, replyMessage) => {
  try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User not authenticated");

      const response = await axios.post(
          `${API_URL}/reply/${messageId}`,
          { replyMessage },
          {
              headers: { Authorization: `Bearer ${token}` },
              withCredentials: true,
          }
      );

      return response.data;
  } catch (error) {
      console.error("Error sending reply:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Error sending reply");
  }
};


export const fetchUserMessages = async () => {
  try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/user`, {
          headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
  } catch (error) {
      console.error("Error fetching messages:", error.response?.data?.message || error.message);
      return [];
  }
};

export const fetchReplies = async (messageId) => {
  try {
      const token = localStorage.getItem("token");
      console.log(`Fetching replies from: ${API_URL}/replies/${messageId}`);

      const response = await axios.get(`${API_URL}/replies/${messageId}`, {
          headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
  } catch (error) {
      console.error("Error fetching replies:", error.response?.data?.message || error.message);
      return [];
  }
};


// {messages.length > 0 ? (
//   <ul>
//     {messages.map((msg) => (
//       <li key={msg._id} className="bg-white p-4 mb-3 shadow rounded">
//         <p><strong>Property:</strong> {msg.propertyId?.title || "Unknown"}</p>
//         <p><strong>Your Message:</strong> {msg.message}</p>

//         {msg.replies?.length > 0 && (
//           <div className="mt-2 bg-gray-200 p-3 rounded">
//             <strong>Owner Replies:</strong>
//             <ul className="ml-4 mt-1">
//               {msg.replies.map((reply, index) => (
//                 <li key={index} className="text-gray-700">
//                   - {reply.message} <span className="text-sm text-gray-500">({new Date(reply.createdAt).toLocaleString()})</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </li>
//     ))}
//   </ul>
// ) : (
//   <p>No messages found.</p>
// )}