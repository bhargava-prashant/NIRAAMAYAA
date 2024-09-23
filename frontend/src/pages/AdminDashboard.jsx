import 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { FaUsers, FaCalendarCheck, FaUserMd, FaCalendarAlt } from 'react-icons/fa';
import ViewActiveAppointments from '../components/ViewActiveAppointments';
import ViewPreviousAppointments from '../components/ViewAdminPreviousAppointments';
import ViewAllDoctors from '../components/ViewAllDoctors';

const AdminDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="w-64 bg-blue-900 text-white min-h-screen p-6 border-r border-gray-700">
                <h2 className="text-2xl font-semibold mb-8">Admin Dashboard</h2>
                <ul className="space-y-4">
                    <li>
                        <button
                            onClick={() => navigate('/admin-dashboard')}
                            className="w-full flex items-center space-x-4 px-4 py-2 rounded-md hover:bg-blue-800 transition duration-300"
                        >
                            <FaCalendarAlt className="text-white text-2xl" />
                            <span className="text-lg font-medium">Dashboard</span>
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => navigate('/admin-dashboard/view-active-appointments')}
                            className="w-full flex items-center space-x-4 px-4 py-2 rounded-md hover:bg-blue-800 transition duration-300"
                        >
                            <FaCalendarCheck className="text-green-400 text-2xl" />
                            <span className="text-lg font-medium">View Active Appointments</span>
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => navigate('/admin-dashboard/view-previous-appointments')}
                            className="w-full flex items-center space-x-4 px-4 py-2 rounded-md hover:bg-blue-800 transition duration-300"
                        >
                            <FaCalendarAlt className="text-yellow-400 text-2xl" />
                            <span className="text-lg font-medium">View Previous Appointments</span>
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => navigate('/admin-dashboard/view-all-doctors')}
                            className="w-full flex items-center space-x-4 px-4 py-2 rounded-md hover:bg-blue-800 transition duration-300"
                        >
                            <FaUserMd className="text-red-400 text-2xl" />
                            <span className="text-lg font-medium">View All Doctors</span>
                        </button>
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
                <h1 className="text-3xl font-semibold mb-6">Admin Dashboard Overview</h1>
                
                {/* Dashboard Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-between border border-gray-200">
                        <FaUsers className="text-blue-500 text-4xl" />
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
                            <p className="text-2xl font-bold">500</p>
                        </div>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-between border border-gray-200">
                        <FaCalendarCheck className="text-green-500 text-4xl" />
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold text-gray-700">Active Appointments</h3>
                            <p className="text-2xl font-bold">45</p>
                        </div>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-between border border-gray-200">
                        <FaUserMd className="text-red-500 text-4xl" />
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold text-gray-700">Registered Doctors</h3>
                            <p className="text-2xl font-bold">100</p>
                        </div>
                    </div>
                </div>

                {/* Route Components */}
                <Routes>
                    <Route path="/" element={<div>Welcome to Admin Dashboard</div>} />
                    <Route path="view-active-appointments" element={<ViewActiveAppointments />} />
                    <Route path="view-previous-appointments" element={<ViewPreviousAppointments />} />
                    <Route path="view-all-doctors" element={<ViewAllDoctors />} />
                </Routes>
            </div>
        </div>
    );
};

export default AdminDashboard;
