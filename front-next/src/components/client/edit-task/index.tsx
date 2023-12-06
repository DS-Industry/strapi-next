'use client'

import { convertToDateString, divideDateAndTime, generateErrorMessage } from "@/utils/util"
import { ChangeEvent, MouseEvent, useEffect, useState } from "react"
import TaskParameters from "../task-parameters";
import TaskData from "@/components/server/task-data";
import axios from "axios";
import { CarWashAttributes, CategoryAttributes, DepartmentAttributes, StatusAttributes, StrapiData, SubCategoryAttributes, UserAttributes } from "@/types/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PiNotePencilBold } from "react-icons/pi";
import Toast from "../toast";

interface ITaskUpdatedData {
    category: number,
    subcategory: number,
    carWashes: string[],
    priority: string,
    department: number,
    asiignees: string[],
    deadlineDate: string,
    deadlineTime: string,
}

interface IEditTask {
    taskId: number,
    taskStatus: StrapiData<StatusAttributes>,
    priority: string,
    type: string,
    deadline: Date,
    department: string,
    category: string,
    subcategory: string,
    creator: string,
    categoryArr: StrapiData<CategoryAttributes>[],
    subcategoryArr: StrapiData<SubCategoryAttributes>[],
    departmentArr: StrapiData<DepartmentAttributes>[],
    userArr: StrapiData<UserAttributes>[],
    carWashArr: StrapiData<CarWashAttributes>[],
    executors: string[],
    carWashes: string[]
}

export default function EditTask ({
        taskId, 
        taskStatus,
        priority,
        type,
        deadline,
        department,
        category,
        subcategory,
        creator,
        executors,
        carWashes,
        departmentArr,
        categoryArr,
        subcategoryArr,
        userArr,
        carWashArr
    }: IEditTask) {
    const [ taskUpdatedData, setTaskUpdatedData ] = useState<ITaskUpdatedData>({
        category: Number(category.split('_')[0]),
        subcategory: Number(subcategory.split('_')[0]),
        carWashes: [...carWashes],
        priority: priority,
        department: Number(department.split('_')[0]),
        asiignees: [...executors],
        deadlineDate: divideDateAndTime(deadline)[0],
        deadlineTime: divideDateAndTime(deadline)[1],
    })
    const { data: session } = useSession();
    const router = useRouter();
    const [ isEdit, setIsEdit ] = useState<boolean>(false);

    const [ error, setError ] = useState<string>('');
    const [ success, setSuccess ] = useState<string>('');

    const updateTicket = () => {
        const updateTikcetAsync = async () => {
            const deadline = convertToDateString(`${taskUpdatedData.deadlineDate} ${taskUpdatedData.deadlineTime}`);
            const data = {
                ...taskUpdatedData,
                asiignees: taskUpdatedData.asiignees.map((department: string) => Number(department.split('_')[0])),
                carWashes: taskUpdatedData.carWashes.map((carwash: string) => Number(carwash.split('_')[0])),
                deadline: new Date(deadline),
            }
            const validationError = generateErrorMessage(setError, data);
            if (!validationError) {
                try {
                    const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${taskId}`, {
                        data
                    }, {
                        headers: {
                            Authorization: `Bearer ${session?.user.jwt}`
                        }
                    });
                    console.log(response);
                    console.log(creator);
                    router.refresh();
                    setSuccess('Обновление прошло успешно.')
                    setIsEdit(false);
                } catch (error: any) {
                    console.log(error);
                    setError(error)
                }
            }
        };
        updateTikcetAsync();
    }

    const handleChange = ({target : { name, value }} : ChangeEvent<HTMLInputElement>) => {
        if (name === 'asiignees' || name === 'carWashes') {
            if ( !taskUpdatedData[name].includes(value) ) {
                setTaskUpdatedData({
                    ...taskUpdatedData,
                    [name]: [...taskUpdatedData[name], value ]
                });                
            } else return;
        } else if (name === 'priority') {
            setTaskUpdatedData({
                ...taskUpdatedData,
                [name]: value
            });         
        } else {
            setTaskUpdatedData({
                ...taskUpdatedData,
                [name]: Number(value.split('_')[0])
            })
        }
    }

    

    const deleteElement = ({currentTarget : { name, value }} : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        let taskDataArray : any = [];
        switch (name) {
            case 'asiignees' : 
            taskDataArray = taskUpdatedData.asiignees
            break;
            case 'carWashes' : 
            taskDataArray = taskUpdatedData.carWashes
            break;
        }
        const filteredItemsArr = taskDataArray.filter((item : any) => {
            if (typeof item === 'object') {
                return item.name !== value                
            } else {
                return item !== value
            }

        });
        setTaskUpdatedData({
            ...taskUpdatedData,
            [name] : [...filteredItemsArr]
        })
    }

    useEffect(() => {
        console.log('subcategory id ', subcategory.split('_')[0]);
        console.log(deadline);
    })

    return (
        <div className=" w-4/12">
            <Toast text={error} closeToast={setError} type={"error"}/>
            <Toast text={success} closeToast={setSuccess} type={"success"}/>
            { isEdit ? (
                <TaskParameters 
                    taskData={taskUpdatedData}
                    setTaskData={setTaskUpdatedData} 
                    handleChange={handleChange} 
                    deleteElement={deleteElement} 
                    departmentArr={departmentArr} 
                    initUserArr={userArr}
                    carWashArr={carWashArr}
                    initCategoryArr={categoryArr}
                    initSubcategoryArr={subcategoryArr}/>
                ) : (
                  <TaskData 
                    taskId={taskId} 
                    taskStatus={taskStatus} 
                    priority={priority} 
                    type={type} 
                    deadline={deadline} 
                    department={department.split('_')[1]} 
                    category={category.split('_')[1]} 
                    subcategory={subcategory.split('_')[1]} 
                    creator={creator} 
                    executors={executors.map((executor) => executor.split('_')[1])} 
                    carWashes={carWashes.map((carWash) => carWash.split('_')[1])} />  
                )
            }
            { creator === session?.user.username &&
                <div className=" w-full">
                    <button 
                        onClick={() => {
                            if (isEdit) {
                                updateTicket();
                            } else {
                                setIsEdit((prevValue : boolean) => {
                                    return !prevValue
                                })
                            }
                        }}
                        className=" text-black p-2 hover:bg-bodydark rounded-md mt-2 transition-all duration-300">
                            {isEdit ? 'Сохранить' : <p className=" flex flex-row items-center gap-3">Редактировать <PiNotePencilBold /></p> }
                    </button>
                </div>
            }
        </div>
    )
}