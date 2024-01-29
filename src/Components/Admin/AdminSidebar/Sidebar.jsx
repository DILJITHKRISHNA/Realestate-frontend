// src/components/Sidebar.js
import React, { useState } from 'react';
import { HomeIcon, UserIcon, ClipboardCheckIcon, UsersIcon} from '@heroicons/react/solid';
import { Link } from 'react-router-dom';

const Sidebar = () => {

    const [selectedItem, setSelectedItem] = useState('');

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    return (
        <>
            <div className="bg-gray-950 h-screen w-[14%] py-8">
                <div className="flex flex-col items-center ml-4 justify-between">
                    <div className="mb-8 gap-2">
                        <Link to='/admin/' onClick={() => handleItemClick('dashboard')}>
                            <HomeIcon
                                className={`h-8 w-8 text-white ${selectedItem === 'dashboard' && 'text-yellow-300'
                                    }`}
                            />
                            <p
                                className={`text-white text-sm mt-2 mr-1 hover:text-yellow-200 hover:underline ${selectedItem === 'dashboard' && 'hover:text-yellow-100'
                                    }`}
                            >
                                Dashboard
                            </p>
                        </Link>
                    </div>

                    <div className="mb-8 gap-2">
                        <Link to='/admin/userlist' onClick={() => handleItemClick('userList')}>
                            <UsersIcon
                                className={`h-8 w-8 text-white ${selectedItem === 'userList' && ' text-yellow-300'
                                    }`}
                            />
                            <p
                                className={`text-white text-sm mt-2 mr-3 hover:text-yellow-200 hover:underline ${selectedItem === 'userList' && 'hover:text-yellow-100'
                                    }`}
                            >
                                User List
                            </p>
                        </Link>
                    </div>

                    <div className="mb-8 gap-2">
                        <Link to='/admin/ownerlist' onClick={() => handleItemClick('owner')}>
                            <UserIcon
                                className={`h-8 w-8 text-white ${selectedItem === 'owner' && 'text-yellow-300'
                                    }`}
                            />
                            <p
                                className={`text-white text-sm mt-2 mr-1 hover:text-yellow-200 hover:underline ${selectedItem === 'owner' && 'hover:text-yellow-100'
                                    }`}
                            >
                                Owner List
                            </p>
                        </Link>
                    </div>

                    <div className='mb-8 gap-2'>
                        <Link to='/admin/property' onClick={() => handleItemClick('property')}>
                            <HomeIcon  
                                className={`h-8 w-8 text-white ${selectedItem === 'property' && 'text-yellow-300'
                                    }`}
                            />
                            <p
                                className={`text-white text-sm mt-2 mr-4 hover:text-yellow-100 hover:underline ${selectedItem === 'property' && 'hover:text-yellow-100'
                                    }`}
                            >
                               Property
                            </p>
                        </Link>
                    </div>

                    <div className='mb-8 gap-2'>
                        <Link to='/admin/kyclist' onClick={() => handleItemClick('kycList')}>
                            <ClipboardCheckIcon
                                className={`h-8 w-8 text-white ${selectedItem === 'kycList' && 'text-yellow-300'
                                    }`}
                            />
                            <p
                                className={`text-white text-sm mt-2 mr-4 hover:text-yellow-100 hover:underline ${selectedItem === 'kycList' && 'hover:text-yellow-100'
                                    }`}
                            >
                                KYC List
                            </p>
                        </Link>

                        <Link to='/admin/category' onClick={() => handleItemClick('category')}>
                            <ClipboardCheckIcon
                                className={`h-8 w-8 mt-12 text-white ${selectedItem === 'category' && 'text-yellow-300'
                                    }`}
                            />
                            <p
                                className={`text-white text-sm mt-1 mr-4 hover:text-yellow-100 hover:underline ${selectedItem === 'category' && 'hover:text-yellow-100'
                                    }`}
                            >
                                Category
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
