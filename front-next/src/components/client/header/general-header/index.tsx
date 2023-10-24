import Link from "next/link"
import { LoginButton } from "../../buttons/auth-button";
import { usePathname } from "next/navigation";

interface IGeneralHeader {
    className: string
}

export function GeneralHeader ({className} : IGeneralHeader) {
    return (
        <header className=" sticky top-0 header py-4 w-full px-5 bg- flex justify-between items-center z-20 shadow-md bg-black">
            <nav className="flex w-1/3 justify-evenly items-center ">
                <Link className=' text-3xl text-center text-bodydark2' href={'/'}>HELPDESK</Link>
                <Link className={` group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${className === "landing" && "bg-graydark dark:bg-meta-4"}`} href={'/'}>Home</Link>             
            </nav>
                <LoginButton />
        </header>
    )
}