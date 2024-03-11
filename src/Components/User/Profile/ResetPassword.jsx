import React, { useState } from 'react'
import { FaLock } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { resetPassword } from '../../../Api/UserApi'
import { ToastContainer, toast } from 'react-toastify'

function ResetPassword() {
    const user = useSelector(state => state.user.userInfo)
    const [open, setOpen] = useState(false)

    const [details, setDetails] = useState({
        oldPassword: "",
        newPassword: ""
    })

    const handleClick = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setDetails(({
            ...details,
            [name]: value
        }));
    };

    const handleOpen = () => setOpen(!open)

    const handleResetPassword = async (e) => {
        e.preventDefault()
        try {
            const res = await resetPassword(user.id, details)
            console.log(res, "res in reset password");
            if (res.data.success) {
                toast.success("Password successfully Updated!", { style: { marginTop: "4rem" } }, { position: 'top-center' })

                setTimeout(() => {
                    setOpen(false)
                }, 2000);
            } else if (details.newPassword.trim() === "" || details.oldPassword.trim() === "") {
                toast.error("Please provide the required fields!", { style: { marginTop: "4rem" } }, { position: 'top-center' })
            } else if (res.data.message == "Incorrect old password.") {
                toast.error("Please enter the valid old password!", { style: { marginTop: "4rem" } }, { position: 'top-center' })
            } else if (details.newPassword === details.oldPassword) {
                toast.error("Please ensure both Passwords are different!", { style: { marginTop: "4rem" } }, { position: 'top-center' })
            } else {
                toast.error("Error while updating the password!", { style: { marginTop: "4rem" } }, { position: 'top-center' });
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <button onClick={handleOpen} className='cursor-pointer font-semibold font-mono flex flex-row gap-2 hover:underline'>
                <FaLock />Reset Password
            </button>
            {open ?

                <div
                    className={`z-10 fixed inset-0 overflow-y-auto ${open ? "block" : "hidden"}`}
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
                            className="inline-block align-bottom bg-white rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-headline"
                        >
                            <form onSubmit={handleResetPassword}>
                                <div className="bg-amber-950 text-white py-2 uppercase font-semibod font-mono px-4 rounded-t">
                                    Reset Password
                                </div>
                                <div className="h-[17rem] overflow-scroll p-4">
                                    <label>Old password</label>
                                    <input
                                        type="password"
                                        name="oldPassword"
                                        className='w-full'
                                        value={details.oldPassword}
                                        onChange={handleClick}
                                    />
                                    <div className='border-b-2 border-black w-82 mt-4 mb-10'></div>
                                    <label>New password</label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        className='w-full'
                                        value={details.newPassword}
                                        onChange={handleClick}
                                    />
                                    <div className='border-b-2 border-black w-82 mt-4'></div>
                                </div>
                                <div className="flex space-x-2 py-2 px-4 bg-gray-100 rounded-b justify-center">
                                    <button
                                        onClick={handleOpen}
                                        className="text-black  border-2 border-black hover:bg-black  hover:text-white px-4 py-1 rounded-md "
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type='submit'
                                        className="hover:text-amber-950 hover:bg-white border-2 hover:border-amber-950 bg-amber-950  text-white px-4 py-1 rounded-md "
                                    >
                                        Reset
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <ToastContainer />
                </div >
                : ""
            }
        </>
    )
}

export default ResetPassword
