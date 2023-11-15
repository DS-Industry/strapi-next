'use client'

import { StrapiData, StrapiResponseArray, TaskAttributes } from "@/types/types"
import { useRouter } from "next/navigation"

interface IList {
    childTask: StrapiResponseArray<TaskAttributes>
}

export default function List ({childTask }: IList) {

    const router = useRouter();

    const handleClick = (event: any) => {
        const id = event.target.value;
       router.push(`/protected/tasks/${id}`); 
    }  

    return (
        <ul className=" w-1/2">
            {childTask.data.map((task : StrapiData<TaskAttributes>, index: number) => {
                return (
                <li onClick={handleClick} value={task.id} className=" w-5/6 mb-3 last:mb-0 bg-primary border-primary bg-opacity-20 border-2 text-graydark p-3 transition-all duration-300 rounded-md hover:p-4" key={index}>{task.attributes.title}</li>
                )
            })}
        </ul>
    )
}