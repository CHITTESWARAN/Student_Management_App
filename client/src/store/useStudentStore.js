import { create } from "zustand";

import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore.js";
import { axiosInstance } from "../lib/axios.js";


export const useStudentStore = create((set, get) => ({
  
  studentslists:[],
  selectedstd:null,
  
  CreateForm: async (formData) => {
    console.log(formData);
    
    const { updateid } = useAuthStore.getState();
    
    try {
      const url = updateid
        ? `/auth/update-student/${updateid._id}`
        : "/auth/create-student";

      const response = await axiosInstance.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(updateid ? "Student updated successfully!" : "Student created successfully!");
      set({ updateid: null });
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      toast.error("Error saving data");
    }
  },

  studentlist:async()=>{

    try{ 
      const response=await axiosInstance.get("/auth/studentsList")
      
      set({studentslists:response.data.data});
      set({selectedstd:response.data.data[0]});

    }
    catch(error)
    {
      console.log(error.message)
      toast.error("Faild to fetch the students")
    }

  },

  searchName: (searchQuery) => {
    const { studentslists } = get();
    
    const filteredStudents = studentslists.filter((student) =>
      student.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    set({ studentslists: filteredStudents });
  },

  handlestudentprofile:async(formdata)=>{
    set({selectedstd:formdata})

  }



}));
