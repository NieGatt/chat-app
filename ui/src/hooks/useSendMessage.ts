import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Socket } from "socket.io-client";

export const useSendMessage = <T extends FieldValues>(
    setSchema: z.ZodTypeAny,
    seturl: string,
    socket: Socket | null,
    chat_id: string | null
) => {
    const [loading, setLoading] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        reset,
        setValue
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
            method: "POST",
            body: formData,
            credentials: "include",
        });

        if (res.ok && socket) (
            socket.emit("new-message-recovery", chat_id)
        )
    
        setLoading(false);
        reset()
    });
    
    return { submitHandler, loading, register, setValue };
};
