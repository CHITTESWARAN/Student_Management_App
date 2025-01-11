import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" 
    ? "http://student-management-app-ashen.vercel.app/api" 
    : "api", 
  withCredentials: true,
});
