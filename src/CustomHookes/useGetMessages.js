import React, { useEffect, useState } from 'react'
import useConversations from '../zustand/useConversation'
import { toast } from 'react-toastify'
import { GetMessages } from '../Api/UserApi'
import { useSelector } from 'react-redux'

function useGetMessages() {
    const selector = useSelector(state => state.user.userInfo)
    const [Loading, setLoading] = useState(false)
    const { messages, setMessages, selectedConversations } = useConversations()
    console.log(selectedConversations,"666666^^^^");
    useEffect(() => {
        const getMessages = async () => {
            setLoading(true)
            try {
                if (selectedConversations?._id) {
                    const res = await GetMessages(selectedConversations._id);
                    const data = res.data.messages;
                    const messageData = data.map((item) => item)
                    console.log(messageData, "data in response get message");
                    setMessages(messageData);
                } else {
                    setMessages([]);
                }
            } catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        }
        if (selectedConversations?._id) {
            getMessages()
        }
    }, [selectedConversations?._id, setMessages])
    return { messages, Loading }
}

export default useGetMessages
