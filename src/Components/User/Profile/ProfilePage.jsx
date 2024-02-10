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
        <>
            <div className='mt-[80px]  items-center p-7'>
                <div className='flex justify-between border-b-4 border-black w-[100%] '>
                    <h1 className='text-2xl font-bold'>Profile</h1>
                    <button className='bg-black text-white rounded-lg w-16 mb-1' onClick={handleClick}>
                        Log Out
                    </button>
                </div>
            </div>
            <div className='border-2 border-black w-[96%] h-screen ml-7' >
                {/* <img src={} alt="" /> */}
            </div>
        </>


    )
}

export default ProfilePage
