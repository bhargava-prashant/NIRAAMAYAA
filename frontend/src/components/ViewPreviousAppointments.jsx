// import React, { useState } from 'react';
// import { FaCalendarAlt, FaClock, FaCheckCircle } from 'react-icons/fa';
// import { assets } from '../assets/assets';
// import PrescriptionModal from '../components/AddPrescription'; 

// const previousAppointments = [
//     {
//         id: 1,
//         patientName: 'John Doe',
//         appointmentDate: '2024-08-10',
//         appointmentTime: '09:00 AM',
//         patientData: {
//             name: 'John Doe',
//             DOB: '1990-05-14',
//             phone: '123-456-7890',
//             problems: 'Fever, cough, and sore throat',
//             medicines: [
//                 { name: 'Paracetamol', dosage: '500mg', instructions: 'Twice a day', startDate: '2024-08-10', endDate: '2024-08-14' },
//             ],
//             image: assets.profile_pic,
//         },
//         doctorData: {
//             name: 'Dr. Smith',
//             specialty: 'General Physician',
//         },
//     },
//     {
//         id: 2,
//         patientName: 'Jane Smith',
//         appointmentDate: '2024-08-12',
//         appointmentTime: '02:00 PM',
//         patientData: {
//             name: 'Jane Smith',
//             DOB: '1985-07-22',
//             phone: '987-654-3210',
//             problems: 'Headache and nausea',
//             medicines: [
//                 { name: 'Ibuprofen', dosage: '200mg', instructions: 'Three times a day', startDate: '2024-08-12', endDate: '2024-08-16' },
//             ],
//             image: assets.profile_pic,
//         },
//         doctorData: {
//             name: 'Dr. John',
//             specialty: 'Neurologist',
//         },
//     },
// ];

// const PreviousAppointment = () => {
//     const [selectedAppointment, setSelectedAppointment] = useState(null);

//     const openModal = (appointment) => {
//         setSelectedAppointment(appointment);
//     };

//     const closeModal = () => {
//         setSelectedAppointment(null);
//     };

//     return (
//         <div className='mt-6 grid gap-6'>
//             {previousAppointments.map((appointment) => (
//                 <div
//                     key={appointment.id}
//                     className='grid grid-cols-1 sm:grid-cols-[1fr_2fr_1fr] gap-4 bg-white p-6 rounded-lg shadow-md'
//                 >
//                     {/* Patient Image */}
//                     <div className='flex justify-center items-center'>
//                         <img
//                             src={assets.profile_pic}
//                             alt='Patient'
//                             className='w-48 h-32 object-cover rounded-lg bg-indigo-50'
//                         />
//                     </div>

//                     {/* Appointment Details */}
//                     <div className='text-sm text-gray-600'>
//                         <p className='text-lg font-semibold text-gray-800'>{appointment.patientName}</p>
//                         <div className='flex items-center text-gray-600 mb-2'>
//                             <FaCalendarAlt className='mr-2' />
//                             <p>Date: {appointment.appointmentDate}</p>
//                         </div>
//                         <div className='flex items-center text-gray-600 mb-4'>
//                             <FaClock className='mr-2' />
//                             <p>Time: {appointment.appointmentTime}</p>
//                         </div>
//                         <div className='flex items-center space-x-2'>
//                             <FaCheckCircle className='text-green-500 text-lg' />
//                             <p className='text-green-500 font-semibold'>Completed</p>
//                         </div>
//                     </div>

//                     {/* View Prescription Button */}
//                     <div className='flex flex-col justify-end items-center gap-2'>
//                         <button
//                             className='bg-purple-500 text-white px-3 py-2 rounded-md text-sm hover:bg-purple-600 transition duration-300 w-full'
//                             onClick={() => openModal(appointment)}
//                         >
//                             View Prescription
//                         </button>
//                     </div>
//                 </div>
//             ))}

//             {/* Prescription Modal */}
//             {selectedAppointment && (
//                 <PrescriptionModal data={selectedAppointment} closeModal={closeModal} />
//             )}
//         </div>
//     );
// };

// export default PreviousAppointment;


// import { useState, useEffect } from 'react';
// import { FaCalendarAlt, FaClock, FaCheckCircle } from 'react-icons/fa';
// import axios from 'axios'; 
// import { assets } from '../assets/assets';
// import PrescriptionModal from '../components/AddPrescription';

// const PreviousAppointment = () => {
//     const [selectedAppointment, setSelectedAppointment] = useState(null);
//     const [appointments, setAppointments] = useState([]); 
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null); 

//     useEffect(() => {
//         const fetchProfileAndAppointments = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 if (!token) throw new Error('No token found');

//                 const config = {
//                     headers: {
//                         'x-auth-token': token,
//                     },
//                 };

//                 const profileRes = await axios.get(`http://localhost:5000/api/auth/profile`, config);
//                 const doctorId = profileRes.data.doctorIdNo;

//                 const appointmentsRes = await axios.get(`http://localhost:5000/api/auth/appointments/${doctorId}`, config);

//                 const filteredAppointments = appointmentsRes.data.filter(
//                     (appointment) => appointment.completionStatus === true
//                 );

//                 setAppointments(filteredAppointments);
//                 setLoading(false);
//             } catch (err) {
//                 console.error('Error fetching data:', err);
//                 setError('Failed to load appointments.');
//                 setLoading(false);
//             }
//         };

//         fetchProfileAndAppointments();
//     }, []);

//     const openModal = (appointment) => {
//         setSelectedAppointment(appointment);
//     };

//     const closeModal = () => {
//         setSelectedAppointment(null);
//     };

//     if (loading) {
//         return <p>Loading appointments...</p>;
//     }

//     if (error) {
//         return <p>{error}</p>;
//     }

//     return (
//         <div className='mt-6 grid gap-6'>
//             {appointments.map((appointment) => (
//                 <div
//                     key={appointment.id}
//                     className='grid grid-cols-1 sm:grid-cols-[1fr_2fr_1fr] gap-4 bg-white p-6 rounded-lg shadow-md'
//                 >
                    
//                     <div className='flex justify-center items-center'>
//                         <img
//                             src={assets.profile_pic} 
//                             alt='Patient'
//                             className='w-48 h-32 object-cover rounded-lg bg-indigo-50'
//                         />
//                     </div>

                    
//                     <div className='text-sm text-gray-600'>
//                         <p className='text-lg font-semibold text-gray-800'>{appointment.fullName}</p>
//                         <div className='flex items-center text-gray-600 mb-2'>
//                             <FaCalendarAlt className='mr-2' />
//                             <p>Date: {appointment.appointmentDate}</p>
//                         </div>
//                         <div className='flex items-center text-gray-600 mb-4'>
//                             <FaClock className='mr-2' />
//                             <p>Time: {appointment.appointmentTime}</p>
//                         </div>
//                         <div className='flex items-center space-x-2'>
//                             <FaCheckCircle className='text-green-500 text-lg' />
//                             <p className='text-green-500 font-semibold'>Completed</p>
//                         </div>
//                     </div>

                    
//                     <div className='flex flex-col justify-end items-center gap-2'>
//                         <button
//                             className='bg-purple-500 text-white px-3 py-2 rounded-md text-sm hover:bg-purple-600 transition duration-300 w-full'
//                             onClick={() => openModal(appointment)}
//                         >
//                             View Prescription
//                         </button>
//                     </div>
//                 </div>
//             ))}

            
//             {selectedAppointment && (
//                 <PrescriptionModal data={selectedAppointment} closeModal={closeModal} />
//             )}
//         </div>
//     );
// };

// export default PreviousAppointment;

import { useState, useEffect } from 'react';
import { FaCalendarAlt, FaClock, FaCheckCircle } from 'react-icons/fa';
import axios from 'axios'; 
import { assets } from '../assets/assets';
import PrescriptionModal from '../components/AddPrescription';

const PreviousAppointment = () => {
    const [selectedAppointment, setSelectedAppointment] = useState(null); // Modal state
    const [appointments, setAppointments] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchProfileAndAppointments = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('No token found');

                const config = {
                    headers: {
                        'x-auth-token': token,
                    },
                };

                const profileRes = await axios.get(`http://localhost:5000/api/auth/profile`, config);
                const doctorId = profileRes.data.doctorIdNo;

                const appointmentsRes = await axios.get(`http://localhost:5000/api/auth/appointments/${doctorId}`, config);

                const filteredAppointments = appointmentsRes.data.filter(
                    (appointment) => appointment.completionStatus === true
                );

                setAppointments(filteredAppointments);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to load appointments.');
                setLoading(false);
            }
        };

        fetchProfileAndAppointments();
    }, []);

    // Open and close modal
    const openModal = (appointment) => {
        setSelectedAppointment(appointment);
    };

    const closeModal = () => {
        setSelectedAppointment(null);
    };

    if (loading) {
        return <p>Loading appointments...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className='mt-6 grid gap-6'>
            {appointments.map((appointment) => (
                <div
                    key={appointment.id}
                    className='grid grid-cols-1 sm:grid-cols-[1fr_2fr_1fr] gap-4 bg-white p-6 rounded-lg shadow-md'
                >
                    {/* Patient Image */}
                    <div className='flex justify-center items-center'>
                        <img
                            src={assets.profile_pic} 
                            alt='Patient'
                            className='w-48 h-32 object-cover rounded-lg bg-indigo-50'
                        />
                    </div>

                    {/* Appointment Details */}
                    <div className='text-sm text-gray-600'>
                        <p className='text-lg font-semibold text-gray-800'>{appointment.fullName}</p>
                        <div className='flex items-center text-gray-600 mb-2'>
                            <FaCalendarAlt className='mr-2' />
                            <p>Date: {appointment.appointmentDate}</p>
                        </div>
                        <div className='flex items-center text-gray-600 mb-4'>
                            <FaClock className='mr-2' />
                            <p>Time: {appointment.appointmentTime}</p>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <FaCheckCircle className='text-green-500 text-lg' />
                            <p className='text-green-500 font-semibold'>Completed</p>
                        </div>
                    </div>

                    {/* View Prescription Button */}
                    <div className='flex flex-col justify-end items-center gap-2'>
                        <button
                            className='bg-purple-500 text-white px-3 py-2 rounded-md text-sm hover:bg-purple-600 transition duration-300 w-full'
                            onClick={() => openModal(appointment)}
                        >
                            View Prescription
                        </button>
                    </div>
                </div>
            ))}

            {/* Prescription Modal */}
            {selectedAppointment && (
                <PrescriptionModal data={selectedAppointment} closeModal={closeModal} />
            )}
        </div>
    );
};

export default PreviousAppointment;
