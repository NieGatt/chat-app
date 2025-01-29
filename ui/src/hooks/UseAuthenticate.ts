import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { useState } from "react";

export const UseAuthenticate = <T extends FieldValues>(
    schema: z.ZodTypeAny,
    url: string
) => {
    const [statusCode, setStatusCode] = useState<number>(1)
    const [loading, setLoading] = useState<boolean>(false)

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<T>({
        mode: "all",
        resolver: zodResolver(schema)
    })

    const submitHandler = handleSubmit(async (data) => {
        setLoading(true)
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        setStatusCode(response.status)
        setLoading(false)
    })

    return { submitHandler, statusCode, loading, register, errors }
}