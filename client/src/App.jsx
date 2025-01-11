import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import {useAuthStore} from "./store/useAuthStore.js"
import Homepage from './pages/Homepage'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import { Toaster } from 'react-hot-toast'

import { useStudentStore } from './store/useStudentStore.js'
import CreateForm from './pages/Createform.jsx'



const App = () => {
  const{authUser,checkAuth}=useAuthStore();
  const{studentlist}=useStudentStore();
  useEffect(()=>{
    checkAuth();
    studentlist();
  },[checkAuth])

  
  
  return (
   <>
     <Navbar></Navbar>
     <Routes>
        <Route path="/" element={authUser?<Homepage/>:<Navigate to="/signup"/>}/>
        <Route path="/signup" element={authUser?<Homepage/>:<SignupPage/>}/>
        <Route path="/login" element={!authUser?<LoginPage/>:<Homepage/>}/>
        <Route path="/logout" element={<LoginPage/>} />
        <Route path="/createform" element={<CreateForm/>} />
        
      </Routes>
      <Toaster/>
      </>
  )
}

export default App