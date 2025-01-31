import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type ErrorType = {
    message: string;
    statusCode: number;
    timestamp: string;
}

export const Validate = () => {
    const [error, setError] = useState<ErrorType | null>(null)
    const { token } = useParams() as { token: string }

    const navigate = useNavigate()

    const validateHandler = async () => {
        const res = await fetch('http://localhost:3000/validate', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearear ${token}`
            }
        })

        if (res.ok) return navigate("/sign-in")

        const data = await res.json()
        setError(data)
    }

    useEffect(() => {
        (async () => await validateHandler())()
    },[])

    return (
        <section className="px-1 font-bold text-white flex gap-x-2 text-sm w-screen">
            {
                error
                    ? (
                        <>
                            <p>message: {error.message},</p>
                            <p>statusCode: {error.statusCode},</p>
                            <p>timestamp: {error.timestamp},</p>
                        </>
                    ) : null
            }
        </section>
    )
}