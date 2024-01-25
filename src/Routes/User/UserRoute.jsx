import React from 'react'
import {Routes, Route} from "react-router-dom"
import HomePage from "../../pages/User/HomePage/HomePage"
import LoginPage from '../../pages/User/LoginPage/Login';
import SignUpPage from '../../Components/User/SignUp/SignUpPage';
import OtpPage from '../../Components/User/OtpPage/OtpPage';

function UserRoute() {

  return (
   
    <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/signup' element={<SignUpPage/>}/>
        <Route path='/otp' element={<OtpPage/>}/>
    </Routes>
   
  )
}

export default UserRoute
