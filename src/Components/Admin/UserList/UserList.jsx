import React, { useEffect, useState } from 'react';
import Sidebar from '../AdminSidebar/Sidebar';
import Header from '../AdminHeader/Header';
import { ToastContainer, toast } from 'react-toastify'
import { FetchUserDetails, UserBlockUnBlock } from '../../../Api/AdminApi';
import { FaUser } from 'react-icons/fa';

function UserList() {
  const [state, SetState] = useState(false)
  const [users, setUsers] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getuserInfo = async () => {
      try {
        const userData = await FetchUserDetails();
        console.log(userData, "userdata from get userinfo userlist");

        const userDetailsArray = userData.data.UserDetails || [];
        console.log(userDetailsArray, "iddddddd");
        setUsers(userDetailsArray);
      } catch (error) {
        console.log("error got ", error);
      }
    }
    getuserInfo();
  }, []);
  useEffect(() => {
    if (users.length > 0) {
      console.log(users, ']]]]');
      console.log(users.is_block, '=========');
      const data = users.find((item) => SetState(item.is_block))

    }
  }, [users]);

  const userBlockHandle = async (id, is_block) => {
    console.log(id, "iddddddddddddd enter to userblock handleeeeee");

    try {
      const res = await UserBlockUnBlock(id);
      console.log(res, "ressssssssss in useblockHandle in userlist");

      const updatedUsers = users.map((user) =>
        user._id === id ? { ...user, is_block: !is_block } : user
      );

      setUsers(updatedUsers);

      const blockAction = !is_block ? "blocked" : "unblocked";
      console.log(is_block, `User ${blockAction}`);
      toast.success(`User ${blockAction}`);

      if (!is_block) {
        console.log(is_block, "blocked status 1");
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.log("Error during user blocking:", error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filtereduser = currentItems.filter(
    (data) =>
      String(data.username).toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(data.mobile).includes(searchTerm) ||
      String(data.email).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col w-full">
        <Header />
        <div className="flex">
          <Sidebar />
          <div className="overflow-y-hidden rounded-lg pt-10 ml-1 bg-offgreen mx-auto h-auto w-screen sm:px-8 bg-gray-100">
            <div className='flex justify-between lg:flex-row flex-col'>
              <h1 className='font-semibold text-xl uppercase font-mono flex flex-row gap-2 mb-2'>
                <FaUser className='w-8 h-6' />
                User List
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
                    <th className="px-5 py-3">Mobile</th>
                    <th className="px-5 py-3">Status</th>
                  </tr>
                </thead>

                <tbody className="text-gray-500">
                  {Array.isArray(filtereduser) && filtereduser.map((user, index) => (

                    <tr key={index}>
                      <td className=" border-gray-200 bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap">{index + 1}</p>
                      </td>
                      <td className=" border-gray-200 bg-white px-1 py-5 text-sm">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img className="h-full w-full rounded-full" src="https://cdn-icons-png.freepik.com/512/219/219988.png" alt="" />
                          </div>
                          <div className="ml-3">
                            <p className="whitespace-no-wrap text-grey" >{user.username}</p>
                          </div>
                        </div>
                      </td>
                      <td className=" border-gray-200 bg-white px-1 py-5 text-sm">
                        <p className="whitespace-no-wrap">{user.email}</p>
                      </td>
                      <td className=" border-gray-200 bg-white px-1 py-5 text-sm">
                        <p className="whitespace-no-wrap">{user.mobile}</p>
                      </td>

                      <td className=" border-gray-200 bg-white px-1 py-5 text-sm">
                        <td className="border-b border-gray-200 bg-white px-1 py-5 text-sm">
                          <button
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${user.is_block ? "bg-black text-white" : "bg-red-700 text-white"
                              }`}
                            onClick={() => userBlockHandle(user._id, user.is_block)}
                          >
                            {user.is_block ? "Unblock" : "Block"}
                          </button>
                        </td>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col items-center   bg-white px-5 py-5 sm:flex-row sm:justify-left">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="mr-2 px-3 py-1 text-xs font-semibold bg-gray-400 text-white rounded-full"
              >
                Previous
              </button>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={indexOfLastItem >= users.length}
                className="px-3 py-1 text-xs font-semibold bg-gray-400 text-white rounded-full"
              >
                Next
              </button>
              <div className='w-full flex justify-end'>
                <span className="text-xs text-gray-600 sm:text-sm ">
                  Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, users.length)} of {users.length} Entries
                </span>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>

  );
}

export default UserList;
