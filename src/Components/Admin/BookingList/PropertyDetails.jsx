import React, { useEffect, useState } from "react";
import { PropertGet } from "../../../Api/AdminApi";

export function PropertyDetails({ propertyId }) {
    const [open, setOpen] = useState(false);
    const [Details, setDetails] = useState([]);

    const handleOpen = () => setOpen(!open);

    useEffect(() => {
        const FetchProperty = async () => {
            try {
                console.log(propertyId,"------------");
                const res = await PropertGet(propertyId)
                if (res.data.success) {
                    setDetails(res.data.data)
                }
            } catch (error) {
                console.log(error);
            }
        }
        FetchProperty()
    }, [])

    return (
        <>
            <button
                onClick={handleOpen}
                className="border-2 border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-white font-bold py-1 px-4 rounded"
            >
                Details
            </button>
            {Details.map((data) => (
                <div
                    className={`fixed inset-0 overflow-y-auto ${open ? "block" : "hidden"}`}
                >

                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div
                            className="fixed inset-0 transition-opacity"
                            aria-hidden="true"
                        >
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span
                            className="hidden sm:inline-block sm:align-middle sm:h-screen"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <div
                            className="inline-block align-bottom bg-white rounded-lg text-left  shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-headline"
                        >
                            <div className="bg-lime-400 text-white py-2 uppercase font-semibod font-mono px-4 rounded-t">
                                Property Details
                            </div>
                            <div className="h-[42rem] overflow-scroll p-4">
                                <img src={data.imageUrls?.[0]} alt="" className="rounded-md" />
                                <div className="p-4 font-semibold font-mono text-black space-y-10">
                                    <h1 className="text-lg">Property Name: <span className="text-lime-400 font-semibold">{data.name}</span></h1>
                                    <h1>Property Details: <span className="text-lime-400 font-semibold">{data.details}</span></h1>
                                    <h1>Rent Amount: <span className="text-lime-400 font-semibold">{data.Rent}</span></h1>
                                    <h1>Property Type: <span className="text-lime-400 font-semibold">{data.type}</span></h1>
                                    <h1>Location: <span className="text-lime-400 font-semibold">{data.location}</span></h1>
                                    <h1>Country: <span className="text-lime-400 font-semibold">{data.country}</span></h1>
                                    <h1>City: <span className="text-lime-400 font-semibold">{data.city}</span></h1>
                                    <h1>State: <span className="text-lime-400 font-semibold">{data.state}</span></h1>
                                </div>
                                <div className="">
                                    <div className='border-b-2 border-black w-82 mt-1'></div>

                                    <div className='flex flex-row gap-14 justify-around'>
                                        <h1 className='text-lime-400'>Bedroom: <span className='font-semibold text-black'> 0{data.bedrooms}</span></h1>
                                        <h1 className='text-lime-400'>Bathroom: <span className='font-semibold text-black '> 0{data.bathrooms}</span></h1>
                                        <h1 className='text-lime-400'>Total Floor: <span className='font-semibold text-black'> 0{data.FloorCount}</span></h1>
                                    </div>
                                    <div className='border-b-2 border-black w-82 mt-4'></div>
                                    <div className='flex flex-row gap-5 mt-2 justify-around'>
                                        <h1 className='text-lime-400'>Balconies: <span className='font-semibold text-black'> 0{data.balcony}</span></h1>
                                        <h1 className='text-lime-400'>Parking: <span className='font-semibold text-black'> {data.parking ? "Yes" : "No"}</span></h1>
                                        <h1 className='text-lime-400 '>Furnished: <span className='font-semibold text-black'> {data.furnished ? "Furnished" : "No"}</span></h1>
                                    </div>
                                </div>
                            </div>
                            <div className="flex space-x-2 py-2 px-4 bg-gray-100 rounded-b justify-center">
                                <button
                                    onClick={handleOpen}
                                    className="text-lime-400 border-2 border-lime-400 hover:bg-lime-400 hover:text-white px-4 py-1 rounded-md "
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
