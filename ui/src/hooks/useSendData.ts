import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useSendData = <T extends FieldValues>(
    setSchema: z.ZodTypeAny,
    seturl: string,
    setHeaders: { [key: string]: string },
    setMethod: "POST" | "PUT",
    setRedirect?: string
) => {
    const [statusCode, setStatusCode] = useState<number>(1)
    const [loading, setLoading] = useState<boolean>(false)

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<T>({
        mode: "onSubmit",
        resolver: zodResolver(setSchema)
    })

    const submitHandler = handleSubmit(async (data) => {
        setLoading(true)
        const response = await fetch(seturl, {
            method: setMethod,
            headers: setHeaders,
            body: JSON.stringify(data),
            credentials: "include"
        })

        if (response.ok) {
            setLoading(false)
            data.email && sessionStorage.setItem("email", data.email)
            setRedirect && navigate(setRedirect)
        }

        setStatusCode(response.status)
        setLoading(false)
    })

    return { submitHandler, statusCode, loading, register, errors, setValue }
}