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

function ownerRoute() {
  return (
    <Routes>
      <Route element={<ProtectRoute/>}>

        <Route path='/profile' element={<Profile />} />
      </Route>
      <Route element={<OwnerLayout />}>
        <Route path='/' element={<Home />} />
      </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/otp' element={<OTP />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/property' element={<Property />} />
    </Routes>
  )
}

export default ownerRoute
