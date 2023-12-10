import parse from 'html-react-parser'
import { dateToString } from "@/utils/util";
import CustomAvatarImage from "../image";

interface ISingleComment {
    url: string,
    name: string,
    createdAt: Date,
    text: any,
    responseUser?: any
}


export default function SingleComment ({url, name, createdAt, text, responseUser} : ISingleComment) {
    return (
        <div className=" flex flex-row justify-evenly items-start "> {
            url ? <CustomAvatarImage width={100} src={url} /> : name
        }
        <div className=" ml-5 flex flex-col justify-center items-start">
            <div>
                <div className=" text-md text-body flex flex-row ">
                    <p>{name} </p>
                    <p className=" mx-3">×</p>
{/*                     {
                        responseUser.url && (
                            <CustomAvatarImage width={100} src={`${process.env.NEXT_PUBLIC_API_URL}${responseUser.url}`}/>
                        )
                    } */}
                    <p>{dateToString(createdAt)}</p>    
                </div> 
            </div>
            <div className=" text-black-2">
                {parse(text)}   
            </div>
        </div>
    </div> 
    )
}