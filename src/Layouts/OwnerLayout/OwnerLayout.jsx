import React from 'react'
import OwnerHeader from '../../Components/Owner/OwnerHeader/Header.jsx'
import { Outlet } from 'react-router-dom'

function OwnerLayout() {
  return (
    <div>
      <OwnerHeader/>
      <Outlet/>
    </div>
  )
}

export default OwnerLayout
