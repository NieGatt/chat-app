import { FcGoogle } from "react-icons/fc";

export const GoogleComponent = ({ message }: { message: string }) => {
    const handleGoogleAuth = () => {
        window.location.href = "http://localhost:3000/google/auth";
    };

    return (
        <div
            onClick={handleGoogleAuth}
            className="h-7 w-full bg-white mt-1 flex justify-center items-center rounded">
            <FcGoogle className="bg-white" />
            <p className="ml-2 text-black font-bold bg-white text-[12px]">{message}</p>
        </div>
    )
}