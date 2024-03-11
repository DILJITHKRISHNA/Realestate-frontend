import React, { useEffect, useState } from 'react'
import useConversations from '../zustand/useConversation'
import { toast } from 'react-toastify'
import { GetMessages } from '../Api/UserApi'

function useGetMessages() {
    const [Loading, setLoading] = useState(false)
    const {messages, setMessages, selectedConversations} = useConversations()
    useEffect(()=>{
        const getMessages = async () => {
            setLoading(true)
            try{
                if (selectedConversations?._id) {
                    console.log(selectedConversations._id, "id in getmessage");
                    const res = await GetMessages(selectedConversations._id);
                    const data = res.data.messages;
                    console.log(data,"ansif");
                    const messageData = data.map((item)=>item)
                    console.log(messageData, "data in response get message");
                    setMessages(messageData);
                  } else {
                    setMessages([]);
                  }
            }catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        }
        if(selectedConversations?._id){
            getMessages()
        }
    },[selectedConversations?._id, setMessages])
    console.log(messages,"end of this");
    return  {messages, Loading}
}

export default useGetMessages
