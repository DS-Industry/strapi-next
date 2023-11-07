'use client'

import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface IAttachmentsInput {
    handleChange: any
}

export default function AttachmentsInput ({ handleChange } : IAttachmentsInput) {

    return (
        <div className=" mt-5">
            <label 
                htmlFor="inputImage" 
                className=" text-sm px-2 py-2 border-2 border-white transition-colors duration-150 rounded-md text-black hover:bg-bodydark1 hover:border-bodydark1 ">
                <input id="inputImage" className=" hidden" accept="image/*" name="attachments" type="file" onChange={handleChange} />
                Add attachments            
            </label>
        </div>

    )
}
