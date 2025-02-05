import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useUserData } from "../context/UserDataContext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const AuthorizationComponent = ({ element }: { element: React.ReactNode }) => {
    const { user, handleUser, loading } = useUserData();

    useEffect(() => {
        (async () => {
            await handleUser();
        })();
    }, []);

    return (
        <>
            {
                loading && !user ? (
                    <section className="w-full h-[400px] animate-spin flex justify-center items-center" >
                        <AiOutlineLoading3Quarters className="text-white" />
                    </section >
                ) : user === null ? (
                    <Navigate to="/sign-in" />
                ) : element
            }
        </>
    )
}