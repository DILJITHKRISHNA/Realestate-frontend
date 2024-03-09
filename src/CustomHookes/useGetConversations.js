import { useEffect, useState } from "react"
import { fetchAllUser } from "../Api/UserApi"
import { toast } from "react-toastify"

const useGetConversations = () => {
    const [loading, setLoading] = useState(false)
    const [conversations, setConversations] = useState([])

    useEffect(()=>{
        const getConversations =async () => {
            setLoading(true)
            try{
                const res = await fetchAllUser()
                const data = res.data.filteredUsers
                if(data.error){
                    throw new Error(data.error)
                }
                setConversations(data)
            }catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        }
        getConversations()
    },[])

    return { loading, conversations}
}

export default useGetConversations;