import { FcGoogle } from "react-icons/fc";

export const GoogleComponent = () => {
    const handleGoogleAuth = () => {
        window.location.href = "http://localhost:3000/google/auth"; 
    };

    return (
        <div
            onClick={handleGoogleAuth}
            className="h-7 w-full bg-zinc-300 hover:bg-zinc-200 mt-1 flex justify-center items-center rounded">
            <FcGoogle />
            <p className="ml-2 text-[12px]">Sign in with Google</p>
        </div>
    )
}