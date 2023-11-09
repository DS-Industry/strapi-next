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
            className="inline-flex items-center bg-primary text-white border-2 border-white hover:border-primary hover:border-2 font-medium rounded-lg text-sm px-3 py-2 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button" 
                onClick={() => {setDropdownOpen(!dropdownOpen)}}
                >
                Создать!
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
                        <Link href="tasks/create?type=appeal" className="block px-4 py-2 hover:bg-bodydark text-graydark dark:bg-bodydark2 dark:hover:text-white">Создать обращение</Link>
                    </li>
                    <li>
                        <Link href="tasks/create?type=task" className="block px-4 py-2 hover:bg-bodydark text-graydark dark:bg-bodydark2 dark:hover:text-white">Создать задачу</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}