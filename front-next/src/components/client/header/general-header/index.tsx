import Link from "next/link"
import { LoginButton } from "../../buttons/auth-button";

interface IGeneralHeader {
    className: string
}

export function GeneralHeader ({className} : IGeneralHeader) {
    const activeStyle = 'text-accentColor text text-center';
    const hoverStyle = 'transition ease-in-out delay-150 hover:text-accentColor text-center';
    return (
        <header className=" sticky top-0 header py-4 w-full px-5 bg-gradient-to-r from-primaryColor to-secondaryColor flex justify-between items-center z-20 shadow-md">
            <nav className="flex w-1/3 justify-evenly items-center ">
                <Link className=' text-3xl text-center' href={'/'}>HELPDESK</Link>
                <Link className={className === 'landing' ? activeStyle : hoverStyle } href={'/'}>Home</Link>             
            </nav>
                <LoginButton />
        </header>
    )
}