import React, { useEffect, useState } from 'react'
import { FetchCategory, FetchData, PaginateProperty, SaveProperty } from '../../../Api/UserApi'
import { Link, useNavigate } from 'react-router-dom'
import { Image } from 'cloudinary-react';
import { FaRegHeart } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';

function PropertyList({ filtered }) {
    const navigate = useNavigate()
    const selector = useSelector(state => state.user.userInfo.id)
    const [propertiesToDisplay, setPropertiesToDisplay] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [category, setCategory] = useState([])
    const [isWishlisted, setWishlisted] = useState(false);



    const fetchProperties = async () => {
        try {
            const response = await PaginateProperty(currentPage);
            setPropertiesToDisplay(response.data.PropertyData);
            console.log(response.data, "dtttt ");
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching properties:', error);
        }
    }

    const handleSaved = async (name, type, rent, ownerId, imageUrls) => {
        try {
            setWishlisted((prev) => !prev);
            const result = await SaveProperty(name, type, rent, ownerId, imageUrls, selector)
            console.log(result, "result while wishlisting property");
            if (result.data.success) {
                toast("Property Saved to Wishlist!", {
                    style: {
                        marginTop: "4rem"
                    }
                });
            } else {
                toast.error("Error while saving property!", {
                    style: {
                        marginTop: "3rem"
                    }
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchProperties()
    }, [currentPage])

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleClick = async (id) => {
        navigate(`/propertyeach`, { state: { id } })
    }

    const FilteredProperties = filtered && filtered.length > 0 ? filtered : propertiesToDisplay;

    useEffect(() => {
        const getCat = async () => {
            try {
                const res = await FetchCategory()
                console.log(res, "reddddddddddddddd");
                if (res.data.success) {
                    setCategory(res.data.categoryList);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getCat()
    }, [])

    return (
        <>
            <div className='flex flex-wrap gap-16'>
                {FilteredProperties && FilteredProperties.map((data, index) => (
                    <div key={index} id={data.id} className="w-full h-auto max-w-[26rem] shadow-lg ">
                        <div>
                            <div className='relative'>
                                <img
                                    src={data.imageUrls[0]}
                                    className="w-full h-72 object-cover rounded-3xl"
                                    alt="Property"
                                    // onClick={handleClick}
                                />
                                <div className="absolute inset-0 flex items-center justify-between">
                                    <div className="absolute top-4 right-24">
                                        <button className="bg-black border-2 shadow-md shadow-black text-white px-1">
                                            For Rent
                                        </button>
                                    </div>
                                    <div className="absolute top-4 right-4">
                                        <button className="border-2 shadow-md bg-green-700 shadow-green-700 text-white px-1">
                                            Verified
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <input type="radio" className="ml-5 appearance-none bg-green-700 border-2 border-white w-4 h-4 rounded-full checked:bg-green-500 checked:border-green-500" />
                            <span className='ml-2 font-bold p-1'>{data.type}</span>
                            <div className="p-6">
                                <div className="mb-3 flex items-center justify-between">
                                    <h5 className="text-blue-gray font-medium">
                                        {data.name}
                                    </h5>
                                    <div className="flex items-center gap-1.5 font-normal text-blue-gray">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="-mt-0.5 h-5 w-5 text-yellow-700"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-gray">
                                    {data.details}
                                </p>
                                <div className="group mt-8 inline-flex flex-wrap items-center gap-3">
                                    <button onClick={() => handleSaved(data.name, data.type, data.Rent, data.ownerRef, data.imageUrls)} className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                                        <FaRegHeart />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="pt-3">
                            <button onClick={() => handleClick(data._id)} className="bg-black text-white px-4 py-2 w-full font-bold  transition-transform transform hover:scale-105">
                                View
                            </button>
                        </div>
                    </div>
                ))}
                <ToastContainer />
            </div>
            <div className="pagination flex justify-center mt-12 gap-4 mr-20">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`
                bg-white text-gray-800 font-semibold py-2 px-4 border border-lime-300 rounded-full 
                transition-all duration-300 hover:bg-gray-200 focus:outline-none  focus:border-lime-400
                ${currentPage === index + 1 ? 'bg-lime-100 text-black hover:bg-lime-400' : ''}
                `}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </>

    )
}

export default PropertyList
