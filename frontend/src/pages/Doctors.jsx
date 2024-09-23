import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Doctors = () => {
  const { speciality } = useParams();  // Fetches speciality from the route params
  const [docData, setDoctors] = useState([]);  // State to store all doctors
  const [loading, setLoading] = useState(true);  // Loading state
  const [filterDoc, setFilterDoc] = useState([]);  // State for filtered doctors
  const navigate = useNavigate();  // To navigate between routes

  // Function to apply filtering based on speciality
  const applyFilter = () => {
    if (docData.length) {
      if (speciality) {
        setFilterDoc(docData.filter(doc => 
          doc.specialization.trim().toLowerCase() === speciality.trim().toLowerCase()
        ));
      } else {
        setFilterDoc(docData);
      }
    }
  };
  
  

  // Fetch doctors data from API
  useEffect(() => {
    const fetchAllDoctors = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/users');
        setDoctors(res.data);  // Set the fetched doctors in state
        setLoading(false);
      } catch (err) {
        console.error('Error fetching doctors:', err);
        setLoading(false);
      }
    };

    fetchAllDoctors();
  }, []);

  // Apply filter whenever the doctors list or speciality changes
  useEffect(() => {
    applyFilter();
  }, [docData, speciality]);

  if (loading) {
    return <p>Loading doctors...</p>;  // Show loading state while fetching data
  }

  return (
    <div>
      <p className='text-gray-600'>Browse through the doctors specialist.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        {/* List of Specialities */}
        <div className='flex flex-col gap-4 text-sm text-gray-600'>
          <p onClick={() => navigate('/doctors/General physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "General physician" ? "bg-indigo-100 text-black" : "" }`}>
            General physician
          </p>
          <p onClick={() => navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gynecologist" ? "bg-indigo-100 text-black" : "" }`}>
            Gynecologist
          </p>
          <p onClick={() => navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Dermatologist" ? "bg-indigo-100 text-black" : "" }`}>
            Dermatologist
          </p>
          <p onClick={() => navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Pediatricians" ? "bg-indigo-100 text-black" : "" }`}>
            Pediatricians
          </p>
          <p onClick={() => navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Neurologist" ? "bg-indigo-100 text-black" : "" }`}>
            Neurologist
          </p>
          <p onClick={() => navigate('/doctors/Gastroenterologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gastroenterologist" ? "bg-indigo-100 text-black" : "" }`}>
            Gastroenterologist
          </p>
        </div>

        {/* Filtered Doctors */}
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {filterDoc.length > 0 ? (
            filterDoc.map((item) => (
              <div
                className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
                key={item.doctorIdNo}
              >
                <img className='bg-blue-50 w-full h-48 object-cover' src={item.image} alt={item.fullName} />
                <div className='p-4'>
                  <div className='flex items-center gap-2 text-sm text-green-500'>
                    <span className='w-2 h-2 bg-green-500 rounded-full'></span>
                    <p>Available</p>
                  </div>
                  <p className='font-medium text-lg'>{item.fullName}</p>
                  <p className='text-gray-500'>{item.specialization}</p>

                  {/* Link to book appointment using doctor ID */}
                  <div onClick={() => navigate(`/appointment/${item.doctorIdNo}`)}>
                    <button className='mt-4 w-full py-2 text-white bg-gradient-to-r from-green-400 to-blue-500 rounded-md hover:from-green-500 hover:to-blue-600 transition-transform transform hover:scale-105'>
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No doctors available for this specialty.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
