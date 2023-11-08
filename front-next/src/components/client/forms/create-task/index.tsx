'use client'

import { useSession } from "next-auth/react"
import { ChangeEvent, useEffect, useState } from "react";
import QuillEditor from "../../quill";
import AttachmentsInput from "../../inputs/attachments-input";
import CreateButton from "../../buttons/create-button";
import { CarWashAttributes, DepartmentAttributes, PriorityAttributes, StrapiData, UserAttributes } from "@/types/types";
import Select from "../../select";
import { useRouter } from "next/navigation";
import TaskItemList from "../../task-item-list";

interface ITaskCreationForm {
    priorityArr: Array<StrapiData<PriorityAttributes>>,
    departmentArr: Array<StrapiData<DepartmentAttributes>>,
    carWashArr: Array<StrapiData<CarWashAttributes>>
    userArr: Array<StrapiData<UserAttributes>>
}

interface ITaskData {
    title: string,
    body: string,
    todos: Array<number> | null,
    createdUserBy: string | null,
    carWash: number | null,
    priority: number | null,
    departments: Array<string>,
    asiignees: Array<string>,
    attachments: Array<any>,
    status: number | null,

}

export default function TaskCreationForm ({priorityArr, departmentArr, carWashArr, userArr } : ITaskCreationForm) {

    const {data : session} = useSession();
    const router = useRouter();

    const [ taskData, setTaskData ] = useState<ITaskData>({
        title: '',
        body: '',
        todos: null,
        createdUserBy: null,
        carWash: null,
        priority: null,
        departments: [],
        asiignees: [],
        attachments: [],
        status: null
    })

    useEffect(() => {
        if (session?.user.id) {
            setTaskData({
                ...taskData,
                createdUserBy : session?.user.id ? session?.user.id : null
            })            
        }

    }, [session])

    const handleChange = ({target : { name, value, files }} : ChangeEvent<HTMLInputElement>) => {
        if (name === 'departments' || name === 'asiignees') {
            if ( !taskData[name].includes(value) ) {
                setTaskData({
                    ...taskData,
                    [name]: [...taskData[name], value ]
                });                
            } else return;
        } else if (name === 'attachments' && files) {
            setTaskData({
                ...taskData,
                [name] : [...taskData[name], files[0]]
            })
        } else {
            setTaskData({
                ...taskData,
                [name]: value.split('-')[0]
            });            
        }

    }

    const handleQuillChange = (context: string) => {
        setTaskData({
            ...taskData,
            body : context
        })
    }

    const deleteElement = ({target : { name, value }} : any) => {
        let taskDataArray = [];
        switch (name) {
            case 'attachments' :
            taskDataArray = taskData.attachments
            break;
            case 'departments' : 
            taskDataArray = taskData.departments
            break;
            case 'asiignees' : 
            taskDataArray = taskData.asiignees
            break;
        }
        console.log(taskDataArray);
        const filteredItemsArr = taskDataArray.filter((item : any) => {
            if (typeof item === 'object') {
                return item.name !== value                
            } else {
                return item !== value
            }

        });
        console.log(filteredItemsArr);
        setTaskData({
            ...taskData,
            [name] : [...filteredItemsArr]
        })
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const asyncCreateTask = async () => {
            const uuid = window.crypto.randomUUID();
            const formData = new FormData();

            const body = {
                    ...taskData,
                    departments: taskData.departments.map((department: string) => Number(department.split('-')[0])),
                    carWash: Number(taskData.carWash),
                    priority: Number(taskData.priority),
                    isClosed : false,
                    status: 1,
                    slug: uuid,
                    attachments: null,
            }
            formData.append('data', JSON.stringify(body));
            taskData.attachments.forEach((attachment: any) => formData.append(`files.attachments`,attachment, attachment.name));
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        Authorization: `Bearer ${session?.user.jwt}`
                    }
                });
                console.log(response);
                router.refresh();
                router.push('tasklist')
            } catch (error) {
                console.log(error);
            }
        }

        asyncCreateTask();
        //console.log(resultedObject);
    }


    return (
        <main className=" justify-between flex h-screen">
            <form onSubmit={handleSubmit} className=" w-full h-1/2 min-h-fit flex flex-row justify-between" >
                <div className=" pr-5 w-8/12">
                    <div className=" h-1/2">
                        <input 
                            type="text"
                            name="title" 
                            value={taskData.title}
                            placeholder="Inter task name"
                            onChange={handleChange} 
                            className=" w-full mb-3 transition-colors duration-150 h-10 border-2 bg-gray text-black border-white pl-2 rounded-md hover:border-bodydark1" />
                        <QuillEditor handleChange={handleQuillChange} />
                        <AttachmentsInput handleChange={handleChange} />
                      {taskData.attachments.length ?
                            <TaskItemList taskItems={taskData.attachments} deleteElement={deleteElement} name="attachments" />  
                            : ''            
                        }
                    <CreateButton label="Create task" />
                    </div>
                </div>
                <div className=" bg-black text-white w-4/12 flex flex-col  p-5 h-auto rounded-md">
                    <Select handleChange={handleChange} dataArr={priorityArr} name="priority" label='Priority' />
                    <Select handleChange={handleChange} dataArr={departmentArr} name="departments" label="Department" />
                    <Select handleChange={handleChange} dataArr={userArr} name="asiignees" label="Users" />
                    {taskData.asiignees.length ?
                            <TaskItemList taskItems={taskData.asiignees} deleteElement={deleteElement} name="asiignees" />  
                            : ''            
                        }
                    <Select handleChange={handleChange} dataArr={departmentArr} name="departments" label="Department" />
                    <Select handleChange={handleChange} dataArr={departmentArr} name="departments" label="Department" />
                    {taskData.departments.length ?
                            <TaskItemList taskItems={taskData.departments} deleteElement={deleteElement} name='departments' />
                            : ''
                    }
                    <Select handleChange={handleChange} dataArr={carWashArr} name="carWash" label='Carwash' />
                </div>
            </form>
        </main>
    )
}