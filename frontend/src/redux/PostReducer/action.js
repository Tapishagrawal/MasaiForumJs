import axios from "axios"
import { POST_GET_FAILIUR, POST_GET_REQUEST, POST_GET_SUCCESS, POST_POST_FAILIUR, POST_POST_REQUEST, POST_POST_SUCCESS } from "../actionType"

export const handlePostNewPost = (token, data, toast) => async (dispatch) => {
    const isloading = toast.loading("Wait...")
    try {
        dispatch({ type: POST_POST_REQUEST })
        let res = await axios.post(`${import.meta.env.VITE_API_URL}/post/create`, data,
        {
            headers: {
                Authorization: `Berear ${token}`
            }
        })
        dispatch({ type: POST_POST_SUCCESS, payload:res.data.data })
        toast.dismiss(isloading);
        toast.success("Your post is Live.")
    } catch (error) {
        toast.dismiss(isloading);
        toast.error("Somthing went Wrong.")
        dispatch({ type: POST_POST_FAILIUR })
        console.log(error)
    }
} 

export const handleGetAllData = (token,params) => async(dispatch) =>{
    try {
        dispatch({ type: POST_GET_REQUEST })
        let res = await axios.get(`${import.meta.env.VITE_API_URL}/post`,{
            headers: {
                "Content-Type": "application/json",
                Authorization: `Berear ${token}`
            },
            params
        });
        dispatch({ type: POST_GET_SUCCESS, payload:res.data.data })
    } catch (error) {
        dispatch({ type: POST_GET_FAILIUR })
        console.log(error)
    }
}