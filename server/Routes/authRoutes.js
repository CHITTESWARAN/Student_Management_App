import express from "express";
import {login,logout,signup,checkAuth, createstudent, updatestudent, studentsList, deletestudent} from "../controllers/auth.controller.js"
import multer from "multer";
const upload = multer({ dest: 'uploads/' }); 

import { protectRoute } from "../Middleware/auth.middleware.js";
const router =express.Router()


router.post("/signup",signup)

router.post("/login",login)

router.post("/logout",logout)

router.get("/check",protectRoute,checkAuth) 



router.post("/create-student", protectRoute, upload.single('profilePicture'), createstudent);

router.post("/update-student/:id", protectRoute, upload.single('profilePicture'), updatestudent);
router.delete("/delete-student/:id", protectRoute, deletestudent);


router.get("/studentsList", studentsList);




export const authRoutes = router;
