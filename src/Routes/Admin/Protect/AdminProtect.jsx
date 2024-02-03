import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtect = () => {
    const AdminSelector = useSelector((state) => state.admin);
    const AdminInfo = AdminSelector.adminInfo
    console.log(AdminInfo, "kkkkiiiiiifffff");
    return AdminInfo ? <Outlet /> : <Navigate to={'/admin/login'} replace />;
};

export default AdminProtect;
