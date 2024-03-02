import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { AddKyc, getOwner } from '../../../Api/OwnerApi';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import ViewKycModal from './ViewKycModal';
import { LogoutIcon } from '@heroicons/react/solid';
import { useSelector } from 'react-redux';


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
    const [owner, setOwner] = useState([]);

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

    return (
        <>
            <div className='flex justify-center items-center'>

                <div className='border-2 border-black mt-5 w-[80%] h-[550px]'>
                    <div className='flex items-center justify-between p-4 text-black relative border-b-2 border-black ml-4 w-[95%]'>
                        <h1 className='font-bold text-xl relative'>Profile</h1>
                        {!owner.is_Kyc == true ? (
                            <button
                                className='bg-black text-white rounded-lg  w-20 h-10'
                                onClick={openModal} state={"kyc"}>
                                Add KYC
                            </button>
                        ) : (
                            <button
                                className='bg-black text-white rounded-lg  w-20 h-10'
                                onClick={KycModal}>
                                View KYC
                            </button>

                        )}
                        <button className='bg-black rounded-lg text-white font-bold w-16 h-10' onClick={handleLogout}>
                            <LogoutIcon className='w-16 h-6 flex' />
                        </button>
                    </div>
                    <div className=' '>
                        {/* other contents */}
                    </div>
                </div>
            </div>
            {/* add kyc modal */}
            <div >
                <div className="flex items-center justify-center min-h-screen">
                    {/* Modal */}
                    {isOpen && (
                        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
                            <div className="bg-white p-8 rounded-md">
                                <div className="flex flex-col w-full">
                                    <div className=" overflow-y-hidden rounded-lg pt-10 ml-1 bg-offgreen mx-auto h-auto w-screen sm:px-8 bg-gray-100 ">
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
                                                        <div className="ml-4 order-first sm:order-last mt-0 mb-auto flex justify-center ">
                                                            <input
                                                                type="file"
                                                                name="username"
                                                                placeholder="Fullname"
                                                                autoFocus
                                                                className="mt-2 ml-12 w-full px-4 py-2 mb-4 border bg-black rounded-md bg-transparent border-black focus:outline-none focus:border-black text-black"
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
                                                        <button className='bg-black rounded-lg text-white font-bold w-20 h-10' onClick={closeModal}>ADD</button>
                                                        <div className="mb-6 ">
                                                            <button
                                                                onClick={closeModal}
                                                                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <ToastContainer />

            </div >
            {/* add kyc modal */}

            {/* view kyc modal */}
            {open ?
                <ViewKycModal setOpen={setOpen} />
                : ""}
            {/* view kyc modal */}
        </>

    )
}

export default Profile

