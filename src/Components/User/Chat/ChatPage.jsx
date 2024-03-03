import React from 'react'
import { FaRegLaughBeam, FaVideo } from 'react-icons/fa'
import { BsSearch } from 'react-icons/bs';


function ChatPage() {
    return (
        <>
            <div className="flex items-center justify-center h-screen">
                <div className="w-[70%] h-[80%] mt-10 flex bg-white p-4 border border-gray-300 ">
                    <div className="w-1/4">
                        <h2 className="text-xl font-semibold mb-4">
                            <img
                                src="https://cdn.dribbble.com/userupload/11053360/file/original-ae5b8c1d60d14e3a395daf910446d977.png?resize=752x"
                                alt=""
                                className="w-12 h-12 rounded-full"
                            />
                        </h2>
                        <div className="text-xl font-semibold mb-4 ">
                            <div className="relative">
                                <input
                                    type="search"
                                    placeholder="Search Here"
                                    className="bg-transparent border border-gray-300 rounded-md w-[90%] p-1 pl-8 text-sm"
                                />
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <BsSearch className="text-gray-400 w-4 h-4" />
                                </div>
                            </div>
                        </div>
                        <ul className="space-y-2">
                            <li className="flex items-center"></li>
                        </ul>
                    </div>

                    <div className="flex-1 flex flex-col">
                        <div className="border border-gray-300 text-black p-4 flex flex-row gap-2">
                            <img
                                src="https://images.hdqwalls.com/wallpapers/spiderman-on-phone-4k-0w.jpg"
                                alt=""
                                className="w-12 h-12 rounded-full"
                            />
                            <div className="flex flex-col">
                                <h1 className="text-xl font-mono">username</h1>
                                <span className="text-gray-400 text-sm">Online</span>
                            </div>
                            <div className="w-full flex justify-end">
                                <FaVideo className="h-8 w-5" />
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 border border-gray-300">
                            <div className="flex flex-col space-y-4">
                                <div className="flex items-start">
                                    <div className="bg-gray-200 p-3 rounded-lg">
                                        <p className="text-sm">Hello, how can I help you?</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className=" border border-gray-200 p-4 flex flex-row gap-2">
                            <FaRegLaughBeam className='h-12 w-6'/>
                            <input
                                type="text"
                                placeholder="Type your message..."
                                className="w-full p-2 border rounded-md"
                            />
                            <button className="border-2 border-lime-400 hover:bg-lime-400 hover:text-white text-lime-400 p-2 rounded-md">
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatPage
