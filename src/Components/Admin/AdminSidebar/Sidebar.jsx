// src/components/Sidebar.js
import React from 'react';
import { HomeIcon, UserIcon, ClipboardCheckIcon, UsersIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="bg-gray-950 h-screen w-[14%] py-8">
            <div className="flex flex-col items-center ml-4 justify-between">
                <div className="mb-8  gap-2">
                <Link to='/admin/'>
                    <HomeIcon className="h-8 w-8 text-white hover:text-yellow-100" />
                    <p className="text-white text-sm mt-2 mr-2 hover:text-yellow-200 hover:underline">Dashboard</p>
                </Link>
                </div>


                <div className="mb-8  gap-2">
                    <Link to='/admin/Properties'>
                        <ClipboardCheckIcon className="h-8 w-8 text-white hover:text-yellow-100" />
                        <p className="text-white text-sm mt-2 mr-2 hover:text-yellow-200 hover:underline">Properties</p>
                    </Link>
                </div>


                <div className="mb-8  gap-2 ">
                <Link to='/admin/ownerlist'>
                    <UserIcon className="h-8 w-8 text-white hover:text-yellow-100" />
                    <p className="text-white text-sm mt-2 mr-2 hover:text-yellow-200 hover:underline">Owner List</p>
                </Link>
                </div>


                <div className="mb-8  gap-2">
                <Link to='/admin/userlist'>
                    <UsersIcon className="h-8 w-8 text-white hover:text-yellow-100" />
                    <p className="text-white text-sm mt-2 mr-3 hover:text-yellow-200 hover:underline">User List</p>
                </Link>
                </div>


                <div className='mb-8  gap-2'>
                    <ClipboardCheckIcon className="h-8 w-8 text-white hover:text-yellow-100" />
                    <p className="text-white text-sm mt-2 mr-4 hover:text-yellow-100 hover:underline">KYC List</p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
