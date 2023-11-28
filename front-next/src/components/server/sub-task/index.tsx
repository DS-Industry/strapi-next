'use client'

import NavigationButton from "@/components/client/buttons/navigate-button";
import { PiPencilSimpleLineFill } from "react-icons/pi";
import { useState } from "react";

interface ISubTask {
    parentId: number,
    isNotEmpty: boolean,
    children: React.ReactNode
}

export default function SubTask ({ parentId, children, isNotEmpty }: ISubTask) {
    const [ dropdownOpen, setDropdownOpen ] = useState<boolean>(false);

    return (
        <div className=" w-full mt-10 overflow-auto">
            <div className=" flex flex-row justify-between w-full items-center bg-black py-2 px-3 rounded-md">
                <div className=" flex w-1/5 flex-col justify-start items-center">
                    <button type='button' id="dropdownActionButton" 
                    className="flex h-auto justify-between w-full items-baseline transition-all duration-300 text-white hover:bg-graydark rounded-md text-md px-2 py-1" 
                        onClick={() => {setDropdownOpen(!dropdownOpen)}}
                        >
                        Подзадачи
                        <svg className={`w-2.5 h-2.5 ml-2.5 transition-all duration-300 ${dropdownOpen && 'rotate-180'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                        </svg>
                    </button>
                </div>    
                <NavigationButton className=" text-bodydark2 hover:text-white hover:bg-graydark p-1 rounded-md transition-all duration-300" label={(
                    <div className=" w-auto flex items-center justify-between"><p className=" pr-2">Создать подзадачу</p><PiPencilSimpleLineFill /></div>
                )} endpoint={`/protected/tasks/create?parentTask=${parentId}`} />
            </div>
            <div id="dropdownAction" className={` ${!dropdownOpen ? ' hidden opacity-0': ' block opacity-100'} transition-all duration-300`}>
                { children }
            </div>
        </div>
    )
}