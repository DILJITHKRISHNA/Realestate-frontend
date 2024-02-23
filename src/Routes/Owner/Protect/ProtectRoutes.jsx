import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectRoute = () => {
  const ownerTok = localStorage.getItem("ownertok")
  return ownerTok ? <Outlet /> : <Navigate to={'/owner/login'} />;
};

export default ProtectRoute;
