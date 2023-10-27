'use client'

import { useSession } from "next-auth/react"
import { ChangeEvent, useState } from "react";
import QuillEditor from "../../quill";
import AttachmentsInput from "../../inputs/attachments-input";
import CreateButton from "../../buttons/create-button";
import { CarWashAttributes, DepartmentAttributes, PriorityAttributes, StrapiData } from "@/types/ticket";

interface ITicketCreationForm {
    priorityArr: Array<StrapiData<PriorityAttributes>>,
    departmentArr: Array<StrapiData<DepartmentAttributes>>,
    carWashArr: Array<StrapiData<CarWashAttributes>>

}

export default function TicketCreationForm ({priorityArr, departmentArr, carWashArr } : ITicketCreationForm) {

    const session = useSession();

    const [ ticketData, setTicketData ] = useState({
        title: '',
        body: '',
        todos: null,
        createdUserBy: session.data?.user,
        carWash: null,
        priority: null,
        departments: null,
        attachments: null,
    })

    const handleChange = ({target : { name, value }} : ChangeEvent<HTMLInputElement>) => {
        setTicketData({
            ...ticketData,
            [name]: value
        })
    }


    return (
        <main className=" justify-between flex">
            <div className=" w-8/12 pr-5">
                <input type="text" name="title" placeholder="Inter task name" className=" w-full transition-colors duration-150 h-10 border-2 bg-gray text-black border-white pl-2 rounded-md hover:border-bodydark1" />
                <QuillEditor handleChange={handleChange} />
                <div>
                    <AttachmentsInput />
                    <></>
                </div>
                <CreateButton data={ticketData} label="Create ticket" endpoint="/api/tickets"/>
            </div>
            <div className=" bg-black text-white w-4/12  pl-5 h-1/2 rounded-md">
                Color
            </div>
        </main>
    )
}