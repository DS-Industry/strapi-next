import { CommentAttributes, StrapiData } from "@/types/types"
import SingleComment from "@/components/client/single-comment"
/* import ResponseButton from "@/components/client/buttons/response-button" */
import DeleteButton from "@/components/client/buttons/delete-button"
import { getServerSession } from "next-auth"
import { authOptions } from "@/config/nextauth/auth"
import NavigationButton from "@/components/client/buttons/navigate-button"
import { RiExternalLinkLine } from "react-icons/ri"

interface ICommentList {
    comments: StrapiData<CommentAttributes>[],
    homePage?: boolean
}

export default async function CommentList ({comments, homePage=false} : ICommentList) {
    const session = await getServerSession(authOptions);
    return (    
        <div className="">
           {comments.map((comment: StrapiData<CommentAttributes>, index: number) => {
                return (
                    <div key={index} className="group flex w-full items-center justify-between mt-2 hover:bg-bodydark1  transition-all duration-300 p-2 rounded-md">
                        <SingleComment url={comment.attributes.createdUserBy.data.attributes.avatar.data.attributes.url} name={comment.attributes.createdUserBy.data.attributes.name} createdAt={comment.attributes.createdAt} text={comment.attributes.text} responseUser={{url: ''}} />
                        <div>
                            {/* <ResponseButton 
                                    commentOwnerAvatarUrl={comment.attributes.createdUserBy.data.attributes.avatar.data.attributes.formats.large.url} 
                                    commentContext={comment.attributes.text}
                                    commentCreatedAt={comment.attributes.createdAt}
                                    commentOwnerName={comment.attributes.createdUserBy.data.attributes.name}
                                    />
                            */}
                            {
                                !homePage ? 
                                    session && (Number(session.user.id) === comment.attributes.createdUserBy.data.id) ? 
                                    (<DeleteButton deletedId={comment.id}/> ) :
                                    '' :
                                    (<NavigationButton endpoint={`/protected/tasks/${comment.attributes.task.data.id}`} label={<RiExternalLinkLine />} className="bg-primary border-2 hover:border-primary border-white  text-white font-medium rounded-lg text-sm px-4 py-1.5" />)
                            }
                        </div>                     
                    </div>
                )})
            }
        </div>
    )
}