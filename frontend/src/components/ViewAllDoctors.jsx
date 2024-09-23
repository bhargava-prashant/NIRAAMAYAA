import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';

const ViewAllDoctors = () => {
  const { setDoctors } = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/users');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched doctors:", data);
      setDoctors(data);  // Update AppContext doctors
      setFilterDoc(data);  // Update local state
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleDeleteDoctor = async (doctorIdNo) => {
    try {
      await fetch(`http://localhost:5000/api/auth/doctors/${doctorIdNo}`, {
        method: 'DELETE',
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      });

      // Update local state after deletion
      const updatedFilterDocs = filterDoc.filter((doc) => doc.doctorIdNo !== doctorIdNo);
      setFilterDoc(updatedFilterDocs);
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  return (
    <div>
      <p className='text-gray-600 mb-4'>Manage doctors in the admin portal.</p>
      {loading ? (
        <p>Loading doctors...</p>
      ) : error ? (
        <p className='text-red-500'>{`Error: ${error}`}</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filterDoc.length > 0 ? filterDoc.map((item) => (
            <div
              className='border border-blue-200 rounded-xl overflow-hidden shadow-lg transition-transform hover:translate-y-[-5px] duration-300'
              key={item.doctorIdNo}  // Use doctorIdNo as the key
            >
              <img
                className='bg-blue-50 w-full h-48 object-cover'
                src={item.image || 'default-image.jpg'}
                alt={item.fullName}
              />
              <div className='p-4'>
                <p className='font-medium text-lg mt-2'>{item.fullName}</p>
                <p className='text-gray-500 mb-4'>{item.specialization}</p>
                <div className='flex gap-2'>
                  <button
                    onClick={() => handleDeleteDoctor(item.doctorIdNo)}  // Use doctorIdNo for delete
                    className='flex-1 py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition'
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )) : <p>No doctors found.</p>}
        </div>
      )}
    </div>
  );
};

export default ViewAllDoctors;
