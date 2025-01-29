import { createContext, useEffect, useState } from "react";
import { IUserData } from "../interfaces/IUserData";

const UserData = createContext<null | IUserData>(null)

const UserAuthentication = ({ Children }: { Children: React.ReactNode }) => {
    const [user, setUser] = useState<null | IUserData>(null)

    const handlerUserData = async () => {
        const response = await fetch("http://localhost:3000/user", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        })

        if (response.ok) {
            const data = await response.json()
            setUser(data)
        }
    }

    useEffect(() => { handlerUserData() }, [])

    return (
        <UserData.Provider value={user}>
            {Children}
        </UserData.Provider>
    )
}

export { UserAuthentication, UserData }