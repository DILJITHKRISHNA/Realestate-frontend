import React, { useEffect, useState } from 'react';
import Sidebar from '../AdminSidebar/Sidebar';
import Header from '../AdminHeader/Header';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify'
import { FetchUserDetails, UserBlockUnBlock } from '../../../Api/AdminApi';

function UserList() {
  const [state, SetState] = useState(false)
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getuserInfo = async () => {
      try {
          const userData = await FetchUserDetails();
          console.log(userData, "userdata from get userinfo userlist");

          const userDetailsArray = userData.data.UserDetails || [];
          // console.log(userDetailsArray[0]._id, "iddddddd");
          setUsers(userDetailsArray);
        } catch (error) {
          console.log("error got ", error);
        }
      }
      getuserInfo();
    }, []);

    useEffect(() => {
      if (users.length > 0) {
        SetState(users[0].is_block);
      }
    }, [users]);

    const userBlockHandle = async (id, is_block) => {
      console.log(id, "iddddddddddddd enter to userblock handleeeeee");
      try {
        const res = await UserBlockUnBlock(id);

        console.log(res, "ressssssssss in useblockHandle in userlist");

        const updatedUsers = users.map((user) => {
          if (user._id === id) {
            return { ...user, is_block: !is_block };
          }
          return user;
        });

        setUsers(updatedUsers);

        if (!is_block) {
          console.log(is_block, "blocked status 1");
          toast.success("User blocked");
          localStorage.removeItem('token');
        } else {
          console.log(is_block, "blocked status 2");
          toast.success("User unblocked");
        }
    } catch (error) {
      console.log("Error during user blocking:", error);
    }
  };


  return (
    <>
      <div className="flex flex-col w-full">
        <Header />
        <div className="flex">
          <Sidebar />
          <div className="overflow-y-hidden rounded-lg pt-10 ml-1 bg-offgreen mx-auto h-auto w-screen sm:px-8 bg-gray-100">
            <h1 className='flex justify-center font-bold text-2xl mb-4 bg-slate-950 rounded-md text-white'>USER LIST</h1>
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
                  {Array.isArray(users) && users.map((user, index) => (

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
                          {!state ? (
                            <button
                              className={`rounded-full px-3 py-1 text-xs font-semibold bg-red-700 text-white `}
                              onClick={() => userBlockHandle(user._id, user.is_block)}>
                              Block
                            </button>
                          ) : (
                            <button
                              className={`rounded-full px-3 py-1 text-xs font-semibold bg-black text-white `}
                              onClick={() => userBlockHandle(user._id, user.is_block)}>
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
            <div className="flex flex-col items-center  bg-white px-5 py-5 sm:flex-row sm:justify-between">
              {/* <span className="text-xs text-gray-600 sm:text-sm"> Showing 1 to {userData?.length || 0} of Entries </span> */}

            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>

  );
}

export default UserList;
