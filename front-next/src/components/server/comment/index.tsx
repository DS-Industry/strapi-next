
import CommentInput from "@/components/client/inputs/comment-input";
import { authOptions } from "@/config/nextauth/auth";
import { CommentAttributes, StrapiResponseArray } from "@/types/types";
import axios, { AxiosResponse } from "axios";
import { getServerSession } from "next-auth";
import CommentList from "./comment-list";

interface IComment {
    taskId: number,
}


export default async function CommentComponent ({taskId} : IComment ) {
    const session = await getServerSession(authOptions);
    const { data : { data: comments } } : AxiosResponse<StrapiResponseArray<CommentAttributes>> = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/comments?populate[createdUserBy][populate][0]=avatar&filters[task][id][$eq]=${taskId}&sort[0]=createdAt:asc`,
    {
        headers: {
            Authorization: `Bearer ${session?.user.jwt}`
        }
    });

    console.log(comments);


    return (
        <div className=" min-h-20 w-full rounded-md ">
            <CommentList comments={comments}/>
            <CommentInput taskId={taskId}/>
        </div>
    )
}