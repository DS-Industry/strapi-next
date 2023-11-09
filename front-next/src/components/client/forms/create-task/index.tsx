'use client'

import { useSession } from "next-auth/react"
import { ChangeEvent, useEffect, useState } from "react";
import QuillEditor from "../../quill";
import AttachmentsInput from "../../inputs/attachments-input";
import CreateButton from "../../buttons/create-button";
import { CarWashAttributes, CategoryAttributes, DepartmentAttributes, StrapiData, SubCategoryAttributes, UserAttributes } from "@/types/types";
import Select from "../../select";
import { useRouter } from "next/navigation";
import TaskItemList from "../../task-item-list";
import Radio from "../../radio";
import axios from "axios";

interface ITaskCreationForm {
    departmentArr: Array<StrapiData<DepartmentAttributes>>,
    carWashArr: Array<StrapiData<CarWashAttributes>>,
    userArr: Array<StrapiData<UserAttributes>>,
    type: string,
}

interface ITaskData {
    title: string,
    body: string,
    type: string,
    todos: Array<number> | null,
    category: string,
    subcategory: string,
    createdUserBy: string | null,
    carWashes: Array<string>,
    priority: number | null,
    department: string,
    asiignees: Array<string>,
    attachments: Array<any>,
    status: number | null,
    isClosed: boolean,
    isDeleted: boolean

}

interface ICategories  {
    categoryArr: Array<StrapiData<CategoryAttributes>>,
    subcategoryArr: Array<StrapiData<SubCategoryAttributes>>
}

export default function TaskCreationForm ({ departmentArr, carWashArr, userArr, type } : ITaskCreationForm) {

    const priorityArr = [
        {
            color: 'text-meta-3',
            value: 'Низкий'
        },
        {
            color: 'text-meta-8',
            value: 'Средний'
        },
        {
            color: 'text-meta-1',
            value: 'Высокий'
        }
    ]

    const {data : session} = useSession();
    const [ categoryArrs, setCategoryArrs ] = useState<ICategories>({
        categoryArr: [],
        subcategoryArr: [],
    })
    const router = useRouter();

    const [ taskData, setTaskData ] = useState<ITaskData>({
        title: '',
        body: '',
        type: type === 'appeal' ? 'Обращение' : 'Задача',
        todos: [],
        category: '',
        subcategory: '',
        createdUserBy: null,
        carWashes: [],
        priority: null,
        department: '',
        asiignees: [],
        attachments: [],
        status: null,
        isClosed: false,
        isDeleted: false,
    })

    useEffect(() => {
        if (session?.user.id) {
            setTaskData({
                ...taskData,
                createdUserBy : session?.user.id ? session?.user.id : null
            })            
        }

    }, [session])

    useEffect(() => {
        const getCategoryAsync = async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/categories?populate[0]=department&filters[department][id][$eq]=${taskData.department}`, {
                headers: {
                    Authorization: `Bearer ${session?.user.jwt}`
                }     
            });
            setCategoryArrs({
                ...categoryArrs,
                categoryArr: [...response.data.data]
            });          
        }
        if (taskData.department) {
            console.log(taskData.department);
            getCategoryAsync();            
        }
    },[taskData.department])

    useEffect(() => {
        const getCategoryAsync = async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/subcategories?populate[0]=category&filters[category][id][$eq]=${taskData.category}`, {
                headers: {
                    Authorization: `Bearer ${session?.user.jwt}`
                }     
            });
            setCategoryArrs({
                ...categoryArrs,
                subcategoryArr: [...response.data.data]
            });          
        }
        if (taskData.department) {
            console.log(taskData.department);
            getCategoryAsync();            
        }
    },[taskData.category])

    const handleChange = ({target : { name, value, files }} : ChangeEvent<HTMLInputElement>) => {
        if (name === 'asiignees' || name === 'carWashes') {
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
        } else if (name === 'title' || name === 'body' || name === 'priority' || name === 'type') {
            setTaskData({
                ...taskData,
                [name]: value
            });            
        } else {
            console.log(value);
            setTaskData({
                ...taskData,
                [name]: Number(value.split('_')[0])
            })
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
            case 'asiignees' : 
            taskDataArray = taskData.asiignees
            break;
        }
        const filteredItemsArr = taskDataArray.filter((item : any) => {
            if (typeof item === 'object') {
                return item.name !== value                
            } else {
                return item !== value
            }

        });
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
                    asiignees: taskData.asiignees.map((department: string) => Number(department.split('_')[0])),
                    carWashes: taskData.carWashes.map((carwash: string) => Number(carwash.split('_')[0])),
                    isClosed : false,
                    status: 1,
                    slug: uuid,
                    attachments: null,
            }

            console.log(body);
            formData.append('data', JSON.stringify(body));
            taskData.attachments.forEach((attachment: any) => formData.append(`files.attachments`,attachment, attachment.name));
            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`, 
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${session?.user.jwt}`,
                        "Content-Type": "multipart/form-data"
                    }
                });
                router.refresh();
                router.push('/protected/tasks')
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
                    <Radio name="priority" label="Priority" valueArr={priorityArr} handleChange={handleChange} />
                    <Select handleChange={handleChange} dataArr={departmentArr} name="department" label="Department" />
                    <Select handleChange={handleChange} dataArr={categoryArrs.categoryArr} name="category" label="Category" />
                    <Select handleChange={handleChange} dataArr={categoryArrs.subcategoryArr} name="subcategory" label="Subcategory" />
                    <Select handleChange={handleChange} dataArr={userArr} name="asiignees" label="Users" />
                    {/* <Datalist userArr={userArr} handleChange={handleChange}/> */}
                    {taskData.asiignees.length ?
                            <TaskItemList taskItems={taskData.asiignees} deleteElement={deleteElement} name="asiignees" />  
                            : ''            
                        }
                    <Select handleChange={handleChange} dataArr={carWashArr} name="carWashes" label='Carwash' />
                    {taskData.carWashes.length ?
                            <TaskItemList taskItems={taskData.carWashes} deleteElement={deleteElement} name="carWashes" />  
                            : ''            
                        }
                </div>
            </form>
        </main>
    )
}