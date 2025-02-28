import { IoMdLogOut } from "react-icons/io";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../context/UserDataContext";
import { PictureComponent } from "./PictureComponent";

export const ToolbarComponent = ({
    handleClick,
    index
}: {
    handleClick: (value: number) => void,
    index: number
}) => {
    const { user } = useUserData()
    const navigate = useNavigate()

    const handleLogout = async () => {
        const res = await fetch("http://localhost:3000/logout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        })
        if (res.ok) return navigate("/sign-in")
    }

    return (
        <>
            <div className="h-full w-12 bg-black bg-opacity-20 flex flex-col items-center justify-between gap-y-8 py-5">
                <PictureComponent url={user && user.pictureUrl} style="w-8 h-8" />

                <div className="bg-transparent flex flex-col gap-y-3">
                    <IoChatbubbleEllipses
                        onClick={() => handleClick(1)}
                        className={`h-4 w-4 ${index === 1 ? "text-teal-500" : "text-teal-800"} bg-transparent`} />

                    <IoSettings
                        onClick={() => handleClick(2)}
                        className={`h-4 w-4 ${index === 2 ? "text-teal-300" : "text-teal-800"} bg-transparent`} />
                </div>

                <div className="flex flex-col bg-transparent">
                    <button>
                        <IoMdLogOut
                            onClick={async () => await handleLogout()}
                            className={`bg-transparent h-4 w-4 mt-3 text-teal-800 hover:text-teal-300`} />
                    </button>
                </div>
            </div>
        </>
    )
}