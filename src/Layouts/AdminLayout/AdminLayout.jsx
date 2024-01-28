import React from 'react'
import Sidebar from "../../Components/Admin/AdminSidebar/Sidebar.jsx"
import { Outlet } from 'react-router-dom'
import Header from '../../Components/Admin/AdminHeader/Header.jsx'

function AdminLayout() {
    return (
        <div>
            <Header/>
            <Sidebar />
            <Outlet/>
        </div>
    )
}

export default AdminLayout
