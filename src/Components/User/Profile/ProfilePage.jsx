import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaFunnelDollar, FaHome, FaLock, FaMailBulk, FaMobile, FaUpload, FaUser } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { FetchProfileData, addProfileImage } from '../../../Api/UserApi'
import Wishlist from './Wishlist'
import { ToastContainer, toast } from 'react-toastify'
import { EditProfile } from './EditProfile'
import ResetPassword from './ResetPassword'

function ProfilePage() {


    const navigate = useNavigate()
    const userData = useSelector(state => state.user)
    const id = userData.userInfo.id
    const [profileData, setProfileData] = useState([])
    const [details, SetDetails] = useState({
        imageUrl: null,
    });

    const handleClick = () => {
        localStorage.removeItem("token")
        navigate('/login')
    }

    useEffect(() => {
        const ProfileData = async () => {
            try {
                const res = await FetchProfileData(id)
                if (res.data.success) {
                    setProfileData(res.data.userData)
                }
            } catch (error) {
                console.log(error);
            }
        }
        ProfileData()
    }, [])

    const [imagePreview, setImagePreview] = useState('');



    const uploadImage = async (files) => {
        try {
            const uploadedImageUrls = [];

            for (const file of files) {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", "dev_setups");

                const cloudinaryResponse = await fetch(
                    "https://api.cloudinary.com/v1_1/dqewi7vjr/image/upload",
                    {
                        method: "POST",
                        body: formData,
                    }
                );

                if (!cloudinaryResponse.ok) {
                    throw new Error(`Failed to upload image. Status: ${cloudinaryResponse.status}`);
                }

                const cloudinaryData = await cloudinaryResponse.json();

                if (cloudinaryData.error) {
                    console.log(cloudinaryData.error);
                    return;
                }

                const uploadedImageUrl = cloudinaryData.secure_url;
                uploadedImageUrls.push(uploadedImageUrl);
            }

            console.log("Uploaded Image URLs:", uploadedImageUrls);
            return uploadedImageUrls;
        } catch (error) {
            console.log("Error during image upload:", error);
        }
    };

    const handleFileInputChange = async (e) => {
        const files = e.target.files;
        try {
            const urls = await uploadImage(files);
            SetDetails((prevState) => ({ ...prevState, imageUrl: urls }));
            setImagePreview(urls);
        } catch (error) {
            console.error("Error uploading images:", error);
        }
    };
    console.log(imagePreview, "image prieviewew");


    const handleUploadImage = async (e) => {
        console.log("image submitting...");
        e.preventDefault();
        if (!imagePreview) {
            return;
        }
        try {
            const urls = await uploadImage(imagePreview);
            console.log(urls, "image urllllll");
            const ProfileImage = await addProfileImage(urls, id)
            console.log(ProfileImage, "profile imageee");
            if (ProfileImage.data.success) {
                toast.success("Image Updated Successfully!")
            } else {
                toast.error("Error While updating profile!")
            }
        } catch (error) {
            console.error("Error uploading images:", error);
        }
    };



    return (
        <>
            <div className='mt-20 sm:mt-16 md:mt-24 lg:mt-32 lg:ml-36 items-center p-2 w-full sm:w-[80%] lg:w-[60%] mx-auto'>
                <div className='flex flex-col sm:flex-row'>

                    <h1 className='text-start font-bold text-xl flex flex-row items-center gap-2'>
                        <FaUser className='' />
                        My Profile
                    </h1>
                </div>
            </div>


            <div className='gap-8 sm:gap-10 mt-5 flex flex-col sm:flex-row justify-center mx-auto '>
                <div className='shadow-md shadow-black w-full h-[40%] sm:w-[60%] md:w-[40%] lg:w-[70%] ml-0 sm:ml-4 md:ml-12 lg:ml-36 rounded-lg flex flex-row sm:flex-col '>
                    <div className='flex flex-col '>
                        <div className='border-2 border-gray-400 w-[22rem] h-10 rounded-md bg-black sm:w-full'>
                        </div>

                        <h1 className='absolute lg:ml-9 lg:mt-16 uppercase font-semibold font-mono'>Profile Photo</h1>
                        <div className='flex flex-col sm:flex-row gap-6 mt-10 ml-8'>
                            <form onSubmit={handleUploadImage} className="flex flex-col items-center">
                                <input
                                    type="file"
                                    accept="image/*"
                                    name='imageUrls'
                                    onChange={handleFileInputChange}
                                    style={{ display: 'none' }}
                                    id="imageInput"
                                />
                                <div className="relative mt-4">
                                    {imagePreview ?
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className='rounded-full w-32 h-32 transition-transform transform hover:scale-105'
                                        />
                                        :
                                        <img
                                            src={profileData.imageUrls}
                                            alt="Preview"
                                            className='rounded-full w-32 h-32 transition-transform transform hover:scale-105'
                                        />}
                                    <label htmlFor="imageInput" className='button uppercase font-semibold font-mono border-2 border-black px-2 rounded-md hover:bg-black hover:text-white'>
                                        Change Image
                                    </label>
                                    <button type="submit" className='absolute top-0 right-0 bg-white p-2 rounded-full'>
                                        <FaUpload />
                                    </button>
                                </div>
                            </form>

                            <div className='flex flex-col gap-8 sm:gap-12 ml-0 sm:ml-4 md:ml-16 lg:ml-12 lg:mt-0'>
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
                                    <EditProfile Data={profileData} className='rounded-full border-2 border-black p-2 font-bold hover:bg-black hover:text-white' />
                                </div>
                                <div className=' border-b-2 border-gray-400 w-full'></div>

                                <div className='flex flex-col gap-6 sm:gap-10 w-full sm:w-64'>
                                    <div className='flex flex-row gap-[10%]'>

                                        <ResetPassword />
                                    </div>
                                    <div className='border-b-2 w-full'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='border-b-2 border-black hidden sm:block '></div>
                <div className='flex flex-col w-full sm:w-[40%] gap-8 sm:gap-10'>
                    <div className='shadow-md shadow-black w-full sm:w-[60%] h-[8%] md:w-[70%] lg:mr-10 rounded-md flex justify-center bg-black'></div>
                    <div className='shadow-md shadow-black w-full sm:w-[60%] h-[90%] md:w-[70%] rounded-2xl flex flex-col gap-2'>
                        <h1 className='flex flex-row ml-2 py-2 font-bold '>
                            <FaUser className='w-10 h-5' /> My Bookings
                        </h1>
                        <Link to='/history' className=' sm:h-10 sm:w-28 text-black rounded-md ml-14 font-mono hover:underline'>
                            My Bookings
                        </Link>
                        {/* <Link to='/notification' className=' sm:h-10 sm:w-28 text-black rounded-md ml-14 font-mono hover:underline'>
                            Notifications
                        </Link> */}
                        <Link to='/wallethistory' className=' sm:h-10 sm:w-36 text-black rounded-md ml-14 font-mono hover:underline'>
                            Wallet History
                        </Link>
                        <Link to='/enquiry' className=' sm:h-10 sm:w-28 text-black rounded-md ml-14 font-mono hover:underline'>
                            My Enquiries
                        </Link>
                        <h1 className='flex flex-row ml-2 py-2 font-bold '>
                            <FaHome className='w-10 h-5' /> Property Management
                        </h1>
                        <Wishlist className=' sm:h-10 sm:w-28 text-black rounded-md ml-14 font-mono hover:underline' />
                        <h1 className='flex flex-row ml-2 py-2 font-bold '>
                            <FaFunnelDollar className='w-10 h-5' /> Refunds
                        </h1>
                        <h1
                            className=' sm:h-10 sm:w-32 text-black rounded-md ml-14 font-mono hover:underline'>
                            Wallet :<span className='font-bold text-amber-900'>₹{profileData.wallet}</span>
                        </h1>
                        <h1 className='sm:h-10 sm:w-28 text-black rounded-md ml-14 font-mono hover:underline' onClick={handleClick}>
                            Log Out
                        </h1>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    )
}

export default ProfilePage
