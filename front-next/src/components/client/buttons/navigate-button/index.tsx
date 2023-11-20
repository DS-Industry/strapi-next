'use client'

import { useRouter } from "next/navigation"

interface INavigationButton {
    endpoint: string,
    label: string | any,
    back?: boolean
}

export default function NavigationButton ({endpoint, label, back = false} : INavigationButton ) {
    const navigateStyle = " bg-primary border-2 hover:border-primary border-white  text-white font-medium rounded-lg text-sm px-4 py-1.5 "
    const backStyle = "ml-3 transition-all duration-300 hover:bg-bodydark1 hover:opacity-80 opacity-60 text-graydark px-3 py-2 rounded-md"
    const router = useRouter();

    const handleClick = () => {
        router.push(endpoint);
    }

    return (
        <button onClick={handleClick} className={back ? backStyle : navigateStyle}>
            {label}
        </button>
    )
}