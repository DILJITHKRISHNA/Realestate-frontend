import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from '../../pages/Owner/HomePage/Home.jsx';
import Signup from '../../pages/Owner/SignUpPage/Signup.jsx';
import Login from '../../pages/Owner/LoginPage/Login.jsx';
import OTP from '../../Components/Owner/OtpPage/OTP.jsx';
import OwnerLayout from '../../Layouts/OwnerLayout/OwnerLayout.jsx';
import ProtectRoute from './Protect/ProtectRoutes.jsx';
import Profile from '../../pages/Owner/ProfilePage/Profile.jsx';
import Property from '../../pages/Owner/PropertyPage/Property.jsx';
import Bookings from '../../pages/Owner/BookingPage/Bookings.jsx';
import PublicRoutes from './OwnerPublic/PublicRoutes.jsx';
import Chat from '../../pages/Owner/ChatPage/Chat.jsx';
import Enquiry from '../../pages/Owner/EnquiryPage/Enquiry.jsx';
function OwnerRoute() {
  return (
    <Routes>
      <Route element={<PublicRoutes />}>
        <Route path='/otp' element={<OTP />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Route>

      <Route element={<ProtectRoute />}>
        <Route element={<OwnerLayout />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/' element={<Home />} />
          <Route path='/property' element={<Property />} />
          <Route path='/bookings' element={<Bookings />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='/enquiry' element={<Enquiry />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default OwnerRoute;