'use client'

import { StatusAttributes, StrapiData, StrapiResponseArray, StrapiResponseObject, TaskAttributes } from "@/types/types"
import axios, { AxiosResponse } from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import StatusButton from "./status-button";
import StatusDropDownList from "./status-dropdown-list";

interface IStatusButton {
    taskId: number,
    currentStatusId: number,
    type: string,
    taskData: StrapiData<StatusAttributes>
}


export default function StatusComponent ({taskId, currentStatusId, type, taskData} : IStatusButton) {
    const {data :session} = useSession();
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ statusArr, setStatusArr ] = useState<any>();
    const [ statusData, setStatusData ] = useState<{
        id: number,
        title: string
    }>({
        id: taskData.id,
        title: taskData.attributes.name
    });

    const handleClickChange = (event : any) => {
        const updateTaskStatusAsync = async () => {
            const id = Number(event.target.value.split('_')[0]);
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
                id: task.id,
                title: task.attributes.status.data.attributes.name
            })
        }
        updateTaskStatusAsync();
    }

    useEffect(() => {
        const getDataStatusAsync = async () => {
            setIsLoading(true);
            try {
                console.log(session?.user.jwt);
                const { data : statuses } : AxiosResponse<StrapiResponseArray<StatusAttributes>> = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/statuses?filters[$and][0][name][$ne]=Created&filters[$and][1][name][$ne]=Deleted&filters[$and][2][id][$gt]=${currentStatusId}`,
                {
                    headers: {
                        Authorization: `Bearer ${session?.user.jwt}`
                    }
                });
                console.log(statuses.data);
                setStatusArr([...statuses.data]);
                setIsLoading(false);
            } catch (e) {
                console.log(e);
            }
        }
        if (session?.user) getDataStatusAsync();
    },[statusData])

    return type === 'button' ? 
        <StatusButton statuses={statusArr} isLoading={isLoading} handleClickChange={handleClickChange}/> : 
        <StatusDropDownList statusData={statusData} statuses={statusArr} handleClickChange={handleClickChange}/>
}