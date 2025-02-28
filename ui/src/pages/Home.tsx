import { ChatComponent } from "../components/ChatComponent"
import { SettingsComponent } from "../components/SettingsComponent"
import { ToolbarComponent } from "../components/ToolbarComponent"
import { useState } from "react"

export const Home = () => {
    const initialIndex = sessionStorage.getItem("ui-index")
    const [index, setIndex] = useState<number>(initialIndex ? Number(initialIndex) : 2)

    const handleCodeIndex = (value: number) => {
        setIndex(value)
        sessionStorage.setItem("ui-index", String(value))
    }

    return (
        <section className="w-screen h-screen flex">
            <ToolbarComponent handleClick={handleCodeIndex} index={index} />
            {index === 1 ? <ChatComponent /> : <SettingsComponent />}
        </section>
    )
}