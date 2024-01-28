import React from 'react'
import HeaderNav from '../Header/HeaderNav'
import { Outlet, useNavigate } from 'react-router-dom'

function ProfilePage() {
    const navigate = useNavigate()

    const handleClick = () =>{
        localStorage.removeItem("token")
        navigate('/login')
    }
    return (
        <div>
            <h1>Profile</h1>
            <button onClick={handleClick}>Log Out</button>
        </div>
    )
}

export default ProfilePage
