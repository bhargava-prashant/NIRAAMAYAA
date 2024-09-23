// doctor
import { useState, useEffect } from 'react';
import { FaCalendarAlt, FaClock, FaTimes, FaCheckCircle, FaLink } from 'react-icons/fa'; // Removed FaVideo
import ViewMedicalHistory from '../components/ViewPatientHistory';
import { assets } from '../assets/assets';
import axios from 'axios';

const ViewAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [cancelledAppointments, setCancelledAppointments] = useState({});
  const [showMedicalHistory, setShowMedicalHistory] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

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
        setUserData(profileRes.data);

        const appointmentsRes = await axios.get(`http://localhost:5000/api/auth/appointments/${profileRes.data.doctorIdNo}`, config);

        const filteredAppointments = appointmentsRes.data.filter(
          (appointment) => appointment.completionStatus === false
        );

        setAppointments(filteredAppointments);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setLoading(false);
      }
    };

    fetchProfileAndAppointments();
  }, []);

  const handleApprove = async (meetingId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const config = {
        headers: {
          'x-auth-token': token,
        },
      };

      await axios.post(`http://localhost:5000/api/auth/approve/${meetingId}`, { approval: true }, config);

      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.meetingId === meetingId ? { ...appointment, approval: true } : appointment
        )
      );
    } catch (err) {
      console.error('Error approving appointment:', err);
    }
  };

  const handleCancel = async (meetingId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const config = {
        headers: {
          'x-auth-token': token,
        },
      };

      await axios.post(`http://localhost:5000/api/appointments/approve/${meetingId}`, { approval: false }, config);

      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment.meetingId !== meetingId)
      );

      setCancelledAppointments((prev) => ({
        ...prev,
        [meetingId]: true,
      }));
    } catch (err) {
      console.error('Error cancelling appointment:', err);
    }
  };

  const openMedicalHistory = () => {
    setShowMedicalHistory(true);
  };

  const closeMedicalHistory = () => {
    setShowMedicalHistory(false);
  };

  const medicalHistoryData = {
    appointmentsInLastYear: 15,
    majorDiseases: ['Hypertension', 'Diabetes', 'Asthma'],
  };

  const copyMeetingIdAndRedirect = (meetingId) => {
    // Copy to clipboard
    navigator.clipboard.writeText(meetingId).then(() => {
      // Redirect to the meeting URL
      window.location.href = `https://t0xicat.github.io/Medi-call/lobby.html`;
    });
  };

  if (loading) {
    return <p>Loading appointments...</p>;
  }

  return (
    <div className='mt-6 grid gap-6'>
      {appointments.map((appointment) => (
        <div
          key={appointment.meetingId}
          className='grid grid-cols-1 sm:grid-cols-[1fr_2fr_1fr] gap-4 bg-white p-6 rounded-lg shadow-md'
        >
          <div className='flex justify-center items-center'>
            <img
              src={assets.profile_pic}
              alt='Patient'
              className='w-48 h-32 object-cover rounded-lg bg-indigo-50'
            />
          </div>

          <div className='text-sm text-gray-600'>
            <div className="flex items-center space-x-4">
              <p className='text-lg font-semibold text-gray-800'>{appointment.fullName}</p>
              { appointment.appointmentType === 'videocall' &&
                (<button
                onClick={() => copyMeetingIdAndRedirect(appointment.meetingId)}
                className='flex items-center bg-white text-black border border-black px-3 py-1 rounded-md text-sm hover:bg-blue-300 transition duration-300'
              >
                <span>Meeting ID: {appointment.meetingId}</span> 
                <FaLink className="ml-2" />
              </button>)}
            </div>

            <div className='flex items-center text-gray-600 mb-2'>
              <FaCalendarAlt className='mr-2' />
              <p>Date: {appointment.appointmentDate}</p>
            </div>
            <div className='flex items-center text-gray-600 mb-4'>
              <FaClock className='mr-2' />
              <p>Time: {appointment.appointmentTime}</p>
            </div>
            <div className='flex items-center gap-2 text-sm text-green-500'>
              <span className='w-2 h-2 bg-green-500 rounded-full'></span>
              <p>{appointment.appointmentType.toUpperCase()}</p>
            </div>

            {cancelledAppointments[appointment.meetingId] ? (
              <p className='text-red-500 font-semibold'>Cancelled</p>
            ) : (
              <div className='flex items-center space-x-2'>
                {appointment.approval ? (
                  <div className='flex items-center space-x-2'>
                    <FaCheckCircle className='text-green-500 text-lg' />
                    <p className='text-green-500 font-semibold'>Approved</p>
                  </div>
                ) : null}
              </div>
            )}
          </div>

          <div className='flex flex-col justify-center gap-2'>
            {appointment.approval ? (
              <button className='bg-blue-500 text-white px-3 py-2 rounded-md text-sm hover:bg-blue-600 transition duration-300'>
                Complete
              </button>
            ) : (
              <button
                onClick={() => handleApprove(appointment.meetingId)}
                className='bg-green-500 text-white px-3 py-2 rounded-md text-sm hover:bg-green-600 transition duration-300'
              >
                Approve Appointment
              </button>
            )}

            <button
              onClick={() => handleCancel(appointment.meetingId)}
              className='bg-red-500 text-white px-3 py-2 rounded-md text-sm hover:bg-red-600 transition duration-300'
            >
              Cancel Appointment
            </button>

            <button
              onClick={openMedicalHistory}
              className='bg-blue-500 text-white px-3 py-2 rounded-md text-sm hover:bg-blue-600 transition duration-300'
            >
              View Medical History
            </button>
          </div>
        </div>
      ))}

      {showMedicalHistory && (
        <ViewMedicalHistory data={medicalHistoryData} closeModal={closeMedicalHistory} />
      )}
    </div>
  );
};

export default ViewAppointments;