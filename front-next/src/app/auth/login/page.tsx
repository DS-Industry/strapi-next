'use client'
import { LoginForm } from "@/components/client/forms/login";
import { getCsrfToken } from "next-auth/react"

export default function Login () {

    return (
        <div className=" h-screen w-screen bg-teal-950 flex justify-center items-center">
            <LoginForm/>
        </div>
    )
}