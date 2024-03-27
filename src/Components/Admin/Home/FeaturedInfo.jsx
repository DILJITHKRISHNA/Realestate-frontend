import React, { useEffect, useState } from 'react';
import { GetCount } from '../../../Api/AdminApi';

function FeaturedInfo() {

    const [userCount, setUserCount] = useState(0)
    const [ownerCount, setOwnerCount] = useState(0)
    const [totalRent, setTotalRent] = useState(0)
    const [bookings, setBookings] = useState(0)
    const [reserve, setReserve] = useState(0)

    useEffect(() => {
        const getAllData = async () => {
            const res = await GetCount()
            console.log(res, "ressssss");
            if (res.data.success) {
                setUserCount(res.data.userCount)
                setOwnerCount(res.data.ownerCount)
                setTotalRent(res.data.TotalRent)
                setBookings(res.data.TotalBookings)
                setReserve(res.data.TotalReserve)
            }
        }
        getAllData()
    }, [])

    return (
        <div className="featured grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="featuredItem bg-white p-4 rounded-lg shadow-md">
                <span className="featuredTitle block text-gray-800">Bookings</span>
                <div className="featuredMoneyContainer flex items-center mt-2">
                    <span className="featuredMoney text-2xl">₹ {totalRent}</span>
                </div>
                <span className="featuredMoney text-lg">Total: {bookings}</span>
                <span className="featuredSub block mt-2 text-gray-600">Compared to last month</span>
            </div>
            <div className="featuredItem bg-white p-4 rounded-lg shadow-md">
                <span className="featuredTitle block text-gray-800">Enquiries</span>
                <div className="featuredMoneyContainer flex items-center mt-2">
                    <span className="featuredMoney text-lg">Total: {reserve}</span>
                </div>
                <span className="featuredSub block mt-2 text-gray-600">Compared to last month</span>
            </div>
            <div className="featuredItem bg-white p-4 rounded-lg shadow-md">
                <div className='flex flex-row justify-between'>
                    <span className="featuredTitle block text-gray-800">Users</span>
                    <span className="featuredTitle block text-gray-800 mr-20">Owners</span>
                </div>
                <div className="featuredMoneyContainer flex items-center mt-2 flex-row justify-between">
                    <span className="featuredMoney text-2xl">Total: {userCount}</span>
                    <span className="featuredMoney text-2xl mr-14">Total: {ownerCount}</span>
                </div>
                <span className="featuredSub block mt-2 text-gray-600">Compared to last month</span>
            </div>

        </div>
    );
}

export default FeaturedInfo;
