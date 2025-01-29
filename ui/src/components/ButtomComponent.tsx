import { AiOutlineLoading3Quarters } from "react-icons/ai"

export const ButtomComponent = ({ 
    loading,
    text,
    handleClick
}: { 
    loading: boolean,
    text?: string,
    handleClick?: React.MouseEventHandler
}) => {
    return (
        <button 
        onClick={handleClick}
        className={`mt-2 rounded w-full h-8 bg-zinc-500 text-center text-white hover:bg-zinc-400 flex justify-center items-center ${loading ? "bg-zinc-400 pointer-events-none" : ""}`}>
            {
                loading ? (
                    <AiOutlineLoading3Quarters className="animate-spin" />
                ) : text? text : "CONFIRM"
            }
        </button>
    )
}