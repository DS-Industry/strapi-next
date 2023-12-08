'use client'

import { StatusAttributes, StrapiData, StrapiResponseArray, StrapiResponseObject, TaskAttributes } from "@/types/types"
import axios, { AxiosResponse } from "axios";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";

interface IStatusButton {
    taskId: number,
    taskStatus: any
}

export default function StatusButton ({taskStatus, taskId} : IStatusButton) {
    const { data : session } = useSession();
    const router = useRouter();
    const pathName = usePathname();
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ statusArr, setStatusArr ] = useState<any>();
    const statusId = useSearchParams().get('statusId');
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
                router.refresh();
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
    },[statusData, session?.user.jwt, statusId])


    return !isLoading && statusArr && statusArr.length > 0 ? (
        <div className="flex w-2/3 justify-between ml-2">
            {statusArr.map((status: StrapiData<StatusAttributes>, index: number) => {
                return status.id > Number(statusId) && (
                    <button 
                        className=" bg-primary text-white px-3 py-1 border-2 border-white rounded-md transition-opacity duration-300 hover:border-primary" 
                        key={index} 
                        value={`${status.id}`}
                        onClick={handleClickChange}>
                        {status.attributes.title}
                    </button>
                )
            })}
        </div>
    ) : (
        <div className=" w-1/5 animate-pulse h-10 rounded-md bg-bodydark"></div>
    )
}