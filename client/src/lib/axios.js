import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" 
        ? "http://localhost:5001/api" 
        : "https://student-management-app-japo.onrender.com/api",
    withCredentials: true,
});
