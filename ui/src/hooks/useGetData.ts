import { useState } from "react"

export const useGetData = <T>() => {
    const [loading, setLoading] = useState<boolean>(true)
    const [data, setData] = useState<T | null>(null)

    const handleGetData = async () => {
        const res = await fetch("http://localhost:3000/chat", {
            method: "GET",
            credentials: "include"
        })
        if (res.ok) {
            const data = await res.json()
            setData(data)
        }
        setLoading(false)
    }

    return { loading, data,  handleGetData}
}