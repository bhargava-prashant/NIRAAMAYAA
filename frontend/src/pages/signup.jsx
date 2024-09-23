import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    dateOfBirth: '',
    phoneNo: '',
    address: '',
    gender: '',
    role: 'Patient',
    adminUniqueId: '',
    experience: '',
    specialization: '',
    medicalCertificate: null,
    doctorIdNo: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFileChange = e => {
    setFormData({ ...formData, medicalCertificate: e.target.files[0] });
  };

  const onSubmit = async e => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    const { role, medicalCertificate } = formData;
    const formDataObj = new FormData();
    
    formDataObj.append('fullName', formData.fullName);
    formDataObj.append('email', formData.email);
    formDataObj.append('dateOfBirth', formData.dateOfBirth.toString().split('T')[0]);
    formDataObj.append('phoneNo', formData.phoneNo);
    formDataObj.append('address', formData.address);
    formDataObj.append('gender', formData.gender);
    formDataObj.append('role', role);
    formDataObj.append('password', formData.password);
    formDataObj.append('confirmPassword', formData.confirmPassword);

    if (role === 'Admin') {
      formDataObj.append('adminUniqueId', formData.adminUniqueId);
    } else if (role === 'Doctor') {
      formDataObj.append('experience', formData.experience);
      formDataObj.append('specialization', formData.specialization);
      if (medicalCertificate) {
        formDataObj.append('medicalCertificate', medicalCertificate);
      }
      formDataObj.append('doctorIdNo', formData.doctorIdNo);
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', formData);
      localStorage.setItem('token', res.data.token);
      toast.success('Sign up successful');
      navigate("/login")
  } catch (err) {
      console.error(err);
      toast.error('Sign up failed');
  }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="bg-white p-6 rounded-lg shadow-lg text-gray-800 w-full max-w-md h-[80vh] overflow-y-auto">
        <div className="mb-4 text-center">
          <h1 className="text-xl font-semibold">Create an Account</h1>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="role" className="block text-left text-gray-600">Role</label>
            <select
              id="role"
              name="role"
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 focus:border-green-400 focus:ring-1 focus:ring-green-400"
              value={formData.role}
              onChange={onChange}
            >
              <option value="Patient">Patient</option>
              <option value="Admin">Admin</option>
              <option value="Doctor">Doctor</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="fullName" className="block text-left text-gray-600">Full Name</label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={onChange}
              placeholder="Full Name"
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 focus:border-green-400 focus:ring-1 focus:ring-green-400"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-left text-gray-600">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 focus:border-green-400 focus:ring-1 focus:ring-green-400"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="dateOfBirth" className="block text-left text-gray-600">Date of Birth</label>
            <input
              id="dateOfBirth"
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={onChange}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 focus:border-green-400 focus:ring-1 focus:ring-green-400"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phoneNo" className="block text-left text-gray-600">Phone Number</label>
            <input
              id="phoneNo"
              type="tel"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={onChange}
              placeholder="Phone Number"
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 focus:border-green-400 focus:ring-1 focus:ring-green-400"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block text-left text-gray-600">Address</label>
            <input
              id="address"
              type="text"
              name="address"
              value={formData.address}
              onChange={onChange}
              placeholder="Address"
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 focus:border-green-400 focus:ring-1 focus:ring-green-400"
              required
            />
          </div>

          <div className="mb-4">
            <p className="text-left mb-2 text-gray-600">Gender</p>
            <label className="flex items-center mb-2">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === 'Male'}
                onChange={onChange}
                className="mr-2"
              />
              Male
            </label>
            <label className="flex items-center mb-2">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === 'Female'}
                onChange={onChange}
                className="mr-2"
              />
              Female
            </label>
            <label className="flex items-center mb-2">
              <input
                type="radio"
                name="gender"
                value="Other"
                checked={formData.gender === 'Other'}
                onChange={onChange}
                className="mr-2"
              />
              Other
            </label>
          </div>

          {formData.role === 'Admin' && (
            <div className="mb-4">
              <label htmlFor="adminUniqueId" className="block text-left text-gray-600">Admin Unique ID</label>
              <input
                id="adminUniqueId"
                type="text"
                name="adminUniqueId"
                value={formData.adminUniqueId}
                onChange={onChange}
                placeholder="Admin Unique ID"
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 focus:border-green-400 focus:ring-1 focus:ring-green-400"
                required
              />
            </div>
          )}

          {formData.role === 'Doctor' && (
            <>
              <div className="mb-4">
                <label htmlFor="experience" className="block text-left text-gray-600">Experience</label>
                <input
                  id="experience"
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={onChange}
                  placeholder="Experience"
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 focus:border-green-400 focus:ring-1 focus:ring-green-400"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="specialization" className="block text-left text-gray-600">Specialization</label>
                <input
                  id="specialization"
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={onChange}
                  placeholder="Specialization"
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 focus:border-green-400 focus:ring-1 focus:ring-green-400"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="medicalCertificate" className="block text-left text-gray-600">Medical Certificate</label>
                <input
                  id="medicalCertificate"
                  type="file"
                  name="medicalCertificate"
                  accept=".pdf,.doc,.docx,.png,.jpg"
                  onChange={onFileChange}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 focus:border-green-400 focus:ring-1 focus:ring-green-400"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="doctorIdNo" className="block text-left text-gray-600">Doctor ID Number</label>
                <input
                  id="doctorIdNo"
                  type="text"
                  name="doctorIdNo"
                  value={formData.doctorIdNo}
                  onChange={onChange}
                  placeholder="Doctor ID Number"
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 focus:border-green-400 focus:ring-1 focus:ring-green-400"
                  required
                />
              </div>
            </>
          )}

          <div className="mb-4">
            <label htmlFor="password" className="block text-left text-gray-600">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={onChange}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 focus:border-green-400 focus:ring-1 focus:ring-green-400"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-left text-gray-600">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={onChange}
              placeholder="Confirm Password"
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 focus:border-green-400 focus:ring-1 focus:ring-green-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white font-semibold p-3 rounded-lg hover:bg-green-600 transition-colors"
          >
            Sign Up
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default SignUp;
