import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../../pages/User/LoginPage/Login';
import SignUpPage from '../../pages/User/SignUpPage/SignUp.jsx';
import Otp from '../../pages/User/OtpPage/Otp.jsx';
import ProfilePage from '../../pages/User/ProfilePage/Profile.jsx';
import HomePage from '../../pages/User/HomePage/HomePage.jsx';
import UserLayout from '../../Layouts/UserLayout/UserLayout.jsx';
import ProtectRoutes from './Protect/ProtectRoute.jsx';
import Property from '../../pages/User/PropertyPage/Property.jsx';
import SingleProperty from '../../pages/User/SinglePropertyPage/SingleProperty.jsx';
import Booking from '../../pages/User/BookingPage/Booking.jsx';

function UserRoute() {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<HomePage />} />


        <Route path="/profile" element={<ProtectRoutes />}>
          <Route index element={<ProfilePage />} />
        </Route>

        <Route path="/bookproperty" element={<Booking />} />
        <Route path="/property" element={<Property />} />
        <Route path="/propertyeach" element={<SingleProperty />} />
      </Route>
      <Route path="/otp" element={<Otp />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default UserRoute;
