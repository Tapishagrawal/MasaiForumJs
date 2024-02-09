import { timeAgo } from "../middlewares/timeAgo.middleware"
import { RiHeart2Fill } from "react-icons/ri";
export default function SinglePostCard({ title, user_id, createdAt, likes, comments,media }) {
    
    return (
        <div className="flex gap-5 bg-[#242d35] p-4 w-[900px] rounded-2xl">
            <div className="w-[20%]">
                <img src={media} alt="" className="rounded-xl w-[170px] h-[170px] object-cover object-center" />
            </div>
            <div className="w-[80%] relative">
                <span className="absolute top-0 right-2 text-2xl text-[#c4d0e6] cursor-pointer"><RiHeart2Fill/></span>
                <h3 className="text-white font-semibold w-[70%] line-clamp-2">{title}</h3>
                <div className="flex gap-5 my-3">
                    <h4 className="text-xs text-[#c4d0e6] bg-[#2a353e] rounded-full p-2 px-4 font-semibold">finance</h4>
                    <h4 className="text-xs text-[#c4d0e6] bg-[#2a353e] rounded-full p-2 px-4 font-semibold">bitcoin</h4>
                    <h4 className="text-xs text-[#c4d0e6] bg-[#2a353e] rounded-full p-2 px-4 font-semibold">crypto</h4>
                </div>
                <div className="flex items-center justify-between mt-7">
                    <div className="flex items-center gap-3">
                        <img src={user_id.avatar} alt="" className="rounded-full h-[50px] w-[50px] object-cover object-center border-2" />
                        <div>
                            <h3 className="text-white font-medium text-sm ">{user_id.username}</h3>
                            <span className="text-[#c4d0e6] text-[0.65rem]">{timeAgo(createdAt)}</span>
                        </div>
                    </div>
                    <div className="flex gap-10 text-[#c4d0e6] text-sm">
                        <p>0 Views</p>
                        <p>{likes.length} Likes</p>
                        <p>{comments.length} Comments  </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
