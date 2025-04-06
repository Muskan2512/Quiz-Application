import axios from "axios";
const API_URL = "http://localhost:5000/api/quiz/v1"; // Your backend URL
const token=localStorage.getItem("token")

export const createATest = async (title, numQuestions, questions ) => {
    try {
      // console.log("Inside frontend:",title, numQuestions, questions);
        const response = await axios.post(`${API_URL}/create`,{
          title:title, numQuestions:numQuestions, questions:questions,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Attach token in headers
          },
        }
);
        return response.data;
    } catch (error) {
        console.error("Error fetching tests:", error.response?.data || error.message);
        throw error;
    }
};