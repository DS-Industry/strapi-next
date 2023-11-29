'use client'

import { useEffect, useRef, useState } from "react";

interface IDropdownList {
    label: string,
    dataArr: any[],
    handleChange: any,
    name: string,
    taskId?: string,
    taskData: any
}

export default function DropdownList ({ label, dataArr, name, handleChange, taskId, taskData } : IDropdownList) {
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

    const handleClickChange = (event : any) => {        
        handleChange(event);
        setDropdownOpen(false);
    }
    
    return (
        <div className=" w-full flex justify-evenly items-baseline min-h-1">
            <label className=" w-1/2 flex " htmlFor="priority">{label}</label>
            <div className=" flex w-1/2 flex-col justify-start items-center">
                <button type='button' id="dropdownActionButton" 
                className="flex group h-10 justify-between w-full items-baseline bg-black transition-all duration-300 text-white hover:bg-graydark rounded-md text-md px-3 py-2" 
                    onClick={() => {setDropdownOpen(!dropdownOpen)}}
                    >
                    {!taskData[name] || taskData[name].length < 1 ? 
                        `-` :
                        name === 'priority' ?
                        taskData[name] : 
                        name === 'asiignees' ? 
                        dataArr.find((element) => `${element.id}_${element.username}` === taskData[name][0]).username : 
                        name === 'carWashes' ?
                        dataArr.find((element) => `${element.id}_${element.attributes.name}` === taskData[name][0]).attributes.slug : 
                        dataArr.find((element) => element.id === taskData[name]).attributes.name}
                    <svg className={`w-2.5 h-2.5 ml-2.5 transition-all duration-300 opacity-0 group-hover:opacity-100 ${dropdownOpen && 'rotate-180'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                    </svg>
                </button>    
                <div id="dropdownAction"         
                ref={dropdown}
                onFocus={() => setDropdownOpen(true)}
                onBlur={() => setDropdownOpen(false)}  
                className={`z-30 absolute mt-11 ${!dropdownOpen ? ' hidden opacity-0' : 'opacity-100'} transition-opacity duration-300 bg-graydark divide-y divide-black rounded-md shadow w-44 `}>
                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200 exclude-list-styling" aria-labelledby="dropdownActionButton">
                    { 
                        dataArr.map((element, index: number) => {
                            return (
                                <li key={index} className=" bg-graydark hover:bg-strokedark">
                                    <button 
                                        className=" w-full h-6 pl-1 text-left"
                                        type="button"
                                        onClick={handleClickChange}
                                        value={name === 'priority' ? element.value : `${element.id}_${name !== 'asiignees' ? element.attributes.name : element.username}`}
                                        name={name}>
                                        { name === 'asiignees' ? element.username : name === 'priority' ? element.value : element.attributes.name}
                                    </button>
                                </li>
                            )})
                    }
                </ul>
            </div>            
            </div>
        </div>
    )
}