'use client'

import { AttachmentsAttributes, StrapiData, StrapiResponseArray } from "@/types/types";
import Image from "next/image";
import { useState } from "react";
import { MdClose, MdOutlineFileDownload, MdLink, MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { BsChevronExpand } from "react-icons/bs";
import CustomImage from "./image";
import IconButton from "../buttons/icon-button";

interface IAttachment {
    attachments: StrapiResponseArray<AttachmentsAttributes>
}

export default function Attachment ({ attachments } : IAttachment) {
    const [ isOpen, setIsOpen ] = useState<boolean>(false);
    const [ imageData, setImageData ] = useState<{
        url: string,
        width: number,
        height: number,
        alt: string,
        title: string,
        attachmentIndex: number
    }>({
        url: '',
        width: 0,
        height: 0,
        alt: '',
        title: '',
        attachmentIndex: -1
    });

    const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
        setIsOpen(true);
        const regexp = /url=([^&]+)/
        const matchResult = event.currentTarget.src.match(regexp);
        if (matchResult) {
            const url = matchResult[1].replace(/%3A/g, ':').replace(/%2F/g, '/');
            setImageData({
                url,
                width: event.currentTarget.width *100,
                height: event.currentTarget.height,
                alt: event.currentTarget.alt,
                title: event.currentTarget.title.replace('large_', ''),
                attachmentIndex: Number(event.currentTarget.alt.replace('attachment ', ''))
            });
        }

    }  

    const handleClose = () => {
        setIsOpen(false);
    }

    return (
        <div className=" mt-5 flex items-center justify-start">
            < CustomImage handleClick={handleClick} attachments={attachments} attachmentIndex={imageData.attachmentIndex}/>
          <div className={`${!isOpen && 'hidden'} z-999 fixed w-screen h-screen flex top-0 left-0 right-0 bottom-0 justify-center items-center bg-black-2 bg-opacity-70`} >
                <div className=" w-11/12 h-5/6 flex flex-col justify-center items-start bg-boxdark-2 rounded-md ">
                    <div className="flex flex-row w-full h-full">
                        <div className=" mt-2 ml-2 w-10 h-1/5 flex flex-col justify-evenly">
                            <IconButton iconElement={<BsChevronExpand />} rotate=" rotate-45" />
                            <IconButton iconElement={<MdOutlineFileDownload />} />
                            <IconButton iconElement={<MdLink />} />
                        </div>
                        <div className="w-full h-full flex justify-between items-center">
                            <button className=" rounded-full px-1 py-1 text-4xl flex justify-center items-center transition-all duration-300 flex-row text-white hover:bg-boxdark hover:text-5xl" ><MdOutlineKeyboardArrowLeft /></button>
                            <div className="w-full h-full flex justify-center items-center">
                                <Image
                                    src={imageData.url} 
                                    width={800} 
                                    height={800} 
                                    alt={`${imageData.alt}`}/>
                            </div> 
                            <button className=" rounded-full px-1 py-1 text-4xl flex justify-center items-center transition-all duration-300 flex-row text-white hover:bg-boxdark hover:text-5xl"><MdOutlineKeyboardArrowRight /></button>
                        </div>
                        <div className=" w-10 mt-2 mr-2">
                            <button className=" p-1 text-2xl text-white hover:text-3xl transition-all duration-300 rounded-full hover:bg-boxdark" onClick={handleClose}><MdClose /></button>
                        </div>
                    </div>
                    <div>
                        <p className=" ">{imageData.title}</p>
                        <div className=" flex flex-row flex-start h-full min-w-fit p-5">
                            <CustomImage attachments={attachments} handleClick={handleClick} attachmentIndex={imageData.attachmentIndex} isOpenAttachment={true} />
                        </div>
                    </div>
                </div>    
            </div> 
        </div>
    )
}