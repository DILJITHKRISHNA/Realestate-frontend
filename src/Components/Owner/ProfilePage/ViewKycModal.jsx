import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { GetKyc } from '../../../Api/OwnerApi'

function ViewKycModal({setOpen}) {
const [data, SetData] = useState([])

    useEffect(() => {

        const GetKYCDetails = async () => {
            const KycData = await GetKyc()
            console.log(KycData.data.kycData, "ooooooooooooooowwwwwwwwww");
            const KycDetails = KycData.data.kycData
           SetData(KycDetails)
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
                <div className="bg-white p-8 rounded-md">
                    <div className=" overflow-y-hidden rounded-lg pt-10  bg-offgreen mx-auto h-auto sm:px-8 bg-gray-100 w-[100%] ">
                        <div className=" mb-8 overflow-x-auto border-2 border-black h-full w-[400px] ">
                            <h2 className="text-lg font-bold mt-2 ml-6 ">KYC Details</h2>

                            <h1 className='mt-2 ml-4 font-bold text-lg border-b-2 border-black pb-4 w-[95%]'></h1>
                            {data.map((kycData) => (

                                <div className='ml-6 mt-6 flex flex-col justify-center items font-semibold'>
                                    <div className='flex flex-col gap-6'>
                                        <h1>Fullname: <span className='font-bold'>{kycData.username }</span></h1>
                                        <h1>Email: <span className='font-bold'>{kycData.email }</span></h1>
                                        <h1>Pancard: <span className='font-bold'>{kycData.panCard }</span></h1>
                                        <h1>Occupation: <span className='font-bold'>{kycData.occupation }</span></h1>
                                        <h1>Address: <span className='font-bold'>{kycData.address }</span></h1>
                                        <h1>City: <span className='font-bold'>{kycData.city }</span></h1>
                                        <h1>Country: <span className='font-bold'>{kycData.country }</span></h1>
                                        <h1>Zip Code: <span className='font-bold'>{kycData.zipCode }</span></h1>
                                        <h1>State: <span className='font-bold'>{kycData.state }</span></h1>
                                    </div>
                                    <div className="mt-4 flex justify-center gap-8 mb-2">
                                        <button
                                            onClick={handleClose}
                                            className="text-white mr-2 bg-black rounded-full w-14"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            ))}  
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
