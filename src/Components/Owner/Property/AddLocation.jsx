import React, { useState } from 'react';
import AdditionalDetails from './AdditionalDetails';

function AddLocation({ SetNext, SetData, data }) {
    console.log(data, 'ppwpwpw');

    const [change, SetChange] = useState(false);
    const [locData, SetLocData] = useState({
        state: "",
        country: "",
        district: "",
        address: "",
        zip_code: "",
        locality: ""
    });

    const handleNext = (e) => {
        e.preventDefault();
        console.log(data,'==============');
        console.log(locData,'===11111111111111111111111===');

        SetData({
            ...data,
            ...locData
        });
        SetChange(true);
    }

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        SetLocData({
            ...locData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
       
        SetData({
            ...data,
            ...locData
        });
        console.log(data, 'dsaaaa');
        SetChange(true);
    }

    console.log(locData, "data from add locationnnnnnnnn");

    return (
        <>
            {!change ? (
                <div className="fixed inset-0 backdrop-blur-sm overflow-y-auto flex items-center justify-center">
                    <div className="relative w-[80%] bg-gray-300 p-8 max-w-4xl max-h-2xl h-[90%] mx-auto rounded-lg shadow-black">
                        <h1 className="text-2xl font-bold mb-6">Add Location</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 gap-4">
                                {/* Example input field with label */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Locality/Street</label>
                                    <input
                                        type="text"
                                        name="locality"
                                        value={locData.locality} 
                                        onChange={handleChange}
                                        placeholder="Enter Property Name"
                                        className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">State</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={locData.state}
                                        onChange={handleChange}
                                        placeholder="Enter Property Name"
                                        className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Country</label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={locData.country}
                                        onChange={handleChange}
                                        placeholder="Enter Property Name"
                                        className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={locData.address}
                                        onChange={handleChange}
                                        placeholder="Enter Property Name"
                                        className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">District</label>
                                    <input
                                        type="text"
                                        name="district"
                                        value={locData.district}
                                        onChange={handleChange}
                                        placeholder="Enter Property Name"
                                        className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Zip Code</label>
                                    <input
                                        type="text"
                                        name="zip_code"
                                        value={locData.zip_code}
                                        onChange={handleChange}
                                        placeholder="Enter Property Name"
                                        className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                                    />
                                </div>

                                <div className="mt-10 flex gap-10 justify-end">
                                    <div className='flex justify-end gap-10'>
                                        <button
                                            onClick={handleNext}
                                            className="bg-gradient-to-r from-red-500 to-pink-500 px-4 py-2 rounded-md text-white"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <AdditionalDetails SetData={SetData} data={data} />
            )}
        </>
    )
}

export default AddLocation;