import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { ListPayment } from '../PaymentHistory/ListPayment'
import { FaUser } from 'react-icons/fa'

function ProfilePage() {

    const navigate = useNavigate()

    const handleClick = () => {
        localStorage.removeItem("token")
        navigate('/login')
    }
    return (
        <>
            <div className='mt-[80px]  items-center p-6'>
                <div className='flex justify-around gap-32'>
                    <div className='flex flex-row gap-4'>
                        <FaUser className='w-8 h-8 text-black' /> {/* Adjust styling as needed */}
                        <h1 className=' text-2xl font-bold' >My Profile</h1>
                    </div>
                    <div>
                    </div>
                    <button className='border-2 hover:border-black hover:bg-white hover:text-black bg-black text-white rounded-md p-2' onClick={handleClick}>
                        Log Out
                    </button>
                </div>
            </div>
            <div className=' gap-16 mt-5 flex justify-between ml-28'>
                <div className='shadow-md shadow-black w-[70%] h-screen ml-10 rounded-lg flex flex-row justify-around'>
                    <h1 className=' font-semibold font-mono mt-8'>Personal Data</h1>
                    <Link to='/history' className='border-2 hover:border-black h-10 mt-6 hover:bg-white hover:text-black bg-black text-white rounded-md p-1 font-mono'>PaymentHistory</Link>
                    <div className='border-b-2 border-black'></div>
                </div>
                <div className=' flex flex-col w-[40%] gap-10'>
                    <div className='shadow-md shadow-black w-[60%] h-[15%] mr-10 rounded-lg' >
                        {/* <div className='border-b-2 border-gray-200'></div> */}
                        <img src='' alt="" />
                    </div>
                    <div className='shadow-md shadow-black w-[60%] h-[60%] mr-10 rounded-2xl' >
                        {/* <div className='border-b-2 border-gray-200'></div> */}
                        <img src='' alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfilePage
