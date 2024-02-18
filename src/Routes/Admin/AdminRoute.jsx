import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from '../../pages/Admin/LoginPage/Login.jsx'
import Home from '../../pages/Admin/HomePage/Home.jsx'
import UserList from '../../pages/Admin/UserList/UserList.jsx'
import OwnerList from '../../pages/Admin/OwnerList/OwnerList.jsx'
import ProfilePage from '../../pages/Admin/ProfilePage/Profile.jsx'
import AdminLayout from '../../Layouts/AdminLayout/AdminLayout.jsx'
import Property from '../../pages/Admin/Propertypage/Property.jsx'
import CategoryPage from '../../pages/Admin/CategoryPage/CategoryPage.jsx'
import Kyc from '../../pages/Admin/OwnerKyc/Kyc.jsx'
import AdminProtect from './Protect/AdminProtect.jsx'
import BookingList from '../../pages/Admin/BookingList/BookingList.jsx'

function AdminRoute() {
  return (
    <div>
      <Routes>
        <Route element={<AdminProtect />}>

          <Route element={<AdminLayout />}>
            <Route path="/" element={<Home />}></Route>
          </Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/category" element={<CategoryPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/property" element={<Property />}></Route>
          <Route path="/ownerlist" element={<OwnerList />}></Route>
          <Route path="/userlist" element={<UserList />}></Route>
          <Route path="/kyclist" element={<Kyc />}></Route>
          <Route path="/bookinglist" element={<BookingList />}></Route>
        </Route>
      </Routes>
    </div>
  )
}

export default AdminRoute
