import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'



const ProtectRoutes = () =>{
    const {userInfo} = useSelector((state)=>state.user)
    return userInfo.token ? <Outlet/> : <Navigate to={'/login'} replace/> 
}

export default ProtectRoutes

