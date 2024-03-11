import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { FetchProfileData, fetchAllUser, fetchAllowner } from "../Api/UserApi"
import { useSelector } from "react-redux"

const useGetUserConversations = () => {
    const userId = useSelector(state => state.user.userInfo)
    const [loading, setLoading] = useState(false)
    const [userConversations, setUserConversations] = useState([])

    useEffect(()=>{
        const getUserConversations =async () => {
            setLoading(true)
            try{
                const res = await fetchAllUser()
                console.log(res,"resss in getCmme");
                const data = res.data.filteredUsers
                console.log(data,"997733");
                if(data.error){
                    throw new Error(data.error)
                }
                setUserConversations(data)
            }catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        }
        getUserConversations()
    },[])

    return { loading, userConversations}
}

export default useGetUserConversations;