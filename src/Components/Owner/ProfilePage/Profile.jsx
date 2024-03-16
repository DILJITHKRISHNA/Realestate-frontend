import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { AddKyc, addOwnerImage, getOwner } from '../../../Api/OwnerApi';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import ViewKycModal from './ViewKycModal';
import { LogoutIcon } from '@heroicons/react/solid';
import { useSelector } from 'react-redux';
import { FaFunnelDollar, FaHome, FaLock, FaMailBulk, FaMobile, FaUpload, FaUser } from 'react-icons/fa';
import EditOwnerProfile from './EditOwnerProfile';


function Profile() {
    const navigate = useNavigate()
    const selector = useSelector(state => state.owner.OwnerInfo.id)
    const [kyc, SetKyc] = useState({

        username: "",
        email: "",
        panCard: "",
        occupation: "",
        address: "",
        city: "",
        country: "",
        zipCode: "",
        state: "",

    })
    const handleOnclick = (e) => {
        const { name, value } = e.target
        SetKyc({
            ...kyc,
            [name]: value
        })
    }
    const [isOpen, setIsOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [resetOpen, setResetopen] = useState(false);
    const [owner, setOwner] = useState([]);
    const [imagePreview, setImagePreview] = useState('');
    const [profileData, setProfileData] = useState([])
    const [details, SetDetails] = useState({
        imageUrl: null,
    });


    const openModal = () => {
        setIsOpen(true);
    };

    const KycModal = () => {
        setOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false);
    };


    const validationSchema = Yup.object().shape({
        address: Yup.string().required('Address is required'),
        city: Yup.string().required('City is required'),
        country: Yup.string().required('Country is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        occupation: Yup.string().required('Occupation is required'),
        panCard: Yup.string().nullable().required('Pan Card is required'),
        state: Yup.string().required('State is required'),
        username: Yup.string().required('Username is required'),
        zipCode: Yup.string().nullable().required('Zip Code is required'),
    });

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await validationSchema.validate(kyc, { abortEarly: false });
            console.log(kyc, "datasssss");
            const response = await AddKyc(kyc);
            if (response.data.success) {

                toast("Your KYC has been received. Admin review is in progress. Please await confirmation.")
            } else {
                toast.error("error while creating Kyc")
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const fetchOwner = async () => {
            try {
                const res = await getOwner(selector);
                console.log(res, "rrrrrrrrrespons fetchowner");
                if (res.data.success) {
                    const data = res.data.OwnerData
                    setOwner(data)
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchOwner()
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("ownertok")
        navigate('/owner/login')
    }


    /////////////////////////



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
            const ProfileImage = await addOwnerImage(urls, selector)
            console.log(ProfileImage, "profile imageee");
            if (ProfileImage.data.success) {
                toast("Image Updated Successfully!")
            } else {
                toast.error("Error While updating profile!")
            }
        } catch (error) {
            console.error("Error uploading images:", error);
        }
    };

    const handleReset = () => {
        setResetopen(!resetOpen)
    }

    const handleResetPassword = () => {

    }

    return (
        <>
            <div className='flex justify-center items-center'>

                <div className='border-2  mt-20 w-[80%] h-[37rem]'>
                    <div className='flex items-center justify-between p-4 text-black relative border-b-2 border-black ml-4 w-[95%]'>
                        <h1 className='font-bold text-xl relative flex flex-row gap-2 h-4'><FaUser />Profile</h1>
                    </div>
                    <div className=' '>
                        <div className='gap-8 sm:gap-10 mt-5 flex flex-col sm:flex-row justify-center mx-auto '>
                            <div className='shadow-md shadow-black w-full h-[40%] sm:w-[60%] md:w-[40%] lg:w-[100%] ml-0 sm:ml-4 md:ml-12 lg:ml-36 rounded-lg flex flex-row sm:flex-col '>
                                <div className='flex flex-col '>
                                    <div className='border-2 border-gray-400 w-full h-10 rounded-md bg-black'></div>
                                    <h1 className='absolute lg:ml-9 ml-[6rem] mt-[8px] lg:mt-16 uppercase font-semibold font-mono text-white'>Profile Photo</h1>
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
                                                        src={owner.imageUrls}
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
                                                        <FaUser />Fullname: {owner.username}
                                                    </label>
                                                </div>
                                                <div className='flex flex-col'>
                                                    <label className='font-semibold font-mono flex flex-row gap-2'>
                                                        <FaMailBulk />Email: {owner.email}
                                                    </label>
                                                </div>
                                            </div>
                                            <div className='flex flex-col gap-6 sm:gap-10 w-full sm:w-64'>
                                                <div className='flex flex-col'>
                                                    <label className='font-semibold font-mono flex flex-row gap-2'>
                                                        <FaMobile />Mobile: {owner.mobile}
                                                    </label>
                                                </div>
                                            </div>
                                            <div className=''>
                                                {/* <EditOwnerProfile Data={owner} className='rounded-full border-2 border-black p-2 font-bold hover:bg-black hover:text-white' /> */}
                                            </div>
                                            <div className=' border-b-2 border-gray-400 w-full'></div>

                                            <div className='flex flex-col gap-6 sm:gap-10 w-full sm:w-64'>
                                                <div className='flex flex-row gap-[10%]'>

                                                    <label onClick={handleReset} className='font-semibold mt-4 font-mono flex flex-row gap-2 hover:underline'>
                                                        <FaLock />ResetPassword
                                                    </label>
                                                    {resetOpen ?
                                                        <div className="flex flex-row gap-2">
                                                            <input type="text" className='w-auto outline-double rounded-md px-1' />
                                                            <button onClick={handleResetPassword} className='px-3 rounded-md bg-black text-white transition-all duration-300 ease-in-out hover:transform hover:scale-105'>
                                                                Reset
                                                            </button>
                                                        </div>
                                                        : ""}
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
                                <div className='shadow-md shadow-black w-full mt-2 sm:w-[60%] md:h-full h-[16rem] md:w-[70%] rounded-2xl flex flex-col gap-2'>
                                    <h1 className='flex flex-row ml-2 py-2 font-bold '>
                                        <FaUser className='w-10 h-5' /> General
                                    </h1>
                                    <Link to='/owner/bookings' className=' sm:h-10 sm:w-28 text-black rounded-md ml-14 font-mono hover:underline'>
                                        Bookings
                                    </Link>
                                    <Link to='/notification' className=' sm:h-10 sm:w-28 text-black rounded-md ml-14 font-mono hover:underline'>
                                        Notifications
                                    </Link>
                                    <Link to='/owner/enquiry' className=' sm:h-10 sm:w-28 text-black rounded-md ml-14 font-mono hover:underline'>
                                        Enquiry
                                    </Link>
                                    {owner.is_Kyc == false ? (
                                        <button
                                            className='sm:h-10 sm:w-28 text-black rounded-md ml-8 font-mono hover:underline'
                                            onClick={openModal} state={"kyc"}>
                                            Add KYC
                                        </button>
                                    ) : (
                                        <button
                                            className='sm:h-10 sm:w-28 text-black rounded-md md:ml-9 mr-[7rem] font-mono hover:underline'
                                            onClick={KycModal}>
                                            View KYC
                                        </button>

                                    )}
                                    <h1 className='flex flex-row ml-2 py-2 font-bold '>
                                        <FaUser className='w-10 h-5' /> Accounts
                                    </h1>
                                    <h1 className='sm:h-10 sm:w-28 text-black rounded-md ml-8 font-mono hover:underline flex flex-row gap-2' onClick={handleLogout}>
                                        <LogoutIcon className='w-5 h-6' /> Log Out
                                    </h1>
                                </div>
                            </div>
                            <ToastContainer />
                        </div>
                    </div>
                </div>
            </div>
            <div >
                <div className="flex items-center justify-center min-h-screen">
                    {/* Modal */}
                    {isOpen && (
                        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
                            <div className="bg-white p-8 rounded-md">
                                <div className="flex flex-col w-full">
                                    <div className="overflow-x-auto border-2 border-black h-full ">
                                        <h1 className='mt-2 ml-4 font-bold text-lg border-b-2 border-black pb-4 w-[95%]'>ADD KYC</h1>

                                        <form onClick={handleSubmit}>
                                            <div className='ml-6 mt-6 flex flex-col justify-center items uppercase'>
                                                <label className='font-medium'>Fullname</label>
                                                <div className='flex flex-row'>
                                                    <input
                                                        type="text"
                                                        name="username"
                                                        value={kyc.username}
                                                        onChange={handleOnclick}
                                                        placeholder="Fullname"
                                                        autoFocus
                                                        className=" mt-2 w-[36%] px-4 py-2 mb-4 border bg-black rounded-md bg-transparent border-black focus:outline-none focus:border-black text-black"
                                                    />
                                                    <div className="z-10 ml-4 order-first sm:order-last mt-0 mb-auto flex justify-center ">
                                                        <input
                                                            type="file"
                                                            onChange={(e) => handleFileInputChange(e)}
                                                        />
                                                    </div>
                                                </div>
                                                <label className='font-medium'>Email</label>
                                                <input
                                                    type="text"
                                                    name="email"
                                                    value={kyc.email}
                                                    onChange={handleOnclick}
                                                    placeholder="Email"
                                                    autoFocus
                                                    className=" mt-2 w-[36%] px-4 py-2 mb-4 border bg-black rounded-md bg-transparent border-black focus:outline-none focus:border-black text-black"
                                                />
                                                <label className='font-medium'>Pan Card</label>

                                                <input
                                                    type="text"
                                                    name="panCard"
                                                    value={kyc.panCard}
                                                    onChange={handleOnclick}
                                                    placeholder="Pan Card"
                                                    autoFocus
                                                    className=" mt-2 w-[36%] px-4 py-2 mb-4 border bg-black rounded-md bg-transparent border-black focus:outline-none focus:border-black text-black"
                                                />
                                                <div className='flex flex-row'>
                                                    <div className="flex flex-col">
                                                        <label className='mb-1 text-black font-medium'>Occupation</label>
                                                        <input
                                                            type="text"
                                                            name="occupation"
                                                            value={kyc.occupation}
                                                            onChange={handleOnclick}
                                                            placeholder="Occupation"
                                                            autoFocus
                                                            className="w-full sm:w-[100%] px-4 py-2 mb-4 border bg-black rounded-md bg-transparent border-black focus:outline-none focus:border-black text-black"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col ml-4">
                                                        <label className='mb-1 text-black font-medium'>Address/street</label>
                                                        <input
                                                            type="text"
                                                            name="address"
                                                            value={kyc.address}
                                                            onChange={handleOnclick}
                                                            placeholder="Address"
                                                            autoFocus
                                                            className="w-full sm:w-[100%] px-4 py-2 mb-4 border bg-black rounded-md bg-transparent border-black focus:outline-none focus:border-black text-black"
                                                        />
                                                    </div>
                                                </div>

                                                <div className='flex flex-row'>
                                                    <div className="flex flex-col">
                                                        <label className='mb-1 text-black font-medium'>city</label>
                                                        <input
                                                            type="text"
                                                            name="city"
                                                            value={kyc.city}
                                                            onChange={handleOnclick}
                                                            placeholder="City"
                                                            autoFocus
                                                            className="w-full sm:w-[100%] px-4 py-2 mb-4 border bg-black rounded-md bg-transparent border-black focus:outline-none focus:border-black text-black"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col ml-4">
                                                        <label className='mb-1 text-black font-medium'>Country</label>
                                                        <input
                                                            type="text"
                                                            name="country"
                                                            value={kyc.country}
                                                            onChange={handleOnclick}
                                                            placeholder="Country"
                                                            autoFocus
                                                            className="w-full sm:w-[100%] px-4 py-2 mb-4 border bg-black rounded-md bg-transparent border-black focus:outline-none focus:border-black text-black"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col ml-4">
                                                        <label className='mb-1 text-black font-medium'>Zip code</label>
                                                        <input
                                                            type="text"
                                                            name="zipCode"
                                                            value={kyc.zipCode}
                                                            onChange={handleOnclick}
                                                            placeholder="Zip Code"
                                                            autoFocus
                                                            className="w-full sm:w-[100%] px-4 py-2 mb-4 border bg-black rounded-md bg-transparent border-black focus:outline-none focus:border-black text-black"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col ml-4">
                                                        <label className='mb-1 text-black font-medium'>State</label>
                                                        <input
                                                            type="text"
                                                            name="state"
                                                            value={kyc.state}
                                                            onChange={handleOnclick}
                                                            placeholder="State"
                                                            autoFocus
                                                            className="w-full sm:w-[100%] px-4 py-2 mb-4 border bg-black rounded-md bg-transparent border-black focus:outline-none focus:border-black text-black"
                                                        />
                                                    </div>

                                                </div>
                                                <div className='flex justify-center mt-4 gap-10'>
                                                    <div className="mb-6 ">
                                                        <button
                                                            onClick={closeModal}
                                                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                    <button className='bg-black rounded-lg text-white font-bold w-20 h-10' onClick={closeModal}>ADD</button>

                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <ToastContainer />

            </div >
            {/* view kyc modal */}
            {open ?
                <ViewKycModal setOpen={setOpen} />
                : ""}
        </>

    )
}

export default Profile

