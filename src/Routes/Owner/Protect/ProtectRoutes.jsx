import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectRoute = () => {
  const OwnerSelector = useSelector((state) => state.owner);
  const OwnerInfo = OwnerSelector.OwnerInfo
  console.log(OwnerSelector.OwnerInfo, "kkkkiiiiiifffff");
  return OwnerInfo ? <Outlet /> : <Navigate to={'/owner/login'} replace />;
};

export default ProtectRoute;
