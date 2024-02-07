import React from 'react'
import HeaderNav from '../Header/HeaderNav'
import { Outlet, useNavigate } from 'react-router-dom'

function ProfilePage() {
    const navigate = useNavigate()

    const handleClick = () => {
        localStorage.removeItem("token")
        navigate('/login')
    }
    return (
        <div className=' mt-[80px]'>
            <div className='flex gap-6'>
                <h1>Profile</h1>
                <button className='bg-black text-white rounded-lg w-16' onClick={handleClick}>Log Out</button>
            </div>
        </div>
    )
}

export default ProfilePage
