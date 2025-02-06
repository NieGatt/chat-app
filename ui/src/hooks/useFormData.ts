import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

export const useFormData = <T extends FieldValues>(
    setSchema: z.ZodTypeAny,
    seturl: string,
    setMethod: "POST" | "PUT",
) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [statusCode, setStatusCode] = useState<number>(1)

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        trigger
    } = useForm<T>({
        mode: "onSubmit",
        resolver: zodResolver(setSchema)
    });

    const submitHandler = handleSubmit(async (data) => {
        setLoading(true);
    
        const formData = new FormData();
        
        Object.keys(data).forEach((key) => {
            const value = data[key];
            formData.append(key, value);
        });
    
        const res = await fetch(seturl, {
            method: setMethod,
            body: formData,
            credentials: "include",
        });
    
        setStatusCode(res.status)
        setLoading(false);
    });
    

    return { submitHandler, trigger, statusCode, loading, register, errors, setValue };
};
