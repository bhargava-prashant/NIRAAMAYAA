import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import QRCode from 'react-qr-code';
import html2canvas from 'html2canvas';

import { assets } from '../assets/assets';
import { formatUniqueId } from '../utils/formatUniqueId'; // Import the utility function

const HealthCard = ({ userData, closeModal }) => {
  const cardNumber = formatUniqueId(userData.uniqueId);

  const downloadCard = () => {
    const healthCardElement = document.querySelector("#health-card");

    html2canvas(healthCardElement, { scale: 2 }).then(canvas => { // Increased scale for better resolution
      const ctx = canvas.getContext('2d');

      const originalWidth = canvas.width;
      const originalHeight = canvas.height;

      // Calculate the new dimensions
      const leftCrop = originalWidth * 0.045; // 2% from both sides
      const rightCrop = originalWidth * 0.045; // 2% from both sides
      const topCrop = originalHeight * 0.05; // 5% from top
      const bottomCrop = originalHeight * 0.2; // 20% from bottom (same as before)

      const newWidth = originalWidth - leftCrop - rightCrop;
      const newHeight = originalHeight - topCrop - bottomCrop;

      // Create a new canvas to adjust the dimensions
      const croppedCanvas = document.createElement('canvas');
      croppedCanvas.width = newWidth;
      croppedCanvas.height = newHeight;

      const croppedCtx = croppedCanvas.getContext('2d');

      // Draw the cropped part on the new canvas
      croppedCtx.drawImage(
        canvas,
        leftCrop, // X position of the crop
        topCrop, // Y position of the crop
        newWidth, // Width of the cropped area
        newHeight, // Height of the cropped area
        0, // X position on the new canvas
        0, // Y position on the new canvas
        newWidth, // Width on the new canvas
        newHeight // Height on the new canvas
      );

      const imgData = croppedCanvas.toDataURL('image/png');

      // Create a temporary link element
      const link = document.createElement('a');
      link.href = imgData;
      link.download = userData.fullName+'.png'; // Set the file name
      link.click(); // Trigger the download
    });
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
      <div id="health-card" className='bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full relative'>

        <button onClick={closeModal} className='absolute top-4 right-4 text-gray-600 hover:text-gray-900'>
          <FontAwesomeIcon icon={faTimes} size='lg' />
        </button>

        <div className='bg-gray-100 text-black rounded-lg p-8'>
          <div className='flex items-center'>
            <img src={assets.logo} alt='Company Logo' className='w-24 h-auto' />
          </div>

          <div className='flex mt-6'>
            <img
              className='w-48 h-32 rounded-lg object-cover border-2 border-gray-300'
              src={assets.profile_pic}
              alt='Profile'
            />
            <div className='ml-6 flex-grow'>
              <p className='text-2xl font-semibold text-gray-800'>{userData.fullName}</p>
              <p className='text-sm mt-1 text-gray-600'>Date of Birth: {userData.dateOfBirth}</p>
              <p className='text-sm mt-1 text-gray-600'>Phone: {userData.phoneNo}</p>
              <p className='text-sm mt-1 text-gray-600'>Gender: {userData.gender}</p>
              <p className='text-sm mt-1 text-gray-600'>Address: {userData.address}</p>
            </div>
          </div>

          <div className='flex justify-between items-center mt-6'>
            <QRCode value={userData.uniqueId} size={128} /> {/* Display QR code with unique ID */}

            <div className='text-right'>
              <p className='text-lg font-semibold tracking-widest text-gray-800'>{cardNumber}</p>
              <p className='text-xl font-semibold mt-2 text-gray-800'>Prescripto</p>
            </div>
          </div>

          <div className='mt-6 border-t border-gray-300 pt-4'>
            <p className='text-sm text-center text-gray-600'>
              All rights reserved by @<span className='font-semibold'>Prescripto</span>.
            </p>
          </div>
        </div>

        <div className='mt-6 text-center'>
          <button onClick={downloadCard} className='bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700'>
            Download Card
          </button>
        </div>
      </div>
    </div>
  );
};

HealthCard.propTypes = {
  userData: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    dateOfBirth: PropTypes.string.isRequired,
    phoneNo: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    uniqueId: PropTypes.string.isRequired // Ensure uniqueId is included
  }).isRequired, 
  closeModal: PropTypes.func.isRequired, 
};

export default HealthCard;