import axios from 'axios';
import { API_BASE_URL } from '../config/apiConfig';
import { jwtDecode } from 'jwt-decode';

export const summarizeText = async (text) => {
  try {
    // Send the request with the content in the body
    const response = await axios.post(`${API_BASE_URL}/summarize`, { content: text });

    // Log the content of the response
    console.log('response', response.data.summary);
    return response.data.summary; // return the summary text to the component


  } catch (error) {
    console.error('Error summarizing text:', error);
    throw new Error('Failed to summarize text.');
  }
};

export const clearJsonFile = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/clear`);
    console.log('JSON file cleared:', response.data);
  } catch (error) {
    console.error('Error clearing JSON file:', error);
    throw new Error('Failed to clear JSON file.');
  }
};

export const saveSummary = async (summary) => {
  try {
    // Get the access token from localStorage
    const token = localStorage.getItem('access_token');
    
    // If no token is found, throw an error
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    // Decode the token to get the user ID
    const decodedToken = jwtDecode(token);
    const user_id = decodedToken.user_id; // Adjust this based on your actual token structure
    
    const payload = {
      user_id: user_id, // Use the actual user ID from the token
      content: summary,
      image: "https://i.pinimg.com/736x/63/53/f2/6353f221e2a283a6af34e422b7429ce7.jpg", // Default image
    };

    // Send the payload to the backend
    const response = await axios.post(`${API_BASE_URL}/add-summary`, payload);
   
    return response.data; // Backend returns the saved summary object
  } catch (error) {
    console.error("Error saving summary:", error);
    throw new Error("Failed to save summary.");
  }
};

export const getSummaries = async () => {
  try {
    const token = localStorage.getItem("access_token");

    // If no token is found, throw an error
    if (!token) {
      throw new Error("No authentication token found");
    }

    // Decode the token to get the user ID
    const decodedToken = jwtDecode(token);
    const user_id = decodedToken.user_id; // Adjust based on your token's structure

    // Make the request to the backend, passing the user_id as a query parameter
    const response = await axios.get(`${API_BASE_URL}/get-summaries`, {
      params: { user_id },
    });
    console.log('response', response.data);
    
    return response.data;
  } catch (error) {
    console.error("Error fetching summaries:", error);
    throw new Error("Failed to fetch summaries.");
  }
};