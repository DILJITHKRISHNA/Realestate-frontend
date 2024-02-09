import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'



const ProtectRoutes = () => {
    const token = localStorage.getItem("token")
    console.log(token,'tkkkkkkkkkk');
    return token ? <Outlet/> : <Navigate to={'/login'}/> 
}
export default ProtectRoutes

