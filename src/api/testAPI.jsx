import axios from "axios";
const API_URL = "http://localhost:5000/api/quiz/v1"; // Your backend URL
const token = localStorage.getItem("token");

export const getAllTests = async () => {
    try {
        console.log(token)
        const response = await axios.get(
            `${API_URL}/all`,
            {
                headers: {
                  Authorization: `Bearer ${token}`, // Ensure token is included
                  "Content-Type": "application/json",
                },
              }
        ); // Fetch all quizzes
        return response.data;
    } catch (error) {
        console.error("Error fetching tests:", error.response?.data || error.message);
        throw error;
    }
};

export const getTestById = async (testId) => {
    try {
        const response = await axios.get(`${API_URL}/${testId}`,
            {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`, // Attach token in headers
                },
              }
        ); // Fetch test by ID
        return response.data;
    } catch (error) {
        console.error("Error fetching test:", error.response?.data || error.message);
        throw error;
    }
};
