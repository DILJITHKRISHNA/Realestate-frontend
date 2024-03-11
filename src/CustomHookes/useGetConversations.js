import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { fetchAllowner } from "../Api/UserApi"

const useGetConversations = () => {
    const [loading, setLoading] = useState(false)
    const [conversations, setConversations] = useState([])

    useEffect(()=>{
        const getConversations =async () => {
            setLoading(true)
            try{
                const res = await fetchAllowner()
                console.log(res,"resss in getCmmey");
                const data = res.data.filteredOwners
                console.log(data,";;;;;");
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