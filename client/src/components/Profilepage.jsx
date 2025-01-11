import { Camera, Mail, User, Calendar, Phone, Home, UserCheck } from 'lucide-react';
import React from 'react';
import { useStudentStore } from '../store/useStudentStore';

const ProfilePage = () => {
  const { selectedstd } = useStudentStore();

  return (
    <div className="bg-gray-800 min-h-screen w-full py-10 rounded-md shadow-md shadow-slate-500">
      <div className="w-[80%] m-auto bg-gray-900 shadow-lg p-8 rounded-xl">
        {/* Profile Header */}
        <div className="flex flex-col bg-gray-900 items-center text-center text-gold gap-4 mb-8">
          <h1 className="font-bold mt-2 text-4xl text-yellow-700">Profile</h1>
          <h3 className="text-md text-yellow-700">Your profile information</h3>
        </div>

       
        <div className="flex flex-col items-center gap-4 mb-10">
          <div className="relative h-32 w-32 border-4 border-white rounded-full overflow-hidden">
            <input
              id="Image"
              accept="image/*"
              title="Click to upload a photo"
              className="hidden"
            />
            <img
              src={selectedstd.profilePicture || "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        
        <div className="p-6 rounded-lg text-gold space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           
            <div>
              <label className="flex items-center mb-2 gap-2 text-white text-sm font-medium">
                <User className="h-5 w-5" />
                Full Name
              </label>
              <input
                type="text"
                value={selectedstd.fullName}
                className="w-full text-start bg-gray-800 h-12 p-3 border-2 rounded-md text-yellow-700"
                disabled
              />
            </div>

           
            <div>
              <label className="flex items-center mb-2 gap-2 text-white text-sm font-medium">
                <Calendar className="h-5 w-5" />
                Date of Birth
              </label>
              <input
                type="text"
                value={selectedstd.dob}
                className="w-full text-start bg-gray-800 h-12 p-3 border-2 rounded-md text-yellow-700"
                disabled
              />
            </div>

          
            <div>
              <label className="flex items-center mb-2 gap-2 text-white text-sm font-medium">
                <UserCheck className="h-5 w-5" />
                Gender
              </label>
              <input
                type="text"
                value={selectedstd.gender}
                className="w-full text-start bg-gray-800 h-12 p-3 border-2 rounded-md text-yellow-700"
                disabled
              />
            </div>

           
            <div>
              <label className="flex items-center gap-2 mb-2 text-white text-sm font-medium">
                <Mail className="h-5 w-5" />
                Email Address
              </label>
              <input
                type="text"
                value={selectedstd.email}
                className="w-full text-start bg-gray-800 h-12 p-3 border-2 rounded-md text-yellow-700"
                disabled
              />
            </div>

           
            <div>
              <label className="flex items-center gap-2 mb-2 text-white text-sm font-medium">
                <Phone className="h-5 w-5" />
                Phone Number
              </label>
              <input
                type="text"
                value={selectedstd.phone}
                className="w-full text-start bg-gray-800 h-12 p-3 border-2 rounded-md text-yellow-700"
                disabled
              />
            </div>

           
            <div>
              <label className="flex items-center gap-2 mb-2 text-white text-sm font-medium">
                <Home className="h-5 w-5" />
                Address
              </label>
              <input
                type="text"
                value={selectedstd.address}
                className="w-full text-start bg-gray-800 h-12 p-3 border-2 rounded-md text-yellow-700"
                disabled
              />
            </div>

           
            <div>
              <label className="flex items-center gap-2 mb-2 text-white text-sm font-medium">
                <UserCheck className="h-5 w-5" />
                Student Class
              </label>
              <input
                type="text"
                value={selectedstd.studentClass}
                className="w-full text-start bg-gray-800 h-12 p-3 border-2 rounded-md text-yellow-700"
                disabled
              />
            </div>

          
            <div>
              <label className="flex items-center gap-2 mb-2 text-white text-sm font-medium">
                <UserCheck className="h-5 w-5" />
                Roll Number
              </label>
              <input
                type="text"
                value={selectedstd.rollNumber}
                className="w-full text-start bg-gray-800 h-12 p-3 border-2 rounded-md text-yellow-700"
                disabled
              />
            </div>

           
            <div>
              <label className="flex items-center gap-2 mb-2 text-white text-sm font-medium">
                <User className="h-5 w-5" />
                Guardian Name
              </label>
              <input
                type="text"
                value={selectedstd.guardianName}
                className="w-full text-start bg-gray-800 h-12 p-3 border-2 rounded-md text-yellow-700"
                disabled
              />
            </div>

            
            <div>
              <label className="flex items-center gap-2 mb-2 text-white text-sm font-medium">
                <Calendar className="h-5 w-5" />
                Year
              </label>
              <input
                type="text"
                value={selectedstd.year}
                className="w-full text-start bg-gray-800 h-12 p-3 border-2 rounded-md text-yellow-700"
                disabled
              />
            </div>
          </div>
        </div>

       
        <div className="mt-10 text-yellow-700 p-6 rounded-b-lg text-gold">
          <h1 className="font-bold text-xl mb-6 text-gold">Account Information</h1>

         
          <div className="flex justify-between">
            <h2 className="text-md">Account Status</h2>
            <h2 className="text-md text-green-500">Active</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

