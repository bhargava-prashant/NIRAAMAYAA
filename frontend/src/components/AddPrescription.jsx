import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPills, faCalendarAlt, faBirthdayCake, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';

const PrescriptionModal = ({ data, closeModal }) => {
  // States for making the data editable
  const [editableData, setEditableData] = useState({ ...data });
  const [isEditing, setIsEditing] = useState(false);

  // Handlers for updating state when input fields change
  const handleChange = (field, value) => {
    setEditableData(prevData => ({
      ...prevData,
      patientData: {
        ...prevData.patientData,
        [field]: value
      }
    }));
  };

  const handleMedicineChange = (index, field, value) => {
    const updatedMedicines = editableData.patientData.medicines.map((med, medIndex) => {
      if (medIndex === index) {
        return {
          ...med,
          [field]: value
        };
      }
      return med;
    });
    setEditableData(prevData => ({
      ...prevData,
      patientData: {
        ...prevData.patientData,
        medicines: updatedMedicines
      }
    }));
  };

  const addMedicine = () => {
    setEditableData(prevData => ({
      ...prevData,
      patientData: {
        ...prevData.patientData,
        medicines: [
          ...prevData.patientData.medicines,
          { name: '', dosage: '', instructions: '', startDate: '', endDate: '' }
        ]
      }
    }));
  };

  return (
    <div className='fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center'>
      <div className='bg-white rounded-lg shadow-lg w-full max-w-3xl relative'>
        <button
          className='absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl'
          onClick={closeModal}
        >
          &times;
        </button>

        <div className='p-6'>
          <div className='flex items-center justify-center mb-4'>
            <img src={assets.logo} alt='Company Logo' className='w-24 h-auto' />
          </div>

          <h2 className='text-xl font-semibold mb-4'>{isEditing ? 'Edit Prescription' : 'Prescription'}</h2>

          <div className='overflow-y-auto max-h-[calc(100vh-200px)]'>
            {/* Patient Information */}
            <div className='flex items-center mb-4 p-4 border border-gray-300 rounded-lg'>
              <img className='w-16 h-16 rounded-full object-cover' src={editableData.patientData.image} alt={editableData.patientData.name} />
              <div className='ml-4'>
                <p className='text-lg font-semibold'>{editableData.patientData.name}</p>
                <div className='flex items-center mb-2'>
                  <FontAwesomeIcon icon={faBirthdayCake} className='text-gray-500 mr-2' />
                  <span className='inline-block'>{editableData.patientData.DOB}</span>
                </div>
                <div className='flex items-center'>
                  <FontAwesomeIcon icon={faPhone} className='text-gray-500 mr-2' />
                  <span className='inline-block'>{editableData.patientData.phone}</span>
                </div>
              </div>
            </div>

            {/* Doctor Information */}
            <div className='mb-4 p-4 border border-gray-300 rounded-lg'>
              <p className='font-semibold mb-2'>Doctor:</p>
              <p className='flex items-center'><FontAwesomeIcon icon={faUser} className='text-gray-500 mr-2' /> {editableData.doctorData.name}</p>
              <p className='flex items-center'><FontAwesomeIcon icon={faPills} className='text-gray-500 mr-2' /> Specialty: {editableData.doctorData.specialty}</p>
            </div>

            {/* Problems */}
            <div className='mb-4 p-4 border border-gray-300 rounded-lg'>
              <p className='font-semibold mb-2'>Problems:</p>
              <textarea
                className='border w-full p-2 rounded resize-none'
                value={editableData.patientData.problems}
                onChange={(e) => handleChange('problems', e.target.value)}
                disabled={!isEditing}
              />
            </div>

            {/* Medicines */}
            <div className='p-4 border border-gray-300 rounded-lg'>
              <p className='font-semibold mb-2'>Medicines:</p>
              {editableData.patientData.medicines.map((med, index) => (
                <div key={index} className='mb-4'>
                  <div className='flex items-center mb-2'>
                    <FontAwesomeIcon icon={faPills} className='text-gray-500 mr-2' />
                    <input
                      type='text'
                      className='border p-1 rounded mr-2 w-1/4'
                      value={med.name}
                      onChange={(e) => handleMedicineChange(index, 'name', e.target.value)}
                      disabled={!isEditing}
                      placeholder='Medicine Name'
                    />
                    <input
                      type='text'
                      className='border p-1 rounded w-1/4'
                      value={med.dosage}
                      onChange={(e) => handleMedicineChange(index, 'dosage', e.target.value)}
                      disabled={!isEditing}
                      placeholder='Dosage'
                    />
                  </div>
                  <textarea
                    className='border w-full p-2 mt-1 rounded resize-none'
                    value={med.instructions}
                    onChange={(e) => handleMedicineChange(index, 'instructions', e.target.value)}
                    disabled={!isEditing}
                    placeholder='Instructions'
                  />
                  <div className='flex items-center mt-2'>
                    <FontAwesomeIcon icon={faCalendarAlt} className='text-gray-500 mr-2' />
                    <input
                      type='date'
                      className='border p-1 rounded mr-2'
                      value={med.startDate}
                      onChange={(e) => handleMedicineChange(index, 'startDate', e.target.value)}
                      disabled={!isEditing}
                    />
                    <input
                      type='date'
                      className='border p-1 rounded'
                      value={med.endDate}
                      onChange={(e) => handleMedicineChange(index, 'endDate', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              ))}
              {isEditing && (
                <button
                  onClick={addMedicine}
                  className='bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600 transition duration-300 mt-2'
                >
                  + Add Medicine
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className='absolute bottom-0 left-0 right-0 border-t border-gray-300 pt-4 bg-white'>
          <div className='flex justify-between items-center p-4'>
            {isEditing ? (
              <button
                onClick={() => setIsEditing(false)}
                className='bg-green-500 text-white px-4 py-2 rounded-md text-sm hover:bg-green-600 transition duration-300'
              >
                Save Prescription
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className='bg-purple-500 text-white px-4 py-2 rounded-md text-sm hover:bg-purple-600 transition duration-300'
              >
                Edit Prescription
              </button>
            )}
            <p className='text-sm text-gray-600'>
              All rights reserved by @<span className='font-semibold'>Prescripto</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionModal;
