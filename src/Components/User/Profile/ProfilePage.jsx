import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { ListPayment } from '../PaymentHistory/ListPayment'

function ProfilePage() {

    const navigate = useNavigate()

    const handleClick = () => {
        localStorage.removeItem("token")
        navigate('/login')
    }
    return (
        <>
            <div className='mt-[80px]  items-center p-6'>
                <div className='flex justify-between border-b-4 border-black w-[100%] '>
                    <h1 className='text-2xl font-bold'>Profile</h1>
                    <div>
                        <Link to='/history' className='border-2 hover:border-black hover:bg-white hover:text-black bg-black text-white rounded-md p-1'>PaymentHistory</Link>
                    </div>
                    <button className='border-2 hover:border-black hover:bg-white hover:text-black bg-black text-white rounded-md p-2' onClick={handleClick}>
                        Log Out
                    </button>
                </div>
            </div>
            <div className='border-2 border-black w-[96%] h-screen ml-7' >
                <img src='' alt="" />
            </div>
        </>


    )
}

export default ProfilePage
