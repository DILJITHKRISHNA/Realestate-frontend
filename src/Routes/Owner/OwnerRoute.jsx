import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from '../../pages/Owner/HomePage/Home.jsx'
import Signup from '../../pages/Owner/SignUpPage/Signup.jsx'
import Login from '../../pages/Owner/LoginPage/Login.jsx'
import OTP from '../../Components/Owner/OtpPage/OTP.jsx'
import OwnerLayout from '../../Layouts/OwnerLayout/OwnerLayout.jsx'
import ProtectRoute from './Protect/ProtectRoutes.jsx'
import Profile from '../../pages/Owner/ProfilePage/Profile.jsx'
import Property from '../../pages/Owner/PropertyPage/Property.jsx'
import Bookings from '../../pages/Owner/BookingPage/Bookings.jsx'

function ownerRoute() {
  return (
    <Routes>
      <Route element={<ProtectRoute />}>

        <Route element={<OwnerLayout />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/' element={<Home />} />
          <Route path='/property' element={<Property />} />
          <Route path='/bookings' element={<Bookings />} />
        </Route>
      </Route>
      <Route path='/otp' element={<OTP />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}

export default ownerRoute
