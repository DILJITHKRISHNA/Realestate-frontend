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

  // const [refresh, setRefresh] = useState(false)
  const scroll = useRef();

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
    // e.preventDefault();

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
      setRoomUrl('')
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
    // socket.current.on("receive-message", (data) => {
    //   console.log(data, '================1111111111111111111');
    //   setMessages(data.messages);
    // })
    const messageGet = async () => {
      const response = await getMessages(selectedUser._id)
      if (response.data) {
        setMessages(response.data)
      }
    }
    messageGet()

  }, [messages, selectedUser])

  // useEffect(() => {
  //   if (receiveMessage !== null && receiveMessage?.chatId === selectedUser?._id) {
  //     setMessages([...messages, receiveMessage]);
  //   }
  // }, [receiveMessage])

  // const HandleVideoCall = () => {
  //   try {
  //     if (selectedUser._id && user.id) {
  //       const VideoData = [selectedUser._id, user.id]
  //       if (VideoData.length >= 1) {
  //         setTimeout(() => {
  //           window.open(`/videocall/${user.id}`, { state: { data: VideoData } });

  //         }, 1000);
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const HandleVideoCall = () => {
    const receiverId = chats && chats[0]?.members?.find((member) => member !== user.id)
    const joinId = `http://localhost:5173/owner/${receiverId}`;
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
      <div className="flex flex-col md:flex-row h-screen mt-16 bg-white">
        <div className="md:w-[7%] h-[856px] bg-black flex flex-col justify-between">
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
        <div className="w-full h-[856px] md:w-1/4 bg-[#132328] p-4">
          <input
            className="w-full px-2 py-1 rounded-md bg-transparent border-2 border-white"
            placeholder="Search Here"
          />
          {userData && userData.length > 0 ? (
            userData.map((data, index) => (
              <ul key={index} className="mt-4">
                <li
                  onClick={() => setSelectedUser(data)}
                  className={`cursor-pointer flex flex-row gap-2 text-lg mt-2 items-center text-white font-bold p-2 rounded hover:bg-gray-300 transition-all duration-300`}
                >
                  <img src={data?.members[0]?.imageUrls} alt='image1' className='rounded-full w-8 h-8' />
                  {data?.members[0]?.username}
                </li>
                <hr />
              </ul>
            ))
          ) : (
            <p className='text-center mt-10 text-white font-extrabold'>No conversations</p>
          )}
        </div>

        {/* Chat Display */}

        <div className="flex-1">
          <div className="flex flex-row justify-between bg-[#132328]">
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
            {selectedUser &&

              <FaVideo onClick={() => HandleVideoCall()} className="mr-5 w-6 h-6 mt-2 text-white" />
            }
          </div>
          <div className="h-[50rem] overflow-y-auto flex flex-col justify-between bg-[#2c5b63] rounded shadow">

            {selectedUser &&
              <div className="border-b-2 border-white mb-[40%]"></div>
            }

            <div className="messages-container flex-1 relative">
              {/* Display the last sent message */}
              {lastSentMessage && (
                <div className={`message text-md bg-transparent border-2 border-white ml-2 mb-4 p-3 bg-[#132328] w-[20%] rounded-full`}>
                  {isURL(lastSentMessage.text) ? (
                    <span className="text-blue-500 underline hover:text-amber-950">
                      Video call sent
                    </span>
                  ) : (
                    <h1 className="text-white px-2 text-md font-semibold">{lastSentMessage.text}</h1>
                  )}
                  <span className='text-white font-extralight text-sm ml-2'>{format(lastSentMessage.createdAt)}</span>
                </div>
              )}

              {/* Map over all messages */}
              {messages && messages.length > 0 ? (
                messages.map((message) => (
                  <div key={message.id} className={`message ${message.senderId !== user.id ? "text-center text-md bg-transparent border-2 border-white ml-2" : "ml-[78%] text-center text-md"} mb-[10%] p-3 bg-[#132328] w-[20%] rounded-full`}>
                    {isURL(message.text) ? (
                      <span className="text-blue-500 underline hover:text-amber-950">
                        Video call sent
                      </span>
                    ) : (
                      <h1 className="text-white px-2 text-md font-semibold">{message.text}</h1>
                    )}
                    <span className='text-white font-extralight text-sm ml-2'>{format(message.createdAt)}</span>
                  </div>
                ))
              ) : (
                <div className="no-messages text-white mb-[50%] text-center">
                  <p className='font-extrabold'>No messages yet</p>
                  <FaCommentDots className='text-white w-14 h-14 ml-[47%] mt-4 text-center' />
                </div>
              )}
            </div>

            {istyping && !isMessageSender(user, selectedUser) ? (
              <div>
                <p style={{ marginBottom: 8, marginLeft: 0, color: "gray" }}>
                  Typing...
                </p>
              </div>
            ) : (
              <></>
            )}

            {selectedUser && (
              <div className="absolute w-[68%] h-[95px] bg-[#132328] p-4 mt-[705px]">
                <div className="flex items-center">
                  <div className='mt-1 px-3 py-1 text-white font-extrabold bg-[#2c5b63] rounded-md'>+</div>

                  <div className=' w-[80rem]'>
                    <InputEmoji
                      type="text"
                      value={newMessage}
                      onChange={handeleChange}
                      placeholder="Type your message..."
                      className="border p-2 rounded"
                    />
                  </div>
                  <button
                    onClick={handleSend}
                    className="bg-[#132328] text-white p-2 roundedborder-2 border-white hover:border-2 hover:bg-[#2c5b63] hover:text-white rounded-md transition-all duration-100"
                  >
                    Send
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div >
    </>
  );
};

export default ChatPage