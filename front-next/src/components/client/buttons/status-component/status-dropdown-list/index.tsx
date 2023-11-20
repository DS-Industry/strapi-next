'use client'

import { useEffect, useRef, useState } from "react";

interface IStatusDropDownList {
    statusData: any,
    statuses: any,
    handleClickChange: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default function StatusDropDownList ({statusData, statuses, handleClickChange } : IStatusDropDownList) {

    const [ dropdownOpen, setDropdownOpen ] = useState<boolean>(false);
    const dropdown = useRef<any>(null);

    useEffect(() => {

    }, [statusData])


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

    return statuses && statuses.length > 0 ? (
        <div className=" w-full flex justify-evenly items-baseline min-h-1">
            <label className=" w-1/2 flex " htmlFor="priority">Статус</label>
            <div className=" flex w-1/2 flex-col justify-start items-center">
                <button type='button' id="dropdownActionButton" 
                className="flex group h-10 justify-between w-full items-baseline bg-black transition-all duration-300 text-white hover:bg-graydark rounded-md text-md px-3 py-2" 
                    onClick={() => {setDropdownOpen(!dropdownOpen)}}
                    >
                    { statusData.title }
                    <svg className={`w-2.5 h-2.5 ml-2.5 transition-all duration-300 opacity-0 group-hover:opacity-100 ${dropdownOpen && 'rotate-180'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                    </svg>
                </button>    
                <div id="dropdownAction"         
                ref={dropdown}
                onFocus={() => setDropdownOpen(true)}
                onBlur={() => setDropdownOpen(false)}  
                className={`z-30 absolute mt-11 ${!dropdownOpen ? ' hidden opacity-0' : 'opacity-100'} transition-opacity duration-300 bg-graydark divide-y divide-black rounded-md shadow w-44 `}>
                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200 " aria-labelledby="dropdownActionButton">
                    { statuses.map((element: any, index: number) => {
                            return(
                                <li key={index} className=" bg-graydark hover:bg-strokedark">
                                    <button 
                                        className=" w-full h-6 pl-1 text-left"
                                        type="button"
                                        onClick={handleClickChange}
                                        value={`${element.id}_${element.attributes.name}`}
                                        name='status'>
                                            {element.attributes.name}
                                    </button>
                                </li>)})}
                            </ul>
                        </div>
                    </div>
            </div>
    ) : (
        <div></div>
    )
}