import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faTwitter, faLinkedin, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import Modal from '../components/Modal';
import axios from 'axios'; // Import axios for API calls

const Appointment = () => {
  const { docId } = useParams();
  const { currencySymbol } = useContext(AppContext); // Assuming currencySymbol is provided by context
  const [docInfo, setDocInfo] = useState(null);
  const [relatedDoctors, setRelatedDoctors] = useState([]);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch doctor information from the backend
  const fetchDocInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/auth/doctors/${docId}`); // Make sure this URL matches the backend
      setDocInfo(response.data);
    } catch (err) {
      console.error('Error fetching doctor data:', err);
    }
  };
  

  // Fetch related doctors from the backend based on the doctor’s specialty
  const fetchRelatedDoctors = async (specialization) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/auth/doctors?speciality=${specialization}`); // Assuming the backend route is /api/doctors?speciality=speciality
      const filteredDoctors = response.data.filter(doc => doc.doctorIdNo !== docId);
      setRelatedDoctors(filteredDoctors);
    } catch (err) {
      console.error('Error fetching related doctors:', err);
    }
  };

  useEffect(() => {
    if (docId) {
      fetchDocInfo();
    }
  }, [docId]);

  useEffect(() => {
    if (docInfo?.specialization) {
      fetchRelatedDoctors(docInfo.specialization);
    }
  }, [docInfo]);

  const handleAppointmentConfirm = () => {
    setIsAppointmentModalOpen(false);

  };

  const handleDoctorClick = (doctorId) => {
    navigate(`/appointment/${doctorId}`);
  };

  return docInfo && (
    <div className="container mx-auto px-4 py-4 max-w-6xl">
      <div className="text-3xl font-bold text-gray-800 mb-8">Doctor Details</div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side */}
        <div className="flex-1 lg:w-9/12">
          {/* Doctor Info Box */}
          <div className="bg-white shadow-lg rounded-lg p-8 border border-gray-300 mb-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-1/2 flex-shrink-0">
                <div className="bg-blue-50 border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500">
                  <img className="w-full h-72 object-cover" src={docInfo.image} alt={docInfo.fullName} />
                </div>
              </div>

              <div className="w-full lg:w-1/2">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">{docInfo.fullName}</h2>
                <div className="flex items-center gap-2 mb-4 text-gray-600 text-sm">
                  <FontAwesomeIcon icon={faGraduationCap} className="text-gray-500 text-lg" />
                  <p className="text-base">{docInfo.experience} years of experience</p>
                </div>
                <div className="flex items-center gap-2 mb-4 text-gray-600 text-sm">
                  <p className="text-base font-semibold">Appointment Fee: {currencySymbol}{docInfo.fees||200}</p>
                </div>
                <div className="flex items-center gap-2 mb-6">
                  <button className="bg-blue-200 text-blue-800 px-3 py-1 rounded-lg text-xs">
                    {docInfo.specialization}
                  </button>
                </div>
                <div className="flex gap-4 mb-6">
                  {docInfo.youtubeLink||<></> && (
                    <a href={docInfo.youtubeLink} target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon icon={faYoutube} className="text-red-600 text-xl hover:text-red-700" />
                    </a>
                  )}
                  {docInfo.linkedinLink||<></> && (
                    <a href={docInfo.linkedinLink} target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon icon={faLinkedin} className="text-blue-700 text-xl hover:text-blue-800" />
                    </a>
                  )}
                  {docInfo.twitterLink||<></> && (
                    <a href={docInfo.twitterLink} target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon icon={faTwitter} className="text-blue-400 text-xl hover:text-blue-500" />
                    </a>
                  )}
                  {docInfo.facebookLink||<></> && (
                    <a href={docInfo.facebookLink} target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon icon={faFacebook} className="text-blue-600 text-xl hover:text-blue-700" />
                    </a>
                  )}
                </div>
                <div className="flex flex-col gap-4">
                  <button
                    onClick={() => setIsAppointmentModalOpen(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg text-xs hover:bg-blue-600 transition duration-200"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-8 border border-gray-300">
            <h3 className="text-xl font-bold text-gray-800 mb-2">About Doctor</h3>
            <p className="text-gray-600">{docInfo.about||"Dr. John Smith is a board-certified family physician with over 15 years of experience in primary care, specializing in preventive medicine and patient-centered care."}</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-3/12">
          <div className="bg-white shadow-lg rounded-lg p-8 border border-gray-300">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Suggestions</h3>
            {relatedDoctors.length > 0 ? (
              relatedDoctors.map(doctor => (
                <div
                  key={doctor.doctorIdNo}
                  className="flex items-center mb-6 border-b border-gray-200 pb-4 cursor-pointer"
                  onClick={() => handleDoctorClick(doctor.doctorIdNo)}
                >
                  <div className="w-16 h-16 bg-blue-50 border border-blue-200 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={doctor.image}
                      alt={doctor.fullName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <button className="bg-blue-50 text-gray-800 px-2 py-1 rounded-md text-xs font-medium border border-blue-200">
                      {doctor.specialization}
                    </button>
                    <p className="text-gray-800 font-semibold mt-2">{doctor.fullName}</p>
                    <p className="text-gray-600 text-sm mt-1">{doctor.experience} years</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No suggestions available.</p>
            )}
          </div>
        </div>
        </div>

{/* Appointment Modal */}
<Modal
  isOpen={isAppointmentModalOpen}
  onClose={() => setIsAppointmentModalOpen(false)}
  onConfirm={handleAppointmentConfirm}
  type="Appointment"
  docId={docId}
/>
</div>
); };

export default Appointment;