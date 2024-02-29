import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { ListPayment } from '../PaymentHistory/ListPayment'
import { FaExchangeAlt, FaLock, FaMailBulk, FaMobile, FaUser } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { FetchProfileData } from '../../../Api/UserApi'

function ProfilePage() {


    const navigate = useNavigate()
    const userData = useSelector(state => state.user)
    const email = userData.userInfo.email
    const [profileData, setProfileData] = useState([])

    const handleClick = () => {
        localStorage.removeItem("token")
        navigate('/login')
    }

    useEffect(() => {
        const ProfileData = async () => {
            try {
                const res = await FetchProfileData({ email: email })
                console.log(res, "res in profile page");
                if (res.data.success) {
                    setProfileData(res.data.userData)
                }
            } catch (error) {
                console.log(error);
            }
        }
        ProfileData()
    }, [])

    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }


    return (
        <>
            <div className='mt-8 sm:mt-16 md:mt-24 lg:mt-32 items-center p-6 w-full sm:w-[80%] lg:w-[60%] mx-auto'>
                <div className='flex flex-col sm:flex-row justify-between items-center mr-56'>
                    <div className='flex items-center mb-4 sm:mb-0 '>
                        <FaUser className='w-8 h-8 text-black' />
                        <h1 className='text-lg sm:text-2xl font-bold ml-2'>My Profile</h1>
                    </div>
                    <div className='flex flex-col sm:flex-row gap-4'>
                        <Link to='/history' className='border-2 hover:bg-black hover:text-white border-black sm:h-10 text-black rounded-md p-1 font-mono'>
                            Payment History
                        </Link>
                        <button className='border-2 hover:bg-black hover:text-white border-black h-10 text-black rounded-md p-1 font-mono' onClick={handleClick}>
                            Log Out
                        </button>
                    </div>
                </div>
            </div>


            <div className='gap-8 sm:gap-10 mt-5 flex flex-col sm:flex-row justify-center mx-auto'>
                <div className='shadow-md shadow-black w-full h-screen sm:w-[60%] md:w-[40%] lg:w-[70%] ml-0 sm:ml-4 md:ml-12 lg:ml-36 rounded-lg flex flex-row sm:flex-col '>
                    <div className='flex flex-col '>
                        <div className='border-2 border-gray-400 w-full h-10 rounded-md '>
                            
                        </div>

                        <h1 className='absolute lg:ml-9 lg:mt-16 uppercase font-semibold font-mono'>Profile Photo</h1>
                        <div className='flex flex-col sm:flex-row gap-6 mt-10 ml-8'>

                            {/* {imagePreview && ( */}
                                <img
                                    src='/src/assets/images/property1.jpg'
                                    alt="Preview"
                                    className='rounded-full w-32 h-32 mt-8 transition-transform transform hover:scale-105'
                                />
                            {/* )} */}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{ display: 'none' }}
                                id="imageInput"
                            />
                            <label htmlFor="imageInput" className='button absolute  sm:ml-2 sm:mt-44 uppercase font-semibold font-mono border-2 border-black px-2 rounded-md hover:bg-black hover:text-white'>
                                Change Image
                            </label>

                            <div className='flex flex-col gap-8 sm:gap-12 ml-0 sm:ml-4 md:ml-16 lg:ml-12 lg:mt-0 justi'>
                                <div className='flex flex-col gap-6 sm:gap-10 w-full sm:w-64'>
                                    <div className='flex flex-col'>
                                        <label className='font-semibold font-mono flex flex-row gap-2'>
                                            <FaUser />Fullname: {profileData.username}
                                        </label>
                                    </div>
                                    <div className='flex flex-col'>
                                        <label className='font-semibold font-mono flex flex-row gap-2'>
                                            <FaMailBulk />Email: {profileData.email}
                                        </label>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-6 sm:gap-10 w-full sm:w-64'>
                                    <div className='flex flex-col'>
                                        <label className='font-semibold font-mono flex flex-row gap-2'>
                                            <FaMobile />Mobile: {profileData.mobile}
                                        </label>
                                    </div>
                                </div>
                                <div className=''>
                                    <button className='rounded-full border-2 border-black p-2 font-bold hover:bg-black hover:text-white'>Edit Profile</button>
                                </div>
                                <div className=' border-b-2 border-gray-400 w-'></div>

                                <div className='flex flex-col gap-6 sm:gap-10 w-full sm:w-64'>
                                    <div className='flex flex-col'>
                                        <label className='font-semibold font-mono flex flex-row gap-2 hover:underline'>
                                            <FaLock />Reset Password
                                        </label>
                                    </div>
                                    <div className='border-b-2 border-gray-400 w-full'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='border-b-2 border-black hidden sm:block'></div>
                <div className='flex flex-col w-full sm:w-[40%] gap-8 sm:gap-10 '>
                    <div className='shadow-md shadow-black w-full sm:w-[60%] h-[15%] md:w-[70%] lg:mr-10 rounded-md flex justify-center'></div>
                    <div className='shadow-md shadow-black w-full sm:w-[60%] h-[80%] md:w-[70%] rounded-2xl flex justify-center '></div>
                </div>
            </div>
        </>
    )
}

export default ProfilePage
