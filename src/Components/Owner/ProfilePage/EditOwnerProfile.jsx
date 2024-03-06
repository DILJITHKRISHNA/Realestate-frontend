import React, { useState } from 'react'

function EditOwnerProfile() {

    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(!open)
    }
    return (

        <div>
            <button
                onClick={handleOpen}
                className="select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md hover:from-gray-800 hover:to-gray-700 focus:outline-none focus:ring focus:border-gray-700 transition-all hover:shadow-lg hover:ring-gray-700 hover:border-gray-700 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
                Edit Profile
            </button>
            {open && (
                <div className="pointer-events-none fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 opacity-0 backdrop-blur-sm transition-opacity duration-300">
                    <div className="relative m-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased shadow-2xl">
                        <div className="flex items-center p-4 font-sans text-2xl antialiased font-semibold leading-snug text-blue-gray-900">
                            It's a simple dialog.
                        </div>
                        <div className="relative p-4 font-sans text-base antialiased font-light leading-relaxed border-t border-b border-t-blue-gray-100 border-b-blue-gray-100 text-blue-gray-500">
                            The key to more success is to have a lot of pillows. Put it this way, it took me
                            twenty-five years to get these plants, twenty-five years of blood, sweat, and tears, and
                            I'm never giving up, I'm just getting started. I'm up to something. Fan luv.
                        </div>
                        <div className="flex flex-wrap items-center justify-end p-4 text-blue-gray-500">
                            <button
                                className="px-6 py-3 mr-1 font-sans text-xs font-bold text-red-500 uppercase transition-all rounded-lg middle none center hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            >
                                Cancel
                            </button>
                            <button
                                className="middle none center rounded-lg bg-gradient-to-tr from-green-600 to-green-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md hover:from-green-700 hover:to-green-500 transition-all hover:shadow-lg hover:text-white active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default EditOwnerProfile
