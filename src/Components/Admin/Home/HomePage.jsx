import React from 'react'
import { ToastContainer } from 'react-toastify'
import Sidebar from '../AdminSidebar/Sidebar'
import Header from '../AdminHeader/Header'
import Dashboard from './Dashboard'
import FeaturedInfo from './FeaturedInfo'


function HomePage() {
    return (
        <div>
            <div className="flex flex-col w-full">
                <Header />
                <div className="flex">
                    <Sidebar />
                    <div className="overflow-y-hidden rounded-lg pt-10 ml-1 bg-offgreen mx-auto h-auto w-screen sm:px-8 bg-gray-100">
                        <FeaturedInfo />
                        <div className='mt-4'>
                            <Dashboard />
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>
    )
}

export default HomePage
