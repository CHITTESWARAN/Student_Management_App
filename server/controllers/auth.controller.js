
import path from "path";
import fs from "fs";
import multer from "multer"
import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js"
import students from "../Models/student.employee.js";
import User from "../Models/user.model.js"
import bcrypt from "bcryptjs"
import upload from "../lib/multer.js";
export const signup = async (req, res) => {
    const { username, email, password, phone, address } = req.body;
    console.log(username,email,password,phone,address);
    
  
    try {
     
      if (!username|| !email || !password || !phone || !address) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
     
      const user = await User.findOne({ $or: [{ email }, { phone }] });
      if (user) { 
        return res.status(400).json({ message: "Email or phone already exists" });
      }
  
     
      if (password.length < 6) {
        return res.status(400).json({ message: "Password must be greater than 6 characters" });
      }
  
     
      const hashedPassword = await bcrypt.hash(password, 10);
  
      
      const newUser = new User({
        username,
        email,
        phone,
        address,
        password: hashedPassword
      });
  
      
      await newUser.save();
  
      
      const token = generateToken(newUser._id);
      res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true,
      });
      
      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        phone: newUser.phone,
        token: token 
      });

  
 
      
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Something went wrong, please try again later" });
    }
  };


 

export const login=async(req,res)=>{
    const {email,password}=req.body;

    try{
        if(!email ||!password)
        {
            return res.status(400).json({message:"Please Enter the valid Details"})
        }

        const user= await User.findOne({email});
        if(!user)
        {
            return res.status(400).json({message:"User not found"})
        }
        const passwordverify = await bcrypt.compare(password, user.password);


       if(!passwordverify)
       {
         return res.status(400).json({message:"Please Enter the Valid Password"})
       }
    
       const token=generateToken(user._id)
       res.cookie("jwt",token,{
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true,
      });

      res.status(201).json({message:"Login successful"})

    }
    catch(error)
    {
       return res.status(400).json({message:"Internal server a Error"}) 
    }
}

export const logout=async(req,res)=>{
   
    try{
         res.cookie("jwt","",{maxAge:0})
         return res.status(201).json({message:"Logout successful"})
    }
    catch(error)
    {
         res.status(400).json({message:"Internal error in the  the logout"})
    }
}


export const checkAuth=async(req,res)=>{
    try{
      res.status(200).json(req.user);
    }
    catch(error)
    {
      console.log("Error in CheckAuth controller",error.message)
  res.status(500).json({message:"Internal server Error"})  
    }
}



export const createstudent = async (req, res) => {
  const { fullName, dob, gender, email, phone, address, studentClass, rollNumber, guardianName, year } = req.body;
  
  // Ensure the file is provided
  const profilePicture = req.file;
  if (!profilePicture) {
    return res.status(400).json('Profile picture is required');
  }

 
  

    try {
      // Upload the file to Cloudinary
      const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, {
        folder: 'students_profiles', // Optional: Specify the folder name on Cloudinary
        public_id: `${Date.now()}-${req.file.originalname}`, // Use timestamp to ensure a unique filename
      });

      // Now, save the student data in the database, including the Cloudinary URL
      const newStudent = new students({
        fullName,
        dob,
        gender,
        email,
        phone,
        address,
        studentClass,
        rollNumber,
        guardianName,
        year,
        profilePicture: cloudinaryResponse.secure_url, 
      });

     
      await newStudent.save();

      
      fs.unlinkSync(req.file.path); 

     
      res.status(201).json({
        message: "Student profile created successfully",
        data: newStudent
      });

    } catch (error) {
      console.error("Error creating student:", error.message);
      return res.status(500).json({ message: "Error creating student" });
    };
  
};

export const updatestudent = async (req, res) => {
  const {fullName,dob,gender,email,phone,address,studentClass,rollNumber,guardianName,year} = req.body;

  const studentId = req.params.id; // Assuming the student's ID is passed as a parameter

  try {
    // Find the existing student record
    const existingStudent = await students.findById(studentId);
    if (!existingStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    let updatedProfilePicture = existingStudent.profilePicture; // Keep the current profile picture if no new one is uploaded

    if (req.file && req.file.path) {
      // If a new profile picture is uploaded, upload it to Cloudinary

      const publicId = existingStudent.profilePicture.split('/').pop().split('.')[0];

      const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, {
        folder: "students_profiles", // Specify the folder name on Cloudinary
        public_id: `${Date.now()}-${req.file.originalname}`, // Unique filename
      });

      updatedProfilePicture = cloudinaryResponse.secure_url;
      
      try {
        const destroyResponse = await cloudinary.uploader.destroy(publicId);
        console.log("Cloudinary destroy response:", destroyResponse);
      } catch (error) {
        console.error("Error deleting old profile picture from Cloudinary:", error.message);
      }
     
      fs.unlinkSync(req.file.path); // Delete the temporary local file
    }

    // Update the student's data
    const updatedStudent = await students.findByIdAndUpdate(
      studentId,
      {fullName,dob,gender,email,phone,address,studentClass,rollNumber,guardianName,year,profilePicture: updatedProfilePicture,},
      { new: true } 
    );

    res.status(200).json({
      message: "Student updated successfully",
      data: updatedStudent,
    });
  } catch (error) {
    console.error("Error updating student:", error.message);
    res.status(500).json({ message: "Error updating student" });
  }
};

export const studentsList = async (req, res) => {
  try {
    const studentRecords = await students.find({}); // Renamed variable to avoid conflict

    res.status(200).json({
      success: true,
      data: studentRecords,
      message: "Students retrieved successfully",
    });
  } catch (error) {
    console.error("Error retrieving students:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve students. Please try again later.",
    });
  }
};
export const deletestudent=async (req,res)=>{
  const {id}=req.params;
  try{
    const response=await students.findByIdAndDelete(id);
    res.status(200).json({message:"Student deleted a successfull"})
  }
  catch(error)
  {   console.error("Error deleting student:", error.message);
    res.status(400).json({ message: "Failed to delete student" })
  }
};
