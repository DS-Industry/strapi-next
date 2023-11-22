'use client'

import { StatusAttributes, StrapiData, StrapiResponseArray, StrapiResponseObject, TaskAttributes } from "@/types/types"
import axios, { AxiosResponse } from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import StatusButton from "./status-button";
import StatusDropDownList from "./status-dropdown-list";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface IStatusButton {
    taskId: number,
    type: string,
    taskStatus: StrapiData<StatusAttributes>
}


export default function StatusComponent ({taskId, type, taskStatus} : IStatusButton) {
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
                console.log(id);
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
                setIsLoading(false);
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

    return // type === 'button' ? 
        //<StatusButton statuses={statusArr} isLoading={isLoading} handleClickChange={handleClickChange}/> : 
        //<StatusDropDownList statusData={statusData} isLoading={isLoading} statuses={statusArr} handleClickChange={handleClickChange}/>
}