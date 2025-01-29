import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const UseAuthenticate = <T extends FieldValues>(
    schema: z.ZodTypeAny,
    url: string,
    redirectTo: string
) => {
    const [statusCode, setStatusCode] = useState<number>(1)
    const [loading, setLoading] = useState<boolean>(false)

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<T>({
        mode: "onSubmit",
        resolver: zodResolver(schema)
    })

    const submitHandler = handleSubmit(async (data) => {
        setLoading(true)
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            credentials: "include"
        })

        if (response.ok) {
            sessionStorage.setItem("email", data.email)
            sessionStorage.setItem("sentEmail", "1")
            setLoading(false)
            navigate(redirectTo)
        }

        setStatusCode(response.status)
        setLoading(false)
    })

    return { submitHandler, statusCode, loading, register, errors }
}