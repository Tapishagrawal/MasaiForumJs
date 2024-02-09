import { Link, useNavigate } from "react-router-dom";
import loginPoster from "../assets/login-poster.png"
import { FcGoogle } from "react-icons/fc";
import { MdRemoveRedEye } from "react-icons/md";
import { IoEyeOffSharp } from "react-icons/io5";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handlePostLogin, handleRegister } from "../redux/AuthReducer/action";
import toast, { Toaster } from "react-hot-toast";

export const Login = () => {
    const [eye, setEye] = useState(false);
    const [isRegisterModel, setIsRegisterModel] = useState(false);
    const [inputData, setInputData] = useState({ email: "", password: "" });
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [registerinputValue, setRegisterinputValue] = useState({ username: "", email: "", password: "" })
    const [file, setFile] = useState("")
    const { token } = useSelector(store => store.AuthReducer)

    const handleChange = (e) => {
        const { name, value } = e.target
        setInputData(prev => {
            return {
                ...prev, [name]: value
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(handlePostLogin(inputData, toast, navigate))
        console.log(inputData)
    }

    const handleChangeInputValue = (e) => {
        let { type, name, value } = e.target;
        value = type === "file" ? e.target.files[0] : value
        setRegisterinputValue(prev => {
            return {
                ...prev, [name]: value
            }
        })
    }
    const handleUpload = () => {
        const formData = new FormData();
        formData.append("username", registerinputValue.username);
        formData.append("email", registerinputValue.email);
        formData.append("password", registerinputValue.password);
        formData.append("avatar", file);
        handleRegister(formData, toast, setIsRegisterModel);
    }
    return (
        <div>
            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />
            <div className="flex gap-5">
                <div className="w-[70%] h-screen">
                    <img src={loginPoster} alt="Poster" className="h-full w-full object-cover object-center" />
                </div>
                <div className="w-[30%] p-10">
                    <h1 className="text-center font-semibold mb-10 text-2xl">MASAI FORUM</h1>
                    <h3 className="font-semibold text-xl mb-5">Nice to see you again</h3>
                    <form onSubmit={onSubmit} className="flex flex-col gap-5 border-b pb-10 mb-10">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs ml-3">Login</label>
                            <input onChange={handleChange} type="text" name="email" value={inputData.email} placeholder="Email or phone number" className="bg-[#f2f2ef] rounded px-3 py-3 outline-none" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs ml-3">Password</label>
                            <div className="flex items-center bg-[#f2f2ef] rounded px-3 py-3">
                                <input onChange={handleChange} type={eye ? "text" : "password"} name="password" value={inputData.password} placeholder="Enter password" className="bg-transparent w-full outline-none" />
                                {
                                    eye ?
                                        <span onClick={() => setEye(false)} className="cursor-pointer"><MdRemoveRedEye /></span>
                                        :
                                        <span onClick={() => setEye(true)} className="cursor-pointer"><IoEyeOffSharp /></span>
                                }
                            </div>
                        </div>
                        <div className="text-center">
                            <input type="submit" value="Sign in" className="bg-[#007aff] text-white w-full py-2 rounded font-medium text-sm" />
                        </div>
                    </form>
                    <div className="flex items-center justify-center gap-2 bg-[#333332] py-2 rounded mb-5">
                        <span className="text-2xl"><FcGoogle /></span>
                        <button className="text-white text-sm">Or sign in with Google</button>
                    </div>
                    <p className="text-center text-sm">Dont have an account? <button onClick={() => setIsRegisterModel(!isRegisterModel)} to="/" className="text-[#007aff]">Sign up now</button></p>
                    {

                        isRegisterModel &&
                        <div className="">
                            <div onClick={() => setIsRegisterModel(!isRegisterModel)} className="fixed bg-black/60 text-white w-full h-screen top-0 left-0"></div>
                            <div className={`fixed top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] bg-white p-3 pb-5 pt-10  rounded-md flex flex-col gap-5`}>
                                <span onClick={() => setIsRegisterModel(!isRegisterModel)} className="absolute top-3 right-4 font-semibold cursor-pointer">X</span>
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-medium ml-2">Username</label>
                                    <input onChange={handleChangeInputValue} type="text" name="username" value={registerinputValue.username} placeholder="Enter username" className="outline-none focus:outline-blue-200 px-3 py-1 rounded-sm border" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-medium ml-2">Email</label>
                                    <input onChange={handleChangeInputValue} type="email" name="email" value={registerinputValue.email} placeholder="Enter email" className="outline-none focus:outline-blue-200 px-3 py-1 rounded-sm border" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-medium ml-2">Password</label>
                                    <input onChange={handleChangeInputValue} type="password" name="password" value={registerinputValue.password} placeholder="*******" className="outline-none focus:outline-blue-200 px-3 py-1 rounded-sm border" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-medium ml-2">Avatar</label>
                                    <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                                </div>
                                <button onClick={handleUpload} className="bg-black text-white py-2 rounded-sm mt-3">REGISTER</button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
