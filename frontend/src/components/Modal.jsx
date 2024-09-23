import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Modal = ({ isOpen, onClose, onConfirm, docId }) => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [userData, setUserData] = useState(null);
  const [appointmentType, setAppointmentType] = useState('');
  const navigate = useNavigate();

  // Fetch user data when the modal is open
  useEffect(() => {
    if (isOpen) {
      const fetchUserProfile = async () => {
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
        } catch (err) {
          console.error('Error fetching profile:', err);
        }
      };

      fetchUserProfile();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    const formattedDate = date.toISOString().split('T')[0];
    const appointmentData = {
        doctorId: docId,
        fullName: userData.fullName,
        dateOfBirth: userData.dateOfBirth,
        gender: userData.gender,
        phoneNo: userData.phoneNo,
        appointmentTime: time,
        appointmentDate: formattedDate,
        patientSummary: '',
        completionStatus: false,
        appointmentType: appointmentType,
        meetingId: Math.random().toString(36).substr(2, 10)
    };
  
    try {
        const response = await fetch('http://localhost:5000/api/auth/appointments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token'),
            },
            body: JSON.stringify(appointmentData),
        });

        if (!response.ok) {
            throw new Error('Failed to save appointment');
        }

        toast.success('Appointment successful');

        onConfirm();
        navigate(`/appointment/${docId}`);
    } catch (error) {
        console.error('Error saving appointment:', error);
    }
};




  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-600 hover:text-gray-900">
          &times;
        </button>
        <div className="flex gap-6">
          <div className="flex-1 border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Select Date</h3>
            <Calendar onChange={setDate} value={date} className="react-calendar" />
            <style>
              {`
                .react-calendar {
                  border: 1px solid #ddd;
                  border-radius: 0.5rem;
                }
                .react-calendar__month-view__days__day {
                  border-radius: 0.5rem;
                  width: 2.5rem;
                  height: 2.5rem;
                  line-height: 2.5rem;
                  text-align: center;
                  font-size: 1rem;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                }
                .react-calendar__navigation button {
                  font-size: 0.875rem;
                }
                .react-calendar__month-view__days__day--neighboringMonth {
                  color: #b0b0b0;
                }
                .react-calendar__month-view__days__day--current {
                  background: #007bff;
                  color: white;
                }
                .react-calendar__month-view__days__day:hover {
                  background: #e2e8f0;
                  color: #1a202c;
                }
                .react-calendar__month-view__days__day--weekend {
                  color: #4a5568;
                }
              `}
            </style>
          </div>

          <div className="flex-1 border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Select Time</h3>
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 16 }, (_, i) => {
                const hour = Math.floor(i / 2) + 9;
                const minutes = (i % 2) * 30;
                const formattedHour = hour > 12 ? hour - 12 : hour;
                const period = hour >= 12 ? 'PM' : 'AM';
                const timeSlot = `${formattedHour}:${minutes === 0 ? '00' : minutes} ${period}`;

                return (
                  <button
                    key={timeSlot}
                    onClick={() => setTime(timeSlot)}
                    className={`border rounded-md py-2 px-2 text-xs ${
                      time === timeSlot ? 'bg-blue-500 text-white' : 'bg-white text-gray-800 hover:bg-gray-100'
                    }`}
                  >
                    {timeSlot}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={() => setAppointmentType('offline')}
            className={`w-full py-2 px-4 rounded-lg ${appointmentType === 'offline' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
          >
            Book Offline Appointment
          </button>
          <button
            onClick={() => setAppointmentType('videocall')}
            className={`w-full py-2 px-4 rounded-lg ${appointmentType === 'videocall' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
          >
            Book Video Call
          </button>
        </div>
        

        <button
          onClick={handleConfirm}
          disabled={!appointmentType}  // Disable if no type is selected
          className={`mt-4 w-full py-2 rounded-lg ${appointmentType ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 cursor-not-allowed'}`}>
          Confirm {appointmentType ? appointmentType.charAt(0).toUpperCase() + appointmentType.slice(1) : 'Appointment'}
        </button> 
      </div>
      <ToastContainer />
    </div> 
  );
};

export default Modal;
