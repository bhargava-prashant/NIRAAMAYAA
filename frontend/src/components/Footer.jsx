import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div>
            {/* left section */}
            <img className='mb-5 w-40' src={assets.logo} alt="" />
            <p className='w-full md:w-2/3 text-gray-600 leading-6'>Your trusted partner in seamless healthcare. Schedule your appointments online and stay connected with your healthcare provider anytime, anywhere.</p>
        </div>
        <div>
            {/* Center section */}
            <p className='text-xl mb-5 font-medium'>COMPANY</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>Home</li>
                <li>About us</li>
                <li>Contact us</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div>
            {/* Right section */}
            <p className='text-xl mb-5 font-medium'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>+91 789-378-0925</li>
                <li>medprotal@gmail.com</li>
            </ul>
        </div>

    </div>
        <div>
            {/* copyright */}
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2024@ Medportal - All Right Reserved</p>
        </div>
    </div>
  )
}

export default Footer