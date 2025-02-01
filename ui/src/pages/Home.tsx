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
                ) : null
            }
        </section>
    )
}