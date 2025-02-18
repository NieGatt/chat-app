import { RxAvatar } from "react-icons/rx";

export const PictureComponent = ({ url, style }: {
    url: string | null,
    style?: string
}) => {
    return (
        <div className="flex justify-center items-center text-white bg-transparent rounded-full">
            {
                !url ? (
                    <RxAvatar className={`${style} bg-transparent rounded-full`} />
                ) : (
                    <img src={url} alt="picture" className={`${style} rounded-full bg-transparent`} />
                )
            }
        </div>
    )
}