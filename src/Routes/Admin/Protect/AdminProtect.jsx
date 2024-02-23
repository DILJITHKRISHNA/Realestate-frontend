import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtect = () => {

    const admintok = localStorage.getItem("admintok")
    return admintok ? <Outlet /> : <Navigate to={'/admin/login'} />;
};

export default AdminProtect;
