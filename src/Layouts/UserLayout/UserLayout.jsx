import React from 'react'
import HeaderNav from '../../Components/User/Header/HeaderNav.jsx'
import { Outlet } from 'react-router-dom'

function UserLayout() {
  return (
    <div>
      <HeaderNav/>
      <Outlet/>
    </div>
  )
}

export default UserLayout
