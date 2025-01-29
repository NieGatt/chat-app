import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/UserAuthentication";

export const AuthComponent = ({ element }: { element: React.ReactNode }) => {
    let component: React.ReactNode | null
    const user = useContext(UserData)
    const navigate = useNavigate()

    useEffect(() => {
        element = user ? element : null
        if (!element) navigate("/sign-in")
    }, [])

    return component
}