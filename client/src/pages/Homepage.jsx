import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentList from '../components/StudentList';
import Graph from '../components/Graph';
import { useStudentStore} from '../store/useStudentStore';

const Homepage = () => {
  const [studentList, setStudentsList] = useState(false);
  const{studentslists,searchName}=useStudentStore()
  const navigate = useNavigate();
  
  
  
  const handleForm = () => {
    navigate("/createform");
  };

  const toggleStudentList = () => {
    setStudentsList((prev) => !prev);
  };
  const searchNamew = (e) => {
    searchName(e.target.value); 
  };

  return (
    <div className="flex flex-col gap-8 md:gap-16 w-full h-auto overflow-hidden  p-4 bg-gray-950">
      <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-16">
        
        <div
          className="w-full sm:w-[45%] md:w-[20%] min-h-20 shadow-md shadow-slate-300 cursor-pointer rounded-lg bg-blue-800 flex items-center justify-center p-4"
          onClick={handleForm}
        >
          <p className="text-white font-semibold text-center">Create Student</p>
        </div>

       
        <div
          className="w-full sm:w-[45%] md:w-[20%] min-h-20 shadow-md shadow-slate-300 rounded-lg bg-green-700 flex cursor-pointer items-center justify-center p-4"
          onClick={toggleStudentList}
        >
          <p className="text-white font-semibold text-center">Student List</p>
        </div>

        
        <div
          className="w-full sm:w-[45%] md:w-[20%] min-h-20 shadow-md shadow-slate-300 rounded-lg bg-purple-700 flex cursor-pointer items-center justify-center p-4"
          onClick={toggleStudentList}
        >
          <p className="text-white font-semibold text-center">Student year Graph</p>
        </div>
      </div>

      <div className="w-full flex-col rounded-md flex gap-2 justify-center min-h-screen mt-4">
        {studentList?(<div>
          <input type="text" className=' w-32 h-8 p-2 items-center'   onChange={searchNamew} placeholder=' search ' />
        </div>):""}
        {studentList ? <StudentList   />:<Graph studentData={studentslists} />}
      </div>
    </div>
  );
};

export default Homepage;
