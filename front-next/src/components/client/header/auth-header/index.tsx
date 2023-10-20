'use client'

import { Divider } from "@/components/styled/divider";
import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"

interface IHeader {
    className : string
}

export default function Header ({ className } : IHeader) {
    const {data: session} = useSession();
    return (
        <header className=" h-screen pt-5 bg-gradient-to-b from-slate-300 from-40% via-slate-100 flex flex-col justify-between ">
            <nav className="flex flex-col justify-evenly">
            <Link className=' text-3xl text-center' href={'/protected/home'}>HELPDESK</Link>
            <Divider/>
            <Link className={className === 'home' ? ' text-violet-600 text-center' : ' transition ease-in-out delay-150 hover:text-violet-600 text-center'} href={'/protected/home'}>Home</Link>
            <Link className={className === 'profile' ? 'text-violet-600 text-center' : ' transition ease-in-out delay-150 hover:text-violet-600 text-center'} href={'/protected/profile'}>Profile</Link>              
            </nav>
            <div className=" w-full flex flex-col items-center">
            {session && session.user ? 
                <div>
                    <p className=" text-center mb-5">Hello, {session.user.username}</p>
                    <button className=" h-10 w-48 rounded-xl bg-violet-600 text-white hover:bg-violet-800" onClick={() => {
                        signOut({
                            callbackUrl: `${process.env.NEXT_PUBLIC_URL}`
                        });
                        }}
                        >
                        Sign Out
                    </button>
                </div>
                    :
                <button className=" h-10 w-48 rounded-xl bg-violet-600 text-white hover:bg-violet-800" onClick={() => { signIn()}}>
                    Sign In
                </button>
            }
            <Divider/>
            <button className="mt-0">Hide</button>
            </div>
        </header>
    )
}