import React from 'react'

function OtpPage() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col items-center">
                {/* <img src={otpImage} alt="Otp Image" className="mb-8" /> */}

                <div className="bg-white p-8 rounded shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Enter OTP</h2>
                    {/* Add your OTP input field and other components here */}
                    <input
                        type="text"
                        className="w-full p-2 border border-black rounded mb-4"
                        placeholder="Enter OTP"
                    />
                    <button className="bg-black text-white py-2 px-4 rounded">
                        Verify
                    </button>
                </div>
            </div>
        </div>
    )
}

export default OtpPage
