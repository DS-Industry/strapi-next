import { AttachmentsAttributes, StrapiData, StrapiResponseArray } from "@/types/types";
import Image from "next/image";

interface ICustomImage {
    attachments: StrapiResponseArray<AttachmentsAttributes>,
    handleClick: (event: React.MouseEvent<HTMLImageElement>) => void,
    attachmentIndex: number,
    isOpenAttachment?: boolean
}

export default function CustomImage ({ attachments, handleClick, attachmentIndex, isOpenAttachment=false }: ICustomImage) {
    return (
        <>
            { 
                attachments.data.map((attachment: StrapiData<AttachmentsAttributes>, index: number) => {
                    return (
                        <div 
                            key={index}   
                            className={` w-auto ${isOpenAttachment && 'first:ml-0 ml-6'} h-17 border-2 border-body m-1 p-1 transition-opacity duration-300 hover:opacity-90 flex items-center justify-center rounded-md ${isOpenAttachment && attachmentIndex === attachment.id && ' border-primary'}`} >
                            <Image
                                className={`max-h-15 w-auto`}
                                src={`${process.env.NEXT_PUBLIC_API_URL}${attachment.attributes.formats.large.url}`} 
                                width={attachment.attributes.formats.large.width} 
                                height={attachment.attributes.formats.large.height} 
                                title={`${attachment.attributes.formats.large.url.replace('/uploads/', '')}`}
                                onClick={handleClick} 
                                alt={`attachment ${attachment.id}`}
                                />
                        </div>
                    )
                })
            }
        </>
    )
}