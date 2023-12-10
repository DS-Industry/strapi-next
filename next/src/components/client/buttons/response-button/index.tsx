'use client'

import useLocalStorage from "@/hooks";
import { IoArrowUndo } from "react-icons/io5";

interface IResponseButton {
    commentOwnerAvatarUrl: string,
    commentContext: string,
    commentCreatedAt: Date,
    commentOwnerName: string
}

export default function ResponseButton ({commentOwnerAvatarUrl, commentContext, commentCreatedAt, commentOwnerName }: IResponseButton) {


    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        localStorage.setItem('userCommentData', event.currentTarget.value);
    }


    return (
        <div className=" w-fit">
            <button value={`${commentOwnerAvatarUrl}|${commentContext}|${commentCreatedAt}|${commentOwnerName}`} onClick={handleClick} className=" text-black-2 hover:bg-bodydark p-1 rounded-md transition-all duration-300">
                <IoArrowUndo />
            </button>
        </div>
    )
}