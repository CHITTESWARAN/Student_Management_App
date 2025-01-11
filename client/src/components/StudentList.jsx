import React, { useEffect } from 'react';
import { useStudentStore } from '../store/useStudentStore';
import Profilepage from './Profilepage';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const StudentList = () => {
    const {handleUpdate,handleDelete }=useAuthStore();
  const { studentlist, studentslists, handlestudentprofile,selectedstd} = useStudentStore();
  const navigate=useNavigate();

  useEffect(() => {
    studentlist(); 
  },[studentlist]);

  const handleUpdates = async(id) => {
    
    
    await handleUpdate(id);
    navigate('/createform'); 
  };

  const handleDeleteid = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this student?");
    if (confirmed) {
      handleDelete(id);
    }
  };
  

  const handleselectStudent=async(studentdata)=>{

    handlestudentprofile(studentdata)
  }

  return (
    <div className="flex gap-12 w-full min-h-screen">
      

      <div className="flex flex-col gap-6 bg-gray-800 h-screen rounded-lg justify-start items-center shadow-lg shadow-gray-700 w-[40%] p-4">
        {studentslists && studentslists.length > 0 ? (
          studentslists.map((e, index) => (
            <div
              key={index}
              className="w-full h-12  bg-gray-900 text-yellow-500 border border-gray-700 rounded-md mb-4 flex justify-between  items-center hover:bg-yellow-500 hover:text-white transition-all cursor-pointer font-semibold transform hover:translate-x-2 "
              onClick={()=>handleselectStudent(e)}
            >
              <h1 className='font-semibold  flex-wrap p-2'>{index+1}. {e.fullName}</h1>

              <div  className=' flex gap-1 items-center p-2'>
              <button
                  className="p-1.5 bg-teal-500 text-white rounded-md"
                  onClick={() => handleUpdates(e)}
                >
                  Edit
                </button>
                <button
                  className="p-1.5 bg-red-500 text-white rounded-md ml-2"
                  onClick={() => handleDeleteid(e._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white">No students available</p>
        )}
      </div>

      
      <div className="flex-1">
        {selectedstd?(<Profilepage />):""}
      </div>
    </div>
  );
};

export default StudentList;
