'use client'

import { debounce } from "lodash";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useCallback, useEffect } from "react";

export default function SearchInput () {
    
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const handleChange = useCallback(debounce(
        ({ target : { value } } : ChangeEvent<HTMLInputElement>) => {
                const params = new URLSearchParams(searchParams);
                if(value.length) params.set('search', value);
                router.push(`${pathName}?${params}`);
        }, 500), [])

    useEffect(() => {
        return () => {
            handleChange.cancel();
        }
    },[handleChange])

    return (
        <div className="flex items-center">
            <div className="relative left-7 flex items-center pl-3">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input type="text" id="table-search-users" className="block p-2 pl-10 text-sm text-black border border-bodydark2 rounded-lg w-80 bg-whiter focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Поиск по названию" onChange={handleChange} /> 
        </div>
    )
}