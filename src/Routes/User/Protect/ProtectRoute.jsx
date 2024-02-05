import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'



const ProtectRoutes = () =>{
    const userSelector = useSelector((state)=>state.user)
    const UserInfo = userSelector.userInfo
    console.log(UserInfo,"infotokkk");
    return UserInfo ? <Outlet/> : <Navigate to={'/login'} replace/> 
}
//    return UserInfo ? <Outlet/> : <Navigate to={'/login'} replace/> why here we giving replace?
export default ProtectRoutes

