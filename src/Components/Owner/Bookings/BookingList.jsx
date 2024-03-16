import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { FetchBookings } from '../../../Api/OwnerApi';
import { HiOutlineCheckCircle, HiMiniXCircle } from "react-icons/hi2";
import PropertyDetails from './PropertyDetails';
import { FaCartArrowDown } from 'react-icons/fa';
import { SearchIcon } from '@heroicons/react/solid';
import { useSelector } from 'react-redux';

const BookingList = () => {
    const selector = useSelector(state => state.owner.OwnerInfo.id);
    const [bookings, setBookings] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');


    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    useEffect(() => {

        const getBookings = async () => {
            try {
                const response = await FetchBookings()
                const data = response.data.GetData
                const details = data.find((item) => item.owner_id === selector)
                console.log(response, "ressssss in fetchbooooookk");
                if (details) {
                    setBookings(data)
                }
            } catch (error) {
                console.log("getBookings", error);
            }
        }
        getBookings()
    }, [])

    return (
        <>
            <div className="flex flex-col w-full mt-20 ml-[2rem]">
                <div className="flex">
                    <div className="overflow-y-hidden rounded-lg pt-10 bg-offgreen mx-auto h-auto w-[90%] sm:px-8 shadow-md shadow-lime-400 mr-20 mb-20">
                    {bookings.length > 0 ? 
                        <div className='flex flex-row justify-between'>
                            <h1 className='flex justify-center text-3xl mb-4 rounded-md text-black  font-mono font-semibold uppercase gap-4'><FaCartArrowDown className='mt-1' />Bookings</h1>
                            <SearchIcon className='absolute w-4 h-8 ml-2 text-black' />
                            <input
                                type='text'
                                placeholder='Search Properties'
                                className='border-2 text-center border-black p-1 rounded-lg h-[80%]'
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </div>
                        :""}
                        {bookings.length > 0 ? (
                            <div className="overflow-x-auto ">
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
                                    <tbody className="text-black font-semibold font-mono">
                                        {bookings.map((data, index) => (
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
                                                            <PropertyDetails propertyId={data.property_id} className="whitespace-no-wrap border-2" />
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
                                        ))}
                                    </tbody>

                                </table>
                            </div>

                        ) : (
                            <div className='w-[82rem] p-10 flex justify-start md:justify-center mr-[30rem]'>
                                <h1 className='font-bold text-center text-2xl'><span className='text-lime-400'>No</span> Orders Found!</h1>
                            </div>
                        )}
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    );
};

export default BookingList;
