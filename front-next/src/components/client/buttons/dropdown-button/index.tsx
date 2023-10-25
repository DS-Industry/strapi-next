'use client'

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function DropdownButton () {
    const [ dropdownOpen, setDropdownOpen ] = useState<boolean>(false);
    const dropdown = useRef<any>(null);

    useEffect(() => {
        const clickHandler = ({ target }: MouseEvent) => {
          if (!dropdown.current) return;
          if (
            !dropdownOpen ||
            dropdown.current.contains(target)
          )
            return;
          setDropdownOpen(false);
        };
        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
      });
    
    return (
        <div>
            <button id="dropdownActionButton" 
            className="inline-flex items-center bg-white text-graydark border border-bodydark2 hover:bg-stroke font-medium rounded-lg text-sm px-3 py-2 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button" 
                onClick={() => {setDropdownOpen(!dropdownOpen)}}
                >
                Action
                <svg className={`w-2.5 h-2.5 ml-2.5 ${dropdownOpen && 'rotate-180'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                </svg>
            </button>
            <div id="dropdownAction"         
                ref={dropdown}
                onFocus={() => setDropdownOpen(true)}
                onBlur={() => setDropdownOpen(false)}  
                className={`z-10 absolute pt-3 ${!dropdownOpen && 'hidden'} bg-white divide-y divide-black rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}>
                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownActionButton">
                    <li>
                        <Link href="#" className="block px-4 py-2 hover:bg-bodydark text-graydark dark:bg-bodydark2 dark:hover:text-white">Reward</Link>
                    </li>
                    <li>
                        <Link href="#" className="block px-4 py-2 hover:bg-bodydark1 dark:hover:bg-gray-600 dark:hover:text-white">Promote</Link>
                    </li>
                    <li>
                        <Link href="#" className="block px-4 py-2 hover:bg-bodydark1 dark:hover:bg-gray-600 dark:hover:text-white">Activate account</Link>
                    </li>
                </ul>
                <div className="py-1">
                    <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-bodydark1 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete User</Link>
                </div>
            </div>
        </div>
    )
}