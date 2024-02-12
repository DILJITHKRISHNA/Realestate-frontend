import React, { useEffect, useState } from 'react'
import Header from '../AdminHeader/Header'
import Sidebar from '../AdminSidebar/Sidebar'
import { ToastContainer, toast } from "react-toastify"
import { ListProperty, PropertyStatus } from '../../../Api/AdminApi'

function PropertyPage() {

  const [listingProperty, setListingProperty] = useState([])
  const [open, SetOpen] = useState(false)

  useEffect(() => {
    const handleGetProperty = async () => {
      try {
        const res = await ListProperty()
        const PropertyData = res.data.data || []
        setListingProperty(PropertyData)
      } catch (error) {
        console.log(error);
      }
    }
    handleGetProperty()
  }, [open])

  const handleClick = () => {
    SetOpen(!open)
  }

  const ApproveProperty = async (PropertyId, isVerified) => {
    SetOpen(false);
    try {
      const approve = await PropertyStatus(PropertyId);
      console.log(approve, "aprooooo");
      if (approve.data.success) {
        setListingProperty(prevData =>
          prevData.map(item =>
            item.id === PropertyId ? { ...item, is_verified: isVerified } : item
          )
        );
        toast.success(`Property ${isVerified ? 'approved' : 'rejected'} successfully!`);
      }
    } catch (error) {
      console.error("Error approving/rejecting property:", error);
    }
  };


  return (
    <div className="flex flex-col w-full">
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="mt-2 overflow-y-hidden rounded-lg pt-10 ml-1 bg-offgreen mx-auto h-auto w-screen sm:px-8 bg-gray-100">

          <table className='mt-2 w-full'>
            <thead>
              <tr className='bg-gray-400 text-left text-xs font-semibold uppercase tracking-widest text-black'>
                <th className='px-5 py-3'>Index</th>
                <th className='px-5 py-3'>Property ID</th>
                <th className='px-5 py-3'>Property type</th>
                <th className='px-5 py-3'>Rent Amount</th>
                <th className='px-5 py-3'>Approval</th>
                <th className='px-5 py-3'>Manage</th>
              </tr>
            </thead>
            {listingProperty.map((data, index) => (
              <tbody key={index}>
                <tr>
                  <td className='border-gray-200 bg-white px-5 py-5 text-sm'>{index + 1}</td>
                  <td className='border-gray-200 bg-white px-5 py-5 text-sm'>{data._id}</td>
                  <td className='border-gray-200 bg-white px-5 py-5 text-sm'>{data.type}</td>
                  <td className='border-gray-200 bg-white px-5 py-5 text-sm'>{data.Rent}</td>
                  <td className={`border-gray-200 bg-white px-5 py-5 text-sm ${data.is_verified ? "text-green-700 font-bold" : "text-red-700 font-bold"}`}>{data.is_verified ? "Approved" : "Rejected"}</td>
                  <td className="border-b border-gray-200 bg-white px-1 py-5 text-sm">
                    <button
                      onClick={handleClick}
                      className={`rounded-full px-3 py-1 text-xs font-semibold bg-green-600 text-white `}>
                      Status
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
      {/* modal */}
      {listingProperty.map((data) => (
        <div className={`fixed inset-0 ${open ? 'visible' : 'hidden'}`}>
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white w-full max-w-md p-6 rounded shadow-md">
              <h2 className="text-xl font-bold mb-4">Confirmation!</h2>
              <p className="mb-4">
                "Please confirm your decision: Do you want to approve or reject this request?"
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => ApproveProperty(data._id, data.is_verified === true)}
                  className="bg-gradient-to-r bg-green-700 rounded-full text-white px-3 py-1 text-xs font-semibold"
                >
                  Approve
                </button>
                <button
                  onClick={() => ApproveProperty(data._id, data.is_verified === false)}
                  className="bg-gradient-to-r bg-red-700 rounded-full text-white px-4 py-2 text-xs font-semibold"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      ))
      }
      {/* modal */}
      <ToastContainer/>
    </div >


  )
}

export default PropertyPage












