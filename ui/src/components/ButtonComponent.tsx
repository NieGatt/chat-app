import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { IButtonComponent } from "../interfaces/IButtonComponent"

export const ButtonComponent = (
    { loading, text, handleClick }: IButtonComponent
): React.ReactElement => {
    return (
        <button
            onClick={handleClick}
            className={`mt-2 rounded w-full h-8 bg-teal-900 text-center text-white hover:opacity-80 flex justify-center items-center ${loading ? "bg-teal-950 pointer-events-none" : ""}`}>
            {
                loading ? (
                    <AiOutlineLoading3Quarters className="bg-transparent animate-spin" />
                ) : text ? text : "CONFIRM"
            }
        </button>
    )
}