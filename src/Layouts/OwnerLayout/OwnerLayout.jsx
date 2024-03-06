import React from 'react'
import OwnerHeader from '../../Components/Owner/OwnerHeader/Header.jsx'
import { Outlet } from 'react-router-dom' 
import Footer from '../../Components/User/Footer/Footer.jsx'

function OwnerLayout() {
  return (
    <div>
      <OwnerHeader/>
      <Outlet/>
      {/* <Footer/> */}
    </div>
  )
}

export default OwnerLayout
