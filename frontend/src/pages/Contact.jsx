import React from 'react';
import { assets } from '../assets/assets'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhoneAlt, faEnvelope, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
 
    navigate('/');
  };

  return (
    <div className="relative">
      {/* Background Image */}
      <div className="absolute inset-0 h-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${assets.contact_image})`, opacity: 0.8 }}></div>

      {/* Overlay for dark effect */}
      <div className="absolute inset-0 h-full bg-gray-900 bg-opacity-50"></div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white">Get in Touch with Us</h1>
          <p className="text-gray-300 mt-4">We're here to help and answer any questions you might have. We look forward to hearing from you.</p>
        </div>

        {/* Contact Info and Form */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          {/* Contact Information */}
          <div className="w-full md:w-1/2 bg-white bg-opacity-90 p-8 rounded-lg shadow-lg flex flex-col justify-between h-full">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <FontAwesomeIcon icon={faBuilding} className="text-blue-600" /> Our Office
              </h2>
              <p className="mb-4 text-gray-600">Our team is always ready to assist you. If you’re nearby, feel free to drop by our office at the address below. We'd be happy to welcome you and discuss any inquiries in person.</p>
              <div className="mb-4 flex items-center">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-600 mr-3" />
                <span className="text-lg text-gray-600">00000 Willms Station, Suite 000, Washington, USA</span>
              </div>
              <div className="mb-4 flex items-center">
                <FontAwesomeIcon icon={faPhoneAlt} className="text-blue-600 mr-3" />
                <span className="text-lg text-gray-600"><span className="font-bold">Tel:</span> (000) 000-0000</span>
              </div>
              <div className="mb-6 flex items-center">
                <FontAwesomeIcon icon={faEnvelope} className="text-blue-600 mr-3" />
                <span className="text-lg text-gray-600"><span className="font-bold">Email:</span> greatstackdev@gmail.com</span>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Careers at Prescripto</h3>
              <p className="text-gray-500">Looking to make a difference in healthcare? Explore exciting career opportunities and be a part of a passionate team that's reshaping the future of healthcare services. <span className="text-blue-600 font-semibold cursor-pointer">Join Us</span>.</p>
            </div>
          </div>

          {/* Feedback Form */}
          <div className="w-full md:w-1/2 bg-white bg-opacity-90 p-8 rounded-lg shadow-lg h-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                type="text"
                className="border border-gray-300 rounded-lg p-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Name"
                required
              />
              <input
                type="email"
                className="border border-gray-300 rounded-lg p-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Email"
                required
              />
              <input
                type="tel"
                className="border border-gray-300 rounded-lg p-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Phone No."
                required
              />
              <textarea
                className="border border-gray-300 rounded-lg p-3 h-32 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Query"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition-all duration-500 mt-4"
              >
                Submit Query
              </button>
            </form>
          </div>
        </div>

        {/* Google Map */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-white mb-6">Our Location</h2>
          <iframe
            className="w-full h-96 rounded-lg shadow-lg"
            title="Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3424.0644814742927!2d75.70204631507171!3d31.255366181459487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a5b00e92a2bff%3A0x75f0b5f373dae780!2sLovely%20Professional%20University!5e0!3m2!1sen!2sin!4v1694513526654!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
