import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import {LogOut,User } from 'lucide-react'


const Navbar = () => {
    const {logout,authUser}=useAuthStore()
    const navigate = useNavigate();

    const handleLogout = async () => {
      await logout(); 
      navigate("/login"); 
    };


    
  return (
   <div className="flex  justify-between bg-slate-950 text-white shadow-slate-300">


       <Link to={"/"} className='flex items-center gap-2.5  hover:opacity-80 transition-all'>
      <div className='logo flex p-2 gap-0.5'>
       
        <div className='bg-[white]  flex items-center justify-center rounded-full bg-opacity-15 h-8 w-8'>
         <h1>S</h1>
       </div>
        <h1 className='text-lg font-bold '>SKV School</h1>

      </div>
      </Link>

      

      <div className='flex items-center justify-center gap-2 p-2'>
      
        
        {authUser?(
        <div className='flex justify-center gap-2 items-center'>
          
          
          <div className='flex gap-2'>
           <User className="w-5 h-5"></User>
           <span className='hidden sm:inline'>{authUser.username}</span>
          </div>
          
          
          
          <button onClick={handleLogout} className='flex gap-2 '>
           <LogOut className="w-5 h-5"></LogOut>
           <span className='hidden sm:inline'>Logout</span>
          </button>
        
        </div> ):""}

      </div>
    </div>
  )
}

export default Navbar