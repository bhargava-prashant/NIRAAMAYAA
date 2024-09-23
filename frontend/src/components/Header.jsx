import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { assets } from '../assets/assets';

const images = [
  {
    src: 'https://plus.unsplash.com/premium_photo-1681996484614-6afde0d53071?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Slide 1'
  },
  {
    src: 'https://plus.unsplash.com/premium_photo-1661766718556-13c2efac1388?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Slide 2'
  },
  {
    src: 'https://plus.unsplash.com/premium_photo-1661758899958-050ce4481f35?q=80&w=1954&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Slide 3'
  }
];

const Header = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 2000); 
    return () => clearInterval(interval); 
  }, []);

  return (
    <div className='relative w-full h-[60vh] overflow-hidden'> 
      {/* Slider Section */}
      <div className='absolute inset-0'>
        <img
          className='w-full h-full object-cover'
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
        />
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className='absolute left-4 top-1/2 transform -translate-y-1/2 bg-black text-white p-3 rounded-full z-10'
        >
          ❮
        </button>
        <button
          onClick={nextSlide}
          className='absolute right-4 top-1/2 transform -translate-y-1/2 bg-black text-white p-3 rounded-full z-10'
        >
          ❯
        </button>
        {/* Slide Dots */}
        <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2'>
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-500'}`}
            ></div>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className='absolute inset-0 flex flex-col md:flex-row items-center justify-center md:justify-between px-6 md:px-10 lg:px-20 bg-black bg-opacity-60'>
        <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 text-white'>
          <p className='text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight'>
            Book Appointment <br />With Trusted Doctors
          </p>
          <div className='flex flex-col items-start justify-center gap-3 text-sm font-light'>
            <img
              src={assets.group_profiles}
              alt="Group Profiles"
              className='w-28'
            />
            <p className='text-base md:text-lg'>
              Simply browse through our extensive list of trusted doctors,<br className='hidden sm:block' />
              schedule your appointment hassle-free.
            </p>
          </div>
          <a
            href="#speciality"
            className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm hover:scale-105 transition-transform duration-300'
          >
            Book Appointment <img className='w-3' src={assets.arrow_icon} alt="Arrow Icon" />
          </a>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Header;
