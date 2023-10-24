'use client'
import { signOut, signIn } from "next-auth/react"

export function LogoutButton () {
    const handleClick = () => signOut({ callbackUrl: process.env.NEXT_PUBLIC_URL })
    return (
        <button className=" h-10 w-32 rounded-xl bg-activeColor text-textColor hover:bg-violet-800" onClick={handleClick} >
            Log out
        </button>
    )
}

export function LoginButton () {
    const handleClick = () => signIn();
    return (
        <button 
            className="inline-flex items-center justify-center rounded-full bg-primary py-2 px-8 text-center font-medium text-white hover:bg-opacity-90 lg:px-6 xl:px-8" 
            onClick={handleClick}>
            Sign In
        </button>
    )
}