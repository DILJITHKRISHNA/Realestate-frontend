import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { FetchProfileData, FetchWalletHistory } from '../../../Api/UserApi';
import { useSelector } from 'react-redux';
import { HiOutlineCheckCircle } from 'react-icons/hi2';
import { PropertyAbout } from '../EnquiryList/PropertyAbout';

function History() {
    const user = useSelector(state => state.user.userInfo);
    const selector = useSelector(state => state.user.userInfo)
    const [searchTerm, setSearchTerm] = useState("");
    const [walletHistory, setWalletHistory] = useState([]);
    const [wallet, setWallet] = useState([]);
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {

        const getWalletHistory = async () => {
            try {
                const response = await FetchWalletHistory()
                console.log(response, "response in wallet history");
                const data = response.data.Wallethistory
                const details = data.find((item) => item.user_id === selector.id)
                console.log(details, "dettt");
                console.log(response, "Ress in payment historyyy ");
                if (details) {
                    setWalletHistory(data)
                }
            } catch (error) {
                console.log("getWalletHistory", error);
            }
        }
        getWalletHistory()
    }, [])

    useEffect(()=>{
        const walletMoney = async () => {
            const res = await FetchProfileData(user.id)
            console.log(res, "Res in wallet money profile");
            if(res.data.success){
                setWallet(res.data.userData)
            }
        }
        if(user){
            walletMoney()
        }
    },[])

    const date = walletHistory.map((item)=>item.createdAt)
    const FormattedDate = new Date(date)
    const ExactDate = FormattedDate.toLocaleDateString();

    const filteredHistory = walletHistory.filter(
        (data) =>
            String(data.username).toLowerCase().includes(searchTerm.toLowerCase()) ||
            String(data.property_id).includes(searchTerm) ||
            String(data.mobile).includes(searchTerm) ||
            String(data.Rent).includes(searchTerm)
    );

    return (
        <div>
            <>
                <div className="flex flex-col w-full mt-36">
                    <div className="overflow-y-hidden rounded-lg bg-offgreen mx-auto h-auto w-[90%] sm:px-4 shadow-md shadow-lime-400 mr-20">
                        <div className="flex flex-col sm:flex-row h-7 mb-10 mt-2 justify-between">
                            <h1 className="flex justify-center text-3xl w-full sm:mb-0 sm:w-auto sm:mr-36 rounded-md text-black uppercase font-mono font-semibold">
                                Wallet History
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
                                        <th className="px-5 py-3">Property Details</th>
                                        <th className="px-5 py-3">Mobile</th>
                                        <th className="px-5 py-3">Wallet</th>
                                        <th className="px-5 py-3">Debited</th>
                                        <th className="px-5 py-3">Status</th>
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
                                                        <p className="whitespace-no-wrap" >{ExactDate}</p>
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
                                                        <p className="whitespace-no-wrap" >₹{wallet.wallet + data.Rent}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className=" border-gray-200 bg-white px-1 py-5 text-sm">
                                                <div className="flex items-center">
                                                    <div className="ml-6">
                                                        <p className="whitespace-no-wrap text-red-600" >-₹{data.Rent}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className=" border-gray-200 bg-white px-1 py-5 text-sm">
                                                <div className="flex items-center">
                                                    <div className="ml-6">
                                                        <p className="whitespace-no-wrap flex flex-row text-green-600" >
                                                            <HiOutlineCheckCircle className=' w-6 h-5 text-green-900 animate-pulse' />
                                                            {data.bookingStatus}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                        </tr>
                                    </tbody>
                                ))}
                            </table>
                        </div>
                    </div>
                    <ToastContainer />
                </div>
            </>
        </div>
    )
}

export default History
