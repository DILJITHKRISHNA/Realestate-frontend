import React, { useEffect, useRef, useState } from 'react';
import { FaCog, FaCommentDots, FaSearch, FaSignOutAlt, FaVideo } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { FetchProfileData, addMessages, getMessages, userChats } from '../../../Api/UserApi';
import { Link, useNavigate } from 'react-router-dom'
import { format } from 'timeago.js'
import InputEmoji from 'react-input-emoji'
import io from 'socket.io-client'
import HeaderNav from '../Header/HeaderNav';
import { toast } from 'react-toastify';


const ChatPage = () => {
  const user = useSelector(state => state.user.userInfo)
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null)
  const [profile, setProfile] = useState([])
  const [messages, setMessages] = useState([])
  const [onlineUsers, setOnlineUsers] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [selectedUser, setSelectedUser] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [lastSentMessage, setLastSentMessage] = useState('');
  const [chats, setChats] = useState(null)
  const [roomUrl, setRoomUrl] = useState(null)
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const socket = useRef()

  useEffect(() => {
    socket.current = io(import.meta.env.BACKEND_URL || 'http://localhost:5000', {
      withCredentials: true,
    })
    socket.current.emit("new-user-add", user.id)
    socket.current.on('get-users', (users) => {
      setOnlineUsers(users);
      console.log(onlineUsers, "online userss");
    })
    socket.current.on("typing", () => setIsTyping(true));
    socket.current.on("stop typing", () => setIsTyping(false));
    socket.current.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });
  }, [user])
  console.log(chats, "heyy");

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
            setUserData(response.data.chat);
            setChats(response.data.Members);
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
          // console.log(response.data.userData, "responsee in get user");
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
    setNewMessage(newMessage);
  }
  const handleSend = async (e) => {
    try {
      const texts = {
        senderId: user.id,
        text: (newMessage && newMessage) || (roomUrl && roomUrl),
        chatId: selectedUser._id
      };

      const data = await addMessages(texts);
      setMessages(data.data);
      setLastSentMessage(newMessage);
      setNewMessage("");
      setRoomUrl('');
    } catch (error) {
      console.log('Error sending message:', error);
    }
  };

  useEffect(() => {
    const receiverId = chats && chats[0]?.members?.find((member) => member !== user.id)
    setSendMessage({ ...messages, receiverId })
  }, [selectedUser, messages]);

  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit('send-message', sendMessage)
    }
  }, [sendMessage])

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!selectedUser) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedUser._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedUser._id);
        setTyping(false);
      }
    }, timerLength);
  };

  useEffect(() => {
    const messageGet = async () => {
      const response = await getMessages(selectedUser._id)
      if (response.data) {
        setMessages(response.data)
      }
    }
    messageGet()

  }, [messages, selectedUser])

  const HandleVideoCall = () => {
    const receiverId = chats && chats[0]?.members?.find((member) => member !== user.id)
    const joinId = `https://varlet-frontend.vercel.app/owner/${receiverId}`;
    setRoomUrl(joinId);
    setTimeout(() => {
      navigate(`/videocall`, { state: { receiverId } });
    }, 500);
  };

  function isURL(text) {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    const videoCallRegex = /^(ftp|http|https):\/\/videocall\.example\.com\/[^ "]+$/;
    return urlRegex.test(text) || videoCallRegex.test(text);
  }

  useEffect(() => {
    if (roomUrl) {
      handleSend();
    }
  }, [roomUrl])

  const isMessageSender = () => {
    return (
      selectedUser._id && user._id === selectedUser._id
    );
  };



  return (
    <>
      <HeaderNav />
      <div className="flex flex-col md:flex-row h-[calc(100vh-64px)] mt-16 bg-white">
        {/* Sidebar with user profile */}
        <div className="md:w-[7%] w-full h-[60px] md:h-full bg-black flex md:flex-col flex-row justify-between items-center md:items-start">
          <img
            src={profile?.imageUrls}
            alt="image2"
            className="rounded-full w-10 h-10 md:w-12 md:h-12 ml-4 md:ml-6 md:mt-4"
          />
          <div className="flex md:flex-col flex-row gap-4 mr-4 md:mr-0 md:mt-auto md:mb-10">
            <Link to='/' >
              <FaSignOutAlt className='text-white w-6 h-6 md:w-8 md:h-8 md:ml-8' />
            </Link>
            <FaCog className='text-white w-6 h-6 md:w-8 md:h-8 md:ml-8' />
          </div>
        </div>

        {/* User Listing Sidebar */}
        <div className="w-full md:w-1/4 h-[300px] md:h-full bg-[#132328] p-4">
          <div className="relative mb-4">
            <input
              className="w-full px-4 py-2 rounded-md bg-transparent border-2 border-white text-white pr-10"
              placeholder="Search Here"
            />
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white" />
          </div>
          <div className="h-[calc(100%-4rem)] overflow-y-auto">
            {userData && userData.length > 0 ? (
              userData.map((data, index) => (
                <ul key={index} className="mt-2">
                  <li
                    onClick={() => setSelectedUser(data)}
                    className={`cursor-pointer flex flex-row gap-2 text-lg items-center text-white font-bold p-2 rounded hover:bg-gray-300 hover:bg-opacity-20 transition-all duration-300 ${selectedUser?._id === data._id ? 'bg-gray-300 bg-opacity-20' : ''}`}
                  >
                    <img src={data?.members[0]?.imageUrls} alt='image1' className='rounded-full w-8 h-8' />
                    <span className="truncate">{data?.members[0]?.username}</span>
                  </li>
                  <hr className="opacity-20" />
                </ul>
              ))
            ) : (
              <div className='text-center mt-10 text-white font-extrabold flex flex-col items-center'>
                <p>No conversations</p>
                <FaCommentDots className='text-white w-10 h-10 mt-4' />
              </div>
            )}
          </div>
        </div>

        {/* Chat Display */}
        <div className="flex-1 h-full flex flex-col bg-[#2c5b63]">
          {selectedUser ? (
            <>
              <div className="flex flex-row justify-between bg-[#132328] p-3">
                <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-4">
                  <div className='flex items-center gap-3'>
                    <img src={selectedUser?.members[0]?.imageUrls} alt='user' className='w-8 h-8 rounded-full' />
                    <span className="truncate">{selectedUser?.members[0]?.username}</span>
                  </div>
                </h1>
                <FaVideo onClick={() => HandleVideoCall()} className="w-6 h-6 text-white cursor-pointer hover:text-gray-300" />
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-6 messages-container">
                {messages && messages.length > 0 ? (
                  messages.map((message, index) => (
                    <div 
                      key={message.id}
                      className={`message max-w-[80%] md:max-w-[60%] lg:max-w-[40%] mb-4 ${
                        message.senderId !== user.id 
                          ? "ml-0" 
                          : "ml-auto"
                      }`}
                    >
                      <div className={`p-3 rounded-lg ${
                        message.senderId !== user.id
                          ? "bg-[#132328] border-2 border-white border-opacity-20"
                          : "bg-[#132328]"
                      }`}>
                        {isURL(message.text) ? (
                          <span className="text-blue-500 underline hover:text-amber-950">
                            Video call sent
                          </span>
                        ) : (
                          <h1 className="text-white text-sm md:text-base font-semibold break-words">{message.text}</h1>
                        )}
                        <span className='block text-white text-xs mt-1 opacity-60'>{format(message.createdAt)}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-white text-center">
                    <p className='font-extrabold mb-4'>No messages yet</p>
                    <FaCommentDots className='w-14 h-14' />
                  </div>
                )}
              </div>

              {istyping && !isMessageSender(user, selectedUser) && (
                <div className="px-4 py-2 bg-[#132328] bg-opacity-50">
                  <p className="text-gray-300 text-sm">Typing...</p>
                </div>
              )}

              <div className="bg-[#132328] p-4 border-t border-gray-700">
                <div className="flex items-center gap-2">
                  <button className='px-3 py-1 text-white font-extrabold bg-[#2c5b63] rounded-md hover:bg-opacity-80'>+</button>
                  <div className='flex-1'>
                    <InputEmoji
                      value={newMessage}
                      onChange={handeleChange}
                      placeholder="Type your message..."
                      theme="dark"
                      borderColor="rgba(255,255,255,0.1)"
                    />
                  </div>
                  <button
                    onClick={handleSend}
                    className="px-4 py-2 bg-[#132328] text-white border-2 border-white rounded-md hover:bg-[#2c5b63] transition-all duration-300"
                  >
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-white">
              <div className="text-center">
                <FaCommentDots className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-xl font-semibold">Select a chat to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatPage