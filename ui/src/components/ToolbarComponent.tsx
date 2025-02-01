import { RxAvatar } from "react-icons/rx";
import { IoMdHome } from "react-icons/io";
import { IoMdLogOut } from "react-icons/io";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";

export const ToolbarComponent = ({
    handleClick,
    index
}: {
    handleClick: (value: number) => void,
    index: number
}) => {
    const handleLogout = async () => {
        await fetch("http://localhost:3000/logout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        })
    }

    return (
        <>
            <div className="h-full w-12 flex flex-col items-center justify-between gap-y-8 py-5">
                <div
                    className="border flex justify-center items-center text-white rounded-full w-8 h-8">
                    <RxAvatar className="w-full bg-transparent rounded-full h-full" />
                </div>

                <div className="bg-transparent flex flex-col gap-y-3">
                    <IoMdHome
                        onClick={() => handleClick(2)}
                        className={`h-5 w-5 ${index === 2 ? "text-teal-500" : "text-teal-800"}`} />

                    <IoChatbubbleEllipses
                        onClick={() => handleClick(3)}
                        className={`h-4 w-4 ${index === 3 ? "text-teal-500" : "text-teal-800"}`} />

                </div>

                <div className="flex flex-col">
                    <button>
                        <IoSettings
                            onClick={() => handleClick(4)}
                            className={`h-4 w-4 ${index === 4 ? "text-teal-300" : "text-teal-800"}`} />

                        <IoMdLogOut
                            onClick={async () => await handleLogout()}
                            className={`h-4 w-4 mt-3 text-teal-800 hover:text-teal-300`} />
                    </button>
                </div>
            </div>
        </>
    )
}