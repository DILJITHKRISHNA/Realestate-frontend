import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { CancelBookPayment, FetchPaymentData } from "../../../Api/UserApi";
import { FaStripe } from "react-icons/fa";
import { HiMiniXCircle, HiOutlineCheckCircle } from "react-icons/hi2";
import { PropertyAbout } from '../EnquiryList/PropertyAbout.jsx'
import { useSelector } from "react-redux";
export function ListPayment() {
    const selector = useSelector(state => state.user.userInfo);
    const [history, setHistory] = useState([]);
    const [Dates, setDates] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");


    useEffect(() => {

        const getPaymentData = async () => {
            try {
                const response = await FetchPaymentData()
                const data = response.data.history
                const details = data.find((item)=>item.user_id === selector.id)
                console.log(response, "Ress in payment historyyy ");
                if (details) {
                    setHistory(data)
                }
            } catch (error) {
                console.log("getPaymentData", error);
            }
        }
        getPaymentData()
    }, [])

    const dateArray = history.map((item) => new Date(item.createdAt));
    const formattedDates = dateArray.map((dateObject) => dateObject.toLocaleDateString())

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredHistory = history.filter(
        (data) =>
            String(data.username).toLowerCase().includes(searchTerm.toLowerCase()) ||
            data.createdAt.includes(searchTerm) ||
            String(data.property_id).includes(searchTerm) ||
            String(data.mobile).includes(searchTerm) ||
            String(data.Rent).includes(searchTerm) ||
            data.bookingStatus.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleClick = async (id, propertyId) => {
        try {
            const CancelBook = await CancelBookPayment(id, { propId: propertyId })
            console.log(CancelBook, "Cancel book ");
            if (CancelBook.data.success) {
                toast.error("Your Payment has been cancelled")
            } else {
                toast("Something went wrong! Please try again later.")
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className="flex flex-col w-full mt-36">
                <div className="overflow-y-hidden rounded-lg bg-offgreen mx-auto h-auto w-[90%] sm:px-4 shadow-md shadow-lime-400 mr-20">
                    <div className="flex flex-col sm:flex-row h-7 mb-10 mt-2 justify-between">
                        <h1 className="flex justify-center text-3xl w-full sm:mb-0 sm:w-auto sm:mr-36 rounded-md text-black uppercase font-mono font-semibold">
                            Payment History
                        </h1>
                        <input
                            type="search"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={handleSearch}
                            className="border border-black px-2 h-6 mt-2 rounded-md"
                        />
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-lime-300 text-center text-xs font-semibold uppercase tracking-widest text-white">
                                    <th className="px-5 py-3">ID</th>
                                    <th className="px-5 py-3">Payer</th>
                                    <th className="px-5 py-3">Payment Date</th>
                                    <th className="px-5 py-3">Payment Type</th>
                                    <th className="px-5 py-3">Property Name</th>
                                    <th className="px-5 py-3">Mobile</th>
                                    <th className="px-5 py-3">Amount</th>
                                    <th className="px-5 py-3">Status</th>
                                    <th className="px-5 py-3">Cancel</th>
                                </tr>
                            </thead>
                            {filteredHistory.map((data, index) => (

                                <tbody className="text-black font-semibold font-mono text-center">
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
                                                    <p className="whitespace-no-wrap" >{formattedDates[index]}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className=" border-gray-200 bg-white px-1 py-5 text-sm">
                                            <div className="flex items-center">
                                                <div className="ml-6">
                                                    <p className="whitespace-no-wrap  font-extrabold" >{data.payment_type}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className=" border-gray-200 bg-white px-1 py-5 text-sm">
                                            <div className="flex items-center">
                                                <div className="ml-6">
                                                    <PropertyAbout propertyId={data.property_id} className="whitespace-no-wrap" />
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
                                                    <p className="whitespace-no-wrap" >₹ {data.Rent}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className=" border-gray-200 bg-white px-1 py-5 text-sm">
                                            {data.is_canceled === false ? (
                                                <div className="flex items-center">
                                                    <div className=" flex flex-row ">
                                                        <HiOutlineCheckCircle className=' w-6 h-5 text-green-900 animate-pulse' />
                                                        <p className="whitespace-no-wrap text-green-600" >{data.bookingStatus}</p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex items-center">
                                                    <div className=" flex flex-row ">
                                                        <HiMiniXCircle className=' w-6 h-5 text-red-900 animate-pulse' />
                                                        <p className="whitespace-no-wrap text-red-600" >Canceled</p>
                                                    </div>
                                                </div>
                                            )}
                                        </td>
                                        <td className=" border-gray-200 bg-white px-1 py-5 text-sm">
                                            {data.is_canceled === false ?
                                                <div className="flex items-center">
                                                    <button onClick={() => handleClick(data._id, data.property_id)} className="border-2 border-lime-400 text-lime-400 p-1 ml-4 hover:bg-lime-400 hover:text-white">Cancel</button>
                                                </div>
                                                : ""}
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
                <ToastContainer />
            </div>
        </>

    );
}
