import { createContext, useContext, useState } from "react";
import { IUserData } from "../interfaces/IUserData";
import { IUserContext } from "../interfaces/IUserContext";

const UserData = createContext<IUserContext>({
    user: null,
    handleUserData: async () => { },
    loading: false
});

const UserDataContext = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<null | IUserData>(null)
    const [loading, setLoading] = useState<boolean>(true)

    const fetchUserData = async (): Promise<IUserData | null> => {
        const response = await fetch("http://localhost:3000/user", {
            method: "GET",
            credentials: "include"
        })

        if (!response.ok) return null

        const data = await response.json() as IUserData
        setUser(data)
        return data
    }

    const refreshToken = async (): Promise<boolean> => {
        const res = await fetch("http://localhost:3000/refresh-token", {
            method: "GET",
            credentials: "include"
        })
        return res.ok ? true : false
    }

    const handleUserData = async () => {
        try {
            const data = await fetchUserData()

            if (!data) {
                const refresh = await refreshToken()
                if (refresh) {
                    await fetchUserData()
                }
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log("Fetch user failed", error)
        }
    }

    return (
        <UserData.Provider value={{ user, handleUserData, loading }}>
            {children}
        </UserData.Provider>
    )
}

const useUserData = () => useContext(UserData);

export { useUserData, UserDataContext }