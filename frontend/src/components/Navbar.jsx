import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaCaretDown } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux"
import { useSearchParams } from 'react-router-dom'
import { handleGetAllData } from "../redux/PostReducer/action";
export const Navbar = () => {
    const { userData } = useSelector((store) => store.AuthReducer);
    const [searchParams, setSearchParams] = useSearchParams();
    const [inputSearch, setInputSearch] = useState(searchParams.getAll("title") || "")
    const dispatch = useDispatch()
    const {token} = useSelector((store)=>store.PostReducer)

    // useEffect(() => {
    //     setSearchParams({ title: inputSearch})
    //     const paramObj = {
    //         title:inputSearch
    //     }
    //     dispatch(handleGetAllData(token,{ params: paramObj }))
    // }, [inputSearch]);
    return (
        <div className="bg-[#242d35] w-[95%] m-auto rounded p-3 py-4 flex items-center justify-around shadow-2xl">
            <div className="flex items-center gap-5">
                <img src="https://placehold.co/40x40" alt="Logo" className="rounded-lg" />
                <h1 className="text-3xl font-bold text-[#ff5700]">Masai Forum</h1>
            </div>
            <div className="flex items-center justify-between bg-[#2a353e] p-2 px-4 w-[40%] rounded-md">
                <input onChange={(e)=>setInputSearch(e.target.value)} type="text" placeholder="Type here to search..." className="text-xs bg-transparent outline-none" />
                <span className="text-2xl text-[#878ead]"><CiSearch /></span>
            </div>
            <div className="flex items-center gap-5">
                <div className=" border-2 border-orange-400 p-[1px] rounded-lg">
                    <img src={userData.avatar} alt="User Profile Picture" className="w-[40px] h-[40px] object-cover object-center rounded-lg" />
                </div>
                <h3 className=" font-semibold text-white">{userData?.username[0].toUpperCase() + userData?.username.slice(1)}</h3>
                <span className="text-white"><FaCaretDown /></span>
            </div>
        </div>
    )
}
