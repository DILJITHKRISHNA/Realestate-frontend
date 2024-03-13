// src/App.js
import React, { useEffect, useRef, useState } from 'react';
import { FaSearch, FaVideo } from 'react-icons/fa';

const users = [
  { id: 1, name: 'User 1' },
  { id: 2, name: 'User 2' },
  // Add more users as needed
];

const OwnerChat = () => {
  const [chat, setChat] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const chatContainerRef = useRef(null);
  const [inputMessage, setInputMessage] = useState('');

  // Function to scroll the chat to the bottom
  const scrollChatToBottom = () => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };

  // Function to handle sending a new message
  const handleSendMessage = () => {
    // Your logic to send a message goes here
    // For example, you might update the messages state with the new message

    setMessages([...messages, { text: newMessage, sender: 'user' }]);
    setNewMessage('');

    // After sending the message, scroll the chat to the bottom
    scrollChatToBottom();
  };

  // Initial scroll to the bottom when the component mounts
  useEffect(() => {
    scrollChatToBottom();
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row h-screen bg-white">
        <div className="md:w-[7%] bg-black">
          <img
            src="https://onaircode.com/wp-content/uploads/2020/02/Elegant-Bootstrap-4-Message-Chat-Box.jpg"
            alt=""
            className="rounded-full w-12 h-12 ml-6 mt-4"
          />
        </div>

        {/* User Listing Sidebar */}
        <div className="w-full md:w-1/4 h-[98%] bg-[#132328] p-4">
          <input
            className="w-full px-2 py-1 rounded-md bg-transparent border-2 border-white"
            placeholder="Search Here"
          />
          <ul className="mt-4">
            <li
              className={`cursor-pointer flex flex-row gap-2 text-lg mt-2 items-center text-white font-bold 
                } p-2 rounded hover:bg-gray-300 transition-all duration-300`}
            >
              <img src="https://onaircode.com/wp-content/uploads/2020/02/Elegant-Bootstrap-4-Message-Chat-Box.jpg" alt="" className="rounded-full w-8 h-8" />
              name
            </li>
          </ul>
        </div>

        {/* Chat Display */}
        <div className="flex-1">
          <div className="h-[98%]  flex flex-col justify-between bg-[#2c5b63] rounded shadow p-2">
            <div className="flex flex-row justify-between">
              <h1 className="text-2xl px-2 font-bold mb-4 text-white flex flex-row gap-4 mt-2">
                <img
                  src="https://onaircode.com/wp-content/uploads/2020/02/Elegant-Bootstrap-4-Message-Chat-Box.jpg"
                  alt=""
                  className="rounded-full w-10 h-10 text-center"
                />
                <div className="flex flex-col">
                  <span className="text-black">Name</span>
                  <span className="text-sm text-black font-extralight">Online</span>
                </div>
              </h1>
            </div>
            <div className='border-b-2 border-white'></div>
            <div className="absolute overflow-y-auto mt-24 p-3 bg-[#132328] w-[20%] rounded-full">
              <h1 className="text-white px-2">Hi, How are You?</h1>
            </div>

            <div className="overflow-y-auto flex-1" ref={chatContainerRef}>
              {/* Display chat messages here */}
              {messages.map((message, index) => (
                <div key={index} className="text-white">
                  {message.sender}: {message.text}
                </div>
              ))}
            </div>

            <div className="absolute w-full md:w-2/3 mt-[41%]">
              <div className="flex items-center mt-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 border p-2 mr-2 rounded"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                />
                <button
                  className="bg-amber-900 text-white p-2 rounded hover:bg-white hover:border-2 hover:border-amber-900 hover:text-amber-900 transition-all duration-300"
                  onClick={handleSendMessage}
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
