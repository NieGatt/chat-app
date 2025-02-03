import { useState } from "react"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { FaEyeSlash } from "react-icons/fa"
import { IoEyeSharp } from "react-icons/io5"
import { IoIosCheckmark } from "react-icons/io";
import { useSendData } from "../hooks/useSendData"
import { fieldsSchema } from "../schemas/FieldsSchema"
import { IoIosLock } from "react-icons/io";
import { IUserResetPass } from "../interfaces/IUserResetPass"
import { useUserData } from "../context/UserDataContext"
import { Link } from "react-router-dom"

export const SettingsComponent = () => {
    const [currentOption, setCurrentOption] = useState(1)
    const [hidePassword, setHidePassword] = useState({ password: false, confirm: false })

    const url = "http://localhost:3000/user/reset-password"
    const headers = { "Content-Type": "application/json" }

    const schema = fieldsSchema.pick({
        password: true,
        confirmPassword: true,
        currentPassword: true
    })

    const { user } = useUserData()

    const {
        register,
        loading,
        errors,
        statusCode,
        submitHandler
    } = useSendData<IUserResetPass>(schema, url, headers, "PUT")

    return (
        <section className="w-full h-full flex justify-center items-center">
            <div className="w-[700px] h-60 flex px-4">

                <div className="flex flex-col items-center text-white py-3 gap-y-2 text-sm w-32 h-full border-r border-teal-950">
                    <h1
                        onClick={() => setCurrentOption(1)}
                        className={`${currentOption === 1 ? "bg-teal-800" : ""} rounded w-full text-center`}>PROFILE</h1>

                    <h2
                        onClick={() => setCurrentOption(2)}
                        className={`${currentOption === 2 ? "bg-teal-800" : ""} rounded w-full text-center`}>PASSWORD</h2>
                </div>

                <div>
                    {
                        currentOption === 1 ? (
                            <div></div>
                        ) : (
                            <div className=" mx-2 w-[500px] h-full text-white p-5">
                                <h1 className="font-bold">
                                    {
                                        user?.type === "STANDARD_AUTH"
                                            ? "RESET PASSWORD"
                                            : "ADD PASSWORD"
                                    }
                                </h1>

                                <form
                                    onSubmit={submitHandler}
                                    className="mt-1 w-full flex items-center">

                                    <section>

                                        {
                                            user?.type === "STANDARD_AUTH" && (
                                                <div className="relative">
                                                    <label
                                                        className="text-[10px]"
                                                        htmlFor="current-password">CURRENT PASSWORD</label>

                                                    <input type="password"
                                                        id="current-password"
                                                        className={`pl-1 pr-7 text-[12px] outline-none h-6 border-b ${errors.password ? "border-red-400" : "border-teal-600"} bg-zinc-100 bg-opacity-10 w-full`}
                                                        {...register("currentPassword")}
                                                    />

                                                    <p className="text-[9px] text-red-400">
                                                        {(errors.password?.message || statusCode === 400) && "Incorrect password"}
                                                    </p>

                                                </div>
                                            )
                                        }

                                        <div className="relative">
                                            <label
                                                className="text-[10px]"
                                                htmlFor="new-password">PASSWORD</label>

                                            <input type={hidePassword.password ? "text" : "password"}
                                                className={`pl-1 pr-7 text-[12px] outline-none h-6 border-b ${errors.password ? "border-red-400" : "border-teal-600"} bg-zinc-100 bg-opacity-10 w-full`}
                                                id="new-password"
                                                {...register("password")}
                                            />

                                            <div
                                                onClick={() => setHidePassword({ ...hidePassword, password: !hidePassword.password })}
                                                className="absolute right-2 top-[31px]" >
                                                {
                                                    hidePassword.password
                                                        ? <IoEyeSharp className="bg-zinc-100 bg-opacity-10" />
                                                        : <FaEyeSlash className="bg-zinc-100 bg-opacity-10" />
                                                }
                                            </div>

                                            <p className="text-[9px] text-red-400">
                                                {
                                                    errors.password?.message
                                                        ? errors.password.message
                                                        : statusCode === 409
                                                            ? "It can't be equal to the current one"
                                                            : null
                                                }
                                            </p>

                                        </div>

                                        <div className="relative">
                                            <label
                                                className="text-[10px]"
                                                htmlFor="confirm-password">CONFIRM PASSWORD</label>

                                            <input type={hidePassword.confirm ? "text" : "password"}
                                                className={`pl-1 pr-7 text-[12px] outline-none h-6 border-b ${errors.confirmPassword ? "border-red-400" : "border-teal-600"} bg-zinc-100 bg-opacity-10 w-full`}
                                                id="confirm-new-password"
                                                {...register("confirmPassword")}
                                            />

                                            <div
                                                onClick={() => setHidePassword({ ...hidePassword, confirm: !hidePassword.confirm })}
                                                className="absolute right-2 top-[31px]" >
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

                                        <Link
                                            className="text-teal-400 text-[10px] hover:text-teal-300"
                                            to="/verification/forgot-password">
                                            Forgot your password?
                                        </Link>
                                    </section>

                                    <section className="flex flex-col w-60 h-full items-center justify-center">

                                        <div className="rounded-full p-3 bg-teal-500 flex justify-center items-center">
                                            <IoIosLock className="text-white bg-transparent text-7xl " />
                                        </div>

                                        <button className={`text-[12px] text-center mt-4 ${loading ? " " : "bg-teal-600"} px-3 rounded hover:bg-opacity-80`}>
                                            {
                                                loading ? (
                                                    <p className="animate-spin bg-transparent">
                                                        <AiOutlineLoading3Quarters className="text-lg bg-transparent" />
                                                    </p>
                                                ) : statusCode === 200 ? (
                                                    <p className="bg-transparent">
                                                        <IoIosCheckmark className="text-lg bg-transparent" />
                                                    </p>
                                                ) : "CONFIRM"
                                            }
                                        </button>
                                    </section>

                                </form>
                            </div>
                        )
                    }
                </div>

            </div>
        </section>
    )
}