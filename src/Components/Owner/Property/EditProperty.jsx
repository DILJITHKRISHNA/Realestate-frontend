import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { editProperty } from '../../../Api/OwnerApi';

function EditProperty({ propertyId }) {

    const [open, setOpen] = useState(false);
    const [propertyData, setPropertyData] = useState([])

    const handleOpen = () => setOpen(!open);

    const handleChange = (e) => {
        const { name, value } = e.target;
        SetDetails({
            ...details,
            [name]: value
        });

    }


    useEffect(() => {

        const FetchProperty = async () => {
            try {
                console.log(propertyId, "iddd");
                const result = await editProperty(propertyId)
                console.log(result, "got the dataaaaaa");
                if (result.data.success) {
                    console.log(result.data.property, "propertyy dattat");
                    setPropertyData(result.data.property);
                }
            } catch (error) {
                console.log("Fetch property", error);
            }
        }
        FetchProperty()
    }, [])

    return (
        <>
            <button
                onClick={handleOpen}
                className="ml-96 bg-lime-400 h-8 mt-2 px-6 font-semibold text-white hover:bg-white hover:border-2 hover:border-lime-400 hover:text-lime-400 rounded-md"
            >
                Edit
            </button>
            {open && propertyData.map((data) => (

                <div className="fixed z-10 inset-0 overflow-y-auto">
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
                            className="inline-block align-bottom bg-white rounded-lg 
                            text-left overflow-hidden shadow-xl transform transition-all 
                            sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-headline"
                        >

                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="mt-2 ">
                                    <h1 className="text-2xl font-bold mb-6">Edit Property</h1>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700">Property Name</label>
                                            <input
                                                type="text"
                                                name="title"
                                                onChange={handleChange}
                                                placeholder={data.name}
                                                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700">Property Type</label>
                                            <input
                                                type="text"
                                                name="type"
                                                onChange={handleChange}
                                                placeholder={data.type}
                                                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700">Expected Rent</label>
                                            <input
                                                type="text"
                                                name="rent"
                                                onChange={handleChange}
                                                placeholder={data.Rent}
                                                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700">Property Details</label>
                                            <input
                                                type="text"
                                                onChange={handleChange}
                                                placeholder={data.details}
                                                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700">Built Up Area</label>
                                            <input
                                                type="text"
                                                name="buildUpArea"
                                                onChange={handleChange}
                                                placeholder={data.buildUpArea}
                                                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                                            />
                                        </div>
                                        <div className='flex lg:flex-row xs:flex-wrap w-6 h-auto mb-2 gap-3 items-center'>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700">Bedroom</label>
                                                <input
                                                    type="text"
                                                    name="bedroom"
                                                    onChange={handleChange}
                                                    placeholder={data.bedrooms}
                                                    className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                                                />
                                            </div>

                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700">Bathroom</label>
                                                <input
                                                    type="text"
                                                    name="bathroom"
                                                    onChange={handleChange}
                                                    placeholder={data.bathrooms}
                                                    className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700">State</label>
                                                <input
                                                    type="text"
                                                    name="state"
                                                    onChange={handleChange}
                                                    placeholder={data.state}
                                                    className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700">Balcony</label>
                                                <input
                                                    type="text"
                                                    name="balconies"
                                                    onChange={handleChange}
                                                    placeholder={data.balcony}
                                                    className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                                                />
                                            </div>
                                            <label className='mt-1'>Parking</label>
                                            <input
                                                type="checkbox"
                                                name="parking"
                                                onChange={handleChange}
                                                placeholder={data.parking}
                                                className="mt-2 border rounded-md w-full focus:outline-none focus:border-blue-500 "
                                            />
                                            <label className='mt-1'>Furnished</label>
                                            <input
                                                type="checkbox"
                                                name="furnished"
                                                onChange={handleChange}
                                                placeholder={data.furnished}
                                                className="mt-2 border rounded-md w-full focus:outline-none focus:border-blue-500 "
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700">No. Of Floors</label>
                                            <input
                                                type="text"
                                                name="FloorCount"
                                                onChange={handleChange}
                                                placeholder={data.FloorCount}
                                                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700">Location/street</label>
                                            <input
                                                type="text"
                                                name="location"
                                                onChange={handleChange}
                                                placeholder={data.location}
                                                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700">Country</label>
                                            <input
                                                type="text"
                                                name="country"
                                                onChange={handleChange}
                                                placeholder={data.country}
                                                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                                            />
                                        </div>
                                        <div className="mb-4 flex flex-col">
                                            <label className="block text-sm font-medium text-gray-700">Property Image</label>
                                            <div className='flex flex-row'>
                                                <input
                                                    type="file"
                                                    name="imageUrls"
                                                    onChange={handleChange}
                                                    className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                                                />
                                                <img
                                                    src={data.imageUrls}
                                                    alt="chosen"
                                                    className='h-[50px] w-[50px] rounded-full '
                                                />

                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700">City</label>
                                            <input
                                                type="text"
                                                name="city"
                                                onChange={handleChange}
                                                placeholder={data.city}
                                                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                                            />
                                        </div>

                                        <div className="mt-2 p-4 flex justify-center gap-10">
                                            <div className='flex justify-end gap-10'>
                                                <button
                                                    type='button'
                                                    onClick={handleOpen}
                                                    className="bg-gradient-to-r border-2 border-lime-400 px-4 py-2 rounded-md text-lime-400"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type='submit'
                                                    className="bg-gradient-to-r bg-lime-400 px-4 py-2 rounded-md text-white"
                                                >
                                                    Edit
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default EditProperty
