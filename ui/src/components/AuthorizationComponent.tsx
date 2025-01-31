import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useUserData } from "../context/UserDataContext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const AuthorizationComponent = ({ element }: { element: React.ReactNode }) => {
    const { user, handleUser } = useUserData();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            await handleUser();
            setLoading(false)
        })();
    }, []);

    if (loading) {
        return <section className="w-full h-[400px] animate-spin flex justify-center items-center">
            <AiOutlineLoading3Quarters className="text-white" />
        </section>
    }

    if (user === null) {
        return <Navigate to="/sign-in" />;
    }

    return <>{element}</>;
};
