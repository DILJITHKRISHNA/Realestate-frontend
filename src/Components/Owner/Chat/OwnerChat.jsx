import React, { useEffect, useState } from 'react'
import { FaRegComments, FaRegLaughBeam, FaVideo } from 'react-icons/fa'
import { BsSearch, BsSend } from 'react-icons/bs';
import { fetchAllUser, fetchAllowner } from '../../../Api/UserApi';
import { useSelector } from 'react-redux';
import useGetConversations from '../../../CustomHookes/useGetConversations';
import useGetUserConversations from '../../../CustomHookes/useGetUserConversations';
import useConversations from '../../../zustand/useConversation';
import useGetMessages from '../../../CustomHookes/useGetMessages';
import useSendMessage from '../../../CustomHookes/useSendMessage';
import { getOwner } from '../../../Api/OwnerApi';
import MessageSkeleton from '../../User/Chat/MessageSkeleton';


function OwnerChat() {

    const selector = useSelector(state => state.owner.OwnerInfo);
    const [profileData, setProfileData] = useState([])
    const { loading, userConversations } = useGetUserConversations()
    const { selectedConversations, setSelectedConversations } = useConversations()
    const { messages, Loading } = useGetMessages()
    const [message, setMessage] = useState("")
    const { sendMessage } = useSendMessage()
    const fromMe = messages === selector.id;
    const chatClassName = fromMe ? 'text-end' : 'text-start'
    const profilepic = fromMe ? selector?.imageUrls : profileData?.imageUrls
    const bubbleBgColor = fromMe ? "bg-black" : "border-2 border-black text-black";
    useEffect(() => {
        const ProfileData = async () => {
            try {
                const res = await getOwner(selector.id)
                if (res.data.success) {
                    setProfileData(res.data.OwnerData)
                }
            } catch (error) {
                console.log(error);
            }
        }
        ProfileData()
    }, [selector.id])

    useEffect(() => {
        //cleanup function (unmount)
        return () => setSelectedConversations(null)
    }, [setSelectedConversations])

    console.log(profileData, ";;;;");
    const handelSubmit = async (e) => {
        e.preventDefault()
        if (!message) { return }
        await sendMessage(message)
        setMessage("")
    }

    return (
        <>
            <div className="flex items-center justify-center h-screen">
                <div className="w-full h-screen mt-10 flex bg-white p-4 border border-gray-300 ">
                    <div className="w-1/4">
                        <h2 className="text-xl font-semibold mb-4">
                            <img
                                src={profileData.imageUrls}
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
                            {userConversations.map((text) => (
                                <div key={text._id} className={`cursor-pointer mt-5 hover:bg-gray-200 bg-transparent border border-gray-500 rounded-md w-[90%] p-1 pl-2 gap-2 text-sm flex flex-row
                                ${selectedConversations?._id === text._id ? "bg-zinc-300" : ""}
                            `} onClick={() => setSelectedConversations(text)}>
                                    <img src={text.imageUrls} alt="" className='rounded-full w-8 h-8' />
                                    <h1 className='mt-1'>{text.username}</h1>
                                </div>
                            ))}
                        </div>
                        <ul className="space-y-2">
                            <li className="flex items-center"></li>
                        </ul>
                    </div>

                    <div className="flex-1 flex flex-col">
                        {selectedConversations ? (

                            <div className="border border-gray-500 text-black p-4 flex flex-row gap-2">
                                <img
                                    src={selectedConversations.imageUrls}
                                    alt=""
                                    className="w-12 h-12 rounded-full"
                                />
                                <div className="flex flex-col">
                                    <h1 className="text-xl font-mono">{selectedConversations.username}</h1>
                                    <span className="text-gray-400 text-sm">Online</span>
                                </div>
                                <div className="w-full flex justify-end">
                                    <FaVideo className="h-8 w-5" />
                                </div>
                            </div>
                        ) : (
                            ""
                        )}

                        <div className="flex-1 overflow-y-auto p-4 border border-gray-300">
                            {selectedConversations ? (

                                <div className='px-4 flex-1 overflow-auto'>
                                    {!Loading && messages && messages.length > 0 && messages
                                        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
                                        .map((chats, index, array) => (
                                            <div key={chats._id}  className={`flex  flex-col space-y-4`}>
                                                <div className={`flex items-start gap-2 flex-row ${chats.senderId === selector.id ? 'justify-end' : 'justify-start'}`}>
                                                    {chats.senderId !== selector.id && <img src={fromMe ? selector?.imageUrls : selectedConversations?.imageUrls} alt="" className='w-8 h-8 rounded-full' />}
                                                    <div className={`px-4 rounded-lg ${bubbleBgColor}`}>
                                                        <p className={`text-sm ${chatClassName}`}>
                                                            {chats.message}
                                                        </p>
                                                        <span className='text-sm font-extralight'>{index === array.length - 1 ? 'Just now' : "12:42"}</span>
                                                    </div>
                                                    {chats.senderId === selector.id && <img src={profilepic} alt="" className='w-8 h-8 rounded-full' />}
                                                </div>
                                            </div>
                                        ))}


                                    {Loading && [...Array(3)].map((index) => <MessageSkeleton key={index} />)}
                                    {!Loading && messages && messages.length === 0 && (
                                        <p className='text-center font-bold '>Send a message to start the conversation</p>
                                    )}
                                </div>
                            ) : (
                                <div className=' px-4 py-2 mb-2 flex items-center mt-[20%] flex-col gap-4'>
                                    <span className='text-gray-900 font-bold'>Welcome 👋<span className='text-amber-900'>{selector.username}</span></span>
                                    <span className='text-gray-900 font-bold'>Select a Chat to start messaging</span>
                                    <FaRegComments className='w-12 h-12 text-gray-800' />
                                </div>
                            )}
                        </div>

                        <form onSubmit={handelSubmit}>
                            <div className=" border border-gray-400 p-4 flex flex-row gap-2">
                                <FaRegLaughBeam className='h-12 w-6' />
                                <input
                                    type="text"
                                    placeholder="Type your message..."
                                    className="w-full p-2 border rounded-md"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                                <button type='submit' className="border-2 border-black hover:bg-black hover:text-white flex text-center text-black px-4 h-12 rounded-md">
                                    {loading ? <span className='loading loading-spinner mx-auto'></span> : <BsSend className='text-xl mt-3' />}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OwnerChat
