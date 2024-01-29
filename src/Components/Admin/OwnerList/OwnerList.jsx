import React, { useEffect, useState } from 'react'
import Header from '../AdminHeader/Header'
import Sidebar from '../AdminSidebar/Sidebar'
import { fetchOwnerData } from '../../../Api/AdminApi'

function OwnerList() {

  const [owners, setOwners] = useState([])

useEffect(()=>{

  const OwnerData = async() =>{
    try {
      const ownerData = await fetchOwnerData()
      console.log(ownerData," ownerdataaaaaaaaaaaaaaaaaaa");
      const ownerDetails = ownerData.data.OwnerDetails || []
      setOwners(ownerDetails)
    } catch (error) {
      console.log(error);
    }
  }

  OwnerData()
},[])
  

const userBlockHandle = () => {
  try {
    
  } catch (error) {
    
  }
}

  return (
    <>
      <div className="flex flex-col w-full">
        <Header />
        <div className="flex">
          <Sidebar />
          <div className="overflow-y-hidden rounded-lg pt-10 ml-1 bg-offgreen mx-auto h-auto w-screen sm:px-8 bg-gray-100">
          <h1 className='flex justify-center font-bold text-2xl mb-4 bg-slate-950 rounded-md text-white'>Owner LIST</h1>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-blue-400 text-left text-xs font-semibold uppercase tracking-widest text-white">
                    <th className="px-5 py-3">ID</th>
                    <th className="px-5 py-3">Full Name</th>
                    <th className="px-5 py-3">Email</th>
                    <th className="px-5 py-3">Mobile</th>
                    <th className="px-5 py-3">Verified</th>
                    <th className="px-5 py-3">Status</th>
                  </tr>
                </thead>

                <tbody className="text-gray-500">
                  { Array.isArray(owners) && owners.map((owner, index) => (

                    <tr >
                      <td className=" border-gray-200 bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap" >{index + 1}</p>
                      </td>
                      <td className=" border-gray-200 bg-white px-1 py-5 text-sm">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img className="h-full w-full rounded-full" src="https://cdn-icons-png.freepik.com/512/219/219988.png" alt="" />
                          </div>
                          <div className="ml-3">
                            <p className="whitespace-no-wrap text-grey">{owner.username}</p>
                          </div>
                        </div>
                      </td>
                      <td className=" border-gray-200 bg-white px-1 py-5 text-sm">
                        <p className="whitespace-no-wrap">{owner.email}</p>
                      </td>
                      <td className=" border-gray-200 bg-white px-1 py-5 text-sm">
                        <p className="whitespace-no-wrap">{owner.mobile}</p> 
                      </td>
                      <td className=" border-gray-200 bg-white px-1 py-5 text-sm">
                        <p className="whitespace-no-wrap ">{owner.is_Active}</p>
                      </td>
                      <td className=" border-gray-200 bg-white px-1 py-5 text-sm">
                        <td className="border-b border-gray-200 bg-white px-1 py-5 text-sm">
                          <button
                            className={`rounded-full ${owner.is_block ? 'bg-black' : 'bg-red-900'} px-3 py-1 text-xs font-semibold ${owner.is_block ? 'text-white' : 'text-white'}`}
                            onClick={() => userBlockHandle(owner)}>
                            {owner.is_block ? 'Block' : 'Unblock'}
                          </button>
                        </td>
                      </td>
                    </tr>
                   ))} 
                </tbody>
              </table>
            </div>
            <div className="flex flex-col items-center  bg-white px-5 py-5 sm:flex-row sm:justify-between">
              {/* <span className="text-xs text-gray-600 sm:text-sm"> Showing 1 to {userData?.length || 0} of Entries </span> */}

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OwnerList
