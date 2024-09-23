import React from 'react'
import { assets } from '../assets/assets'

const FeaturePage = () => {
  const features = [
    { title: 'Video Call', image: assets.videocall },
    { title: 'Appointment Scheduling', image: assets.appoint },
    { title: 'Health Card', image: assets.healthcard },
    { title: 'Prescription Management', image: assets.pres }
  ]

  return (
    <div className='flex flex-col items-center gap-8 py-5 px-4 text-gray-900'>
      <h1 className='text-4xl font-semibold'>Our Feature Highlights</h1>
      <p className='sm:w-2/3 text-center text-lg text-gray-600'>Check out some of our amazing features.</p>


      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pt-8'>
        {features.map((feature, index) => (
          <div 
            key={index} 
            className='group border border-blue-200 rounded-xl overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-500'
          >
           
            <div className='overflow-hidden'>
              <img 
                className='bg-blue-50 w-full h-48 object-cover transform transition-transform duration-500 group-hover:scale-110' 
                src={feature.image} 
                alt={feature.title} 
              />
            </div>

            <div className='p-4'>
              <p className='text-center text-gray-700 font-medium group-hover:text-blue-600 transition-colors duration-300'>
                {feature.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeaturePage
