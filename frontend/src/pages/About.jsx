import React from 'react';
import { assets } from '../assets/assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const About = () => {
  return (
    <div className="relative">




      <div className="relative z-10 container mx-auto px-6 py-20 text-black">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">About Us</h1>
          <p className="text-lg text-black-300 max-w-2xl mx-auto">At Prescripto, we aim to revolutionize how people access and manage healthcare. Whether you're booking an appointment or maintaining health records, we're here to make it seamless.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-10 my-10">
          <img className="w-full md:max-w-[400px] rounded-lg shadow-lg" src={assets.about_image} alt="About Us" />

          <div className="flex flex-col justify-center gap-6 text-lg text-black-300">
            <p>
              <span className="font-semibold text-black-800">Welcome to Prescripto,</span> your trusted partner in managing healthcare needs efficiently. We understand the challenges individuals face in scheduling appointments and managing health records.
            </p>
            <p>
              Our platform is continuously evolving with the latest healthcare technology, offering an enhanced user experience and personalized care for every patient.
            </p>
            <h2 className="font-bold text-2xl text-black mt-4">Our Vision</h2>
            <p className='text-black-300'>
              Our vision is to provide seamless healthcare access, ensuring patients connect with the right professionals when they need them most. We strive to break down barriers in healthcare and make quality services available to everyone.
            </p>
          </div>
        </div>

        <div className="text-center mt-20">
          <h2 className="text-4xl font-bold text-black">Why Choose Us</h2>
          <p className="text-lg text-black-300 mt-4">We bring convenience, efficiency, and personalization to healthcare services, helping you stay on top of your health.</p>
        </div>


        <div className="flex flex-col md:flex-row justify-center gap-6 mt-12">
          <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 hover:bg-gray-100 hover:text-gray-700 transition-all duration-300 text-gray-700 text-center flex-1">
            <FontAwesomeIcon icon={faCheckCircle} className="text-4xl text-blue-600 mb-4" />
            <h3 className="font-bold text-2xl mb-2">Efficiency</h3>
            <p className="text-gray-500 hover:text-gray-700">Streamlined appointment scheduling that fits into your busy lifestyle.</p>
          </div>

          <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 hover:bg-gray-100 hover:text-gray-700 transition-all duration-300 text-gray-700 text-center flex-1">
            <FontAwesomeIcon icon={faCheckCircle} className="text-4xl text-blue-600 mb-4" />
            <h3 className="font-bold text-2xl mb-2">Convenience</h3>
            <p className="text-gray-500 hover:text-gray-700">Access to a network of trusted healthcare professionals in your area.</p>
          </div>

          <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 hover:bg-gray-100 hover:text-gray-700 transition-all duration-300 text-gray-700 text-center flex-1">
            <FontAwesomeIcon icon={faCheckCircle} className="text-4xl text-blue-600 mb-4" />
            <h3 className="font-bold text-2xl mb-2">Personalization</h3>
            <p className="text-gray-500 hover:text-gray-700">Tailored recommendations and reminders to help you stay on top of your health.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
