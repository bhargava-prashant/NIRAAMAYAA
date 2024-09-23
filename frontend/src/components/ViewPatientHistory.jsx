import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { assets } from '../assets/assets'; 

const ViewMedicalHistory = ({ data, closeModal }) => {
  if (!data) {
    return null; 
  }

  return (
    <div className='fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center'>
      <div className='bg-white rounded-lg shadow-lg w-full max-w-lg relative'>
        <button
          className='absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl'
          onClick={closeModal}
        >
          <FaTimes />
        </button>

        <div className='p-6 overflow-y-auto' style={{ maxHeight: '80vh' }}>
          {/* Company Logo */}
          <div className='flex items-center justify-center mb-4'>
            <img src={assets.logo} alt='Company Logo' className='w-24 h-auto' />
          </div>

          {/* Patient Information */}
          <div className='flex items-center mb-6 p-4 border border-gray-300 rounded-lg'>
            <img
              src={data.patientImage || 'path/to/default-image.jpg'} // Ensure a fallback image
              alt='Patient'
              className='w-16 h-16 rounded-full object-cover mr-4'
            />
            <div>
              <p className='text-lg font-semibold'>{data.patientName || 'N/A'}</p>
              <p className='text-gray-600 mb-2'>DOB: {data.DOB || 'N/A'}</p>
              <p className='text-gray-600'>Insurance Status: {data.insuranceStatus ? 'Yes' : 'No'}</p>
            </div>
          </div>

          {/* Last Appointment Details */}
          <div className='mb-6 p-4 border border-gray-300 rounded-lg'>
            <p className='font-semibold mb-2'>Last Appointment:</p>
            <p className='text-gray-700 mb-2'>Date: {data.lastAppointment?.date || 'N/A'}</p>
            <p className='text-gray-700'>Time: {data.lastAppointment?.time || 'N/A'}</p>
          </div>

          {/* Appointments in Last Year */}
          <div className='mb-6'>
            <p className='font-semibold mb-2'>Appointments in Last Year:</p>
            <p>{data.appointmentsInLastYear || 'N/A'} appointments</p>
          </div>

          {/* Major Diseases */}
          <div className='mb-6'>
            <p className='font-semibold mb-2'>Major Diseases:</p>
            <ul className='list-disc pl-5'>
              {data.majorDiseases && data.majorDiseases.length > 0 ? (
                data.majorDiseases.map((disease, index) => (
                  <li key={index} className='text-gray-700'>{disease}</li>
                ))
              ) : (
                <li className='text-gray-700'>No major diseases reported</li>
              )}
            </ul>
          </div>
        </div>

        <div className='mt-6 border-t border-gray-300 pt-4'>
          <p className='text-sm text-center text-gray-600'>
            All rights reserved by @<span className='font-semibold'>Prescripto</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewMedicalHistory;
