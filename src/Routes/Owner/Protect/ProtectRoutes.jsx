import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectRoute = () =>{
    const {OwnerInfo} = useSelector((state)=>state.owner)
    return OwnerInfo ? <Outlet/> :<Navigate to={'/login'} replace/>

}
export default ProtectRoute