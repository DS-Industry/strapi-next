'use client'

import { convertDateToCurrentDateWithoutTime } from "@/utils/util"
import { ChangeEvent, MouseEvent, useEffect, useState } from "react"
import TaskParameters from "../task-parameters";
import TaskData from "@/components/server/task-data";
import axios from "axios";
import { CarWashAttributes, DepartmentAttributes, StatusAttributes, StrapiData, UserAttributes } from "@/types/types";

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
    departmentArr: StrapiData<DepartmentAttributes>[],
    userArr: StrapiData<UserAttributes>[],
    carWashArr: StrapiData<CarWashAttributes>[],
    executors: StrapiData<UserAttributes>[],
    carWashes: StrapiData<CarWashAttributes>[]
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
        userArr,
        carWashArr
    }: IEditTask) {
    const [ taskUpdatedData, setTaskUpdatedData ] = useState<ITaskUpdatedData>({
        category: Number(category.split('_')[0]),
        subcategory: 0 /* Number(subcategory.split('_')[0]) */,
        carWashes: [],
        priority: priority,
        department: Number(department.split('_')[0]),
        asiignees: [],
        deadlineDate: convertDateToCurrentDateWithoutTime(new Date()),
        deadlineTime: '19:00',
    })
    
    const [ isEdit, setIsEdit ] = useState<boolean>(false);

    const updateTicket = () => {
        const updateTikcetAsync = async () => {
            const response = await axios.put('');
            setIsEdit(false);
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
        console.log(category.split('_')[0]);
        console.log(departmentArr);
    })

    return (
        <div className=" w-4/12">
            { isEdit ? (
                <TaskParameters 
                    taskData={taskUpdatedData}
                    setTaskData={setTaskUpdatedData} 
                    handleChange={handleChange} 
                    deleteElement={deleteElement} 
                    departmentArr={departmentArr} 
                    userArr={userArr}
                    carWashArr={carWashArr}/>
                ) : (
                  <TaskData 
                    taskId={taskId} 
                    taskStatus={taskStatus} 
                    priority={priority} 
                    type={type} 
                    deadline={deadline} 
                    department={department} 
                    category={category} 
                    subcategory={subcategory} 
                    creator={creator} 
                    executors={executors} 
                    carWashes={carWashes} />  
                )
            }
{/*             <div className=" w-full">
                <button 
                    onClick={() => {
                        setIsEdit((prevValue : boolean) => {
                            return !prevValue
                        })
                    }}
                    className=" text-meta-1">
                        {isEdit ? 'Сохранить' : 'Редактировать' }
                </button>
            </div> */}
        </div>
    )
}