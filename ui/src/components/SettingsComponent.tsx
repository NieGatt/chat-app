import { ChangeEvent, useState } from "react"
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
import { FaEdit } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { IUserEditProfile } from "../interfaces/IUserEditProfile";
import { useFormData } from "../hooks/useFormData";
import { PictureComponent } from "./PictureComponent";

export const SettingsComponent = () => {
    const [currentOption, setCurrentOption] = useState(1)
    const [hidePassword, setHidePassword] = useState({ password: false, confirm: false })
    const [imagePreview, setImagePreview] = useState<string | null>(null)

    const { user } = useUserData()

    // Password section settings
    const url = "http://localhost:3000/user/reset-password"
    const headers = { "Content-Type": "application/json" }
    const schema = fieldsSchema.pick({
        password: true,
        confirmPassword: true,
        currentPassword: true
    })

    const {
        register,
        loading,
        errors,
        statusCode,
        submitHandler
    } = useSendData<IUserResetPass>(schema, url, headers, "PUT")

    const url2 = "http://localhost:3000/user"
    const schema2 = fieldsSchema.pick({ name: true, fileImage: true })

    const {
        register: register2,
        loading: loading2,
        errors: errors2,
        submitHandler: submitHandler2,
        setValue,
        trigger,
        statusCode: statusCode2
    } = useFormData<IUserEditProfile>(schema2, url2, "PUT")

    const handleImagePreview = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);

            setValue("fileImage", file as unknown as string);
            trigger("fileImage");
        }
    }

    return (
        <section className="w-full h-full flex justify-center items-center flex-col">
            <div className="w-[700px] h-60 flex px-4">

                <div className="flex flex-col items-center text-white py-3 gap-y-2 text-sm w-32 h-full border-r border-teal-950">
                    <h1
                        onClick={() => setCurrentOption(1)}
                        className={`${currentOption === 1 ? "bg-teal-800" : "bg-teal-950 bg-opacity-70"} rounded w-full text-center`}>PROFILE</h1>

                    <h2
                        onClick={() => setCurrentOption(2)}
                        className={`${currentOption === 2 ? "bg-teal-800" : "bg-teal-950 bg-opacity-70"} rounded w-full text-center`}>PASSWORD</h2>
                </div>

                <div>
                    {
                        currentOption === 1 ? (
                            <div className=" mx-2 w-[500px] h-full text-white p-5">
                                <h1 className="font-bold">PUBLIC PROFILE</h1>

                                <form
                                    onSubmit={submitHandler2}
                                    className="flex mt-2 gap-x-10 h-full w-full">

                                    <div className="w-40 h-40">
                                        <label
                                            className="text-[10px]"
                                            htmlFor="name">NAME</label>
                                        <input type="text"
                                            defaultValue={user?.name}
                                            id="name"
                                            className={`px-1 text-[12px] outline-none h-6 border-b ${errors2.name ? "border-red-400" : "border-teal-600"} bg-zinc-100 bg-opacity-10 w-64`}
                                            {...register2("name")}
                                        />
                                        <p className="text-[9px] text-red-400">{errors2.name?.message || ""}</p>

                                        <button className={`text-[12px] text-center mt-2 ${loading2 ? " " : "bg-teal-600"} px-3 rounded hover:bg-opacity-80`}>
                                            {
                                                loading2 ? (
                                                    <p className="animate-spin bg-transparent">
                                                        <AiOutlineLoading3Quarters className="text-lg bg-transparent" />
                                                    </p>
                                                ) : statusCode2 === 200 ? (
                                                    <p className="bg-transparent">
                                                        <IoIosCheckmark className="text-lg bg-transparent" />
                                                    </p>
                                                ) : "CONFIRM"
                                            }
                                        </button>

                                    </div>

                                    <div className="w-60 flex flex-col items-center">

                                    <PictureComponent url={
                                        imagePreview ? imagePreview : user ? user.pictureUrl : null
                                        } style="w-28 h-28" />

                                        <div className="w-full mt-2 relative flex items-center bg-transparent hover:opacity-90 flex-col">
                                            <div className="flex gap-x-2 items-center bg-teal-600 px-2  rounded">
                                                <p className="bg-transparent text-[12px]">Edit</p>
                                                <FaEdit className="text-xs bg-transparent" />
                                            </div>
                                            <input
                                                type="file"
                                                className="absolute h-5 w-16 opacity-0"
                                                accept="image/jpeg, image/jpg, image/png"
                                                onChange={handleImagePreview}
                                            />
                                            <p className="text-[9px] text-red-400">{errors2.fileImage?.message || ""}</p>
                                        </div>
                                    </div>

                                </form>

                            </div>
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