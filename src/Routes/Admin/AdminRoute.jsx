import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../../Components/Admin/Home/HomePage'
import LoginPage from '../../Components/Admin/Login/LoginPage'
import UserList from '../../Components/Admin/UserList/UserList'
import OwnerList from '../../Components/Admin/OwnerList/OwnerList'
import ProfilePage from '../../Components/Admin/Profile/ProfilePage'

function AdminRoute() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/userlist" element={<UserList/>}></Route>
        <Route path="/ownerlist" element={<OwnerList/>}></Route>
        <Route path="/profile" element={<ProfilePage/>}></Route>
      </Routes>
    </div>
  )
}

export default AdminRoute
