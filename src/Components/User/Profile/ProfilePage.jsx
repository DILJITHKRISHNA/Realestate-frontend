import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { ListPayment } from '../PaymentHistory/ListPayment'
import { FaEdit, FaUser } from 'react-icons/fa'

function ProfilePage() {

    const navigate = useNavigate()

    const handleClick = () => {
        localStorage.removeItem("token")
        navigate('/login')
    }
    return (
        <>
            <div className='mt-[80px] items-center p-6 w-[60%]'>
                <div className='flex justify-between'>
                    <div className='flex flex-row gap-4 ml-32'>
                        <FaUser className='w-8 h-8 text-black' />
                        <h1 className='text-2xl font-bold ' >My Profile</h1>
                    </div>
                    <button className='border-2 hover:border-black hover:bg-white hover:text-black bg-black h-10 text-white rounded-md p-2 mt-2 font-mono' onClick={handleClick}>
                        Log Out
                    </button>

                </div>
            </div>
            <div className=' gap-16 mt-5 flex justify-between ml-28'>
                <div className='shadow-md shadow-black w-[60%] h-screen ml-10 rounded-lg flex flex-row justify-around'>
                    <div className='flex flex-col'>
                        <div className='border-b-2 border-black mt-4'></div>
                        <h1 className='ml-3 mt-5 uppercase font-semibold font-mono'>profile photo</h1>
                        <div className='flex flex-row gap-8 mb-4'>
                            <img src='/src/assets/images/property3.jpg' alt="" className='rounded-full w-32 h-32 mt-8 ' />
                            <h1 className='mt-16 '>JPG, GIF or PNG Maximum file size 1MB</h1>
                        </div>
                        <button className='ml-[11%] absolute mt-[11%] border-2 border-black w-[10%] rounded-md'>Change Photo</button>
                        <div className='flex flex-row gap-12 mt-10 ml-4'>
                            <div className='flex flex-col gap-10 w-64'>
                                <div className='flex flex-col'>
                                    <label className='font-semibold font-mono '>UserName</label>
                                    <input type="text" className='bg-gray-200 h-8 -mb-8' />
                                </div>
                                <div className='flex flex-col'>
                                    <label className='font-semibold font-mono'>UserName</label>
                                    <input type="text" className='bg-gray-200 h-8 -mb-8' />
                                </div>
                            </div>
                            <div className='flex flex-col gap-10 w-64'>
                                <div className='flex flex-col'>
                                    <label className='font-semibold font-mono'>UserName</label>
                                    <input type="text" className='bg-gray-200 h-8 -mb-8' />
                                </div>
                                <div className='flex flex-col'>
                                    <label className='font-semibold font-mono'>UserName</label>
                                    <input type="text" className='bg-gray-200 h-8 -mb-8' />
                                </div>
                            </div>
                        </div>


                    </div>

                </div>
                <div className='border-b-2 border-black'></div>
                <div className=' flex flex-col w-[40%] gap-10'>
                    <div className='shadow-md shadow-black w-[60%] h-[15%] mr-10 rounded-md flex justify-center bg-black' >
                        <Link to='/history' className='absolute border-2 hover:border-black h-10 mt-6 hover:bg-white hover:text-black bg-black text-white rounded-md p-1 font-mono'>Payment History</Link>

                    </div>
                    <div className='shadow-md shadow-black w-[60%] h-[60%] rounded-2xl flex justify-center' >
                        {/* <input type="file" className='ml-8 mt-2' /> */}

                    </div>
                </div>
            </div>

        </>
    )
}

export default ProfilePage
