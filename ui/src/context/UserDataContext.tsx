import { createContext, useContext, useState } from "react";
import { IUserData } from "../interfaces/IUserData";

const UserData = createContext<{
    user: IUserData | null;
    handleUser: () => Promise<void>;
}>({
    user: null,
    handleUser: async () => { }
});

const UserDataContext = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<null | IUserData>(null)

    const handleUser = async () => {
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

    return (
        <UserData.Provider value={{ user, handleUser }}>
            {children}
        </UserData.Provider>
    )
}

const useUserData = () => useContext(UserData);

export { useUserData, UserDataContext }