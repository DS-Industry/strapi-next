'use client'

import { useSession } from "next-auth/react"
import { ChangeEvent, useEffect, useState } from "react";
import QuillEditor from "../../quill";
import AttachmentsInput from "../../inputs/attachments-input";
import CreateButton from "../../buttons/create-button";
import { CarWashAttributes, DepartmentAttributes, PriorityAttributes, StrapiData } from "@/types/types";
import Select from "../../select";
import TicketItemList from "../../ticket-item-list";
import { useRouter } from "next/navigation";

interface ITicketCreationForm {
    priorityArr: Array<StrapiData<PriorityAttributes>>,
    departmentArr: Array<StrapiData<DepartmentAttributes>>,
    carWashArr: Array<StrapiData<CarWashAttributes>>
}

interface ITicketData {
    name: string,
    body: string,
    todos: Array<number> | null,
    createdUserBy: string | null,
    carWash: number | null,
    priority: number | null,
    departments: Array<string>,
    attachments: Array<any>,
    status: number | null,

}

export default function TicketCreationForm ({priorityArr, departmentArr, carWashArr } : ITicketCreationForm) {

    const {data : session} = useSession();
    const router = useRouter();

    const [ ticketData, setTicketData ] = useState<ITicketData>({
        name: '',
        body: '',
        todos: null,
        createdUserBy: null,
        carWash: null,
        priority: null,
        departments: [],
        attachments: [],
        status: null
    })

    useEffect(() => {
        if (session?.user.id) {
            setTicketData({
                ...ticketData,
                createdUserBy : session?.user.id ? session?.user.id : null
            })            
        }

    }, [session])

    const handleChange = ({target : { name, value, files }} : ChangeEvent<HTMLInputElement>) => {
        if (name === 'departments') {
            if ( !ticketData.departments.includes(value) ) {
                setTicketData({
                    ...ticketData,
                    [name]: [...ticketData[name], value ]
                });                
            } else return;
        } else if (name === 'attachments' && files) {
            setTicketData({
                ...ticketData,
                [name] : [...ticketData[name], files[0]]
            })
        } else {
            setTicketData({
                ...ticketData,
                [name]: value.split('-')[0]
            });            
        }

    }

    const handleQuillChange = (context: string) => {
        setTicketData({
            ...ticketData,
            body : context
        })
    }

    const deleteElement = ({target : { name, value }} : any) => {
        const ticketArray = name === 'attachments' ? ticketData.attachments : ticketData.departments;
        const filteredItemsArr = ticketArray.filter((item : any) => {
            if (typeof item === 'object') {
                return item.name !== value                
            } else {
                return item !== value
            }

        });
        setTicketData({
            ...ticketData,
            [name] : [...filteredItemsArr]
        })
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const asyncCreateTicket = async () => {
            const uuid = window.crypto.randomUUID();
            const formData = new FormData();

            const body = {
                    ...ticketData,
                    departments: ticketData.departments.map((department: string) => Number(department.split('-')[0])),
                    carWash: Number(ticketData.carWash),
                    priority: Number(ticketData.priority),
                    isClosed : false,
                    status: 1,
                    slug: uuid,
                    attachments: null,
            }
            formData.append('data', JSON.stringify(body));
            ticketData.attachments.forEach((attachment: any) => formData.append(`files.attachments`,attachment, attachment.name));
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tickets`, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        Authorization: `Bearer ${session?.user.jwt}`
                    }
                });
                console.log(response);
                router.refresh();
                router.push('ticketlist')
            } catch (error) {
                console.log(error);
            }
        }

        asyncCreateTicket();
        //console.log(resultedObject);
    }


    return (
        <main className=" justify-between flex h-screen">
            <form onSubmit={handleSubmit} className=" w-full h-1/2 min-h-fit flex flex-row justify-between" >
                <div className=" pr-5 w-8/12">
                    <div className=" h-1/2">
                        <input 
                            type="text"
                            name="name" 
                            value={ticketData.name}
                            placeholder="Inter task name"
                            onChange={handleChange} 
                            className=" w-full mb-3 transition-colors duration-150 h-10 border-2 bg-gray text-black border-white pl-2 rounded-md hover:border-bodydark1" />
                        <QuillEditor handleChange={handleQuillChange} />
                        <AttachmentsInput handleChange={handleChange} />
                      {ticketData.attachments.length ?
                            <TicketItemList ticketItems={ticketData.attachments} deleteElement={deleteElement} name="attachments" />  
                            : ''            
                        }
                    <CreateButton label="Create ticket" />
                    </div>
                </div>
                <div className=" bg-black text-white w-4/12 flex flex-col  p-5 h-1/2 rounded-md">
                    <Select handleChange={handleChange} dataArr={priorityArr} name="priority" label='Priority' />
                    <Select handleChange={handleChange} dataArr={departmentArr} name="departments" label="Department" />
                    {ticketData.departments.length ?
                            <TicketItemList ticketItems={ticketData.departments} deleteElement={deleteElement} name='departments' />
                            : ''
                    }
                    <Select handleChange={handleChange} dataArr={carWashArr} name="carWash" label='Carwash' />
                </div>
            </form>
        </main>
    )
}