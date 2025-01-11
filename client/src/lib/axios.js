import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://student-management-app-backend-614k.onrender.com/api", 
    withCredentials: true,
});
