import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ setLoggedIn }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'Patient'
    });
    
    const { email, password, role } = formData;
    const navigate = useNavigate();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', formData);
            toast.success('Login successful');
            localStorage.setItem('token', res.data.token);
            setLoggedIn(true);
            switch (role) {
                case 'Admin':
                    navigate('/admin-dashboard');
                    break;
                case 'Doctor':
                    navigate('/doctor-dashboard');
                    break;
                case 'Patient':
                    navigate('/my-profile');
                    break;
                default:
                    navigate('/');
                    break;
            }
            window.location.reload();
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response.data);
                toast.error(error.response.data.message || 'Login failed');
            } else if (error.request) {
                console.error('Error request:', error.request);
                toast.error('No response from server. Please try again later.');
            } else {
                console.error('Error', error.message);
                toast.error('An unexpected error occurred. Please try again.');
            }
        }
        
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-200">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center text-gray-800 w-full max-w-md">
                <div className="mb-4">
                    <h1 className="text-xl font-semibold">LOGIN</h1>
                </div>
                <form onSubmit={onSubmit}>
                    <div className="mb-4">
                        <label htmlFor="role" className="block text-left text-gray-600">Role</label>
                        <select
                            id="role"
                            name="role"
                            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 focus:border-green-400 focus:ring-1 focus:ring-green-400"
                            value={role}
                            onChange={onChange}
                        >
                            <option value="Admin">Admin</option>
                            <option value="Doctor">Doctor</option>
                            <option value="Patient">Patient</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-left text-gray-600">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="text"
                            value={email}
                            onChange={onChange}
                            placeholder="Email"
                            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 focus:border-green-400 focus:ring-1 focus:ring-green-400"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-left text-gray-600">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={onChange}
                            placeholder="Password"
                            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 focus:border-green-400 focus:ring-1 focus:ring-green-400"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-green-400 text-white rounded-lg text-lg font-semibold hover:bg-green-500 hover:scale-105 transition-transform duration-300"
                    >
                        Login
                    </button>
                    <p className="mt-4 text-gray-600">
                        <a href="#" className="underline">Forgot your password?</a>
                    </p>
                    <p className="mt-2 text-gray-600">
                        <a href="/signup" className="underline">Don't have an account? Sign up here</a>
                    </p>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
};

export default Login;
