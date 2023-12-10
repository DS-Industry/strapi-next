'use client'

import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"

export default function Header () {
    const {data: session} = useSession();
    return (
        <nav className=" h-24 bg-slate-600 w-full flex justify-between items-center">
            <div className=" w-1/2 flex justify-evenly">
            <Link href={'/'}>Home</Link>
            <Link href={'/protected/profile'}>Profile</Link>                
            </div>
            {session && session.user ? 
                <div className=" flex items-baseline justify-evenly w-1/4">
                    <p>Hello, {session.user.username}</p>
                    <button className=" h-12 w-32 bg-cyan-500 rounded-xl" onClick={() => { signOut()}}>
                        Sign Out
                    </button>
                </div>

                    :
                <button className=" h-12 w-32 bg-cyan-500 rounded-xl mr-20" onClick={() => { signIn()}}>
                    Sign In
                </button>
            }
        </nav>
    )
}