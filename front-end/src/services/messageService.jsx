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

// Fetch messages for the logged-in owner
export const fetchOwnerMessages = async () => {
  try {
      const token = localStorage.getItem("token"); // Retrieve token from storage
      if (!token) throw new Error("User not authenticated");

      const response = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true, // Include credentials if using cookies
      });

      return response.data; // Returns grouped messages by propertyId
  } catch (error) {
      console.error("Error fetching messages:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Error fetching messages");
  }
};


// 🔹 Send a Message to Property Owner
export const sendMessage = async (propertyId, message, token) => {
    try {
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
  

// 🔹 Reply to a Message
export const replyToMessage = async (messageId, replyMessage, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/reply/${messageId}`,
      { replyMessage },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};
