import { ButtomComponent } from "../components/ButtomComponent"
import { GoogleComponent } from "../components/googleComponent"
import { UseAuthenticate } from "../hooks/UseAuthenticate";
import { fieldsSchema } from "../schemas/FieldsSchema";
import { Link } from "react-router-dom";
import { ISignInUser } from "../interfaces/ISignInUser";

export const SignIn = () => {
    const url = "http://localhost:3000/login"
    const schema = fieldsSchema.pick({ email: true, password: true })
    const redirect = "/"

    const {
        submitHandler,
        loading,
        statusCode,
        errors,
        register
    } = UseAuthenticate<ISignInUser>(schema, url, redirect)

    return (
        <section className="w-screen h-screen flex justify-center items-center">
            <form
                onSubmit={submitHandler}
                className="flex flex-col w-56 text-white">
                <h1 className="text-xl text-xl font-bold">SIGN IN</h1>

                <div className="mt-3">
                    <input
                        className="px-1 text-[12px] outline-none h-6 border-b border-teal-600 bg-zinc-100 bg-opacity-10 w-full"
                        type="text" placeholder="Email address"
                        {...register("email")}
                    />
                </div>

                <div className="relative mt-1">
                    <input type="password"
                        className="pl-1 pr-7 text-[12px] outline-none h-6 border-b border-teal-600 bg-zinc-100 bg-opacity-10 w-full"
                        placeholder="Password"
                        {...register("password")}
                    />
                    <p className={`text-[9px] text-red-400 w-full flex ${(errors.email || errors.password || statusCode === 404) ? "justify-between" : "justify-end"}`}>
                        {(errors.email || errors.password)
                            ? "Incorrect email or password"
                            : statusCode === 404
                                ? "Email not signed up"
                                : null
                        }
                        <p className="text-end text-[9px] text-teal-500">Forgot your password?</p>
                    </p>

                </div>

                <ButtomComponent loading={loading} />

                <h2 className="font-bold text-[12px] w-full text-center mt-1">OR</h2>
                <GoogleComponent message="Sign in with Google" />

                <p className="text-center text-[9px] mt-1">
                    Don't have an account?
                    <Link
                        to="/sign-up"
                        className="text-teal-500 ml-1">
                        Sign up
                    </Link>
                </p>
            </form>
        </section>
    )
}