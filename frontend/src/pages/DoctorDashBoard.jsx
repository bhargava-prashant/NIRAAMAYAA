import 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { FaUser, FaCalendarCheck, FaCalendarAlt } from 'react-icons/fa';
import ViewAppointments from '../components/ViewAppointments';
import ViewPreviousAppointments from '../components/ViewPreviousAppointments';
import AddPrescription from '../components/AddPrescription';
import ViewPatientHistory from '../components/ViewPatientHistory';

const DoctorDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="w-64 bg-gray-900 text-white min-h-screen p-6 border-r border-gray-700">
                <h2 className="text-2xl font-semibold mb-8">Doctor Dashboard</h2>
                <ul className="space-y-4">
                    <li>
                        <button
                            onClick={() => navigate('/doctor-dashboard')}
                            className="w-full flex items-center space-x-4 px-4 py-2 rounded-md hover:bg-gray-800 transition duration-300"
                        >
                            <FaCalendarAlt className="text-blue-400 text-2xl" />
                            <span className="text-lg font-medium">Dashboard</span>
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => navigate('/doctor-dashboard/view-appointments')}
                            className="w-full flex items-center space-x-4 px-4 py-2 rounded-md hover:bg-gray-800 transition duration-300"
                        >
                            <FaCalendarCheck className="text-green-400 text-2xl" />
                            <span className="text-lg font-medium">View Appointments</span>
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => navigate('/doctor-dashboard/view-previous-appointments')}
                            className="w-full flex items-center space-x-4 px-4 py-2 rounded-md hover:bg-gray-800 transition duration-300"
                        >
                            <FaCalendarAlt className="text-yellow-400 text-2xl" />
                            <span className="text-lg font-medium">View Previous Appointments</span>
                        </button>
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
                <h1 className="text-3xl font-semibold mb-6">Dashboard Overview</h1>
                
                {/* Dashboard Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-between border border-gray-200">
                        <FaUser className="text-blue-500 text-4xl" />
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold text-gray-700">Patients Attended</h3>
                            <p className="text-2xl font-bold">150</p>
                        </div>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-between border border-gray-200">
                        <FaCalendarCheck className="text-green-500 text-4xl" />
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold text-gray-700">Total Appointments</h3>
                            <p className="text-2xl font-bold">200</p>
                        </div>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-between border border-gray-200">
                        <FaCalendarAlt className="text-orange-500 text-4xl" />
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold text-gray-700">Upcoming Appointments</h3>
                            <p className="text-2xl font-bold">5</p>
                        </div>
                    </div>
                </div>

                {/* Route Components */}
                <Routes>
                    <Route path="/" element={<div>Welcome to Your Dashboard</div>} />
                    <Route path="view-appointments" element={<ViewAppointments />} />
                    <Route path="view-previous-appointments" element={<ViewPreviousAppointments />} />
                    <Route path="add-prescription" element={<AddPrescription />} />
                    <Route path="view-patient-history" element={<ViewPatientHistory />} />
                </Routes>
            </div>
        </div>
    );
};

export default DoctorDashboard;
