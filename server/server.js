import express from "express";
import {authRoutes} from "./Routes/authRoutes.js"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./lib/db.js";
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';

dotenv.config();






const PORT=process.env.PORT;
const app = express();

app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? 'https://student-management-app-1-frontend.onrender.com'
    : 'http://localhost:5173', 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth",authRoutes);




app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
});
