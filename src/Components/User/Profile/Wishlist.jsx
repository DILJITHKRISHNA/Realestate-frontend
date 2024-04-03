import React, { useEffect, useState } from 'react';
import { FaRegTimesCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { WishlistData } from '../../../Api/UserApi';
import { toast } from 'react-toastify';

function Wishlist() {
    const selector = useSelector(state => state.user.userInfo)
    console.log(selector,"88888888888");
    const [openRight, setOpenRight] = useState(false);
    const [wishlist, setwishlist] = useState([]);
 

    const handleDrawer = () => setOpenRight(!openRight);

    useEffect(() => {
        const fetchWishlistData = async () => {
            try {
                const fetchData = await WishlistData()
                console.log(fetchData,"data in wishlist");
                const details = fetchData.data.getData
                console.log(details,"detaiillsss");
                const data = details.find((item)=>item.userRef === selector.id)
                if (data) {
                    setwishlist(details)
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchWishlistData()
    }, [])

    const handleRemove = async (indexToRemove) => {
        const updatedWishlist = [...wishlist]
        updatedWishlist.splice(indexToRemove, 1);
        setwishlist(updatedWishlist);
        toast.success("Property Removed from the wishlist!")
    }

    return (
        <>
            <button className="sm:h-10 sm:w-44 mr-[14rem] lg:pr-4 text-black rounded-md font-mono hover:underline" onClick={handleDrawer}>
                Saved
            </button>
            {openRight && (
                <div className="fixed mt-16 right-0 top-0 overflow-y-auto h-full w-96 bg-white p-4 shadow-black shadow-md">
                    <div className="mb-6 flex items-center justify-between">
                        <h5 className="text-blue-gray text-lg font-bold">
                            <span className='text-lime-400 font-bold'>Your</span> Wishlist
                        </h5>
                        <button className="text-blue-gray" onClick={handleDrawer}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="h-5 w-5"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className='border-b-2 border-black mb-4'></div>

                    {wishlist && wishlist.length > 0 ? (
                        wishlist.map((data, index) => (
                            <div className="flex flex-col" key={index}>
                                <FaRegTimesCircle onClick={() => handleRemove(index)} className='absolute h-6 w-8 ml-[78%] mt-2 text-red-800 cursor-pointer' />
                                <img
                                    src={data.imageUrls[0]}
                                    alt=''
                                    className="text-gray-500 mb-8 pr-4 font-normal"
                                />
                                <div className="flex flex-row justify-between">
                                    <h1 className="text-sm py-1 px-2 font-bold flex flex-row">Name: <span className='text-lime-400'>{data.name}</span></h1>
                                    <h1 className="text-sm py-1 px-2 font-bold">Type: <span className='text-lime-400'>{data.type}</span> </h1>
                                    <h1 className="text-sm py-1 px-2 font-bold">Rent: <span className='text-lime-400'>{data.Rent}</span> </h1>
                                </div>
                                <div className='flex flex-row justify-center mt-4 gap-2'>
                                    <button className="px-2 mb-2 font-bold border-2 border-lime-400 text-lime-400 rounded-md hover:bg-lime-400 hover:text-white ">Details</button>
                                </div>
                                <div className='border-b-2 border-black mb-20'></div>
                            </div>
                        ))
                    ) : (
                        <div className="fixed mt-20 right-0 top-0 overflow-y-auto h-full w-96 bg-white p-4 shadow-black shadow-md">
                            <p className="text-center text-gray-500">Wishlist is empty</p>
                            <button className="text-blue-gray" onClick={handleDrawer}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="h-5 w-5 mx-auto mt-4"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
            )}
        </>



    );
}

export default Wishlist;
