import axios from "axios";

const API_URL = "http://localhost:5000/api/properties"; // Base URL for properties

// Add a new property

export const addProperty = async (propertyData, token) => {
  try {
      const response = await axios.post(API_URL, propertyData, {
          headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
          },
      });
      return response.data;
  } catch (error) {
      throw error.response?.data?.message || "Property creation failed";
  }
};
// Get all properties
export const fetchAllProperties = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

// Get a property by ID
export const fetchPropertyById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

// Update a property
export const updateProperty = async (id, propertyData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, propertyData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

// Delete a property
export const deleteProperty = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};
