import React, { useState } from 'react';
import useConversations from '../zustand/useConversation';
import { toast } from 'react-toastify';
import { SendMessages } from '../Api/UserApi';
import { useSelector } from 'react-redux';

const useSendMessage = () => {
    const selector = useSelector(state => state.user.userInfo);
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversations } = useConversations();

    const sendMessage = async (message) => {
        setLoading(true);
        try {
            if (!selectedConversations) {
                throw new Error("No selected conversation found.");
            }

            const response = await SendMessages(selectedConversations._id, message);
            console.log(response, "response from send message backend");
            
            const updatedMessages = [...messages, { message, senderId: selectedConversations.senderId , receiverId: selectedConversations.receiverId }];
            setMessages(updatedMessages);
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { sendMessage, loading };
};

export default useSendMessage;
