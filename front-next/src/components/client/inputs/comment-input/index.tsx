'use client'

import { useEffect, useState } from "react";
import QuillEditor from "../../quill"
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import SingleComment from "../../single-comment";
import { dateToString } from "@/utils/util";

interface ICommentInput {
    taskId: number
}

interface IComment {
    text: string,
    createdUserBy: number,
    task: number,
}

interface IResComment {
    url: string,
    context: string,
    createdAt: Date,
    ownerName: string
}


export default function CommentInput ({ taskId }: ICommentInput) {
    const router = useRouter();
    const [ loading, setLoading ] = useState<boolean>(false);
    const { data : session } = useSession();
    const [resComment, setResComment] = useState<IResComment>({
        url: '',
        context: '',
        createdAt: new Date(),
        ownerName: ''
    })
    const [ comment, setComment ] = useState<IComment>({
        text: '',
        createdUserBy: 0,
        task: taskId
    });

    const handleChange = (context: string) => {
        setComment((prevComment : IComment) => {
            return {
                ...prevComment,
                text: context
            }
        })
    }

    const handleClick = () => {
        const createCommentAsync = async () => {
            try {
                setLoading(true);
                const data = {
                    ...comment,
                    createdUserBy: session?.user.id
                }
                setComment((prevComment: IComment) => {
                    return {
                        ...prevComment,
                        text: ''
                    }
                })
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/comments`,{
                    data,
                },
                {
                    headers: {
                        Authorization: `Bearer ${session?.user.jwt}`
                    }
                })
                router.refresh();
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        createCommentAsync();
    }
/* 
    useEffect(() => {
        const userCommentData = localStorage.getItem('userCommentData');
        if (userCommentData) {
            console.log(userCommentData);
            const [ url, context, createdAt, ownerName ] = userCommentData.split('|');
            console.log(createdAt);
            setResComment({
                url,
                context,
                createdAt: new Date(createdAt),
                ownerName
            })
        }
    }, []) */

    return (
        <div className=" mt-5">
            <QuillEditor handleChange={handleChange} label="Если нужно что-то уточнить, напишите комментарий" openEditorEx={true} loading={loading}/>
            <button 
                onClick={handleClick} 
                className={`${!comment.text ? ' invisible' : 'visible' } transition-all duration-300 w-auto flex justify-end`}>{
                loading ? (
                    <div className=" animate-pulse h-10 w-full bg-graydark rounded-md">
                    </div>
                ) : 'Отправить'}
            </button>
        </div>
    )
}