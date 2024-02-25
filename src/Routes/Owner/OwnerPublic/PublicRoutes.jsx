import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'


const PublicRoutes = () => {
    const token = localStorage.getItem("ownertok");

    if (token) {
        return <Navigate to={'/owner'} />;
    }
    return <Outlet />;
};

export default PublicRoutes

