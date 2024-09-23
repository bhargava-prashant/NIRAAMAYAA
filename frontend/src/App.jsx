import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MyProfile from './pages/MyProfile';
import Login from './pages/Login';
import Doctors from './pages/Doctors';
import About from './pages/About';
import Contact from './pages/Contact';
import Myappointment from './pages/Myappointment';
import Appointment from './pages/Appointment';
import Navbar from './components/Navbar';
import SignUp from './pages/signup';
import Footer from './components/Footer'; 
import DoctorDashboard from './pages/DoctorDashBoard';
import AdminDashboard from './pages/AdminDashboard'; 
import Chatbot from './components/Chatbox';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  return (
    
    <div className='mx-4 sm:mx-[3%]'>

      <Navbar loggedIn={loggedIn} />

      {loggedIn &&(
        <Chatbot />
      )}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        
        <Route path='/login' element={<Login setLoggedIn={setLoggedIn} />} />
        
        <Route path="/signup" element={<SignUp />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
        
        {loggedIn && (
          <>
            <Route path='/admin-dashboard/*' element={<AdminDashboard />} />
            <Route path='/my-profile' element={<MyProfile />} />
            <Route path='/my-appointments' element={<Myappointment />} />
            <Route path='/appointment/:docId' element={<Appointment />} />
            <Route path='/doctor-dashboard/*' element={<DoctorDashboard />} />
          </>
        )}
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
