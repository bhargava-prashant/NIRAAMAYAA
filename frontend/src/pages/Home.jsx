import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import Banner from '../components/Banner'
import DoctorList from '../components/DoctorList'
import FeaturePage from '../components/Features'


const Home = () => {
  return (
    <div>
      <Header />
      <SpecialityMenu />
      <DoctorList />
      <FeaturePage />
      <Banner />
    </div>
  )
}

export default Home