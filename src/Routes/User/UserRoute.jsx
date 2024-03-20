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
import Success from '../../pages/User/SuccessPage/Success.jsx';
import History from '../../pages/User/PaymentHistory/History.jsx';
import PublicRoute from './Protect/PublicRoute.jsx';
import Reserve from '../../pages/User/ReservePage/Reserve.jsx';
import Enquiry from '../../pages/User/EnquiryListPage/Enquiry.jsx';
import WalletHistory from '../../pages/User/WalletHistory/WalletHistory.jsx';
import Chat from '../../pages/User/ChatPage/Chat.jsx'
import VideoCallPage from '../../pages/User/VideoCallPage/VideoCallPage.jsx';
import ErrorPage from '../../pages/User/ErrorPage/ErrorPage.jsx';

function UserRoute() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/otp" element={<Otp />} />
      </Route>

      <Route path="/" element={<UserLayout />}>
        <Route index element={<HomePage />} />

        <Route path="/profile" element={<ProtectRoutes />}>
          <Route index element={<ProfilePage />} />
        </Route>

        <Route path="/success" element={<ProtectRoutes />}>
          <Route index element={<Success />} />
        </Route>
        <Route path="/history" element={<ProtectRoutes />}>
          <Route index element={<History />} />
        </Route>

        <Route path="/reserve" element={<ProtectRoutes />}>
          <Route index element={<Reserve />} />
        </Route>
        <Route path="/enquiry" element={<ProtectRoutes />}>
          <Route index element={<Enquiry />} />
        </Route>
        <Route path="/wallethistory" element={<ProtectRoutes />}>
          <Route index element={<WalletHistory />} />
        </Route>
        <Route path="/bookproperty" element={<Booking />} />
        <Route path="/property" element={<Property />} />
        <Route path="/propertyeach" element={<SingleProperty />} />
      </Route>

      <Route path="/videocall" element={<ProtectRoutes />}>
        <Route index element={<VideoCallPage />} />
      </Route>

      <Route path="/chat" element={<ProtectRoutes />}>
        <Route index element={<Chat />} />
      </Route>
      <Route path="*" element={<ErrorPage />} /> 
    </Routes>
  );
}

export default UserRoute;