import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import { NewProfileData } from "../../../Api/UserApi";
import { ToastContainer, toast } from "react-toastify";

export function EditProfile({ Data }) {
    const [open, setOpen] = useState(false);

    const [formData, setFormData] = useState({
        name: Data ? Data.username : "",
        email: Data ? Data.email : "",
        mobile: Data ? Data.mobile : "",
    });
    console.log(formData.name)
    const handleOpen = () => setOpen(!open);

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
            const response = await NewProfileData(formData, Data._id);
            console.log(response, "responseeeee99");
            if (response.data.success) {
                toast("Profile Updated Successfully!")
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
                className="rounded-full border-2 border-black p-2 font-bold hover:bg-black hover:text-white"
            >
                Edit Profile
            </button>
            {open && (
                <div className="z-10 fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-sm">
                    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
                        <h2 className=" text-2xl font-bold mb-6">Edit Profile</h2>

                        <div className="mb-4">
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

                        <div className="mb-4">
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

                        <div className="mb-6">
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

                        <div className="flex justify-end gap-2">
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
            )}
            <ToastContainer />
        </>
    );
}
