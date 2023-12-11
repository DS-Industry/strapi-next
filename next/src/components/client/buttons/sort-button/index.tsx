'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface ISortButton {
    name: string,
    title: string,
    endpoint: string,
}



export default function SortButton ({name, title, endpoint} : ISortButton) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [type, setType] = useState<string>('asc');

    const handleClick = () => {
        const params = new URLSearchParams(Array.from(searchParams.entries()));
        if (type === 'asc') {
            params.set('sortType',type);
            setType('desc');
        } else if (type === 'desc') {
            params.set('sortType',type);
            setType('init');
        } else {
            params.set('sortType',type);
            setType('asc')
        }
        params.set('name',name);
        router.push(`/protected/${endpoint}?${params}`); 
    }


    return (
        <div className=" flex flex-row justify-center items-center">
            <label htmlFor="sort-button">{title}</label>
            <button id="sort-button" onClick={handleClick}>
                <svg className="w-3 h-3 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                </svg>            
            </button>            
        </div>

    )
}