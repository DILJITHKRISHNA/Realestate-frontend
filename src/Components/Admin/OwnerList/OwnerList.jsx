import React, { useEffect, useState } from 'react'
import Header from '../AdminHeader/Header'
import Sidebar from '../AdminSidebar/Sidebar'
import { ToastContainer, toast } from 'react-toastify'
import { OwnerBlockUnBlock, fetchOwnerData } from '../../../Api/AdminApi'
import { FaUsers } from 'react-icons/fa'

function OwnerList() {

  const [owners, setOwners] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    const OwnerData = async () => {
      try {
        const storedOwners = JSON.parse(localStorage.getItem('owners'));

        const ownerData = await fetchOwnerData();
        const ownerDetails = ownerData.data.OwnerDetails || [];
        setOwners(ownerDetails);

      } catch (error) {
        console.log(error);
      }
    };

    OwnerData();
  }, []);


  const OwnerBlockHandle = async (id, is_block) => {
    try {
      const res = await OwnerBlockUnBlock(id);

      const updatedOwners = owners.map((owner) => {
        if (owner._id === id) {
          return { ...owner, is_block: !is_block };
        }
        return owner;
      });

      setOwners(updatedOwners);

      // Update localStorage
      localStorage.setItem('ownertok', JSON.stringify(updatedOwners));

      if (!is_block) {
        localStorage.removeItem('ownertok');
        toast.success("Owner blocked");
      } else {
        toast.success("Owner unblocked");
      }
    } catch (error) {
      console.log("Error during Owner blocking:", error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = owners.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredowner = currentItems.filter(
    (data) =>
      String(data.username).toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(data.city).toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(data.email).toLowerCase().includes(searchTerm.toLowerCase())

  );

  return (
    <>
      <div className="flex flex-col w-full">
        <Header />
        <div className="flex">
          <Sidebar />
          <div className="overflow-y-hidden rounded-lg pt-10 ml-1 bg-offgreen mx-auto h-auto w-screen sm:px-8 bg-gray-100" >
            <div className='flex justify-between lg:flex-row flex-col'>
              <h1 className='font-semibold text-xl uppercase font-mono flex flex-row gap-2 mb-2'>
                <FaUsers className='w-8 h-6' />
                Owner List
              </h1>
              <h1 className='font-semibold text-xl uppercase font-mono flex flex-row gap-2'>
                <input
                  type="search"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearch}
                  className="border border-black px-2 h-6 text-sm rounded-md"
                />
              </h1>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-400 text-left text-xs font-semibold uppercase tracking-widest text-white">
                    <th className="px-5 py-3">ID</th>
                    <th className="px-5 py-3">Full Name</th>
                    <th className="px-5 py-3">Email</th>
                    <th className="px-2 py-3">City</th>
                    <th className="px-5 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="text-gray-500">
                  {Array.isArray(filteredowner) && filteredowner.map((owner, index) => (
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
                        <p className="whitespace-no-wrap">{owner.city}</p>
                      </td>

                      <td className=" border-gray-200 bg-white px-1 py-5 text-sm">
                        <td className="border-b border-gray-200 bg-white px-1 py-5 text-sm">
                          {!owner.is_block ? (
                            <button
                              className={`rounded-full px-3 py-1 text-xs font-semibold bg-red-700 text-white`}
                              onClick={() => OwnerBlockHandle(owner._id, owner.is_block)}>
                              Block
                            </button>
                          ) : (
                            <button
                              className={`rounded-full px-3 py-1 text-xs font-semibold bg-black text-white`}
                              onClick={() => OwnerBlockHandle(owner._id, owner.is_block)}>
                              Unblock
                            </button>
                          )}
                        </td>
                      </td>
                    </tr>
                  ))}
                </tbody>
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
                  disabled={indexOfLastItem >= owners.length}
                  className="px-3 py-1 text-xs font-semibold bg-gray-400 text-white rounded-full"
                >
                  Next
                </button>
              </div>
              <span className="text-xs text-gray-600 sm:text-sm">
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, owners.length)} of {owners.length} Entries
              </span>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  )
}

export default OwnerList
