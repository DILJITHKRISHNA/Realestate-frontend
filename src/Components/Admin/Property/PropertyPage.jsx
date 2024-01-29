import React, { useState } from 'react'
import Header from '../AdminHeader/Header'
import Sidebar from '../AdminSidebar/Sidebar'
import { ToastContainer, toast } from "react-toastify"

function PropertyPage() {


  return (
    <div className="flex flex-col w-full">
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="mt-2 overflow-y-hidden rounded-lg pt-10 ml-1 bg-offgreen mx-auto h-auto w-screen sm:px-8 bg-gray-100">
          
          <table className='mt-2 w-full'>
            <thead>
              <tr className='bg-blue-400 text-left text-xs font-semibold uppercase tracking-widest text-black'>
                <th className='px-5 py-3'>Index</th>
                <th className='px-5 py-3'>Property ID</th>
                <th className='px-5 py-3'>Property type</th>
                <th className='px-5 py-3'>Rent Amount</th>
                <th className='px-5 py-3'>Approval</th>
                <th className='px-5 py-3'>Manage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='border-gray-200 bg-white px-5 py-5 text-sm'>1</td>
                <td className='border-gray-200 bg-white px-5 py-5 text-sm'>fdjh</td>
                <td className='border-gray-200 bg-white px-5 py-5 text-sm'>fdjh</td>
                <td className='border-gray-200 bg-white px-5 py-5 text-sm'>fdjh</td>
                <td className='border-gray-200 bg-white px-5 py-5 text-sm'>fdjh</td>
                <td className="border-b border-gray-200 bg-white px-1 py-5 text-sm">
                  <button
                    className={`rounded-full px-3 py-1 text-xs font-semibold bg-green-600 text-white `}>
                    Approve
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* modal */}
        
      {/* modal */}
    </div >


  )
}

export default PropertyPage












