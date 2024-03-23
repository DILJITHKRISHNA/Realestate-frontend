import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { SearchIcon } from '@heroicons/react/solid';
import { FaCartArrowDown, FaListOl, FaSearch } from 'react-icons/fa';
import { HiMiniXCircle, HiOutlineCheckCircle } from 'react-icons/hi2';
import { FetchEnquiry, createUserChat, userChats } from '../../../Api/UserApi';
import { PropertyAbout } from './PropertyAbout';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function EnquiryList() {
    const selector = useSelector(state => state.user.userInfo)
    const [userData, setUserData] = useState(null)
    const [chatId, setChatId] = useState(null)
    const navigate = useNavigate()
    const [enquiryData, setEnquiryData] = useState([])
    const [ownerId, setOwnerID] = useState([])



    useEffect(() => {
        if (selector.id) {
            const getUserData = async () => {
                try {
                    const response = await userChats(selector.id);
                    if (response.data) {
                        setUserData(response.data.chat);
                    }

                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            };

            getUserData();
        }
    }, []);

    useEffect(() => {
        const FetchReservations = async () => {
            try {
                const res = await FetchEnquiry()
                const data = res.data.enquiryData
                const details = data.find((item) => item.UserRef === selector.id)
                console.log(res, "res in enquiry fetching ");
                if (details) {
                    setEnquiryData(data)
                }
            } catch (error) {
                console.log(error);
            }
        }
        FetchReservations()
    }, [])
    useEffect(() => {
        const id = userData?.filter((item) => setChatId(item._id))
        console.log(enquiryData,"iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
        const data = enquiryData.find((item) => setOwnerID(item.OwnerRef))
    }, [enquiryData, userData])
    console.log(enquiryData, "enquyiryy dataaa");
    const HandleCreateChat = async (e) => {
        e.preventDefault()
        try {
            
            const res = await createUserChat(selector.id, ownerId)
            console.log(res, "response in creating chat");
            if (res.status  === 200) {
                toast.success("Chat created!")
                setTimeout(() => {
                    navigate('/chat')
                }, 2000);
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <div className="flex flex-col w-full mt-28 ">
                <div className="flex">
                    <div className="overflow-y-hidden rounded-lg pt-10 bg-offgreen mx-auto h-auto w-[90%] sm:px-8 shadow-md shadow-lime-400 mr-20 mb-20">
                        <div className='flex flex-row justify-between'>
                            <h1 className='flex justify-center text-3xl mb-4 rounded-md text-black font-mono font-semibold uppercase gap-4'>
                                <FaListOl className='mt-1' />
                                Your Reservations
                            </h1>
                            <div className='relative flex items-center'>
                                <input
                                    type='text'
                                    placeholder='Search Properties'
                                    className='border-2 text-center border-black p-1 rounded-lg h-[60%] pr-8'
                                // value={searchQuery}
                                // onChange={handleSearchChange}
                                />
                                <div className='absolute left-2'>
                                    <FaSearch className='text-black' />
                                </div>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-lime-300 text-left text-xs font-semibold uppercase tracking-widest text-white">
                                        <th className="px-5 py-3">ID</th>
                                        <th className="px-5 py-3">Full Name</th>
                                        <th className="px-5 py-3">Email</th>
                                        <th className="px-5 py-3">Property Details</th>
                                        <th className="px-5 py-3">Mobile</th>
                                        <th className="px-5 py-3">Interest</th>
                                        <th className="px-5 py-3">Connect</th>
                                    </tr>
                                </thead>
                                {enquiryData.map((data, index) => (

                                    <tbody className="text-black font-semibold font-mono">
                                        <tr key={index}>
                                            <td className=" border-gray-200 bg-white px-5 py-5 text-sm">
                                                <p className="whitespace-no-wrap">{index + 1}</p>
                                            </td>
                                            <td className=" border-gray-200 bg-white px-1 py-5 text-sm">
                                                <div className="flex items-center">
                                                    <div className="ml-6">
                                                        <p className="whitespace-no-wrap" >{data.username}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className=" border-gray-200 bg-white px-1 py-5 text-sm">
                                                <div className="flex items-center">
                                                    <div className="ml-6">
                                                        <p className="whitespace-no-wrap" >{data.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className=" border-gray-200 bg-white px-1 py-5 text-sm">
                                                <div className="flex items-center">
                                                    <div className="ml-6">
                                                        <PropertyAbout propertyId={data.Property_id} className="whitespace-no-wrap border-2" />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className=" border-gray-200 bg-white px-1 py-5 text-sm">
                                                <div className="flex items-center">
                                                    <div className="ml-6">
                                                        <p className="whitespace-no-wrap" >{data.mobile}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className=" border-gray-200 bg-white px-1 py-5 text-sm">
                                                <div className="flex items-center">
                                                    <div className="ml-6">
                                                        <p className="whitespace-no-wrap" >{data.interest}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className=" border-gray-200 bg-white px-1 py-5 text-sm">
                                                <div className="flex items-center">
                                                    <button onClick={HandleCreateChat} className="ml-6 border-2 border-lime-400 py-1 px-2 text-lime-400 font-mono hover:bg-lime-400 hover:text-white">Chat</button>
                                                </div>
                                            </td>

                                        </tr>
                                    </tbody>
                                ))}
                            </table>
                        </div>
                        {/* {users.map((userData)=>( */}
                        <div className="flex flex-col items-center   bg-white px-5 py-5 sm:flex-row sm:justify-center">
                            {/* <span className="text-xs  text-gray-600 sm:text-sm"> Showing 1 to {userData?.length || 0} of Entries </span> */}
                        </div>
                        {/* ))} */}
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    )
}

export default EnquiryList
