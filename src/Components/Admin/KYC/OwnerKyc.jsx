import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import Header from '../AdminHeader/Header'
import Sidebar from '../AdminSidebar/Sidebar'
import { approveOwner, kycList } from '../../../Api/AdminApi'

function OwnerKyc() {
    const [kycData, SetKycData] = useState([])
    const [state, SetState] = useState(false)
    const [showModal, setShowModal] = useState(false);

    const handleOpen = () => {
        setShowModal(!showModal)
    }

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
            console.log(res, "Rsicicccoppp");

            if (res.data.success) {
                toast.success("Action Successful");
                SetKycData(prevData =>
                    prevData.map(item =>
                        item._id === kycId ? { ...item, is_approve: !item.is_approve } : item
                    )
                );
            } else {
                toast.error("Action Failed");
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
                                        <th className="px-5 py-3">Email</th>
                                        <th className="px-5 py-3">Occupation</th>
                                        <th className="px-5 py-3">City</th>
                                        <th className="px-5 py-3">Country</th>
                                        <th className="px-5 py-3">State</th>
                                        <th className="px-5 py-3">Photo</th>
                                        <th className="px-5 py-3">Approval</th>
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
                                                <p className="whitespace-no-wrap">{kyc.email}</p>
                                            </td>
                                            <td className=" border-gray-200 bg-white px-1 py-5 text-sm">
                                                <p className="whitespace-no-wrap">{kyc.occupation}</p>
                                            </td>
                                            <td className=" border-gray-200 bg-white px-1 py-5 text-sm">
                                                <p className="whitespace-no-wrap">{kyc.city}</p>
                                            </td>
                                            <td className=" border-gray-200 bg-white px-1 py-5 text-sm">
                                                <p className="whitespace-no-wrap">{kyc.country}</p>
                                            </td>
                                            <td className=" border-gray-200 bg-white px-1 py-5 text-sm">
                                                <p className="whitespace-no-wrap">{kyc.state}</p>
                                            </td>
                                            <td className=" border-gray-200 bg-white px-1 py-5 text-sm">
                                                <p className="whitespace-no-wrap">photo</p>
                                            </td>

                                            <td className=" border-gray-200 bg-white px-1 py-5 text-sm">
                                                <p className={`whitespace-no-wrap font-bold ${kyc.is_approve ? "text-green-500" : "text-red-500"}`}>{kyc.is_approve ? "Approved" : "Rejected"}</p>
                                            </td>

                                            <td className="border-b border-gray-200 bg-white px-1 py-5 text-sm ">
                                                <button
                                                    onClick={setShowModal}
                                                    className="bg-gradient-to-r bg-black rounded-full text-white px-3 py-1 text-xs font-semibold"
                                                >
                                                    Status
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
            {Array.isArray(kycData) && kycData.map((kyc) => (

                <form onClick={handleOpen}>

                    <div className={`fixed inset-0 ${showModal ? 'visible' : 'hidden'}`}>
                        <div className="flex items-center justify-center min-h-screen">
                            <div className="bg-white w-full max-w-md p-6 rounded shadow-md">
                                <h2 className="text-xl font-bold mb-4">Confirmation!</h2>
                                <p className="mb-4">
                                    "Please confirm your decision: Do you want to approve or reject this request?"
                                </p>
                                <div className="flex justify-end gap-4">
                                    <button
                                        onClick={() => ApproveKyc(kyc._id, kyc.is_approve === true)}
                                        className="bg-gradient-to-r bg-green-700 rounded-full text-white px-3 py-1 text-xs font-semibold"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => ApproveKyc(kyc._id, kyc.is_approve === false)}
                                        className="bg-gradient-to-r bg-red-700 rounded-full text-white px-4 py-2 text-xs font-semibold"
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>;
                </form>
            ))}
            <ToastContainer />
        </div>
    )
}

export default OwnerKyc
