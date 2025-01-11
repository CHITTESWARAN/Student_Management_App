import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const BASE_URL = "http://localhost:5001";


export const useAuthStore = create((set, get) => ({
  authUser: null,
  updateid:null,
  isSigning: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  setUpdateId: (id) => set({ updateid: id }),
  

  // Signup function
  signup: async (userData) => {
    set({ isSigning: true });
    console.log(userData);
    
    try {
      const response = await axiosInstance.post(`/auth/signup`, userData);
      set({ authUser: response.data.username });
      if(response)
      {
        toast.success("Signup successful!");
      }
       
      
    } catch (error) {
      
      toast.error("Signup failed");
    } finally {
      set({ isSigning: false });
    } 
  },

  // Logout function
  logout: async () => { 
    
    try {
      await axiosInstance.post(`/auth/logout`);
      set({ authUser: null });
      toast.success("Logged out successfully!");
    
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out.");
    }
  },
 

  // Login function
  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const response = await axiosInstance.post(`/auth/login`, credentials);
      set({ authUser: response.data.user });
      toast.success("Login successful!");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  checkAuth:async()=>{
    try{
       
      const res = await axiosInstance.get("/auth/check", {
        withCredentials: true,
      });
      const user = res.data;
    set({ authUser: user });
      
         
    }
    catch(error)
    { console.log("Error in checkAuth:",error);
    
      set({authUser:null})
    }
    finally{
        set({isCheckingAuth:false})
    }
},

handleUpdate: (id) => {
  
  set({updateid:id}) 
  console.log("Updated id:", id);
},



 handleDelete: async (id) => {
  try {
    const response = await axiosInstance.delete(`/auth/delete-student/${id}`);
    toast.success("Student deleted successfully!");
   
  } catch (error) {
    console.log(error.message);
    toast.error("Failed to delete the student");
  }
},
}));
