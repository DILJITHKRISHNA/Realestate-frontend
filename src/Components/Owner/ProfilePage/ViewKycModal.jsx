import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { GetKyc } from '../../../Api/OwnerApi'
import { useSelector } from 'react-redux'

function ViewKycModal({ setOpen }) {
    const selector = useSelector(state => state.owner.OwnerInfo.email)
    const [data, SetData] = useState([])

    useEffect(() => {

        const GetKYCDetails = async () => {
            const KycData = await GetKyc()
            console.log(KycData.data.kycData, "ooooooooooooooowwwwwwwwww");
            const KycDetails = KycData.data.kycData
            const data = KycDetails.find((item) => item.email === selector)
            SetData(data)
        }
        GetKYCDetails()
    }, [])

    const handleClose = () => {
        setOpen(false)
    }

    return (

        <div >
            {/* Modal */}
            {/* {isOpen && ( */}
            <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-8 rounded-md sm:mx-4 md:mx-16 lg:mx-32 xl:mx-48">
                    <div className="overflow-y-auto rounded-lg pt-10 bg-offgreen mx-auto h-auto sm:px-8 bg-gray-100 w-full max-w-md">
                        <div className="mb-8 overflow-x-auto border-2 border-black">
                            <h2 className="text-lg font-bold mt-2 ml-6">KYC Details</h2>
                            <h1 className="mt-2 ml-4 font-bold text-lg border-b-2 border-black pb-4 w-[95%]"></h1>
                            <div className="ml-6 mt-6 flex flex-col gap-6">
                                <h1>Fullname: <span className="font-bold">{data.username}</span></h1>
                                <h1>Email: <span className="font-bold">{data.email}</span></h1>
                                <h1>Pancard: <span className="font-bold">{data.panCard}</span></h1>
                                <h1>Occupation: <span className="font-bold">{data.occupation}</span></h1>
                                <h1>Address: <span className="font-bold">{data.address}</span></h1>
                                <h1>City: <span className="font-bold">{data.city}</span></h1>
                                <h1>Country: <span className="font-bold">{data.country}</span></h1>
                                <h1>Zip Code: <span className="font-bold">{data.zipCode}</span></h1>
                                <h1>State: <span className="font-bold">{data.state}</span></h1>
                            </div>
                            <div className="mt-4 flex justify-center gap-8 mb-2">
                                <button
                                    onClick={handleClose}
                                    className="text-white bg-black rounded-full w-14"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* )} */}
            <ToastContainer />

        </div >

    )
}

export default ViewKycModal
