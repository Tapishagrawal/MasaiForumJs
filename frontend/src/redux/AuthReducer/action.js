import axios from "axios";
import { LOGIN_POST_REQUEST, LOGIN_POST_SUCCESS, LOGIN_POST_FAILURE, REGISTER_POST_REQUEST, REGISTER_POST_SUCCESS, REGISTER_POST_FAILURE } from "../actionType";


export const handlePostLogin = (usercredential, toast, navigate) => async (dispatch) => {
    let loading = toast.loading("Loading...")
    try {
        dispatch({ type: LOGIN_POST_REQUEST });
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/login`, usercredential);
        localStorage.setItem("token", JSON.stringify(res.data.data.token))
        localStorage.setItem("userData", JSON.stringify(res.data.data.user))
        dispatch({ type: LOGIN_POST_SUCCESS, payload: { token: res.data.data.token, userData: res.data.data.user } });
        toast.dismiss(loading)
        toast.success("You are login successfully!")
        setTimeout(() => {
            navigate("/feed")
        }, 1500)
    } catch (error) {
        console.error(error);
        toast.dismiss(loading)
        toast.error("Wrong Credential!")
        dispatch({ type: LOGIN_POST_FAILURE });
    }
};
export const handleRegister = async(formData, toast, setIsRegisterModel) => {
    let loading = toast.loading("Loading...")
    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/register`, formData);
        console.log(res.data)
        toast.dismiss(loading)
        toast.success("You are registered successfully!")
        setIsRegisterModel(false)
    } catch (error) {
        toast.dismiss(loading)
        if(error.response.data.message){
            toast.error(error.response.data.message)
        }else{
            toast.error(error.message)
        }
        console.log(error)
    }
};
