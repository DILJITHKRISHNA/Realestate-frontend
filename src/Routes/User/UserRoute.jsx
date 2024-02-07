import React from 'react'
import { Routes, Route } from "react-router-dom"
import LoginPage from '../../pages/User/LoginPage/Login';
import SignUpPage from '../../pages/User/SignUpPage/SignUp.jsx';
import Otp from '../../pages/User/OtpPage/Otp.jsx';
import ProfilePage from '../../pages/User/ProfilePage/Profile.jsx';
import HomePage from '../../pages/User/HomePage/HomePage';
import UserLayout from '../../Layouts/UserLayout/UserLayout';
import ProtectRoutes from './Protect/ProtectRoute';
import Property from '../../pages/User/PropertyPage/Property.jsx';

function UserRoute() {

  return (
    <Routes>

      <Route element={<UserLayout />}>
        <Route path='/' element={<HomePage />} />
        <Route element={<ProtectRoutes />}>
          <Route path='/profile' element={<ProfilePage />} />
        </Route>
        <Route path='/property' element={<Property />} />
      </Route>
      <Route path='/otp' element={<Otp />} />
      <Route path='/signup' element={<SignUpPage />} />
      <Route path='/login' element={<LoginPage />} />
    </Routes>

  )
}

export default UserRoute
