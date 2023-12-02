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
import TaskParameters from "../../task-parameters";
import { convertDateToCurrentDateWithoutTime, convertToDateString } from "@/utils/util";
import NavigationButton from "../../buttons/navigate-button";

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
    deadlineDate: string | Date,
    deadlineTime: string,
    parentTask: number | null

}

interface ICategories  {
    categoryArr: Array<StrapiData<CategoryAttributes>>,
    subcategoryArr: Array<StrapiData<SubCategoryAttributes>>
}

export default function TaskCreationForm ({ departmentArr, carWashArr, userArr, type, parentTask } : ITaskCreationForm) {
    const {data : session} = useSession();
    const [ categoryArrs, setCategoryArrs ] = useState<ICategories>({
        categoryArr: [],
        subcategoryArr: [],
    });

    const router = useRouter();

    const [ taskData, setTaskData ] = useState<ITaskData>({
        title: '',
        body: '',
        type: type === 'appeal' ? 'Обращение' : 'Задача',
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
        deadlineDate: convertDateToCurrentDateWithoutTime(new Date()),
        deadlineTime: '19:00',
        parentTask: parentTask ? parentTask : null
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
        } else if (name === 'title' || name === 'body' || name === 'priority') {
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

    //formate date to correct from moment js. from Sat Nov 18 2023 00:00:00 GMT+0300 (Москва, стандартное время) to 18.11.2023
    //set this date to deadlineDate
    // and set time to deadlineTime 

    const deleteElement = ({currentTarget : { name, value }} : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        let taskDataArray = [];
        switch (name) {
            case 'attachments' :
            taskDataArray = taskData.attachments
            break;
            case 'asiignees' : 
            taskDataArray = taskData.asiignees
            break;
            case 'carWashes' : 
            taskDataArray = taskData.carWashes
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
            const deadline = convertToDateString(`${taskData.deadlineDate} ${taskData.deadlineTime}`);

            const body = {
                    ...taskData,
                    asiignees: taskData.asiignees.map((department: string) => Number(department.split('_')[0])),
                    carWashes: taskData.carWashes.map((carwash: string) => Number(carwash.split('_')[0])),
                    isClosed : false,
                    status: 1,
                    slug: uuid,
                    attachments: null,
                    deadline: new Date(deadline),
            }
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
                taskData.parentTask ? router.push(`./${taskData.parentTask}`) : router.push('/protected/tasks')
            } catch (error) {
                console.log(error);
            }
        }

        asyncCreateTask();
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
                        <QuillEditor handleChange={handleQuillChange} label="Добавьте описание задачи, чтобы исполнителю было понятно, что нужно сделать в этой задаче"/>
                        <AttachmentsInput handleChange={handleChange} />
                      {taskData.attachments.length ?
                            <TaskItemList taskItems={taskData.attachments} deleteElement={deleteElement} name="attachments" />  
                            : ''            
                        }
                    <CreateButton label="Create task" />
                    <NavigationButton className="ml-3 transition-all duration-300 hover:bg-bodydark1 hover:opacity-80 opacity-60 text-graydark px-3 py-2 rounded-md" endpoint={taskData.parentTask ? `/protected/tasks/${parentTask}` : "/protected/tasks"} label='Отменить' back={true} />
                    </div>
                </div>
                    <TaskParameters 
                        taskData={taskData} 
                        setTaskData={setTaskData}
                        handleChange={handleChange} 
                        deleteElement={deleteElement} 
                        departmentArr={departmentArr} 
                        initCategoryArr={categoryArrs.categoryArr} 
                        initSubcategoryArr={categoryArrs.subcategoryArr} 
                        userArr={userArr} 
                        carWashArr={carWashArr}/>
            </form>
        </main>
    )
}