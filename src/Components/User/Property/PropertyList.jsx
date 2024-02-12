import React, { useEffect, useState } from 'react'
import { FetchData } from '../../../Api/UserApi'
import { Link, useNavigate } from 'react-router-dom'

function PropertyList() {
    const navigate = useNavigate()
    const [loadData, SetLoadData] = useState([])

    useEffect(() => {
        const FetchProperty = async () => {
            console.log("--------========---------");
            try {
                const res = await FetchData()
                console.log(res.data.data, "responseee to fetch properttyy");
                const property = res.data.data
                SetLoadData(property || []);
            } catch (error) {
                console.log(error);
            }
        }
        FetchProperty()
    }, [])

    const handleClick = (id) => {
        navigate(`/property/${id}`)
    }

    return (
        <>
            <div className='flex flex-wrap gap-16'>
                {loadData.map((data) => (
                    <div key={data._id} className="w-full max-w-[26rem] shadow-lg cursor-pointer" onClick={() => handleClick(data._id)}  >
                        <div  >
                            <div className="relative " >
                                <img
                                    className="w-full h-full p-4 object-cover rounded-3xl"
                                    src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                                    alt="ui/ux review check"
                                />
                                <div className="absolute inset-0 h-full w-full" />
                                <button onClick={() => handleClick()} className="absolute top-4 right-24 mt-2 mr-2 rounded-full bg-black border-2 shadow-md shadow-black text-white p-2">
                                    For Rent
                                </button>
                                <button className="absolute top-4 right-4 rounded-full border-2 shadow-md mt-2 mr-2 bg-green-700  shadow-green-700 text-white p-2">
                                    verified
                                </button>
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
                                    <button className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="h-5 w-5"
                                        >
                                            {/* SVG Path for the first tooltip */}
                                        </svg>
                                    </button>
                                    {/* Add similar buttons for other tooltips */}
                                </div>
                            </div>
                        </div>
                        <div className="pt-3">
                            <button className="bg-black text-white px-4 py-2 w-full">
                                Reserve
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>

    )
}

export default PropertyList
