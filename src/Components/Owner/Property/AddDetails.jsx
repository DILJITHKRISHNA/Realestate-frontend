import React, { useState } from 'react';
import { AddProperty } from '../../../Api/OwnerApi';
import AddLocation from './AddLocation';

function AddDetails({ SetOpen }) {
    const [next, SetNext] = useState(false);
    const [data, SetData] = useState([]);
    const [details, SetDetails] = useState({
        title: "",
        type: "",
        rent: "",
       additionalDetails: "",
    });

    const handleChange = (e) => {
        e.preventDefault();
        console.log(details,'0000');
        SetData(details);

        SetNext(true);
        
    }

    const handleClose = () => {
        SetNext(false);
    }

    const handleClick = (e) => {
        const { name, value } = e.target;
        SetDetails({
            ...details,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(details, 'detailsdetailsdetails');
            SetData(details);
            console.log(data, "data from add detailsssssss");
            SetNext(false);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {!next ? (
                <form onSubmit={handleSubmit}>
                    <div className="fixed inset-0 backdrop-blur-sm overflow-y-auto flex items-center justify-center">
                        <div className="relative w-[80%] bg-gray-300 p-8 max-w-4xl max-h-2xl h-[90%] mx-auto rounded-lg shadow-black">
                            <h1 className="text-2xl font-bold mb-6">Add Property</h1>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Property Name</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={details.title}
                                        onChange={handleClick}
                                        placeholder="Enter Property Name"
                                        className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Property Type</label>
                                <input
                                    type="text"
                                    name="type"
                                    value={details.type}
                                    onChange={handleClick}
                                    placeholder="Enter Property Type"
                                    className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Expected Rent</label>
                                <input
                                    type="text"
                                    name="rent"
                                    value={details.rent}
                                    onChange={handleClick}
                                    placeholder="Enter Property Name"
                                    className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            {/* <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Property Image</label>
                                <input
                                    type="file"
                                    name="expected_rent"
                                    // value={details.image}
                                    onChange={handleClick}
                                    placeholder="Enter Property Name"
                                    className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                                />
                            </div> */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Property Details</label>
                                <input
                                    type="text"
                                    name="additionalDetails"
                                    value={details.additionalDetails}
                                    onChange={handleClick}
                                    placeholder="Enter Property Name"
                                    className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                                />
                            </div>

                            {/* <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Doc</label>
                                <input
                                    type="file"
                                    name="PropertyImage"
                                    // value={details.property_title}
                                    // onChange={handleClick}
                                    placeholder="Enter Property Name"
                                    className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                                />
                            </div> */}
                            {/* <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Cover Image</label>
                                <input
                                    type="file"
                                    name="CoverImage"
                                    // onChange={handleClick}
                                    placeholder="Enter Property Name"
                                    className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500 "
                                />
                            </div> */}

                            <div className="mt-4 p-4 flex justify-center gap-10">
                                    <div className='flex justify-end gap-10'>
                                        <button
                                            type='button'
                                            onClick={handleClose}
                                            className="bg-gradient-to-r from-red-500 to-pink-500 px-4 py-2 rounded-md text-white"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type='button'
                                            onClick={handleChange}
                                            className="bg-gradient-to-r from-red-500 to-pink-500 px-4 py-2 rounded-md text-white"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            ) : (
                <AddLocation SetNext={SetNext} SetData={SetData} data={data} />
            )}
        </>
    )
}

export default AddDetails;