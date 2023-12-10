'use client'

import axios from "axios"
import { useSession } from "next-auth/react"

interface ICreateButton {
    label: string,
}

export default function CreateButton ({ label } : ICreateButton) {

    return (
        <button type="submit" 
            className=" bg-primary w-35 transition-all duration-300 hover:w-40 text-white px-3 py-2 mt-10 rounded-md shadow-lg">
            {label}
        </button>
    )
}