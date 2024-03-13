// src/App.js
import React, { useEffect, useRef, useState } from 'react';
import { FaCog, FaCommentDots, FaSearch, FaSignOutAlt, FaVideo } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { FetchProfileData, addMessages, getMessages, userChats } from '../../../Api/UserApi';
import { Link } from 'react-router-dom'
import { format } from 'timeago.js'
import InputEmoji from 'react-input-emoji'
import io from 'socket.io-client'


const OwnerChat = () => {
  const user = useSelector(state => state.user.userInfo)
  const [userData, setUserData] = useState(null)
  const [profile, setProfile] = useState([])
  const [messages, setMessages] = useState([])
  const [onlineUsers, setOnlineUsers] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [selectedUser, setSelectedUser] = useState(null);
  const socket = useRef()


  useEffect(() => {
    socket.current = io('http://localhost:5173')
    socket.current.emit("new-user-add", user.id)
    socket.current.on('get-users', (users) => {
      setOnlineUsers(users);
      console.log(onlineUsers, "online userss");
    })
  }, [user])

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await getMessages(selectedUser._id)
      if (response.data) {
        setMessages(response.data)
      }
    }
    if (selectedUser) {
      fetchMessages()
    }
  }, [selectedUser])

  useEffect(() => {
    if (user.id) {
      const getUserData = async () => {
        try {
          const response = await userChats(user.id);
          if (response.data) {
            setUserData(response.data);
          }

        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      getUserData();
    }
  }, []);
  useEffect(() => {
    if (user.id) {
      const getCurrentUser = async () => {
        try {
          const response = await FetchProfileData(user.id);
          console.log(response.data.userData, "responsee in get user");
          if (response.data) {
            setProfile(response.data.userData);
          }

        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      getCurrentUser();
    }
  }, []);

  const handeleChange = (newMessage) => {
    console.log('newMessage:', newMessage);
    setNewMessage(newMessage);
  }
  const handleSend = async (e) => {
    e.preventDefault();
    const texts = {
      senderId: user.id,
      text: newMessage,
      chatId: selectedUser._id
    };

    try {
      const data = await addMessages(texts);
      console.log('Data after sending:', texts);
      setMessages(prevMessages => [...prevMessages, data]);
      setNewMessage("");
    } catch (error) {
      console.log('Error sending message:', error);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row h-screen mt-16 bg-white">
        <div className="md:w-[7%] bg-black flex flex-col justify-between">
          <img
            src={profile?.imageUrls}
            alt="image2"
            className="rounded-full w-12 h-12 ml-6 mt-4"
          />
          <h1>
            <Link to='/' >
              <FaSignOutAlt className='text-white mb-10 ml-8 w-8 h-8' />
            </Link>
            <FaCog className='text-white mb-10 ml-8 w-8 h-8' />
          </h1>
        </div>

        {/* User Listing Sidebar */}
        <div className="w-full md:w-1/4 h-full bg-[#132328] p-4">
          <input
            className="w-full px-2 py-1 rounded-md bg-transparent border-2 border-white"
            placeholder="Search Here"
          />
          {userData && userData.map((data, index) => (
            <ul key={index} className="mt-4" >
              <li
                onClick={() => setSelectedUser(data)}

                className={`cursor-pointer flex flex-row gap-2 text-lg mt-2 items-center text-white font-bold p-2 rounded hover:bg-gray-300 transition-all duration-300`}
              >
                <img src={data?.members[0]?.imageUrls} alt='image1' className='rounded-full w-8 h-8' />
                {data?.members[0]?.username}
              </li>
              <hr />
            </ul>
          ))}
        </div>

        {/* Chat Display */}

        <div className="flex-1">
          <div className="h-full overflow-y-auto flex flex-col justify-between bg-[#2c5b63] rounded shadow p-2">

            <div className="flex flex-row justify-between">
              <h1 className="text-2xl px-2 font-bold mb-4 text-white flex flex-row gap-4 mt-2">
                {selectedUser && (
                  <div className='flex felx-col gap-2'>
                    <img src={selectedUser?.members[0]?.imageUrls} alt='image of user in header' className='w-8 h-8 rounded-full' />
                    <h4 className="flex flex-col">
                      {selectedUser?.members[0]?.username}
                    </h4>
                  </div>
                )}
              </h1>
              {selectedUser ?
                <FaVideo className="mr-5 w-6 h-6 mt-2 text-white" />
                : ""}
            </div>
            {selectedUser ?
              <div className="border-b-2 border-white mb-[80%]"></div>
              : ""}
            {messages && messages.length > 0 ? (
              messages.map((message) => (
                <div className={` ${message.senderId === user.id ? "message own" : "message"} mb-4 p-3 bg-[#132328] w-[20%]  rounded-full`} key={message.id}>
                  <h1 className="text-white px-2 text-md font-semibold">{message.text}</h1>
                  <span className='text-white font-extralight text-sm ml-2'>{format(message.createdAt)}</span>
                </div>
              ))
            ) : (
              <div className="text-white mb-[50%] text-center">
                <p className='font-extrabold'>Select a conversation to start</p>
                <FaCommentDots className='text-white w-14 h-14 ml-[47%] mt-4 text-center' />
              </div>
            )}

            <div className="absolute w-full md:w-2/3 mt-[41%]">
              <div className="flex items-center mt-2">
                <div className='mt-1 px-3 py-1 text-white font-extrabold bg-[#132328] rounded-md'>+</div>
                <InputEmoji
                  type="text"
                  value={newMessage}
                  onChange={handeleChange}
                  placeholder="Type your message..."
                  className="flex-1 border p-2 mr-2 rounded"
                />
                <button
                  onClick={handleSend}
                  className="bg-[#132328] text-white p-2 rounded hover:bg-white hover:border-2 hover:border-amber-900 hover:text-amber-900 transition-all duration-300"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OwnerChat;
