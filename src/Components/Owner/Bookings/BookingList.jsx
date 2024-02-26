import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { FetchBookings } from '../../../Api/OwnerApi';
import { HiOutlineCheckCircle, HiMiniXCircle } from "react-icons/hi2";
import PropertyDetails from './PropertyDetails';
import { FaCartArrowDown } from 'react-icons/fa';

const BookingList = () => {

    const [bookings, setBookings] = useState([]);

    useEffect(() => {

        const getBookings = async () => {
            try {
                const response = await FetchBookings()
                console.log(response, "ressssss in fetchbooooookk");
                if (response.data.success) {
                    setBookings(response.data.GetData)
                }
            } catch (error) {
                console.log("getBookings", error);
            }
        }
        getBookings()
    }, [])

    return (
        <>
            <div className="flex flex-col w-full mt-12 ">
                <div className="flex">
                    <div className="overflow-y-hidden rounded-lg pt-10 bg-offgreen mx-auto h-auto w-[90%] sm:px-8 shadow-md shadow-lime-400 mr-20">
                        
                        <h1 className='flex justify-center text-3xl mb-4 rounded-md text-black  font-mono font-semibold uppercase gap-4'><FaCartArrowDown className='mt-1'/>Booking list</h1>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-lime-300 text-left text-xs font-semibold uppercase tracking-widest text-white">
                                        <th className="px-5 py-3">ID</th>
                                        <th className="px-5 py-3">Full Name</th>
                                        <th className="px-5 py-3">Email</th>
                                        <th className="px-5 py-3">Property Details</th>
                                        <th className="px-5 py-3">Mobile</th>
                                        <th className="px-5 py-3">Status</th>
                                        <th className="px-5 py-3">Connect</th>
                                    </tr>
                                </thead>
                                {bookings.map((data, index) => (

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
                                                        <PropertyDetails propertyId={data.property_id} className="whitespace-no-wrap border-2"/>
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
                                                {data.is_canceled === false ? (
                                                    <div className="flex items-center">
                                                        <div className="ml-6 flex flex-row ">
                                                            <HiOutlineCheckCircle className=' w-6 h-5 text-green-900 animate-pulse' />
                                                            <p className="whitespace-no-wrap text-green-600" >{data.bookingStatus}</p>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center">
                                                        <div className="ml-6 flex flex-row ">
                                                            <HiMiniXCircle className=' w-6 h-5 text-red-900 animate-pulse' />
                                                            <p className="whitespace-no-wrap text-red-600" >Canceled</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </td>
                                            <td className=" border-gray-200 bg-white px-1 py-5 text-sm">
                                                <div className="flex items-center">
                                                    <button className="ml-6 border-2 border-lime-400 py-1 px-2 text-lime-400 font-mono hover:bg-lime-400 hover:text-white">Chat</button>
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
    );
};

export default BookingList;
