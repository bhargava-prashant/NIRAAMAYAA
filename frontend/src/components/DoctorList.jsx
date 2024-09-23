import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const DoctorList = () => {
  const {doctors} = useContext(AppContext)

  const navigate = useNavigate()
  return (
    <div className='flex flex-col items-center gap-4 py-3 text-gray-900 md:mx-10'>
      <h1 className='text-3xl font-medium'>Popular Doctors</h1>
      <p className='sm:w-1/3 text-center text-sm'>
        Simply browse through our extensive list of trusted doctors and book your appointment instantly.
      </p>

      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-5 px-3 sm:px-0'>
        {doctors.slice(0, 4).map((item, index) => (
          <div
            className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
            key={index}
          >
            <img className='bg-blue-50 w-full h-48 object-cover' src={item.image} alt={item.name} />
            <div className='p-4'>
              <div className='flex items-center gap-2 text-sm text-green-500'>
                <span className='w-2 h-2 bg-green-500 rounded-full'></span>
                <p>Available</p>
              </div>
              <p className='font-medium text-lg'>{item.name}</p>
              <p className='text-gray-500'>{item.speciality}</p>


              <div onClick={() => navigate(`/appointment/${item._id}`)}>
                <button className='mt-4 w-full py-2 text-white bg-gradient-to-r from-green-400 to-blue-500 rounded-md hover:from-green-500 hover:to-blue-600 transition-transform transform hover:scale-105'>
                  Book Now
                </button>
              </div>


            </div>
          </div>
        ))}
      </div>

      <Link to='/doctors'>
        <button className='mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition'>
          More
        </button>
      </Link>
    </div>
  )
}

export default DoctorList
