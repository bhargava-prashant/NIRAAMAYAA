import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = ({ loggedIn }) => {
    const [userData, setUserData] = useState(null); 
    const [loading, setLoading] = useState(true);  // Added loading state
    const navigate = useNavigate();
    const [token, setToken] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        setToken(!!storedToken); 

        const handleStorageChange = () => {
            const updatedToken = localStorage.getItem('token');
            setToken(!!updatedToken);
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange); // Correct event listener removal
        };
    }, [loggedIn]); 

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(false);
        navigate('/login');
    };

    useEffect(() => {
        const fetchProfile = async () => {
          try {
            const token = localStorage.getItem('token');
            if (!token) {
              setLoading(false);
              return;  // Exit early if no token found
            }

            const config = {
              headers: {
                'x-auth-token': token,
              },
            };
    
            const res = await axios.get('http://localhost:5000/api/auth/profile', config);
            setUserData(res.data); 
            setLoading(false); 
          } catch (err) {
            console.error('Error fetching profile:', err);
            setLoading(false); 
          }
        };
    
        fetchProfile();
      }, []);

    if (loading) {
        return null;  // Return early while data is loading
    }

    return (
        <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
            <img className='w-44 cursor-pointer' src={assets.logo} alt="Logo" onClick={() => navigate('/')} />
            
            <ul className="hidden md:flex items-center gap-5 font-medium">
              {/* Doctor Dashboard button, only visible to doctors */}
              {userData?.role === 'Doctor' && (   // Add null-check for userData
                <NavLink
                  to="/doctor-dashboard"
                  className="bg-white text-gray-500 border border-gray-500 px-3 py-1.5 rounded-md hover:bg-blue-500 hover:text-white transition duration-300 flex items-center"
                >
                  Doctor Dashboard
                </NavLink>
              )}

              {/* Show other links like Home and All Doctors when not a Doctor */}
              {userData?.role !== 'Doctor' && (
                <>
                  <NavLink
                    to="/"
                    className="hover:underline"
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/doctors"
                    className="hover:underline"
                  >
                    All Doctors
                  </NavLink>
                </>
              )}

              <NavLink
                to="/about"
                className="hover:underline"
              >
                About
              </NavLink>
              <NavLink
                to="/contact"
                className="hover:underline"
              >
                Contact
              </NavLink>

              {/* Admin Dashboard link, visible only to admins */}
              {userData?.role === 'Admin' && (  // Add null-check for userData
                <NavLink
                  to="/admin-dashboard"
                  className="bg-white text-gray-500 border border-gray-500 px-3 py-1.5 rounded-md hover:bg-blue-500 hover:text-white transition duration-300 flex items-center"
                >
                  Admin Dashboard
                </NavLink>
              )}
            </ul>

            <div className='flex items-center gap-4'>
                {token ? (
                    <div className='flex items-center gap-2 cursor-pointer group relative'>
                        <img className='w-8 rounded-full' src={assets.profile_pic} alt="Profile" />
                        <img className='w-2.5' src={assets.dropdown_icon} alt="Dropdown Icon" />

                        <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                            <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                                <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                                <p onClick={() => navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                                <p onClick={handleLogout} className='hover:text-black cursor-pointer'>Logout</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={() => navigate('/login')}
                        className='bg-white text-black border border-black px-6 py-2.5 font-medium transition-colors duration-300 hover:bg-blue-600 hover:text-white hover:border-blue-600'
                    >
                        Login / Signup
                    </button>
                )}
            </div>
        </div>
    );
};

export default Navbar;
