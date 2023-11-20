'use client'

import { AttachmentsAttributes, StrapiData, StrapiResponseArray } from "@/types/types";
import Image from "next/image";
import { useState } from "react";
import { MdClose } from "react-icons/md"

interface IAttachment {
    attachments: StrapiResponseArray<AttachmentsAttributes>
}

export default function Attachment ({ attachments } : IAttachment) {
    const [ isOpen, setIsOpen ] = useState<boolean>(false);
    const [ imageData, setImageData ] = useState<{
        url: string,
        width: number,
        height: number,
        alt: string
    }>({
        url: '',
        width: 0,
        height: 0,
        alt: ''
    });

    const handleClick = (event: any) => {
        setIsOpen(true);
        const regexp = /url=([^&]+)/
        const url = event.target.src.match(regexp)[1].replace(/%3A/g, ':').replace(/%2F/g, '/');
        setImageData({
            url,
            width: event.target.width *100,
            height: event.target.height,
            alt: event.target.alt
        });
    }  

    const handleClose = () => {
        setIsOpen(false);
    }

    return (
        <div className=" mt-5 flex items-center justify-start">
        { attachments.data.map((attachment: StrapiData<AttachmentsAttributes>, index: number) => {
                return (
                    <div 
                        key={index}   
                        className=" w-1/4 h-30 border-2 border-body m-1 p-1 transition-opacity duration-300 hover:opacity-90 flex items-center justify-center rounded-md" >
                        <Image
                            key={index}
                            src={`${process.env.NEXT_PUBLIC_API_URL}${attachment.attributes.formats.large.url}`} 
                            width={attachment.attributes.formats.large.width} 
                            height={attachment.attributes.formats.large.height} 
                            title={`${attachment.attributes.formats.large.url.replace('/uploads/', '')}`}
                            onClick={handleClick} 
                            alt={`attachemnt ${index}`}
                            />
                    </div>
                )
            })
        }
          <div className={`${!isOpen && 'hidden'} z-999 absolute w-screen h-screen flex top-0 left-0 justify-center items-center bg-black bg-opacity-90`} >
                <div className=" w-2/3 h-2/3 flex flex-row">
                    <Image
                        src={imageData.url} 
                        width={800} 
                        height={800} 
                        alt={`${imageData.alt}`}/>
                    <div>
                    <button className=" pl-2 text-5xl text-white" onClick={handleClose}><MdClose /></button>   
                    </div>
                     
                </div>
                
            </div> 
    </div>
    )
}