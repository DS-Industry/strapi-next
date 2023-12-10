'use client'

import { StatusAttributes, StrapiData, StrapiResponseObject } from "@/types/types";
import axios from "axios"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";

interface ISelect {
    dataArr: Array<any>,
    name: string,
    handleChange: any,
    label: string,
    taskid?: string,
    initStatus?: StrapiResponseObject<StatusAttributes>
}

interface IStatusData {
    id: string,
    title: string,
}

export default function Select ({ dataArr, name, label, handleChange, taskid, initStatus } : ISelect) {

    const { data: session } = useSession();

    const [ statusData, setStatusData ] = useState<IStatusData>(
        {
            id: '',
            title: ''
        }
    )

    const handleSelectChange = (event : any) => {
        const updateTaskStatusAsync = async () => {
            const id = Number(event.target.value.split('_')[0]);
            const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${taskid}`, {
                data : {
                    status: id
                }
            },{
                headers: {
                    Authorization : `Bearer ${session?.user.jwt}`
                }
            });
            setStatusData({
                id: response.data.data.id,
                title: response.data.data.attributes.name
            });
        }
        updateTaskStatusAsync();
    }

    return (
        <div className=" flex flex-row justify-between my-2">
            <label htmlFor="priority">{label}</label>
            <select name={name} onChange={handleChange === null ? handleSelectChange : handleChange} className=" bg-black w-1/2 hover:bg-graydark rounded-md ">
                { !initStatus ? (
                    <option value='' defaultValue=''>---</option>
                    ) : (
                    <option value={initStatus?.data.id}>{initStatus?.data.attributes.name}</option>)}
                { dataArr &&
                    dataArr.map((dataElement : any, index: number) => {
                        return (
                            <option key={dataElement.id} value={`${dataElement.id}_${name !== 'asiignees' ? dataElement.attributes.name : dataElement.username}`}>{ name !== 'asiignees' ? dataElement.attributes.name : dataElement.username}</option>
                        )
                    })
                }
            </select>
        </div>
    )
}