import { Divider } from "@/components/styled/divider";
import Image from "next/image";
import Link from "next/link";
import Hero from "./../../../../../public/hero_1.svg"
import { getServerSession } from "next-auth";
import HideButton from "../../buttons/hide-button";

interface IHeader {
    className : string
}

export default async function Header ({ className } : IHeader) {
    const session = await getServerSession();
    const activeStyle = 'text-accentColor text-center';
    const hoverStyle = 'transition ease-in-out hover:text-accentColor text-center';
    return (
        <header className=" h-screen pt-5 bg-gradient-to-b from-primaryColor from-40% to-secondaryColor flex flex-col justify-between ">
            <nav className="flex flex-col justify-evenly">
            <Link className=' text-3xl text-center' href={'/protected/home'}>HELPDESK</Link>
            <Divider/>
            <Link className={className === 'home' ? activeStyle : hoverStyle} href={'/protected/home'}>Home</Link>
            <Link className={className === 'ticketlist' ? activeStyle : hoverStyle} href={'/protected/ticketlist'}>Ticket List</Link>
            <Link className={className === 'todolist' ? activeStyle : hoverStyle} href={'/protected/todolist'}>Todo List</Link>
            <Link className={className === 'createticket' ? activeStyle : hoverStyle} href={'/protected/createticket'}>Ticket Creation</Link>
            <Link className={className === 'createtodo' ? activeStyle : hoverStyle} href={'/protected/createtodo'}>Todo Creation</Link>
            <Link className={className === 'instruction' ? activeStyle : hoverStyle} href={'/protected/instruction'}>Instructions</Link>      
            <Link className={className === 'createuser' ? activeStyle : hoverStyle} href={'/protected/instruction'}>User Creation</Link>      
            </nav>
            <div className=" w-full flex flex-col items-center">
                <Link className=" w-full flex items-center justify-evenly mb-2" href="/protected/profile">
                    <Image alt="avatar" src={session?.user.image ? session?.user.image : Hero} className=" w-16 h-16 shadow-2xl rounded-full"/>
                    <p className=" text-center ">Profile</p>
                </Link>
                <HideButton/>
            </div>
        </header>
    )
}