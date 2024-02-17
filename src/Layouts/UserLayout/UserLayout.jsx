import React from 'react'
import HeaderNav from '../../Components/User/Header/HeaderNav.jsx'
import { Outlet } from 'react-router-dom'
import Footer from '../../Components/User/Footer/Footer.jsx'

function UserLayout() {
  return (
    <div>
      <HeaderNav />
      <Outlet />
      <div className='mt-20'>
        <Footer />
      </div>
    </div>
  )
}

export default UserLayout
