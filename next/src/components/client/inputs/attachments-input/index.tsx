'use client'

import { AttachmentsAttributes, StrapiData, StrapiResponseArray } from "@/types/types";
import axios from "axios"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { LuPaperclip } from "react-icons/lu"

interface IAttachmentsInput {
    handleChange?: any,
    taskId?: number,
    attachmentsArray: any,

}

export default function AttachmentsInput ({ handleChange, taskId, attachmentsArray } : IAttachmentsInput) {

    const { data: session } = useSession();
    const [ files, setFiles ] = useState<any>(null);

    const router = useRouter();
    const handleAttachmentChange = (event: ChangeEvent<HTMLInputElement>) => {
        if ( taskId && event.target.files ) {
            setFiles(event.target.files[0]);
        } else {
            handleChange(event);
        }
    }

    useEffect(() => {
        const handleUpdateTaskAsync = async () => {
            const formData = new FormData();
            formData.append(`files`, files, files.name);
            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/upload`, formData,
                {
                    headers : {
                        Authorization: `Bearer ${session?.user.jwt}`,
                    }
                });
                const imageId = response.data[0].id
                const prevAttacmentIdArray = attachmentsArray.length > 0 ? attachmentsArray.map((attachment : StrapiData<AttachmentsAttributes>) => attachment.id) : [];
                const updatedTask = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${taskId}`, {
                    data : {
                        attachments: [...prevAttacmentIdArray, imageId]
                    }
                },{
                    headers : {
                        Authorization: `Bearer ${session?.user.jwt}`,
                    }
                })
                router.refresh();
            } catch (error) {
                console.log(error);
            }
        }

        if (files) {
            handleUpdateTaskAsync()
        }

    }, [files]);

    return (
        <div className=" mt-5">
            <label 
                htmlFor="inputImage" 
                className=" text-sm flex items-center w-45 justify-evenly px-2 py-2 border-white text-opacity-50 transition-colors duration-150 rounded-md text-black hover:bg-bodydark1 hover:text-opacity-100">
                <input id="inputImage" className=" hidden" accept="image/*" name="attachments" type="file" onChange={handleAttachmentChange} />
                <LuPaperclip /> Прикрепить файлы            
            </label>
        </div>

    )
}
