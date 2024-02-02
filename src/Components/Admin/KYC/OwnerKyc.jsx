import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import Header from '../AdminHeader/Header'
import Sidebar from '../AdminSidebar/Sidebar'
import { approveOwner, kycList } from '../../../Api/AdminApi'

function OwnerKyc() {
    const [kycData, SetKycData] = useState([])
    const [state, SetState] = useState(false)

    useEffect(() => {

        const handleKyc = async () => {
            try {
                const OwnerVerifyData = await kycList()
                const verifyData = OwnerVerifyData.data.ownerData || []
                console.log(verifyData, "datasdfsdaa");
                SetKycData(verifyData);
            } catch (error) {
                console.log(error);
            }
        }
        handleKyc()
    }, [])


    const ApproveKyc = async (kycId) => {
        try {
            const res = await approveOwner(kycId);
            console.log(res,"Rsicicccoppp");
            if (res.data.success === true) {
                toast.success("Approved Successfully");

                SetKycData(prevData =>
                    prevData.map(item =>
                        item._id === kycId ? { ...item, is_approve: !item.is_approve } : item
                    )
                );
            } 
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div>
            <div className="flex flex-col w-full">
                <Header />
                <div className="flex">
                    <Sidebar />
                    <div className="overflow-y-hidden rounded-lg pt-10 ml-1 bg-offgreen mx-auto h-auto w-screen sm:px-8 bg-gray-100" >
                        <h1 className='flex justify-center font-bold text-2xl mb-4 bg-slate-950 uppercase rounded-md text-white'>Kyc Management</h1>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-400 text-left text-xs font-semibold uppercase tracking-widest text-white">
                                        <th className="px-5 py-3">KYC ID</th>
                                        <th className="px-5 py-3">Full Name</th>
                                        <th className="px-5 py-3">PAN</th>
                                        <th className="px-5 py-3">Photo</th>
                                        <th className="px-5 py-3">Status</th>
                                    </tr>
                                </thead>
                                {Array.isArray(kycData) && kycData.map((kyc) => (

                                    <tbody className="text-gray-500" key={kyc._id}>
                                        <tr >
                                            <td className=" border-gray-200 bg-white px-5 py-5 text-sm">
                                                <p className="whitespace-no-wrap" >{kyc._id}</p>
                                            </td>
                                            <td className=" border-gray-200 bg-white px-1 py-5 text-sm">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 flex-shrink-0">
                                                        <img className="h-full w-full rounded-full" src="https://cdn-icons-png.freepik.com/512/219/219988.png" alt="" />
                                                    </div>
                                                    <div className="ml-3">
                                                        <p className="whitespace-no-wrap text-grey">{kyc.username}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className=" border-gray-200 bg-white px-1 py-5 text-sm">
                                                <p className="whitespace-no-wrap">{kyc.panCard}</p>
                                            </td>
                                            <td className=" border-gray-200 bg-white px-1 py-5 text-sm">
                                                <p className="whitespace-no-wrap">photo</p>
                                            </td>

                                            <td className="border-b border-gray-200 bg-white px-1 py-5 text-sm ">
                                                <button
                                                    className={` rounded-full px-3 py-1 text-xs font-semibold ${kyc.is_approve ? " bg-green-700" : "bg-red-700"} text-white`}
                                                    onClick={() => ApproveKyc(kyc._id)}>
                                                    {!kyc.is_approve ? "Reject" : "Approved"}
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                ))}

                            </table>
                        </div>
                        <div className="flex flex-col items-center  bg-white px-5 py-5 sm:flex-row sm:justify-between">
                            {/* <span className="text-xs text-gray-600 sm:text-sm"> Showing 1 to {userData?.length || 0} of Entries </span> */}

                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default OwnerKyc
