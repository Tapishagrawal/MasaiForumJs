import axios from "axios"
import { POST_GET_FAILIUR, POST_GET_REQUEST, POST_GET_SUCCESS, POST_POST_FAILIUR, POST_POST_REQUEST, POST_POST_SUCCESS } from "../actionType"

export const handlePostNewPost = (token, data) => async (dispatch) => {
    try {
        dispatch({ type: POST_POST_REQUEST })
        let res = await axios.post(`${import.meta.env.VITE_API_URL}/post/create`, data,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Berear ${token}`
            }
        })
        dispatch({ type: POST_POST_SUCCESS, payload:res.data.data })
    } catch (error) {
        dispatch({ type: POST_POST_FAILIUR })
        console.log(error)
    }
} 

export const handleGetAllData = (token) => async(dispatch) =>{
    try {
        dispatch({ type: POST_GET_REQUEST })
        let res = await axios.get(`${import.meta.env.VITE_API_URL}/post`,{
            headers: {
                "Content-Type": "application/json",
                Authorization: `Berear ${token}`
            }
        });
        dispatch({ type: POST_GET_SUCCESS, payload:res.data.data })
    } catch (error) {
        dispatch({ type: POST_GET_FAILIUR })
        console.log(error)
    }
}