import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import Header from '../AdminHeader/Header'
import Sidebar from '../AdminSidebar/Sidebar'
import { FetchBookingData } from '../../../Api/AdminApi'
import { PropertyDetails } from './PropertyDetails'
import { FaSellsy } from 'react-icons/fa'

function ListBooking() {

    const [book, setBook] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    useEffect(() => {
        const getBookings = async () => {
            try {
                const response = await FetchBookingData()
                console.log(response, "Ress in fetchbookingssss");
                if (response.data.success) {
                    setBook(response.data.data)
                }
            } catch (error) {
                console.log(error);
            }
        }
        getBookings()
    }, [])


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = book.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return (
        <div>
            <div className="flex flex-col w-full">
                <Header />
                <div className="flex">
                    <Sidebar />
                    <div className="overflow-y-hidden rounded-lg pt-10 ml-1 bg-offgreen mx-auto h-auto w-screen sm:px-8 bg-gray-100">
                        <h1 className='font-semibold text-xl uppercase font-mono flex flex-row gap-2 mb-2'>
                            <FaSellsy className='w-8 h-6' />
                            Booking List
                        </h1>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-400 text-left text-xs font-semibold uppercase tracking-widest text-white">
                                        <th className="px-5 py-3">ID</th>
                                        <th className="px-5 py-3">Full Name</th>
                                        <th className="px-5 py-3">Email</th>
                                        <th className="px-5 py-3">Rent Amount</th>
                                        <th className="px-5 py-3">Mobile</th>
                                        <th className="px-5 py-3">Status</th>
                                        <th className="px-5 py-3">Details</th>
                                    </tr>
                                </thead>
                                {currentItems.map((data, index) => (

                                    <tbody className="text-gray-500">
                                        <tr key={index}>
                                            <td className=" border-gray-200 bg-white px-5 py-5 text-sm">
                                                <p className="whitespace-no-wrap">{index + 1}</p>
                                            </td>
                                            <td className=" border-gray-200 bg-white px-1 py-5 text-sm">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 flex-shrink-0">
                                                        <img className="h-full w-full rounded-full" src="https://cdn-icons-png.freepik.com/512/219/219988.png" alt="" />
                                                    </div>
                                                    <div className="ml-3">
                                                        <p className="whitespace-no-wrap text-grey" >{data.username}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className=" border-gray-200 bg-white px-1 py-5 text-sm">
                                                <p className="whitespace-no-wrap">{data.email}</p>
                                            </td>
                                            <td className=" border-gray-200 bg-white px-1 py-5 text-sm">
                                                <p className="whitespace-no-wrap">₹ {data.Rent}</p>
                                            </td>
                                            <td className=" border-gray-200 bg-white px-1 py-5 text-sm">
                                                <p className="whitespace-no-wrap">{data.mobile}</p>
                                            </td>
                                            {!data.is_canceled ? (
                                                <td className={`border-gray-200 bg-white px-1 py-5 text-sm font-semibold  ${data.bookingStatus === "Success" ? 'text-lime-500' : 'text-red-500  '} `}>
                                                    {data.bookingStatus}
                                                </td>
                                            ) : (
                                                <td className={`border-gray-200 bg-white px-1 py-5 text-sm font-semibold  ${data.is_canceled ? 'text-red-500' : ' text-green-500 '} `}>
                                                    {data.is_canceled === true ? "Canceled" : ""}
                                                </td>
                                            )}
                                            <td className=" border-gray-200 bg-white px-1 py-5 text-sm">
                                                <PropertyDetails propertyId={data.property_id} className="whitespace-no-wrap border-2 border-lime-400 w-20 h-7 text-lime-400 hover:bg-lime-400 hover:text-white font-semibold" />
                                            </td>
                                        </tr>
                                    </tbody>
                                ))}
                            </table>
                        </div>
                        <div className="flex flex-col items-center bg-white px-5 py-5 sm:flex-row sm:justify-between">
                            <div>
                                <button
                                    onClick={() => paginate(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="mr-2 px-3 py-1 text-xs font-semibold bg-gray-400 text-white rounded-full"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => paginate(currentPage + 1)}
                                    disabled={indexOfLastItem >= book.length}
                                    className="px-3 py-1 text-xs font-semibold bg-gray-400 text-white rounded-full"
                                >
                                    Next
                                </button>
                            </div>
                            <span className="text-xs text-gray-600 sm:text-sm">
                                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, book.length)} of {book.length} Entries
                            </span>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>
    )
}

export default ListBooking
