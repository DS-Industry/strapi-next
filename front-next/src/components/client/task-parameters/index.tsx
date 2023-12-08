'use client'

import { CarWashAttributes, CategoryAttributes, DepartmentAttributes, StrapiData, SubCategoryAttributes, UserAttributes } from "@/types/types";
import DropdownList from "../buttons/dropdown-list";
import { ChangeEvent, useEffect, useState } from "react";
import TaskItemList from "../task-item-list";
import DataTimePicker from "../datatime-picker";
import { priorityArr } from "@/components/server/hard-data";
import axios from "axios";
import { useSession } from "next-auth/react";

interface ITaskParameters {
    taskData: any,
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void,
    deleteElement: any,
    departmentArr: Array<StrapiData<DepartmentAttributes>>,
    initUserArr: Array<StrapiData<UserAttributes>>,
    carWashArr: Array<StrapiData<CarWashAttributes>>,
    setTaskData: any
    initCategoryArr: StrapiData<CategoryAttributes>[],
    initSubcategoryArr: StrapiData<SubCategoryAttributes>[],
    isEdit?: boolean
}

export default function TaskParameters ({ 
        taskData, 
        handleChange, 
        deleteElement, 
        departmentArr,  
        initUserArr, 
        carWashArr,
        setTaskData,
        initCategoryArr,
        initSubcategoryArr,
        isEdit=false
    } : ITaskParameters) {

        const { data: session } = useSession();

        const [ ChangedTaskArrs, setChangedTaskArrs ] = useState({
            categoryArr: initCategoryArr,
            subcategoryArr: initSubcategoryArr,
            userArr: initUserArr
        })

        const [ isInitValues, setIsInitValues ] = useState<boolean>(true);

        useEffect(() => {
            const getCategoryAndUserAsync = async () => {
                const categories = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/categories?populate[0]=department&filters[department][id][$eq]=${taskData.department}`, {
                    headers: {
                        Authorization: `Bearer ${session?.user.jwt}`
                    }     
                });
                const users = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users?filters[department][id][$eq]=${taskData.department}`, {
                    headers: {
                        Authorization: `Bearer ${session?.user.jwt}`
                    }
                });
                setChangedTaskArrs({
                    ...ChangedTaskArrs,
                    categoryArr: [...categories.data.data],
                    userArr: [...users.data]
                }); 

                if (!isInitValues) {
                    setTaskData({
                        ...taskData,
                        category: '',
                        subcategory: '',
                        asiignees: []
                    });     
                }    
            }
            if(taskData.department) {
              getCategoryAndUserAsync();   
            }
        },[taskData.department])
    
        useEffect(() => {
            const getSubCategoryAsync = async () => {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/subcategories?populate[0]=category&filters[category][id][$eq]=${taskData.category}`, {
                    headers: {
                        Authorization: `Bearer ${session?.user.jwt}`
                    }     
                });
                setChangedTaskArrs({
                    ...ChangedTaskArrs,
                    subcategoryArr: [...response.data.data]
                });
                
                if (!isInitValues) {
                    setTaskData({
                        ...taskData,
                        subcategory: ''
                    });  
                }
            }
            if (taskData.category) {
                getSubCategoryAsync();            
            }
        },[taskData.category])


        const handleDTPickerChange = (moment: any) => {
            if(moment.target) {
                setTaskData({
                    ...taskData,
                    deadlineTime: moment.target.value
                })
            } else {
                const day = moment._d.getDate() < 10 ? `0${moment._d.getDate()}` : moment._d.getDate();
                const month = moment._d.getMonth() < 9 ? `0${moment._d.getMonth() + 1}` : moment._d.getMonth() + 1;
                const data = `${day}.${month}.${moment._d.getFullYear()}`
            setTaskData({
                ...taskData,
                deadlineDate: data
            }) 
            }
        }

        const handleTaskParameterItem = (event: ChangeEvent<HTMLInputElement>) => {
            handleChange(event);
            setIsInitValues(false);
        }

    return (
        <div className={`border bg-black text-white w-full flex flex-col min-h-90 h-auto justify-between p-5 ${ isEdit && 'pt-15' } rounded-md`}>
            <DropdownList 
                taskData={taskData} 
                handleChange={handleTaskParameterItem} 
                name="priority" 
                label="Приоритет" 
                dataArr={priorityArr} />
            <DropdownList 
                taskData={taskData} 
                handleChange={handleTaskParameterItem} 
                name='department' 
                label="Отдел" 
                dataArr={departmentArr} />
            <DropdownList 
                taskData={taskData} 
                handleChange={handleTaskParameterItem} 
                name='category' 
                label="Категория" 
                dataArr={ChangedTaskArrs.categoryArr} />
            <DropdownList 
                taskData={taskData} 
                handleChange={handleTaskParameterItem} 
                name='subcategory' 
                label="Подкатегория" 
                dataArr={ChangedTaskArrs.subcategoryArr} />
            <div>
                <DropdownList 
                    taskData={taskData} 
                    handleChange={handleTaskParameterItem} 
                    name='asiignees' 
                    label="Исполнители" 
                    dataArr={ChangedTaskArrs.userArr} />

                    { taskData.asiignees.length ?
                        <TaskItemList taskItems={taskData.asiignees} deleteElement={deleteElement} name="asiignees" />  
                            : (
                                <div>
                                    <p className=" p-1 text-xs text-body h-8 ">Здесь появятся выбранные сотрудники...</p>
                                </div>
                            )            
                    }   
            </div>
            <div>
                <DropdownList 
                    taskData={taskData} 
                    handleChange={handleTaskParameterItem} 
                    name='carWashes' 
                    label="АМС" 
                    dataArr={carWashArr} />
                    {taskData.carWashes.length ?
                            <TaskItemList taskItems={taskData.carWashes} deleteElement={deleteElement} name="carWashes" />  
                            : (
                                <div>
                                    <p className=" p-1 text-xs text-body h-8 ">Здесь появятся выбранные мойки...</p>
                                </div>
                            )                   
                    }
            </div>
            <DataTimePicker 
                handleChange={handleDTPickerChange} 
                name="deadline" 
                value={`${taskData.deadlineDate} ${taskData.deadlineTime}`} />
        </div>
    )
}