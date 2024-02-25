import React, { useEffect, useState } from 'react'
import { FetchProperty } from '../../../Api/OwnerApi';

function PropertyDetails({ propertyId }) {

    const [open, setOpen] = useState(false)
    const [property, setProperty] = useState()

    const handleOpen = () => setOpen(!open);

    useEffect(() => {
        const fetchPropertyData = async () => {
            try {
                const response = await FetchProperty(propertyId)
                console.log("response in fetch proprertte in booking list", response)
                if (response.data.success) {
                    setProperty(response.data.GetData)
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchPropertyData()
    }, [propertyId])

console.log(typeof property,"777777777");
    return (
        <>
            <button
                onClick={handleOpen}
                className="border-2 border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-white font-bold py-1 px-4 rounded"
            >
                Details
            </button>
            {open &&  (
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
                                <img src={property.imageUrls} 
                                alt="Preview Image" 
                                className="rounded-md" />
                                <div className="p-4 font-semibold font-mono text-black space-y-10">
                                    <h1 className="text-lg">Property Name: <span className="text-lime-400 font-semibold">{property.name}</span></h1>
                                    <h1>Property Details: <span className="text-lime-400 font-semibold">{property.details}</span></h1>
                                    <h1>Rent Amount: <span className="text-lime-400 font-semibold">{property.Rent}</span></h1>
                                    <h1>Property Type: <span className="text-lime-400 font-semibold">{property.type}</span></h1>
                                    <h1>Location: <span className="text-lime-400 font-semibold">{property.location}</span></h1>
                                    <h1>Country: <span className="text-lime-400 font-semibold">{property.country}</span></h1>
                                    <h1>City: <span className="text-lime-400 font-semibold">{property.city}</span></h1>
                                    <h1>State: <span className="text-lime-400 font-semibold">{property.state}</span></h1>
                                </div>
                                <div className="">
                                    <div className='border-b-2 border-black w-82 mt-1'></div>

                                    <div className='flex flex-row gap-14 justify-around'>
                                        <h1 className='text-lime-400'>Bedroom: <span className='font-semibold text-black'> 0{property.bedrooms}</span></h1>
                                        <h1 className='text-lime-400'>Bathroom: <span className='font-semibold text-black '> 0{property.bathrooms}</span></h1>
                                        <h1 className='text-lime-400'>Total Floor: <span className='font-semibold text-black'> 0{property.FloorCount}</span></h1>
                                    </div>
                                    <div className='border-b-2 border-black w-82 mt-4'></div>
                                    <div className='flex flex-row gap-5 mt-2 justify-around'>
                                        <h1 className='text-lime-400'>Balconies: <span className='font-semibold text-black'> 0{property.balcony}</span></h1>
                                        <h1 className='text-lime-400'>Parking: <span className='font-semibold text-black'> {property.parking ? "Yes" : "No"}</span></h1>
                                        <h1 className='text-lime-400 '>Furnished: <span className='font-semibold text-black'> {property.furnished ? "Furnished" : "No"}</span></h1>
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
            )}
        </>
    )
}

export default PropertyDetails
