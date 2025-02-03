import { Navigate, useParams } from "react-router-dom"
import { useSendData } from "../hooks/useSendData"
import { fieldsSchema } from "../schemas/FieldsSchema"
import { ButtonComponent } from "../components/ButtonComponent"
import { useEffect } from "react"

type TemplateType = "email-verification" | "forgot-password"
type FieldValueType = { email: string }

export const EmailSending = () => {
    const { template } = useParams<{ template: TemplateType }>()
    const possibleValues = ["email-verification", "forgot-password"]

    if (!template || !possibleValues.includes(template)) {
        return <Navigate to="/not-found" replace={true} />
    }

    const email = sessionStorage.getItem("email")
    const url = `http://localhost:3000/send-verification/${template}`
    const schema = fieldsSchema.pick({ email: true })
    const heaaders = { "Content-Type": "application/json" }

    const {
        register,
        errors,
        statusCode,
        loading,
        submitHandler,
        setValue
    } = useSendData<FieldValueType>(schema, url, heaaders, "POST")

    useEffect(() => {
        if (template === "email-verification") {
            setValue("email", email!);

            (async () => await submitHandler())()
        }

    }, [template, email, setValue])

    return (
        <section className="w-screen h-screen flex justify-center items-center">
            <form
                onSubmit={submitHandler}
                className="flex flex-col items-center w-80 text-white">

                <h1 className="text-xl font-bold bg-transparent">EMAIL VERIFICATION</h1>
                {
                    statusCode === 200
                        ? (
                            <>
                                <p className="leading-tight text-center mt-3 text-[12px] bg-transparent">We're almost there! <br /> We sent a verification to {email}</p>

                                <p className="mt-3 leading-tight text-center mt-2 text-[12px] bg-transparent">
                                    If you can't see the email
                                </p>
                                <ButtonComponent
                                    loading={loading}
                                    text="Resend email verification"
                                />
                            </>
                        ) : (
                            <>
                                <p className="leading-tight text-center text-[12px] bg-transparent">Provide your email address</p>

                                <div className="mt-3 flex bg-teal-950 bg-opacity-30 rounded py-3 px-3">

                                    <div className="flex flex-col">
                                        <input
                                            className={`px-1 text-[12px] outline-none h-6 border-b ${errors.email ? "border-red-400" : "border-teal-600"} bg-zinc-100 bg-opacity-10 w-40`}
                                            type="text" placeholder="Email address"
                                            {...register("email")}
                                        />
                                        <p className="text-[9px] text-red-400">
                                            {errors.email
                                                ? errors.email.message
                                                : statusCode === 404
                                                    ? "Email not signed up"
                                                    : null
                                            }
                                        </p>
                                    </div>

                                    <button
                                        className="text-sm bg-zinc-100 bg-opacity-10 border-b h-6 border-teal-600 hover:bg-opacity-30 px-3 ml-2">
                                        Send
                                    </button>
                                </div>
                            </>
                        )
                }
            </form>
        </section>
    )
}