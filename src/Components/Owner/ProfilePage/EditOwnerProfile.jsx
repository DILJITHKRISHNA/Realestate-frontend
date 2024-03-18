import React, { useEffect, useState } from 'react'
import { FetchProperty, NewOwnerProfileData } from '../../../Api/OwnerApi';

function EditOwnerProfile({ Data }) {

    const [open, setOpen] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
    });

    const handleOpen = () => setOpen(!open);

    useEffect(() => {
        if (Data) {
            setFormData({
                name: Data.username || "",
                email: Data.email || "",
                mobile: Data.mobile || "",
            });
        }
    }, [Data]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSave = async () => {
        try {
            setOpen(!open)
            const response = await NewOwnerProfileData(formData, Data._id);
            console.log(response, "ownerr  responseeeee99");
            if (response.data.success) {
                toast.success("Profile Updated Successfully!")
            } else {
                toast.error("Error while updating profile!")
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <button
                onClick={handleOpen}
                className="border-2 border-black text-black hover:bg-black hover:text-white font-bold py-1 px-4 rounded"
            >
                Edit Profile
            </button>
            {open && (
                <div
                    className={`z-20 fixed inset-0 overflow-y-auto ${open ? "block" : "hidden"}`}
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
                            className="inline-block align-bottom bg-white rounded-lg text-left  shadow-xl h-[26rem] transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-headline"
                        >
                            <div className="bg-black text-white py-2 uppercase font-semibod font-mono px-4 rounded-t">
                                Edit Profile
                            </div>
                            <div className="mb-4 p-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="border rounded-md px-4 py-2 w-full"
                                />
                            </div>

                            <div className="mb-4 p-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="border rounded-md px-4 py-2 w-full"
                                />
                            </div>

                            <div className="mb-6 p-2 ">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Mobile
                                </label>
                                <input
                                    type="text"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    className="border rounded-md px-4 py-2 w-full"
                                />
                            </div>

                            <div className="flex justify-end gap-2 p-2">
                                <button
                                    onClick={handleOpen}
                                    className="border-2 border-black hover:text-white hover:bg-black hover:border-2 hover:border-black font-bold text-black px-2 rounded"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="bg-black hover:text-black hover:bg-white hover:border-2 hover:border-black font-bold text-white px-3 rounded"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default EditOwnerProfile
