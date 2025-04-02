import axios from "axios";

const API_URL = "http://localhost:5000/api/score/v1"; 

const token = localStorage.getItem("token");
export const setUserScore = async (userId, testId, score) => {
  try {
    // console.log(userId,testId,score);
const response = await axios.post(`${API_URL}/store`,{
    userId: userId,
    testId: testId,
    score: score,
  },
  {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Attach token in headers
    },
  }
);

    return response.data; // Return the server response
  } catch (error) {
    console.error("Error setting user score:", error);
    throw error;
  }
};
