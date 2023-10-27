'use client'

import { useRouter } from "next/navigation"

interface INavigationButton {
    endpoint: string,
    label: string
}

export default function NavigationButton ({endpoint, label} : INavigationButton ) {

    const router = useRouter();

    const handleClick = () => {
        router.push(endpoint);
    }

    return (
        <button onClick={handleClick} className=" bg-primary border-2 hover:border-black-2 border-primary  text-white font-medium rounded-lg text-sm px-4 py-1.5 ">
            {label}
        </button>
    )
}