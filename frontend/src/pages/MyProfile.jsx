import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { assets } from '../assets/assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faMapMarkerAlt, faEnvelope, faBirthdayCake, faVenusMars, faCheck, faPrescription, faIdBadge, faFileMedicalAlt } from '@fortawesome/free-solid-svg-icons';
import HealthCard from '../components/HealthCard';
import PrescriptionModal from '../components/PrescriptionModal'; 
import { AppContext } from '../context/AppContext';

const MyProfile = () => {
  const { doctors } = useContext(AppContext);
  const [userData, setUserData] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [isHealthCardOpen, setIsHealthCardOpen] = useState(false);
  const [isPrescriptionOpen, setIsPrescriptionOpen] = useState(false);

  const prescriptionData = {
    patientData: {
      image: assets.profile_pic,
      name: userData?.fullName, 
      DOB: userData?.dateOfBirth, 
      phone: userData?.phoneNo,
      problems: 'Headache and Fever',
      medicines: [
        { name: 'Paracetamol', dosage: '500mg', instructions: 'Take twice daily', startDate: '2024-09-01', endDate: '2024-09-10' },
        { name: 'Ibuprofen', dosage: '200mg', instructions: 'Take once daily', startDate: '2024-09-01', endDate: '2024-09-05' },
      ],
    },
    doctorData: {
      name: 'Dr. John Doe',
      specialty: 'General Medicine',
    },
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');

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

  if (loading) return <div>Loading...</div>; 

  if (!userData) return <div>No Profile Data Available</div>; 

  return (
    <div className="min-h-screen py-12 px-4 flex flex-col items-center">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8 md:p-12">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <img
            className="w-40 h-40 rounded-full object-cover border-4 border-primary"
            src={assets.profile_pic} //static profile image to be linked to AWS later
            alt="Profile"
          />

          <div className="flex-1">
            {isEdit ? (
              <input
                className="bg-gray-50 text-3xl font-medium w-full mt-4 p-2 border border-gray-300 rounded-lg"
                type="text"
                value={userData.fullName}
                onChange={(e) => setUserData((prev) => ({ ...prev, fullName: e.target.value }))}
              />
            ) : (
              <p className="font-semibold text-3xl text-gray-800">{userData.fullName}</p>
            )}
          </div>
        </div>

        <hr className="my-8 border-t border-gray-300" />

        <div className="text-lg text-gray-700">
          <p className="font-semibold text-primary mb-4">Contact Information</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faEnvelope} className="text-primary w-5 mr-3" />
              <p>{userData.email}</p>
            </div>

            <div className="flex items-center">
              <FontAwesomeIcon icon={faPhone} className="text-primary w-5 mr-3" />
              {isEdit ? (
                <input
                  className="bg-gray-50 p-2 border border-gray-300 rounded-lg w-full"
                  type="text"
                  value={userData.phoneNo}
                  onChange={(e) => setUserData((prev) => ({ ...prev, phoneNo: e.target.value }))}
                />
              ) : (
                <p>{userData.phoneNo}</p>
              )}
            </div>

            <div className="flex items-center">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary w-5 mr-3" />
              {isEdit ? (
                <div>
                  <input
                    className="bg-gray-50 p-2 mb-2 border border-gray-300 rounded-lg w-full"
                    type="text"
                    value={userData.address}
                    onChange={(e) => setUserData((prev) => ({ ...prev, address: e.target.value }))}
                  />
                </div>
              ) : (
                <p>{userData.address}</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <p className="font-semibold text-primary mb-4">Basic Information</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faVenusMars} className="text-primary w-5 mr-3" />
              {isEdit ? (
                <select
                  className="bg-gray-50 p-2 border border-gray-300 rounded-lg w-full"
                  onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
                  value={userData.gender}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <p>{userData.gender}</p>
              )}
            </div>

            <div className="flex items-center">
              <FontAwesomeIcon icon={faBirthdayCake} className="text-primary w-5 mr-3" />
              {isEdit ? (
                <input
                  className="bg-gray-50 p-2 border border-gray-300 rounded-lg w-full"
                  type="date"
                  value={userData.dateOfBirth}
                  onChange={(e) => setUserData((prev) => ({ ...prev, dateOfBirth: e.target.value }))}
                />
              ) : (
                <p>{new Date(userData.dateOfBirth).toLocaleDateString()}</p>
              )}
            </div>
          </div>
        </div>

        {userData.role === 'Doctor' && (
          <>
            <div className="mt-8">
              <p className="font-semibold text-primary mb-4">Doctor Information</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faIdBadge} className="text-primary w-5 mr-3" />
                  {isEdit ? (
                    <input
                      className="bg-gray-50 p-2 border border-gray-300 rounded-lg w-full"
                      type="text"
                      placeholder="Doctor ID"
                      value={userData.doctorId || ''}
                      onChange={(e) => setUserData((prev) => ({ ...prev, doctorId: e.target.value }))}
                    />
                  ) : (
                    <p>Doctor ID: {userData.doctorId || 'Not provided'}</p>
                  )}
                </div>

                <div className="flex items-center">
                  <FontAwesomeIcon icon={faFileMedicalAlt} className="text-primary w-5 mr-3" />
                  {isEdit ? (
                    <input
                      className="bg-gray-50 p-2 border border-gray-300 rounded-lg w-full"
                      type="file"
                      onChange={(e) => setUserData((prev) => ({ ...prev, certificate: e.target.files[0] }))}
                    />
                  ) : (
                    <p>Medical Certificate: {userData.certificate ? 'Uploaded' : 'Not uploaded'}</p>
                  )}
                </div>

                <div className="flex items-center">
                  <FontAwesomeIcon icon={faCheck} className="text-primary w-5 mr-3" />
                  {isEdit ? (
                    <input
                      className="bg-gray-50 p-2 border border-gray-300 rounded-lg w-full"
                      type="text"
                      placeholder="Experience (Years)"
                      value={userData.experience || ''}
                      onChange={(e) => setUserData((prev) => ({ ...prev, experience: e.target.value }))}
                    />
                  ) : (
                    <p>Experience: {userData.experience || 'Not provided'}</p>
                  )}
                </div>

                <div className="flex items-center">
                  <FontAwesomeIcon icon={faCheck} className="text-primary w-5 mr-3" />
                  {isEdit ? (
                    <input
                      className="bg-gray-50 p-2 border border-gray-300 rounded-lg w-full"
                      type="text"
                      placeholder="Specialization"
                      value={userData.specialization || ''}
                      onChange={(e) => setUserData((prev) => ({ ...prev, specialization: e.target.value }))}
                    />
                  ) : (
                    <p>Specialization: {userData.specialization || 'Not provided'}</p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        <div className="mt-10 flex items-center justify-between">
          {isEdit ? (
            <button
              className="bg-primary text-white px-8 py-2 rounded-full hover:bg-primary-dark transition-all"
              onClick={() => setIsEdit(false)}
            >
              Save Information
            </button>
          ) : (
            <button
              className="bg-primary text-white px-8 py-2 rounded-full hover:bg-primary-dark transition-all"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
          )}
          {
            userData.role === 'Patient' && (

              <button
                className="bg-blue-500 text-white px-8 py-2 rounded-full hover:bg-blue-600 transition-all"
                onClick={() => setIsHealthCardOpen(true)}
              >
                View Health Card
              </button>)
          } 
        </div>
      </div>
      {userData.role === 'Patient' && (
      <div className='mt-12 w-full'>
        <p className='pb-3 font-semibold text-2xl text-indigo-700 border-b-2 border-indigo-300'>My Previous Appointments</p>
        <div className='mt-6 grid gap-6'>
          {doctors.slice(0,4).map((doctor, index) => (
            <div className='grid grid-cols-1 sm:grid-cols-[1fr_2fr_1fr] gap-4 bg-white p-6 rounded-lg shadow-md' key={index}>

              <div className='flex justify-center items-center'>
                <img className='w-32 h-32 rounded-full bg-indigo-50 object-cover' src={doctor.image} alt={doctor.name} />
              </div>

              <div className='text-sm text-gray-600'>
                <p className='text-lg font-semibold text-gray-800'>{doctor.name}</p>
                <p className='text-gray-500 mb-2'>{doctor.speciality}</p>
                
                <div className='mt-2'>
                  <p className='font-medium text-gray-700'>Address:</p>
                  <p className='text-xs'>{doctor.address.line1}</p>
                  <p className='text-xs'>{doctor.address.line2}</p>
                </div>

                <div className='mt-4'>
                  <p className='font-medium text-gray-700'>Date & Time:</p>
                  <p className='text-sm'>25, July 2024 | 8:30 PM</p>
                </div>
              </div>

              <div className='flex flex-col items-end gap-4 mt-4'>
                <button className='bg-green-500 text-white px-4 py-1 rounded-md flex items-center gap-2 hover:bg-green-600 transition-colors'>
                  <FontAwesomeIcon icon={faCheck} className='text-white' />
                  <span className='text-sm'>Completed</span>
                </button>
                <button
                  className='bg-blue-500 text-white px-4 py-1 rounded-md flex items-center gap-2 hover:bg-blue-600 transition-colors'
                  onClick={() => setIsPrescriptionOpen(true)}
                >
                  <FontAwesomeIcon icon={faPrescription} className='text-white' />
                  <span className='text-sm'>View Prescription</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}


      {isHealthCardOpen && <HealthCard userData={userData} closeModal={() => setIsHealthCardOpen(false)} />}

      {isPrescriptionOpen && (
        <PrescriptionModal 
          data={prescriptionData} 
          closeModal={() => setIsPrescriptionOpen(false)} 
        />
      )}
    </div>
  );
};

export default MyProfile;
