'use client'

import { useSession } from "next-auth/react"
import { ChangeEvent, useEffect, useState } from "react";
import QuillEditor from "../../quill";
import AttachmentsInput from "../../inputs/attachments-input";
import CreateButton from "../../buttons/create-button";
import { CarWashAttributes, CategoryAttributes, DepartmentAttributes, StrapiData, SubCategoryAttributes, UserAttributes } from "@/types/types";
import { useRouter } from "next/navigation";
import TaskItemList from "../../task-item-list";
import axios from "axios";
import DropdownList from "../../buttons/dropdown-list";
import DataTimePicker from "../../datatime-picker";

interface ITaskCreationForm {
    departmentArr: Array<StrapiData<DepartmentAttributes>>,
    carWashArr: Array<StrapiData<CarWashAttributes>>,
    userArr: Array<StrapiData<UserAttributes>>,
    type: string,
    parentTask: number,
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
    isDeleted: boolean,
    deadline: { 
        startDate: string,
        endDate: string
    },
    parentTaskId: number | null

}

interface ICategories  {
    categoryArr: Array<StrapiData<CategoryAttributes>>,
    subcategoryArr: Array<StrapiData<SubCategoryAttributes>>
}

export default function TaskCreationForm ({ departmentArr, carWashArr, userArr, type, parentTask } : ITaskCreationForm) {
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
        deadline: {
            startDate: '', 
            endDate: ''
        },
        parentTaskId: parentTask ? parentTask : null
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
            setTaskData({
                ...taskData,
                category: '',
                subcategory: ''
            });         
        }
        if(taskData.department) {
          getCategoryAsync();   
        }
        

    },[taskData.department])

    useEffect(() => {
        const getSubCategoryAsync = async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/subcategories?populate[0]=category&filters[category][id][$eq]=${taskData.category}`, {
                headers: {
                    Authorization: `Bearer ${session?.user.jwt}`
                }     
            });
            setCategoryArrs({
                ...categoryArrs,
                subcategoryArr: [...response.data.data]
            });
            setTaskData({
                ...taskData,
                subcategory: ''
            });           
        }
        if (taskData.category) {
            getSubCategoryAsync();            
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
        } else if (name === 'title' || name === 'body' || name === 'priority' || name === 'deadline') {
            setTaskData({
                ...taskData,
                [name]: value
            });            
        } else {
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

    const handleDataChange = (newValue: {startDate: string, endDate: string}) => {
        setTaskData({
            ...taskData,
            deadline: newValue
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
                    deadline: taskData.deadline.startDate,
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
                            autoFocus
                            type="text"
                            name="title" 
                            value={taskData.title}
                            placeholder="Введите название задачи"
                            onChange={handleChange} 
                            className=" w-full 
                                mb-3 transition-colors duration-150 h-10 bg-gray border-bodydark2 text-black pl-2 rounded-md 
                               hover:border-gray focus:border hover:bg-bodydark1 focus:border-bodydark2 focus:outline-none" />
                        <QuillEditor handleChange={handleQuillChange} />
                        <AttachmentsInput handleChange={handleChange} />
                      {taskData.attachments.length ?
                            <TaskItemList taskItems={taskData.attachments} deleteElement={deleteElement} name="attachments" />  
                            : ''            
                        }
                    <CreateButton label="Create task" />
                    </div>
                </div>
                <div className=" border bg-black text-white w-4/12 flex flex-col h-125 justify-between p-5 rounded-md">
                    <DropdownList taskData={taskData} handleChange={handleChange} name="priority" label="Приоритет" dataArr={priorityArr} />
                    <DropdownList taskData={taskData} handleChange={handleChange} name='department' label="Отдел" dataArr={departmentArr} />
                    <DropdownList taskData={taskData} handleChange={handleChange} name='category' label="Категория" dataArr={categoryArrs.categoryArr} />
                    <DropdownList taskData={taskData} handleChange={handleChange} name='subcategory' label="Подкатегория" dataArr={categoryArrs.subcategoryArr} />
                    <DropdownList taskData={taskData} handleChange={handleChange} name='asiignees' label="Исполнители" dataArr={userArr} />
                    {taskData.asiignees.length ?
                            <TaskItemList taskItems={taskData.asiignees} deleteElement={deleteElement} name="asiignees" />  
                            : ''            
                        }
                    <DropdownList taskData={taskData} handleChange={handleChange} name='carWashes' label="АМС" dataArr={carWashArr} />
                    {taskData.carWashes.length ?
                            <TaskItemList taskItems={taskData.carWashes} deleteElement={deleteElement} name="carWashes" />  
                            : ''            
                        }
                    <DataTimePicker handleChange={handleDataChange} name='deadline' value={taskData.deadline} />

                </div>
            </form>
        </main>
    )
}