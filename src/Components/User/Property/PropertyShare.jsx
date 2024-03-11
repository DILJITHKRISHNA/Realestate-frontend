import React, { useState } from 'react'
import { ShareProperty } from '../../../Api/UserApi'
import { ToastContainer, toast } from 'react-toastify'

function PropertyShare({ propertyId }) {

    const [open, setOpen] = useState(false)
    const [share, setShare] = useState({
        message: "",
        email: ""
    })

    const handleOpen = () => { setOpen(!open) }

    const handleClick = (e) => {
        const { name, value } = e.target
        setShare({
            ...share,
            [name]: value
        })
    }

    const handleSubmit = async () => {
        try {
            if (!share.email || !share.message) {
                toast.error("Please fill all fields", {
                    style: {
                        marginTop: "4rem"
                    }
                })
            } else {
                const res = await ShareProperty(share, propertyId)
                console.log(res, "Res in share property");
                if (res.data.success) {
                    toast.success("Property Shared to the mentioned email!", {
                        style: {
                            marginTop: '4rem'
                        }
                    })
                }
                setTimeout(() => {
                    setOpen(false)
                }, 2000);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <button
                onClick={handleOpen}
                className="mt-12 font-mono border-2 border-lime-400 text-lime-400 px-4 py-1 hover:text-white hover:bg-lime-400"
            >
                Share
            </button>
            <div
                className={`z-10 fixed inset-0 overflow-y-auto ${open ? "block" : "hidden"}`}
            >

                <div className="flex items-end justify-center min-h-screen mt-10 px-4 pb-20 text-center sm:block sm:p-0">
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
                            Share Property
                        </div>
                        <form onSubmit={handleSubmit}>

                            <div className="overflow-scroll p-4 flex flex-col gap-8">
                                <div className="flex flex-col">
                                    <label>Email</label>
                                    <input
                                        name='email'
                                        type="email"
                                        value={share.email}
                                        onChange={handleClick}
                                        placeholder="Enter Email to share..."
                                        className="mt-1"
                                    />
                                    <div className="border-b-2 border-black w-82 mt-1"></div>
                                </div>

                                <div className="flex flex-col">
                                    <label>Message</label>
                                    <textarea
                                        name='message'
                                        value={share.message}
                                        onChange={handleClick}
                                        placeholder="Message..."
                                        rows="4"
                                        className="mt-1 resize-none"
                                    ></textarea>
                                    <div className="border-b-2 border-black w-82 mt-1"></div>
                                </div>
                            </div>
                        </form>

                        <div className="flex space-x-10 py-2 px-4 bg-gray-100 rounded-b justify-center">
                            <button
                                onClick={handleOpen}
                                className="text-lime-400 border-2 border-lime-400 hover:bg-lime-400 hover:text-white px-4 py-1 rounded-md "
                            >
                                Close
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="hover:text-black hover:border-2 hover:border-black hover:bg-white bg-black text-white px-4 py-1 rounded-md "
                            >
                                Share
                            </button>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    )
}

export default PropertyShare
