'use client'

import { LuPaperclip } from "react-icons/lu"

interface IAttachmentsInput {
    handleChange: any
}

export default function AttachmentsInput ({ handleChange } : IAttachmentsInput) {

    return (
        <div className=" mt-5">
            <label 
                htmlFor="inputImage" 
                className=" text-sm flex items-center w-45 justify-evenly px-2 py-2 border-white text-opacity-50 transition-colors duration-150 rounded-md text-black hover:bg-bodydark1 hover:text-opacity-100">
                <input id="inputImage" className=" hidden" accept="image/*" name="attachments" type="file" onChange={handleChange} />
                <LuPaperclip /> Прикрепить файлы            
            </label>
        </div>

    )
}
