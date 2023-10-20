'use client'

import { signIn } from "next-auth/react";
import Link from "next/link"

interface IGeneralHeader {
    className: string
}

export function GeneralHeader ({className} : IGeneralHeader) {
    return (
        <header className=" sticky top-0 header py-4 w-full px-5 bg-gradient-to-r from-slate-300 from-40% via-slate-100 flex justify-between items-center z-20">
            <nav className="flex w-1/3 justify-evenly items-center ">
                <Link className=' text-3xl text-center' href={'/'}>HELPDESK</Link>
                <Link className={className === 'landing' ? ' text-violet-600 text-center' : ' transition ease-in-out delay-150 hover:text-violet-600 text-center'} href={'/'}>Home</Link>             
            </nav>
            <div className=" w-1/6">
                <button className=" h-10 w-48 rounded-xl bg-violet-600 text-white hover:bg-violet-800" onClick={() => { signIn()}}>
                    Sign In
                </button>
            </div>
        </header>
    )
}