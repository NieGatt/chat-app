import { ButtonComponent } from "../components/ButtonComponent"
import { GoogleComponent } from "../components/GoogleComponent"
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useSendData } from "../hooks/useSendData";
import { fieldsSchema } from "../schemas/FieldsSchema";
import { ISignUpUser } from "../interfaces/ISignUpUser";
import { Link } from "react-router-dom";

export const SignUp = () => {
    const [hidePassword, setHidePassword] = useState({ password: false, confirm: false })

    const url = "http://localhost:3000/register"
    const redirect = "/verification/email-verification"
    const headers = { "Content-Type": "application/json" }

    const schema = fieldsSchema.pick({
        name: true,
        email: true,
        password: true,
        confirmPassword: true
    }).refine(data => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"]
    })

    const {
        submitHandler,
        loading,
        statusCode,
        errors,
        register
    } = useSendData<ISignUpUser>(schema, url, headers, "POST", redirect)

    return (
        <section className="w-screen h-screen flex justify-center items-center">
            <form
                onSubmit={submitHandler}
                className="flex flex-col w-56 text-white">
                <h1 className="text-xl text-xl font-bold">SIGN UP</h1>

                <div className="mt-3">
                    <input
                        className={`px-1 text-[12px] outline-none h-6 border-b ${errors.name ? "border-red-400" : "border-teal-600"} bg-zinc-100 bg-opacity-10 w-full`}
                        placeholder="Name"
                        type="text"
                        {...register("name")}
                    />
                    <p className="text-[9px] text-red-400">
                        {errors.name?.message}
                    </p>
                </div>

                <div className="mt-1">
                    <input
                        className={`px-1 text-[12px] outline-none h-6 border-b ${errors.email ? "border-red-400" : "border-teal-600"} bg-zinc-100 bg-opacity-10 w-full`}
                        type="text" placeholder="Email address"
                        {...register("email")}
                    />
                    <p className="text-[9px] text-red-400">
                        {errors.email
                            ? errors.email.message
                            : statusCode === 409
                                ? "Email already signed up"
                                : null
                        }
                    </p>
                </div>

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

                <h2 className="font-bold text-[12px] w-full text-center mt-1">OR</h2>
                <GoogleComponent message="Sign up with Google" />

                <p className="text-center text-[9px] mt-1">
                    Already have an account?
                    <Link
                        to="/sign-in"
                        className="text-teal-500 ml-1">
                        Sign in
                    </Link>
                </p>
            </form>
        </section>
    )
}