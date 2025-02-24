import { useState } from "react"

export const useGetData = <T>(url: string) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [data, setData] = useState<T | null>(null)

    const handleGetData = async () => {
        setLoading(true)
        const res = await fetch(url, {
            method: "GET",
            credentials: "include"
        })
        if (res.ok) {
            const data = await res.json()
            setData(data)
        }
        setLoading(false)
    }

    return { loading, data, handleGetData }
}