'use client'

import axios from "axios"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";

interface IDeleteButton {
    deletedId: number,
}

export default function DeleteButton ({deletedId}: IDeleteButton) {
    const { data: session } = useSession();
    const router = useRouter();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const deleteCommentAsync = async (deletedId: string) => {
            try {
                const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/comments/${deletedId}`,{
                    headers: {
                        Authorization: `Bearer ${session?.user.jwt}`
                    }
                });
                router.refresh();
            } catch (error) {
                console.log(error)
            }
        }
        deleteCommentAsync(event.currentTarget.value)
    }


    return (
        <div className="h-full flex justify-center">
            <button value={deletedId} onClick={handleClick} className=" text-danger invisible group-hover:visible ">
                Удалить
            </button>
        </div>
    )
}