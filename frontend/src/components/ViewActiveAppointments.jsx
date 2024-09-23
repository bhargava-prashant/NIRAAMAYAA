import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faClock } from '@fortawesome/free-solid-svg-icons';

const ViewActiveAppointments = () => {
  const [activeAppointments, setActiveAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [doctors, setDoctors] = useState({});

  // Fetch active appointments from the backend
  const fetchActiveAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/ACTappointment');
      console.log("Fetched active appointments:", response.data);

      // Filter appointments where completionStatus is false
      const activeAppointments = response.data.filter(appointment => !appointment.completionStatus);
      setActiveAppointments(activeAppointments);

      // Fetch doctor details
      const doctorIds = Array.from(new Set(response.data.map(appointment => appointment.doctorId)));
      const doctorsData = {};
      for (const doctorId of doctorIds) {
        const name = await fetchDoctorName(doctorId);
        doctorsData[doctorId] = name;
      }
      setDoctors(doctorsData);

    } catch (error) {
      console.error('Error fetching active appointments:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch doctor name based on doctorIdNo
  const fetchDoctorName = async (doctorIdNo) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/auth/doctors/${doctorIdNo}`);
      return response.data.fullName || 'No Doctor Name';
    } catch (error) {
      console.error('Error fetching doctor details:', error);
      return 'Error Fetching Doctor Name';
    }
  };

  useEffect(() => {
    fetchActiveAppointments();
  }, []);

  const calculateAge = (dateOfBirth) => {
    const birthDate = new Date(dateOfBirth);
    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  if (loading) {
    return <p>Loading appointments...</p>;
  }

  if (error) {
    return <p className='text-red-500'>{`Error: ${error}`}</p>;
  }

  return (
    <div className='p-6 min-h-screen'>
      {/* Section Title */}
      <p className='pb-3 mt-12 font-semibold text-2xl text-indigo-700 border-b-2 border-indigo-300'>
        Active Appointments
      </p>
      
      {/* Appointment Cards */}
      <div className='mt-6 grid gap-6'>
        {activeAppointments.length === 0 ? (
          <p>No active appointments found.</p>
        ) : (
          activeAppointments.map((item, index) => (
            <div className='grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-4 bg-white p-6 rounded-lg shadow-md' key={index}>
              
              {/* Doctor's Name */}
              <div className='text-lg font-semibold text-gray-800'>
                Doctor: {doctors[item.doctorId] || 'No Doctor'}
              </div>
              
              {/* Patient Details */}
              <div className='text-sm text-gray-600'>
                <p className='text-lg font-semibold text-gray-800'>Patient: {item.fullName || 'No Name'}</p>
                <p className='text-gray-500 mb-2'>Age: {calculateAge(item.dateOfBirth) || 'Unknown'}</p>
                <p className='text-gray-500 mb-2'>Gender: {item.gender || 'Unknown'}</p>
                
                <div className='mt-2 flex items-center'>
                  <FontAwesomeIcon icon={faCalendarAlt} className='text-gray-500 mr-2' />
                  <p className='font-medium text-gray-700'>Date:</p>
                  <p className='text-xs ml-2'>{item.appointmentDate || 'No Date'}</p>
                </div>

                <div className='mt-4 flex items-center'>
                  <FontAwesomeIcon icon={faClock} className='text-gray-500 mr-2' />
                  <p className='font-medium text-gray-700'>Time:</p>
                  <p className='text-sm ml-2'>{item.appointmentTime || 'No Time'}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ViewActiveAppointments;
