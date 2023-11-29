'use client'

import { StatusAttributes, StrapiData, StrapiResponseArray, StrapiResponseObject, TaskAttributes } from "@/types/types";
import axios, { AxiosResponse } from "axios";
import { useSession } from "next-auth/react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface IStatusDropDownList {
    taskId: number,
    taskStatus: StrapiData<StatusAttributes>,
}

export default function StatusDropDownList ({ taskStatus, taskId } : IStatusDropDownList) {

    const [ dropdownOpen, setDropdownOpen ] = useState<boolean>(false);
    const dropdown = useRef<any>(null);

    const { data : session } = useSession();
    const router = useRouter();
    const pathName = usePathname();
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ statusArr, setStatusArr ] = useState<any>();
    const [ statusData, setStatusData ] = useState<{
        id: number,
        name: string,
        title: string
    }>({
        id: taskStatus.id,
        name: taskStatus.attributes.name,
        title: taskStatus.attributes.title
    });

    const handleClickChange = (event : React.MouseEvent<HTMLButtonElement>) => {
        const updateTaskStatusAsync = async () => {
            try {
                setIsLoading(true);
                console.log('this event target value in handle click', event.currentTarget.value);
                let id = Number(event.currentTarget.value) === 10 ? 3 : Number(event.currentTarget.value);
                const {data : { data : task }}: AxiosResponse<StrapiResponseObject<TaskAttributes>> = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${taskId}?populate=status`, {
                    data : {
                        status: id
                    }
                },{
                    headers: {
                        Authorization : `Bearer ${session?.user.jwt}`
                    }
                });
                setStatusData({
                    id: task.attributes.status.data.id,
                    name: task.attributes.status.data.attributes.name,
                    title: task.attributes.status.data.attributes.title
                });

                router.push(`${pathName}?statusId=${id}`);
                setIsLoading(false);
            } catch (e) {
                console.log(e);
                

            }
        }
        updateTaskStatusAsync();
    }

    useEffect(() => {
        const getDataStatusAsync = async () => {
            setIsLoading(true);
            try {
                const { data : { data : statuses }} : AxiosResponse<StrapiResponseArray<StatusAttributes>> = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/statuses?filters[$and][0][name][$ne]=Created&filters[$and][1][name][$ne]=Deleted&filters[$and][2][id][$gt]=${statusData.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${session?.user.jwt}`
                    }
                });
                setStatusArr([...statuses]);
                setIsLoading(false);
            } catch (e) {
                console.log(e);
                setIsLoading(false);
            }
        }
        if (session?.user.jwt && statusData.id) getDataStatusAsync();
    },[statusData, session?.user.jwt])


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

    return !isLoading && statusArr && statusArr.length > 0 ? (
            <div className=" flex w-4/5 flex-col justify-start items-center">
                <button type='button' id="dropdownActionButton" 
                className="flex group h-10 justify-between w-full items-center bg-black transition-all duration-300 text-white hover:bg-graydark rounded-md text-md px-2 py-2" 
                    onClick={() => {
                        setDropdownOpen(!dropdownOpen);
                    }}
                    >
                        <p className=" truncate">
                            {   
                                !isLoading && statusData.title
                            }
                        </p>
                    <svg className={`w-5.5 h-5.5 ml-2.5 transition-all duration-300 opacity-0 group-hover:opacity-100 ${dropdownOpen && 'rotate-180'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                    </svg>
                </button>    
                <div id="dropdownAction"         
                ref={dropdown}
                onFocus={() => setDropdownOpen(true)}
                onBlur={() => setDropdownOpen(false)}  
                className={`z-30 absolute mt-11 right-21 ${!dropdownOpen ? ' hidden opacity-0' : 'opacity-100'} transition-opacity duration-300 bg-graydark divide-y divide-black rounded-md shadow w-70 `}>
                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200 exclude-list-styling " aria-labelledby="dropdownActionButton">
                    { statusArr.map((status: StrapiData<StatusAttributes>, index: number) => {
                        return (
                            <li key={index} className={` bg-graydark ${ statusData.id < 4 ? ' last:hidden' : '' }  hover:bg-strokedark`}>
                                <button 
                                    className=" w-full h-6 pl-1 text-left text-md"
                                    onClick={handleClickChange}
                                    value={`${status.id}`}
                                    name='status'>
                                        {status.attributes.title}
                                </button>
                            </li>
                        )})}
                    </ul>
                </div>
            </div>
    ) : (
        <div className=" flex w-4/5 flex-col justify-start items-center">
            <div className="flex animate-pulse group h-10 justify-between w-full items-baseline bg-graydark rounded-md"></div>
        </div>
    )
}