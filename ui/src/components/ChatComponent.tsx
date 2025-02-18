import { useEffect, useState } from "react"
import { io, Socket } from "socket.io-client"
import { useGetData } from "../hooks/useGetData"
import { IChatsData } from "../interfaces/IChatsData"
import { PictureComponent } from "./PictureComponent"
import { useUserData } from "../context/UserDataContext"
import { AiFillPicture } from "react-icons/ai";
import { fieldsSchema } from "../schemas/FieldsSchema"
import { useFormData } from "../hooks/useFormData"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

interface InputsMessage {
    text?: string;
    file?: File
}

export const ChatComponent = () => {
    const { data, handleGetData } = useGetData<IChatsData[]>()
    const [selecetedUser, setSelectedUser] = useState<IChatsData | null>(data?.[0] ?? null)
    const [url, setUrl] = useState<string>("")

    const { user } = useUserData()

    const handleSelectUser = (id: string) => {
        setSelectedUser(data?.find(chat => chat.partner.id === id) ?? null)
    }

    const schema = fieldsSchema.pick({ file: true, text: true })

    const {
        loading,
        register,
        submitHandler,
        errors,
        setValue
    } = useFormData<InputsMessage>(schema, url, "POST")

    useEffect(() => {
        (async () => handleGetData())()
    }, [])

    console.log(errors)

    return (
        <section className="flex w-full h-full">
            <section className="flex flex-col text-white h-full w-56 mx-3 justify-start p-3">

                <form className="mt-4 flex justify-between items-center">
                    <h1 className="font-bold text-xl">CHATS</h1>
                    <input
                        type="text"
                        className="bg-teal-900 items-center h-5 text-xs rounded-full w-32 outline-none px-2"
                        placeholder="search..."
                    />
                </form>

                <section className="flex flex-col w-full h-full mt-1 mb-1 overflow-y-auto">
                    {
                        data && data.length > 0 ? (

                            data.map(chat => {
                                return (
                                    <section
                                        key={chat.chat_id}
                                        onClick={() => handleSelectUser(chat.partner.id)}
                                        className={`flex mt-2 py-1 px-2 relative items-center rounded-lg ${selecetedUser?.partner.id === chat.partner.id ? "bg-emerald-800" : "bg-emerald-950"} hover:bg-emerald-800`}>

                                        <PictureComponent url={chat.partner.pictureUrl} style="w-7 h-7" />

                                        <div className="flex flex-col w-full text-white px-2 bg-transparent">
                                            <p className="bg-transparent text-sm">{chat.partner.name}</p>

                                            <p className="bg-transparent text-[10px] opacity-70">
                                                {(() => {
                                                    const message = chat.messages.find(message => message?.text);
                                                    return message ? (message!.text!.length > 20 ? message!.text!.slice(0, 20) + "..." : message.text) : null;
                                                })()}
                                            </p>
                                        </div>

                                        {
                                            chat.not_seen_messages > 0 && (
                                                <div
                                                    className="flex justify-center items-center absolute right-2 text-xs flex bg-teal-700 rounded-full px-1">
                                                    {chat.not_seen_messages}
                                                </div>
                                            )
                                        }
                                    </section>
                                )
                            })
                        ) : null
                    }
                </section>
            </section>

            <section className="w-[700px] flex flex-col p-3">

                {
                    selecetedUser && (
                        <>
                            <div className="bg-emerald-800 flex items-center text-white rounded-lg w-full flex mt-4 py-1 px-2">
                                <PictureComponent url={selecetedUser.partner.pictureUrl} style="w-7 h-7" />
                                <p className="bg-transparent ml-3">{selecetedUser.partner.name}</p>
                            </div>

                            <div className="w-full h-72 mb-2 overflow-y-auto">
                                {
                                    user && selecetedUser.messages.map(message => {
                                        return (
                                            <>
                                                {
                                                    message.sender_id === selecetedUser.partner.id ? (
                                                        <section
                                                            key={message.id}
                                                            className={`gap-x-2 flex text-white justify-start`}>

                                                            <PictureComponent
                                                                url={selecetedUser.partner.pictureUrl}
                                                                style="w-7 h-7"
                                                            />

                                                            <div
                                                                style={{ maxWidth: "320px" }}
                                                                className="flex flex-col bg-emerald-800  rounded-lg mt-2 px-3 py-1">

                                                                {
                                                                    message.fileUrl && (
                                                                        message.fileUrl.match(/.(jpeg|jpg|png)/g)
                                                                            ? (
                                                                                
                                                                                <img
                                                                                    className="rounded-lg w-full"
                                                                                    src={message.fileUrl || undefined}
                                                                                    alt="file" />

                                                                            ) : message.fileUrl.match(/.mp4/g) ? (

                                                                                <video className="rounded-lg" controls>
                                                                                    <source src={`${message.fileUrl}`} type="video/mp4" />
                                                                                    Ops!
                                                                                </video>

                                                                            ) : null
                                                                    )
                                                                }

                                                                <p className="bg-transparent text-sm break-words">{message.text}</p>
                                                            </div>

                                                        </section>
                                                    ) : user ? (
                                                        <section
                                                            key={message.id}
                                                            className={`gap-x-2 flex text-white justify-end`}>

                                                            <div
                                                                style={{ maxWidth: "320px" }}
                                                                className="flex flex-col bg-emerald-800  rounded-lg mt-2 px-3 py-1">

                                                                {
                                                                    message.fileUrl && (
                                                                        message.fileUrl.match(/.(jpeg|jpg|png)/g)
                                                                            ? (

                                                                                <img
                                                                                    className="rounded-lg w-full"
                                                                                    src={message.fileUrl || undefined}
                                                                                    alt="file" />

                                                                            ) : message.fileUrl.match(/.mp4/g) ? (

                                                                                <video className="rounded-lg" controls>
                                                                                    <source src={`${message.fileUrl}`} type="video/mp4" />
                                                                                    Ops!
                                                                                </video>

                                                                            ) : null
                                                                    )
                                                                }

                                                                <p className="bg-transparent text-sm break-words">{message.text}</p>
                                                            </div>

                                                            <PictureComponent
                                                                url={user.pictureUrl}
                                                                style="w-7 h-7"
                                                            />

                                                        </section>
                                                    ) : null
                                                }
                                            </>
                                        )
                                    })
                                }
                            </div>

                            <form
                                onSubmit={submitHandler}
                                className="w-full h-8 flex items-center gap-x-1 relative">
                                <input
                                    className="w-[460px] bg-emerald-950 h-7 text-white outline-none px-3 rounded"
                                    placeholder="Send a message..."
                                    type="text"
                                    {...register("text")}
                                />

                                <AiFillPicture className="h-12 w-10 text-emerald-900" />

                                <button
                                    type="submit"
                                    onClick={() => setUrl(`http://localhost:3000/chat/${selecetedUser.partner.id}/${selecetedUser.chat_id}`)}
                                    className="text-white rounded bg-emerald-700 w-44 h-[26px] hover:bg-emerald-600 flex justify-center items-center">
                                    {
                                        loading ? (
                                            <AiOutlineLoading3Quarters className="bg-transparent animate-spin" />
                                        ) : "SEND"
                                    }
                                </button>

                                <input
                                    type="file"
                                    className="absolute right-44 w-10 opacity-0"
                                    accept="image/jpeg, image/jpg, image/png, video/mp4"
                                    onChange={(e) => setValue("file", e.target.files?.[0] || undefined)}
                                />
                            </form>
                        </>
                    )
                }

            </section>
        </section>
    )
}