import { useEffect, useState, useRef } from "react"
import { io, Socket } from "socket.io-client"
import { useGetData } from "../hooks/useGetData"
import { IChatsData } from "../interfaces/IChatsData"
import { PictureComponent } from "./PictureComponent"
import { useUserData } from "../context/UserDataContext"
import { AiFillPicture } from "react-icons/ai";
import { fieldsSchema } from "../schemas/FieldsSchema"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { FaImage } from "react-icons/fa";
import { IChatMessages } from "../interfaces/IChatMessages"
import { IoIosSearch } from "react-icons/io";
import { IFindUsers } from "../interfaces/IFindUsers"
import { IoIosAddCircle } from "react-icons/io";
import { useSendMessage } from "../hooks/useSendMessage"
import { FaUserFriends } from "react-icons/fa";

interface InputsMessage {
    text?: string;
    file?: File
}

export const ChatComponent = () => {
    const [messages, setMessages] = useState<IChatMessages[] | null>(null)
    const [selectedChat, setSelectedChat] = useState<IChatsData | null>(null)

    const [url, setUrl] = useState<string>("")
    const [inputValue, setInputValue] = useState("")

    const chatUrl = "http://localhost:3000/chat"
    const searchUrl = `http://localhost:3000/user/${inputValue}`

    const lastElement = useRef<HTMLDivElement | null>(null)
    const { user } = useUserData()
    const schema = fieldsSchema.pick({ file: true, text: true })

    let socketRef = useRef<Socket | null>(null)
    const socket = socketRef.current

    const {
        data: chatData,
        handleGetData: handleChatData
    } = useGetData<IChatsData[]>(chatUrl)

    const {
        data: searchedData,
        handleGetData: handleSearchData,
        loading: loadingSearch
    } = useGetData<IFindUsers[]>(searchUrl)

    const handleChatCreation = async (id: string) => {
        const url = `http://localhost:3000/chat/create/${id}`
        await fetch(url, {
            method: "POST",
            credentials: "include"
        })
    }

    const {
        loading,
        register,
        submitHandler,
        setValue
    } = useSendMessage<InputsMessage>(schema, url, socket, selectedChat?.chat_id ?? null)

    const joinChatHandler = (chat_id: string) => {
        const chat = chatData?.find(chat => chat.chat_id === chat_id)

        if (chat && socket && user?.id) {
            const data = { chat_id: chat.chat_id, user_id: user.id }

            setSelectedChat(chat)
            socket.emit("join-chat", data, (messages: IChatMessages[]) => {
                setMessages(messages)
            })
        }
    }

    useEffect(() => {
        socketRef.current = io("http://localhost:3000");

        if (!chatData) {
            (async () => handleChatData())()
        }

        let interval: NodeJS.Timeout;
        interval = setInterval(() => {
            (async () => handleChatData())()
        }, 15 * 1000);

        return () => {
            clearInterval(interval)
            socket?.disconnect()
        }
    }, [])

    useEffect(() => {
        if (!socket || !selectedChat) return;

        socket.on("new-message", (message: IChatMessages) => {
            setMessages(prev => [...(prev || []), message]);
        })

        return (() => {
            socket?.off("new-message")
        })

    }, [selectedChat])

    useEffect(() => {
        lastElement.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages])

    return (
        <section className="flex w-full h-full">
            <section className="flex flex-col text-white h-full w-56 mx-3 justify-start p-3">

                <section style={{ maxHeight: "120px" }} className="flex flex-col w-full mt-4">

                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            handleSearchData()
                        }}
                        className="flex justify-between items-center gap-x-2">
                        <button type="submit">
                            <IoIosSearch className="bg-teal-700 rounded-full text-2xl p-1" />
                        </button>

                        <input
                            type="text"
                            className="bg-teal-900 w-44 items-center h-6 text-xs rounded-full outline-none px-3"
                            placeholder="search..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                    </form>

                    {
                        loadingSearch ? (
                            <div className="flex items-center mt-2 gap-x-2">
                                <AiOutlineLoading3Quarters className="text-sm animate-spin bg-transparent" />
                                <p className="text-[10px]">searching...</p>
                            </div>
                        ) : (
                            <>
                                {
                                    searchedData && searchedData.length > 0 ? (
                                        <div className="flex mt-2 flex-col overflow-y-auto">
                                            {
                                                searchedData.map(user => {
                                                    return (
                                                        <section
                                                            key={user.id}
                                                            className={`flex mt-2 py-1 px-2 relative items-center bg-emerald-950 rounded-lg hover:bg-emerald-800`}>

                                                            <PictureComponent url={user.pictureUrl} style="w-7 h-7" />

                                                            <div className="flex flex-col w-full text-white px-2 bg-transparent">
                                                                <p className="bg-transparent text-sm">{user.name}</p>
                                                            </div>
                                                            <IoIosAddCircle
                                                                onClick={() => handleChatCreation(user.id)}
                                                                className="bg-transparent absolute right-2 top-[8px] h-5 w-5" />
                                                        </section>
                                                    )
                                                })
                                            }
                                        </div>
                                    ) : null
                                }
                            </>
                        )
                    }

                </section>

                <section className="flex flex-col w-full h-full mb-1 overflow-y-auto">
                <h1 className="font-bold mt-4">CHATS</h1>
                    {
                        chatData && chatData.length > 0 ? (

                            chatData.map(chat => {
                                return (
                                    <>
                                        <section
                                            key={chat.chat_id}
                                            onClick={() => joinChatHandler(chat.chat_id)}
                                            className={`flex mt-2 py-1 px-2 relative items-center rounded-lg ${selectedChat?.partner.id === chat.partner.id ? "bg-emerald-800" : "bg-emerald-950"} hover:bg-emerald-800`}>

                                            <PictureComponent url={chat.partner.pictureUrl} style="w-7 h-7" />

                                            <div className="flex flex-col w-full text-white px-2 bg-transparent">
                                                <p className="bg-transparent text-sm">{chat.partner.name}</p>

                                                {
                                                    chat.messages && chat.messages.sender_id !== user?.id && chat.messages.chat_id !== selectedChat?.chat_id && (
                                                        <p className={`bg-transparent ${chat.messages.status === "SEEN" ? "opacity-40" : "text-emerald-400 opacity-100"} text-[10px]`}>
                                                            {
                                                                chat.messages.text ? (
                                                                    chat.messages.text.length > 25
                                                                        ? chat.messages.text?.slice(0, 25) + "..."
                                                                        : chat.messages.text
                                                                ) : (
                                                                    <FaImage />
                                                                )
                                                            }
                                                        </p>
                                                    )
                                                }
                                            </div>
                                        </section>
                                    </>
                                )
                            })
                        ) : <div className="text-xs rounded-lg bg-emerald-950 mt-2 flex justify-center items-center h-10">
                            No chats available
                        </div>
                    }
                </section>
            </section>

            <section className="w-[670px] flex flex-col p-3">

                {
                    selectedChat ? (
                        <>
                            <div className="w-full h-[380px] flex flex-col mt-4 mb-1 overflow-y-auto">
                                {
                                    messages && messages.length > 0 && messages.map((message, index) => {
                                        return (
                                            <>
                                                {
                                                    <section
                                                        key={message.id}
                                                        ref={index === messages.length - 1 ? lastElement : null}
                                                        className={`gap-x-2 flex text-white ${message.sender_id === user?.id ? "justify-end" : "justify-start"}`}>
                                                        <div
                                                            style={{
                                                                maxWidth: "320px",
                                                                maxHeight: "270px"
                                                            }}
                                                            className={`flex flex-col ${message.sender_id === user?.id ? "bg-emerald-800" : "bg-emerald-950 border border-emerald-900"} rounded-lg mt-2 px-3 $ py-1`}
                                                        >
                                                            {message.fileUrl && (
                                                                message.fileUrl.match(/\.(jpeg|jpg|png)$/) ? (
                                                                    <img
                                                                        className="rounded-lg w-full h-auto mt-3"
                                                                        src={message.fileUrl || undefined}
                                                                        alt="file"
                                                                        style={{
                                                                            objectFit: "contain",
                                                                            maxWidth: "100%",
                                                                            maxHeight: "220px"
                                                                        }}
                                                                    />
                                                                ) : message.fileUrl.match(/\.mp4$/) ? (
                                                                    <video
                                                                        className="rounded-lg w-72 mt-3"
                                                                        style={{
                                                                            maxHeight: "220px",
                                                                            objectFit: "contain"
                                                                        }}
                                                                        controls
                                                                    >
                                                                        <source src={message.fileUrl} type="video/mp4" />
                                                                        Ops!
                                                                    </video>
                                                                ) : null
                                                            )}

                                                            <p className="bg-transparent text-sm break-words">{message.text}</p>
                                                        </div>
                                                    </section>
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
                                    className="w-[460px] bg-emerald-900 h-7 text-white outline-none px-3 rounded"
                                    placeholder="Send a message..."
                                    type="text"
                                    {...register("text")}
                                />

                                <AiFillPicture className="h-12 w-10 bg-transparent text-emerald-900" />

                                <button
                                    type="submit"

                                    onClick={() => setUrl(`http://localhost:3000/chat/${selectedChat.partner.id}/${selectedChat.chat_id}`)}

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
                    ) : null
                }

            </section>
        </section >
    )
}