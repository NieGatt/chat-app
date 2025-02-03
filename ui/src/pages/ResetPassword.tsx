import { fieldsSchema } from "../schemas/FieldsSchema";
import { ButtonComponent } from "../components/ButtonComponent";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { useState } from "react";
import { useSendData } from "../hooks/useSendData";
import { useParams } from "react-router-dom";

type ResetPasswordType = { password: string, confirmPassword: string }

export const ResetPassword = () => {
    const [hidePassword, setHidePassword] = useState({ password: false, confirm: false })

    const url = "http://localhost:3000/reset-password"
    const schema = fieldsSchema.pick({ password: true, confirmPassword: true })
    const redirect = "/sign-in"
    const { token } = useParams() as { token: string }

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearear ${token}`
    }

    const {
        register,
        loading,
        submitHandler,
        errors,
    } = useSendData<ResetPasswordType>(schema, url, headers, "PUT", redirect)

    return (
        <section className="w-screen h-screen flex justify-center items-center">
            <form
                onSubmit={submitHandler}
                className="flex flex-col w-60 text-white">
                <h1 className="text-xl text-xl font-bold">NEW PASSWORD</h1>

                <div className="relative mt-1">
                    <input type={hidePassword.password ? "text" : "password"}
                        className={`pl-1 pr-7 text-[12px] outline-none h-6 border-b ${errors.password ? "border-red-400" : "border-teal-600"} bg-zinc-100 bg-opacity-10 w-full`}
                        placeholder="Password"
                        {...register("password")}
                    />
                    <div
                        onClick={() => setHidePassword({ ...hidePassword, password: !hidePassword.password })}
                        className="absolute right-2 top-[6px]" >
                        {
                            hidePassword.password
                                ? <IoEyeSharp className="bg-zinc-100 bg-opacity-10" />
                                : <FaEyeSlash className="bg-zinc-100 bg-opacity-10" />
                        }
                    </div>
                    <p className="text-[9px] text-red-400">
                        {errors.password?.message}
                    </p>
                </div>

                <div className="relative mt-1">
                    <input type={hidePassword.confirm ? "text" : "password"}
                        className={`pl-1 pr-7 text-[12px] outline-none h-6 border-b ${errors.confirmPassword ? "border-red-400" : "border-teal-600"} bg-zinc-100 bg-opacity-10 w-full`}
                        placeholder="Confirm password"
                        {...register("confirmPassword")}
                    />
                    <div
                        onClick={() => setHidePassword({ ...hidePassword, confirm: !hidePassword.confirm })}
                        className="absolute right-2 top-[6px]" >
                        {
                            hidePassword.confirm
                                ? <IoEyeSharp className="bg-zinc-100 bg-opacity-10" />
                                : <FaEyeSlash className="bg-zinc-100 bg-opacity-10" />
                        }
                    </div>
                    <p className="text-[9px] text-red-400">
                        {errors.confirmPassword?.message}
                    </p>
                </div>

                <ButtonComponent loading={loading} />
            </form>
        </section>
    )
}