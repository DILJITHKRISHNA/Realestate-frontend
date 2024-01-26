import React from 'react'
import {Routes, Route} from "react-router-dom"
import Home from '../../pages/Owner/HomePage/Home.jsx'
import Signup from '../../pages/Owner/SignUpPage/Signup.jsx'
import Login from '../../pages/Owner/LoginPage/Login.jsx'
import OTP from '../../Components/Owner/OtpPage/OTP.jsx'

function ownerRoute() {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/otp' element={<OTP/>}/>
    </Routes>
  )
}

export default ownerRoute
