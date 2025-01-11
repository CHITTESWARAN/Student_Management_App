import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';
import { useStudentStore } from '../store/useStudentStore';

const CreateForm = () => {
    const {CreateForm}=useStudentStore()
  const { updateid} = useAuthStore();
  console.log(updateid);
  

  // State variables for form fields
  const [id, setId] = useState('');
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [year, setYear] = useState('');
  const [photo, setPhoto] = useState(null);

  const navigate = useNavigate();

  // Populate the form fields if updating
  useEffect(() => {
    if (updateid) {
      setId(updateid._id);
      setFullName(updateid.fullName);
      setDob(updateid.dob);
      setGender(updateid.gender);
      setEmail(updateid.email);
      setPhone(updateid.phone);
      setAddress(updateid.address);
      setStudentClass(updateid.studentClass);
      setRollNumber(updateid.rollNumber);
      setGuardianName(updateid.guardianName);
      setYear(updateid.year);
      setPhoto(updateid?.profilePicture|| null);
    }
  }, [updateid]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!fullName || !dob || !email || !phone || !gender || !studentClass || !rollNumber || !year) {
      toast.error('Please fill in all required fields.');
      return;
    }

    // Prepare data for submission
    const formData = new FormData();
    formData.append('id', id);
    formData.append('fullName', fullName);
    formData.append('dob', dob);
    formData.append('gender', gender);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('studentClass', studentClass);
    formData.append('rollNumber', rollNumber);
    formData.append('guardianName', guardianName);
    formData.append('year', year);
    if (photo) {
      formData.append('profilePicture', photo);
    }
    console.log(formData);
    

      try {
      await CreateForm(formData); 
      resetForm();
      navigate('/');
    } catch (error) {
      toast.error('Error submitting form!');
      console.error(error);
    }
  };

  const resetForm = () => {
    setId('');
    setFullName('');
    setDob('');
    setGender('');
    setEmail('');
    setPhone('');
    setAddress('');
    setStudentClass('');
    setRollNumber('');
    setGuardianName('');
    setYear('');
    setPhoto(null);
    
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-gray-200 p-8 rounded-lg shadow-md border border-gray-300"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {updateid ? 'Update Student' : 'Create Student'}
        </h2>

        <div className="mb-4">
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter full name"
            className="w-full mt-2 p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            id="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full mt-2 p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <div className="mt-2 flex space-x-4">
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                onChange={(e) => setGender(e.target.value)}
                checked={gender === 'Male'}
              />
              <span className="ml-2">Male</span>
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                onChange={(e) => setGender(e.target.value)}
                checked={gender === 'Female'}
              />
              <span className="ml-2">Female</span>
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            className="w-full mt-2 p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number"
            className="w-full mt-2 p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter address"
            className="w-full mt-2 p-3 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="studentClass" className="block text-sm font-medium text-gray-700">Class</label>
          <input
            type="text"
            id="studentClass"
            value={studentClass}
            onChange={(e) => setStudentClass(e.target.value)}
            placeholder="Enter class"
            className="w-full mt-2 p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700">Roll Number</label>
          <input
            type="text"
            id="rollNumber"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            placeholder="Enter roll number"
            className="w-full mt-2 p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="guardianName" className="block text-sm font-medium text-gray-700">Guardian Name</label>
          <input
            type="text"
            id="guardianName"
            value={guardianName}
            onChange={(e) => setGuardianName(e.target.value)}
            placeholder="Enter guardian name"
            className="w-full mt-2 p-3 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year</label>
          <input
            type="text"
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Enter year"
            className="w-full mt-2 p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="photo" className="block text-sm font-medium text-gray-700">Photo Upload</label>
          <input
            type="file"
            id="photo"
            onChange={(e) => setPhoto(e.target.files[0])}
            accept="image/png, image/jpeg"
            className="w-full mt-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-teal-500 text-white py-3 rounded-md hover:bg-teal-600"
        >
          {updateid ? 'Update' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default CreateForm;
