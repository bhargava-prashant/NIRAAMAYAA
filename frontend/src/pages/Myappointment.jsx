import React, { useContext } from 'react';
import { FaLink } from 'react-icons/fa'; // Import FaLink
import { AppContext } from '../context/AppContext';

const Myappointment = () => {
  const { doctors } = useContext(AppContext);

  const copyMeetingIdAndRedirect = (meetingId) => {
    // Copy to clipboard
    navigator.clipboard.writeText(meetingId).then(() => {
      // Redirect to the meeting URL
      window.location.href = `https://t0xicat.github.io/Medi-call/lobby.html`;
    });
  };

  return (
    <div className='p-6  min-h-screen'>
      {/* Section Title */}
      <p className='pb-3 mt-12 font-semibold text-2xl text-indigo-700 border-b-2 border-indigo-300'>My Appointments</p>

      {/* Appointment Cards */}
      <div className='mt-6 grid gap-6'>
        {doctors.slice(0, 3).map((appointment, index) => (
          <div className='grid grid-cols-1 sm:grid-cols-[1fr_2fr_1fr] gap-4 bg-white p-6 rounded-lg shadow-md' key={index}>

            {/* Doctor Image */}
            <div className='flex justify-center items-center'>
              <img className='w-32 h-32 rounded-full bg-indigo-50 object-cover' src={appointment.image} alt={appointment.name} />
            </div>

            {/* Appointment Details */}
            <div className='text-sm text-gray-600'>
              <p className='text-lg font-semibold text-gray-800'>{appointment.name}</p>
              <p className='text-gray-500 mb-2'>{appointment.speciality}</p>

              <div className='mt-2'>
                <p className='font-medium text-gray-700'>Address:</p>
                <p className='text-xs'>{appointment.address.line1}</p>
                <p className='text-xs'>{appointment.address.line2}</p>
              </div>

              <div className='mt-4'>
                <p className='font-medium text-gray-700'>Date & Time:</p>
                <p className='text-sm'>25, July 2024 | 8:30 PM</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex flex-col justify-between items-center gap-3 sm:justify-start'>
              {appointment.appointmentType === 'videocall' && (
                <button
                  onClick={() => copyMeetingIdAndRedirect(appointment.meetingId)}
                  className='flex items-center bg-white text-black border border-black px-3 py-1 rounded-md text-sm hover:bg-blue-300 transition duration-300'
                >
                  <span>Meeting ID: {appointment.meetingId}</span>
                  <FaLink className='ml-2' />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Myappointment;
