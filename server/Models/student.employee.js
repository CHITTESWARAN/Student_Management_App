import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
       },
    dob: {
      type: String,
      required: true,
 },
     gender: {
      type: String,
     required: true,
   },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String, 
     required: true,
      minlength: 10,
    },
    address: {
      type: String,
      required: true,
    },
     studentClass: {
      type: String,
    },
    rollNumber: {
      type: String,
      unique: true,
    },
    guardianName: {
      type: String,
      required: true,
    },
   year: {
      required: true,
      type: String,
    },
    profilePicture: {
           type: String,
      required: true,
    },
    
  },
  {
    timestamps: true,
  }
);

const students=mongoose.model("Students",userSchema)
export default students;

