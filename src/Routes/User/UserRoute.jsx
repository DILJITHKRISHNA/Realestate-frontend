import React from 'react'
import {Routes, Route} from "react-router-dom"
import LoginPage from '../../pages/User/LoginPage/Login';
import SignUpPage from '../../Components/User/SignUp/SignUpPage';
import OtpPage from '../../Components/User/OtpPage/OtpPage';
import ProfilePage from '../../Components/User/Profile/ProfilePage';
import HomePage from '../../pages/User/HomePage/HomePage';


function UserRoute() {

  return (
    <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/signup' element={<SignUpPage/>}/>
        <Route path='/otp' element={<OtpPage/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
    </Routes>
   
  )
} 

export default UserRoute
