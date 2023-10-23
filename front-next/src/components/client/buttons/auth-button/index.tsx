'use client'
import { signOut, signIn } from "next-auth/react"

export function LogoutButton () {
    const handleClick = () => signOut({ callbackUrl: process.env.NEXT_PUBLIC_URL })
    return (
        <button className=" h-10 w-32 rounded-xl bg-activeColor text-textColor hover:bg-violet-800" onClick={handleClick} >
            Выйти
        </button>
    )
}

export function LoginButton () {
    const handleClick = () => signIn();
    return (
        <button className=" h-10 w-32 rounded-xl bg-violet-600 text-textColor hover:border-hoverColor hover:border-2 active:bg-hoverColor active:text-white" onClick={handleClick}>
        Sign In
    </button>
    )
}