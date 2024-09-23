import 'react';
import PropTypes from 'prop-types';
import { assets } from '../assets/assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPills, faCalendarAlt, faBirthdayCake, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';

const PrescriptionModal = ({ data, closeModal }) => {
  return (
    <div className='fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center'>
      <div className='bg-white rounded-lg shadow-lg w-full max-w-lg relative'>
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

          <h2 className='text-xl font-semibold mb-4'>Prescription</h2>

          <div className='overflow-y-auto' style={{ maxHeight: 'calc(100vh - 200px)' }}>
            <div className='flex items-center mb-4 p-4 border border-gray-300 rounded-lg'>
              <img className='w-16 h-16 rounded-full object-cover' src={data.patientData.image} alt={data.patientData.name} />
              <div className='ml-4'>
                <p className='text-lg font-semibold'>{data.patientData.name}</p>
                <p className='flex items-center'><FontAwesomeIcon icon={faBirthdayCake} className='text-gray-500 mr-2' /> DOB: {data.patientData.DOB}</p>
                <p className='flex items-center'><FontAwesomeIcon icon={faPhone} className='text-gray-500 mr-2' /> Phone: {data.patientData.phone}</p>
              </div>
            </div>

            <div className='mb-4 p-4 border border-gray-300 rounded-lg'>
              <p className='font-semibold mb-2'>Doctor:</p>
              <p className='flex items-center'><FontAwesomeIcon icon={faUser} className='text-gray-500 mr-2' /> {data.doctorData.name}</p>
              <p className='flex items-center'><FontAwesomeIcon icon={faPills} className='text-gray-500 mr-2' /> Specialty: {data.doctorData.specialty}</p>
            </div>

            <div className='mb-4 p-4 border border-gray-300 rounded-lg'>
              <p className='font-semibold mb-2'>Problems:</p>
              <p>{data.patientData.problems}</p>
            </div>

            <div className='p-4 border border-gray-300 rounded-lg'>
              <p className='font-semibold mb-2'>Medicines:</p>
              {data.patientData.medicines.map((med, index) => (
                <div key={index} className='mb-2'>
                  <p className='flex items-center'><FontAwesomeIcon icon={faPills} className='text-gray-500 mr-2' /><strong>{med.name}</strong> - {med.dosage}</p>
                  <p>{med.instructions}</p>
                  <p className='flex items-center'><FontAwesomeIcon icon={faCalendarAlt} className='text-gray-500 mr-2' /> Start Date: {med.startDate} - End Date: {med.endDate}</p>
                </div>
              ))}
            </div>
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

PrescriptionModal.propTypes = {
  data: PropTypes.shape({
    patientData: PropTypes.shape({
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      DOB: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      problems: PropTypes.string.isRequired,
      medicines: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        dosage: PropTypes.string.isRequired,
        instructions: PropTypes.string.isRequired,
        startDate: PropTypes.string.isRequired,
        endDate: PropTypes.string.isRequired,
      })).isRequired,
    }).isRequired,
    doctorData: PropTypes.shape({
      name: PropTypes.string.isRequired,
      specialty: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default PrescriptionModal;
