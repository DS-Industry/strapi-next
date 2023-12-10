'use client'

import { AttachmentsAttributes, StrapiResponseArray } from "@/types/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdClose, MdOutlineFileDownload, MdLink, MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { BsChevronExpand } from "react-icons/bs";
import CustomImage from "./image";
import IconButton from "../buttons/icon-button";
import axios from "axios";
import { useSession } from "next-auth/react";

interface IAttachment {
    attachments: StrapiResponseArray<AttachmentsAttributes>
}

export default function Attachment ({ attachments } : IAttachment) {
    const { data : session } = useSession();
    const [ isOpen, setIsOpen ] = useState<boolean>(false);
    const [ isCopied, setIsCopied ] = useState<boolean>(false);
    const [ isDisabled, setIsDisabled ] = useState<string>('middle');
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
                title: event.currentTarget.title.replace('thumbnail_', ''),
                attachmentIndex: Number(event.currentTarget.alt.replace('attachment ', ''))
            });
        }

    }  

    const handleCopyClick = () => {
        navigator.clipboard.writeText(imageData.url);
        setIsCopied((prevState) => !prevState);
        setTimeout(() => {
            setIsCopied(false);
        }, 3000);
    }

    const handleDownloadingImageClick = () => {
        const downloadImageAsync = async () => {
            try {
                await axios.get(imageData.url, {
                   responseType: 'arraybuffer',
                   headers: {
                    'Authorization': `Bearer ${session?.user.jwt}`,
                    'Content-Type': 'application/json',
                    'Accept' : 'image/*'
                   }
                }).then(response => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    const contentDisposition = response.headers['content-disposition'];
                    const filename = contentDisposition ? contentDisposition.split('filename=')[1] : 'image.jpg';
                    link.setAttribute('download', imageData.title);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    })
            } catch (error) {
                console.log(error);
            }
        }

        downloadImageAsync();
    }

    const handleOpenFullScreenSizeClick = () => {
        window.open(imageData.url,'Image','width=largeImage.style.width,height=largeImage.style.height,resizable=1');
    }

    const handleChangeImageClick = (event : React.MouseEvent<HTMLButtonElement>) => {
        const stepFrontOrBack = event.currentTarget.name === 'next' ? 1 : -1;
        const currentIndex = attachments.data.findIndex((attachment) => attachment.id === imageData.attachmentIndex);
            setImageData({
                url: attachments.data[currentIndex + stepFrontOrBack].attributes.url,
                width: attachments.data[currentIndex + stepFrontOrBack].attributes.width,
                height: attachments.data[currentIndex + stepFrontOrBack].attributes.height,
                alt: `attachment ${attachments.data[currentIndex + stepFrontOrBack].id}`,
                title: attachments.data[currentIndex + stepFrontOrBack].attributes.name,
                attachmentIndex: attachments.data[currentIndex + stepFrontOrBack].id
            })
    }

    useEffect(() => {
        const lastIndex = attachments.data[attachments.data.length - 1].id;
        const firstIndex = attachments.data[0].id;
        if (lastIndex === firstIndex) {
            setIsDisabled('prev_next')
        } else if (imageData.attachmentIndex === lastIndex) {
            setIsDisabled('next');
        } else if (imageData.attachmentIndex === firstIndex)  {
            setIsDisabled('prev');
        } else {
            setIsDisabled('');
        }
    }, [imageData])

    const handleClose = () => {
        setIsOpen(false);
    }

    return (
        <div className=" mt-5 flex items-center justify-start">
            < CustomImage handleClick={handleClick} attachments={attachments} attachmentIndex={imageData.attachmentIndex}/>
          <div className={`${!isOpen && 'hidden'} z-999 fixed w-screen h-screen flex top-0 left-0 right-0 bottom-0 justify-center items-center bg-black-2 bg-opacity-70`} >
                <div className=" w-11/12 h-5/6 flex flex-col justify-center items-start bg-boxdark-2 rounded-md relative translate-x-0 translate-y-0 ">
                    <div className="flex flex-row w-full h-full relative translate-x-0 translate-y-0">
                        <div className=" mt-2 ml-2 w-12 h-1/2 flex flex-col justify-between">
                            <div className=" h-1/3 w-12">
                                <IconButton iconElement={<BsChevronExpand />} rotate=" rotate-45" handleClick={handleOpenFullScreenSizeClick} />
                                <IconButton iconElement={<MdOutlineFileDownload />} handleClick={handleDownloadingImageClick} />
                                <IconButton iconElement={<MdLink />} handleClick={handleCopyClick} />
                                <p className={` ${isCopied ? 'absolute left-3  z-99999 visible mt-2 transition-all duration-300 rounded-md p-1 bg-black-2 text-white' : 'invisible'}`}>Ссылка скопирована!</p>
                            </div>
                            <IconButton iconElement={<MdOutlineKeyboardArrowLeft />} isDisabled={isDisabled} handleClick={handleChangeImageClick} name="prev"/>
                        </div>
                        <div className="w-full h-full flex justify-between items-center">
                            <div className="w-full h-full px-2 flex justify-center items-center">
                                { imageData.url &&
                                <Image
                                    className=""
                                    src={imageData.url} 
                                    width={600} 
                                    height={600} 
                                    alt={`${imageData.alt}`}/>}
                            </div> 
                        </div>
                        <div className=" w-11 mt-2 mr-2 h-1/2 flex flex-col justify-between">
                            <IconButton iconElement={<MdClose />} handleClick={handleClose}/>
                            <IconButton iconElement={<MdOutlineKeyboardArrowRight />} isDisabled={isDisabled} handleClick={handleChangeImageClick} name="next"/>
                        </div>
                    </div>
                    <div>
                        <p className=" ml-5 ">{imageData.title}</p>
                        <div className=" flex flex-row flex-start h-full min-w-fit p-3">
                            <CustomImage attachments={attachments} handleClick={handleClick} attachmentIndex={imageData.attachmentIndex} isOpenAttachment={true} />
                        </div>
                    </div>
                </div>    
            </div> 
        </div>
    )
}