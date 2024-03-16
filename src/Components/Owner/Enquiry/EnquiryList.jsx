import React, { useEffect, useState } from 'react'
import { PropertyAbout } from '../../User/EnquiryList/PropertyAbout'
import { FaListOl, FaSearch } from 'react-icons/fa'
import { ToastContainer } from 'react-toastify'
import { useSelector } from 'react-redux'
import { FetchEnquiry, createUserChat } from '../../../Api/UserApi'

function EnquiryList() {

    const selector = useSelector(state => state.user.userInfo)
    const [enquiryData, setEnquiryData] = useState([])
    const [ownerId, setOwnerID] = useState([])

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
        const data = enquiryData.find((item) => setOwnerID(item.OwnerRef))
    }, [enquiryData])

    const HandleCreateChat = async (e) => {
        e.preventDefault()
        try {
            const res = await createUserChat(selector.id, enquiryData.OwnerRef)
            console.log(res, "response in creating chat");
        } catch (error) {

        }
    }

    return (
        <>
            <div className="flex flex-col w-full mt-20 ml-10 lg:ml-4 ">
                <div className="flex">
                    <div className="overflow-y-hidden rounded-lg pt-10 bg-offgreen mx-auto h-auto w-[90%] sm:px-8 shadow-md shadow-lime-400 mr-20 mb-20">
                        <div className='flex lg:flex-row justify-between flex-col'>
                            <h1 className='flex justify-center text-3xl mb-4 rounded-md text-black font-mono font-semibold uppercase gap-4 mr-10'>
                                <FaListOl className='mt-1 lg:ml-2' />
                                New Enquiries
                            </h1>
                            <div className='relative flex items-center ml-2'>
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
                        <div className="overflow-x-auto mt-6">
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
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    )
}

export default EnquiryList
