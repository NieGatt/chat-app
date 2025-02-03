import { SettingsComponent } from "../components/SettingsComponent"
import { ToolbarComponent } from "../components/ToolbarComponent"
import { useState } from "react"

export const Home = () => {
    const [index, setIndex] = useState<number>(2)

    const handleCodeIndex = (value: number) => {
        setIndex(value)
    }

    return (
        <section className="w-screen h-screen flex">
            <ToolbarComponent handleClick={handleCodeIndex} index={index} />
            {
                index === 2 ? (
                    <div></div>
                ) : index === 3 ? (
                    <div></div>

                ) : index === 4 ? (
                    <SettingsComponent />
                ) : null
            }
        </section>
    )
}