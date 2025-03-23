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
            <div className="min-h-screen bg-gray-50 py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Profile Header */}
                    <div className="mb-8">
                        <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
                            <FaUser className="w-6 h-6" />
                            My Profile
                        </h1>
                    </div>

                    {/* Main Content */}
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Left Section - Profile Details */}
                        <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-lg overflow-hidden">
                            <div className="bg-black h-12 w-full"></div>
                            
                            <div className="p-6">
                                <h2 className="text-xl font-semibold mb-6">Profile Photo</h2>
                                
                                <div className="flex flex-col md:flex-row gap-8">
                                    {/* Profile Image Upload */}
                                    <form onSubmit={handleUploadImage} className="flex flex-col items-center">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            name="imageUrls"
                                            onChange={handleFileInputChange}
                                            className="hidden"
                                            id="imageInput"
                                        />
                                        <div className="relative">
                                            <img
                                                src={imagePreview || profileData.imageUrls}
                                                alt="Profile"
                                                className="w-32 h-32 rounded-full object-cover transition-transform hover:scale-105"
                                            />
                                            <label 
                                                htmlFor="imageInput" 
                                                className="mt-4 block text-center px-4 py-2 border-2 border-black rounded-md font-semibold hover:bg-black hover:text-white transition-colors cursor-pointer"
                                            >
                                                Change Image
                                            </label>
                                            <button 
                                                type="submit" 
                                                className="absolute top-0 right-0 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                                            >
                                                <FaUpload className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </form>

                                    {/* Profile Information */}
                                    <div className="flex-1 space-y-6">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md">
                                                <FaUser className="w-5 h-5 text-gray-600" />
                                                <div>
                                                    <div className="text-sm text-gray-600">Full Name</div>
                                                    <div className="font-semibold">{profileData.username}</div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md">
                                                <FaMailBulk className="w-5 h-5 text-gray-600" />
                                                <div>
                                                    <div className="text-sm text-gray-600">Email</div>
                                                    <div className="font-semibold">{profileData.email}</div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md">
                                                <FaMobile className="w-5 h-5 text-gray-600" />
                                                <div>
                                                    <div className="text-sm text-gray-600">Mobile</div>
                                                    <div className="font-semibold">{profileData.mobile}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-4 space-y-4">
                                            <EditProfile Data={profileData} className="w-full" />
                                            <div className="border-t border-gray-200"></div>
                                            <ResetPassword />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Section - Navigation */}
                        <div className="w-full lg:w-1/3">
                            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                                <div className="bg-black h-3 w-full"></div>
                                
                                <div className="p-6 space-y-6">
                                    {/* My Bookings Section */}
                                    <div>
                                        <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
                                            <FaUser className="w-5 h-5" />
                                            My Bookings
                                        </h2>
                                        <nav className="space-y-3">
                                            <Link to="/history" className="block text-gray-600 hover:text-black hover:underline">
                                                My Bookings
                                            </Link>
                                            <Link to="/wallethistory" className="block text-gray-600 hover:text-black hover:underline">
                                                Wallet History
                                            </Link>
                                            <Link to="/enquiry" className="block text-gray-600 hover:text-black hover:underline">
                                                My Enquiries
                                            </Link>
                                        </nav>
                                    </div>

                                    {/* Property Management Section */}
                                    <div>
                                        <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
                                            <FaHome className="w-5 h-5" />
                                            Property Management
                                        </h2>
                                        <Wishlist className="block text-gray-600 hover:text-black hover:underline" />
                                    </div>

                                    {/* Wallet Section */}
                                    <div>
                                        <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
                                            <FaFunnelDollar className="w-5 h-5" />
                                            Wallet & Refunds
                                        </h2>
                                        <div className="text-gray-600">
                                            Wallet Balance: <span className="font-semibold text-amber-900">₹{profileData.wallet}</span>
                                        </div>
                                    </div>

                                    {/* Logout Button */}
                                    <div className="pt-4 border-t border-gray-200">
                                        <button 
                                            onClick={handleClick}
                                            className="w-full px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                                        >
                                            Log Out
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default ProfilePage
